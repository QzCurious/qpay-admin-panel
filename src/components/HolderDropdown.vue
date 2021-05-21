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
import Holder from "../api/Holder";
import store from "../store";
import i18n from "../i18n";

export default {
  components: { Dropdown },
  props: {
    modelValue: Number,
    label: { type: String, default: () => i18n.global.t("card_holder") },
  },
  emits: ["update:modelValue"],
  computed: {
    options() {
      return store.state.api.holder_list;
    },
  },
  async mounted() {
    await Holder.all();
  },
};
</script>

<style>
</style>