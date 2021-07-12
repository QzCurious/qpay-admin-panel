import http, { CACHE_MAX_AGE } from "./http"
import store from "../store"

let clear_all = false
class Merchant {
  async count(params = { status: null }) {
    return http.get("merchant/summary", { params })
  }

  async get(id) {
    return http.get(`merchant/${id}`)
  }

  async all() {
    const res = await merchant.find(
      { limit: 99 },
      {
        cache: {
          maxAge: CACHE_MAX_AGE,
          exclude: {
            query: false,
          },
          ignoreCache: clear_all,
        },
      }
    )
    clear_all = false
    store.dispatch("api/set_merchant_list", res.data.data)
    return res
  }

  async find(params = {}, config) {
    params = {
      status: null,
      page: 1,
      limit: 10,
      ...params,
    }
    return http.get("merchant", { params, ...config })
  }

  async create(params) {
    const res = await http.post("merchant", params)
    clear_all = true
    return res
  }

  async update(id, data) {
    const res = await http.put(`merchant/${id}`, data)
    clear_all = true
    return res
  }

  async delete(id) {
    const res = await http.delete(`merchant/${id}`)
    clear_all = true
    return res
  }
}

const merchant = new Merchant()

export default merchant
