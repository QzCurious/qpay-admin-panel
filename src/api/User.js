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
}

export default new User();
