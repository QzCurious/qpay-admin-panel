<template>
  <form @submit.prevent="submit" class="p-d-flex p-flex-column">
    <InputText
      float
      autoFocus
      :label="$t('deposit_limit_once')"
      v-model="deposit_limit_once"
      :errors="v$.deposit_limit_once.$errors.map((e) => e.$message)"
    />
    <Button
      :loading="submitting"
      type="submit"
      class="p-mt-3"
      :label="$t('form.submit')"
    />
  </form>
</template>

<script>
import { required, numeric } from "@vuelidate/validators"
import useVuelidate from "@vuelidate/core"
import Card from "../../api/Card"
import InputText from "../../components/InputText"

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
      deposit_limit_once: { required, numeric },
    }
  },
  data() {
    return {
      deposit_limit_once: this.data.deposit_limit_once,
      submitting: false,
    }
  },
  methods: {
    async submit() {
      this.v$.$touch()

      if (this.v$.$error) {
        return
      }

      this.submitting = true
      await Card.update(this.data.id, {
        deposit_limit_once: this.deposit_limit_once,
      })
      this.submitting = false
      this.$emit("success")
    },
  },
}
</script>

<style></style>
