<template>
  <Button
    type="button"
    icon="pi pi-filter-slash"
    :label="$t('form.clear')"
    :class="{ 'p-button-outlined': true, ...$attrs.class }"
    v-bind="$attrs"
  />
</template>

<script>
import Button from "primevue/button"

export default {
  inheritAttrs: false,
  components: { Button },
}
</script>
