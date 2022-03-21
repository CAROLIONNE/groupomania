<template>
  <div id="post">
    <div class="header">
      <h1>{{ intro }}</h1>
      <button class="btn_new_article" v-on:click="createArticle">
        Créer une publication
      </button>
      <h2 id="fil">Fil d'actualité</h2>
    </div>
    <div id="container" v-for="(article, index) in articles" :key="article.id">
      <div id="article">
        <router-link id="ancre_article" :to="{ name: 'DisplayArticle', params: { id: article.id_article }}"><h2>{{ article.titre }}</h2></router-link>
        <img id="article_img" v-if="article.media" :src="article.media" />
        <p id="article_text">{{ article.text }}</p>
        <!-- TO DO : Recup pseudonyme avec ID -->
        <p id="article_author">Créé par {{ article.id_user }}, le {{ timestamp2(article.date_crea) }}</p>
        <div id="btn">
          <button id="btn_new_com" v-on:click="newComment()">Commenter</button>
          <button class="btn_coms" v-on:click="displayCommentaires(index)">
            Commentaires
          </button>
          <p class="error" v-if="errors">{{ errors }}</p>
        </div>
        <div class="new_com" v-if="click">
          <h2>Titre :</h2>
          <input type="text" class="com_title" v-model="commentaire.titre" />
          <h2>Texte :</h2>
          <textarea
            id="com_text"
            v-model="commentaire.text"
            name="text"
            rows="2"
            cols="33"
          >
          Ecrivez votre commentaire ici
          </textarea>
          <input
            type="submit"
            id="submit_com"
            v-on:click="createCommentaire()"
            value="Envoyer"
          />
        </div>
        <!-- TO DO recupérer pseudonyme avec ID -->
        <div id="container_comments">
          <div id="display_com" v-for="com in commentaires" :key="com.id_commentaire">
            <h2 id="com_titre">{{ com.titre }}</h2>
            <div id="com_text">{{ com.text }}</div>
            <p id="com_date"> {{ timestamp(com.date_crea) }}</p>
          </div>
        </div>
      </div>
    </div>
    <router-view />
  </div>
</template>

<script>
import moment from "moment";
let userJson = localStorage.getItem("user");
let user = JSON.parse(userJson);
let token = user.token;
export default {
  name: "FilActu",
  data() {
    return {
      intro: "Bienvenue sur le réseau social d'entreprise de Groupomania",
      articles: null,
      commentaires: null,
      commentaire: {
        id_commentaire: "",
        titre: "",
        text: "",
      },
      errors: null,
      click: false,
      idArticle: "",
    };
  },
  computed: {},
   mounted() {
     this.axios
      .get(`http://localhost:3000/api/article`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((allArticles) => {
        this.articles = allArticles.data;
        console.log("articles", this.articles);
      })
      .catch((e) => {
        console.log(e);
        this.errors = e;
      });
  },

  methods: {
    timestamp(date) {
      return moment(date, "YYYYMMDD").fromNow();
    },
    timestamp2(date) {
      return moment(date).format("DD-MM-YYYY");
    },
    newComment() {
      this.click = true;
      console.log("nouveau com", document.getElementById("com"));
    },

    displayCommentaires(index) {
      this.idArticle = this.articles[index].id_article;
      this.axios
        .get(`http://localhost:3000/api/comment/${this.idArticle}`, {
          headers: {
            Authorization: "Bearer " + token,
          },
        })
        .then((foundCommentaires) => {

            const article = document.getElementById("article");
            console.log(article);
            console.log(this.articles[index]);
            this.commentaires = foundCommentaires.data;
            // console.log("commentaires", this.commentaires);

        })
        .catch((e) => {
          console.log(e);
          this.errors = e.response.data.error;
        });
    },

    createArticle() {
      this.$router.push({ name: "NewArticle" });
    },

    createCommentaire() {
      console.log("create com");
      this.axios
        .post(
          `http://localhost:3000/api/comment/${this.$route.params.id}`,
          {
            titre: this.commentaire.titre,
            text: this.commentaire.text,
          },
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        )
        .then((response) => {
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
          this.errors = e;
        });
    },
  },
};
</script>

<style scoped>
#post {
  text-align: center;
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
a {
  color: black;
  text-decoration: none;
  cursor: pointer;
}
#container {
  margin-left: auto;
  margin-right: auto;
  width: 75%;
}
#article {
  background: rgb(70, 70, 70);
  border: 2px solid  #a7a7a7 ;
  margin-bottom: 2em;
  padding: 0.2em;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;

  border-radius: 20px;
  box-shadow: 0.2em 0.2em 10px #a8a7a7;
  background: rgb(144, 140, 153);
  background: linear-gradient(
    309deg,
    rgba(144, 140, 153, 0.510224158022584) 0%,
    rgba(208, 210, 237, 0.5858544101234244) 29%
  );
}
img {
  max-width: 90%;
  height: 19em;
  margin-left: auto;
  margin-right: auto;
  border: 2px solid black;
}
#article_text {
  margin-left: auto;
  margin-right: auto;
  padding: 0.2em;
  margin: 0.2em;
}
#article_author {
  font-size: small;
  padding: 0.2em;
}
.new_com {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-around;
  /* width: 60%; */
  margin-left: auto;
  margin-right: auto;
  margin: 0.2em;
}

#btn_new_com,
.btn_coms,
#submit_com {
  background-color: #ffffff;
  border: 1px solid #222222;
  border-radius: 8px;
  box-sizing: border-box;
  color: #222222;
  cursor: pointer;
  display: inline-block;
  font-size: 16px;
  font-weight: 600;
  line-height: 20px;
  margin: 0;
  outline: none;
  padding: 13px 23px;
  position: relative;
  text-align: center;
  text-decoration: none;
  touch-action: manipulation;
  transition: box-shadow 0.2s, -ms-transform 0.1s, -webkit-transform 0.1s,
  transform 0.1s;
  user-select: none;
  -webkit-user-select: none;
  width: 20%;
  margin-left: auto;
  margin-right: auto;
  padding: 0.5em;
  margin: 0.5em;
}

#btn_new_com:focus-visible,
.btn_coms:focus-visible,
#submit_com:focus-visible {
  box-shadow: #222222 0 0 0 2px, rgba(255, 255, 255, 0.8) 0 0 0 4px;
  transition: box-shadow 0.2s;
}

#btn_new_com:active,
.btn_coms:active,
#submit_com:active {
  background-color: #f7f7f7;
  border-color: #000000;
  transform: scale(0.96);
}

#btn_new_com:disabled,
.btn_coms:disabled,
#submit_com:disabled {
  border-color: #dddddd;
  color: #dddddd;
  cursor: not-allowed;
  opacity: 1;
}

.btn_new_article {
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
  width: 25%;
  will-change: transform;
}

.btn_new_article:disabled {
  pointer-events: none;
}

.btn_new_article:hover {
  color: #fff;
  background-color: #1a1a1a;
  box-shadow: rgba(0, 0, 0, 0.25) 0 8px 15px;
  transform: translateY(-2px);
}

.btn_new_article:active {
  box-shadow: none;
  transform: translateY(0);
}
#container_comments {
  margin: 0.5em;
  /* background: black; */
  border-radius: 3em;
  width: 70%;
  margin-left: auto;
  margin-right: auto;
}
#display_com {
  margin: 0.5em;
  margin-left: auto;
  margin-right: auto;
  /* border: antiquewhite 2px solid; */
  border: 2px solid  #a7a7a7 ;
  
  border-radius: 2em;
  width: 65%;
}
#com_titre,
#com_text,
#com_date {
  padding: 0.2em;
}
.error {
  color: red;
  padding: 0.5em;
}
</style>
