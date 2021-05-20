<template>
  <router-view></router-view>
  <Toast />
</template>

<script>
import i18n from "./i18n";
import ToastService from "./service/ToastService";
import store from "./store";

export default {
  mounted() {
    // Register services
    ToastService.init(this.$toast);
  },
  computed: {
    locale() {
      return store.state.locale.locale;
    },
  },
  watch: {
    locale() {
      this.$primevue.config.locale = {
        ...this.$primevue.config.locale,
        clear: i18n.global.t("form.clear"),
        apply: i18n.global.t("form.apply"),
        accept: i18n.global.t("form.accept"),
        reject: i18n.global.t("form.reject"),
        cancel: i18n.global.t("form.cancel"),
        dayNames: [
          i18n.global.t("Sunday"),
          i18n.global.t("Monday"),
          i18n.global.t("Tuesday"),
          i18n.global.t("Wednesday"),
          i18n.global.t("Thursday"),
          i18n.global.t("Friday"),
          i18n.global.t("Saturday"),
        ],
        dayNamesShort: [
          i18n.global.t("Sun"),
          i18n.global.t("Mon"),
          i18n.global.t("Tue"),
          i18n.global.t("Wed"),
          i18n.global.t("Thu"),
          i18n.global.t("Fri"),
        ],
        monthNames: [
          i18n.global.t("January"),
          i18n.global.t("February"),
          i18n.global.t("March"),
          i18n.global.t("April"),
          i18n.global.t("May"),
          i18n.global.t("June"),
          i18n.global.t("July"),
          i18n.global.t("August"),
          i18n.global.t("September"),
          i18n.global.t("October"),
          i18n.global.t("November"),
          i18n.global.t("December"),
        ],
        today: i18n.global.t("today"),
      };
    },
  },
};
</script>

<style>
</style>