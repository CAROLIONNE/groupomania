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
        <!-- redirection vers article ciblé -->
        <a href="#"
          ><h2>{{ article.titre }}</h2></a
        >
        <img id="article_img" :src="article.media" />
        <p id="article_text">{{ article.text }}</p>
        <div id="btn">
          <button id="btn_new_com" v-on:click="newComment()">
            Commenter
          </button>
          <button class="btn_coms" v-on:click="displayCommentaires()">
            Commentaires
          </button>
        </div>
        <div class="new_com" v-on:click="newComment()">
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
          </textarea
          ><br />
          <input
            type="submit"
            id="submit_com"
            v-on:click="createCommentaire()"
            value="Envoyer"
          />
        </div>

        <div id="container_comments">
          <div
            id="display_com"
            v-for="com in commentaires"
            :key="com.id_commentaire"
          >
            <h2 id="com_titre">{{ com.titre }}</h2>
            <div id="com_text">{{ com.text }}</div>
            <p id="com_date">{{ com.date_crea }}</p>
            <!-- TO DO recupérer pseudonyme avec ID -->
            <!-- <p>{{ com }}</p> -->
            <p class="error" v-if="errors">
              {{ errors }}
            </p>
          </div>
        </div>
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

  methods: {
    newComment() {
      console.log("nouveau com", document.getElementById("com"));
    },
    displayCommentaires() {
      axios
        .get(`http://localhost:3000/api/comment`)
        .then((response) => {
          // response.data.forEach((commentaire) => {
          this.commentaires = response.data;
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
      this.preventDefault();
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
#container {
  margin-left: auto;
  margin-right: auto;
  width: 75%;
}
.article {
  background: rgb(70, 70, 70);
  border-radius: 3em;
  border: 4px solid black;
  color: white;
  margin: 2em;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 1em;
  text-align: center;
  /* margin-left: auto;
  margin-right: auto;
  width: 75%; */
}
img {
  max-width: 90%;
  height: 19em;
  margin-left: auto;
  margin-right: auto;
}
#article_text {
  /* height: 2em; */
  margin-left: auto;
  margin-right: auto;
}
.new_com {
  display: flex;
  align-items: center;
  justify-content: space-around;
  /* width: 60%; */
  margin-left: auto;
  margin-right: auto;
  margin: 0.2em;
}

/* CSS */
#btn_new_com,
.btn_coms, #submit_com {
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
.btn_coms:focus-visible, #submit_com:focus-visible {
  box-shadow: #222222 0 0 0 2px, rgba(255, 255, 255, 0.8) 0 0 0 4px;
  transition: box-shadow 0.2s;
}

#btn_new_com:active,
.btn_coms:active, #submit_com:active {
  background-color: #f7f7f7;
  border-color: #000000;
  transform: scale(0.96);
}

#btn_new_com:disabled,
.btn_coms:disabled, #submit_com:disabled {
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
  margin: 1em;
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
  border: antiquewhite 2px solid;
  border-radius: 2em;
  width: 65%;
}
#com_titre,
#com_text,
#com_date {
  padding: 0.2em;
}
</style>
