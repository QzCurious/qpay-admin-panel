import http from "./http"

export const DEPOSIT_WITH_FEE = 1
export const DEPOSIT_NO_FEE = 2
export const WITHDRAW_WITH_FEE = 3
export const WITHDRAW_NO_FEE = 4

class Funds {
  async count(params = {}) {
    return http.get("funds/summary", { params })
  }

  async find(params) {
    params = {
      page: 1,
      limit: 10,
      ...params,
    }
    return http.get("funds/", { params })
  }

  async make_transaction(id, data) {
    return http.put(`funds/${id}`, data)
  }
}

const funds = new Funds()

export default funds
