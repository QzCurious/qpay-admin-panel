import { createRouter, createWebHistory } from "vue-router"
import store from "../store"
import i18n from "../i18n"
import payments from "./features/Payments"
import reports from "./features/Reports"
import ForwordRouterView from "./ForwordRouterView.vue"

const routes = [
  {
    path: "/",
    redirect: () => `/${i18n.global.locale}`,
  },
  {
    path: "/:locale",
    component: ForwordRouterView,
    children: [
      {
        path: "",
        component: () => import("../layouts/AdminLayout"),
        children: [
          {
            path: "system-management",
            component: ForwordRouterView,
            children: [
              {
                name: "role_management",
                path: "role-management",
                component: () =>
                  import("../views/system-management/RoleManagement.vue"),
              },
              {
                name: "operation_log",
                path: "operation-log",
                component: () =>
                  import("../views/system-management/OperationLog.vue"),
              },
              {
                name: "change_payment_password",
                path: "change-payment-password",
                component: () =>
                  import(
                    "../views/system-management/ChangePaymentPassword.vue"
                  ),
              },
              {
                name: "change_signin_password",
                path: "change-signin-password",
                component: () =>
                  import("../views/system-management/ChangeSigninPassword.vue"),
              },
              {
                name: "user_management",
                path: "user-management",
                component: () =>
                  import("../views/system-management/UserManagement.vue"),
              },
            ],
          },
          {
            path: "funds-management",
            component: () => import("./ForwordRouterView.vue"),
            children: [
              {
                path: "funds-operation-panel",
                name: "funds_operation_panel",
                component: () =>
                  import("../views/funds-management/FundsOperationPanel.vue"),
              },
              {
                path: "transaction-record",
                name: "transaction_record",
                component: () =>
                  import("../views/funds-management/TransactionRecord.vue"),
              },
              {
                path: "funds-withdraw",
                name: "funds_withdraw",
                component: () =>
                  import("../views/funds-management/FundsWithdraw.vue"),
              },
              {
                path: "funds-withdraw-audit",
                name: "funds_withdraw_audit",
                component: () =>
                  import("../views/funds-management/FundsWithdrawAudit.vue"),
              },
            ],
          },
          {
            path: "merchant-management",
            component: () => import("./ForwordRouterView.vue"),
            children: [
              {
                path: "merchant-channel-parameter",
                name: "merchant_channel_parameter",
                component: () =>
                  import(
                    "../views/merchant-management/MerchantChannelParameter.vue"
                  ),
              },
              {
                path: "merchant-channel-rate",
                name: "merchant_channel_rate",
                component: () =>
                  import(
                    "../views/merchant-management/MerchantChannelRate.vue"
                  ),
              },
              {
                path: "merchant-channel-setting",
                name: "merchant_channel_setting",
                component: () =>
                  import(
                    "../views/merchant-management/MerchantChannelSetting.vue"
                  ),
              },
              {
                path: "merchant-operation-panel-panel",
                name: "merchant_operation_panel",
                component: () =>
                  import(
                    "../views/merchant-management/MerchantOperationPanel.vue"
                  ),
              },
            ],
          },
          {
            name: "order_management",
            path: "order-management",
            component: ForwordRouterView,
            children: [
              {
                name: "merchant_order",
                path: "merchant-order",
                component: () =>
                  import("../views/order-management/MerchantOrder.vue"),
              },
              {
                name: "merchant_order_post",
                path: "merchant-order-post",
                component: () =>
                  import("../views/order-management/MerchantOrderPost.vue"),
              },
              {
                name: "merchant_order_statistics",
                path: "merchant-order-statistics",
                component: () =>
                  import(
                    "../views/order-management/MerchantOrderStatistics.vue"
                  ),
              },
              {
                name: "merchant_order_operation",
                path: "merchant-order-operation",
                component: () =>
                  import(
                    "../views/order-management/MerchantOrderOperation.vue"
                  ),
              },
              {
                name: "deposit_transaction_operation",
                path: "deposit-transaction-operation",
                component: () =>
                  import(
                    "../views/order-management/DepositTransactionOperation.vue"
                  ),
              },
              {
                name: "deposit_transaction",
                path: "deposit-transaction",
                component: () =>
                  import("../views/order-management/DepositTransaction.vue"),
              },
            ],
          },
          payments,
          reports,
        ],
      },
      {
        name: "signin",
        path: "signin",
        component: () => import("../layouts/Signin.vue"),
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

router.beforeEach((to, from, next) => {
  if (to.name !== "signin" && !store.getters["auth/isAuthenticated"]) {
    next({ name: "signin", params: { locale: to.params.locale } })
  } else {
    next()
  }
})

router.afterEach((to) => {
  if (store.state.locale.locale !== to.params.locale) {
    store.dispatch("locale/set", to.params.locale)
  }
})

export default router
