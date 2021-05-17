export const store = {
  namespaced: true,
  state: () => ({ role_list: [] }),
  getters: {
    role_name: state => role_id => {
      return state.role_list.find(item => item.id === role_id).name;
    }
  },
  actions: {
    set_role_list({ commit }, data) {
      commit("set_role_list", data);
    }
  },
  mutations: {
    set_role_list(state, data) {
      state.role_list = data;
    }
  }
};
