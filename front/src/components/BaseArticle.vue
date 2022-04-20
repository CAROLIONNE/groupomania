<template>
  <div>
    <router-link id="ancre_article" :to="{ name: 'DisplayArticle', params: { id: article.id_article }}"><h2>{{ article.titre }}</h2>
    </router-link>
    <Modale :show="show" :toggleModale="toggleModale" :message="message"/>
    <!-- TO DO afficher UpdateArticle.vue si c'est l'utilisateur qui l'a créer -->
    <img id="article_img" :src="article.media" v-if="article.media"/>
    <p id="article_text">{{ article.text }}</p>
    <p id="article_author">Créé par {{ article.id_user }} le {{ timestamp2(article.date_crea) }} <span v-if="article.date_crea != article.date_mod">, Modifié le {{ timestamp2(article.date_mod) }}</span> </p>
    <div id="btn">
          <button id="btn_new_com" @click="displayNewComment()">
            Commenter
          </button>
          <button
            id="btn_coms"
            v-if="commentaires"
            v-on:click="displayCommentaires(index)"
          >Commentaire<span v-if="commentaires.length >1">s</span> ({{commentaires.length}})
          </button>
          <p v-else>Soyez le premier a commenter</p>
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

    <div id="container_comments" v-if="displayCom">
          <div
            id="display_com"
            v-for="(com, index) in commentaires"
            :key="com.id_commentaire"
          >
            <i
              id="btn_delete-com"
              class="fa-solid fa-trash-can"
              @click="deleteCom(index)"
            ></i>
            <h2 id="com_titre">{{ com.titre }}</h2>
            <div id="com_text">{{ com.text }}</div>
            <p id="com_date">
              {{ timestamp(com.date_crea) }} - {{ com.id_user }}
            </p>
            <!-- TO DO recupérer pseudonyme avec ID findUser() -->
            <p class="error" v-if="errors">
              {{ errors }}
            </p>
          </div>
        </div>
        
  </div>
</template>

<script>
import moment from "moment";
import Modale from "./ModaleBox.vue";
export default {
  name: "BaseArticle",
  components: { Modale },
  props: {
    article : {
      type: Object,
    },
    index : {
      type: Number,
    },
    // commentaire : {
    //   type: Object,
    // }
  },
  data() {
    return {
      commentaires: "",
      commentaire: {
        titre: "",
        text: "",
      },
      errors: null,
      valid: null,
      click: false,
      showUpdate: false,
      displayCom: false,
      media: "",
      message: null,
      show: false,
    };
  },
  mounted() {
      let user = JSON.parse(localStorage.getItem("user"));
      let token = user.token;
      let idArticle = this.article.id_article;
      this.axios
        .get(`http://localhost:3000/api/comment/${idArticle}`, {
          headers: {
            Authorization: "Bearer " + token,
          },
        })
        .then((foundCommentaires) => {
            this.commentaires = foundCommentaires.data;
            console.log("commentaires", this.commentaires);
        })
        .catch((e) => {
          console.log(e.response.data.error);
          // this.errors = e.response.data.error;
        })
  },
  methods: {
    toggleModale() {
      this.show = !this.show
    },
    timestamp(date) {
      return moment(date, "YYYYMMDD").fromNow();
    },
    timestamp2(date) {
      return moment(date).format("DD-MM-YYYY");
    },
    displayNewComment() {
      this.click = true;
    },
    // Afficher les commentaires d'un article
    displayCommentaires() {
      this.displayCom = true;
      let user = JSON.parse(localStorage.getItem("user"));
      let token = user.token;
      let idArticle = this.article.id_article;
      this.axios
        .get(`http://localhost:3000/api/comment/${idArticle}`, {
          headers: {
            Authorization: "Bearer " + token,
          },
        })
        .then((foundCommentaires) => {
            this.commentaires = foundCommentaires.data;
            console.log("commentaires", this.commentaires);
            // if (this.commentaires.length = 0) {console.log("youhou")}
            // console.log(this.commentaires.length)
        })
        .catch((e) => {
          console.log(e.response.data.error);
          // this.errors = e.response.data.error;
          console.log(this.commentaires.length)
          console.log(this.commentaires)
        });
    },
    createCommentaire() {
    let user = JSON.parse(localStorage.getItem("user"));
    let token = user.token;
      this.axios
        .post(
          `http://localhost:3000/api/comment/${this.article.id_article}`,
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
          
          this.click = false;
          this.commentaire= ""
          this.message = response.data 
          this.toggleModale()
          this.displayCommentaires()
        })
        .catch((e) => {
          console.log(e);
          this.errors = e;
        });
    },

    deleteCom(index) {
      let user = JSON.parse(localStorage.getItem("user"));
      let token = user.token;
      let $id = this.commentaires[index].id_commentaire;
      const valid = confirm("Voulez vous supprimer ce commentaire ?");
      if (valid) {
        this.axios
          .delete(`http://localhost:3000/api/comment/${$id}`, {
            headers: {
              Authorization: "Bearer " + token,
            },
          })
          .then((response) => {
            console.log(response);
            this.displayCommentaires();
            // this.commentaires.splice()
            console.log(this.commentaires);
            console.log(this.commentaires.length);
            // if(this.commentaires.length == 0) { this.displayCom = false}
            alert(response.data);
          })
          .catch((e) => {
            console.log("log erreur delete", e.response);
            alert(e.response.data);
          });
      }
    },
  }
};
</script>

<style scoped>

a {
  color: black;
  text-decoration: none;
  cursor: pointer;
}
img {
  height: 30em;
  margin: 1em;
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
