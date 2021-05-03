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
            component: () => import("../views/user/CreateUser.vue")
          }
        ]
      }
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

export default router;
