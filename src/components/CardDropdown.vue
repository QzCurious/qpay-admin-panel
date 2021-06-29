<template>
  <Dropdown
    optionLabel="id"
    optionValue="id"
    :label="data_label"
    :options="options"
    :modelValue="modelValue"
    @update:modelValue="(value) => $emit('update:modelValue', value)"
  />
</template>

<script>
import Dropdown from "./Dropdown.vue"
import Card from "../api/Card"
import store from "../store"

export default {
  components: { Dropdown },
  props: {
    modelValue: Number,
    label: { type: String },
  },
  emits: ["update:modelValue"],
  computed: {
    data_label() {
      return this.label ?? this.$i18n.t("card_id")
    },
    options() {
      return store.state.api.card_list
    },
  },
  async mounted() {
    await Card.all()
  },
}
</script>

<style></style>
