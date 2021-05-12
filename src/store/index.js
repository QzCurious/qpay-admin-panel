import { VuexPersistence } from "vuex-persist";
import { createStore } from "vuex";
import * as auth from "./auth";
import * as locale from "./locale";

const vuexLocalStorage = new VuexPersistence({
  modules: ["auth"],
  storage: window.localStorage
});

export default createStore({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    auth: auth.store,
    locale: locale.store
  },
  plugins: [vuexLocalStorage.plugin]
});
