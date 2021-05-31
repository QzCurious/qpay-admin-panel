import http from "./http";

class MerchantChannelParameter {
  async count(params = {}) {
    return http.get("merchant_channel/parameter/summary", { params });
  }

  async find(params) {
    params = {
      page: 1,
      limit: 10,
      ...params
    };
    return http.get("merchant_channel/parameter", { params });
  }

  async get(id) {
    return http.get(`merchant_channel/parameter/${id}`);
  }

  async update(id, data) {
    return http.put(`merchant_channel/parameter/${id}`, data);
  }
}

const merchant_channel_parameter = new MerchantChannelParameter();

export default merchant_channel_parameter;
