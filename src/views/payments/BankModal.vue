<template>
  <form @submit.prevent="handle_submit" class="p-fluid p-d-flex p-flex-column">
    <InputText
      float
      v-model="name"
      :label="$t('bank')"
      name="name"
      :errors="v$.name.$errors.map((e) => e.$message)"
    />
    <InputText
      float
      v-model="country"
      :label="$t('country')"
      name="country"
      :errors="v$.country.$errors.map((e) => e.$message)"
    />
    <InputText
      float
      v-model="code"
      :label="$t('bank_code')"
      name="code"
      :errors="v$.code.$errors.map((e) => e.$message)"
    />
    <div class="p-d-flex p-ai-center p-mt-3">
      <InputSwitch v-model="status" />
      <span class="p-ml-2">{{ $t("status") }}</span>
    </div>
    <div class="p-d-flex p-ai-center p-mt-3">
      <InputSwitch v-model="transfer" />
      <span class="p-ml-2">{{ $t("transfer") }}</span>
    </div>
    <Button class="p-mt-3" :label="$t('form.submit')" type="submit" />
  </form>
  <Toast position="top-right" />
</template>

<script>
import Bank from "../../api/Bank"
import useVuelidate from "@vuelidate/core"
import { required, maxLength, minLength } from "@vuelidate/validators"
import InputText from "../../components/InputText"
import ToastService from "../../service/ToastService"

export default {
  components: { InputText },
  emits: ["success"],
  props: {
    mode: {
      type: String,
      validator: (value) => ["edit", "create"].includes(value),
      required: true,
    },
    data: Object,
  },
  setup() {
    const v$ = useVuelidate()
    return { v$ }
  },
  validations() {
    return {
      name: { required, minLength: minLength(2), maxLength: maxLength(16) },
      country: { maxLength: maxLength(10) },
      code: { maxLength: maxLength(10) },
      status: { required },
      transfer: { required },
    }
  },
  data() {
    return {
      name: this.data?.name,
      country: this.data?.country,
      code: this.data?.code,
      status: this.data?.status ?? true,
      transfer: this.data?.transfer ?? true,
    }
  },
  methods: {
    async handle_submit() {
      this.v$.$touch()
      if (this.v$.$error) {
        return
      }

      const data = {
        name: this.name,
        country: this.country,
        code: this.code,
        status: Number(this.status),
        transfer: Number(this.transfer),
      }
      if (this.mode === "create") {
        await Bank.create(data)
        ToastService.success({
          summary: this.$i18n.t("bank_successfully_created"),
        })
        this.$emit("success", data)
      } else if (this.mode === "edit") {
        await Bank.update(this.data.id, data)
        ToastService.success({
          summary: this.$i18n.t("bank_successfully_updated"),
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
