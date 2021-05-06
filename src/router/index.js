import { createRouter, createWebHistory } from "vue-router";
import store from "../store";
import payments from './features/Payments';
import reports from './features/Reports';
import ForwordRouterView from "./ForwordRouterView.vue";

const routes = [
  {
    path: "/",
    component: () => import("../layouts/AdminLayout"),
    children: [
      {
        path: "system-management",
        component: ForwordRouterView,
        children: [
          {
            path: "role-setting",
            component: () =>
              import("../views/system-management/RoleSetting.vue")
          },
          {
            path: "operation-log",
            component: () =>
              import("../views/system-management/OperationLogList.vue")
          },
          {
            path: "change-payment-password",
            component: () =>
              import("../views/system-management/ChangePaymentPassword.vue")
          },
          {
            name: "change-password",
            path: "change-password",
            component: () =>
              import("../views/system-management/ChangePassword.vue")
          },
          {
            path: "user-management",
            component: () => import("../views/system-management/UserManagement.vue")
          }
        ]
      },
      {
        path: "funds-management",
        component: () => import("./ForwordRouterView.vue"),
        children: [
          {
            path: "operation-panel",
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
        ],
      },
      {
        path: "merchant-management",
        component: () => import("./ForwordRouterView.vue"),
        children: [
          {
            path: "parameter",
            name: "merchant_parameter",
            component: () =>
              import("../views/merchant-management/MerchantParameter.vue"),
          },
          {
            path: "rate",
            name: "merchant_rate",
            component: () =>
              import("../views/merchant-management/MerchantRate.vue"),
          },
          {
            path: "channel-setting",
            name: "merchant_channel_setting",
            component: () =>
              import("../views/merchant-management/MerchantChannelSetting.vue"),
          },
          {
            path: "operation-panel",
            name: "merchant_operation_panel",
            component: () =>
              import("../views/merchant-management/MerchantOperationPanel.vue"),
          },
        ],
      },
      payments,
      reports,
    ]
  },
  {
    name: "signin",
    path: "/signin",
    component: () => import("../layouts/Signin.vue")
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

router.beforeEach((to, from, next) => {
  if (to.name !== "signin" && !store.getters["auth/isAuthenticated"]) {
    next({ name: "signin" });
  } else {
    next();
  }
});

export default router;
