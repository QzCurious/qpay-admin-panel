import { VuexPersistence } from "vuex-persist";
import { createStore } from "vuex";
import * as auth from "./auth";

const vuexLocalStorage = new VuexPersistence({
  modules: ["auth"],
  storage: window.localStorage
});

export default createStore({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    auth: auth.store
  },
  plugins: [vuexLocalStorage.plugin]
});
