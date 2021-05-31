<template>
  <form @submit.prevent="handle_submit" class="p-fluid p-d-flex p-flex-column">
    <InputText float v-model="merchant_name" :label="$t('merchant')" readonly />
    <InputText float v-model="channel_name" :label="$t('channel')" readonly />
    <InputText
      float
      v-model="recharge_limit_daily"
      :label="$t('recharge_limit_daily')"
      name="recharge_limit_daily"
      :errors="v$.recharge_limit_daily.$errors.map((e) => e.$message)"
    />
    <InputText
      float
      v-model="manual_deposit_limit"
      :label="$t('manual_deposit_limit')"
      name="manual_deposit_limit"
      :errors="v$.manual_deposit_limit.$errors.map((e) => e.$message)"
    />
    <InputText
      float
      v-model="deposit_limit_once"
      :label="$t('order_limit_once')"
      name="deposit_limit_once"
      :errors="v$.deposit_limit_once.$errors.map((e) => e.$message)"
    />
    <InputText
      float
      v-model="order_per_minute"
      :label="$t('order_per_minute')"
      name="order_per_minute"
      :errors="v$.order_per_minute.$errors.map((e) => e.$message)"
    />
    <InputText
      float
      v-model="deposit_limit_daily"
      :label="$t('order_limit_daily')"
      name="deposit_limit_daily"
      :errors="v$.deposit_limit_daily.$errors.map((e) => e.$message)"
    />
    <Button class="p-mt-3" :label="$t('form.submit')" type="submit" />
  </form>
</template>

<script>
import MerchantChannelParameter from "../../api/MerchantChannelParameter";
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
      recharge_limit_daily: { numeric },
      manual_deposit_limit: { numeric },
      order_per_minute: { numeric },
      deposit_limit_once: { numeric },
      deposit_limit_daily: { numeric },
    };
  },
  data() {
    return {
      recharge_limit_daily: this.data?.recharge_limit_daily ?? undefined,
      manual_deposit_limit: this.data?.manual_deposit_limit ?? undefined,
      order_per_minute: this.data?.order_per_minute ?? undefined,
      deposit_limit_once: this.data?.deposit_limit_once ?? undefined,
      deposit_limit_daily: this.data?.deposit_limit_daily ?? undefined,
    };
  },
  methods: {
    async handle_submit() {
      this.v$.$touch();
      if (this.v$.$error) {
        return;
      }

      const data = {
        recharge_limit_daily: this.recharge_limit_daily,
        manual_deposit_limit: this.manual_deposit_limit,
        order_per_minute: this.order_per_minute,
        deposit_limit_once: this.deposit_limit_once,
        deposit_limit_daily: this.deposit_limit_daily,
      };
      if (Object.values(data).every((d) => !d)) {
        return;
      }
      MerchantChannelParameter.update(this.data.id, data).then(() => {
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