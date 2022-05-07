<template>
    <div id="mod" v-if='article.utilisateurId == userConnect.userID || userConnect.isAdmin == 1'>
          <button id="update-btn" v-on:click="showDisplayUpdate()">
            Modifier l'article
          </button>
          <button id="delete-btn" v-on:click="deleteArticle(article.id)">
            Supprimer l'article
          </button>
          <form @submit.prevent="update($event, article.id)">
            <fieldset id="container_update" v-if="showUpdate">
              <legend><h2>Modification</h2></legend>
              <!-- Error Unexpected mutation of "article" prop -->
              <!-- <label for="titre">Titre : </label>
              <input type="text" v-model.trim="article.titre" name="titre"/>
              <label for="text">Texte : </label>
              <input type="text" v-model.trim="article.text" name="text"/> -->
              <input
                id="file"
                type="file"
                name="image"
              />
              <input type="submit" value="Sauvegarder" />
            </fieldset>
          </form>
          <Modale :show="show" :toggleModale="toggleModale" :message="message"/>
        </div>
</template>

<script>
import Modale from "../components/ModaleBox.vue";
export default {
    name: "UpdateArticle",
    components: { Modale },
    props: {
    article : {
      type: Object
    },
    refresh : {
        type: Function
    },
  },
  data () {
      return {
        articles: {},
        showUpdate: false,
        userConnect : {},
        show: false,
        message: null,
      }
  },
  mounted(){ 
    let user = JSON.parse(localStorage.getItem("user"));
    this.userConnect = user
  },
  methods: {
    toggleModale() {
      this.show = !this.show
    },
    showDisplayUpdate() {
      this.showUpdate = !this.showUpdate;
    },
    update($event, id) {
      let user = JSON.parse(localStorage.getItem("user"));
      let token = user.token;
      const updatedPost = new FormData($event.target);
      this.axios
        .put(`http://localhost:3000/api/article/${id}`, updatedPost,{
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: "Bearer " + token,
          },
        })
        .then((res) => {
          this.showUpdate = false;
          this.message = res.data;
          this.toggleModale();
          // TODO repasser les données au parent
          // this.getArticles() 
        })
        .catch((e) => {
          this.message = e.response.data;
          this.toggleModale();
        });
    },
    getArticles() {
      let user = JSON.parse(localStorage.getItem("user"));
      let token = user.token;
     this.axios
      .get(`http://localhost:3000/api/article`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((allArticles) => {
        this.articles = allArticles.data;
        console.log("getArticles", this.articles);
      })
      .catch((e) => {
        console.log(e);
      });
    },
    deleteArticle(id) {
      let user = JSON.parse(localStorage.getItem("user"));
      let token = user.token;
    //   let $id = this.$route.params.id;
      const valid = confirm("Voulez vous supprimer cet article ?");
      if (valid) {
        this.axios
        .delete(`http://localhost:3000/api/article/${id}`, {
          headers: {
            Authorization: "Bearer " + token,
          },
        })
        .then((response) => {
        // TO DO refresh
          this.message = response.data;
          this.toggleModale();
          // TODO repasser les données au parent
          this.getArticles();
          // si sur une autre page renvoyer au fil d'actu
          // this.$router.push({ name: "FilActu" });
        })
        .catch((e) => {
          this.message = e.response.data;
          this.toggleModale();
        });
      }
    },
  }
}
</script>

<style scoped>
#container_update {
  padding: 0.5em;
  margin: 0.5em;
}
#container_update > label,
#container_update > input {
  padding: 0.2em;
  margin: 0.2em;
}
</style>
