export default {
  path: "payments",
  component: () => import("../ForwordRouterView.vue"),
  children: [
    {
      name: "bank_management",
      path: "bank-management",
      component: () => import("../../views/payments/BankManagement.vue"),
    },
    {
      name: "channel_management",
      path: "channel-management",
      component: () => import("../../views/payments/ChannelManagement.vue"),
    },
    {
      name: "card_holder_management",
      path: "card-holder-management",
      component: () => import("../../views/payments/CardHolderManagement.vue"),
    },
    {
      name: "card_management",
      path: "card-management",
      component: () => import("../../views/payments/CardManagement.vue"),
    },
    {
      name: "card_operation_panel",
      path: "card-operation-panel",
      component: () => import("../../views/payments/CardOperationPanel.vue"),
    },
  ],
}
