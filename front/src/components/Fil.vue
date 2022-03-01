<template>
  <div class="post">
    <div class="header">
      <h1>{{ intro }}</h1>
          <button class="createArticle">Créer une publication</button>
          <!-- redirection createArticle.vue -->
      <h2>Fil d'actualité</h2>
    </div>
    <div class="article" v-for="article in articles" :key="article.id">
      <!-- <router-link to="/article" id="ancre_article">{{ article.title }}</router-link> -->
      <a :href="article.url">{{ article.title }}</a>
      <img :src="article.image" />
      <p>{{ article.text }}</p>
      <button class="com" v-on:click="createcommentaire">Commenter</button>
      <div class="newCom"> 
        <input type="text">
      </div>
      <button class="coms" > Commentaires </button> 
       <h1 v-if="commentaires"> {{ Commentaires.titre }}</h1>
    <p class="error" v-if="errorMessage"></p>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: "FilActu",
  data() {
    return {
      intro: "Bienvenue sur le réseau social d'entreprise de Groupomania",
      articles: [
        { url: "www.google.com", title: "titre test", image: "../assets/icon-left-font-monochrome-white.svg", text: "texte test" },
        { url: "www.bug.com", title: "titre test2", image: "imagetest2.jpg", text: "texte test2" }
      ],
      commentaires: [],
      errors: [],
    };
  },
  // mounted() {
  //   try {
  //     const response = axios.get(`http://localhost:3000/api/comment`)
  //     console.log(response.data)
  //     this.commentaires = response.data
  //   } catch (e) {
  //     this.errors.push(e)
  //   }
  // },
  mounted() {
    axios.get(`http://localhost:3000/api/comment`)
    .then(response => {
      // JSON responses are automatically parsed.
      this.commentaires = response.data
    })
    .catch(e => {
      this.errors.push(e)
    })
  },
  methods:{
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: bold;
  text-align: center;
}
a {
  color: white;
}
.article {
  background: rgb(70, 70, 70);
  color: white;
  margin: 2em;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 1em;
  text-align: center;
    margin-left: auto;
  margin-right: auto;
  width: 75%;
}
img {
  max-width: 60%;
  height: 19em;
  margin-left: auto;
  margin-right: auto;
}
button {
  width: 15%;
  font-size: larger;
  margin-left:auto;
  margin-right: auto;
}
</style>
