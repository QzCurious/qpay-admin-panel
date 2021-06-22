import { PrimeIcons } from "primevue/api"
import i18n from "../../i18n"
import { computed } from "vue"

const { t } = i18n.global

export default computed(() => [
  {
    key: "system_management",
    label: t("system_management"),
    icon: PrimeIcons.COG,
    items: [
      {
        key: "role_management",
        label: t("role_management"),
        to: { name: "role_management" },
      },
      {
        key: "operation_log",
        label: t("operation_log"),
        to: { name: "operation_log" },
      },
      {
        key: "change_signin_password",
        label: t("change_signin_password"),
        to: { name: "change_signin_password" },
      },
      {
        key: "change_payment_password",
        label: t("change_payment_password"),
        to: { name: "change_payment_password" },
      },
      {
        key: "user_management",
        label: t("user_management"),
        to: { name: "user_management" },
      },
    ],
  },
  {
    key: "payment_management",
    label: t("payment_management"),
    icon: PrimeIcons.CREDIT_CARD,
    items: [
      {
        key: "bank_management",
        label: t("bank_management"),
        to: { name: "bank_management" },
      },
      {
        key: "channel_management",
        label: t("channel_management"),
        to: { name: "channel_management" },
      },
      {
        key: "card_holder_management",
        label: t("card_holder_management"),
        to: { name: "card_holder_management" },
      },
      {
        key: "card_management",
        label: t("card_management"),
        to: { name: "card_management" },
      },
      {
        key: "card_operation_panel",
        label: t("card_operation_panel"),
        to: { name: "card_operation_panel" },
      },
    ],
  },
  {
    key: "funds_management",
    label: t("funds_management"),
    icon: PrimeIcons.CREDIT_CARD,
    items: [
      {
        key: "funds_operation_panel",
        label: t("funds_operation_panel"),
        to: { name: "funds_operation_panel" },
      },
      {
        key: "transaction_record",
        label: t("transaction_record"),
        to: { name: "transaction_record" },
      },
      {
        key: "funds_withdraw",
        label: t("funds_withdraw"),
        to: { name: "funds_withdraw" },
      },
      {
        key: "funds_withdraw_audit",
        label: t("funds_withdraw_audit"),
        to: { name: "funds_withdraw_audit" },
      },
    ],
  },
  {
    key: "order_management",
    label: t("order_management"),
    icon: PrimeIcons.MONEY_BILL,
    items: [
      {
        key: "merchant_order",
        label: t("merchant_order"),
        to: { name: "merchant_order" },
      },
      {
        key: "merchant_order_statistics",
        label: t("merchant_order_statistics"),
        to: { name: "merchant_order_statistics" },
      },
      {
        key: "merchant_order_post",
        label: t("merchant_order_post"),
        to: { name: "merchant_order_post" },
      },
      {
        key: "merchant_order_operation",
        label: t("merchant_order_operation"),
        to: { name: "merchant_order_operation" },
      },
      {
        key: "deposit_transaction_operation",
        label: t("deposit_transaction_operation"),
        to: { name: "deposit_transaction_operation" },
      },
      {
        key: "deposit_transaction",
        label: t("deposit_transaction"),
        to: { name: "deposit_transaction" },
      },
    ],
  },
  {
    key: "financial_reports",
    label: t("financial_reports"),
    icon: PrimeIcons.CHART_BAR,
    items: [
      {
        key: "deposit_daily_report",
        label: t("deposit_daily_report"),
        to: { name: "deposit_daily_report" },
      },
      {
        key: "merchant_daily_report",
        label: t("merchant_daily_report"),
        to: { name: "merchant_daily_report" },
      },
    ],
  },
  {
    key: "merchant_management",
    label: t("merchant_management"),
    icon: PrimeIcons.USERS,
    items: [
      {
        key: "merchant_operation_panel",
        label: t("merchant_operation_panel"),
        to: { name: "merchant_operation_panel" },
      },
      {
        key: "merchant_channel_setting",
        label: t("merchant_channel_setting"),
        to: { name: "merchant_channel_setting" },
      },
      {
        key: "merchant_channel_rate",
        label: t("merchant_channel_rate"),
        to: { name: "merchant_channel_rate" },
      },
      {
        key: "merchant_channel_parameter",
        label: t("merchant_channel_parameter"),
        to: { name: "merchant_channel_parameter" },
      },
    ],
  },
])
