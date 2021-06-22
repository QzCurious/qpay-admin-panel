<template>
  <InputNumber
    :showButtons="modelValue !== null || isFocused"
    buttonLayout="horizontal"
    suffix="%"
    :step="0.1"
    :modelValue="
      modelValue &&
        numeral(modelValue)
          .multiply(100)
          .value()
    "
    @input="
      ({ value }) =>
        $emit(
          'update:modelValue',
          value &&
            numeral(value)
              .divide(100)
              .value()
        )
    "
    @focus="isFocused = true"
    @blur="isFocused = false"
    v-bind="forward_props"
  />
</template>

<script>
import InputNumber from "./InputNumber.vue"
export default {
  components: {
    InputNumber,
  },
  props: {
    modelValue: Number,
    label: { type: String },
  },
  data() {
    return {
      isFocused: false,
    }
  },
  computed: {
    forward_props() {
      const forward = { ...this.$props }
      delete forward.modelValue
      return forward
    },
  },
  emits: ["update:modelValue"],
  methods: {
    input(event) {
      console.log("input", event.value)
    },
  },
}
</script>

<style></style>
