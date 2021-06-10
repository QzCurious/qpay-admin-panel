import http from "./http";

class Funds {
  async count(params = {}) {
    return http.get("funds/summary", { params });
  }

  async find(params) {
    params = {
      page: 1,
      limit: 10,
      ...params,
    };
    return http.get("funds/", { params });
  }

  async update(id, data) {
    return http.put(`funds/${id}`, data);
  }
}

const funds = new Funds();

export default funds;
