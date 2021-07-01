import http, { CACHE_MAX_AGE } from "./http"
import store from "../store"

let clear_all = false
class Card {
  async count(params = {}) {
    return http.get("card/summary", { params })
  }

  async all() {
    const res = await card.find(
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
    store.dispatch("api/set_card_list", res.data.data)
    return res
  }

  async find(params, config) {
    params = {
      page: 1,
      limit: 10,
      ...params,
    }
    return http.get("card", { params, ...config })
  }

  async get(id) {
    return http.get(`card/${id}`)
  }

  async create(params) {
    const res = await http.post("card", params)
    clear_all = true
    return res
  }

  async update(id, data) {
    const res = await http.put(`card/${id}`, data)
    clear_all = true
    return res
  }

  async delete(id) {
    const res = await http.delete(`card/${id}`)
    clear_all = true
    return res
  }
}

const card = new Card()

export default card
