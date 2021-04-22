<template>
  <div class="p-pt-6 p-d-flex p-jc-center">
    <div class="container">
      <h1>登入</h1>
      <form
        @submit.prevent="handleSubmit"
        class="p-fluid p-d-flex p-flex-column"
      >
        <div class="p-field">
          <div class="p-float-label">
            <InputText
              id="username"
              :class="{ 'p-invalid': v$.username.$error }"
              v-model="username"
            />
            <label for="username" :class="{ 'p-error': v$.username.$error }"
              >帳號</label
            >
          </div>
          <small v-if="v$.username.$error" class="p-error">
            {{ v$.username.$errors?.[0]?.$message }}
          </small>
        </div>
        <div class="p-field">
          <span class="p-float-label">
            <Password
              id="password"
              :class="{ 'p-invalid': v$.password.$error }"
              v-model="password"
              :feedback="false"
            />
            <label for="password" :class="{ 'p-error': v$.password.$error }"
              >密碼</label
            >
          </span>
          <small v-if="v$.password.$error" class="p-error">
            {{ v$.password.$errors?.[0]?.$message }}
          </small>
        </div>
        <Button label="Login" type="submit" />
      </form>
    </div>
  </div>
  <Toast position="top-center" />
</template>

<script>
import auth from "../api/Auth";
import router from "../router";
import useVuelidate from "@vuelidate/core";
import { required, minLength } from "@vuelidate/validators";

export default {
  setup() {
    const v$ = useVuelidate();
    return { v$ };
  },
  validations() {
    return {
      username: { required, minLength: minLength(2) },
      password: { required },
    };
  },
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    handleSubmit() {
      this.v$.$touch();

      if (this.v$.$error) {
        return;
      }

      auth
        .signin({
          username: this.username,
          password: this.password,
        })
        .then(() => {
          router.push(this.$route.redirectedFrom?.fullPath || "/");
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
.container {
  width: min(100%, 18rem);
}
form {
  padding: 1rem 0;
}
.p-field {
  margin-bottom: 1.5rem;
}
</style>