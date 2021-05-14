<template>
  <div :style="$attrs.style" class="p-field" :class="$attrs.class">
    <span class="p-float-label">
      <Dropdown
        :name="name"
        :style="inputStyle"
        :class="{ ...computedInputClass, 'p-invalid': errors.length }"
        v-bind="forward"
        :modelValue="modelValue"
        @update:modelValue="(value) => $emit('update:modelValue', value)"
      />
      <label :for="name" :class="{ 'p-error': errors.length }">{{
        label
      }}</label>
    </span>
    <template v-if="errors.length">
      <small v-for="error in errors" :key="error" class="p-error">
        <p>{{ error }}</p>
      </small>
    </template>
  </div>
</template>

<script>
import Dropdown from "primevue/dropdown";
export default {
  inheritAttrs: false,
  components: { Dropdown },
  emits: ["update:modelValue"],
  props: {
    name: {
      type: String,
      required: false,
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
    inputClass: [Object, Array, String],
    inputStyle: [Object, Array, String],
  },
  computed: {
    forward() {
      const forward = { ...this.$attrs };
      delete forward.style;
      delete forward.class;
      return forward;
    },
    computedInputClass() {
      if (
        typeof this.inputClass === "string" ||
        this.inputClass instanceof String
      ) {
        return { [this.inputClass]: true };
      } else if (Array.isArray(this.inputClass)) {
        return this.inputClass.map((cls) => ({ [cls]: true }));
      }
      return this.inputClass;
    },
  },
};
</script>

<style>
.p-field {
  margin: 1.5rem 0 0 0;
}
</style>