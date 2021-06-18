export default {
  name: "简中-中国",

  // system_management
  system_management: "系统管理",
  role_management: "权限设定",
  operation_log: "操作记录",
  change_signin_password: "修改登入密码",
  change_payment_password: "修改支付密码",
  user_management: "使用者管理",

  // funds_management
  funds_management: "资金管理",
  funds_operation_panel: "资金操作面板",
  transaction_record: "资金异动记录",
  funds_withdraw: "商户资金提领",
  funds_withdraw_audit: "XXXXXXXX",

  // merchant_management
  merchant_management: "商戶管理",
  merchant_operation_panel: "商户操作面板",
  merchant_channel_parameter: "商戶通道参数设置",
  merchant_channel_rate: "商戶通道费率设置",
  merchant_channel_setting: "商戶通道管理",

  // order_management
  order_management: "订单管理",
  merchant_order: "代收订单管理",
  merchant_order_post: "代收订单推送",
  merchant_order_statistics: "代收订单统计",
  merchant_order_operation: "代收订单操作",
  deposit_transaction_operation: "收款记录操作",
  deposit_transaction: "收款记录",

  /**
   * Sidebar categories
   */
  payment_management: "支付管理",
  bank_management: "银行管理",
  channel_management: "通道管理",
  card_holder_management: "持卡人管理",
  card_management: "銀行卡管理",
  card_operation_panel: "银行卡管理面板",

  financial_reports: "财务报表",
  deposit_daily_report: "存款日报表",
  merchant_daily_report: "商户通道日报表",

  // value
  funds_withdraw_status: {
    pending: "等待处理",
    processing: "处理中",
    paid: "支付完成",
    reject: "拒绝支付",
  },
  order_status_values: {
    UNPAID: "未支付",
    SUCCESS: "成功",
    SUCCESS_NOT_NOTIFY: "已支付未通知",
    FAIL_EXPIRE: "订单逾时",
    FAIL_AMOUNT_NOT_MATCH: "金额错误",
    FAIL_ORDER: "订单失败",
  },
  audit_type_values: {
    PENDING: "等待处理",
    PAID: "支付",
    UNPAID: "未支付",
    REJECT: "拒绝",
  },
  deposit_transaction_status_values: {
    AUTO_DEPOSIT: "自动处理",
    MANUAL_DEPOSIT: "人工处理",
    UNKNOWN_DEPOSIT: "未知存款",
    WAITING_DEPOSIT: "XXXXXXXX",
  },
  transaction_record_type_values: {
    ORDER_DEPOSIT: "代收订单",
    ORDER_DEPOSIT_FEE: "代收手续费",
    ORDER_WITHDRAW: "代付订单",
    ORDER_WITHDRAW_FEE: "代付手续费",
    MERCHANT_FUNDS_WITHDRAW: "商户提款",
    MERCHANT_FUNDS_WITHDRAW_FEE: "商户提款手续费",
    MERCHANT_RECHARGE: "商户充值",
    MERCHANT_RECHARGE_FEE: "商户充值手续费",
    MERCHANT_DEDUCTION: "商户扣款",
    MERCHANT_DEDUCTION_FEE: "商户扣款手续费",
  },

  // subject
  signin_id: "账号",
  company: "机构",
  role: "角色",
  status: "状态",
  old_password: "旧密码",
  new_password: "新密码",
  signin_password: "登入密码",
  payment_password: "取款密码",
  ip_allow: "允許 IP 名單",
  phone: "电话",
  enabled: "启用",
  disabled: "停用",
  merchant: "商户",
  created_at: "建立时间",
  operation: "操作",
  MD5_key: "MD5_key",
  bank: "银行",
  bank_code: "银行编码",
  transfer: "跨行转账",
  country: "国家/地区",
  channel: "通道",
  card: "银行卡",
  card_holder: "持卡人",
  card_number: "账户号码",
  deposit_limit_daily: "每日收款上限",
  deposit_limit_once: "每次收款上限",
  pb_api_key: "自动工具KEY",
  plugin_mode: "挂载模式",
  bank_branch: "支行",
  internet_banking_id: "网银账号",
  internet_banking_password: "网银密码",
  online: "挂载",
  auto_refresh: "自动刷新",
  limit_deposit: "收款限制",
  deposit_today: "今日已收款额度",
  credit_today: "今日已入账额度",
  remaining_today: "今日剩余收款额度",
  balance: "余额",
  deposit_fee: "收款手续费",
  withdraw_fee_rate: "提款手续费率",
  withdraw_fee: "提款手续费率",
  withdraw_limit_daily: "每日提款上限",
  deposit_fee_rate: "收款手续费率",
  recharge_limit_daily: "每日充值上限",
  manual_deposit_limit: "手动上分最大增加值",
  order_limit_once: "商户订单上限",
  order_per_minute: "每分钟建单上限",
  order_limit_daily: "商户每日订单上限",
  transaction_id: "交易编号",
  transaction_number: "交易编号",
  withdraw_amount: "提款金额",
  debit_amount: "汇出金额",
  to_bank: "汇出银行",
  to_branch: "汇出支行",
  to_account_name: "汇出户名",
  to_account_number: "汇出账户号码",
  remark: "附言",
  order_number: "订单编号",
  order_amount: "订单金额",
  order_over: "订单金额超过",
  order_status: "订单状态",
  audit_type: "审核状态",
  real_amount: "实际金额",
  fee: "手续费",
  credit_amount: "入账金额",
  order_time: "订单时间",
  success_time: "成功时间",
  deposit_count: "存款总笔数",
  total_deposit: "存款总额",
  unknown_count: "未知存款笔数",
  unknown_deposit: "未知存款总额",
  deposit_amount: "存款额度",
  payee_bank: "收款银行",
  payee_account: "收款户名",
  payee_number: "收款账号",
  sms_message: "短信内容",
  remitter_name: "汇款户名",
  operator: "操作账号",
  transaction_time: "交易时间",
  operation_balance: "操作金额",
  before_balance: "操作前金额",
  after_balance: "操作后金额",
  transaction_record_type: "交易类型",
  balance_d0: "D0余额",
  lock_balance_d0: "D0锁定余额",
  balance_t1: "T1余额",
  lock_balance_t1: "T1锁定余额",
  total_balance_d0: "D0总余额",
  total_balance_t1: "T1总余额",
  amount: "XXXXXXXX",

  // action
  create_role: "建立角色",
  edit_role: "编辑角色",
  create_account: "建立账号",
  edit_account: "编辑账号",
  reset_2fa: "重設谷歌验证器",
  enable_account: "启用账号",
  disable_account: "冻结账号",
  create_merchant: "建立商户",
  edit_merchant: "编辑商戶",
  enable_merchant: "启用商戶",
  disable_merchant: "冻结商戶",
  delete_merchant: "删除商戶",
  create_bank: "建立银行",
  edit_bank: "编辑银行",
  enable_bank: "启用银行",
  disable_bank: "停用银行",
  delete_bank: "删除银行",
  enable_bank_transfer: "启用跨行转账",
  disable_bank_transfer: "停用跨行转账",
  generate_new_MD5_key: "产生新的商户MD5 KEY",
  create_channel: "建立通道",
  edit_channel: "编辑通道",
  enable_channel: "启用通道",
  disable_channel: "停用通道",
  delete_channel: "删除通道",
  create_card_holder: "建立持卡人",
  edit_card_holder: "编辑持卡人",
  enable_card_holder: "启用持卡人",
  disable_card_holder: "停用持卡人",
  delete_card_holder: "刪除持卡人",
  create_card: "建立卡片",
  edit_card: "編輯卡片",
  enable_card: "启用卡片",
  disable_card: "停用卡片",
  delete_card: "刪除卡片",
  online_card: "挂载银行卡",
  offline_card: "卸载银行卡",
  create_merchant_channel: "建立商戶通道",
  edit_merchant_channel: "編輯商戶通道",
  enable_merchant_channel: "启用商戶通道",
  disable_merchant_channel: "停用商戶通道",
  delete_merchant_channel: "刪除商戶通道",
  edit_merchant_channel_parameter: "编辑商户参数",
  verify_2fa: "谷歌二次验证",
  signin: "登入",
  deposit_with_fee: "XXXXXXXX",
  deposit_without_fee: "XXXXXXXX",
  withdraw_with_fee: "XXXXXXXX",
  withdraw_without_fee: "XXXXXXXX",
  withdraw_application: "XXXXXXXX",
  withdraw: "XXXXXXXX",

  // will be
  account_will_be_enabled: "账号将被启用",
  account_will_be_disabled: "账号将被停用",
  account_2fa_will_be_reset: "账号谷歌二次验证码将被重设",
  merchant_will_be_enabled: "商戶将被启用",
  merchant_will_be_disabled: "商戶将被停用",
  merchant_will_be_deleted: "商戶將被删除",
  bank_will_be_enabled: "银行将被启用",
  bank_will_be_disabled: "银行将被停用",
  bank_will_be_deleted: "银行将被刪除",
  bank_transfer_will_be_enabled: "跨行转账将被启用",
  bank_transfer_will_be_disabled: "跨行转账将被停用",
  channel_will_be_enabled: "通道将被启用",
  channel_will_be_disabled: "通道将被停用",
  channel_will_be_deleted: "通道将被刪除",
  card_holder_will_be_enabled: "持卡人将被启用",
  card_holder_will_be_disabled: "持卡人将被停用",
  card_holder_will_be_deleted: "持卡人将被刪除",
  card_will_be_enabled: "卡片将被启用",
  card_will_be_disabled: "卡片将被停用",
  card_will_be_online: "卡片将挂载",
  card_will_be_offline: "卡片将卸载",
  card_will_be_deleted: "卡片将被刪除",
  merchant_channel_will_be_enabled: "商戶通道将被启用",
  merchant_channel_will_be_disabled: "商戶通道将被停用",
  merchant_channel_will_be_deleted: "商戶通道将被刪除",
  status_will_be_updated: "状态将被更新",
  status_will_be_updated_to_processing: "状态将更新为处理中",
  status_will_be_updated_to_paid: "状态将更新为已支付",
  status_will_be_updated_to_reject: "状态将更新为拒绝支付",

  // feedback
  role_successfully_created: "角色新增成功",
  role_successfully_updated: "角色更新成功",
  account_successfully_enabled: "账号已启用",
  account_successfully_disabled: "账号已停用",
  account_successfully_created: "账号新增成功",
  account_successfully_updated: "账号更新成功",
  channel_successfully_created: "通道新增成功",
  channel_successfully_updated: "通道更新成功",
  channel_successfully_enabled: "通道已启用",
  channel_successfully_disabled: "通道已停用",
  channel_successfully_deleted: "通道已刪除",
  card_successfully_created: "卡片新增成功",
  card_successfully_updated: "卡片更新成功",
  card_successfully_enabled: "卡片已启用",
  card_successfully_disabled: "卡片已停用",
  card_successfully_deleted: "卡片已刪除",
  card_successfully_online: "卡片已挂载",
  card_successfully_offline: "卡片已卸载",
  merchant_channel_successfully_created: "商戶通道新增成功",
  merchant_channel_successfully_updated: "商戶通道更新成功",
  merchant_channel_successfully_enabled: "商戶通道已启用",
  merchant_channel_successfully_disabled: "商戶通道已停用",
  merchant_channel_successfully_deleted: "商戶通道已刪除",
  ip_is_invalid: "錯誤的 IP 地址",
  MD5_key_copied: "以复制 MD5 key",
  merchant_successfully_created: "商戶新增成功",
  merchant_successfully_updated: "商戶更新成功",
  merchant_successfully_enabled: "商戶已启用",
  merchant_successfully_disabled: "商戶已停用",
  merchant_successfully_deleted: "商戶已刪除",
  bank_successfully_created: "银行新增成功",
  bank_successfully_updated: "银行更新成功",
  bank_successfully_enabled: "银行已启用",
  bank_successfully_disabled: "银行已停用",
  bank_successfully_deleted: "银行已刪除",
  bank_transfer_successfully_enabled: "跨行转账已启用",
  bank_transfer_successfully_disabled: "跨行转账已停用",
  password_successfully_changed: "修改密码成功",
  confirm_new_password: "确认新密码",
  payment_password_successfully_changed: "修改支付密码成功",
  card_holder_successfully_created: "持卡人新增成功",
  card_holder_successfully_updated: "持卡人更新成功",
  card_holder_successfully_enabled: "持卡人已启用",
  card_holder_successfully_disabled: "持卡人已停用",
  card_holder_successfully_deleted: "持卡人已删除",
  status_successfully_set_to_processing: "状态已更新为处理中",
  status_successfully_set_to_paid: "状态已更新为已支付",
  status_successfully_set_to_reject: "状态已更新为拒绝支付",
  deposit_with_fee_successfully: "XXXXXXXX",
  deposit_without_fee_successfully: "XXXXXXXX",
  withdraw_with_fee_successfully: "XXXXXXXX",
  withdraw_without_fee_successfully: "XXXXXXXX",
  withdraw_applied_successfully: "XXXXXXXX",

  // informative
  enter_2fa_to_permit_action: "请输入谷歌二次验证码",

  form: {
    create: "新增",
    edit: "编辑",
    delete: "删除",
    submit: "送出",
    search: "搜寻",
    clear: "清除",
    apply: "套用",
    accept: "是",
    reject: "否",
    cancel: "取消",
    copy: "复制",
    next: "下一步",
    start_time: "开始时间",
    end_time: "结束时间",
  },

  // error
  invalid_date_format: "时间格式错误",
  end_time_should_not_be_older_then_start_time: "结束时间不得小于开始时间",

  // day
  today: "今日",

  // weekday
  Sunday: "周日",
  Monday: "周一",
  Tuesday: "周二",
  Wednesday: "周三",
  Thursday: "周四",
  Friday: "周五",
  Saturday: "周六",
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

  request_failed: "XXXXXXXX",
  server_error: "XXXXXXXX",
  api: {
    error: {
      1001: "原密码不正确",
      1002: "账号已存在",
      9003: "谷歌二次验证码失败",
      9009: "账号不存在或登入密码错误",
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
