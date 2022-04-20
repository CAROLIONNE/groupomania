<template>
  <div id="post">
    <div class="header">
      <h1>{{ intro }}</h1>
      <button class="btn_new_article" v-on:click="createArticle">
        Créer une publication
      </button>
      <h2 id="fil">Fil d'actualité</h2>
    </div>
    <div id="container">
      <div id="article" v-for="(article, index) in articles" :key="article.id">
        <BaseArticle :article="article" :index="index"/>
      </div>
      <Modale :show="show" :toggleModale="toggleModale"/>

    </div>
  </div>
</template>

<script>
import BaseArticle from "../components/BaseArticle.vue";
import Modale from "../components/ModaleBox.vue";

export default {
  name: "FilActu",
  components: { BaseArticle, Modale },
  data() {
    return {
      articles: null,
      intro: "Bienvenue sur le réseau social d'entreprise de Groupomania",
      errors: null,
      valid: null,
      show: false,
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
        console.log(e);
        this.errors = e;
      });
  },
  methods: {
    createArticle() {
      this.$router.push({ name: "NewArticle" });
    },
    toggleModale() {
      this.show = !this.show
    }
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
  border-radius: 20px;
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

.error {
  color: red;
  padding: 0.5em;
}
.valid {
  color: #003ba2;
  padding: 0.5em;
}
</style>
