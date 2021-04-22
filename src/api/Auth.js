import { $axios } from ".";
import store from "../store";
import router from "../router";

class Auth {
  async signin({ username, password }) {
    return $axios
      .post("auth/signin", { username, password })
      .then(({ data: token }) => {
        store.dispatch("auth/signin", token);
      });
  }

  logout() {
    store.dispatch("auth/logout");
    router.push({ name: "signin" });
  }
}

export default new Auth();
