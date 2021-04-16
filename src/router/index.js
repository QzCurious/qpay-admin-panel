import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/operation-log",
    name: "operation-log",
    component: () => import("../views/OperationLogList.vue")
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
