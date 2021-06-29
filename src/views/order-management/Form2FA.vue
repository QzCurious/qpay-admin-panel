<template>
  <form @submit.prevent="handle_submit" class="p-fluid p-d-flex p-flex-column">
    <InputText
      float
      v-model="code"
      :label="$t('verify_2fa')"
      :errors="v$.code.$errors.map((e) => e.$message)"
    />
    <Button class="p-mt-3" :label="$t('form.submit')" type="submit" />
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
      code: { required, numeric },
    }
  },
  data() {
    return {
      id: this.data?.id,
      code: this.data?.code,
    }
  },
  methods: {
    async handle_submit() {
      this.v$.$touch()
      if (this.v$.$error) {
        return
      }
      let data = {
        id: this.id,
        code: this.code,
      }
      this.$emit("success", data)
      this.v$.$reset()
    },
  },
}
</script>

<style scoped></style>
