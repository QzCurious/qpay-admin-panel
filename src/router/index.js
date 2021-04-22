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
        path: "/operation-log",
        component: () => import("../views/OperationLogList.vue")
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
