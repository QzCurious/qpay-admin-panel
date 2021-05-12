export default {
    path: "payments",
    component: () => import("../ForwordRouterView.vue"),
    children: [
      {
        name: "bank_management",
        path: "banks",
        component: () => import("../../views/payments/Banks.vue")
      },
      {
        name: "channel_management",
        path: "channels",
        component: () => import("../../views/payments/Channels.vue")
      },
      {
        name: "card_holder_management",
        path: "card-holders",
        component: () => import("../../views/payments/CardHolders.vue")
      },
      {
        name: "card_management",
        path: "cards",
        component: () => import("../../views/payments/Cards.vue")
      },
      {
        name: "card_operation_management",
        path: "card-operations",
        component: () => import("../../views/payments/CardOperations.vue")
      }
    ]
  }