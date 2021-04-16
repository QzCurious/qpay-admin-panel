import axios from "axios";

class OperationLogApi {
  async get() {
    const api = new URL("operation-log", process.env.VUE_APP_API_HOST);
    return axios.get(api);
  }
}

export default new OperationLogApi();
