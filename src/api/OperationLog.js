import http, { CACHE_MAX_AGE } from "./http"
import store from "../store"

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

let clear_all = false
class OperationLog {
  async count(params = {}) {
    return http.get("operation_log/summary", { params })
  }

  async all() {
    const res = await operation_log.find(
      { limit: 99 },
      {
        cache: {
          maxAge: CACHE_MAX_AGE,
          exclude: {
            query: false,
            filter: () => clear_all,
          },
        },
      }
    )
    clear_all = false
    store.dispatch("api/set_operation_log_list", res.data.data)
    return res
  }

  async find(params, config) {
    params = {
      page: 1,
      limit: 10,
      ...params,
    }
    return http.get("operation_log", { params, ...config })
  }

  async get(id) {
    return http.get(`operation_log/${id}`)
  }

  async create(params) {
    const res = await http.post("operation_log", params)
    clear_all = true
    return res
  }

  async update(id, data) {
    const res = await http.put(`operation_log/${id}`)
    clear_all = true
    return res
  }

  async delete(id) {
    const res = await http.delete(`operation_log/${id}`)
    clear_all = true
    return res
  }
}

const operation_log = new OperationLog()

export default new OperationLog()
