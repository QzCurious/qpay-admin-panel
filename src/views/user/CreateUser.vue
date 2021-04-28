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
        <div class="p-field">
          <span class="p-float-label">
            <InputText
              id="signin_id"
              :class="{ 'p-invalid': v$.signin_id.$error }"
              v-model="signin_id"
            />
            <label for="signin_id" :class="{ 'p-error': v$.signin_id.$error }"
              >帳號</label
            >
          </span>
          <small v-if="v$.signin_id.$error" class="p-error">
            {{ v$.signin_id.$errors?.[0]?.$message }}
          </small>
        </div>
        <div class="p-field">
          <span class="p-float-label">
            <InputText
              id="signin_password"
              :class="{ 'p-invalid': v$.signin_password.$error }"
              v-model="signin_password"
            />
            <label
              for="signin_password"
              :class="{ 'p-error': v$.signin_password.$error }"
              >密碼</label
            >
          </span>
          <small v-if="v$.signin_password.$error" class="p-error">
            {{ v$.signin_password.$errors?.[0]?.$message }}
          </small>
        </div>
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
        <div class="p-field">
          <span class="p-float-label">
            <InputText
              id="phone"
              :class="{ 'p-invalid': v$.phone.$error }"
              v-model="phone"
            />
            <label for="phone" :class="{ 'p-error': v$.phone.$error }"
              >電話</label
            >
          </span>
          <small v-if="v$.phone.$error" class="p-error">
            {{ v$.phone.$errors?.[0]?.$message }}
          </small>
        </div>
        <Button label="建立" type="submit" />
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

export default {
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
            summary: "職位新增成功",
            life: 1800,
          });
        });
    },
  },
};
</script>

<style>
.p-field {
  margin-bottom: 1.5rem;
}
</style>