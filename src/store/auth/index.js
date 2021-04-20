export const store = {
  namespaced: true,
  state: () => ({
    token: null
  }),
  getters: {
    jwt(state) {
      return JSON.parse(atob(state.token.split(".")[1]));
    }
  },
  actions: {
    signin({ commit }, token) {
      commit("set", token);
      window.localStorage.setItem("token", token);
    }
  },
  mutations: {
    set(state, token) {
      state.token = token;
    }
  }
};
