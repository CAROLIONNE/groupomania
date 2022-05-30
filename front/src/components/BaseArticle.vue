<template>
  <div>
    <router-link
      id="ancre_article"
      :to="{ name: 'DisplayArticle', params: { id: article.id } }"
      ><h2>{{ article.titre }}</h2>
    </router-link>
    <UpdateArticle :idArticle='article.id' :displayContent.sync='displayContent' v-on:displayUpdate="displayUpdate($event)"/>
    <div id='content' v-if="displayContent">
    <img :src="article.media" v-if="article.media" />
    <p id="article_text" v-html="article.text"></p>
    <p id="article_author">
      Créé par {{ article.utilisateur.pseudonyme }}, le
      {{ timestamp(article.createdAt) }}
      <span v-if="article.createdAt != article.updatedAt"
        >, Modifié le {{ timestamp(article.updatedAt) }}
      </span>
    </p>
    </div>
    <div id="btn">
      <button id="btn_new_com" @click="displayNewComment()">Commenter</button>
      <button
        id="btn_coms"
        v-if="commentaires"
        v-on:click="displayCommentaires(article.id)"
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
        v-model="newCommentaire"
        name="commentaire"
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
    </div>
      <p class="error" v-if="errors">
        {{ errors }}
      </p>
    <div id="container_comments" v-if="displayCom">
      <div id="display_com" v-for="com in commentaires" :key="com.id">
        <BaseCommentaire
          :commentaire="com"
          :getComment="displayCommentaires"
          v-on:updateCom="updateCom($event)"
        />
      </div>
    </div>
    <Modale :show="show" :toggleModale="toggleModale" :message="message" />
  </div>
</template>

<script>
import moment from "moment";
import Modale from "./ModaleBox.vue";
import BaseCommentaire from "../components/BaseCommentaire.vue";
import UpdateArticle from "../components/UpdateArticle.vue";

export default {
  name: "BaseArticle",
  components: { Modale, BaseCommentaire, UpdateArticle },
  props: {
    article: {
      type: Object,
    },
  },
  data() {
    return {
      commentaires: "",
      newCommentaire: "",
      errors: null,
      click: false,
      showUpdate: false,
      displayCom: false,
      displayContent: true,
      media: "",
      message: null,
      show: false,
      author: null,
    };
  },
  created() {
    // Recupération des commentaires
    let token = localStorage.getItem("token");
    let idArticle = this.article.id;
    this.axios
      .get(`http://localhost:3000/api/comment/${idArticle}`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((foundCommentaires) => {
        this.commentaires = foundCommentaires.data;
      })
      .catch((e) => {
        console.log(e.response.data);
      });
  },
  methods: {
    displayUpdate($event) {
      this.displayContent = $event
    },
    updateCom($event) {
      console.log($event);
      this.commentaires = $event
    },
    toggleModale() {
      this.show = !this.show;
    },
    timestamp(date) {
      return moment(date).format("DD-MM-YYYY");
    },
    displayNewComment() {
      this.click = !this.click;
      if (this.displayCom == true) this.displayCom = false
    },
    // Afficher les commentaires d'un article
    displayCommentaires(id) {
      let token = localStorage.getItem("token");
      this.displayCom = !this.displayCom;
      if (this.click == true) this.click = false;
      this.axios
        .get(`http://localhost:3000/api/comment/${id}`, {
          headers: {
            Authorization: "Bearer " + token,
          },
        })
        .then((foundCommentaires) => {
          this.commentaires = foundCommentaires.data;
        })
        .catch((e) => {
          if (e.response.status === 404) {
            this.commentaires = ""
          }
        });
      
    },
    createCommentaire() {
      let token = localStorage.getItem("token");
      if (this.newCommentaire.length >= 3) {
        this.axios
          .post(
            `http://localhost:3000/api/comment/${this.article.id}`,
            {
              text: this.newCommentaire,
            },
            {
              headers: {
                Authorization: "Bearer " + token,
              },
            }
          )
          .then(() => {
            // Reset champ
            this.newCommentaire = "";
            // Display & refresh
            this.click = false;
            // this.$store.dispatch("fetchCommentaires", this.article.id) 
            this.displayCommentaires(this.article.id);
          })
          .catch((e) => {
            this.errors = e;
          });
      } else {
        this.errors = "3 caractères minimum 🙏";
      }
    },
  },
};
</script>

<style scoped>
a {
  color: black;
  text-decoration: none;
  cursor: pointer;
}
img {
  margin: auto;
  border: outset;
  width: 100%;
  height: 300px;
  max-height: 100%;
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
  border-radius: 3em;
  margin-left: auto;
  margin-right: auto;
  max-width: 100%;
}
#display_com {
  margin: 0.5em;
  margin-left: auto;
  margin-right: auto;
  border: 2px solid #a7a7a7;
  border-radius: 1em;
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
}
.submit:hover {
  background-color: #555555;
  color: white;
}
.error {
  color: var(--color-error);
  padding: 0.5em;
  display: inline-block;
  border: dashed #B22222;
}
</style>
