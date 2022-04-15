<template>
  <div>
    <h1>{{ titre }}</h1>
    <!-- TO DO afficher UpdateArticle.vue si c'est l'utilisateur qui l'a créer -->
    <img id="article_img" :src="article.media" v-if="article.media" />
    <p id="article_text">{{ text }}</p>
    <p id="article_author">Créé par {{ user }}, le {{ date }}</p>
    <!-- <div id="btn">
          <button id="btn_new_com" @click="displayNewComment()">
            Commenter
          </button>
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
        </div> -->
    <!-- <div class="new_com" v-if="click">
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
        </div> -->

    <!-- <div id="container_comments" v-if="displayCom">
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
            TO DO recupérer pseudonyme avec ID findUser()
            <p class="error" v-if="errors">
              {{ errors }}
            </p>
          </div>
        </div> -->
  </div>
</template>

<script>
export default {
  name: "BaseArticle",
  props: {
    titre: {
      type: String,
    },
    text: {
      type: String,
    },
    user: {
      type: String,
      Number,
    },
    date: {
      type: Number,
    },
  },
};
</script>
