import http, { CACHE_MAX_AGE } from "./http"
import store from "../store"

let clear_all = false
class Channel {
  async count(params = { status: null }) {
    return http.get("channel/summary", { params })
  }

  async all() {
    const res = await channel.find(
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
    store.dispatch("api/set_channel_list", res.data.data)
    return res
  }

  async find(params = {}, config) {
    params = {
      page: 1,
      limit: 10,
      ...params,
    }
    return http.get("channel", { params, ...config })
  }

  async create(data) {
    const res = await http.post("channel", data)
    clear_all = true
    return res
  }

  async update(id, data) {
    const res = await http.put(`channel/${id}`, data)
    clear_all = true
    return res
  }

  async delete(id, data) {
    const res = await http.delete(`channel/${id}`, data)
    clear_all = true
    return res
  }
}

const channel = new Channel()
export default channel
