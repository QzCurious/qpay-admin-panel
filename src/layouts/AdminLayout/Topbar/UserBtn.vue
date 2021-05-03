<template>
  <button
    class="p-link"
    @click="toggle"
    aria-haspopup="true"
    aria-controls="overlay_menu"
  >
    <span class="layout-topbar-item-text">User</span>
    <span class="layout-topbar-icon pi pi-user"></span>
    <Menu id="overlay_menu" ref="menu" :model="items" :popup="true" />
  </button>
</template>

<script>
import auth from "../../../api/Auth";
import { PrimeIcons } from "primevue/api";
export default {
  data() {
    return {
      items: [
        {
          label: "Change Password",
          to: "/change-password"
        },
        {
          label: "Log Out",
          icon: PrimeIcons.SIGN_OUT,
          command: auth.logout,
        },
      ],
    };
  },
  methods: {
    toggle(event) {
      this.$refs.menu.toggle(event);
    },
  },
};
</script>

<style>
</style>