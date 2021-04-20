import axios from "axios";
import store from "../store";

const config = {
  baseURL: process.env.VUE_APP_API_HOST
};

const token = store.state["auth/token"];
if (token) {
  config.headers = { Authorization: `bearer ${store.state["auth/token"]}` };
}

export const $axios = axios.create(config);
