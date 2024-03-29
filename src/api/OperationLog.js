import http, { CACHE_MAX_AGE } from "./http"

export const OPERATION_TYPE = {
  ROLE: 10,
  SIGNIN_PASSWORD: 21,
  PAYMENT_PASSWORD: 22,
  USER: 20,
  BANK: 30,
  CHANNEL: 40,
  HOLDER: 50,
  CARD: 60,
  FUNDS: 70,
  MERCHANT_ORDER: 80,
  DEPOSIT_ORDER: 90,
  MERCHANT: 100,
  MERCHANT_CHANNEL: 110,
  CARD_SMS: 61,
}

export const OPERATION_SUB_TYPE = {
  ADD: 1,
  EDIT: 2,
  DELETE: 3,
  WITHDRAW: 4,
  ORDER_AUDIT: 5,
  ORDER_POST: 6,
}

class OperationLog {
  async count(params = {}) {
    return http.get("operation_log/summary", { params })
  }

  async find(params, config) {
    params = {
      page: 1,
      limit: 10,
      ...params,
    }
    return http.get("operation_log", { params, ...config })
  }
}

const operation_log = new OperationLog()

export default operation_log
