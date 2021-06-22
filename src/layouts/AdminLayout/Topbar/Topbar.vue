<template>
  <div class="layout-topbar">
    <button class="p-link layout-menu-button" @click="onMenuToggle">
      <span class="pi pi-bars"></span>
    </button>
    <div class="layout-topbar-icons">
      <Settings />
      <UserBtn />
    </div>
  </div>
</template>

<script>
import UserBtn from "./UserBtn.vue"
import Settings from "./Settings.vue"

export default {
  components: { UserBtn, Settings },
  methods: {
    onMenuToggle(event) {
      this.$emit("menu-toggle", event)
    },
  },
}
</script>
