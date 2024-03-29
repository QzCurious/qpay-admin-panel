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
      <Calendar
        showIcon
        dateFormat="yy-m-d"
        :showOnFocus="false"
        :name="name"
        :style="inputStyle"
        :class="{ ...computedInputClass, 'p-invalid': errors.length }"
        v-bind="forward"
        :modelValue="modelValue"
        @update:modelValue="(value) => $emit('update:modelValue', value)"
        ref="calendar"
      >
        <template #footer>
          <div class="p-d-flex">
            <Button
              class="p-ml-auto"
              :label="$t('form.confirm')"
              @click="$refs.calendar.overlayVisible = false"
            />
          </div>
        </template>
      </Calendar>
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
import Calendar from "primevue/calendar"
export default {
  inheritAttrs: false,
  components: { Calendar },
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
