import http from "./http"

class CardSms {
  async count(params = {}) {
    return http.get("card/sms/summary", { params })
  }

  async find(params) {
    params = {
      page: 1,
      limit: 10,
      ...params,
    }
    return http.get("card/sms", { params })
  }

  async get(id) {
    return http.get(`card/sms/${id}`)
  }

  async create(params) {
    return http.post("card/sms", params)
  }

  async update(id, data) {
    return http.put(`card/sms/${id}`, data)
  }

  async delete(id) {
    return http.delete(`card/sms/${id}`)
  }
}

const cardSms = new CardSms()

export default cardSms
