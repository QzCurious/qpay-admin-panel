<template>
  <div class="p-field">
    <span class="p-float-label">
      <Password
        toggleMask
        :feedback="false"
        :name="name"
        :class="{ 'p-invalid': errors.length }"
        :modelValue="modelValue"
        @update:modelValue="(value) => $emit('update:modelValue', value)"
      />
      <label :for="name" :class="{ 'p-error': errors.length }">{{ label }}</label>
    </span>
    <template v-if="errors.length">
      <small v-for="error in errors" :key="error" class="p-error">
        <p>{{ error }}</p>
      </small>
    </template>
  </div>
</template>

<script>
export default {
  emits: ["update:modelValue"],
  props: {
    name: {
      type: String,
      required: true,
    },
    modelValue: {
      default: null,
    },
    label: {
      type: String,
      default: null,
    },
    errors: {
      type: Array,
      default: () => [],
    },
  },
};
</script>

<style>
.p-field {
  margin: 1.5rem 0 0 0;
}
</style>