import { $axios } from ".";
import store from "../store";

class Auth {
  async signin({ username, password }) {
    return $axios
      .post("auth/signin", { username, password })
      .then(({ data: token }) => {
        store.dispatch("auth/signin", token);
      });
  }
}

export default new Auth();
