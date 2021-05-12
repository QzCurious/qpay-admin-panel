export default {
    path: "reports",
    component: () => import("../ForwordRouterView.vue"),
    children: [
      {
        name: "deposit_daily_report",
        path: "deposit-daily-report",
        component: () => import("../../views/reports/DepositDailyReport.vue")
      },
      {
        name: "merchant_daily_report",
        path: "merchant-daily-report",
        component: () => import("../../views/reports/MerchantDailyReport.vue")
      }
    ]
  }