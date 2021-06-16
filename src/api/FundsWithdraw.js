import http from "./http";

export const PENDING = 0;
export const PROCESSING = 1;
export const PAID = 2;
export const REJECT = 3;

class FundsWithdraw {
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

  async apply_withdraw(id, data) {
    return http.post(`funds/withdraw/${id}`, data);
  }

  async update(id, data) {
    return http.put(`funds/withdraw/${id}`, data);
  }
}

const funds_withdraw = new FundsWithdraw();

export default funds_withdraw;
