import axios from "axios";
import store from "../store";
import router from "../router";
import ToastService from "../service/ToastService";
import i18n from "../i18n";

const http = axios.create({
  baseURL: process.env.VUE_APP_API_HOST,
  timeout: 6000
});
http.interceptors.request.use(function(config) {
  const token = store.state.auth.token;
  config.headers = {
    ...config.headers,
    Authorization: `bearer ${token}`
  };
  return config;
});

class Auth {
  async signin({ signin_id, signin_password }) {
    // 一定會拿到 twofa_flag = 0 的 token，沒辦法拿來 call api
    return http
      .post("user/signin", { signin_id, signin_password })
      .then(res => {
        store.dispatch("auth/signin", res.data.access_token);
        return res;
      })
      .catch(err => {
        if (err.response.status === 401) {
          ToastService.error({
            detail: i18n.global.t(`api.error.${err.response.data.code}`)
          });
        }
        throw err;
      });
  }

  async get_2fa_qrcode() {
    return http.get("api/auth/2fa", { withCredentials: true , responseType: 'blob'});
  }

  async trigger_bind_2fa() {
    return http.post("api/auth/2fa", null, { withCredentials: true });
  }

  async singin_2fa(code) {
    return http.post("api/auth/2fa/verify", { code }).then(res => {
      store.dispatch("auth/signin", res.data.access_token);
      return res;
    });
  }

  logout() {
    store.dispatch("auth/logout");
    router.push({ name: "signin" });
  }

  async change_password({ old_password, new_password }) {
    return http.put("user/signin_password", {
      signin_password: old_password,
      signin_password_new: new_password
    });
  }

  async change_payment_password({ old_password, new_password }) {
    return http.put("user/payment_password", {
      payment_password: old_password,
      payment_password_new: new_password
    });
  }
}

export default new Auth();
