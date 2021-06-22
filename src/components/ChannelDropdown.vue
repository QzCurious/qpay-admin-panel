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
import Channel from "../api/Channel"
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
      return this.label ?? this.$i18n.t("channel")
    },
    options() {
      return store.state.api.channel_list
    },
  },
  async mounted() {
    await Channel.all()
  },
}
</script>

<style></style>
