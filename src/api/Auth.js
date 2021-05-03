import { $axios } from ".";
import store from "../store";
import router from "../router";

class Auth {
  async signin({ signin_id, password }) {
    return $axios
      .post("auth/signin", { signin_id, password })
      .then(({ data: token }) => {
        store.dispatch("auth/signin", token);
      });
  }

  logout() {
    store.dispatch("auth/logout");
    router.push({ name: "signin" });
  }

  async change_password({ old_password, new_password }) {
    return $axios
      .post("auth/reset-password", { old_password, new_password })
      .then(({ data: token }) => {
        store.dispatch("auth/signin", token);
      });
  }
}

export default new Auth();
