import { VuexPersistence } from "vuex-persist";

export const store = {
  namespaced: true,
  state: () => ({
    token: null
  }),
  getters: {
    jwt(state) {
      return JSON.parse(atob(state.token.split(".")[1]));
    },
    isAuthenticated(state) {
      return Boolean(state.token);
    }
  },
  actions: {
    signin({ commit }, token) {
      commit("set", token);
    }
  },
  mutations: {
    set(state, token) {
      state.token = token;
    }
  }
};

const vuexLocal = new VuexPersistence({ storage: window.localStorage });
export const plugins = [vuexLocal.plugin];
