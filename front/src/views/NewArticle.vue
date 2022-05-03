<template>
  <div>
    <h1>Créez votre publication ici</h1>
    <form id="new_article" method="post" enctype="multipart/form-data">
      <input
        type="text"
        name="titre"
        id="titre"
        placeholder="Votre titre"
        v-model="titre"
      />
    <editor
      api-key="b7vz3gtuzy2c28rt2axsmshdeh5dfh1vftz3x9tvoqg12057"
      :init="{
        height: 200,
        menubar: false,
      }"
       initial-value=""
       id="editor"
       v-model="text"
       output-format="html" 
    />
      {{ text }}
      <!-- <textarea
        id="article_text"
        name="text"
        rows="5"
        cols="33"
        v-model="text"
      >
      </textarea> -->
      <input id="file" type="file" name="image" v-on:change="fileChange" />
      <p id="error" v-if="errors.length">{{ errors }}</p>
      <button
        type="submit"
        id="btn_submit"
        v-on:click.prevent="createArticle()"
      >
        Publier
      </button>
    </form>
    <Modale :show="show" :toggleModale="toggleModale"/>
  </div>
</template>

<script>
import Modale from "../components/ModaleBox.vue";
// import Editor from "../components/TinyMCE.vue";
import Editor from '@tinymce/tinymce-vue'
export default {
  name: "NewArticle",
  components: {'editor': Editor, Modale },
  data() {
    return {
      titre: "",
      text: "",
      media: "",
      errors: "",
      show: false,
      message: null,
    };
  },
  mounted() {
  const editor = document.getElementById("editor")
  console.log(editor.value);
},
  methods: {
    toggleModale() {
      this.show = !this.show
    },
    fileChange(e) {
      let files = e.target.files || e.dataTransfer.files;
      this.media = files[0];
    },
    createArticle() {
      let user = JSON.parse(localStorage.getItem("user"));
      let token = user.token;
      const data = new FormData();
      // const textEditor = document.getElementById("editor").value
      // console.log(textEditor);
      data.append("titre", this.titre);
      data.append("text", this.text);
      // data.append("text", textEditor);
      data.append("image", this.media);
      if (this.titre.length >= 3 && this.text.length >= 3) {
        this.axios
          .post(`http://localhost:3000/api/article`, data, {
            headers: {
              Authorization: "Bearer " + token,
              'content-Type': "multipart/form-data",
            },
          })
          .then((response) => {
            // modale ne fonctionne pas
            // alert(response.data)
            this.message = response.data
            this.toggleModale()
            this.$router.push({ name: "FilActu" });
          })
          .catch((e) => {
            console.log("erreur", e);
             this.errors = e.response.data.error;
          });
      } else {
        this.errors = "Merçi de remplir tout les champs correctement 🙏";
      }
    },
  },
};
</script>

<style scoped>
h1 {
  text-align: center;
  padding: 0.3em;
}
#new_article {
  padding: 0.5em;
  margin: 1em;
    background: linear-gradient(
    309deg,
    rgba(144, 140, 153, 0.510224158022584) 0%,
    rgba(208, 210, 237, 0.5858544101234244) 29%
  );
  border: 1px solid black;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  /* margin-left: auto;
  margin-right: auto; */
  border-radius: 3em;
  -webkit-box-shadow: 0px 10px 13px -7px #000000,
    5px 5px 15px 5px rgba(0, 0, 0, 0);
  /* box-shadow: 0px 10px 13px -7px #000000, 5px 5px 15px 5px rgba(0, 0, 0, 0); */
  box-shadow: 0.3em 0.3em 8px #a8a7a7;
}
#titre {
  margin: 0.3em;
  padding: 0.5em;
}
#article_text {
  width: 70%;
  padding: 1em;
  margin: 1em;
}
#file {
  margin: 1em;
}

#btn_submit {
  margin: 1em;
  width: 30%;
  appearance: none;
  background-color: transparent;
  border: 2px solid #1a1a1a;
  border-radius: 15px;
  box-sizing: border-box;
  color: #3b3b3b;
  cursor: pointer;
  display: inline-block;
  font-family: Roobert, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica,
    Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  font-size: 16px;
  font-weight: 600;
  line-height: normal;
  margin: 0;
  min-height: 60px;
  min-width: 0;
  outline: none;
  padding: 16px 24px;
  text-align: center;
  text-decoration: none;
  transition: all 300ms cubic-bezier(0.23, 1, 0.32, 1);
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  /* width: 100%; */
  will-change: transform;
}

#btn_submit:disabled {
  pointer-events: none;
}

#btn_submit:hover {
  color: #fff;
  background-color: #1a1a1a;
  box-shadow: rgba(0, 0, 0, 0.25) 0 8px 15px;
  transform: translateY(-2px);
}

#btn_submit:active {
  box-shadow: none;
  transform: translateY(0);
}
#error {
  color: red;
  height: 2em;
}
</style>
