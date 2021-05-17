import http from "./http";
import store from "../store";

class Role {
  async all() {
    return role.find({ limit: 99 });
  }

  async find(params = {}) {
    params = {
      page: 1,
      limit: 10,
      ...params
    };
    return http.get("role", { params }).then(res => {
      store.dispatch("api/set_role_list", res.data.data);
    });
  }

  async create(data) {
    return http.post("role", data);
  }

  async update(id, data) {
    return http.patch(`role/${id}`, data);
  }
}

const role = new Role();

export default role;
