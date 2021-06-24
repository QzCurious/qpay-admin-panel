export default {
  name: "繁中-台灣",

  // system_management
  system_management: "系統管理",
  role_management: "權限設定",
  operation_log: "操作日誌",
  change_signin_password: "變更密碼",
  change_payment_password: "變更付款密碼",
  user_management: "管理使用者",

  // funds_management
  funds_management: "資金管理",
  funds_operation_panel: "資金操作面板",
  transaction_record: "資金異動紀錄",
  funds_withdraw: "資金提領",
  funds_withdraw_audit: "資金提領審核",

  // merchant_management
  merchant_management: "商戶管理",
  merchant_operation_panel: "code::merchant_operation_panel",
  merchant_channel_parameter: "商戶通道參數",
  merchant_channel_rate: "商戶通道費率",
  merchant_channel_setting: "商戶通道管理",

  // order_management
  order_management: "訂單管理",
  merchant_order: "商戶訂單",
  merchant_order_post: "code::merchant_order_post",
  merchant_order_statistics: "code::merchant_order_statistics",
  merchant_order_operation: "code::merchant_order_operation",
  deposit_transaction_operation: "收款紀錄操作",
  deposit_transaction: "收款紀錄",

  /**
   * Sidebar categories
   */
  payment_management: "支付管理",
  bank_management: "銀行管理",
  channel_management: "通道管理",
  card_holder_management: "持卡人管理",
  card_management: "銀行卡管理",
  card_operation_panel: "銀行卡管理面板",

  financial_reports: "財務報表",
  deposit_daily_report: "日收益報表",
  merchant_daily_report: "code::merchant_daily_report",

  // value
  funds_withdraw_status: {
    pending: "待處理",
    processing: "處理中",
    paid: "已支付",
    reject: "駁回",
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
    PENDING: "code::pending",
    PAID: "code::paid",
    UNPAID: "code::unpaid",
    REJECT: "code::reject",
  },
  deposit_transaction_status_values: {
    AUTO_DEPOSIT: "自動收款",
    MANUAL_DEPOSIT: "手動收款",
    UNKNOWN_DEPOSIT: "未知收款",
    WAITING_DEPOSIT: "等待付款",
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

  // subject
  signin_id: "帳號",
  company: "機構",
  role: "職位",
  status: "狀態",
  old_password: "舊密碼",
  new_password: "新密碼",
  signin_password: "密碼",
  payment_password: "付款密碼",
  ip_allow: "允許 IP 名單",
  phone: "電話",
  enabled: "啟用",
  disabled: "停用",
  merchant: "商戶",
  created_at: "建立時間",
  operation: "操作",
  MD5_key: "MD5_key",
  bank: "銀行",
  bank_code: "銀行代號",
  transfer: "跨行轉帳",
  country: "國家",
  channel: "通道",
  card: "銀行卡",
  card_id: "銀行卡 ID",
  card_holder: "持卡人",
  card_number: "卡號",
  account_name: "卡片持有者名",
  deposit_limit_daily: "日收款上限",
  deposit_limit_once: "單次收款上限",
  pb_api_key: "PushBullet Key",
  plugin_mode: "掛載模式",
  bank_branch: "分行",
  internet_banking_id: "網銀帳號",
  internet_banking_password: "網銀密碼",
  online: "掛載",
  auto_refresh: "自動刷新",
  limit_deposit: "收款限制",
  deposit_today: "今日已收款額度",
  credit_today: "今日已入帳額度",
  remaining_today: "今日剩餘收款額度",
  balance: "帳戶餘額",
  current_balance: "卡片餘額",
  deposit_fee: "收款手續費",
  withdraw_fee_rate: "提款手續費率",
  withdraw_fee: "提款手續費",
  withdraw_limit_daily: "日提款上限",
  deposit_fee_rate: "收款手續費率",
  recharge_limit_daily: "單日充值上限",
  manual_deposit_limit: "手動收款增加值上限",
  order_limit_once: "單次收款上限",
  order_per_minute: "每分鐘產生訂單上限",
  order_limit_daily: "單日收款上限",
  transaction_id: "交易代號",
  transaction_number: "交易代號",
  withdraw_amount: "提款金額",
  debit_amount: "code::debit_amount",
  to_bank: "收款銀行",
  to_branch: "收款分行",
  to_account_name: "收款人",
  to_account_number: "收款帳號",
  remark: "附註",
  order_number: "訂單號",
  order_amount: "金額",
  order_over: "金額大於",
  order_status: "訂單狀態",
  audit_type: "審核狀態",
  real_amount: "實際支付金額",
  fee: "手續費",
  credit_amount: "入帳金額",
  order_time: "下單時間",
  success_time: "成功時間",
  deposit_count: "總收款筆數",
  total_deposit: "總收款金額",
  unknown_count: "未知筆數",
  unknown_deposit: "未知總金額",
  deposit_amount: "收款金額",
  payee_bank: "收款銀行",
  payee_account: "收款戶名",
  payee_number: "收款卡片號碼",
  sms_message: "簡訊",
  remitter_name: "匯款人姓名",
  operator: "操作者",
  transaction_time: "交易時間",
  operation_balance: "操作金額",
  before_balance: "操作前金額",
  after_balance: "操作後金額",
  transaction_record_type: "交易類型",
  balance_d0: "D0總餘額",
  lock_balance_d0: "D0鎖定總餘額",
  balance_t1: "T1總餘額",
  lock_balance_t1: "T1鎖定總餘額",
  total_balance_d0: "D0總餘額",
  total_balance_t1: "T1總餘額",
  amount: "金額",
  auto_deposit: "卡片自動收款總金額",
  manual_deposit: "卡片手動收款總金額",

  // action
  create_role: "建立職位",
  edit_role: "編輯職位",
  create_account: "建立帳號",
  edit_account: "編輯帳號",
  reset_2fa: "重設 2fa",
  enable_account: "啟用帳號",
  disable_account: "停用帳號",
  create_merchant: "建立商戶",
  edit_merchant: "編輯商戶",
  enable_merchant: "啟用商戶",
  disable_merchant: "停用商戶",
  delete_merchant: "刪除商戶",
  create_bank: "建立銀行",
  edit_bank: "編輯銀行",
  enable_bank: "啟用銀行",
  disable_bank: "停用銀行",
  delete_bank: "刪除銀行",
  enable_bank_transfer: "啟用跨行轉帳",
  disable_bank_transfer: "停用跨行轉帳",
  generate_new_MD5_key: "產生新 key",
  create_channel: "建立通道",
  edit_channel: "編輯通道",
  enable_channel: "啟用通道",
  disable_channel: "停用通道",
  delete_channel: "刪除通道",
  create_card_holder: "建立持卡人",
  edit_card_holder: "編輯持卡人",
  enable_card_holder: "啟用持卡人",
  disable_card_holder: "停用持卡人",
  delete_card_holder: "刪除持卡人",
  create_card: "建立卡片",
  edit_card: "編輯卡片",
  enable_card: "啟用卡片",
  disable_card: "停用卡片",
  delete_card: "刪除卡片",
  online_card: "掛載銀行卡",
  offline_card: "卸載銀行卡",
  create_merchant_channel: "建立商戶通道",
  edit_merchant_channel: "編輯商戶通道",
  enable_merchant_channel: "啟用商戶通道",
  disable_merchant_channel: "停用商戶通道",
  delete_merchant_channel: "刪除商戶通道",
  edit_merchant_channel_parameter: "編輯商戶參數",
  verify_2fa: "驗證 2fa",
  signin: "登入",
  deposit_with_fee: "加值 (有手續費)",
  deposit_without_fee: "加值 (無手續費)",
  withdraw_with_fee: "提領 (有手續費)",
  withdraw_without_fee: "提領 (無手續費)",
  withdraw_application: "提領申請",
  withdraw: "提領",

  // will be
  account_will_be_enabled: "帳號將被啟用",
  account_will_be_disabled: "帳號將被停用",
  account_2fa_will_be_reset: "帳號 2fa 將被重設",
  merchant_will_be_enabled: "商戶將被啟用",
  merchant_will_be_disabled: "商戶將被停用",
  merchant_will_be_deleted: "商戶將被刪除",
  bank_will_be_enabled: "銀行將被啟用",
  bank_will_be_disabled: "銀行將被停用",
  bank_will_be_deleted: "銀行將被刪除",
  bank_transfer_will_be_enabled: "跨行轉帳將被啟用",
  bank_transfer_will_be_disabled: "跨行轉帳將被停用",
  channel_will_be_enabled: "通道將被啟用",
  channel_will_be_disabled: "通道將被停用",
  channel_will_be_deleted: "通道將被刪除",
  card_holder_will_be_enabled: "持卡人將被啟用",
  card_holder_will_be_disabled: "持卡人將被停用",
  card_holder_will_be_deleted: "持卡人將被刪除",
  card_will_be_enabled: "卡片將被啟用",
  card_will_be_disabled: "卡片將被停用",
  card_will_be_online: "卡片將掛載",
  card_will_be_offline: "卡片將卸載",
  card_will_be_deleted: "卡片將被刪除",
  merchant_channel_will_be_enabled: "商戶通道將被啟用",
  merchant_channel_will_be_disabled: "商戶通道將被停用",
  merchant_channel_will_be_deleted: "商戶通道將被刪除",
  status_will_be_updated: "狀態將被更新",
  status_will_be_updated_to_processing: "狀態將被更新為處理中",
  status_will_be_updated_to_paid: "狀態將被更新為已支付",
  status_will_be_updated_to_reject: "狀態將被更新為駁回",

  // feedback
  role_successfully_created: "職位新增成功",
  role_successfully_updated: "職位更新成功",
  account_successfully_enabled: "帳號已啟用",
  account_successfully_disabled: "帳號已停用",
  account_successfully_created: "職位新增成功",
  account_successfully_updated: "職位更新成功",
  channel_successfully_created: "通道新增成功",
  channel_successfully_updated: "通道更新成功",
  channel_successfully_enabled: "通道已啟用",
  channel_successfully_disabled: "通道已停用",
  channel_successfully_deleted: "通道已刪除",
  card_successfully_created: "卡片新增成功",
  card_successfully_updated: "卡片更新成功",
  card_successfully_enabled: "卡片已啟用",
  card_successfully_disabled: "卡片已停用",
  card_successfully_deleted: "卡片已刪除",
  card_successfully_online: "卡片已掛載",
  card_successfully_offline: "卡片已卸載",
  merchant_channel_successfully_created: "商戶通道新增成功",
  merchant_channel_successfully_updated: "商戶通道更新成功",
  merchant_channel_successfully_enabled: "商戶通道已啟用",
  merchant_channel_successfully_disabled: "商戶通道已停用",
  merchant_channel_successfully_deleted: "商戶通道已刪除",
  ip_is_invalid: "錯誤的 IP 位址",
  MD5_key_copied: "已複製 MD5 key",
  merchant_successfully_created: "商戶新增成功",
  merchant_successfully_updated: "商戶更新成功",
  merchant_successfully_enabled: "商戶已啟用",
  merchant_successfully_disabled: "商戶已停用",
  merchant_successfully_deleted: "商戶已刪除",
  bank_successfully_created: "銀行新增成功",
  bank_successfully_updated: "銀行更新成功",
  bank_successfully_enabled: "銀行已啟用",
  bank_successfully_disabled: "銀行已停用",
  bank_successfully_deleted: "銀行已刪除",
  bank_transfer_successfully_enabled: "跨行轉帳已啟用",
  bank_transfer_successfully_disabled: "跨行轉帳已停用",
  password_successfully_changed: "修改密碼成功",
  confirm_new_password: "確認新密碼",
  payment_password_successfully_changed: "修改密碼成功",
  card_holder_successfully_created: "持卡人新增成功",
  card_holder_successfully_updated: "持卡人更新成功",
  card_holder_successfully_enabled: "持卡人已啟用",
  card_holder_successfully_disabled: "持卡人已停用",
  card_holder_successfully_deleted: "持卡人已刪除",
  status_successfully_set_to_processing: "更新狀態為處理中",
  status_successfully_set_to_paid: "更新狀態為已支付",
  status_successfully_set_to_reject: "更新狀態為駁回",
  deposit_with_fee_successfully: "加值成功",
  deposit_without_fee_successfully: "加值成功",
  withdraw_with_fee_successfully: "提領成功",
  withdraw_without_fee_successfully: "提領成功",
  withdraw_applied_successfully: "提領申請成功",

  // informative
  enter_2fa_to_permit_action: "請輸入 2fa 以授權操作",

  form: {
    create: "新增",
    edit: "編輯",
    delete: "刪除",
    submit: "送出",
    search: "搜尋",
    clear: "清除",
    apply: "套用",
    accept: "是",
    reject: "否",
    cancel: "取消",
    copy: "複製",
    next: "下一步",
    start_time: "開始",
    end_time: "結束",
  },

  // error
  invalid_date_format: "時間格式錯誤",
  end_time_should_not_be_older_then_start_time: "結束時間不可小於開始時間",

  // day
  today: "今天",

  // weekday
  Sunday: "星期日",
  Monday: "星期一",
  Tuesday: "星期二",
  Wednesday: "星期三",
  Thursday: "星期四",
  Friday: "星期五",
  Saturday: "星期六",
  Sun: "日",
  Mon: "一",
  Tue: "二",
  Wed: "三",
  Thu: "四",
  Fri: "五",
  Sat: "六",

  // month
  January: "一月",
  February: "二月",
  March: "三月",
  April: "四月",
  May: "五月",
  June: "六月",
  July: "七月",
  August: "八月",
  September: "九月",
  October: "十月",
  November: "十一月",
  December: "十二月",

  request_failed: "請求失敗",
  server_error: "伺服器錯誤",
  api: {
    error: {
      // System
      1001: "原密碼不正確",
      1002: "帳號已存在",
      1003: "不可修改自己的權限",

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
      9003: "2fa 驗證碼錯誤",
      9009: "帳號不存在或密碼不正確",
      9010: "Permission denied",

      // General
      9101: "No data",
      9102: "Unprocessable Entity",
      9103: "Your ip is not allow",

      //Pay Order
      10002: "validation fail",
      20000: "unknow fail please check channel id",
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

  date: "code::date",
  recharge_fee: "code::recharge_fee",
  deduction_amount: "code::deduction_amount",
  deduction_fee: "code::deduction_fee",
  opening_balance: "code::opening_balance",
  ending_balance: "code::ending_balance",
}
