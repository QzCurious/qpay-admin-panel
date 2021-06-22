import http, { CACHE_MAX_AGE } from "./http"
import store from "../store"

let clear_all = false
class Holder {
  async count(params = { status: null }) {
    return http.get("holder/summary", { params })
  }

  async all() {
    const res = await holder.find(
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
    store.dispatch("api/set_holder_list", res.data.data)
    return res
  }

  async find(params = {}, config) {
    params = {
      page: 1,
      limit: 10,
      ...params,
    }
    return http.get("holder", { params, ...config })
  }

  async create(data) {
    const res = await http.post("holder", data)
    clear_all = true
    return res
  }

  async update(id, data) {
    return http.put(`holder/${id}`, data)
  }

  async delete(id, data) {
    const res = await http.delete(`holder/${id}`, data)
    clear_all = true
    return res
  }
}

const holder = new Holder()
export default holder
