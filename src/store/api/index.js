export const store = {
  namespaced: true,
  state: () => ({
    role_list: [],
    merchant_list: [],
    bank_list: [],
    channel_list: [],
    holder_list: [],
    card_list: [],
  }),
  getters: {
    role_name: (state) => (role_id) => {
      return state.role_list.find((item) => item.id === role_id).name
    },
    merchant_name: (state) => (merchant_id) => {
      return state.merchant_list.find((item) => item.id === merchant_id).name
    },
    bank_name: (state) => (bank_id) => {
      return state.bank_list.find((item) => item.id === bank_id).name
    },
    channel_name: (state) => (channel_id) => {
      return state.channel_list.find((item) => item.id === channel_id).name
    },
    holder_name: (state) => (holder_id) => {
      return state.holder_list.find((item) => item.id === holder_id).name
    },
  },
  actions: {
    set_role_list({ commit }, data) {
      commit("set_role_list", data)
    },
    set_merchant_list({ commit }, data) {
      commit("set_merchant_list", data)
    },
    set_bank_list({ commit }, data) {
      commit("set_bank_list", data)
    },
    set_channel_list({ commit }, data) {
      commit("set_channel_list", data)
    },
    set_holder_list({ commit }, data) {
      commit("set_holder_list", data)
    },
    set_card_list({ commit }, data) {
      commit("set_card_list", data)
    },
  },
  mutations: {
    set_role_list(state, data) {
      state.role_list = data
    },
    set_merchant_list(state, data) {
      state.merchant_list = data
    },
    set_bank_list(state, data) {
      state.bank_list = data
    },
    set_channel_list(state, data) {
      state.channel_list = data
    },
    set_holder_list(state, data) {
      state.holder_list = data
    },
    set_card_list(state, data) {
      state.card_list = data
    },
  },
}
