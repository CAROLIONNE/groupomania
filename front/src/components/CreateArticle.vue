<template>
  <div>
    <div class="newArticle">
      <textarea id="articleText" name="text" rows="5" cols="33">
        Ecrivez votre texte ici
      </textarea>
      <input type="file" />
      <button type="submit" class="createArticle">Publier</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "CreateArticle",
  data() {
    return {
      msg: "",
    };
  },
  methods: {},
};
</script>
