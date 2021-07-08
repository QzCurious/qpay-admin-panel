<template>
  <Dropdown
    optionLabel="name"
    optionValue="id"
    :label="data_label"
    :options="options"
    :modelValue="modelValue"
    @update:modelValue="(value) => $emit('update:modelValue', value)"
  />
</template>

<script>
import Dropdown from "./Dropdown.vue"
import Merchant from "../api/Merchant"
import store from "../store"

export default {
  components: { Dropdown },
  props: {
    modelValue: Number,
    label: { type: String },
    filter: { type: Function, default: () => true },
  },
  emits: ["update:modelValue"],
  computed: {
    data_label() {
      return this.label ?? this.$i18n.t("merchant")
    },
    options() {
      return store.state.api.merchant_list.filter(this.filter)
    },
  },
  async mounted() {
    await Merchant.all()
  },
}
</script>

<style></style>
