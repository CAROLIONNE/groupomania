<template>
  <div id="post">
    <div class="header">
      <h1>{{ intro }}</h1>
      <button id="btn_new_article" v-on:click="createArticle">
        Créer une publication
      </button>
      <h2 id="fil">Fil d'actualité</h2>
    </div>
    <div id="container" v-if="$store.state.articles">
      <div id="no_content" v-if="!isEmpty">
        Pas encore d'article pour l'instant 🧐
      </div>
      <div
        id="article"
        v-for="article in articles"
        :key="article.id"
      >
        <BaseArticle :article="article" />
      </div>
      <Modale :show="show" :toggleModale="toggleModale" :message="message" />
    </div>
    <i
      class="fa-solid fa-arrow-up-long"
      v-if="$store.state.articles.length >= 2"
      @click="scrollToTop()"
    ></i>
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
      intro: "Bienvenue sur votre réseau social d'entreprise",
      show: false,
      message: null,
    };
  },

  created() {
    this.$store.dispatch("fetchArticles");
  },
  computed: {
    articles() {
      return this.$store.state.articles
    },
    isEmpty() {
      return this.$store.state.articles.length
    }
  },
  methods: {
    scrollToTop() {
      window.scrollTo(0, 0);
    },
    createArticle() {
      this.$router.push({ name: "NewArticle" });
    },
    toggleModale() {
      this.show = !this.show;
    },
  },
};
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
#no_content {
  padding: 0.5em;
  font-size: 20px;
  border: 2px dashed grey;
  margin: 1em;
  margin-right: 1em;
  margin-left: 1em;
  margin-left: auto;
  margin-right: auto;
  width: 60%;
}
#article {
  margin-left: auto;
  margin-right: auto;
  /* height: 505px; */
  width: 70%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1em;
  border: 1px solid var(--color-secondary);
  margin-bottom: 3em;
  border-radius: 2em;
  box-shadow: 0.3em 0.3em 8px #a8a7a7;
  background: var(--gradiant);
}
.fa-arrow-up-long {
  border: var(--color-secondary) 1px solid;
  padding: 0.2em;
  border-radius: 25%;
  cursor: pointer;
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
  color: var(--color-error);
  padding: 0.5em;
}
</style>
