import http from "./http";

class User {
  async count(params = { signin_id: null, merchant_id: null }) {
    return http.get("user/summary", { params });
  }

  async all() {
    return user.find({ limit: 99 });
  }

  async find(params) {
    params = {
      signin_id: null,
      merchant_id: null,
      page: 1,
      limit: 10,
      ...params
    };
    return http.get("user", { params });
  }

  async get(signin_id) {
    return http.get(`user/${signin_id}`);
  }

  async create(params) {
    return http.post("user", params);
  }

  async update(signin_id, data) {
    return http.put(`user/${signin_id}`, data);
  }

  async command(signin_id, data) {
    return http.post(`user/${signin_id}/command`, data);
  }

  async reset_2fa(signin_id) {
    return user.command(signin_id, { type: "reset_2fa" });
  }
}

const user = new User();
export default user;
