import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate";
const axios = require('axios')
Vue.use(Vuex)

const defaultOptions = {
  baseURL: 'http://localhost:3000/api/',
  headers: {
    'Content-Type': 'application/json',
  },
};

let instance = axios.create(defaultOptions);

let user = localStorage.getItem('user')
if (!user) {
  user = {
    token: ''
  }
} else {
  try {
    user = JSON.parse(user)
    instance.defaults.headers.common.Authorization = user.token
  } catch (err) {
    user = {
      token: ''
    }
  }
}

export default new Vuex.Store({
  state: {
    // user: '',
    token: '',
    userConnect: false,
    articles: {},
    // article: {},
  },
  getters: {
  },
  mutations: {
    GET_TOKEN(state, token) {
      state.token = token;
    },
    // USER_INFO(state, user) {
    //   state.user = user;
    // },
    USER_CONNECT(state) {
      state.userConnect = true;
    },
    USER_DISCONNECT(state) {
      state.userConnect = false
    },
    FETCH_ARTICLES(state, articles) {
      state.articles = articles
    },
    // FETCH_ARTICLE(state, article) {
    //   state.article = article
    // },
    UPDATE_ARTICLE(state, article) {
      state.article = article
    }
  },
  actions: {
    // let user = JSON.parse(localStorage.getItem("user"));
    // let token = user.token;
    // Récupération des articles
    // fetchUser({ commit }, id ) {     
    //   axios
    //   .get(`http://localhost:3000/api/user/${id}`, {
    //     headers: {
    //       Authorization: "Bearer " + user.token,
    //     },
    //   })
    //     .then((response) => {
    //       commit("USER_INFO", response.data); 
    //       console.log("fetchUser", response.data);
    //     })
    //     .catch((error) => {
    //       console.log(error)
    //     });
    // },
    // Récupération des articles
    fetchArticles({ commit }) {      
      axios
      .get(`http://localhost:3000/api/article`, {
        headers: {
          Authorization: "Bearer " + user.token,
        },
      })
        .then((response) => {
          commit("FETCH_ARTICLES", response.data); 
        })
        .catch((error) => {
          console.log(error)
        });
    },
    // // Récupération des données d'un l'article
    // fetchArticle({commit}, id){
    //   console.log(id);
    //   axios
    //     .get(`http://localhost:3000/api/article/${id}`, {
    //       headers: {
    //         Authorization: "Bearer " + user.token,
    //       },
    //     })
    //     .then((article) => {
    //       commit("FETCH_ARTICLE", article.data.articleFound); 
    //       console.log(article.data.articleFound);
    //     })
    //     .catch((e) => {
    //       console.log(e);
    //     });
    // },
    // Mettre a jour article
    updateArticle({commit}, id){
      axios
        .get(`http://localhost:3000/api/article/${id}`, {
          headers: {
            Authorization: "Bearer " + user.token,
          },
        })
        .then((article) => {
          commit("UPDATE_ARTICLE", article.data.articleFound); 
          console.log(article.data.articleFound);
        })
        .catch((e) => {
          this.errors = e;
          console.log(e);
        });
    }
  },
  modules: {
  },
  plugins: [createPersistedState({
    key: ['userConnect', 'token'],
    paths: ['userConnect', 'token'],
    storage: window.localStorage,
  })]
})


// let user = JSON.parse(localStorage.getItem("user"));
// let token = user.token;
//  this.axios
//   .get(`http://localhost:3000/api/article`, {
//     headers: {
//       Authorization: "Bearer " + token,
//     },
//   })
//   .then((allArticles) => {
//     this.articles = allArticles.data;

//   })
//   .catch((e) => {
//     // modale ne s'affiche pas
//     this.message = e.response.data.error;
//     this.toggleModale();
//     localStorage.clear();
//     this.$store.commit("USER_DISCONNECT");
//     this.$router.push({ name: "Connect" });
//   });