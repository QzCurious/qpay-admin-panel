import http from "./http";

class User {
  async all() {
    return http.get("users");
  }

  async get({ id }) {
    return http.get(`users/${id}`);
  }

  async create({ sign_id, password, ip_allow = [], phone = null }) {
    return http.post("users", { sign_id, password, ip_allow, phone });
  }

  async update(id, data) {
    return http.patch(`users/${id}`, data);
  }

  async command(id, data) {
    return http.post(`users/${id}/command`, data);
  }

  async reset_2fa(id) {
    return user.command(id, { type: "reset_2fa" });
  }
}

const user = new User();
export default user;
