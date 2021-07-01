export default {
  name: "English",

  // system_management
  system_management: "System Management",
  role_management: "Role Management",
  operation_log: "Operation Log",
  change_signin_password: "Change Signin Password",
  change_payment_password: "Change Payment Password",
  user_management: "User Management",

  // funds_management
  funds_management: "Funds Management",
  funds_operation_panel: "Funds Operation Panel",
  transaction_record: "Transaction Record",
  funds_withdraw: "Funds Withdraw",
  funds_withdraw_audit: "Funds Withdraw Audit",

  // merchant_management
  merchant_management: "Merchant Management",
  merchant_operation_panel: "Merchant Operation Panel",
  merchant_channel_parameter: "Merchant Channel Parameter",
  merchant_channel_rate: "Merchant Channel Rate",
  merchant_channel_setting: "Merchant Channel Setting",

  // order_management
  order_management: "Order Management",
  merchant_order: "Merchant Order",
  merchant_order_post: "Merchant Order Post",
  merchant_order_statistics: "Merchant Order Statistic",
  merchant_order_operation: "Merchant Order Operation",
  deposit_transaction_operation: "Deposit Transaction Operation",
  deposit_transaction: "Deposit Transaction",

  /**
   * Sidebar categories
   */
  payment_management: "Payment Management",
  bank_management: "Bank Management",
  channel_management: "Channel Management",
  card_holder_management: "Card Holder Management",
  card_management: "Card Management",
  card_operation_panel: "Card Operation Panel",
  card_sms_management: "Card SMS Management",

  financial_reports: "Financial Report",
  deposit_daily_report: "Deposit Daily Report",
  merchant_daily_report: "Merchant Daily Report",

  // value
  funds_withdraw_status: {
    pending: "Pending",
    processing: "Processing",
    paid: "Paid",
    reject: "Reject",
  },
  order_status_values: {
    UNPAID: "code::unpaid",
    SUCCESS: "code::success",
    SUCCESS_NOT_NOTIFY: "code::success_not_notify",
    FAIL_EXPIRE: "code::fail_expire",
    FAIL_AMOUNT_NOT_MATCH: "code::fail_amount_not_match",
    FAIL_ORDER: "code::fail_order",
  },
  audit_type_values: {
    PENDING: "code::paid",
    PAID: "code::paid",
    UNPAID: "code::unpaid",
    REJECT: "code::reject",
  },
  deposit_transaction_status_values: {
    AUTO_DEPOSIT: "Auto Deposit",
    MANUAL_DEPOSIT: "Manual Deposit",
    UNKNOWN_DEPOSIT: "Unknown Deposit",
    WAITING_DEPOSIT: "Waiting",
  },
  transaction_record_type_values: {
    ORDER_DEPOSIT: "code::order_deposit",
    ORDER_DEPOSIT_FEE: "code::order_deposit_fee",
    ORDER_WITHDRAW: "code::order_withdraw",
    ORDER_WITHDRAW_FEE: "code::order_withdraw_fee",
    MERCHANT_FUNDS_WITHDRAW: "code::merchant_funds_withdraw",
    MERCHANT_FUNDS_WITHDRAW_FEE: "code::merchant_funds_withdraw_fee",
    MERCHANT_RECHARGE: "code::merchant_recharge",
    MERCHANT_RECHARGE_FEE: "code::merchant_recharge_fee",
    MERCHANT_DEDUCTION: "code::merchant_deduction",
    MERCHANT_DEDUCTION_FEE: "code::merchant_deduction_fee",
  },
  operation_type: {
    ROLE: "Role",
    SIGNIN_PASSWORD: "Password",
    PAYMENT_PASSWORD: "Payment Password",
    USER: "User",
    BANK: "Bank",
    CHANNEL: "Channel",
    HOLDER: "Card Holder",
    CARD: "Bank Card",
    FUNDS: "Funds",
    MERCHANT_ORDER: "Merchant Order",
    DEPOSIT_ORDER: "Deposit Order",
    MERCHANT: "Merchant",
    MERCHANT_CHANNEL: "Merchant Channel",
    CARD_SMS: "Card SMS",
  },
  operation_sub_type: {
    ADD: "Add",
    EDIT: "Edit",
    DELETE: "Delete",
    WITHDRAW: "Withdraw",
    ORDER_AUDIT: "Order Audit",
    ORDER_POST: "Order Post",
  },
  operation_action_type: {
    1000: "update allow auth",
    //User (status)
    3000: "disabled",
    3001: "enabled",
    //bank (status 400X, transfer 401X)
    4000: "disabled",
    4001: "enabled",
    4010: "disabled",
    4011: "enabled",
    //channel (status)
    5000: "disabled",
    5001: "enabled",
    //holder (status)
    6000: "disabled",
    6001: "enabled",
    //card (status 700X, online 701X, plugin_mode 702X)
    7000: "disabled",
    7001: "enabled",
    7010: "unmounted",
    7011: "mounted",
    7021: "push bullet",
    7022: "SMS 2",
    7023: "ibanking Back-office spider",
  },

  // subject
  signin_id: "Account",
  company: "Company",
  role: "Role",
  status: "Status",
  old_password: "Old Password",
  new_password: "New Password",
  signin_password: "Password",
  payment_password: "Payment Password",
  ip: "IP",
  type: "Type",
  sub_type: "Subtype",
  action_type: "Action Type",
  ip_allow: "Allow IP List",
  phone: "Phone",
  enabled: "Enabled",
  disabled: "Disabled",
  merchant: "Merchant",
  created_at: "Create At",
  updated_at: "Updated At",
  operation: "Operation",
  MD5_key: "MD5_key",
  bank: "Bank",
  bank_code: "Bank Code",
  transfer: "Transfer",
  country: "Country",
  channel: "Channel",
  card: "Card",
  card_id: "Card ID",
  card_holder: "Card Holder",
  card_number: "Card Number",
  account_name: "Account Name",
  deposit_limit_daily: "Daily Deposit Limit",
  deposit_limit_once: "Once Deposit Limit",
  pb_api_key: "PushBullet Key",
  plugin_mode: "Plugin Mode",
  bank_branch: "Bank Branch",
  internet_banking_id: "Internet Banking",
  internet_banking_password: "Internet Banking Password",
  online: "Online",
  auto_refresh: "Auth Refresh",
  limit_deposit: "Limit Deposit",
  deposit_today: "Deposit Today",
  credit_today: "Credit Today",
  remaining_today: "Remaining Today",
  balance: "Balance",
  current_balance: "Current Balance",
  deposit_fee: "Deposit Fee",
  withdraw_fee_rate: "Withdraw Fee Rate",
  withdraw_fee: "Withdraw Fee",
  withdraw_limit_daily: "Withdraw Limit Daily",
  deposit_fee_rate: "Deposit Fee Rate",
  recharge_limit_daily: "Recharge Limit Daily",
  manual_deposit_limit: "Manual Deposit Limit",
  order_limit_once: "Order Limit Once",
  order_per_minute: "Order Per Minute",
  order_limit_daily: "Order Limit Daily",
  transaction_id: "Transaction ID",
  transaction_number: "Transaction Number",
  withdraw_amount: "Withdraw Amount",
  debit_amount: "Debit Amount",
  to_bank: "To Bank",
  to_branch: "To Branch",
  to_account_name: "To",
  to_account_number: "To Account Number",
  remark: "Remark",
  order_number: "Order Number",
  order_amount: "Amount",
  order_over: "Order Over",
  order_status: "Status",
  audit_type: "Audit Type",
  real_amount: "Real Amount",
  fee: "Fee",
  credit_amount: "Credit Amount",
  order_time: "Order Time",
  success_time: "code::success_time",
  deposit_count: "Deposit Count",
  total_deposit: "Total Deposit",
  unknown_count: "Unknown Count",
  unknown_deposit: "Unknown Deposit",
  deposit_amount: "Deposit Amount",
  payee_bank: "Payee Bank",
  payee_account: "Payee Account",
  payee_number: "Payee Number",
  sms_message: "SMS Message",
  remitter_name: "Remitter Name",
  operator: "Operator",
  transaction_time: "Transaction Time",
  operation_balance: "Operation Balance",
  before_balance: "Before Balance",
  after_balance: "After Balance",
  transaction_record_type: "type",
  balance_d0: "D0",
  lock_balance_d0: "D0 locked",
  balance_t1: "T1",
  lock_balance_t1: "T1 locked",
  total_balance_d0: "D0 Total Balance",
  total_balance_t1: "T1 Total Balance",
  amount: "Amount",
  auto_deposit: "Auto Deposit",
  manual_deposit: "Manual Deposit",
  recharge_amount: "Recharge Amount",
  recharge_fee: "Recharge Fee",
  deduction_amount: "Deduction Amount",
  deduction_fee: "Deduction Fee",
  funds_withdraw_amount: "Funds Withdraw Amount",
  funds_withdraw_fee: "Funds Withdraw Fee",
  opening_balance: "Opening Balance",
  ending_balance: "Ending Balance",
  date: "Date",
  send_phone: "Send phone",
  content: "Content",

  // action
  create_role: "Create role",
  edit_role: "Edit role",
  create_account: "Create user",
  edit_account: "Edit user",
  reset_2fa: "Reset 2fa",
  enable_account: "Enable user",
  disable_account: "Disable user",
  create_merchant: "Create merchant",
  edit_merchant: "Edit merchant",
  enable_merchant: "Enable merchant",
  disable_merchant: "Disable merchant",
  delete_merchant: "Delete merchant",
  create_bank: "Create bank",
  edit_bank: "Edit bank",
  enable_bank: "Enable bank",
  disable_bank: "Disable bank",
  delete_bank: "Delete bank",
  enable_bank_transfer: "Enable transfer",
  disable_bank_transfer: "Disable transfer",
  generate_new_MD5_key: "Generate new MD5 key",
  create_channel: "Create channel",
  edit_channel: "Edit channel",
  enable_channel: "Enable channel",
  disable_channel: "Disable channel",
  delete_channel: "Delete channel",
  create_card_holder: "Create card holder",
  edit_card_holder: "Edit card holder",
  enable_card_holder: "Enable card holder",
  disable_card_holder: "Disable card holder",
  delete_card_holder: "Delete card holder",
  create_card: "Create card",
  edit_card: "Edit card",
  enable_card: "Enable card",
  disable_card: "Disable card",
  delete_card: "Delete card",
  online_card: "Set card online",
  offline_card: "Set card offline",
  create_card_sms: "Create card sms",
  edit_card_sms: "Edit card sms",
  enable_card_sms: "Enable card sms",
  disable_card_sms: "Disable card sms",
  delete_card_sms: "Delete card sms",
  create_merchant_channel: "Create merchant channel",
  edit_merchant_channel: "Edit merchant channel",
  enable_merchant_channel: "Enable merchant channel",
  disable_merchant_channel: "Disable merchant channel",
  delete_merchant_channel: "Delete merchant channel",
  edit_merchant_channel_parameter: "Edit merchant channel parameter",
  verify_2fa: "Verify 2fa",
  signin: "Sign In",
  deposit_with_fee: "Deposit with fee",
  deposit_without_fee: "Deposit without fee",
  withdraw_with_fee: "Withdraw with fee",
  withdraw_without_fee: "Withdraw without fee",
  withdraw_application: "Withdraw application",
  withdraw: "Withdraw",
  post: "Post",
  stop_post: "Stop post",

  // will be
  account_will_be_enabled: "User will be enable",
  account_will_be_disabled: "User will be disable",
  account_2fa_will_be_reset: "2fa will be reset",
  merchant_will_be_enabled: "Merchant will be enabled",
  merchant_will_be_disabled: "Merchant will be disabled",
  merchant_will_be_deleted: "Merchant will be deleted",
  bank_will_be_enabled: "Bank will be enabled",
  bank_will_be_disabled: "Bank will be disabled",
  bank_will_be_deleted: "Bank will be deleted",
  bank_transfer_will_be_enabled: "Transfer will be enabled",
  bank_transfer_will_be_disabled: "Transfer will be disabled",
  channel_will_be_enabled: "Channel will be enabled",
  channel_will_be_disabled: "Channel will be disabled",
  channel_will_be_deleted: "Channel will be deleted",
  card_holder_will_be_enabled: "Card holder will be enable",
  card_holder_will_be_disabled: "Card holder will be disable",
  card_holder_will_be_deleted: "Card holder will be delete",
  card_will_be_enabled: "Card will be enabled",
  card_will_be_disabled: "Card will be disabled",
  card_will_be_online: "Card will be online",
  card_will_be_offline: "Card will be offline",
  card_will_be_deleted: "Card will be deleted",
  card_sms_will_be_enabled: "Card sms will be enabled",
  card_sms_will_be_disabled: "Card sms will be disabled",
  card_sms_will_be_deleted: "Card sms will be deleted",
  merchant_channel_will_be_enabled: "Merchant channel will be enabled",
  merchant_channel_will_be_disabled: "Merchant channel will be disabled",
  merchant_channel_will_be_deleted: "Merchant channel will be deleted",
  status_will_be_updated: "Status will be updated",
  status_will_be_updated_to_processing: "Status will be set to processing",
  status_will_be_updated_to_paid: "Status will be set to paid",
  status_will_be_updated_to_reject: "Status will be set to reject",

  // feedback
  role_successfully_created: "Role created",
  role_successfully_updated: "Role updated",
  account_successfully_enabled: "User enabled",
  account_successfully_disabled: "User disabled",
  account_successfully_created: "Role created",
  account_successfully_updated: "Role updated",
  channel_successfully_created: "Channel created",
  channel_successfully_updated: "Channel updated",
  channel_successfully_enabled: "Channel enabled",
  channel_successfully_disabled: "Channel disabled",
  channel_successfully_deleted: "Channel deleted",
  card_successfully_created: "Card created",
  card_successfully_updated: "Card updated",
  card_successfully_enabled: "Card enabled",
  card_successfully_disabled: "Card disabled",
  card_successfully_deleted: "Card deleted",
  card_successfully_online: "Card is online",
  card_successfully_offline: "Card is offline",
  card_sms_successfully_created: "Card sms created",
  card_sms_successfully_updated: "Card sms updated",
  card_sms_successfully_enabled: "Card sms enabled",
  card_sms_successfully_disabled: "Card sms disabled",
  card_sms_successfully_deleted: "Card sms deleted",
  merchant_channel_successfully_created: "Merchant channel created",
  merchant_channel_successfully_updated: "Merchant channel updated",
  merchant_channel_successfully_enabled: "Merchant channel enabled",
  merchant_channel_successfully_disabled: "Merchant channel disabled",
  merchant_channel_successfully_deleted: "Merchant channel deleted",
  ip_is_invalid: "Invalid IP",
  MD5_key_copied: "MD5 key copied",
  merchant_successfully_created: "Merchant created",
  merchant_successfully_updated: "Merchant updated",
  merchant_successfully_enabled: "Merchant enabled",
  merchant_successfully_disabled: "Merchant disabled",
  merchant_successfully_deleted: "Merchant deleted",
  bank_successfully_created: "Bank created",
  bank_successfully_updated: "Bank updated",
  bank_successfully_enabled: "Bank enabled",
  bank_successfully_disabled: "Bank disabled",
  bank_successfully_deleted: "Bank deleted",
  bank_transfer_successfully_enabled: "Transfer enabled",
  bank_transfer_successfully_disabled: "Transfer disabled",
  password_successfully_changed: "Password changed",
  confirm_new_password: "Confirm new password",
  payment_password_successfully_changed: "Payment password changed",
  card_holder_successfully_created: "Card holder created",
  card_holder_successfully_updated: "Card holder updated",
  card_holder_successfully_enabled: "Card holder enabled",
  card_holder_successfully_disabled: "Card holder disabled",
  card_holder_successfully_deleted: "Card holder deleted",
  status_successfully_set_to_processing: "Status is now processing",
  status_successfully_set_to_paid: "Status is now paid",
  status_successfully_set_to_reject: "Status is now rejected",
  deposit_with_fee_successfully: "Deposit successfully",
  deposit_without_fee_successfully: "Deposit successfully",
  withdraw_with_fee_successfully: "Withdraw successfully",
  withdraw_without_fee_successfully: "Withdraw successfully",
  withdraw_applied_successfully: "Applied withdraw",

  // informative
  enter_2fa_to_permit_action: "Enter 2fa code to permit",

  // error
  invalid_date_format: "It's not a valid date",
  end_time_should_not_be_older_then_start_time:
    "End time should not be older then start time",

  form: {
    create: "Create",
    edit: "Edit",
    delete: "Delete",
    submit: "Submit",
    search: "Search",
    clear: "Clear",
    apply: "Apply",
    accept: "Yes",
    reject: "No",
    cancel: "Cancel",
    copy: "Copy",
    next: "Next",
    start_time: "Start",
    end_time: "End",
    export: "Export",
  },

  // day
  today: "Today",

  // weekday
  Sunday: "Sunday",
  Monday: "Monday",
  Tuesday: "Tuesday",
  Wednesday: "Wednesday",
  Thursday: "Thursday",
  Friday: "Friday",
  Saturday: "Saturday",
  Sun: "Sun",
  Mon: "Mon",
  Tue: "Tue",
  Wed: "Wed",
  Thu: "Thu",
  Fri: "Fri",
  Sat: "Sat",

  // month
  January: "January",
  February: "February",
  March: "March",
  April: "April",
  May: "May",
  June: "June",
  July: "July",
  August: "August",
  September: "September",
  October: "October",
  November: "November",
  December: "December",

  request_failed: "Request failed",
  server_error: "Server Error",
  api: {
    error: {
      // System
      1001: "old password incorrect",
      1002: "signin_id is already exist",
      1003: "can't modified yourown permission",

      // Payment

      // Merchant
      1201: "merchant_id, channel_id are already exist",
      1202: "user_signin_id is already exist",

      // Order

      // Funds
      1401: "illegal merchant channel id",
      1402: "merchant channel is disable",
      1403: "can not recharge (over merchant channel daily limit)",
      1404: "illegal operation type",
      1405: "D0 balance not enough",
      1406: "can not withdraw (over merchant channel daily limit)",
      1407: "illegal funds withdraw id",
      1408: "Can not update processed orders",
      1409: "There are still unprocessed orders",
      // Financial

      // Deposit Transaction
      1601: "illegal bank card id",
      1602: "duplicate deposit transaction id",
      1603: "insert new deposit transaction fail",
      1604: "request parameter validation fail",
      1605: "find duplicate merchant order",
      1606: "illegal merchant channel id",
      1607: "insert transaction record fail",
      1608: "update merchant channel amount fail",
      1609: "update deposit transaction fail",
      1610: "update bank card balance fail",

      // Auth
      9001: "2FA Permission Deined: no google_auth key",
      9002: "2FA Permission Deined: has google_auth key",
      9003: "2FA Authentication Error: input error",
      9009: "Incorrect username or password",
      9010: "Permission denied",

      // General
      9101: "No data",
      9102: "Unprocessable Entity",
      9103: "Your ip is not allow",

      //Pay Order
      10002: "validation fail",
      20000: "unknown fail please check channel id",
      20001: "signature fail",
      20002: "customer not exist",
      20003: "timestamp incorrect",
      20004: "channel fail",
    },
  },

  /**
   * Column fields
   */

  index: "code::index",

  card_list: "code::card_list",
}
