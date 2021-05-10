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
        to: "/system-management/role-setting"
      },
      {
        key: "operation_log",
        label: "操作日誌",
        to: "/system-management/operation-log"
      },
      {
        key: "change_password",
        label: "變更密碼",
        to: "/system-management/change-password"
      },
      {
        key: "change_payment_password",
        label: "變更付款密碼",
        to: "/system-management/change-payment-password"
      },
      {
        key: "add_user",
        label: "管理使用者",
        to: "/system-management/user-management"
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
        to: "/payments/banks"
      },
      {
        key: "channel_management",
        label: i18n.channel_management,
        to: "/payments/channels"
      },
      {
        key: "card_holder_management",
        label: i18n.card_holder_management,
        to: "/payments/card-holders"
      },
      {
        key: "card_management",
        label: i18n.card_management,
        to: "/payments/cards"
      },
      {
        key: "card_operation_management",
        label: i18n.card_operation_management,
        to: "/payments/card-operations"
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
        to: "/reports/deposit-daily-report"
      },
      {
        key: "merchant_daily_report",
        label: i18n.merchant_daily_report,
        to: "/reports/merchant-daily-report"
      }
    ]
  }
];
