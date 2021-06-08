import http from "./http";

export const PENDING = 0;
export const PROCESSING = 1;
export const PAID = 2;
export const REJECT = 3;

class Funds {
  async count(params = {}) {
    return http.get("funds/withdraw/summary", { params });
  }

  async find(params) {
    params = {
      page: 1,
      limit: 10,
      ...params,
    };
    return http.get("funds/withdraw", { params });
  }

  async update(id, data) {
    return http.put(`funds/withdraw/${id}`, data);
  }
}

const funds = new Funds();

export default funds;
