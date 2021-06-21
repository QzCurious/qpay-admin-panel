<template>
  <form @submit.prevent="submit" class="p-d-flex p-flex-column">
    <InputText
      float
      autoFocus
      :label="$t('balance')"
      v-model="balance"
      :errors="v$.balance.$errors.map((e) => e.$message)"
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
import { required, numeric } from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";
import Card from "../../api/Card";
import InputText from "../../components/InputText";

export default {
  components: {
    InputText,
  },
  emits: ["success"],
  props: {
    data: Object,
  },
  setup() {
    const v$ = useVuelidate();
    return { v$ };
  },
  validations() {
    return {
      balance: { required, numeric },
    };
  },
  data() {
    return {
      balance: this.data.balance,
      submitting: false,
    };
  },
  methods: {
    async submit() {
      this.v$.$touch();

      if (this.v$.$error) {
        return;
      }

      this.submitting = true;
      await Card.update(this.data.id, {
        balance: this.balance,
      });
      this.submitting = false;
      this.$emit("success");
    },
  },
};
</script>

<style>
</style>