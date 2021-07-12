import http, { CACHE_MAX_AGE } from "./http"
import store from "../store"

let clear_all = false
class Role {
  async all() {
    const res = await role.find(
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
    store.dispatch("api/set_role_list", res.data.data)
    return res
  }

  async get(id) {
    return http.get(`role/${id}`)
  }

  async find(params = {}, config) {
    params = {
      page: 1,
      limit: 10,
      ...params,
    }
    return http.get("role", { params, ...config })
  }

  async create(data) {
    const res = await http.post("role", data)
    clear_all = true
    return res
  }

  async update(id, data) {
    const res = await http.put(`role/${id}`, data)
    clear_all = true
    return res
  }
}

const role = new Role()

export default role
