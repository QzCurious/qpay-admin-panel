import http from "./http"

class MerchantChannelReport {
  async count(params = {}) {
    return http.get("report/merchant_channel_report/summary", { params })
  }

  async find(params) {
    params = {
      page: 1,
      limit: 10,
      ...params,
    }
    return http.get("report/merchant_channel_report", { params })
  }

  async export(params) {
    return http.get("report/merchant_channel_report/export", {
      params,
      responseType: "blob",
    })
  }
}

const merchant_channel_report = new MerchantChannelReport()

export default merchant_channel_report
