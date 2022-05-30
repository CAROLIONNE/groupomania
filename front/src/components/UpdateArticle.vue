<template>
    <div id="mod" v-if='article.utilisateurId == userConnect.userID || userConnect.isAdmin == 1'>
          <div id="btn">
          <button id="update-btn" v-on:click="showDisplayUpdate()">
            Modifier l'article
          </button>
          <!-- icone version mobile -->
          <i class="fa-solid fa-pencil" v-on:click="showDisplayUpdate()"></i>
          <button id="delete-btn" v-on:click="deleteArticle(article.id)">
            Supprimer l'article
          </button>
          <!-- icone version mobile -->
          <i class="fa-solid fa-trash-can" v-on:click="deleteArticle()"></i>
          </div>
          <form @submit.prevent="update(article.id)">
            <fieldset id="container_update" v-if="showUpdate">
              <legend><h2>Modification</h2></legend>
              <label for="titre">Titre : </label>
              <input type="text" v-model.trim="article.titre" name="titre"/>
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
              <br />
              <input class="submit" type="submit" value="Sauvegarder" v-on:="$emit('getArticle', article)"/>
            </fieldset>
          </form>
          <Modale :show="show" :toggleModale="toggleModale" :message="message"/>
        </div>
</template>

<script>
import Modale from "../components/ModaleBox.vue";
import Editor from '@tinymce/tinymce-vue'
import { mapGetters } from 'vuex'
export default {
    name: "UpdateArticle",
    components: { Modale, Editor },
    props: {
    idArticle: {
      type: Number
    },
    displayContent: {
      type: Boolean
    }
  },
  data () {
      return {
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
    computed: {
    ...mapGetters(["getArticleById"]),
    article () {
      return this.getArticleById(this.idArticle)
    }
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
      this.display = !this.display;
      this.$emit('displayUpdate', this.display);
      this.showUpdate = !this.showUpdate;
    },
    update(id) {
      let token = localStorage.getItem("token");
      const updatedPost = new FormData();
      updatedPost.append("titre", this.article.titre)
      updatedPost.append("text", this.article.text)
      updatedPost.append("image", this.media)
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
          // Mise a jour du store
          setTimeout(() => {
            this.$store.dispatch("fetchArticles")  
          }, 500);
          this.display = !this.display;
          this.$emit('displayUpdate', this.display);
        })
        .catch((e) => {
          this.message = e.response.data;
          this.toggleModale();
        });
    },
    deleteArticle(id) {
      let token = localStorage.getItem("token");
      const valid = confirm("Voulez vous supprimer cet article ?");
      if (valid) {
        this.axios
        .delete(`http://localhost:3000/api/article/${id}`, {
          headers: {
            Authorization: "Bearer " + token,
          },
        })
        .then((response) => {
          this.message = response.data;
          this.toggleModale();
          setTimeout(() => {
            this.$store.dispatch("fetchArticles")  
          }, 1000);
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
#btn {
  display: flex;
  justify-content: center;
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

input {
  cursor: pointer;
}
.submit {
  background-color: white;
  color: black;
  border: 2px solid #555555;
}
.submit:hover {
  background-color: #555555;
  color: white;
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
