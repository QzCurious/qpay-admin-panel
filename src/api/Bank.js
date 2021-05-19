import http from "./http";

class Bank {
  async count(params = {}) {
    return http.get("bank/summary", { params });
  }

  async all() {
    return bank.find({ limit: 99 });
  }

  async find(params) {
    params = {
      page: 1,
      limit: 10,
      ...params
    };
    return http.get("bank", { params });
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
