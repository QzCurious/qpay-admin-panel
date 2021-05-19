<template>
  <form @submit.prevent="handle_submit" class="p-fluid p-d-flex p-flex-column">
    <InputText
      float
      v-model="name"
      label="商戶名稱"
      name="merchant_name"
      :errors="v$.name.$errors.map((e) => e.$message)"
    />
    <InputText
      float
      v-model="signin_id"
      label="帳號"
      name="signin_id"
      :errors="v$.signin_id.$errors.map((e) => e.$message)"
    />
    <Password
      float
      v-model="signin_password"
      label="密碼"
      name="password"
      :errors="v$.signin_password.$errors.map((e) => e.$message)"
    />
    <Password
      float
      v-model="payment_password"
      label="付款密碼"
      name="password"
      :errors="v$.payment_password.$errors.map((e) => e.$message)"
    />
    <div class="p-field">
      <span class="p-float-label">
        <Chips
          id="ip_allow"
          :class="{ 'p-invalid': ip_allow_invlid }"
          addOnBlur
          :modelValue="ip_allow"
          @add="ip_allow_added"
          @remove="ip_allow_remove"
        />
        <label for="ip_allow" :class="{ 'p-error': ip_allow_invlid }"
          >允許 IP</label
        >
      </span>
      <small v-if="ip_allow_invlid" class="p-error">
        {{ `${ip_allow_invlid} is not a valid IP` }}
      </small>
    </div>
    <div class="p-d-flex p-ai-end">
      <InputText
        float
        readonly
        style="flex: 1"
        v-model="md5_key"
        label="MD5_key"
        name="MD5_key"
        :errors="v$.md5_key.$errors.map((e) => e.$message)"
      />
      <Button
        @click="copy"
        v-bind="copy_btn_props"
        class="p-ml-2"
        type="button"
      />
      <Button
        v-tooltip.top="'generate a new token'"
        @click="refresh_md5_key"
        icon="pi pi-refresh"
        class="p-button-secondary p-ml-1"
        type="button"
      />
    </div>
    <Button class="p-mt-3" label="送出" type="submit" />
  </form>
  <Toast position="top-right" />
</template>

<script>
import Merchant from "../../api/Merchant";
import useVuelidate from "@vuelidate/core";
import { required, minLength, maxLength } from "@vuelidate/validators";
import { ipv4 } from "../../helper/validator";
import InputText from "../../components/InputText";
import Password from "../../components/Password";
import ToastService from "../../service/ToastService";
import cryptoRandomString from "crypto-random-string";
import copy from "copy-to-clipboard";

export default {
  components: { InputText, Password },
  emits: ["success"],
  setup() {
    const v$ = useVuelidate();
    return { v$ };
  },
  validations() {
    return {
      name: {
        required,
        minLength: minLength(2),
        maxLength: maxLength(20),
      },
      signin_id: {
        required,
        minLength: minLength(2),
        maxLength: maxLength(20),
      },
      signin_password: { required },
      payment_password: { required },
      md5_key: { required },
    };
  },
  data() {
    return {
      id: null,
      name: null,
      signin_id: null,
      signin_password: null,
      payment_password: null,
      ip_allow: [],
      ip_allow_invlid: null,
      md5_key: null,

      copy_btn_props: {
        icon: "pi pi-copy",
        class: "p-button-info",
        tooltip: "copy",
      },
    };
  },
  methods: {
    ip_allow_added(e) {
      this.ip_allow_invlid = null;

      // remove invalid
      const new_ip = e.value[e.value.length - 1];
      if (!ipv4(new_ip)) {
        this.ip_allow_invlid = new_ip;
        return;
      }

      // remove duplicate
      this.ip_allow = [...new Set(e.value)];
    },
    ip_allow_remove(e) {
      this.ip_allow_invlid = null;
      this.ip_allow = this.ip_allow.filter((item) => !e.value.includes(item));
    },
    async handle_submit() {
      this.v$.$touch();
      if (this.v$.$error) {
        return;
      }

      const data = {
        name: this.name,
        signin_id: this.signin_id,
        signin_password: this.signin_password,
        payment_password: this.payment_password,
        ip_allow: this.ip_allow.length ? this.ip_allow : null,
        md5_key: this.md5_key,
      };
      Merchant.create(data).then(() => {
        ToastService.success({ summary: "商戶新增成功" });
        this.$emit("success", data);
      });

      this.v$.$reset();
    },
    copy() {
      const copy_btn_props = { ...this.copy_btn_props };
      this.copy_btn_props = {
        icon: "pi pi-check",
        class: "p-button-success",
      };
      setTimeout(() => {
        this.copy_btn_props = copy_btn_props;
      }, 1000);
      copy(this.md5_key);
      ToastService.success({ summary: "MD5 key Copied" });
    },
    refresh_md5_key() {
      this.md5_key = cryptoRandomString({ length: 64, type: "alphanumeric" });
    },
  },
  mounted() {
    this.refresh_md5_key();
  },
};
</script>

<style scoped>
form {
  min-width: 20rem;
}
</style>