<template>
  <div class="auth">
    <h1>Page de connexion</h1>
    <form>
      <label >Mail</label>
      <input v-model="mail" placeholder="mail" /><br/>
      <label>Mot de passe</label>
      <input type="password" v-model="password" placeholder="mot de passe" />
    </form>
    <br>
    <p id="error" v-if="errors.length"> {{ errors }} </p>
    <input type="submit" v-on:click="login()" value="Valider"/>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: "ConnectUser",
  data() {
    return {
      msg: "Welcome to Your Vue.js App",
      mail: '',
      password: '',
      errors: '',
    };
  },
  methods: {
        login() {
      axios.post(`http://localhost:3000/api/user/login`, {
        mail: this.mail,
        mot_psw: this.password,
      })
      .then(response => {console.log(response.data)})
      .then( () => {alert("authentification OK => redirection")})
      .catch(e => {
        // alert(e.response.data.error)
        this.errors = e.response.data.error
        // this.errors.push(e)
      })
    }
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
#error {
  color:red;
}
</style>
