<template>
  <div id="post">
    <div class="header">
      <h1>{{ intro }}</h1>
      <button id="btn_new_article" v-on:click="createArticle">
        Créer une publication
      </button>
      <h2 id="fil">Fil d'actualité</h2>
    </div>
    <div id="container">
      <div id="article" v-for="(article, index) in articles" :key="article.id">
        <BaseArticle :article="article" :index="index"/>
      </div>
      <Modale :show="show" :toggleModale="toggleModale" :message="message"/>
    </div>
  </div>
</template>

<script>
import BaseArticle from "../components/BaseArticle.vue";
import Modale from "../components/ModaleBox.vue";
export default {
  name: "FilActu",
  components: { BaseArticle, Modale},
  data() {
    return {
      articles: null,
      intro: "Bienvenue sur le réseau social d'entreprise de Groupomania",
      show: false,
      message: null,
    };
  },

  created() {
    let user = JSON.parse(localStorage.getItem("user"));
    let token = user.token;
     this.axios
      .get(`http://localhost:3000/api/article`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((allArticles) => {
        this.articles = allArticles.data;

      })
      .catch((e) => {
        // modale ne s'affiche pas
        this.message = e.response.data.error;
        this.toggleModale();
        localStorage.clear();
        this.$store.commit("USER_DISCONNECT");
        this.$router.push({ name: "Connect" });
      });
  },
  methods: {
    createArticle() {
      this.$router.push({ name: "NewArticle" });
    },
    toggleModale() {
      this.show = !this.show
    },
  }
}
</script>

<style scoped>
#post {
  text-align: center;
  margin-bottom: 5em;
}
h1,
h2 {
  font-weight: bold;
  text-align: center;
  padding: 0.4em;
}
#fil {
  margin: 0.5em;
}
#article {
  margin-left: auto;
  margin-right: auto;
  width: 70%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1em;
  border: 1px solid black;
  margin-bottom: 3em;
  border-radius: 2em;
  box-shadow: 0.3em 0.3em 8px #a8a7a7;
  background: rgb(144, 140, 153);
  background: linear-gradient(
    309deg,
    rgba(144, 140, 153, 0.510224158022584) 0%,
    rgba(208, 210, 237, 0.5858544101234244) 29%
  );
}

#container_update {
  padding: 0.5em;
  margin: 0.5em;
}
#container_update > label,
#container_update > input {
  padding: 0.2em;
  margin: 0.2em;
}
/* #btn_new_article {
  margin: 1em;
  width: 25%;
  appearance: none;
  background-color: transparent;
  border: 2px solid #1a1a1a;
  border-radius: 15px;
  box-sizing: border-box;
  color: #3b3b3b;
  cursor: pointer;
  display: inline-block;
  font-family: Roobert, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica,
    Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  font-size: 16px;
  font-weight: 600;
  line-height: normal;
  margin: 0;
  min-height: 60px;
  min-width: 0;
  outline: none;
  padding: 16px 24px;
  text-align: center;
  text-decoration: none;
  transition: all 300ms cubic-bezier(0.23, 1, 0.32, 1);
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  will-change: transform;
}
#btn_new_article:disabled {
  pointer-events: none;
}
#btn_new_article:hover {
  color: #fff;
  background-color: #1a1a1a;
  box-shadow: rgba(0, 0, 0, 0.25) 0 8px 15px;
  transform: translateY(-2px);
}
#btn_new_article:active {
  box-shadow: none;
  transform: translateY(0);
} */
.error {
  color: red;
  padding: 0.5em;
}
</style>
