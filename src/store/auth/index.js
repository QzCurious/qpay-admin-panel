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
    },
    signin_id(state, { jwt }) {
      return jwt.signin_id;
    }
  },
  actions: {
    signin({ commit }, token) {
      commit("set", token);
    },
    logout({ commit }) {
      commit("clear");
    }
  },
  mutations: {
    set(state, token) {
      state.token = token;
    },
    clear(state) {
      state.token = null;
    }
  }
};
