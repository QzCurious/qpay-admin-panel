<template>
  <Card style="max-width: 20rem; margin: auto">
    <template #title>重設密碼</template>
    <template #content>
      <form
        @submit.prevent="handleSubmit"
        class="p-fluid p-d-flex p-flex-column"
      >
        <div class="p-field">
          <span class="p-float-label">
            <Password
              toggleMask
              id="old-password"
              :class="{ 'p-invalid': v$.oldPassword.$error }"
              v-model="oldPassword"
              :feedback="false"
            />
            <label
              for="old-password"
              :class="{ 'p-error': v$.oldPassword.$error }"
              >舊密碼</label
            >
          </span>
          <small v-if="v$.oldPassword.$error" class="p-error">
            {{ v$.oldPassword.$errors?.[0]?.$message }}
          </small>
        </div>
        <div class="p-field">
          <span class="p-float-label">
            <Password
              toggleMask
              id="new-password"
              :class="{ 'p-invalid': v$.newPassword.$error }"
              v-model="newPassword"
              :feedback="false"
            />
            <label
              for="new-password"
              :class="{ 'p-error': v$.newPassword.$error }"
              >新密碼</label
            >
          </span>
          <small v-if="v$.newPassword.$error" class="p-error">
            {{ v$.newPassword.$errors?.[0]?.$message }}
          </small>
        </div>
        <div class="p-field">
          <span class="p-float-label">
            <Password
              toggleMask
              id="confirm-new-password"
              :class="{ 'p-invalid': v$.confirmNewPassword.$error }"
              v-model="confirmNewPassword"
              :feedback="false"
            />
            <label
              for="confirm-new-password"
              :class="{ 'p-error': v$.confirmNewPassword.$error }"
              >確認新密碼</label
            >
          </span>
          <small v-if="v$.confirmNewPassword.$error" class="p-error">
            {{ v$.confirmNewPassword.$errors?.[0]?.$message }}
          </small>
        </div>
        <Button label="Login" type="submit" />
      </form>
    </template>
  </Card>
  <Toast position="top-right" />
</template>

<script>
import auth from "../api/Auth";
import useVuelidate from "@vuelidate/core";
import { required, sameAs } from "@vuelidate/validators";

export default {
  setup() {
    const v$ = useVuelidate();
    return { v$ };
  },
  validations() {
    return {
      oldPassword: { required },
      newPassword: { required },
      confirmNewPassword: {
        required,
        sameAsNewPassword: sameAs(this.newPassword),
      },
    };
  },
  data() {
    return {
      oldPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    };
  },
  methods: {
    handleSubmit() {
      this.v$.$touch();

      if (this.v$.$error) {
        return;
      }

      auth
        .resetPassword({
          oldPassword: this.oldPassword,
          newPassword: this.newPassword,
        })
        .then(() => {
          this.oldPassword = "";
          this.newPassword = "";
          this.confirmNewPassword = "";
          this.v$.$reset();

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
.p-field {
  margin-bottom: 1.5rem;
}
</style>