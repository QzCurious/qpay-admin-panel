<template>
  <form @submit.prevent="handle_submit" class="p-fluid p-d-flex p-flex-column">
    <InputText
      float
      autofocus
      class="p-mb-3"
      v-model="name"
      :label="$t('role')"
      name="role"
      :readonly="mode === 'edit'"
      :errors="v$.name.$errors.map((e) => e.$message)"
    />
    <Tree
      style="min-width: 20rem"
      :value="permissions"
      selectionMode="checkbox"
      v-model:selectionKeys="selected"
    ></Tree>
    <Button class="p-mt-3" :label="$t('form.submit')" type="submit" />
  </form>
  <Toast position="top-right" />
</template>

<script>
import Role from "../../api/Role"
import useVuelidate from "@vuelidate/core"
import { required } from "@vuelidate/validators"
import menu from "../../layouts/AdminLayout/menu"
import { rename_key } from "../../helper/array"
import InputText from "../../components/InputText"
import ToastService from "../../service/ToastService"

export default {
  components: { InputText },
  emits: ["success"],
  props: {
    mode: {
      type: String,
      validator: (value) => ["edit", "create"].includes(value),
      required: true,
    },
    role_id: {
      type: Number,
    },
  },
  setup() {
    const v$ = useVuelidate()
    return { v$ }
  },
  validations() {
    return {
      name: this.mode === "create" ? { required } : {},
    }
  },
  data() {
    return {
      name: null,
      allow_auth: [],
      available_auth: [],
      selected: {},
      submitting: false,
    }
  },
  computed: {
    permissions() {
      const permissions = rename_key(menu.value)
      for (let i = permissions.length - 1; i >= 0; --i) {
        for (let k = permissions[i].children.length - 1; k >= 0; --k) {
          if (!this.available_auth.includes(permissions[i].children[k].key)) {
            permissions[i].children.splice(k, 1)
          }
        }
        if (permissions[i].children.length === 0) {
          permissions.splice(i, 1)
        }
      }
      return permissions
    },
  },
  methods: {
    async handle_submit() {
      this.v$.$touch()
      if (this.v$.$error) {
        return
      }

      this.submitting = true
      const data = {
        allow_auth: Object.entries(this.selected)
          .filter(([key, value]) => value.checked)
          .reduce((acc, cur) => [...acc, cur[0]], []),
      }
      if (this.mode === "create") {
        data.name = this.name
        try {
          await Role.create(data)
        } finally {
          this.submitting = false
        }

        ToastService.success({
          summary: this.$i18n.t("role_successfully_created"),
        })
      } else if (this.mode === "edit") {
        try {
          await Role.update(this.role_id, data)
        } finally {
          this.submitting = false
        }

        ToastService.success({
          summary: this.$i18n.t("role_successfully_updated"),
        })
      }
      this.$emit("success")

      this.v$.$reset()
    },
  },
  watch: {
    role_id(new_value, old_value) {
      if (new_value !== old_value) {
        this.allow_auth = this.available_auth = []
      }
    },
  },
  async mounted() {
    if (this.mode === "edit") {
      const res = await Role.get(this.role_id)
      this.name = res.data.name

      // 雖說 api 叫 allow_auth，但其實是白名單
      this.allow_auth = res.data.allow_auth
      this.available_auth = res.data.available_auth

      const selected = {}
      for (const group of this.permissions) {
        for (const child of group.children) {
          selected[child.key] = {
            checked: this.allow_auth.includes(child.key),
          }
        }
        selected[group.key] = {
          checked: group.children
            .map((child) => child.key)
            .every((child) => selected?.[child].checked),
        }
        selected[group.key].partialChecked =
          group.children
            .map((child) => child.key)
            .some((child) => selected?.[child].checked) &&
          !selected[group.key].checked
      }
      this.selected = selected
    } else {
      this.available_auth = this.$store.state.auth.available_auth
    }
  },
}
</script>

<style></style>
