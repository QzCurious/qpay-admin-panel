import http from "./http";
class Role {
  async all() {
    return http.get("roles");
  }

  async create(data) {
    return http.post("roles", data);
  }

  async update(id, data) {
    return http.patch(`roles/${id}`, data);
  }
}

export default new Role();
