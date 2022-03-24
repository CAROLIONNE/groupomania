<template>
  <div>
    <div id="container">
      <div id="article">
        <h1>{{ article.titre }}</h1>
        <!-- TO DO afficher seulement si c'est l'utilisateur qui l'a crée -->
        <div id="mod">
          <button id="update-btn" v-on:click="show()">  Modifier titre ou texte </button>
          <button id="delete-btn" v-on:click="deleteArticle()" >Supprimer l'article</button>
          <fieldset id="container_update" v-if="click">
            <legend><h2>Update</h2></legend>
            <label>Titre : </label>
            <input type="text" v-model.trim="article.titre" />
            <label>Texte : </label>
            <input type="text" v-model.trim="article.text" />
            <input type="submit" value="Sauvegarder" @click="update()" />
            <p class="error" v-if="errors">{{ errors }}</p>
          </fieldset>
          <p class="valid" v-if="valid">{{ valid }}</p>
        </div>
        <img id="article_img" :src="article.media" v-if="article.media" />
        <!-- <form id="new_article" method="put" enctype="multipart/form-data"> -->
        <form enctype="multipart/form-data" method="POST">
          <input id="file" type="file" name="image" v-on:change="fileChange" />
          <input type="submit" name="image" v-on:click="updateImage()" />
        </form>
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
          <br />
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
            <p id="com_date">{{ timestamp(com.date_crea) }}</p>
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
        titre: "",
        text: "",
      },
      errors: null,
      valid: null,
      click: false,
      userJson: localStorage.getItem("user"),
      user: JSON.parse(userJson),
      token: user.token,
      idArticleCom: [],
      idArticle: "",
      media: "",
      click: false,
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
        (this.article.id = article.data.articleFound.id_article),
          (this.article.id_user = article.data.articleFound.id_user),
          (this.article.titre = article.data.articleFound.titre),
          (this.article.text = article.data.articleFound.text),
          (this.article.media = article.data.articleFound.media),
          (this.article.date_crea = article.data.articleFound.date_crea),
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
    show() {
      this.click = true;
    },
    update() {
      let $id = this.$route.params.id;
      this.axios
        .put(
          `http://localhost:3000/api/article/` + $id,
          {
            titre: this.article.titre,
            text: this.article.text,
          },
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        )
        .then((response) => {
          // console.log("update ok", response.data);
          this.click = false;
          this.valid = response.data;
          // this.$router.push({ name: "FilActu" });
        })
        .catch((e) => {
          console.log("log erreur", e.response.data);
          // console.log(e.response.config.data);
          this.errors = e.response.data;
        });
    },
    updateImage() {
      let $id = this.$route.params.id;
      console.log("update image");
      let user = JSON.parse(localStorage.getItem("user"));
      let token = user.token;
      const data = new FormData();
      data.append("image", this.media);
      console.log(data);
      if (this.media) {
        this.axios
          .put(`http://localhost:3000/api/article/image/` + $id, data, {
            headers: {
              Authorization: "Bearer " + token,
              "content-Type": "multipart/form-data",
            },
          })
          .then((response) => {
            console.log("requete ok", response.data);
            // this.$router.push({ name: "FilActu" });
          })
          .catch((e) => {
            console.log(data);
            console.log("log erreur", e);
            // console.log(e.response.config.data);
            //  this.errors = e.response.data.error;
          });
      }
    },
    deleteArticle() {
      let $id = this.$route.params.id;
      confirm("Voulez vous supprimer cet article ?")
       this.axios
        .delete(
          `http://localhost:3000/api/article/` + $id,
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        )
        .then((response) => {
          console.log("delete ok", response.data);
          alert("article supprimé")
          this.$router.push({ name: "FilActu" });
        })
        .catch((e) => {
          console.log("log erreur", e.response.data);
          // console.log(e.response.config.data);
          this.errors = e.response.data;
        });
    },
    fileChange(e) {
      let files = e.target.files || e.dataTransfer.files;
      this.media = files[0];
      console.log(this.media);
    },
    newComment() {
      this.click = true;
      console.log("nouveau com", document.getElementById("com"));
    },
    displayCommentaires() {
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
          console.log(e);
          this.errors = e;
        });
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
#article {
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1em;
  border: 1px solid black;
  margin: 3em;
  margin-bottom: 6em;
  border-radius: 20px;
  box-shadow: 0.3em 0.3em 8px #a8a7a7;
  background: rgb(144, 140, 153);
  background: linear-gradient(
    309deg,
    rgba(144, 140, 153, 0.510224158022584) 0%,
    rgba(208, 210, 237, 0.5858544101234244) 29%
  );
}
img {
  height: 30em;
  margin: 1em;
  object-fit: cover;
  border: outset;
  /* border: 2px solid black; */
}
#article_text,
#article_author {
  padding: 0.2em;
}
#article_author,
#com_date {
  font-size: small;
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
  padding: 0.2em;
  border: 2px solid #a7a7a7;
  border-radius: 1em;
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
  border: 2px solid #a7a7a7;

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
.valid {
  color: #003ba2;
  padding: 0.5em;
}
</style>
