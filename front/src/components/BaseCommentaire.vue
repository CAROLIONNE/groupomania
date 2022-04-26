<template>
  <div>
    <div id="com_text">{{ commentaire.text }}</div>
    <p id="com_date">Posté il y a {{ timestamp(commentaire.date_crea) }} par {{ getUser(commentaire.id_user) }} {{ author }} <span v-if="commentaire.date_crea != commentaire.date_mod">, Modifié le {{ timestamp2(commentaire.date_mod) }} </span>
    </p>
        
            <i
      id="btn_delete-com"
      class="fa-solid fa-trash-can"
      @click="deleteCom(commentaire.id_commentaire, commentaire.id_article)"
    ></i>
    <i id="btn_update-com" class="fa-solid fa-pencil" @click="showUp()"></i>
    <form
      id="update_com"
      v-if="showUpdateCom"
      @submit.prevent="updateCom(commentaire.id_commentaire, commentaire.id_article)"
    >
      <label for="text">Texte : </label>
      <input type="text" v-model.trim="commentaireUpdate.text" name="text" /><br/>
      <input type="submit" value="Envoyer" />
    </form>
    <Modale :show="show" :toggleModale="toggleModale" :message="message"/>
  </div>
</template>

<script>
import moment from "moment";
import Modale from "./ModaleBox.vue";
export default {
  name: "BaseCommentaire",
  components: {Modale},
  props: {
    commentaire : {
      type: Object
    },
    index : {
        type: Number
    },
    getComment : {
        type: Function
    },
    // user :{
    //     type: Object
    // },
  },
  data() {
      return {
        displayCom: false,
        showUpdateCom: false,
        show: false,
        commentaireUpdate: {},
        message: null,
        author: "",
      }
  },
  methods: {
    timestamp(date) {
      return moment(date, "YYYYMMDD").fromNow();
    },
    timestamp2(date) {
      return moment(date).format("DD-MM-YYYY");
    },
    toggleModale() {
      this.show = !this.show
    },
    showUp() {
      this.showUpdateCom = !this.showUpdateCom;
    },
    // Recupération des pseudonymes
    getUser(idUser) {
    let user = JSON.parse(localStorage.getItem("user"));
    let token = user.token;
      this.axios
        .get(`http://localhost:3000/api/user/${idUser}`, {
          headers: {
            Authorization: "Bearer " + token,
          },
        })
        .then((user) => {
            this.author = user.data.pseudonyme;
        })
        .catch((e) => {
          console.log(e.response.data.error);
          // this.errors = e.response.data.error;
        })
  },
    updateCom(id, id_article) {
      let user = JSON.parse(localStorage.getItem("user"));
      let token = user.token;
        this.axios
          .put(`http://localhost:3000/api/comment/${id}`,
          {
            text : this.commentaireUpdate.text
          }
          , {
            headers: {
              Authorization: "Bearer " + token,
            },
          })
          .then((response) => {
            this.message = response.data
            this.toggleModale()
            this.getComment(id_article);
          })
          .catch((e) => {
            console.log("log erreur update", e);
            alert(e.response.data);
            // console.log(e.response.config.data);
          });
      
    },
    deleteCom(id, id_article) {
      let user = JSON.parse(localStorage.getItem("user"));
      let token = user.token;
      const valid = confirm("Voulez vous supprimer ce commentaire ?");
      if (valid) {
        this.axios
          .delete(`http://localhost:3000/api/comment/${id}`, {
            headers: {
              Authorization: "Bearer " + token,
            },
          })
          .then((response) => {
            alert(response.data);
          this.message = response.data
          this.toggleModale()
          this.getComment(id_article);
          })
          .catch((e) => {
            console.log("log erreur delete", e);
            alert(e.response.data);
            // console.log(e.response.config.data);
          });
      }
    },
  }
}
</script>

<style scoped>
#update_com {
    border: solid #a8a7a7 2px;
      background: linear-gradient(
    309deg,
    rgba(144, 140, 153, 0.510224158022584) 0%,
    rgba(208, 210, 237, 0.5858544101234244) 29%
  );
    /* background: silver; */
    border-radius: 0.5em;
    padding: 0.3em;
    margin: 0.2em;
}
#btn_delete-com {
    position: relative;
    right: -47%;
    top: -1em;
    cursor: pointer;
    border: black solid 1px;
    border-radius: 50%;
    padding: 0.3em;
}
#btn_update-com {
    position: relative;
    right: -36%;
    top: -1em;
    cursor: pointer;
    border: black solid 1px;
    border-radius: 50%;
    padding: 0.3em;
}
#com_text {
        font-weight: bold;
        margin: 0.1em;
        padding-top: 0.3em;
}
#com_date {
    position: relative;
    bottom: -18px;
    font-size: smaller;
}

</style>