<template>
  <div>
    <i
      id="btn_update-com"
      class="fa-solid fa-pencil"
      v-if="commentaire.utilisateurId == id ||isAdmin == 1"
      @click="showUpdateCom = !showUpdateCom"
    ></i>
    <i
      id="btn_delete-com"
      class="fa-solid fa-trash-can"
      v-if="commentaire.utilisateurId == id || isAdmin == 1"
      @click="deleteCom(commentaire.id, commentaire.articleId)"
    ></i>
    <div id="com_text">{{ commentaire.text }}</div>
    <p id="com_date">
      Posté le {{ timestamp2(commentaire.createdAt) }} par
      <strong>{{ commentaire.utilisateur.pseudonyme }} </strong>
      <span v-if="commentaire.createdAt != commentaire.updatedAt"
        > | Modifié le {{ timestamp2(commentaire.updatedAt) }}
      </span>
    </p>

    <form
      id="update_com"
      v-if="showUpdateCom"
      @submit.prevent="updateCom(commentaire.id, commentaire.articleId)"
    >
      <textarea
            v-model.trim="commentaireUpdate"
            name="text"
            rows="2"
            cols="33"
          >
          </textarea>
      <input class='submit' type="submit" value="Envoyer" />
    </form>
    <Modale :show="show" :toggleModale="toggleModale" :message="message" />
  </div>
</template>

<script>
import moment from "moment";
import Modale from "./ModaleBox.vue";
export default {
  name: "BaseCommentaire",
  components: { Modale },
  props: {
    commentaire: {
      type: Object,
    },
    index: {
      type: Number,
    },
    getComment: {
      type: Function,
    },
  },
  data() {
    return {
      displayCom: false,
      showUpdateCom: false,
      show: false,
      commentaireUpdate: "",
      message: null,
      id: this.$store.state.id, 
      isAdmin: this.$store.state.isAdmin,
    };
  },
  methods: {
    timestamp2(date) {
      return moment(date).format("DD-MM-YYYY");
    },
    toggleModale() {
      this.show = !this.show;
    },
    updateCom(id, idArticle) {
      let token = localStorage.getItem("token");
      if (this.commentaireUpdate.length >= 3) {
      this.axios
        .put(
          `http://localhost:3000/api/comment/${id}`,
          {
            text: this.commentaireUpdate,
          },
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        )
        .then((response) => { 
          this.commentaireUpdate = "";
          this.message = response.data;
          this.toggleModale();
          setTimeout(() => {
            this.getComment(idArticle)           
          }, 300);
        })
        .catch((e) => {
          console.log("erreur updateCom", e.response);
          this.message = e.response.data.error;
          this.toggleModale();
        });
      } else {
        this.message = "3 caractères minimum 🙏";
        this.toggleModale();
      }
    },
    deleteCom(id, idArticle) {
      let token = localStorage.getItem("token");
      const valid = confirm("Voulez vous supprimer ce commentaire ?");
      if (valid) {
        this.axios
          .delete(`http://localhost:3000/api/comment/${id}`, {
            headers: {
              Authorization: "Bearer " + token,
            },
          })
          .then((response) => {
            this.message = response.data;
            this.toggleModale();
            setTimeout(() => {
              this.getComment(idArticle) 
              // this.$emit('updateCom', this.commentaire);   
          }, 300);
          })
          .catch((e) => {
            console.log("erreur deleteCom", e);
            this.message = e.response.data;
            this.toggleModale();
          });
      }
    },
  },
};
</script>

<style scoped>
#update_com {
  border: solid #a8a7a7 2px;
  background: var(--gradiant);
  border-radius: 0.5em;
  padding: 0.3em;
  margin: 0.2em;
  display: flex;
  justify-content: center;
}
#btn_delete-com,
#btn_update-com {
  cursor: pointer;
  border: var(--color-secondary) solid 1px;
  border-radius: 50%;
  padding: 0.3em;
  margin: 0.3em;
  color: #3b3b3b;
}
#btn_delete-com:hover,
#btn_update-com:hover {
  color: var(--color-secondary);
  transform: scale(1.1)
}
#btn_delete-com:active,
#btn_update-com:active {
  transform: scale(1);
}
#com_text {
  font-weight: bold;
  margin: 0.1em;
  padding-top: 0.3em;
}
#com_date {
  font-size: smaller;
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
</style>
