<template>
  <Dropdown
    optionLabel="name"
    optionValue="id"
    :label="label"
    :options="options"
    :modelValue="modelValue"
    @update:modelValue="(value) => $emit('update:modelValue', value)"
  />
</template>

<script>
import Dropdown from "./Dropdown.vue";
import Role from "../api/Role";
import store from "../store";
import i18n from "../i18n";

export default {
  components: { Dropdown },
  props: {
    modelValue: Number,
    label: { type: String, default: () => i18n.global.t("role") },
  },
  emits: ["update:modelValue"],
  computed: {
    options() {
      return store.state.api.role_list;
    },
  },
  mounted() {
    Role.all();
  },
};
</script>

<style>
</style>