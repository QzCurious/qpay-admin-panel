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
import Holder from "../api/Holder"
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
      return this.label ?? this.$i18n.t("card_holder")
    },
    options() {
      return store.state.api.holder_list.filter(this.filter)
    },
  },
  async mounted() {
    await Holder.all()
  },
}
</script>

<style></style>
