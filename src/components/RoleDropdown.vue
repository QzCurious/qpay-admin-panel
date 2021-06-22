<template>
  <Dropdown
    optionLabel="name"
    optionValue="id"
    :label="data_label"
    :options="options"
    :modelValue="modelValue"
    @update:modelValue="(value) => $emit('update:modelValue', value)"
  />
</template>

<script>
import Dropdown from "./Dropdown.vue"
import Role from "../api/Role"
import store from "../store"

export default {
  components: { Dropdown },
  props: {
    modelValue: Number,
    label: { type: String },
  },
  emits: ["update:modelValue"],
  computed: {
    data_label() {
      return this.label ?? this.$i18n.t("role")
    },
    options() {
      return store.state.api.role_list
    },
  },
  mounted() {
    Role.all()
  },
}
</script>

<style></style>
