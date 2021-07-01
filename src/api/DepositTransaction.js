import http from "./http"

export const DEPOSIT_TRANSACTION_STATUS_VALUES = {
  UNKNOWN_DEPOSIT: 0,
  AUTO_DEPOSIT: 1,
  MANUAL_DEPOSIT: 2,
  WAITING_DEPOSIT: 3,
}

class DepositTransaction {
  async count(params = {}) {
    return http.get("deposit_transaction/summary", { params })
  }

  async find(params) {
    params = {
      page: 1,
      limit: 10,
      ...params,
    }
    return http.get("deposit_transaction", { params })
  }

  async get(id) {
    return http.get(`deposit_transaction/${id}`)
  }

  async create(params) {
    return http.post("deposit_transaction", params)
  }

  async update(id, data) {
    return http.put(`deposit_transaction/${id}`, data)
  }

  async delete(id) {
    return http.delete(`deposit_transaction/${id}`)
  }
}

const depositTransaction = new DepositTransaction()

export default depositTransaction
