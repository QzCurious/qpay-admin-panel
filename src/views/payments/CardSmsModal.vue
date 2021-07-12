<template>
  <form @submit.prevent="handle_submit" class="p-fluid p-d-flex p-flex-column">
    <CardDropdown
      float
      v-model="bank_card_id"
      :errors="v$.bank_card_id.$errors.map((e) => e.$message)"
    />
    <InputText
      float
      v-model="send_phone"
      :label="$t('send_phone')"
      :errors="v$.send_phone.$errors.map((e) => e.$message)"
    />
    <InputText
      float
      v-model="content"
      :label="$t('content')"
      :errors="v$.content.$errors.map((e) => e.$message)"
    />
    <div class="p-d-flex p-ai-center p-mt-3">
      <InputSwitch v-model="status" />
      <span class="p-ml-2">{{ $t("status") }}</span>
    </div>
    <Button class="p-mt-3" :label="$t('form.submit')" type="submit" />
  </form>
  <Toast position="top-right" />
</template>

<script>
import CardSms from "../../api/CardSms"
import useVuelidate from "@vuelidate/core"
import { required } from "@vuelidate/validators"
import InputText from "../../components/InputText"
import CardDropdown from "../../components/CardDropdown"
import ToastService from "../../service/ToastService"

export default {
  components: {
    InputText,
    CardDropdown,
  },
  props: {
    mode: {
      type: String,
      validator: (value) => ["edit", "create"].includes(value),
      required: true,
    },
    data: Object,
  },
  emits: ["success"],
  setup() {
    const v$ = useVuelidate()
    return { v$ }
  },
  validations() {
    return {
      bank_card_id: { required },
      send_phone: { required },
      content: { required },
      status: { required },
    }
  },
  data() {
    return {
      bank_card_id: this.data.bank_card_id,
      send_phone: this.data.send_phone,
      content: this.data.content,
      status: Boolean(this.data.status ?? true),
    }
  },
  methods: {
    async handle_submit() {
      this.v$.$touch()
      if (this.v$.$error) {
        return
      }

      const data = {
        bank_card_id: this.bank_card_id,
        send_phone: this.send_phone,
        content: this.content,
        status: Number(this.status),
      }
      if (this.mode === "create") {
        await CardSms.create(data)
        ToastService.success({
          summary: this.$i18n.t("card_sms_successfully_created"),
        })
        this.$emit("success", data)
      } else if (this.mode === "edit") {
        await CardSms.update(this.data.id, data)
        ToastService.success({
          summary: this.$i18n.t("card_sms_successfully_updated"),
        })
        this.$emit("success", data)
      }

      this.v$.$reset()
    },
  },
}
</script>

<style scoped>
form {
  min-width: 20rem;
}
</style>
