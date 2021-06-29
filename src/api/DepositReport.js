import http from "./http"

class DepositReport {
  async count(params = {}) {
    return http.get("report/deposit_report/summary", { params })
  }

  async all() {
    return deposit_report.find({ limit: 99 })
  }

  async find(params) {
    params = {
      page: 1,
      limit: 10,
      ...params,
    }
    return http.get("report/deposit_report", { params })
  }

  async export(params) {
    return http.get("report/deposit_report/export", {
      params,
      responseType: "blob",
    })
  }
}

const deposit_report = new DepositReport()

export default deposit_report
