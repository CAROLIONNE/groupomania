<template>
  <div>
    <router-link
      id="ancre_article"
      :to="{ name: 'DisplayArticle', params: { id: article.id } }"
      ><h2>{{ article.titre }}</h2>
    </router-link>
    <UpdateArticle :article="article" :displayContent.sync='displayContent' v-on:displayUpdate="displayUpdate($event)"/>
    <!-- recup article pas a jour -->
    <div id='content' v-if="displayContent">
    <img :src="article.media" v-if="article.media" />
    <p id="article_text" v-html="article.text"></p>
    <p id="article_author">
      Créé par {{ article.utilisateur.pseudonyme }}, le
      {{ timestamp2(article.createdAt) }}
      <span v-if="article.createdAt != article.updatedAt"
        >, Modifié le {{ timestamp2(article.updatedAt) }}
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
      <h2>Texte :</h2>
      <textarea
        id="com_text"
        v-model="newCommentaire"
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
    </div>
      <p class="error" v-if="errors">
        {{ errors }}
      </p>
    <div id="container_comments" v-if="displayCom">
      <div id="display_com" v-for="(com, index) in commentaires" :key="com.id">
        <BaseCommentaire
          :commentaire="com"
          :index="index"
          :getComment="displayCommentaires"
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
    index: {
      type: Number,
    },
    coms: {
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
    let user = JSON.parse(localStorage.getItem("user"));
    let token = user.token;
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
    // getArticle($event) {
    //   console.log($event);
    // },
    displayUpdate($event) {
      this.displayContent = $event
    },
    toggleModale() {
      this.show = !this.show;
    },
    timestamp(date) {
      return moment(date, "YYYYMMDD").fromNow();
    },
    timestamp2(date) {
      return moment(date).format("DD-MM-YYYY");
    },
    displayNewComment() {
      this.click = !this.click;
      if (this.displayCom == true) this.displayCom = false
    },
    // Afficher les commentaires d'un article
    displayCommentaires(id) {
      this.displayCom = !this.displayCom;
      if (this.click == true) this.click = false
      let user = JSON.parse(localStorage.getItem("user"));
      let token = user.token;
      this.axios
        .get(`http://localhost:3000/api/comment/${id}`, {
          headers: {
            Authorization: "Bearer " + token,
          },
        })
        .then((foundCommentaires) => {
          this.commentaires = foundCommentaires.data;
          console.log("in");
        })
        .catch((e) => {
          console.log(e);
        });
    },
    createCommentaire() {
      let user = JSON.parse(localStorage.getItem("user"));
      let token = user.token;
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
          .then((response) => {
            // reset champ
            this.newCommentaire = "";
            // display & refresh
            this.click = false;
            this.message = response.data;
            this.toggleModale();
            this.displayCommentaires(this.article.id);
          })
          .catch((e) => {
            this.errors = e;
          });
      } else {
        this.message = "3 caractères minimum 🙏";
        this.toggleModale();
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
  overflow:auto;
  height: 30em;
  margin: 0.5em;
  border: outset;
  max-width: 100%;
  margin-left: auto;
  margin-right: auto;
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
}
#display_com {
  margin: 0.5em;
  margin-left: auto;
  margin-right: auto;
  border: 2px solid #a7a7a7;
  border-radius: 1em;
  /* width: 80%; */
  background: whitesmoke;
}
#com_text,
#com_date {
  padding: 0.2em;
}
.submit{
  cursor: pointer;
}
.error {
  color: #f00020;
  padding: 0.5em;
  display: inline-block;
  border: dashed #B22222;
}
</style>
