<template>
  <div :style="$attrs.style" :class="$attrs.class">
    <span :class="{ 'p-mt-4 p-float-label': float }">
      <template v-if="!float && label">
        <label
          :for="name"
          :class="{ 'p-error': errors.length, 'p-mr-2': true }"
          >{{ label }}</label
        >
      </template>
      <input
        :style="{
          ...inputStyle,
          backgroundColor: 'transparent',
          zIndex: 1,
          position: 'relative',
        }"
        :class="[
          'p-inputtext p-component',
          { 'p-filled': filled },
          { 'p-invalid': errors.length },
          inputClass,
        ]"
        ref="inputRef"
        :value="formattedValue"
      />
      <span
        v-if="filled"
        ref="postfixRef"
        :data-value="formattedValue"
        class="postfix"
      ></span>
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
import useCurrencyInput from "vue-currency-input"
import { computed, onMounted, ref, watch } from "vue"
import numeral from "numeral"

export default {
  inheritAttrs: false,
  props: {
    float: {
      type: Boolean,
      default: false,
    },
    name: {
      type: String,
      required: false,
    },
    modelValue: {
      type: Number,
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
    options: {
      type: Object,
      default: () => ({
        currency: "USD",
        currencyDisplay: "hidden",
        precision: 4,
      }),
    },
  },
  setup(props) {
    const { formattedValue, inputRef } = useCurrencyInput(props.options)

    const postfixRef = ref(null)

    return { inputRef, formattedValue, postfixRef }
  },
  computed: {
    filled() {
      return this.modelValue != null && this.modelValue.toString().length > 0
    },
  },
}
</script>

<style scoped>
.postfix {
  background-color: #fff;
  display: flex;
  align-items: center;
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  padding-left: calc(0.5rem + 1px);
}
.postfix::before {
  content: attr(data-value);
  visibility: hidden;
}
.postfix::after {
  content: "%";
}
</style>
