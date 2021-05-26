<template>
  <form @submit.prevent="handle_submit" class="p-fluid p-d-flex p-flex-column">
    <InputText
      float
      v-model="name"
      :label="$t('merchant')"
      name="merchant_name"
      :errors="v$.name.$errors.map((e) => e.$message)"
    />
    <div class="p-d-flex p-ai-end">
      <InputText
        float
        readonly
        style="flex: 1"
        v-model="md5_key"
        :label="$t('MD5_key')"
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
        v-tooltip.top="$t('generate_new_MD5_key')"
        @click="refresh_md5_key"
        icon="pi pi-refresh"
        class="p-button-secondary p-ml-1"
        type="button"
      />
    </div>
    <Button class="p-mt-3" :label="$t('form.submit')" type="submit" />
  </form>
  <Toast position="top-right" />
</template>

<script>
import Merchant from "../../api/Merchant";
import useVuelidate from "@vuelidate/core";
import { required, minLength, maxLength } from "@vuelidate/validators";
import { ipv4 } from "../../helper/validator";
import InputText from "../../components/InputText";
import ToastService from "../../service/ToastService";
import cryptoRandomString from "crypto-random-string";
import copy from "copy-to-clipboard";

export default {
  components: { InputText },
  emits: ["success"],
  props: {
    id: {
      type: Number,
      required: true,
    },
  },
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
      md5_key: { required },
    };
  },
  data() {
    return {
      name: null,
      md5_key: null,

      copy_btn_props: {
        icon: "pi pi-copy",
        class: "p-button-info",
        tooltip: this.$i18n.t("form.copy"),
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
        md5_key: this.md5_key,
      };
      Merchant.update(this.id, data).then(() => {
        ToastService.success({
          summary: this.$i18n.t("merchant_successfully_updated"),
        });
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
      ToastService.success({ summary: this.$i18n.t("MD5_key_copied") });
    },
    refresh_md5_key() {
      this.md5_key = cryptoRandomString({ length: 64, type: "alphanumeric" });
    },
  },
  mounted() {
    Merchant.get(this.id).then((res) => {
      this.name = res.data.name;
      this.md5_key = res.data.md5_key;
    });
  },
};
</script>

<style scoped>
form {
  min-width: 20rem;
}
</style>