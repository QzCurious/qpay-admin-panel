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
    </div>

    <Config
      :layoutMode="layoutMode"
      :layoutColorMode="layoutColorMode"
      @layout-change="onLayoutChange"
      @layout-color-change="onLayoutColorChange"
    />

    <Footer />
  </div>
</template>

<script>
import TopBar from "./Topbar";
import Profile from "./Profile.vue";
import Menu from "./Menu.vue";
import Config from "./Config.vue";
import Footer from "./Footer.vue";
import { PrimeIcons } from "primevue/api";
import i18n from "../../helper/i18n.zh-CN";

export default {
  data() {
    return {
      layoutMode: "static",
      layoutColorMode: "dark",
      staticMenuInactive: false,
      overlayMenuActive: false,
      mobileMenuActive: false,
      menu: [
        {
          label: "Menu Hierarchy",
          icon: "pi pi-fw pi-search",
          items: [
            {
              label: "Item",
              icon: "pi pi-fw pi-bookmark",
            },
            {
              label: "Submenu 1",
              icon: "pi pi-fw pi-bookmark",
              items: [
                {
                  label: "Submenu 1.1",
                  icon: "pi pi-fw pi-bookmark",
                },
                {
                  label: "Submenu 1.2",
                  icon: "pi pi-fw pi-bookmark",
                  items: [
                    { label: "Submenu 1.2.1", icon: "pi pi-fw pi-bookmark" },
                    { label: "Submenu 1.2.2", icon: "pi pi-fw pi-bookmark" },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: "系統管理",
          icon: PrimeIcons.COG,
          items: [
            { label: "權限設定", to: "/system-management/role-setting" },
            { label: "操作日誌", to: "/system-management/operation-log" },
            { label: "變更密碼", to: "/system-management/change-password" },
            { label: "變更付款密碼", to: "/system-management/change-payment-password" },
            { label: "管理使用者", to: "/system-management/user-management" },
          ],
        },
        {
          label: "資金管理",
          icon: PrimeIcons.CREDIT_CARD,
          items: [
            {
              label: "資金管理面板",
              to: { name: "fundsManagement" },
            },
            { label: "交易紀錄", to: { name: "transactionRecord" } },
          ],
        },
        {
          label: "商戶管理",
          icon: PrimeIcons.USERS,
          items: [
            { label: "商戶管理面板", to: { name: "merchantManagement" } },
            { label: "商戶參數", to: { name: "merchantParameter" } },
            { label: "商戶費率", to: { name: "merchantRate" } },
            { label: "商戶通道", to: { name: "merchantChannelSetting" } },
          ],
        },
        {
          label: i18n.payment_management,
          icon: PrimeIcons.CREDIT_CARD,
          items: [
            { label: i18n.bank_management, to: "/payments/banks" },
            { label: i18n.channel_management, to: "/payments/channels" },
            { label: i18n.card_holder_management, to: "/payments/card-holders" },
            { label: i18n.card_management, to: "/payments/cards" },
            { label: i18n.card_operation_management, to: "/payments/card-operations" }
          ]
        },
        { 
          label: i18n.financial_reports,
          icon: PrimeIcons.CHART_BAR,
          items: [
            { label: i18n.deposit_daily_report, to: "/reports/deposit-daily-report"},
            { label: i18n.merchant_daily_report, to: "/reports/merchant-daily-report"}
          ]
        }
      ],
    };
  },
  watch: {
    $route() {
      this.menuActive = false;
      this.$toast.removeAllGroups();
    },
  },
  methods: {
    onWrapperClick() {
      if (!this.menuClick) {
        this.overlayMenuActive = false;
        this.mobileMenuActive = false;
      }

      this.menuClick = false;
    },
    onMenuToggle() {
      this.menuClick = true;

      if (this.isDesktop()) {
        if (this.layoutMode === "overlay") {
          if (this.mobileMenuActive === true) {
            this.overlayMenuActive = true;
          }

          this.overlayMenuActive = !this.overlayMenuActive;
          this.mobileMenuActive = false;
        } else if (this.layoutMode === "static") {
          this.staticMenuInactive = !this.staticMenuInactive;
        }
      } else {
        this.mobileMenuActive = !this.mobileMenuActive;
      }

      event.preventDefault();
    },
    onSidebarClick() {
      this.menuClick = true;
    },
    onMenuItemClick(event) {
      if (event.item && !event.item.items) {
        this.overlayMenuActive = false;
        this.mobileMenuActive = false;
      }
    },
    onLayoutChange(layoutMode) {
      this.layoutMode = layoutMode;
    },
    onLayoutColorChange(layoutColorMode) {
      this.layoutColorMode = layoutColorMode;
    },
    addClass(element, className) {
      if (element.classList) element.classList.add(className);
      else element.className += " " + className;
    },
    removeClass(element, className) {
      if (element.classList) element.classList.remove(className);
      else
        element.className = element.className.replace(
          new RegExp(
            "(^|\\b)" + className.split(" ").join("|") + "(\\b|$)",
            "gi"
          ),
          " "
        );
    },
    isDesktop() {
      return window.innerWidth > 1024;
    },
    isSidebarVisible() {
      if (this.isDesktop()) {
        if (this.layoutMode === "static") return !this.staticMenuInactive;
        else if (this.layoutMode === "overlay") return this.overlayMenuActive;
        else return true;
      } else {
        return true;
      }
    },
  },
  computed: {
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
      ];
    },
    sidebarClass() {
      return [
        "layout-sidebar",
        {
          "layout-sidebar-dark": this.layoutColorMode === "dark",
          "layout-sidebar-light": this.layoutColorMode === "light",
        },
      ];
    },
    logo() {
      return this.layoutColorMode === "dark"
        ? "assets/layout/images/logo-white.svg"
        : "assets/layout/images/logo.svg";
    },
  },
  beforeUpdate() {
    if (this.mobileMenuActive)
      this.addClass(document.body, "body-overflow-hidden");
    else this.removeClass(document.body, "body-overflow-hidden");
  },
  components: {
    TopBar,
    Profile,
    Menu,
    Config,
    Footer,
  },
};
</script>

<style lang="scss">
.p-toast.p-toast-topright {
  z-index: 1000;
  top: 70px;
}
</style>
