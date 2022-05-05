<template>
    <div id="mod" v-if='article.utilisateurId == userConnect.id'>
      
          <button id="update-btn" v-on:click="showDisplayUpdate()">
            Modifier l'article
          </button>
          <button id="delete-btn" v-on:click="deleteArticle(article.id)">
            Supprimer l'article
          </button>
          <div>Salut</div>
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
          {{ article }}
        </div>
</template>

<script>

export default {
    name: "UpdateArticle",
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
          userConnect : {}
      }
  },
  mounted(){ 
    let user = JSON.parse(localStorage.getItem("user"));
    this.userConnect = user
  console.log(user);
  },
  methods: {
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
          // TODO MODALE 
          this.showUpdate = false;
          alert(res.data);
          this.getArticle() 
        })
        .catch((e) => {
          alert(e.response.data);
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
      confirm("Voulez vous supprimer cet article ?");
      this.axios
        .delete(`http://localhost:3000/api/article/${id}`, {
          headers: {
            Authorization: "Bearer " + token,
          },
        })
        .then((response) => {
        // ajout modale et refresh
          alert(response.data);
            this.getArticles();

          // si sur une autre page renvoyer au fil d'actu
            // this.$router.push({ name: "FilActu" });
        })
        .catch((e) => {
        // modale
          alert(e.response.data);
        });
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
