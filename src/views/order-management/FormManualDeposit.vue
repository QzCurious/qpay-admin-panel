<template>
  <form @submit.prevent="handle_submit" class="p-d-flex p-flex-column">
    <InputText
      float
      autofocus
      :label="$t('amount')"
      v-model="amount"
      :errors="v$.amount.$errors.map((e) => e.$message)"
    />
    <InputText float autofocus :label="$t('remark')" v-model="remark" />
    <InputText
      float
      autofocus
      :label="$t('verify_2fa')"
      v-model="code"
      :errors="v$.code.$errors.map((e) => e.$message)"
    />
    <Button type="submit" class="p-mt-2" :label="$t('form.submit')" />
  </form>
</template>
<script>
import InputText from "../../components/InputText.vue"
import useVuelidate from "@vuelidate/core"
import { required, numeric } from "@vuelidate/validators"

export default {
  components: {
    InputText,
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
      amount: { required, numeric },
      code: { required, numeric },
    }
  },
  data() {
    return {
      id: this.data?.id,
      amount: this.data?.amount,
      remark: this.data?.remark,
      code: this.data?.code,
    }
  },
  methods: {
    async handle_submit() {
      this.v$.$touch()
      if (this.v$.$error) return

      let data = {
        id: this.id,
        amount: this.amount,
        remark: this.remark,
        code: this.code,
      }
      this.$emit("success", data)
      this.v$.$reset()
    },
  },
}
</script>
<style scoped></style>
