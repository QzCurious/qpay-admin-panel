import http from "./http"

class MerchantOrderStatistics {
  async count(params = {}) {
    return http.get("merchant_order/statistic/summary", { params })
  }

  async all() {
    return merchantOrderStatistics.find({ limit: 99 })
  }

  async find(params) {
    params = {
      page: 1,
      limit: 10,
      ...params,
    }
    return http.get("merchant_order/statistic", { params })
  }
}

const merchantOrderStatistics = new MerchantOrderStatistics()

export default merchantOrderStatistics
