export default {
    path: "/payments",
    component: () => import("../ForwordRouterView.vue"),
    children: [
      {
        path: "banks",
        component: () => import("../../views/payments/Banks.vue")
      },
      {
        path: "channels",
        component: () => import("../../views/payments/Channels.vue")
      },
      {
        path: "card-holders",
        component: () => import("../../views/payments/CardHolders.vue")
      },
      {
        path: "cards",
        component: () => import("../../views/payments/Cards.vue")
      },
      {
        path: "card-operations",
        component: () => import("../../views/payments/CardOperations.vue")
      }
    ]
  }