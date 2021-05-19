<template>
  <form @submit.prevent="handle_submit" class="p-fluid p-d-flex p-flex-column">
    <div class="p-field">
      <span class="p-float-label">
        <Dropdown
          id="role"
          filter
          v-model="role"
          :options="roles"
          optionLabel="name"
          optionValue="id"
        />
        <label for="role" :class="{ 'p-error': v$.role.$error }">職位</label>
      </span>
      <small v-if="v$.role.$error" class="p-error">
        {{ v$.role.$errors?.[0]?.$message }}
      </small>
    </div>
    <InputText
      float
      v-model="signin_id"
      label="帳號"
      name="signin_id"
      :disabled="mode === 'edit'"
      :errors="v$.signin_id.$errors.map((e) => e.$message)"
    />
    <Password
      float
      v-model="signin_password"
      label="密碼"
      name="password"
      :errors="v$.signin_password.$errors.map((e) => e.$message)"
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
        <label for="ip_allow" :class="{ 'p-error': ip_allow_invlid }"
          >允許 IP</label
        >
      </span>
      <small v-if="ip_allow_invlid" class="p-error">
        {{ `${ip_allow_invlid} is not a valid IP` }}
      </small>
    </div>
    <InputText
      float
      v-model="phone"
      label="電話"
      name="phone"
      :errors="v$.phone.$errors.map((e) => e.$message)"
    />
    <Button class="p-mt-3" label="建立" type="submit" />
  </form>
  <Toast position="top-right" />
</template>

<script>
import role from "../../api/Role";
import user from "../../api/User";
import useVuelidate from "@vuelidate/core";
import { required, minLength } from "@vuelidate/validators";
import { ipv4 } from "../../helper/validator";
import InputText from "../../components/InputText";
import Password from "../../components/Password";

export default {
  components: { InputText, Password },
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
      role: { required },
      phone: {},
    };
  },
  data() {
    return {
      signin_id: this.data?.signin_id,
      signin_password: this.data?.signin_password,
      role: this.data?.role?.id,
      roles: [],
      ip_allow: this.data?.ip_allow ?? [],
      ip_allow_invlid: this.data?.ip_allow_invlid,
      phone: this.data?.phone,
    };
  },
  async mounted() {
    role
      .all()
      .then(({ data }) => {
        this.roles = data;
        user.all().then();
      })
      .catch((err) => {
        this.$toast.add({
          severity: "error",
          summary: err.response.data.message,
          life: 1800,
        });
      });
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
        signin_password: this.signin_password,
        ip_allow: this.ip_allow,
        phone: this.phone,
      };
      if (this.mode === "create") {
        await user.create(data);
        this.$toast.add({
          severity: "success",
          summary: "帳號新增成功",
          life: 1800,
        });
      } else if (this.mode === "edit") {
        await user.update(this.signin_id, data);
        this.$toast.add({
          severity: "success",
          summary: "帳號新增成功",
          life: 1800,
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