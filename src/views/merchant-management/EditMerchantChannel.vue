<template>
  <form @submit.prevent="handle_submit" class="p-fluid p-d-flex p-flex-column">
    <InputText float v-model="merchant_name" :label="$t('merchant')" readonly />
    <InputText float v-model="channel_name" :label="$t('channel')" readonly />
    <RateNumber
      float
      v-model="deposit_fee_rate_percent"
      :label="$t('deposit_fee_rate')"
      name="deposit_fee_rate"
      :errors="v$.deposit_fee_rate.$errors.map((e) => e.$message)"
    />
    <InputNumber
      float
      v-model="deposit_fee"
      :label="$t('deposit_fee')"
      name="deposit_fee"
      :errors="v$.deposit_fee.$errors.map((e) => e.$message)"
    />
    <InputNumber
      float
      v-model="deposit_limit_daily"
      :label="$t('deposit_limit_daily')"
      name="deposit_limit_daily"
      :errors="v$.deposit_limit_daily.$errors.map((e) => e.$message)"
    />
    <RateNumber
      float
      v-model="withdraw_fee_rate_percent"
      :label="$t('withdraw_fee_rate')"
      name="withdraw_fee_rate"
      :errors="v$.withdraw_fee_rate.$errors.map((e) => e.$message)"
    />
    <InputNumber
      float
      v-model="withdraw_fee"
      :label="$t('withdraw_fee')"
      name="withdraw_fee"
      :errors="v$.withdraw_fee.$errors.map((e) => e.$message)"
    />
    <InputNumber
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
import MerchantChannel from "../../api/MerchantChannel"
import useVuelidate from "@vuelidate/core"
import InputText from "../../components/InputText"
import InputNumber from "../../components/InputNumber"
import RateNumber from "../../components/RateNumber"
import ToastService from "../../service/ToastService"
import { minValue, maxValue, numeric } from "@vuelidate/validators"
import { empty_to_null, falsy_to_0 } from "../../helper/transform"
import numeral from "numeral"

export default {
  components: {
    InputText,
    RateNumber,
    InputNumber,
  },
  emits: ["success"],
  props: {
    data: Object,
  },
  setup() {
    const v$ = useVuelidate()
    return { v$ }
  },
  validations() {
    return {
      deposit_fee_rate: {
        numeric,
        minValue: minValue(0),
        maxValue: maxValue(1),
      },
      deposit_fee: {
        numeric,
      },
      deposit_limit_daily: { numeric },
      withdraw_fee_rate: {
        numeric,
        minValue: minValue(0),
        maxValue: maxValue(1),
      },
      withdraw_fee: { numeric },
      withdraw_limit_daily: { numeric },
    }
  },
  data() {
    return {
      channel_name: this.data?.channel_name,
      merchant_name: this.data?.merchant_name,
      deposit_fee_rate: this.data?.deposit_fee_rate,
      deposit_fee: this.data?.deposit_fee,
      deposit_limit_daily: this.data?.deposit_limit_daily,
      withdraw_fee_rate: this.data?.withdraw_fee_rate,
      withdraw_fee: this.data?.withdraw_fee,
      withdraw_limit_daily: this.data?.withdraw_limit_daily,
    }
  },
  computed: {
    deposit_fee_rate_percent: {
      get() {
        return (
          this.deposit_fee_rate &&
          numeral(this.deposit_fee_rate)
            .multiply(100)
            .value()
        )
      },
      set(value) {
        this.deposit_fee_rate = numeral(value)
          .divide(100)
          .value()
      },
    },
    withdraw_fee_rate_percent: {
      get() {
        return (
          this.withdraw_fee_rate &&
          numeral(this.withdraw_fee_rate)
            .multiply(100)
            .value()
        )
      },
      set(value) {
        this.withdraw_fee_rate = numeral(value)
          .divide(100)
          .value()
      },
    },
  },
  methods: {
    async handle_submit() {
      this.v$.$touch()
      if (this.v$.$error) {
        return
      }

      const data = {
        deposit_fee_rate: falsy_to_0(this.deposit_fee_rate),
        deposit_fee: falsy_to_0(this.deposit_fee),
        deposit_limit_daily: empty_to_null(this.deposit_limit_daily),
        withdraw_fee_rate: falsy_to_0(this.withdraw_fee_rate),
        withdraw_fee: falsy_to_0(this.withdraw_fee),
        withdraw_limit_daily: empty_to_null(this.withdraw_limit_daily),
      }
      await MerchantChannel.update(this.data.id, data)
      ToastService.success({
        summary: this.$i18n.t("merchant_channel_successfully_updated"),
      })
      this.$emit("success", data)

      this.v$.$reset()
    },
  },
}
</script>

<style scoped>
form {
  width: 15rem;
}
</style>
