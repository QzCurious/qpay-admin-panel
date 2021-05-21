import http from "./http";
import store from "../store";

class Holder {
  async count(params = { status: null }) {
    return http.get("holder/summary", { params });
  }

  async all() {
    return holder.find(
      { limit: 99 },
      { cache: { maxAge: 5 * 60 * 1000, exclude: { query: false } } }
    );
  }

  async find(params = {}, config) {
    params = {
      page: 1,
      limit: 10,
      ...params
    };
    return http.get("holder", { params, ...config }).then(res => {
      store.dispatch("api/set_holder_list", res.data.data);
      return res;
    });
  }

  async create(data) {
    return http.post("holder", data);
  }

  async update(id, data) {
    return http.put(`holder/${id}`, data);
  }

  async delete(id, data) {
    return http.delete(`holder/${id}`, data);
  }
}

const holder = new Holder();
export default holder;
