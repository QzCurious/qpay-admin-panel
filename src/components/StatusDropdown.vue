<template>
  <Dropdown
    :label="data_label"
    :options="[
      { label: $t('disabled'), value: 0 },
      { label: $t('enabled'), value: 1 },
    ]"
    :modelValue="modelValue"
    @update:modelValue="(value) => $emit('update:modelValue', value)"
  />
</template>

<script>
import Dropdown from "./Dropdown.vue"

export default {
  components: { Dropdown },
  props: {
    modelValue: Number,
    label: { type: String },
  },
  data() {
    return {
      value: null,
    }
  },
  computed: {
    data_label() {
      return this.label ?? this.$i18n.t("status")
    },
  },
  emits: ["update:modelValue"],
}
</script>

<style></style>
