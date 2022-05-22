import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate";
import instance from "../axios";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {},
    isAuthentificated: false,
    articles: [],
  },
  getters: {
    getArticleById: (state) => (id) => {
      return state.articles.find(article => article.id === id)
    },
  },
  mutations: {
    USER_INFO(state, user) {
      state.user = user;
    },
    USER_CONNECT(state) {
      state.isAuthentificated = true;
    },
    USER_DISCONNECT(state) {
      state.isAuthentificated = false
      state.user = ""
    },
    FETCH_ARTICLES(state, articles) {
      state.articles = articles
    },
  },
  actions: {
    fetchUser({ commit }) {
      let user = JSON.parse(localStorage.getItem("user"));
      let id = user.userID
      console.log("fetchUser");
      instance.get(`user/${id}`)
        .then((user) => {
          console.log("store user", user.data);
          commit("USER_INFO", user.data);
        })
        .catch((e) => {
          console.log(e);
          // this.message = e.response.data.error;
          // this.toggleModale();
          localStorage.clear();
          this.$store.commit("USER_DISCONNECT");
          this.$router.push({ name: "Connect" });
        });
    },

    getUser ({ commit }, user ) {   
      commit("USER_INFO", user); 
    },
    
    // Récupération des articles
    fetchArticles({ commit }) {
      instance.get(`article`)
        .then((response) => {
          commit("FETCH_ARTICLES", response.data); 
        })
        .catch((error) => {
          // console.log("error fetchArticles store", error)
          console.log("error fetchArticles store", error.response.data)
        });
    },

    // Récupération des données d'un article
    fetchArticle({commit}, id){
      console.log(id);
      console.log(commit);
      instance
        .get(`article/${id}`)
        .then((article) => {
          commit("FETCH_ARTICLE", article.data.articleFound); 
          console.log(article.data.articleFound);
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
  modules: {},
  plugins: [createPersistedState({
    key: ['isAuthentificated'],
    paths: ['isAuthentificated'],
    storage: window.localStorage,
  })]
})