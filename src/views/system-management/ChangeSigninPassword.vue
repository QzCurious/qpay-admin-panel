<template>
  <Card style="max-width: 20rem; margin: auto">
    <template #title>{{ $t("change_signin_password") }}</template>
    <template #content>
      <form
        ref="form"
        @submit.prevent="handleSubmit"
        class="p-fluid p-d-flex p-flex-column"
      >
        <Password
          float
          v-model="old_password"
          :label="$t('old_password')"
          name="old_password"
          :errors="v$.old_password.$errors.map((e) => e.$message)"
        />
        <Password
          float
          v-model="new_password"
          :label="$t('new_password')"
          name="new_password"
          :errors="v$.new_password.$errors.map((e) => e.$message)"
        />
        <Password
          float
          v-model="confirm_new_password"
          :label="$t('confirm_new_password')"
          name="confirm_new_password"
          :errors="v$.confirm_new_password.$errors.map((e) => e.$message)"
        />
        <Button class="p-mt-3" :label="$t('form.submit')" type="submit" />
      </form>
    </template>
  </Card>
  <Toast position="top-right" />
</template>

<script>
import auth from "../../api/Auth"
import useVuelidate from "@vuelidate/core"
import { required, sameAs } from "@vuelidate/validators"
import Password from "../../components/Password"
import ToastService from "../../service/ToastService"

export default {
  components: { Password },
  setup() {
    const v$ = useVuelidate()
    return { v$ }
  },
  data() {
    return {
      old_password: null,
      new_password: null,
      confirm_new_password: null,
    }
  },
  validations() {
    return {
      old_password: { required },
      new_password: { required },
      confirm_new_password: {
        required,
        sameAsnew_password: sameAs(this.new_password),
      },
    }
  },
  methods: {
    async handleSubmit() {
      this.v$.$touch()

      if (this.v$.$error) {
        return
      }

      await auth.change_password({
        old_password: this.old_password,
        new_password: this.new_password,
      })
      this.v$.$reset()
      this.old_password = null
      this.new_password = null
      this.confirm_new_password = null

      ToastService.success({
        summary: this.$i18n.t("password_successfully_changed"),
      })
    },
  },
}
</script>

<style></style>
