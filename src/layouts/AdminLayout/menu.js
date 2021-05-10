import { PrimeIcons } from "primevue/api";
import i18n from "../../helper/i18n.zh-CN";

export default [
  {
    key: "system_management",
    label: "系統管理",
    icon: PrimeIcons.COG,
    items: [
      {
        key: "role_setting",
        label: "權限設定",
        to: { name: "role_setting" }
      },
      {
        key: "operation_log",
        label: "操作日誌",
        to: { name: "operation_log" }
      },
      {
        key: "change_password",
        label: "變更密碼",
        to: { name: "change_password" }
      },
      {
        key: "change_payment_password",
        label: "變更付款密碼",
        to: { name: "change_payment_password" }
      },
      {
        key: "user_management",
        label: "管理使用者",
        to: { name: "user_management" }
      }
    ]
  },
  {
    key: "funds_management",
    label: "資金管理",
    icon: PrimeIcons.CREDIT_CARD,
    items: [
      {
        key: "funds_operation_panel",
        label: "資金管理面板",
        to: { name: "funds_operation_panel" }
      },
      {
        key: "transaction_record",
        label: "交易紀錄",
        to: { name: "transaction_record" }
      }
    ]
  },
  {
    key: "merchant_management",
    label: "商戶管理",
    icon: PrimeIcons.USERS,
    items: [
      {
        key: "merchant_operation_panel",
        label: "商戶管理面板",
        to: { name: "merchant_operation_panel" }
      },
      {
        key: "merchant_parameter",
        label: "商戶參數",
        to: { name: "merchant_parameter" }
      },
      {
        key: "merchant_rate",
        label: "商戶費率",
        to: { name: "merchant_rate" }
      },
      {
        key: "merchant_channel_setting",
        label: "商戶通道",
        to: { name: "merchant_channel_setting" }
      }
    ]
  },
  {
    key: "payment_management",
    label: i18n.payment_management,
    icon: PrimeIcons.CREDIT_CARD,
    items: [
      {
        key: "bank_management",
        label: i18n.bank_management,
        to: { name: "bank_management" }
      },
      {
        key: "channel_management",
        label: i18n.channel_management,
        to: { name: "channel_management" }
      },
      {
        key: "card_holder_management",
        label: i18n.card_holder_management,
        to: { name: "card_holder_management" }
      },
      {
        key: "card_management",
        label: i18n.card_management,
        to: { name: "card_management" }
      },
      {
        key: "card_operation_management",
        label: i18n.card_operation_management,
        to: { name: "card_operation_management" }
      }
    ]
  },
  {
    key: "financial_reports",
    label: i18n.financial_reports,
    icon: PrimeIcons.CHART_BAR,
    items: [
      {
        key: "deposit_daily_report",
        label: i18n.deposit_daily_report,
        to: { name: "deposit_daily_report" }
      },
      {
        key: "merchant_daily_report",
        label: i18n.merchant_daily_report,
        to: { name: "merchant_daily_report" }
      }
    ]
  },
  {
    key: "order_management",
    label: "訂單管理",
    icon: PrimeIcons.MONEY_BILL,
    items: [
      {
        key: "merchant_order",
        label: "商家訂單",
        to: { name: "merchant_order" }
      },
      {
        key: "merchant_order_post",
        label: "商家訂單回調",
        to: { name: "merchant_order_post" }
      },
      {
        key: "merchant_order_statistics",
        label: "商家訂單統計數據",
        to: { name: "merchant_order_statistics" }
      },
      {
        key: "merchant_order_operation",
        label: "merchant_order_operation",
        to: { name: "merchant_order_operation" }
      }
    ]
  }
];
