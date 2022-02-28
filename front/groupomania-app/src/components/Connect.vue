<template>
  <div class="auth">
    <h1>Page de connexion</h1>
    <form>
      <label>Mail</label><input v-model="mail" placeholder="mail" /><br/>
      <label>Mot de passe</label>
      <input type="password" v-model="password" placeholder="mot de passe" />
    </form>
    <br>
    <button>Envoyer</button>
  </div>
</template>

<script>
export default {
  name: "ConnectUser",
  data() {
    return {
      msg: "Welcome to Your Vue.js App"
    };
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1 {
    text-align: center;
}
form {
    text-align: center;
    display: inline-grid;
}
</style>
