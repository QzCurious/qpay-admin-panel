import http from "./http";

class TransactionRecord {
  async count(params = {}) {
    return http.get("transaction_record/summary", { params });
  }

  async find(params) {
    params = {
      page: 1,
      limit: 10,
      ...params,
    };
    return http.get("transaction_record", { params });
  }

  async update(id, data) {
    return http.put(`transaction_record/${id}`, data);
  }
}

const transaction_record = new TransactionRecord();

export default transaction_record;
