/**
 * AXIOS 封裝
 */
import axios from "axios";
import store from "../store";

const config = {
  baseURL: process.env.VUE_APP_API_HOST,
  timeout: 6000,
  headers: {
    "Content-Type": "application/json"
  }
};

const token = store.state["auth/token"];
if (token) {
  config.headers = {
    ...config.headers,
    Authorization: `bearer ${store.state["auth/token"]}`
  };
}

const http = axios.create(config);
http.interceptors.response.use(
  function fulfilled(response) {
    return response;
  },
  function rejected(error) {
    // 處理 500
    return Promise.reject(error);
  }
);

export default http;
