import http from "./http";

class OperationLogApi {
  async get() {
    return http.get("operation-log");
  }
}

export default new OperationLogApi();
