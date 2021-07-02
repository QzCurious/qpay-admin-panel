/**
 * AXIOS 封裝
 */
import axios from "axios"
import store from "../store"
import { setupCache } from "axios-cache-adapter"
import moment from "moment"
import { transform_4xx_error } from "./ErrorHandler"
import router from "../router"
import auth from "../api/Auth"

export const CACHE_MAX_AGE = 5 * 60 * 1000

const cache = setupCache({
  maxAge: 0, // 預設不 cache
})

const config = {
  baseURL: `${process.env.VUE_APP_API_HOST}/api`,
  timeout: 6000,
  headers: {
    "Content-Type": "application/json",
  },
  adapter: cache.adapter,
}

const http = axios.create(config)
http.interceptors.request.use(
  function(config) {
    // 有登入就塞 token
    const token = store.state.auth.token
    if (token) {
      config.headers = {
        ...config.headers,
        Authorization: `bearer ${token}`,
      }
    }

    // 如果 jwt 過期就自動登出並跳轉登入
    const exp = store.getters["auth/jwt"]?.exp
    if (exp && exp < Date.now() / 1000) {
      auth.logout()
      router.push({ name: "signin" })
    }

    // 如果 query string 中帶有 Date 型態的值就轉成 unix timestamp
    for (const key in config.params) {
      if (
        config.params[key] instanceof Date ||
        moment.isMoment(config.params[key])
      ) {
        config.params[key] = moment(config.params[key]).unix()
      }
    }

    // 如果 query string 中帶有空字串就拿掉
    for (const key in config.params) {
      if (config.params[key] === "") {
        config.params[key] = undefined
      }
    }

    return config
  },
  function(error) {
    // Do something with request error
    return Promise.reject(error)
  }
)

http.interceptors.response.use(null, transform_4xx_error)

export default http
