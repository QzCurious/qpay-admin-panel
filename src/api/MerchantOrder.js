import http from "./http";

class MerchantOrder {
  async all() {
    return http.get("merchantOrder");
  }
}

export default new MerchantOrder()
