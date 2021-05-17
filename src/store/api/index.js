export const store = {
  namespaced: true,
  state: () => ({
    role_list: [],
    merchant_list: []
  }),
  getters: {
    role_name: state => role_id => {
      return state.role_list.find(item => item.id === role_id).name;
    },
    merchant_name: state => merchant_id => {
      return state.merchant_list.find(item => item.id === merchant_id).name;
    }
  },
  actions: {
    set_role_list({ commit }, data) {
      commit("set_role_list", data);
    },
    set_merchant_list({ commit }, data) {
      commit("set_merchant_list", data);
    }
  },
  mutations: {
    set_role_list(state, data) {
      state.role_list = data;
    },
    set_merchant_list(state, data) {
      state.merchant_list = data;
    }
  }
};
