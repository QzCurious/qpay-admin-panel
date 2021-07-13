<template>
  <div :style="$attrs.style" :class="$attrs.class">
    <span :class="[float ? 'p-mt-4 p-float-label' : 'p-d-flex p-ai-center']">
      <template v-if="!float && label">
        <label
          :for="name"
          :class="{ 'p-error': errors.length, 'p-mr-2': true }"
          >{{ label }}</label
        >
      </template>
      <Dropdown
        :showClear="showClear"
        :name="name"
        :style="inputStyle"
        :class="{ ...computedInputClass, 'p-invalid': errors.length }"
        :optionLabel="optionLabel"
        :optionValue="optionValue"
        v-bind="forward"
        :modelValue="modelValue"
        @update:modelValue="(value) => $emit('update:modelValue', value)"
      />
      <template v-if="float">
        <label :for="name" :class="{ 'p-error': errors.length }">{{
          label
        }}</label>
      </template>
    </span>
    <template v-if="errors.length">
      <small v-for="error in errors" :key="error" class="p-error">
        <p>{{ error }}</p>
      </small>
    </template>
  </div>
</template>

<script>
import Dropdown from "primevue/dropdown"
export default {
  inheritAttrs: false,
  components: { Dropdown },
  emits: ["update:modelValue"],
  props: {
    float: {
      type: Boolean,
      default: false,
    },
    name: {
      type: String,
      required: false,
    },
    optionLabel: {
      type: String,
      default: "label",
    },
    optionValue: {
      type: String,
      default: "value",
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
    reset_value: {
      default: null,
    },
  },
  data() {
    return {
      showClear: true,
    }
  },
  watch: {
    // 修改 x 按鈕重設值。如: reset_value = 0, 按 x 後 modelValue 設為 0 而非 null
    modelValue(value) {
      this.showClear = value !== this.reset_value
      if (value === null && this.reset_value !== null) {
        this.$emit("update:modelValue", this.reset_value)
      }
    },
  },
  computed: {
    forward() {
      const forward = { ...this.$attrs }
      delete forward.style
      delete forward.class
      return forward
    },
    computedInputClass() {
      if (
        typeof this.inputClass === "string" ||
        this.inputClass instanceof String
      ) {
        return { [this.inputClass]: true }
      } else if (Array.isArray(this.inputClass)) {
        return this.inputClass.map((cls) => ({ [cls]: true }))
      }
      return this.inputClass
    },
  },
}
</script>
