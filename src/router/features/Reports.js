export default {
    path: "/reports",
    component: () => import("../ForwordRouterView.vue"),
    children: [
      {
        path: "deposit-daily-report",
        component: () => import("../../views/reports/DepositDailyReport.vue")
      },
      {
        path: "merchant-daily-report",
        component: () => import("../../views/reports/MerchantDailyReport.vue")
      }
    ]
  }