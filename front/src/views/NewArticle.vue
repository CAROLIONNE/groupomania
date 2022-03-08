<template>
  <div>
    <h1>Créez votre publication ici</h1>
    <div id="new_article">
      <!-- <h2>Titre</h2> -->
      <input
        type="text"
        name="titre"
        id="titre"
        placeholder="Votre titre"
        v-model="titre"
      />
      <textarea id="article_text" name="text" rows="5" cols="33" v-model="text" v-on:click="text=null">
        
      </textarea>
      <input id="file" type="file" />
      <p id="error" v-if="errors.length">{{ errors }}</p>
      <button type="submit" id="btn_submit" v-on:click="createArticle()">
        Publier
      </button>

    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "NewArticle",
  data() {
    return {
      titre: "",
      text: "Ecrivez votre texte ici",
      errors: "",
    };
  },
  methods: {
    createArticle() {
         let userJson = localStorage.getItem('user');
         let user = JSON.parse(userJson);
         let token = user.token;
         if (this.titre.length >= 3 && this.text.length >= 3){
           axios
             .post(`http://localhost:3000/api/article`, {
               titre: this.titre,
               text: this.text,
               // media: ,
             }, {
                headers: {
                   'Authorization': 'Bearer ' + token,
                 },
             })
             .then((response) => {
               console.log("requete ok", response.data);
               this.$router.push({ name: "FilActu" });
             })
             .catch((e) => {
               console.log("log erreur", e.response)
               // console.log(e.response.config.data);
               this.errors = e.response.data.error;
             });

         } else {
           this.errors = 'Fields incomplete min 3 characters'
         }
    },
  },
};
</script>

<style>
h1 {
  text-align: center;
  padding: 1em;
}
#new_article {
  width: 40%;
  background: #a3eeff;
  /* height: 17em; */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-left: auto;
  margin-right: auto;
  border-radius: 3em;
  -webkit-box-shadow: 0px 10px 13px -7px #000000,
    5px 5px 15px 5px rgba(0, 0, 0, 0);
  box-shadow: 0px 10px 13px -7px #000000, 5px 5px 15px 5px rgba(0, 0, 0, 0);
}
#titre {
  margin-top: 1em;
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
