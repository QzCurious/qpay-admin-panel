import i18n from "../../i18n";
import router from "../../router";

export const store = {
  namespaced: true,
  state: () => ({
    locale: i18n.global.fallbackLocale
  }),
  actions: {
    set({ commit }, locale) {
      i18n.global.locale = locale;
      router.push(router.resolve({ params: { locale } }));
      commit("set", locale);
    }
  },
  mutations: {
    set(state, locale) {
      state.locale = locale;
    }
  }
};
