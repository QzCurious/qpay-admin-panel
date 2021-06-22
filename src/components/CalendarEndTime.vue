<template>
  <Calendar
    name="end_time"
    :label="$t('form.end_time')"
    :modelValue="modelValue"
    :showSeconds="true"
    :showTime="true"
    :maxDate="
      moment()
        .endOf('day')
        .toDate()
    "
    @update:modelValue="(value) => $emit('update:modelValue', value)"
  />
</template>

<script>
import Calendar from "./Calendar.vue"
import moment from "moment"
export default {
  components: { Calendar },
  props: {
    modelValue: {
      type: Date,
      default: moment()
        .endOf("day")
        .toDate(),
    },
  },
}
</script>

<style></style>
