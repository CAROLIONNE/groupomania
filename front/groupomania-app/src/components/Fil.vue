<template>
  <div class="post">
    <div class="header">
      <h1>{{ intro }}</h1>
      <h2>Fil d'actualité</h2>
    </div>
    <div class="article" v-for="article in articles">
      <!-- <router-link to="/article" id="ancre_article">{{ article.title }}</router-link> -->
      <a :href="article.url">{{ article.title }}</a>
      <img :src="article.image" />
      <p>{{ article.text }}</p>
      <button class="com" v-on:click="createcommentaire">Commenter</button>
      <div class="newCom"> 
        <input type="text">
      </div>
      <button class="coms" v-if="commentaires" v-on:click="displaycommentaires">Commentaires</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "FilActu",
  data() {
    return {
      intro: "Bienvenue sur le réseau social d'entreprise de Groupomania",
      articles: [
        { url: "www.google.com", title: "titre test", image: "../assets/icon-left-font-monochrome-white.svg", text: "texte test" },
        { url: "www.bug.com", title: "titre test2", image: "imagetest2.jpg", text: "texte test2" }
      ],
      commentaires: [
""
      ]
    };
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
