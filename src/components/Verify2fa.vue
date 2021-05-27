<template>
  <form @submit.prevent="handle_submit" class="p-fluid p-d-flex p-flex-column">
    <InputText autofocus v-model="code" />
    <Button class="p-mt-3" :label="$t('form.submit')" type="submit" />
  </form>
</template>

<script>
import useVuelidate from "@vuelidate/core";
import { required, maxLength, minLength } from "@vuelidate/validators";
import Auth from "../api/Auth";
import ToastService from "../service/ToastService";

export default {
  emits: ["success"],
  setup() {
    const v$ = useVuelidate();
    return { v$ };
  },
  validations() {
    return {
      code: { required, minLength: minLength(6), maxLength: maxLength(6) },
    };
  },
  data() {
    return {
      code: null,
    };
  },
  methods: {
    handle_submit() {
      Auth.singin_2fa(this.code)
        .then(() => {
          this.$emit("success");
        })
        .catch((err) => {
          if (err.response.data.code === 9527) {
            ToastService.error({
              summary: this.$i18n.t(`api.error.${err.response.data.code}`),
            });
          }
          throw err;
        });
    },
  },
};
</script>

<style>
</style>