import http from "./http"

class MerchantChannel {
  async count(params = {}) {
    return http.get("merchant_channel/summary", { params })
  }

  async all() {
    return merchant_channel.find({ limit: 99 })
  }

  async find(params) {
    params = {
      page: 1,
      limit: 10,
      ...params,
    }
    return http.get("merchant_channel", { params })
  }

  async get(id) {
    return http.get(`merchant_channel/${id}`)
  }

  async create(params) {
    return http.post("merchant_channel", params)
  }

  async update(id, data) {
    return http.put(`merchant_channel/${id}`, data)
  }

  async delete(id) {
    return http.delete(`merchant_channel/${id}`)
  }
}

const merchant_channel = new MerchantChannel()

export default merchant_channel
