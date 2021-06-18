<template>
  <router-view></router-view>
  <Toast :autoZIndex="false" style="z-index: 9999" />
</template>

<script>
import i18n from "./i18n";
import ToastService from "./service/ToastService";
import store from "./store";
import { ApiError } from "./api/ErrorHandler";
import axios from "axios";

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
          i18n.global.t("Sat"),
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
  errorCaptured(err) {
    if (err instanceof ApiError) {
      const message = i18n.global.te(`api.error.${err.code}`)
        ? i18n.global.t(`api.error.${err.code}`)
        : err.message;
      ToastService.error({
        summary: i18n.global.t("request_failed"),
        detail: `${err.code}: ${message}`,
      });
      return false;
    }
    if (axios.isAxiosError(err) && err.response.status > 500) {
      ToastService.error({ summary: i18n.global.t("server_error") });
      return false;
    }
  },
};
</script>

<style>
</style>