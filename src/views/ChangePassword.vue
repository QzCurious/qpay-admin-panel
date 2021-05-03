<template>
  <Card style="max-width: 20rem; margin: auto">
    <template #title>重設密碼</template>
    <template #content>
      <form
        ref="form"
        @submit.prevent="handleSubmit"
        class="p-fluid p-d-flex p-flex-column"
      >
        <Password
          v-model="old_password"
          label="舊密碼"
          name="old_password"
          :errors="v$.old_password.$errors.map((e) => e.$message)"
        />
        <Password
          v-model="new_password"
          label="新密碼"
          name="new_password"
          :errors="v$.new_password.$errors.map((e) => e.$message)"
        />
        <Password
          v-model="confirm_new_password"
          label="確認新密碼"
          name="confirm_new_password"
          :errors="v$.confirm_new_password.$errors.map((e) => e.$message)"
        />
        <Button class="p-mt-3" label="送出" type="submit" />
      </form>
    </template>
  </Card>
  <Toast position="top-right" />
</template>

<script>
import auth from "../api/Auth";
import useVuelidate from "@vuelidate/core";
import { required, sameAs } from "@vuelidate/validators";
import Password from "../components/Password";

export default {
  components: { Password },
  setup() {
    const v$ = useVuelidate();
    return { v$ };
  },
  data() {
    return {
      old_password: null,
      new_password: null,
      confirm_new_password: null,
    };
  },
  validations() {
    return {
      old_password: { required },
      new_password: { required },
      confirm_new_password: {
        required,
        sameAsnew_password: sameAs(this.new_password),
      },
    };
  },
  methods: {
    handleSubmit() {
      this.v$.$touch();

      if (this.v$.$error) {
        return;
      }

      auth
        .change_password({
          old_password: this.old_password,
          new_password: this.new_password,
        })
        .then(() => {
          this.v$.$reset();
          this.old_password = null;
          this.new_password = null;
          this.confirm_new_password = null;

          this.$toast.add({
            severity: "success",
            summary: "重設密碼成功",
            life: 1800,
          });
        })
        .catch((err) => {
          if (err.response.status >= 400 && !this.v$.$error) {
            this.$toast.add({
              severity: "error",
              summary: err.response.data.message,
              life: 1800,
            });
          }
        });
    },
  },
};
</script>

<style>
</style>