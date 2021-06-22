import http from "./http"
import store from "../store"

class Merchant {
  async count(params = { status: null }) {
    return http.get("merchant/summary", { params })
  }

  async get(id) {
    return http.get(`merchant/${id}`)
  }

  async all() {
    return merchant.find({ limit: 99 })
  }

  async find(params = {}) {
    params = {
      status: null,
      page: 1,
      limit: 10,
      ...params,
    }
    return http.get("merchant", { params }).then((res) => {
      store.dispatch("api/set_merchant_list", res.data.data)
      return res
    })
  }

  async create(params) {
    return http.post("merchant", params)
  }

  async update(id, data) {
    return http.put(`merchant/${id}`, data)
  }

  async delete(id) {
    return http.delete(`merchant/${id}`)
  }
}

const merchant = new Merchant()

export default merchant
