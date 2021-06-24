import Role from "../../api/Role"

export const store = {
  namespaced: true,
  state: () => ({
    token: null,
    available_auth: [],
    allow_auth: [],
  }),
  getters: {
    jwt(state) {
      return JSON.parse(atob(state.token.split(".")[1]))
    },
    isAuthenticated(state) {
      return Boolean(state.token)
    },
    signin_id(state, { jwt }) {
      return jwt.signin_id
    },
    merchant_type(state, getters) {
      return getters["jwt"].merchant_type
    },
    MERCHANT_TYPE() {
      return {
        MERCHANT: 1,
        AGENT: 2,
        SYSTEM: 3,
      }
    },
  },
  actions: {
    set_token({ commit }, token) {
      commit("set_token", token)
    },
    async signin({ commit, getters }, token) {
      commit("set_token", token)
      const res = await Role.get(getters["jwt"].role_id)
      commit("set_available_auth", res.data.available_auth)
      commit("set_allow_auth", res.data.allow_auth)
    },
    logout({ commit }) {
      commit("clear")
    },
  },
  mutations: {
    set_token(state, token) {
      state.token = token
    },
    set_allow_auth(state, allow_auth) {
      state.allow_auth = allow_auth
    },
    set_available_auth(state, available_auth) {
      state.available_auth = available_auth
    },
    clear(state) {
      state.token = null
      state.available_auth = []
      state.allow_auth = []
    },
  },
}
