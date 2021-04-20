import { createStore } from "vuex";
import * as auth from "./auth";

export default createStore({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    auth: auth.store
  }
});
