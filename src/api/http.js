/**
 * AXIOS 封裝
 *
 */
import axios from "axios";
import { throwErr } from "./ErrorHandle";

const BASE_URL = "/test";

let token = localStorage.getItem("api_token")
  ? localStorage.getItem("api_token")
  : "";

console.log("api_token::::old", token, "        0");
const config = {
  baseURL: BASE_URL,
  timeout: 6000,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
};

const instance = axios.create(config);

export const http = {
  async get(url) {
    try {
      let res = await instance.get(url);
      return res;
    } catch (err) {
      return throwErr(err.response);
    }
  },
  async post(url, params) {
    if (token) {
      instance.defaults.headers.common["Authorization"] =
        "Bearer " + localStorage.getItem("api_token");
    }
    try {
      let res = await instance.post(url, params);
      return res;
    } catch (err) {
      return throwErr(err.response);
    }
  },
  async put(url, params) {
    if (token) {
      instance.defaults.headers.common["Authorization"] =
        "Bearer " + localStorage.getItem("api_token");
    }
    try {
      let res = await instance.put(url, params);
      return res;
    } catch (err) {
      return throwErr(err.response);
    }
  },
};
