<template>
  <form @submit.prevent="handle_submit" class="p-fluid p-d-flex p-flex-column">
    <template v-if="data.role">
      <h2 style="font-size: 1.2rem">{{ role }}</h2>
    </template>
    <template v-if="!data.role">
      <InputText
        autofocus
        class="p-mb-3"
        v-model="role"
        label="職稱"
        name="role"
        :disabled="mode === 'edit'"
        :errors="v$.role.$errors.map((e) => e.$message)"
      />
    </template>
    <Tree
      style="min-width: 20rem"
      :value="permissions"
      selectionMode="checkbox"
      v-model:selectionKeys="selected"
    ></Tree>
    <Button class="p-mt-3" label="建立" type="submit" />
  </form>
  <Toast position="top-right" />
</template>

<script>
import Role from "../../api/Role";
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import menu from "../../layouts/AdminLayout/menu";
import { rename_key } from "../../helper/array";
import InputText from "../../components/InputText";

export default {
  components: { InputText },
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
      role: this.mode === "create" ? { required } : {},
    };
  },
  data() {
    return {
      role: this.data?.role?.name,
      selected: this.data?.selected || [],
    };
  },
  computed: {
    permissions() {
      return rename_key(menu.value);
    },
  },
  methods: {
    async handle_submit() {
      this.v$.$touch();
      if (this.v$.$error) {
        return;
      }

      const data = {
        permissions: this.selected,
      };
      if (this.mode === "create") {
        Role.create(data).then(() => {
          this.$toast.add({
            severity: "success",
            summary: "職位新增成功",
            life: 1800,
          });
        });
      } else if (this.mode === "edit") {
        await Role.update(this.role.id, data).then(() => {
          this.$toast.add({
            severity: "success",
            summary: "職位更新成功",
            life: 1800,
          });
        });
      }

      this.v$.$reset();
    },
  },
};
</script>

<style>
</style>