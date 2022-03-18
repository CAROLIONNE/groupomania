<template>
  <div>
    <div id="container">
      <div class="article">
        <h1>{{ article.id }}</h1>
        <a href="#">
          <h2>{{ article.titre }}</h2>
        </a>
        <img id="article_img" :src="article.media" />
        <p id="article_text">{{ article.text }}</p>
        <p id="article_author">
          Créé par {{ article.id_user }}, le {{ timestamp2(article.date_crea) }}
        </p>
        <div id="btn">
          <button id="btn_new_com" v-on:click="newComment()">Commenter</button>
          <button class="btn_coms" v-on:click="displayCommentaires()">
            Commentaires
          </button>
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
          <p class="error" v-if="errors">
            {{ errors }}
          </p>
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
            <p class="error" v-if="errors">
              {{ errors }}
            </p>
          </div>
        </div>
      </div>
    </div>
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
      article: {
        id_user: "",
        id: "",
        titre: "",
        text: "",
        media: "",
        date_crea: "",
      },
      commentaires: null,
      commentaire: {
        id_commentaire: "",
        titre: "",
        text: "",
      },
      errors: null,
      click: false,
      userJson: localStorage.getItem("user"),
      user: JSON.parse(userJson),
      token: user.token,
      idArticleCom: [],
      idArticle: "",
    };
  },
  computed: {},
  mounted() {
    let $id = this.$route.params.id;
    this.axios
      .get(`http://localhost:3000/api/article/` + $id, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((article) => {
        this.article.id = article.data.articleFound.id_article,
        this.article.id_user = article.data.articleFound.id_user,
        this.article.titre = article.data.articleFound.titre,
        this.article.text = article.data.articleFound.text,
        this.article.media = article.data.articleFound.media,
        this.article.date_crea = article.data.articleFound.date_crea,
        console.log("data", article.data.articleFound);
      })
      .catch((e) => {
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
    displayCommentaires() {
      this.axios
        .get(`http://localhost:3000/api/comment/` + this.$route.params.id, {
          headers: {
            Authorization: "Bearer " + token,
          },
        })
        .then((allCommentaires) => {
          this.commentaires = allCommentaires.data;
        })

        .catch((e) => {
          console.log(e);
          this.errors = e;
        });
    },

    createArticle() {
      this.$router.push({ name: "NewArticle" });
    },

    createCommentaire() {
      console.log("create com");
      this.axios
        .post(
          `http://localhost:3000/api/comment`,
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
