<template>
  <form @submit.prevent="handle_submit" class="p-fluid p-d-flex p-flex-column">
    <InputText
      float
      v-model="name"
      label="銀行"
      name="name"
      :errors="v$.name.$errors.map((e) => e.$message)"
    />
    <InputText
      float
      v-model="country"
      label="國家"
      name="country"
      :errors="v$.country.$errors.map((e) => e.$message)"
    />
    <InputText
      float
      v-model="code"
      label="code"
      name="code"
      :errors="v$.code.$errors.map((e) => e.$message)"
    />
    <div class="p-d-flex p-ai-center p-mt-3">
      <InputSwitch v-model="status" />
      <span class="p-ml-2">狀態</span>
    </div>
    <div class="p-d-flex p-ai-center p-mt-3">
      <InputSwitch v-model="transfer" />
      <span class="p-ml-2">Transfer</span>
    </div>
    <Button class="p-mt-3" label="送出" type="submit" />
  </form>
  <Toast position="top-right" />
</template>

<script>
import Bank from "../../api/Bank";
import useVuelidate from "@vuelidate/core";
import { required, maxLength, minLength } from "@vuelidate/validators";
import InputText from "../../components/InputText";
import ToastService from "../../service/ToastService";

export default {
  components: { InputText },
  emits: ["success"],
  props: {
    mode: {
      type: String,
      validator: (value) => ["edit", "create"].includes(value),
      required: true,
    },
    data: Object,
  },
  setup() {
    const v$ = useVuelidate();
    return { v$ };
  },
  validations() {
    return {
      name: { required, minLength: minLength(2), maxLength: maxLength(16) },
      country: { maxLength: maxLength(10) },
      code: { maxLength: maxLength(10) },
      status: { required },
      transfer: { required },
    };
  },
  data() {
    return {
      name: this.data?.name,
      country: this.data?.country,
      code: this.data?.code,
      status: this.data?.status ?? true,
      transfer: this.data?.transfer ?? true,
    };
  },
  methods: {
    async handle_submit() {
      this.v$.$touch();
      if (this.v$.$error) {
        return;
      }

      const data = {
        name: this.name,
        country: this.country,
        code: this.code,
        status: this.status,
        transfer: this.transfer,
      };
      if (this.mode === "create") {
        Bank.create(data).then(() => {
          ToastService.success({ summary: "銀行新增成功" });

          this.$emit("success", data);
        });
      } else if (this.mode === "edit") {
        Bank.update(this.data.id, data).then(() => {
          ToastService.success({ summary: "銀行修改成功" });

          this.$emit("success", data);
        });
      }

      this.v$.$reset();
    },
  },
};
</script>

<style scoped>
form {
  min-width: 20rem;
}
</style>