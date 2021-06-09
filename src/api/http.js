/**
 * AXIOS 封裝
 */
import axios from "axios";
import store from "../store";
import ToastService from "../service/ToastService";
import { setupCache } from "axios-cache-adapter";
import moment from "moment";

const cache = setupCache({ maxAge: 0 });

const config = {
  baseURL: `${process.env.VUE_APP_API_HOST}/api`,
  timeout: 6000,
  headers: {
    "Content-Type": "application/json",
  },
  adapter: cache.adapter,
};

const http = axios.create(config);
http.interceptors.request.use(
  function(config) {
    // 有登入就塞 token
    const token = store.state.auth.token;
    if (token) {
      config.headers = {
        ...config.headers,
        Authorization: `bearer ${token}`,
      };
    }

    // 如果 query string 中帶有 Date 型態的值就轉成 unix timestamp
    for (const key in config.params) {
      if (
        config.params[key] instanceof Date ||
        moment.isMoment(config.params[key])
      ) {
        config.params[key] = moment(config.params[key]).unix();
      }
    }

    return config;
  },
  function(error) {
    // Do something with request error
    return Promise.reject(error);
  }
);
http.interceptors.response.use(
  function fulfilled(response) {
    return response;
  },
  function rejected(error) {
    // 處理 500
    if (error.response.status >= 500) {
      const toast = {
        summary: "系統錯誤",
      };
      if (process.env.NODE_ENV !== "production") {
        toast.detail = error.response.data.message;
      }

      ToastService.error(toast);
    }
    return Promise.reject(error);
  }
);

export default http;
