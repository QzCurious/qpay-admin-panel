import http from "./http";
import store from "../store";

class Bank {
  async count(params = {}) {
    return http.get("bank/summary", { params });
  }

  async all() {
    return bank.find(
      { limit: 99 },
      { cache: { maxAge: 5 * 60 * 1000, exclude: { query: false } } }
    );
  }

  async find(params, config) {
    params = {
      page: 1,
      limit: 10,
      ...params
    };
    return http.get("bank", { params, ...config }).then(res => {
      store.dispatch("api/set_bank_list", res.data.data);
      return res;
    });
  }

  async get(id) {
    return http.get(`bank/${id}`);
  }

  async create(params) {
    return http.post("bank", params);
  }

  async update(id, data) {
    return http.put(`bank/${id}`, data);
  }

  async delete(id) {
    return http.delete(`bank/${id}`);
  }
}

const bank = new Bank();

export default bank;
