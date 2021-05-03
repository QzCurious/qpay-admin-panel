<template>
  <Card style="max-width: 20rem; margin: auto">
    <template #title>建立帳號</template>
    <template #content>
      <form
        @submit.prevent="handleSubmit"
        class="p-fluid p-d-flex p-flex-column"
      >
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
            <label for="role" :class="{ 'p-error': v$.role.$error }"
              >職位</label
            >
          </span>
          <small v-if="v$.role.$error" class="p-error">
            {{ v$.role.$errors?.[0]?.$message }}
          </small>
        </div>
        <InputText
          v-model="signin_id"
          label="帳號"
          name="signin_id"
          :errors="v$.signin_id.$errors.map((e) => e.$message)"
        />
        <Password
          v-model="signin_password"
          label="密碼"
          name="password"
          :errors="v$.signin_password.$errors.map((e) => e.$message)"
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
        <InputText
          v-model="phone"
          label="電話"
          name="phone"
          :errors="v$.phone.$errors.map((e) => e.$message)"
        />
        <Button class="p-mt-3" label="建立" type="submit" />
      </form>
    </template>
  </Card>
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
  setup() {
    const v$ = useVuelidate();
    return { v$ };
  },
  validations() {
    return {
      signin_id: { required, minLength: minLength(2) },
      signin_password: { required },
      role: { required },
      phone: {},
    };
  },
  data() {
    return {
      signin_id: "",
      signin_password: "",
      role: null,
      roles: [],
      ip_allow: [],
      ip_allow_invlid: null,
      phone: "",
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
    handleSubmit() {
      this.v$.$touch();

      if (this.v$.$error) {
        return;
      }

      user
        .create({
          signin_id: this.signin_id,
          signin_password: this.signin_password,
          ip_allow: this.ip_allow,
          phone: this.phone,
        })
        .then(() => {
          this.signin_id = "";
          this.signin_password = "";
          this.role = null;
          this.roles = [];
          this.ip_allow = [];
          this.ip_allow_invlid = null;
          this.phone = "";
          this.v$.$reset();

          this.$toast.add({
            severity: "success",
            summary: "帳號新增成功",
            life: 1800,
          });
        });
    },
  },
};
</script>

<style>
</style>