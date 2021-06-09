<template>
  <Calendar
    name="start_time"
    :label="$t('form.start_time')"
    :modelValue="modelValue"
    :showSeconds="true"
    :showTime="true"
    @update:modelValue="(value) => $emit('update:modelValue', value)"
  />
</template>

<script>
import Calendar from "./Calendar.vue";
import moment from "moment";
export default {
  components: { Calendar },
  props: {
    modelValue: {
      type: Date,
      default: moment().startOf("day").toDate(),
    },
  },
};
</script>

<style>
</style>