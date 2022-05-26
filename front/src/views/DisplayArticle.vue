<template>
  <div>
    <div id="container">
      <div id="article">
        <h1>{{ article.titre }}</h1>
        <p class="valid" v-if="valid">{{ valid }}</p>
        <div
          id="mod"
          v-if="article.utilisateurId == user.userID || user.isAdmin == 1"
        >
          <button id="update-btn" v-on:click="showDisplayUpdate()">
            Modifier l'article
          </button>
          <!-- icone version mobile -->
          <i class="fa-solid fa-pencil" v-on:click="showDisplayUpdate()"></i>
          <button id="delete-btn" v-on:click="deleteArticle()">
            Supprimer l'article
          </button>
          <!-- icone version mobile -->
          <i class="fa-solid fa-trash-can" v-on:click="deleteArticle()"></i>
          </div>
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
            </fieldset>
          </form>
        <!-- </div> -->
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
            v-if="commentaires.length > 0"
          >
            Commentaire<span v-if="commentaires.length > 1">s</span> ({{
              commentaires.length
            }})
          </button>
          <p v-else>Soyez le premier a commenter</p>
        </div>
        <div class="new_com" v-if="click">
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
          <div id="display_com" v-for="com in commentaires" :key="com.id">
            <BaseCommentaire :commentaire="com" :getComment="getComment" />
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
import { mapGetters } from "vuex";

export default {
  name: "DisplayArticle",
  components: { BtnWhite, Modale, BaseCommentaire, Editor },
  data() {
    return {
      intro: "Bienvenue sur le réseau social d'entreprise de Groupomania",
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
    let user = JSON.parse(localStorage.getItem("user"));
    this.user = user;
    // Recuperation des commentaires
    this.$store.dispatch("fetchCommentaires", this.$route.params.id);
  },
  computed: {
    ...mapGetters(["getArticleById", "getCommentsById"]),
    article() {
      return this.getArticleById(this.$route.params.id);
    },
    commentaires() {
      return this.$store.state.commentaires;
    },
  },
  methods: {
    getComment() {
      // Recupération des commentaires de l'article
      this.$store.dispatch("fetchCommentaires", this.$route.params.id);
    },
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
    update() {
      let token = localStorage.getItem("token");
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
          // Display
          this.displayContent = !this.displayContent;
          this.showUpdate = false;
          this.click = false;
          this.valid = res.data;
          // Mise a jour du store
          setTimeout(() => {
            this.$store.dispatch("fetchArticles");
          }, 300);
        })
        .catch((e) => {
          this.message = e.response.data;
          this.toggleModale();
        });
    },
    deleteArticle() {
      let token = localStorage.getItem("token");
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
            // Modale
            this.click = false;
            this.message = response.data;
            // Mise a jour du store
            this.$store.dispatch("fetchArticles");
            // Redirection
            setTimeout(() => {
              this.$router.push({ name: "FilActu" });
            }, 1500);
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
      let token = localStorage.getItem("token");
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
            this.$store.dispatch("fetchCommentaires", this.$route.params.id);
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
#mod {
  display: flex;
  justify-content: center;
}
#article {
  width: 70%;
  margin-left: auto;
  margin-right: auto;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1em;
  border: 1px solid var(--color-secondary);
  margin-top: 3em;
  margin-bottom: 6em;
  border-radius: 2em;
  box-shadow: 0.3em 0.3em 8px #a8a7a7;
  background: var(--gradiant);
}
img {
  margin: auto;
  border: outset;
  min-width: 90%;
  max-width: 100%;
  height: 400px;
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
  padding: 0.5em;
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
  max-width: 100%;
  background: whitesmoke;
}

#com_text,
#com_date {
  padding: 0.2em;
}
.submit {
  background-color: white;
  color: black;
  border: 2px solid #555555;
  padding: 0.3em;
  margin: 0.3em;
  cursor:pointer;
}
.submit:hover {
  background-color: #555555;
  color: white;
}
.error {
  color: var(--color-error);
  padding: 0.5em;
}
.valid {
  color: #003ba2;
  padding: 0.5em;
}
.fa-pencil, .fa-trash-can {
  display: none;
  color: #3b3b3b;
  border: black 1px solid;
  width: fit-content;
  padding: 0.5em;
  margin: 0.2em;
  border-radius: 50%;
  cursor: pointer;
}
.fa-pencil:hover, .fa-trash-can:hover {
  color: var(--color-secondary);
  transform: scale(1.1)
}
.fa-pencil:active, .fa-trash-can:active {
  transform: scale(1);
}

@media screen and (max-width: 768px) {
    .fa-pencil, .fa-trash-can {
      display: inherit;
    }
    #update-btn, #delete-btn {
      display: none;
    }
  }
</style>
