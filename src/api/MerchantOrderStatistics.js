import http from "./http"

class MerchantOrderStatistics {
  async count(params = {}) {
    return http.get("merchant_order/statistics/summary", { params })
  }

  async find(params) {
    params = {
      page: 1,
      limit: 10,
      ...params,
    }
    return http.get("merchant_order/statistics", { params })
  }
}

const merchantOrderStatistics = new MerchantOrderStatistics()

export default merchantOrderStatistics
