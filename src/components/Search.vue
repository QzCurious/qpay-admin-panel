<template>
  <Button
    type="submit"
    icon="pi pi-search"
    :label="$t('form.search')"
    :class="{ 'p-button-outlined': true, ...$attrs.class }"
  />
</template>

<script>
import Button from "primevue/button"
import i18n from "../i18n"

export default {
  inheritAttrs: false,
  components: { Button },
  emits: ["update:modelValue"],
  props: {
    modelValue: Number,
    label: { type: String, default: () => i18n.global.t("form.search") },
  },
}
</script>
