import http from "./http"
import store from "../store"
import router from "../router"

class Auth {
  async signin({ signin_id, signin_password }) {
    // 一定會拿到 twofa_flag = 0 的 token，沒辦法拿來 call api
    const res = await http.post(
      "/user/signin",
      { signin_id, signin_password },
      { baseURL: process.env.VUE_APP_API_HOST }
    )
    store.dispatch("auth/signin", res.data.access_token)
    return res
  }

  async get_2fa_qrcode() {
    return http.get("auth/2fa", { withCredentials: true, responseType: "blob" })
  }

  async trigger_bind_2fa() {
    return http.post("auth/2fa", null, { withCredentials: true })
  }

  async singin_2fa(code) {
    const res = await http.post("auth/2fa/verify", { code })
    store.dispatch("auth/signin", res.data.access_token)
    return res
  }

  logout() {
    store.dispatch("auth/logout")
    router.push({ name: "signin" })
  }

  async change_password({ old_password, new_password }) {
    return http.put("user/signin_password", {
      signin_password: old_password,
      signin_password_new: new_password,
    })
  }

  async change_payment_password({ old_password, new_password }) {
    return http.put("api/user/payment_password", {
      payment_password: old_password,
      payment_password_new: new_password,
    })
  }
}

export default new Auth()
