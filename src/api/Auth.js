import http from "./http";
import store from "../store";
import router from "../router";
import ToastService from "../service/ToastService";

class Auth {
  async signin({ username, password }) {
    return http
      .post("auth/signin", { username, password })
      .then(res => {
        store.dispatch("auth/signin", res.data.access_token);
        return res;
      })
      .catch(err => {
        ToastService.add({
          severity: "error",
          summary: err.response.data.message,
          life: 1800
        });
        return err.response;
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
