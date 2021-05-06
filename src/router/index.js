import { createRouter, createWebHistory } from "vue-router";
import store from "../store";

const routes = [
  {
    path: "/",
    beforeEnter: () => {
      if (!store.getters["auth/isAuthenticated"]) {
        return { name: "signin" };
      }
    },
    component: () => import("../layouts/AdminLayout"),
    children: [
      {
        path: "/change-password",
        component: () => import("../views/ChangePassword.vue")
      },
      {
        path: "/operation-log",
        component: () => import("../views/OperationLogList.vue")
      },
      {
        path: "/users",
        component: () => import("./ForwordRouterView.vue"),
        children: [
          {
            path: "",
            component: () => import("../views/user/UserList.vue")
          },
          {
            path: "create",
            component: () => import("../views/user/CreateUser.vue"),
          },
        ],
      },
      {
        path: "funds-management",
        component: () => import("./ForwordRouterView.vue"),
        children: [
          {
            path: "operation-panel",
            name: "fundsManagement",
            component: () =>
              import("../views/funds-management/FundsOperationPanel.vue"),
          },
          {
            path: "transaction-record",
            name: "transactionRecord",
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
            name: "merchantParameter",
            component: () =>
              import("../views/merchant-management/MerchantParameter.vue"),
          },
          {
            path: "rate",
            name: "merchantRate",
            component: () =>
              import("../views/merchant-management/MerchantRate.vue"),
          },
          {
            path: "channel-setting",
            name: "merchantChannelSetting",
            component: () =>
              import("../views/merchant-management/MerchantChannelSetting.vue"),
          },
          {
            path: "operation-panel",
            name: "merchantManagement",
            component: () =>
              import("../views/merchant-management/MerchantOperationPanel.vue"),
          },
        ],
      },
    ],
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

export default router;
