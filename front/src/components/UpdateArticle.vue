<template>
    <div id="mod" v-if='article.utilisateurId == userConnect.userID || userConnect.isAdmin == 1'>
          <button id="update-btn" v-on:click="showDisplayUpdate()">
            Modifier l'article
          </button>
          <button id="delete-btn" v-on:click="deleteArticle(article.id)">
            Supprimer l'article
          </button>
          <form @submit.prevent="update(article.id)">
            <fieldset id="container_update" v-if="showUpdate">
              <legend><h2>Modification</h2></legend>
              <!-- Error Unexpected mutation of "article" prop -->
              <label for="titre">Titre : </label>
              <input type="text" v-model.trim="article.titre" name="titre"/>
              <!-- <input type="text" v-model.trim=$store.state.article.titre name="titre"/> -->
              <editor
                api-key="b7vz3gtuzy2c28rt2axsmshdeh5dfh1vftz3x9tvoqg12057"
                :init="{
                  height: 150,
                  menubar: false,
                }"
                initial-value=""
                id="editor"
                v-model=article.text
                name="text"
              />
              
              <input
                id="file"
                type="file"
                name="image"
                v-on:change="fileChange"
              />
              <input class="submit" type="submit" value="Sauvegarder" v-on:="$emit('getArticle', article)"/>
            </fieldset>
          </form>
              <!-- <button v-on:click="$emit('getArticle', article)">
                click
              </button> -->
          <Modale :show="show" :toggleModale="toggleModale" :message="message"/>
        </div>
</template>

<script>
import Modale from "../components/ModaleBox.vue";
import Editor from '@tinymce/tinymce-vue'
export default {
    name: "UpdateArticle",
    components: { Modale, Editor },
    props: {
    article : {
      type: Object
    },
    displayContent: {
      type: Boolean
    }
  },
  data () {
      return {
        articles: {},
        showUpdate: false,
        userConnect : {},
        show: false,
        message: null,
        media: "",
        display: this.displayContent
      }
  },
  mounted(){ 
    let user = JSON.parse(localStorage.getItem("user"));
    this.userConnect = user
  },
  methods: {
    fileChange(e) {
      let files = e.target.files || e.dataTransfer.files;
      this.media = files[0];
    },
    toggleModale() {
      this.show = !this.show
    },
    showDisplayUpdate() {
      this.$emit('displayUpdate', this.display)
      this.display = !this.display;
      this.showUpdate = !this.showUpdate;
    },
    update(id) {
      const updatedPost = new FormData();
      updatedPost.append("titre", this.article.titre)
      updatedPost.append("text", this.article.text)
      // updatedPost.append("titre", this.$store.state.article.titre)
      // updatedPost.append("text", this.$store.state.article.text)
      updatedPost.append("image", this.media)
      this.axios
        .put(`http://localhost:3000/api/article/${id}`, updatedPost,{
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: "Bearer " + this.$store.state.user.token,
          },
        })
        .then((res) => {
          this.showUpdate = false;
          this.message = res.data;
          this.toggleModale();
          // refresh
          setTimeout(() => {
            this.$store.dispatch("fetchArticles")  
          }, 800);
          ///////
          // this.$store.dispatch("updateArticle", id) 
          // TODO repasser les données au parent
        })
        .catch((e) => {
          this.message = e.response.data;
          this.toggleModale();
        });
    },
    deleteArticle(id) {
      // let user = JSON.parse(localStorage.getItem("user"));
      // let token = user.token;
      const valid = confirm("Voulez vous supprimer cet article ?");
      if (valid) {
        this.axios
        .delete(`http://localhost:3000/api/article/${id}`, {
          headers: {
            Authorization: "Bearer " + this.$store.state.user.token,
          },
        })
        .then((response) => {
          this.message = response.data;
          this.toggleModale();
          // refresh ne fonctionne pas
          setTimeout(() => {
            this.$store.dispatch("fetchArticles")  
          }, 1000);
          // TODO repasser les données au parent
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
.submit{
  cursor: pointer;
}
</style>
