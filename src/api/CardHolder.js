import http from "./http"

class CardHolder {
  async all() {
    return http.get("cardHolders")
  }

  async retrieve({ id }) {
    return http.get(`cardHolders/${id}`)
  }

  async create({ name, phone, status }) {
    return http.post("cardHolders", { name, phone, status })
  }

  async update({ id, name, phone, status }) {
    return http.put(`cardHolders/${id}`, { name, phone, status })
  }

  async delete({ id }) {
    return http.delete(`cardHolders/${id}`)
  }
}

export default new CardHolder()
