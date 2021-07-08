<template>
  <form @submit.prevent="handle_submit" class="p-fluid p-d-flex p-flex-column">
    <ChannelDropdown
      float
      v-model="channel_id"
      :filter="(item) => item.status !== 0"
      :errors="v$.channel_id.$errors.map((e) => e.$message)"
    />
    <MerchantDropdown
      float
      v-model="merchant_id"
      :filter="(item) => item.status !== 0"
      :errors="v$.merchant_id.$errors.map((e) => e.$message)"
    />
    <Button class="p-mt-3" :label="$t('form.submit')" type="submit" />
  </form>
  <Toast position="top-right" />
</template>

<script>
import MerchantChannel from "../../api/MerchantChannel"
import useVuelidate from "@vuelidate/core"
import { required } from "@vuelidate/validators"
import ChannelDropdown from "../../components/ChannelDropdown"
import MerchantDropdown from "../../components/MerchantDropdown"
import ToastService from "../../service/ToastService"

export default {
  components: {
    ChannelDropdown,
    MerchantDropdown,
  },
  emits: ["success"],
  setup() {
    const v$ = useVuelidate()
    return { v$ }
  },
  validations() {
    return {
      channel_id: { required },
      merchant_id: { required },
    }
  },
  data() {
    return {
      channel_id: undefined,
      merchant_id: undefined,
    }
  },
  methods: {
    async handle_submit() {
      this.v$.$touch()
      if (this.v$.$error) {
        return
      }

      const data = {
        channel_id: this.channel_id,
        merchant_id: this.merchant_id,
      }
      await MerchantChannel.create(data)
      ToastService.success({
        summary: this.$i18n.t("merchant_channel_successfully_created"),
      })
      this.$emit("success", data)

      this.v$.$reset()
    },
  },
}
</script>

<style scoped>
form {
  min-width: 12rem;
}
</style>
