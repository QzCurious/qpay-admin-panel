export default {
  name: "English",

  // system_management
  system_management: "System Management",
  role_setting: "Role Setting",
  operation_log: "Operation Log",
  change_password: "Change Password",
  change_payment_password: "Change Payment Password",
  user_management: "User Management",

  // funds_management
  funds_management: "Funds Management",
  funds_operation_panel: "Funds Operation Panel",
  transaction_record: "Transaction Record",
  funds_withdraw: "Funds Withdraw",

  // merchant_management
  merchant_management: "Merchant Management",
  merchant_operation_panel: "code::merchant_operation_panel",
  merchant_channel_parameter: "Merchant Channel Parameter",
  merchant_channel_rate: "Merchant Channel Rate",
  merchant_channel_setting: "Merchant Channel Setting",

  // order_management
  order_management: "Order Management",
  merchant_order: "Merchant Order",
  merchant_order_post: "code::merchant_order_post",
  merchant_order_statistics: "code::merchant_order_statistics",
  merchant_order_operation: "code::merchant_order_operation",
  deposit_order_operation: "code::deposit_order_operation",
  deposit_record: "Deposit Record",

  /**
   * Sidebar categories
   */
  payment_management: "Payment Management",
  bank_management: "code::bank_management",
  channel_management: "Channel Management",
  card_holder_management: "Card Holder Management",
  card_management: "Card Management",
  card_operation_management: "code::card_operation_management",

  financial_reports: "code::financial_reports",
  deposit_daily_report: "code::deposit_daily_report",
  merchant_daily_report: "code::merchant_daily_report",

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
    PAID: "code::paid",
    UNPAID: "code::unpaid",
    REJECT: "code::reject",
  },
  deposit_transaction_status_values: {
    AUTO_DEPOSIT: "Auto Deposit",
    MANUAL_DEPOSIT: "Manual Deposit",
    UNKNOWN_DEPOSIT: "Unknown Deposit",
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
  ip_allow: "Allow IP List",
  phone: "Phone",
  enabled: "Enabled",
  disabled: "Disabled",
  merchant: "Merchant",
  created_at: "Create At",
  operation: "Operation",
  MD5_key: "MD5_key",
  bank: "Bank",
  bank_code: "Bank Code",
  transfer: "Transfer",
  country: "Country",
  channel: "Channel",
  card: "Card",
  card_holder: "Card Holder",
  card_number: "Card Number",
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
  create_merchant_channel: "Create merchant channel",
  edit_merchant_channel: "Edit merchant channel",
  enable_merchant_channel: "Enable merchant channel",
  disable_merchant_channel: "Disable merchant channel",
  delete_merchant_channel: "Delete merchant channel",
  edit_merchant_channel_parameter: "Edit merchant channel parameter",
  verify_2fa: "Verify 2fa",
  signin: "Sign In",

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

  api: {
    error: {
      1001: "Incorrect password",
      1002: "Account already exists",
      9003: "2fa verification failed",
      9009: "Incorrect username or password",
    },
  },

  /**
   * Column fields
   */

  index: "code::index",

  card_list: "code::card_list",

  card_id: "code::card_id",

  auto_deposit: "code::auto_deposit",
  manual_deposit: "code::manual_deposit",

  date: "code::date",
  recharge_fee: "code::recharge_fee",
  deduction_amount: "code::deduction_amount",
  deduction_fee: "code::deduction_fee",
  opening_balance: "code::opening_balance",
  ending_balance: "code::ending_balance",
};
