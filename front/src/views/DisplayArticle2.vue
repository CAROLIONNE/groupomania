<template>
  <div>
      <h1>{{ intro }}</h1>
    <div id="container">
      <div id="article">
        <BaseArticle :article="article"/>
      </div>
    </div>
  </div>
</template>

<script>
import BaseArticle from "../components/BaseArticle.vue";

export default {
  name: "DisplayArticle2",
  components: { BaseArticle },
  data() {
    return {
      intro: "Bienvenue sur le réseau social d'entreprise de Groupomania",
      article: {},
      commentaires: {},
      message: null
    };
  },
  mounted() {
    let user = JSON.parse(localStorage.getItem("user"));
    let token = user.token;
    // let $id = this.$route.params.id;
    // Récupération des données de l'article
    this.axios
      .get(`http://localhost:3000/api/article/${this.$route.params.id}`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((article) => {
        (this.article= article.data.articleFound)
        console.log("article fetch");
      })
      .catch((e) => {
        this.errors = e;
        console.log(e);
      });
    // Recupération des commentaires de l'article
    this.axios
      .get(`http://localhost:3000/api/comment/${this.$route.params.id}`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((allCommentaires) => {
        this.commentaires = allCommentaires.data;
      })
      .catch((e) => {
        console.log("get comment", e);
      });
  },
}
</script>

<style scoped>
h1 {
    text-align: center;
    padding: 0.5em;
}
#article {
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1em;
  border: 1px solid black;
  margin: 3em;
  margin-bottom: 6em;
  border-radius: 4em;
  box-shadow: 0.3em 0.3em 8px #a8a7a7;
  background: rgb(144, 140, 153);
  background: linear-gradient(
    309deg,
    rgba(144, 140, 153, 0.510224158022584) 0%,
    rgba(208, 210, 237, 0.5858544101234244) 29%
  );
}

</style>
