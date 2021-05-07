import http from "./http";
import store from "../store";
import router from "../router";
import ToastService from "../service/ToastService";

class Auth {
  async signin({ signin_id, password }) {
    return http
      .post("auth/signin", { signin_id, password })
      .then(res => {
        store.dispatch("auth/signin", res.data);
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
    return http
      .post("auth/reset-password", { old_password, new_password })
      .then((res) => {
        store.dispatch("auth/signin", res.data);
        return res
      });
  }
}

export default new Auth();
