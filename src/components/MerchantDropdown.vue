<template>
  <Dropdown
    optionLabel="name"
    optionValue="id"
    :label="label"
    :options="options"
    :modelValue="modelValue"
    @update:modelValue="(value) => $emit('update:modelValue', value)"
  />
</template>

<script>
import Dropdown from "./Dropdown.vue";
import Merchant from "../api/Merchant";
import store from "../store";

export default {
  components: { Dropdown },
  props: { modelValue: Number, label: { type: String, default: "機構" } },
  emits: ["update:modelValue"],
  computed: {
    options() {
      return store.state.api.merchant_list;
    },
  },
  async mounted() {
    await Merchant.all();
  },
};
</script>

<style>
</style>