<template>
  <router-view></router-view>
  <Toast />
</template>

<script>
import ToastService from "./service/ToastService";

export default {
  mounted() {
    // Register services
    ToastService.init(this.$toast);
  },
};
</script>

<style>
</style>