<template>
  <div class="post">
    <div class="header">
      <h1>{{ intro }}</h1>
          <button class="btn_new_article" v-on:click="createArticle">Créer une publication</button>
      <h2>Fil d'actualité</h2>
    </div>
    <div class="article" v-for="article in articles" :key="article.id_article">
      <!-- <router-link to="/article" id="ancre_article">{{ article.title }}</router-link> -->
      <!-- redirection ver article ciblé -->
      <a :href="article.url">{{ article.title }}</a>
      <img :src="article.image" />
      <p>{{ article.text }}</p>
      <button class="com" >Commenter</button>
      <div class="new_com" > 
        <h2>Titre :</h2>
        <input type="text" class="commentTitle" v-model="commentaire.titre">
      <h2>Texte :</h2> 
              <textarea id="commentText" v-model="commentaire.text" name="text" rows="5" cols="33">
        Ecrivez votre commentaire ici
      </textarea>
      <input type="submit" class="submit_com" v-on:click="createCommentaire()" value="Commenter" />
      </div>
      <button class="btn_coms" v-on:click="displayCommentaires()"> Commentaires </button> 
      <div id="displayComs" v-for="com in commentaires" :key="com.id-commentaire">     
       <h1 v-if="commentaires"> {{ com.titre }} </h1>
       <div v-if="commentaires"> {{ com }} </div>
      </div>
    <p class="error" v-if="errors"> 
      {{ errors }}
    </p>
    </div>
    <!-- <router-view /> -->
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
        {
          id_article: '',
          id_user: '',
          media: '',
          text: '',
          titre: '',
          date_crea: '',
          date_mod: '',
        }
        // { url: "www.google.com", title: "titre test", image: "../assets/icon-left-font-monochrome-white.svg", text: "texte test" },
        // { url: "www.bug.com", title: "titre test2", image: "imagetest2.jpg", text: "texte test2" }
      ],
      commentaires: null,
      commentaire: {
        titre: '',
        text: '',
      },
      errors: [],
    };
  },
  mounted() {
    axios.get(`http://localhost:3000/api/article`)
    .then(response => {
      // JSON responses are automatically parsed.
      this.articles.push(response.data);
      console.log("-----", response.data)
      console.log(this.articles);
      // console.log("-----", JSON.stringify(response.data))
    })
    .catch(e => {
      this.errors.push(e)
    })
  },
  methods:{

    displayCommentaires () {
        axios.get(`http://localhost:3000/api/comment`)
    .then(response => {
      // response.forEach((element => console.log(element)))
      // JSON responses are automatically parsed.
      console.log(response.data)
      this.commentaires.push(JSON.stringify(response.data))
    })
    .catch(e => {
      this.errors.push(e)
    })  
    },
    createArticle () {
      this.$router.push({ name: "NewArticle"})
    },
    createCommentaire () {
      console.log("create com")
      axios.post(`http://localhost:3000/api/comment`)
    .then(response => {
      // JSON responses are automatically parsed.
      this.commentaire.push(response.data)
    })
    .catch(e => {
      console.log(e)
      this.errors.push(e)
    })
    }
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
.com, .btn_coms {
  width: 18%;
  font-size: larger;
  margin-left:auto;
  margin-right: auto;
  padding: 0.5em;
}
.btn_new_article {

}
</style>
