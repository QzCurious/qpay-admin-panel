<template>
  <div class="p-pt-6 p-d-flex p-jc-center">
    <div class="container">
      <h1>登入</h1>
      <form
        @submit.prevent="handle_submit"
        class="p-fluid p-d-flex p-flex-column"
      >
        <InputText
          v-model="signin_id"
          label="帳號"
          name="signin_id"
          :errors="v$.signin_id.$errors.map((e) => e.$message)"
        />
        <Password
          v-model="password"
          label="密碼"
          name="password"
          :errors="v$.password.$errors.map((e) => e.$message)"
        />
        <Button class="p-mt-3" label="Login" type="submit" />
      </form>
    </div>
  </div>
  <!-- <Toast position="top-center" /> -->
</template>

<script>
import auth from "../api/Auth";
import router from "../router";
import useVuelidate from "@vuelidate/core";
import { required, minLength } from "@vuelidate/validators";
import InputText from "../components/InputText";
import Password from "../components/Password";

export default {
  components: { InputText, Password },
  setup() {
    const v$ = useVuelidate();
    return { v$ };
  },
  validations() {
    return {
      signin_id: { required, minLength: minLength(2) },
      password: { required },
    };
  },
  data() {
    return {
      signin_id: null,
      password: null,
    };
  },
  methods: {
    async handle_submit() {
      this.v$.$touch();

      if (this.v$.$error) {
        return;
      }

      const res = await auth.signin({
        signin_id: this.signin_id,
        password: this.password,
      });

      if (res.status > 300) return;

      router.push(this.$route.redirectedFrom?.fullPath || "/");
    },
  },
};
</script>

<style>
.container {
  width: min(100%, 18rem);
}
</style>