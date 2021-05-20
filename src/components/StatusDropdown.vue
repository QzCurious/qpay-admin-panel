<template>
  <Dropdown
    :label="label"
    :options="[
      { label: $t('disabled'), value: 0 },
      { label: $t('enabled'), value: 1 },
    ]"
    :modelValue="modelValue"
    @update:modelValue="(value) => $emit('update:modelValue', value)"
  />
</template>

<script>
import Dropdown from "./Dropdown.vue";
import i18n from "../i18n";

export default {
  components: { Dropdown },
  props: {
    modelValue: Number,
    label: { type: String, default: () => i18n.global.t("status") },
  },
  data() {
    return {
      value: null,
    };
  },
  emits: ["update:modelValue"],
};
</script>

<style>
</style>