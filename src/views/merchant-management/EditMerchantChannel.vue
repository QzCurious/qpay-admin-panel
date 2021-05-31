<template>
  <form @submit.prevent="handle_submit" class="p-fluid p-d-flex p-flex-column">
    <InputText
      float
      v-model="merchant_name"
      :label="$t('merchant')"
      readonly
    />
    <InputText
      float
      v-model="channel_name"
      :label="$t('channel')"
      readonly
    />
    <InputText
      float
      v-model="deposit_fee_rate"
      :label="$t('deposit_fee_rate')"
      name="deposit_fee_rate"
      :errors="v$.deposit_fee_rate.$errors.map((e) => e.$message)"
    />
    <InputText
      float
      v-model="deposit_fee"
      :label="$t('deposit_fee')"
      name="deposit_fee"
      :errors="v$.deposit_fee.$errors.map((e) => e.$message)"
    />
    <InputText
      float
      v-model="deposit_limit_daily"
      :label="$t('deposit_limit_daily')"
      name="deposit_limit_daily"
      :errors="v$.deposit_limit_daily.$errors.map((e) => e.$message)"
    />
    <InputText
      float
      v-model="withdraw_fee_rate"
      :label="$t('withdraw_fee_rate')"
      name="withdraw_fee_rate"
      :errors="v$.withdraw_fee_rate.$errors.map((e) => e.$message)"
    />
    <InputText
      float
      v-model="withdraw_fee"
      :label="$t('withdraw_fee')"
      name="withdraw_fee"
      :errors="v$.withdraw_fee.$errors.map((e) => e.$message)"
    />
    <InputText
      float
      v-model="withdraw_limit_daily"
      :label="$t('withdraw_limit_daily')"
      name="withdraw_limit_daily"
      :errors="v$.withdraw_limit_daily.$errors.map((e) => e.$message)"
    />
    <Button class="p-mt-3" :label="$t('form.submit')" type="submit" />
  </form>
  <Toast position="top-right" />
</template>

<script>
import MerchantChannel from "../../api/MerchantChannel";
import useVuelidate from "@vuelidate/core";
import InputText from "../../components/InputText";
import ToastService from "../../service/ToastService";
import { required, numeric } from "@vuelidate/validators";

export default {
  components: {
    InputText,
  },
  emits: ["success"],
  props: {
    data: Object,
  },
  setup() {
    const v$ = useVuelidate();
    return { v$ };
  },
  validations() {
    return {
      deposit_fee_rate: { numeric },
      deposit_fee: { numeric },
      deposit_limit_daily: { numeric },
      withdraw_fee_rate: { numeric },
      withdraw_fee: { numeric },
      withdraw_limit_daily: { numeric },
    };
  },
  data() {
    return {
      channel_name: this.data?.channel_name ?? undefined,
      merchant_name: this.data?.merchant_name ?? undefined,
      deposit_fee_rate: this.data?.deposit_fee_rate ?? undefined,
      deposit_fee: this.data?.deposit_fee ?? undefined,
      deposit_limit_daily: this.data?.deposit_limit_daily ?? undefined,
      withdraw_fee_rate: this.data?.withdraw_fee_rate ?? undefined,
      withdraw_fee: this.data?.withdraw_fee ?? undefined,
      withdraw_limit_daily: this.data?.withdraw_limit_daily ?? undefined,
    };
  },
  methods: {
    async handle_submit() {
      this.v$.$touch();
      if (this.v$.$error) {
        return;
      }

      const data = {
        deposit_fee_rate: this.deposit_fee_rate,
        deposit_fee: this.deposit_fee,
        deposit_limit_daily: this.deposit_limit_daily,
        withdraw_fee_rate: this.withdraw_fee_rate,
        withdraw_fee: this.withdraw_fee,
        withdraw_limit_daily: this.withdraw_limit_daily,
      };
      if (Object.values(data).every((d) => !d)) {
        return;
      }
      MerchantChannel.update(this.data.id, data).then(() => {
        ToastService.success({
          summary: this.$i18n.t("merchant_channel_successfully_updated"),
        });
        this.$emit("success", data);
      });

      this.v$.$reset();
    },
  },
};
</script>

<style scoped>
form {
  min-width: 15rem;
}
</style>