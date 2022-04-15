<template>
  <div>
    <div id="container">
      <div id="article">
        <h1>{{ article.titre }}</h1>
        <!-- TO DO afficher seulement si c'est l'utilisateur qui l'a crée -->
        <div id="mod">
          <button id="update-btn" v-on:click="show()">
            Modifier l'article
          </button>
          <button id="delete-btn" v-on:click="deleteArticle()">
            Supprimer l'article
          </button>
          <form @submit.prevent="updateAll($event, article.id)">
            <fieldset id="container_update" v-if="showUpdate">
              <legend><h2>Modification</h2></legend>
              <label>Titre : </label>
              <input type="text" v-model.trim="article.titre" />
              <label>Texte : </label>
              <input type="text" v-model.trim="article.text" />
              <input
                id="file"
                type="file"
                name="image"
              />
              <!-- <input type="submit" name="image" v-on:click="updateImage()" /> -->
              <!-- <input type="submit" value="Sauvegarder" @click="update()" /> -->
              <input type="submit" value="Sauvegarder" />
              <p class="error" v-if="errors">{{ errors }}</p>
              <p class="valid" v-if="valid">{{ valid }}</p>
            </fieldset>
          </form>
        </div>
        <img id="article_img" :src="article.media" v-if="article.media" />
        <!-- <form id="new_article" method="put" enctype="multipart/form-data"> -->
        <!-- <form enctype="multipart/form-data" > -->
        <!-- </form> -->
        <p id="article_text">{{ article.text }}</p>
        <p id="article_author">
          Créé par {{ article.id_user }}, le {{ timestamp2(article.date_crea) }}
        </p>
        <div id="btn">
          <!-- <button id="btn_new_com" @click="displayNewComment()">
            Commenter
          </button> -->
          <BtnWhite
            id="btn_new_com"
            nom="Commenter"
            @click="displayNewComment()"
          />
          <BtnWhite
            id="btn_coms"
            v-on:click="displayComment()"
            v-if="commentaires"
            nom="Commentaire"
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
            <!-- TO DO recupérer pseudonyme avec ID findUser()-->
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
import BtnWhite from "../components/BtnWhite.vue";

export default {
  name: "FilActu",
  components: { BtnWhite },
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
    };
  },
  // watch: {
  //   commentaire: function (val){
  //     console.log(val);
  //   }
  // },
  computed: {
    findUser() {
      // creer requete avec l id user et recupère le pseudo
      console.log("find");
      return true;
    },
    // getComment() {
    // // Recupération des commentaires de l'article
    // let user = JSON.parse(localStorage.getItem("user"));
    // let token = user.token;
    // let $id = this.$route.params.id;
    // return this.axios
    //   .get(`http://localhost:3000/api/comment/${$id}`, {
    //     headers: {
    //       Authorization: "Bearer " + token,
    //     },
    //   })
    //   .then((allCommentaires) => {
    //     this.commentaires = allCommentaires.data;
    //     console.log(this.commentaires);
    //   })
    //   .catch((e) => {
    //     console.log("mounted", e);
    //     this.errors = e;
    //   });
    // }
  },
  created() {
    let user = JSON.parse(localStorage.getItem("user"));
    let token = user.token;
    let $id = this.$route.params.id;
    // Récupération des données de l'article
    this.axios
      .get(`http://localhost:3000/api/article/${$id}`, {
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
          (this.article.date_crea = article.data.articleFound.date_crea);
      })
      .catch((e) => {
        this.errors = e;
        console.log(e);
      });
    // Recupération des commentaires de l'article
    this.axios
      .get(`http://localhost:3000/api/comment/${$id}`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((allCommentaires) => {
        this.commentaires = allCommentaires.data;
        console.log(this.commentaires);
      })
      .catch((e) => {
        console.log("mounted", e);
        this.errors = e;
      });
  },

  methods: {
    displayComment() {
      this.displayCom = true;
    },
    timestamp(date) {
      return moment(date, "YYYYMMDD").fromNow();
    },
    timestamp2(date) {
      return moment(date).format("DD-MM-YYYY");
    },
    show() {
      this.showUpdate = true;
    },
    updateAll($event, id) {
      let user = JSON.parse(localStorage.getItem("user"));
      let token = user.token;
      const updatedPost = new FormData($event.target);
      // updatedPost.append(titre, this.article.titre)
      console.log(updatedPost);
      console.log($event.target);
      console.log(this.article.titre);
      this.axios
        .put(`http://localhost:3000/api/article/${id}`, updatedPost, {
          headers: {
            'Content-type': 'application/json',
            // "content-Type": "multipart/form-data",
            Authorization: "Bearer " + token,
          },
        })
        .then((res) => {
          alert(res.data);
          // console.log(res);
        })
        .catch((e) => {
          console.log(e);
          // this.errors = e;
        });
    },
    update() {
      let user = JSON.parse(localStorage.getItem("user"));
      let token = user.token;
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
          this.showUpdate = false;
          this.valid = response.data;
        })
        .catch((e) => {
          console.log("log erreur", e.response.data);
          // console.log(e.response.config.data);
          this.errors = e.response.data;
        });
    },
    updateImage() {
      let $id = this.$route.params.id;
      let user = JSON.parse(localStorage.getItem("user"));
      let token = user.token;
      const data = new FormData();
      data.append("image", this.media);
      console.log(data);
      console.log(this.media);
      if (this.media) {
        this.axios
          .put(`http://localhost:3000/api/article/image/` + $id, data, {
            headers: {
              Authorization: "Bearer " + token,
              "content-Type": "multipart/form-data",
            },
          })
          .then((response) => {
            this.article.media = this.media;
            alert(response.data);
          })
          .catch((e) => {
            console.log("log erreur", e);
            alert(e.response.data);
            // console.log(e.response.config.data);
            //  this.errors = e.response.data.error;
          });
      }
    },
    deleteArticle() {
      let user = JSON.parse(localStorage.getItem("user"));
      let token = user.token;
      let $id = this.$route.params.id;
      confirm("Voulez vous supprimer cet article ?");
      this.axios
        .delete(`http://localhost:3000/api/article/` + $id, {
          headers: {
            Authorization: "Bearer " + token,
          },
        })
        .then((response) => {
          alert(response.data);
          this.$router.push({ name: "FilActu" });
        })
        .catch((e) => {
          alert(e.response.data);
          // console.log(e.response.config.data);
        });
    },
    // fileChange(e) {
    //   let files = e.target.files || e.dataTransfer.files;
    //   this.media = files[0];
    //   console.log(this.media);
    // },
    displayNewComment() {
      this.click = true;
    },
    createCommentaire() {
      let user = JSON.parse(localStorage.getItem("user"));
      let token = user.token;
      if (
        this.commentaire.titre.length >= 3 &&
        this.commentaire.text.length >= 3
      ) {
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
            this.click = false;
            alert(response.data);
          })
          .catch((e) => {
            console.log(e);
            this.errors = e;
          });
      } else {
        this.errors = "Fields incomplete min 3 characters";
      }
    },
    deleteCom(index) {
      let user = JSON.parse(localStorage.getItem("user"));
      let token = user.token;
      let $id = this.commentaires[index].id_commentaire;
      const valid = confirm("Voulez vous supprimer ce commentaire ?");
      if (valid) {
        this.axios
          .delete(`http://localhost:3000/api/comment/` + $id, {
            headers: {
              Authorization: "Bearer " + token,
            },
          })
          .then((response) => {
            alert(response.data);
            window.location.reload();
          })
          .catch((e) => {
            console.log("log erreur", e.response.data);
            // console.log(e.response.config.data);
            this.errors = e.response.data;
          });
      }
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
