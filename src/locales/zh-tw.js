export default {
  name: "繁中-台灣",

  // system_management
  system_management: "系統管理",
  role_setting: "權限設定",
  operation_log: "操作日誌",
  change_password: "變更密碼",
  change_payment_password: "變更付款密碼",
  user_management: "管理使用者",

  // funds_management
  funds_management: "code::funds_management",
  funds_operation_panel: "code::funds_operation_panel",
  transaction_record: "code::transaction_record",

  // merchant_management
  merchant_management: "商戶管理",
  merchant_operation_panel: "code::merchant_operation_panel",
  merchant_parameter: "code::merchant_parameter",
  merchant_rate: "code::merchant_rate",
  merchant_channel_setting: "商戶通道管理",

  // order_management
  order_management: "code::order_management",
  merchant_order: "code::merchant_order",
  merchant_order_post: "code::merchant_order_post",
  merchant_order_statistics: "code::merchant_order_statistics",
  merchant_order_operation: "code::merchant_order_operation",
  deposit_order_operation: "code::deposit_order_operation",
  deposit_record: "code::deposit_record",

  /**
   * Sidebar categories
   */
  payment_management: "支付管理",
  bank_management: "code::bank_management",
  channel_management: "通道管理",
  card_holder_management: "持卡人管理",
  card_management: "銀行卡管理",
  card_operation_management: "code::card_operation_management",

  financial_reports: "code::financial_reports",
  deposit_daily_report: "code::deposit_daily_report",
  merchant_daily_report: "code::merchant_daily_report",

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
  create_at: "建立時間",
  operation: "操作",
  MD5_key: "MD5_key",
  bank: "銀行",
  bank_code: "銀行代號",
  transfer: "跨行轉帳",
  country: "國家",
  channel: "通道",
  card: "銀行卡",
  card_holder: "持卡人",
  card_number: "卡號",
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
  enable_merchant_channel: "啟用商戶通道",
  disable_merchant_channel: "停用商戶通道",
  delete_merchant_channel: "刪除商戶通道",
  verify_2fa: "驗證 2fa",
  signin: "登入",

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
    next: "下一步"
  },

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

  api: {
    error: {
      1001: "原密碼不正確",
      1002: "帳號已存在",
      9003: "2fa 驗證碼錯誤",
      9009: "帳號不存在或密碼不正確",
    }
  },

  /**
   * Column fields
   */

  index: "code::index",

  card_list: "code::card_list",

  card_id: "code::card_id",

  auto_deposit: "code::auto_deposit",
  manual_deposit: "code::manual_deposit",
  total_deposit: "code::total_deposit",
  deposit_count: "code::deposit_count",

  date: "code::date",
  deposit_fee: "code::deposit_fee",
  recharge_fee: "code::recharge_fee",
  deduction_amount: "code::deduction_amount",
  deduction_fee: "code::deduction_fee",
  opening_balance: "code::opening_balance",
  ending_balance: "code::ending_balance",

  deposit_amount: "code::deposit_amount"
};
