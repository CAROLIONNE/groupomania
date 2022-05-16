<template>
  <div>
    <div id="container">
      <div id="article">
        <h1>{{ article.titre }}</h1>
        <div
          id="mod"
          v-if="article.utilisateurId == user.userID || user.isAdmin == 1"
        >
          <button id="update-btn" v-on:click="showDisplayUpdate()">
            Modifier l'article
          </button>
          <button id="delete-btn" v-on:click="deleteArticle()">
            Supprimer l'article
          </button>
          <form @submit.prevent="update()">
            <fieldset id="container_update" v-if="showUpdate">
              <legend><h2>Modification</h2></legend>
              <label for="titre">Titre : </label>
              <input type="text" v-model.trim="article.titre" name="titre" />
              <editor
                api-key="b7vz3gtuzy2c28rt2axsmshdeh5dfh1vftz3x9tvoqg12057"
                :init="{
                  height: 200,
                  menubar: false,
                }"
                id="editor"
                v-model="article.text"
                name="text"
              />
              <input
                id="file"
                type="file"
                name="image"
                v-on:change="fileChange"
              />
              <input class="submit" type="submit" value="Sauvegarder" />
              <p class="error" v-if="errors">{{ errors }}</p>
              <p class="valid" v-if="valid">{{ valid }}</p>
            </fieldset>
          </form>
        </div>
        <div id="content" v-if="displayContent">
          <img id="article_img" :src="article.media" v-if="article.media" />
          <p id="article_text" v-html="article.text"></p>
          <p id="article_author">
            Créé par {{ article.utilisateur.pseudonyme }}, le
            {{ timestamp2(article.createdAt) }}
          </p>
        </div>
        <div id="btn">
          <BtnWhite
            id="btn_new_com"
            name="Commenter"
            :show="displayNewComment"
          />
          <button
            id="btn_coms"
            v-on:click="displayComment()"
            v-if="commentaires"
          >
            Commentaire<span v-if="commentaires.length > 1">s</span> ({{
              commentaires.length
            }})
          </button>
          <p v-else>Soyez le premier a commenter</p>
          <!-- <BtnWhite
            id="btn_coms"
            :show="displayComment()"
            v-if="commentaires"
            name="Commentaire"
          /> -->
        </div>
        <div class="new_com" v-if="click">
          <h2>Texte :</h2>
          <textarea
            id="com_text"
            v-model="commentaire"
            name="text"
            rows="2"
            cols="33"
          >
          </textarea>
          <input
            type="submit"
            class="submit"
            v-on:click="createCommentaire()"
            value="Envoyer"
          />
          <br />
          <p class="error" v-if="errors">
            {{ errors }}
          </p>
        </div>

        <div id="container_comments" v-if="displayCom">
          <div
            id="display_com"
            v-for="(com, index) in commentaires"
            :key="com.id"
          >
            <BaseCommentaire
              :commentaire="com"
              :index="index"
              :getComment="getComment"
            />
          </div>
        </div>
      </div>
    </div>
    <Modale :show="show" :toggleModale="toggleModale" :message="message" />
  </div>
</template>

<script>
import moment from "moment";
import BtnWhite from "../components/BtnWhite.vue";
import Modale from "../components/ModaleBox.vue";
import BaseCommentaire from "../components/BaseCommentaire.vue";
import Editor from "@tinymce/tinymce-vue";
export default {
  name: "DisplayArticle",
  components: { BtnWhite, Modale, BaseCommentaire, Editor },
  data() {
    return {
      intro: "Bienvenue sur le réseau social d'entreprise de Groupomania",
      article: {},
      // article: this.$store.state.article,
      commentaires: "",
      commentaire: "",
      errors: null,
      valid: null,
      click: false,
      showUpdate: false,
      displayCom: false,
      displayContent: true,
      media: "",
      show: false,
      message: null,
      user: {},
    };
  },
  created() {
    // this.$store.dispatch("fetchArticle", this.$route.params.id)  
    let user = JSON.parse(localStorage.getItem("user"));
    let token = user.token;
    this.user = user;
    // Récupération des données de l'article
    this.axios
      .get(`http://localhost:3000/api/article/${this.$route.params.id}`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((article) => {
        this.article = article.data.articleFound;
      })
      .catch((e) => {
        this.errors = e;
        console.log(e);
      });
    // Recupération des commentaires de l'article
    this.axios
      .get(`http://localhost:3000/api/comment/${this.$route.params.id}`, {
        headers: {
          Authorization: "Bearer " + this.user.token,
        },
      })
      .then((allCommentaires) => {
        this.commentaires = allCommentaires.data;
      })
      .catch((e) => {
        console.log("get comment", e);
      });
  },

  methods: {
    fileChange(e) {
      let files = e.target.files || e.dataTransfer.files;
      this.article.media = files[0];
    },
    toggleModale() {
      this.show = !this.show;
    },
    displayComment() {
      this.displayCom = !this.displayCom;
      if (this.click == true) this.click = false;
    },
    getComment() {
      // Recupération des commentaires de l'article
      let user = JSON.parse(localStorage.getItem("user"));
      let token = user.token;
      let $id = this.$route.params.id;
      return this.axios
        .get(`http://localhost:3000/api/comment/${$id}`, {
          headers: {
            Authorization: "Bearer " + token,
          },
        })
        .then((allCommentaires) => {
          this.commentaires = allCommentaires.data;
        })
        .catch((e) => {
          this.commentaires = "";
          console.log("getComment, displayArticle", e.response);
        });
    },
    timestamp(date) {
      return moment(date, "YYYYMMDD").fromNow();
    },
    timestamp2(date) {
      return moment(date).format("DD-MM-YYYY");
    },
    showDisplayUpdate() {
      this.displayContent = !this.displayContent;
      this.showUpdate = !this.showUpdate;
    },
    getArticle() {
      let $id = this.$route.params.id;
      let user = JSON.parse(localStorage.getItem("user"));
      let token = user.token;
      // Récupération des données de l'article
      this.axios
        .get(`http://localhost:3000/api/article/${$id}`, {
          headers: {
            Authorization: "Bearer " + token,
          },
        })
        .then((article) => {
          this.article = article.data.articleFound;
        })
        .catch((e) => {
          console.log(e);
        });
    },
    update() {
      let user = JSON.parse(localStorage.getItem("user"));
      let token = user.token;
      const updatedPost = new FormData();
      updatedPost.append("titre", this.article.titre);
      updatedPost.append("text", this.article.text);
      updatedPost.append("image", this.article.media);
      this.axios
        .put(
          `http://localhost:3000/api/article/${this.$route.params.id}`,
          updatedPost,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: "Bearer " + token,
            },
          }
        )
        .then((res) => {
          this.displayContent = !this.displayContent;
          this.showUpdate = false;
          this.click = false;
          this.message = res.data;
          this.toggleModale();
          // this.$store.commit('UPDATE_ARTICLE', res)
          console.log(res);
          // setTimeout(() => {
          //   this.getArticle();
          // }, 300);
        })
        .catch((e) => {
          this.message = e.response.data;
          this.toggleModale();
          // alert(e.response.data);
        });
    },
    deleteArticle() {
      let user = JSON.parse(localStorage.getItem("user"));
      let token = user.token;
      let $id = this.$route.params.id;
      const valid = confirm("Voulez vous supprimer cet article ?");
      if (valid) {
        this.axios
          .delete(`http://localhost:3000/api/article/${$id}`, {
            headers: {
              Authorization: "Bearer " + token,
            },
          })
          .then((response) => {
            // modale ne fonctionne pas
            this.click = false;
            this.message = response.data;
            // alert(response.data);
            this.$router.push({ name: "FilActu" });
          })
          .catch((e) => {
            this.click = false;
            this.message = e.response.data;
            // console.log(e.response.config.data);
          });
      }
    },

    displayNewComment() {
      this.click = !this.click;
      if (this.displayCom == true) this.displayCom = false;
    },
    createCommentaire() {
      let user = JSON.parse(localStorage.getItem("user"));
      let token = user.token;
      if (this.commentaire.length >= 3) {
        this.axios
          .post(
            `http://localhost:3000/api/comment/${this.$route.params.id}`,
            {
              text: this.commentaire,
            },
            {
              headers: {
                Authorization: "Bearer " + token,
              },
            }
          )
          .then((response) => {
            this.commentaire = "";
            this.click = false;
            this.message = response.data;
            this.toggleModale();
            this.getComment();
          })
          .catch((e) => {
            console.log(e);
            this.errors = e.response.data;
          });
      } else {
        this.errors = "Minimum 3 caratères 🙏";
      }
    },
  },
};
</script>

<style scoped>
#article {
  width: 70%;
  margin-left: auto;
  margin-right: auto;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1em;
  border: 1px solid black;
  margin-top: 3em;
  margin-bottom: 6em;
  border-radius: 2em;
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
  margin: 0.5em;
  border: outset;
  max-width: 100%;
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
  margin-left: auto;
  margin-right: auto;
  margin: 0.2em;
  padding: 0.2em;
  border: 2px solid #a7a7a7;
  border-radius: 1em;
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
  border: 2px solid #a7a7a7;
  border-radius: 1em;
  width: 80%;
  background: whitesmoke;
}

#com_text,
#com_date {
  padding: 0.2em;
}
.submit {
  cursor: pointer;
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
