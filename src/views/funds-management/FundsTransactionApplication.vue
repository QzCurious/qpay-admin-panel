<template>
  <form @submit.prevent="handle_submit" class="p-fluid p-d-flex p-flex-column">
    <InputText
      readonly
      float
      :modelValue="data.channel_name"
      :label="$t('channel')"
    />
    <InputText
      float
      v-model="amount"
      :label="$t('amount')"
      name="amount"
      :errors="v$.amount.$errors.map((e) => e.$message)"
    />
    <InputText readonly float :modelValue="fee" :label="$t('withdraw_fee')" />
    <BankDropdown
      float
      v-model="bank_id"
      :label="$t('to_bank')"
      :errors="v$.bank_id.$errors.map((e) => e.$message)"
    />
    <InputText
      float
      v-model="branch"
      :label="$t('to_branch')"
      :errors="v$.branch.$errors.map((e) => e.$message)"
    />
    <InputText
      float
      v-model="account_number"
      :label="$t('to_account_number')"
      :errors="v$.account_number.$errors.map((e) => e.$message)"
    />
    <InputText
      float
      v-model="account_name"
      :label="$t('to_account_name')"
      :errors="v$.account_name.$errors.map((e) => e.$message)"
    />
    <InputText
      float
      :placeholder="$t('enter_2fa_to_permit_action')"
      v-model="code"
      :errors="v$.code.$errors.map((e) => e.$message)"
    />
    <Textarea
      :placeholder="$t('remark')"
      class="p-mt-3"
      v-model="remark"
      :autoResize="true"
      rows="5"
      cols="30"
    />
    <Button class="p-mt-3" :label="$t('form.submit')" type="submit" />
  </form>
  <Toast position="top-right" />
</template>

<script>
import MerchantChannel from "../../api/MerchantChannel";
import FundsWithdraw from "../../api/FundsWithdraw";
import useVuelidate from "@vuelidate/core";
import { required, maxLength } from "@vuelidate/validators";
import { gt } from "../../helper/validator";
import InputText from "../../components/InputText";
import BankDropdown from "../../components/BankDropdown";
import ToastService from "../../service/ToastService";

export default {
  components: { InputText, BankDropdown },
  emits: ["success"],
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
  setup() {
    const v$ = useVuelidate();
    return { v$ };
  },
  validations() {
    return {
      amount: { required, positive: gt(0) },
      bank_id: { required },
      branch: { required, maxLength: maxLength(20) },
      account_number: { required, maxLength: maxLength(20) },
      account_name: { required, maxLength: maxLength(16) },
      code: { required },
    };
  },
  data() {
    return {
      withdraw_fee: null,
      withdraw_fee_rate: null,
      amount: null,
      bank_id: null,
      branch: null,
      account_number: null,
      account_name: null,
      code: null,
      remark: null,
    };
  },
  computed: {
    fee() {
      if (
        this.amount === null ||
        isNaN(this.amount) ||
        isNaN(this.withdraw_fee) ||
        isNaN(this.withdraw_fee_rate)
      ) {
        return null;
      }
      return (
        Number(this.amount) * Number(this.withdraw_fee_rate) +
          Number(this.withdraw_fee) || null
      );
    },
  },
  methods: {
    async handle_submit() {
      this.v$.$touch();
      if (this.v$.$error) {
        return;
      }

      const data = {
        merchant_channel_id: this.data.merchant_channel_id,
        amount: Number(this.amount),
        bank_id: this.bank_id,
        branch: this.branch,
        account_number: this.account_number,
        account_name: this.account_name,
        code: this.code,
        remark: this.remark,
      };
      FundsWithdraw.apply_withdraw(this.data.merchant_channel_id, data).then(
        () => {
          ToastService.success({
            summary: this.$i18n.t("withdraw_applied_successfully"),
          });
          this.$emit("success", data);
        }
      );

      this.v$.$reset();
    },
  },
  mounted() {
    MerchantChannel.get(this.data.merchant_channel_id).then((res) => {
      const { withdraw_fee, withdraw_fee_rate } = res.data;
      this.withdraw_fee = withdraw_fee;
      this.withdraw_fee_rate = withdraw_fee_rate;
    });
  },
};
</script>

<style scoped>
form {
  min-width: 20rem;
}
</style>