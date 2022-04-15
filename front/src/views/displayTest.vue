<template>
  <div>
    <div id="container">
      <div id="article" v-for="article in articles" :key="article.id">
        <BaseArticle titre="article.titre"/>
      </div>
    </div>
  </div>
</template>

<script>
// import moment from "moment";
// import BtnWhite from "../components/BtnWhite.vue";
import BaseArticle from "../components/BaseArticle.vue";

export default {
  name: "FilActu",
  components: { BaseArticle },
  data() {
    return {
      articles: null,
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

  computed: {
    // findUser() {
    //   // creer requete avec l id user et recupère le pseudo
    //   console.log("find");
    //   return true;
    // },
  },
  created() {
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
        console.log("articles", this.articles);
      })
      .catch((e) => {
        console.log(e);
        this.errors = e;
      });
  },
    // // Recupération des commentaires de l'article
    // this.axios
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
  // },
}
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
