import { $axios } from ".";

class User {
  async all() {
    return $axios.get("users");
  }

  async get({ id }) {
    return $axios.get(`users/${id}`);
  }

  async create({ sign_id, password, ip_allow = [], phone = null }) {
    return $axios.post("users", { sign_id, password, ip_allow, phone });
  }
}

export default new User();
