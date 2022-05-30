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
    id: "",
    isAdmin: Boolean,
  },
  getters: {
    getArticleById: (state) => (id) => {
      return state.articles.find((article) => article.id === id);
    },
    getCommentsById: (state) => (id) => {
      return state.commentaires.find((commentaire) => commentaire.articleId === id);
    },
  },
  mutations: {
    USER_ID(state, id) {
      state.id = id;
    },
    USER_ROLE(state, isAdmin) {
      state.isAdmin = isAdmin;
    },
    USER_INFO(state, user) {
      state.user = user;
    },
    USER_CONNECT(state) {
      state.isAuthentificated = true;
    },
    USER_DISCONNECT(state) {
      state.isAuthentificated = false;
      state.user = null;
    },
    FETCH_ARTICLES(state, articles) {
      state.articles = articles;
    },
    FETCH_COMMENTAIRES(state, commentaires) {
      state.commentaires = commentaires;
    },
  },
  actions: {
  // Recupérer l'ID et le role de l'utilisateur
  getIdAndRole({ commit }) {
    // Requête API 
      instance.get(`user/me`)
      .then((res) => {
        // Mutation du state
        commit("USER_ID", res.data.userId);
        commit("USER_ROLE", res.data.isAdmin);
      })
      .catch((e) => {
        console.log(e)
      });
    },

    // Deconnexion 
    logOut({ commit }) {
      commit("USER_DISCONNECT");
      // Vide le localStorage
      localStorage.clear();
      // Redirection vers le login
      return router.push("/");
    },

    // Recupération des infos de l'utilisateur 
    fetchUser({ commit, dispatch }, id) {
      // Requête API
      instance.get(`user/${id}`)
        .then((user) => {
          // Mutation du state
          commit("USER_INFO", user.data);
        })
        .catch((e) => {
          // Deconnexion si token invalide
          if (e.response.status === 401) {
            dispatch("logOut");
          }
        });
    },

    // Mise a jour des infos utilisateur
    getUser({ commit }, user) {
      commit("USER_INFO", user);
    },

    // Récupération des articles
    fetchArticles({ commit, dispatch }) {
      // Requête API
      instance.get(`article`)
        .then((response) => {
          // Mutation du state
          commit("FETCH_ARTICLES", response.data);
        })
        .catch((error) => {
          // Deconnexion si token invalide
          if (error.response.status === 401) {
            dispatch("logOut");
          }
          if (error.response.status === 404) {
            commit("FETCH_ARTICLES", []);
          }
        });
    },

    // Récupération des données d'un article
    fetchArticle({ commit }, id) {
      // Requête API
      instance.get(`article/${id}`)
        .then((article) => {
          // Mutation du state
          commit("FETCH_ARTICLE", article.data.articleFound);
        })
        .catch((e) => {
          console.log(e);
        });
    },

    // Récupération des commentaires
    fetchCommentaires({ commit }, id) {
      // Requête API
      instance.get(`comment/${id}`)
        .then((response) => {
          // Mutation du state
          commit("FETCH_COMMENTAIRES", response.data);
        })
        .catch((error) => {
          if (error.response.status === 404) {
            commit("FETCH_COMMENTAIRES", []);
          }
        });
    },
  },
  plugins: [
    createPersistedState({
      key: ["isAuthentificated"],
      paths: ["isAuthentificated"],
      storage: window.localStorage,
    }),
  ],
});
