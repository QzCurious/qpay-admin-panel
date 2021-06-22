import http from "./http"

export const TRANSACTION_RECORD_TYPE = {
  ORDER_DEPOSIT: "order_deposit",
  ORDER_DEPOSIT_FEE: "order_deposit_fee",
  ORDER_WITHDRAW: "order_withdraw",
  ORDER_WITHDRAW_FEE: "order_withdraw_fee",
  MERCHANT_FUNDS_WITHDRAW: "merchant_funds_withdraw",
  MERCHANT_FUNDS_WITHDRAW_FEE: "merchant_funds_withdraw_fee",
  MERCHANT_RECHARGE: "merchant_recharge",
  MERCHANT_RECHARGE_FEE: "merchant_recharge_fee",
  MERCHANT_DEDUCTION: "merchant_deduction",
  MERCHANT_DEDUCTION_FEE: "merchant_deduction_fee",
}

class TransactionRecord {
  async count(params = {}) {
    return http.get("transaction_record/summary", { params })
  }

  async find(params) {
    params = {
      page: 1,
      limit: 10,
      ...params,
    }
    return http.get("transaction_record", { params })
  }

  async update(id, data) {
    return http.put(`transaction_record/${id}`, data)
  }
}

const transaction_record = new TransactionRecord()

export default transaction_record
