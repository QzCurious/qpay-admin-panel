import http from "./http";
import store from "../store";

class Merchant {
  async all() {
    return merchant.find({ limit: 99 });
  }

  async find(params = {}) {
    params = {
      page: 1,
      limit: 10,
      ...params
    };
    return http.get("merchant", { params }).then(res => {
      store.dispatch("api/set_merchant_list", res.data.data);
    });
  }
}

const merchant = new Merchant();

export default merchant;
