<template>
  <select v-model="locale">
    <option v-for="item in items" :key="item.value" :value="item.value">
      {{ item.label }}
    </option>
  </select>
</template>

<script>
export default {
  data() {
    return {
      locale: this.$i18n.locale,
      items: this.$i18n.availableLocales.map((locale) => ({
        label: this.$i18n.t("name", locale),
        value: locale,
      })),
    };
  },
  watch: {
    locale(value) {
      this.$store.dispatch("locale/set", value);
    },
  },
};
</script>

<style>
</style>