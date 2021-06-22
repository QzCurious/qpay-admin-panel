import http, { CACHE_MAX_AGE } from "./http"
import store from "../store"

let clear_all = false
class Bank {
  async count(params = {}) {
    return http.get("bank/summary", { params })
  }

  async all() {
    const res = await bank.find(
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
    store.dispatch("api/set_bank_list", res.data.data)
    return res
  }

  async find(params, config) {
    params = {
      page: 1,
      limit: 10,
      ...params,
    }
    return http.get("bank", { params, ...config })
  }

  async get(id) {
    return http.get(`bank/${id}`)
  }

  async create(params) {
    const res = await http.post("bank", params)
    clear_all = true
    return res
  }

  async update(id, data) {
    return http.put(`bank/${id}`, data)
  }

  async delete(id) {
    const res = await http.delete(`bank/${id}`)
    clear_all = true
    return res
  }
}

const bank = new Bank()

export default bank
