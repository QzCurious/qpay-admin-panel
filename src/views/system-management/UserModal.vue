<template>
  <form @submit.prevent="handle_submit" class="p-fluid p-d-flex p-flex-column">
    <RoleDropdown
      float
      v-model="role_id"
      :errors="v$.role_id.$errors.map((e) => e.$message)"
    />
    <InputText
      float
      v-model="signin_id"
      :label="$t('signin_id')"
      name="signin_id"
      :disabled="mode === 'edit'"
      :errors="v$.signin_id.$errors.map((e) => e.$message)"
    />
    <Password
      float
      v-model="signin_password"
      :label="$t('signin_password')"
      name="password"
      :errors="v$.signin_password.$errors.map((e) => e.$message)"
    />
    <Password
      float
      v-model="payment_password"
      :label="$t('payment_password')"
      name="password"
      :errors="v$.payment_password.$errors.map((e) => e.$message)"
    />
    <div>
      <span class="p-float-label p-mt-4">
        <Chips
          id="ip_allow"
          :class="{ 'p-invalid': ip_allow_invlid }"
          addOnBlur
          :modelValue="ip_allow"
          @add="ip_allow_added"
          @remove="ip_allow_remove"
        />
        <label for="ip_allow" :class="{ 'p-error': ip_allow_invlid }">{{
          $t("ip_allow")
        }}</label>
      </span>
      <small v-if="ip_allow_invlid" class="p-error">
        {{ $t("ip_is_invalid") }} {{ ip_allow_invlid }}
      </small>
    </div>
    <InputText
      float
      v-model="phone"
      :label="$t('phone')"
      name="phone"
      :errors="v$.phone.$errors.map((e) => e.$message)"
    />
    <Button class="p-mt-3" :label="$t('form.submit')" type="submit" />
  </form>
  <Toast position="top-right" />
</template>

<script>
import user from "../../api/User";
import useVuelidate from "@vuelidate/core";
import { required, minLength } from "@vuelidate/validators";
import { ipv4 } from "../../helper/validator";
import InputText from "../../components/InputText";
import Password from "../../components/Password";
import RoleDropdown from "../../components/RoleDropdown";
import ToastService from "../../service/ToastService";

export default {
  components: { InputText, Password, RoleDropdown },
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
      signin_id: { required, minLength: minLength(2) },
      signin_password: this.mode === "create" ? { required } : {},
      payment_password: this.mode === "create" ? { required } : {},
      role_id: { required },
      phone: {},
    };
  },
  data() {
    return {
      signin_id: this.data?.signin_id,
      signin_password: this.data?.signin_password,
      payment_password: this.data?.payment_password,
      role_id: this.data?.role_id,
      ip_allow: this.data?.ip_allow ?? [],
      ip_allow_invlid: this.data?.ip_allow_invlid,
      phone: this.data?.phone,
      status: this.data?.status ?? true,
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
        signin_id: this.signin_id,
        role_id: this.role_id,
        signin_password: this.signin_password,
        payment_password: this.payment_password,
        ip_allow: this.ip_allow.length ? this.ip_allow : null,
        phone: this.phone,
        status: Boolean(this.status),
      };
      if (this.mode === "create") {
        user.create(data).then(() => {
          ToastService.success({
            summary: this.$i18n.t("account_successfully_created"),
          });

          this.$emit("success", data);
        });
      } else if (this.mode === "edit") {
        user.update(this.signin_id, data).then(() => {
          ToastService.success({
            summary: this.$i18n.t("account_successfully_updated"),
          });

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