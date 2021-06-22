<template>
  <button
    class="p-link"
    @click="toggle"
    aria-haspopup="true"
    aria-controls="overlay_menu"
  >
    <span class="layout-topbar-item-text">Settings</span>
    <span class="layout-topbar-icon pi pi-cog"></span>
    <TieredMenu id="overlay_menu" ref="menu" :model="items" popup />
  </button>
</template>

<script>
import { PrimeIcons } from "primevue/api"
import { mapState } from "vuex"

export default {
  data() {
    return {
      items: [
        {
          label: `語言 (${this.$i18n.t("name", this.locale)})`,
          icon: PrimeIcons.GLOBE,
          items: this.$i18n.availableLocales.map((locale) => ({
            label: this.$i18n.t("name", locale),
            command: () => this.$store.dispatch("locale/set", locale),
          })),
        },
      ],
    }
  },
  computed: {
    ...mapState({ locale: (state) => state.locale.locale }),
  },
  watch: {
    locale() {
      this.items[0].label = `語言 (${this.$i18n.t("name", this.locale)})`
    },
  },
  methods: {
    toggle(event) {
      this.$refs.menu.toggle(event)
    },
  },
}
</script>

<style></style>
