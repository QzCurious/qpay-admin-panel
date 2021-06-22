<template>
  <div class="layout-menu-container">
    <Submenu
      :items="model"
      class="layout-menu"
      :root="true"
      @menuitem-click="onMenuItemClick"
    />
  </div>
</template>

<script>
import Submenu from "./Submenu"

export default {
  props: {
    model: Array,
  },
  methods: {
    onMenuItemClick(event) {
      this.$emit("menuitem-click", event)
    },
  },
  components: {
    Submenu,
  },
}
</script>

<style scoped></style>
