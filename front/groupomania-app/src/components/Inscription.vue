<template>
  <div class="auth">
    <div class="image">
      <img
        id="img_reunion"
        src="../assets/reunion.jpg"
        alt="Reseau social d'entreprise"
      />
    </div>
    <h1>Inscrivez-vous des maintenant !</h1>
    <h2>{{ msg }}</h2>
    <form>
      <label>Mail:</label>
      <input v-model="mail" placeholder="mail" /><br />
      <label>Mot de passe:</label>
      <input type="password" v-model="password" placeholder="mot de passe" />
    </form>
    // redirection vers fil d'actualité
    <button type="submit">Envoyer</button>
  </div>
</template>

<script>
export default {
  name: "InscriptionUser",
  data() {
    return {
      msg: "Pour une meilleure ambiance au travail"
    };
  },
  methods: {
    
  }
  
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1 {
  position: absolute;
  top: 10rem;
  background: white;
  opacity: 0.8;
  padding: 1rem;
  margin-left: 2em
}
h2 {
  position: absolute;
  top: 5rem;
  background: white;
  opacity: 0.8;
  padding: 1rem;
  margin-left: 1em
}
#img_reunion {
  max-width: 100%;
}
</style>
