import Vue from "vue";
import Vuex from "vuex";
import router from "../router";
import createPersistedState from "vuex-persistedstate";
import instance from "../axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: {},
    isAuthentificated: false,
    articles: [],
    commentaires: [],
  },
  getters: {
    getArticleById: (state) => (id) => {
      return state.articles.find((article) => article.id === id);
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
      state.isAuthentificated = false;
      state.user = null;
      state.articles = null;
    },
    FETCH_ARTICLES(state, articles) {
      state.articles = articles;
    },
    FETCH_COMMENTAIRES(state, commentaires) {
      state.commentaires = commentaires;
    },
  },
  actions: {
    // Deconnexion
    logOut({ commit }) {
      commit("USER_DISCONNECT");
      localStorage.clear();
      return router.push("/");
    },

    // tokenValid({ commit }) {
    //   let token = localStorage.getItem("token");
    //   if (token) {
    //     instance
    //       .get(`user/auth`)
    //       .then((tokenValid) => {
    //         console.log("isauthentificated2", tokenValid);
    //         commit("USER_CONNECT");
    //       })
    //       .catch((err) => {
    //         commit("USER_DISCONNECT");
    //         console.log(err);
    //       });
    //   }
    // },

    fetchUser({ commit, dispatch }) {
      let user = JSON.parse(localStorage.getItem("user"));
      let id = user.userID;
      instance
        .get(`user/${id}`)
        .then((user) => {
          console.log("store user", user.data);
          commit("USER_INFO", user.data);
        })
        .catch((e) => {
          if (e.response.status === 401) {
            dispatch("logOut");
          }
        });
    },

    // getUser({ commit }, user) {
    //   commit("USER_INFO", user);
    // },

    // Récupération des articles
    fetchArticles({ commit, dispatch }) {
      instance
        .get(`article`)
        .then((response) => {
          commit("FETCH_ARTICLES", response.data);
        })
        .catch((error) => {
          if (error.response.status === 401) {
            dispatch("logOut");
          }
          console.log("error fetchArticles store", error.response.data);
        });
    },

    // Récupération des données d'un article
    fetchArticle({ commit }, id) {
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
    // Récupération des commentaires
    fetchCommentaires({ commit }, id) {
      instance
        .get(`comment/${id}`)
        .then((response) => {
          commit("FETCH_COMMENTAIRES", response.data);
        })
        .catch((error) => {
          console.log("error fetchArticles store", error.response.data);
        });
    },
  },
  modules: {},
  plugins: [
    createPersistedState({
      key: ["isAuthentificated"],
      paths: ["isAuthentificated"],
      storage: window.localStorage,
    }),
  ],
});
