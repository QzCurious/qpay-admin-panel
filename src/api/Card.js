import http from "./http";

class Card {
  async count(params = {}) {
    return http.get("card/summary", { params });
  }

  async all() {
    return card.find({ limit: 99 });
  }

  async find(params) {
    params = {
      page: 1,
      limit: 10,
      ...params
    };
    return http.get("card", { params });
  }

  async get(id) {
    return http.get(`card/${id}`);
  }

  async create(params) {
    return http.post("card", params);
  }

  async update(id, data) {
    return http.put(`card/${id}`, data);
  }

  async delete(id) {
    return http.delete(`card/${id}`);
  }
}

const card = new Card();

export default card;
