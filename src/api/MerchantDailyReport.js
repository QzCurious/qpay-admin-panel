import http from "./http"

class MerchantDailyReport {
  async all() {
    return http.get("merchantDailyReport")
  }

  async get({ id }) {
    return http.get(`merchantDailyReport/${id}`)
  }

  async create({ bank_name, country, status, transfer }) {
    return http.post("merchantDailyReport", {
      bank_name,
      country,
      status,
      transfer,
    })
  }

  async modify({ bank_name, country, status, transfer }) {
    return http.update({ bank_name, country, status, transfer })
  }
}

export default new MerchantDailyReport()
