import http from "./http";

export const ORDER_STATUS = {
  UNPAID: 0,
  SUCCESS: 1,
  SUCCESS_NOT_NOTIFY: 2,
  FAIL_EXPIRE: 3,
  FAIL_AMOUNT_NOT_MATCH: 4,
  FAIL_ORDER: 5,
};

export const AUDIT_TYPE = {
  PAID: 1,
  UNPAID: 2,
  REJECT: 3,
};

class MerchantOrder {
  async count(params = {}) {
    return http.get("merchant_order/summary", { params });
  }

  async all() {
    return merchantOrder.find({ limit: 99 });
  }

  async find(params) {
    params = {
      page: 1,
      limit: 10,
      ...params,
    };
    return http.get("merchant_order", { params });
  }

  async get(id) {
    return http.get(`merchant_order/${id}`);
  }

  async create(params) {
    return http.post("merchant_order", params);
  }

  async update(id, data) {
    return http.put(`merchant_order/${id}`, data);
  }

  async delete(id) {
    return http.delete(`merchant_order/${id}`);
  }
}

const merchantOrder = new MerchantOrder();

export default merchantOrder;
