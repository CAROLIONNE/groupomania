<template>
    <div class="new_com" > 
        <h2>Titre :</h2>
        <input type="text" class="commentTitle" v-model="commentaire.titre">
      <h2>Texte :</h2> 
              <textarea id="commentText" v-model="commentaire.text" name="text" rows="5" cols="33">
        Ecrivez votre commentaire ici
      </textarea>
      <input type="submit" class="submit_com" v-on:click="createCommentaire()" value="Commenter" />
      </div>
</template>
<script>
export default {
  name: "CreateCom",
  methods: {
    
  },
};
</script>