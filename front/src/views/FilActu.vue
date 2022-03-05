<template>
  <div id="post">
    <div class="header">
      <h1>{{ intro }}</h1>
      <button class="btn_new_article" v-on:click="createArticle">
        Créer une publication
      </button>
      <h2 id="fil">Fil d'actualité</h2>
    </div>
    <div id="container" v-for="article in articles" :key="article.id_article">
      <div class="article">
        <!-- <router-link to="/article:id" id="ancre_article">{{ article.title }}</router-link> -->
        <!-- redirection ver article ciblé -->
        <a href="#">{{ article.titre }}</a>
        <!-- <h1>{{ article.titre }}</h1> -->
        <img :src="article.media" />
        <p>{{ article.text }}</p>
        <button class="com" v-on:click="show">Commenter</button>
        <button class="btn_coms" v-on:click="displayCommentaires()">
        Commentaires
      </button>
      </div>
      <div class="new_com">
        <h2>Titre :</h2>
        <input type="text" class="commentTitle" v-model="commentaire.titre" />
        <h2>Texte :</h2>
        <textarea
          id="commentText"
          v-model="commentaire.text"
          name="text"
          rows="5"
          cols="33"
        >
        Ecrivez votre commentaire ici
      </textarea
        ><br/>
        <input
          type="submit"
          class="submit_com"
          v-on:click="createCommentaire()"
          value="Commenter"
        />
      </div>
      <div
        id="displayComs"
        v-for="com in commentaires"
        :key="com.id_commentaire"
      >
        <!-- <h2 >{{ com.titre }}</h2> -->
        <div v-if="commentaires">{{ com }}</div>
        <p class="error" v-if="errors">
          {{ errors }}
        </p>
      </div>
    </div>
    <!-- <router-view /> -->
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "FilActu",
  data() {
    return {
      intro: "Bienvenue sur le réseau social d'entreprise de Groupomania",
      articles: null,
      // articles: [
      // {
      //   id_article: '',
      //   id_user: '',
      //   media: '',
      //   text: '',
      //   titre: '',
      //   date_crea: '',
      //   date_mod: '',
      // }
      // { url: "www.google.com", title: "titre test", image: "../assets/icon-left-font-monochrome-white.svg", text: "texte test" },
      // { url: "www.bug.com", title: "titre test2", image: "imagetest2.jpg", text: "texte test2" }
      // ],
      // commentaires: {
      //   id_commentaire: "",
      //   titre: "",
      //   text: "",
      // },
      commentaires: null,
      commentaire: {
        id_commentaire: "",
        titre: "",
        text: "",
      },
      errors: null,
    };
  },
  mounted() {
    axios
      .get(`http://localhost:3000/api/article`)
      .then((response) => {
        this.articles = response.data;
        // this.articles.push(response.data)
        console.log("data", response.data);
        console.log(this.articles[0]);
      })
      .catch((e) => {
        this.errors = e;
      });
  },
  //   axios.get(`http://localhost:3000/api/article`)
  //   .then(response => {
  //     response.data.forEach ((article => {
  //       console.log(article)
  //         this.articles.id_article = article.id_article,
  //         this.articles.id_user = article.id_user,
  //         this.articles.media = article.media,
  //         this.articles.text = article.text,
  //         this.articles.titre = article.titre,
  //         this.articles.date_crea = article.date_crea,
  //         this.articles.date_mod = article.date_mod

  //   }))
  //     })
  //   .catch(e => {
  //     this.errors = e
  //   })
  // },

  methods: {
    displayCommentaires() {
      axios
        .get(`http://localhost:3000/api/comment`)
        .then((response) => {
          // response.data.forEach((commentaire) => {
            this.commentaires = response.data
            // console.log(commentaire);
            // (this.commentaires.titre = commentaire.titre),
            //   (this.commentaires.text = commentaire.text),
            //   (this.commentaires.id_commentaire = commentaire.id_commentaire);
          // });
          console.log(this.commentaires);
        })
        .catch((e) => {
          this.errors = e;
        });
    },

    createArticle() {
      this.$router.push({ name: "NewArticle" });
    },

    createCommentaire() {
      // this.preventDefault();
      console.log("create com");
      axios
        .post(`http://localhost:3000/api/comment`)
        .then((response) => {
          // JSON responses are automatically parsed.
          this.commentaire.push(response.data);
        })
        .catch((e) => {
          console.log(e);
          this.errors = e;
        });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#post {
  text-align: center;
}
h1,
h2 {
  font-weight: bold;
  text-align: center;
}
#fil {
  margin: 1em;
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
.com,
.btn_coms {
  width: 18%;
  font-size: larger;
  margin-left: auto;
  margin-right: auto;
  padding: 0.5em;
}
.new_com {
  display: flex;
align-items: center;
justify-content: space-around;
width: 60%;
margin-left: auto;
margin-right: auto;
}


/* CSS */
.btn_new_article {
  appearance: none;
  background-color: transparent;
  border: 2px solid #1A1A1A;
  border-radius: 15px;
  box-sizing: border-box;
  color: #3B3B3B;
  cursor: pointer;
  display: inline-block;
  font-family: Roobert,-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol";
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
  transition: all 300ms cubic-bezier(.23, 1, 0.32, 1);
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  width: 25%;
  will-change: transform;
}

.btn_new_article:disabled {
  pointer-events: none;
}

.btn_new_article:hover {
  color: #fff;
  background-color: #1A1A1A;
  box-shadow: rgba(0, 0, 0, 0.25) 0 8px 15px;
  transform: translateY(-2px);
}

.btn_new_article:active {
  box-shadow: none;
  transform: translateY(0);
}

</style>

