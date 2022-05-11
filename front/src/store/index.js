import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: false,
  },
  getters: {
  },
  mutations: {
    USER_CONNECT(state) {
      state.user = true
    },
    USER_DISCONNECT(state) {
      state.user = false
    }
  },
  actions: {
      
  },
  modules: {
  },
  plugins: [createPersistedState({
    storage: window.localStorage,
  })]
})
