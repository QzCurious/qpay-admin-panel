<template>
  <div :class="containerClass" @click="onWrapperClick">
    <TopBar @menu-toggle="onMenuToggle" />

    <transition name="layout-sidebar">
      <div
        :class="sidebarClass"
        @click="onSidebarClick"
        v-show="isSidebarVisible()"
      >
        <div class="layout-logo">
          <router-link to="/">
            <img alt="Logo" :src="logo" />
          </router-link>
        </div>

        <Profile />
        <Menu :model="menu" @menuitem-click="onMenuItemClick" />
      </div>
    </transition>

    <div class="layout-main">
      <router-view />
      <div :style="{ position: 'absolute', right: 0, bottom: 0 }">
        <Message
          style="width: min(100%, 18rem);"
          :closable="false"
          severity="warn"
        >
          僅供前端畫面測試使用
        </Message>
      </div>
    </div>

    <!-- <Config
      :layoutMode="layoutMode"
      :layoutColorMode="layoutColorMode"
      @layout-change="onLayoutChange"
      @layout-color-change="onLayoutColorChange"
    /> -->
  </div>
</template>

<script>
import TopBar from "./Topbar"
import Profile from "./Profile.vue"
import Menu from "./Menu.vue"
import menu from "./menu"
import i18n from "../../i18n"
import ToastService from "../../service/ToastService"
import { ApiError } from "../../api/ErrorHandler"
import axios from "axios"

export default {
  data() {
    return {
      layoutMode: "static",
      layoutColorMode: "dark",
      staticMenuInactive: false,
      overlayMenuActive: false,
      mobileMenuActive: false,
    }
  },
  watch: {
    $route() {
      this.menuActive = false
      this.$toast.removeAllGroups()
    },
  },
  methods: {
    onWrapperClick() {
      if (!this.menuClick) {
        this.overlayMenuActive = false
        this.mobileMenuActive = false
      }

      this.menuClick = false
    },
    onMenuToggle() {
      this.menuClick = true

      if (this.isDesktop()) {
        if (this.layoutMode === "overlay") {
          if (this.mobileMenuActive === true) {
            this.overlayMenuActive = true
          }

          this.overlayMenuActive = !this.overlayMenuActive
          this.mobileMenuActive = false
        } else if (this.layoutMode === "static") {
          this.staticMenuInactive = !this.staticMenuInactive
        }
      } else {
        this.mobileMenuActive = !this.mobileMenuActive
      }

      event.preventDefault()
    },
    onSidebarClick() {
      this.menuClick = true
    },
    onMenuItemClick(event) {
      if (event.item && !event.item.items) {
        this.overlayMenuActive = false
        this.mobileMenuActive = false
      }
    },
    onLayoutChange(layoutMode) {
      this.layoutMode = layoutMode
    },
    onLayoutColorChange(layoutColorMode) {
      this.layoutColorMode = layoutColorMode
    },
    addClass(element, className) {
      if (element.classList) element.classList.add(className)
      else element.className += " " + className
    },
    removeClass(element, className) {
      if (element.classList) element.classList.remove(className)
      else
        element.className = element.className.replace(
          new RegExp(
            "(^|\\b)" + className.split(" ").join("|") + "(\\b|$)",
            "gi"
          ),
          " "
        )
    },
    isDesktop() {
      return window.innerWidth > 1024
    },
    isSidebarVisible() {
      if (this.isDesktop()) {
        if (this.layoutMode === "static") return !this.staticMenuInactive
        else if (this.layoutMode === "overlay") return this.overlayMenuActive
        else return true
      } else {
        return true
      }
    },
  },
  mounted() {
    onunhandledrejection = ({ reason: err }) => {
      if (err instanceof ApiError) {
        const message = i18n.global.te(`api.error.${err.code}`)
          ? i18n.global.t(`api.error.${err.code}`)
          : err.message
        ToastService.error({
          summary: i18n.global.t("request_failed"),
          detail: `${err.code}: ${message}`,
        })
        return false
      }
      if (axios.isAxiosError(err) && err.response.status > 500) {
        ToastService.error({ summary: i18n.global.t("server_error") })
        return false
      }
    }
  },
  computed: {
    menu() {
      // 開啟所有 menu
      // return menu.value
      const allowed_menu = menu.value
        .map((group) => {
          const items = group.items.filter((item) =>
            this.$store.state.auth.allow_auth.includes(item.key)
          )
          return { ...group, items }
        })
        .filter((group) => group.items.length)
      return allowed_menu
    },
    containerClass() {
      return [
        "layout-wrapper",
        {
          "layout-overlay": this.layoutMode === "overlay",
          "layout-static": this.layoutMode === "static",
          "layout-static-sidebar-inactive":
            this.staticMenuInactive && this.layoutMode === "static",
          "layout-overlay-sidebar-active":
            this.overlayMenuActive && this.layoutMode === "overlay",
          "layout-mobile-sidebar-active": this.mobileMenuActive,
          "p-input-filled": this.$appState.inputStyle === "filled",
          "p-ripple-disabled": this.$primevue.config.ripple === false,
        },
      ]
    },
    sidebarClass() {
      return [
        "layout-sidebar",
        {
          "layout-sidebar-dark": this.layoutColorMode === "dark",
          "layout-sidebar-light": this.layoutColorMode === "light",
        },
      ]
    },
    logo() {
      return this.layoutColorMode === "dark"
        ? "/assets/layout/images/logo-white.svg"
        : "/assets/layout/images/logo.svg"
    },
  },
  beforeUpdate() {
    if (this.mobileMenuActive)
      this.addClass(document.body, "body-overflow-hidden")
    else this.removeClass(document.body, "body-overflow-hidden")
  },
  components: {
    TopBar,
    Profile,
    Menu,
  },
}
</script>

<style lang="scss">
.p-toast.p-toast-topright {
  z-index: 1000;
  top: 70px;
}
</style>
