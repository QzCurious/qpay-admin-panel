import http from "./http";
import store from "../store";

class Channel {
  async count(params = { status: null }) {
    return http.get("channel/summary", { params });
  }

  async all() {
    return channel.find(
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
    return http.get("channel", { params, ...config }).then(res => {
      store.dispatch("api/set_channel_list", res.data.data);
      return res;
    });
  }

  async create(data) {
    return http.post("channel", data);
  }

  async update(id, data) {
    return http.put(`channel/${id}`, data);
  }

  async delete(id, data) {
    return http.delete(`channel/${id}`, data);
  }
}

const channel = new Channel();
export default channel;
