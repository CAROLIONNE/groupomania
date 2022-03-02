<template>
  <div class="auth">
    <h1>Page de connexion</h1>
    <form>
      <label for="mail">Mail :</label>
      <input id="mail" v-model="mail" placeholder="mail" /><br/>
      <label for="mot de passe">Mot de passe :</label>
      <input id="password" type="password" v-model="password" placeholder="mot de passe" />
    <br>
    <p id="error" v-if="errors.length"> {{ errors }} </p>
    <input id="valid_form" type="submit" v-on:click="login()" value="Valider"/>
    </form>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: "ConnectUser",
  data() {
    return {
      mail: '',
      password: '',
      errors: '',
      idUser:'',
    };
  },
  methods: {
        login() {
      axios.post(`http://localhost:3000/api/user/login`, {
        mail: this.mail,
        mot_psw: this.password,
      })
      .then(response => {
        console.log(response.data);
        this.idUser = response.data.userID;
        this.$router.push({ name: "Fil"})
        })
      // .then( () => {alert("authentification OK => redirection")})
      // .then( () => {
      // }
      // )
      .catch(e => {
        console.log(e)
        this.errors = e.response.data.error
      })
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1 {
    text-align: center;
    padding:1em;
}
.auth{
  height: 17em;
}
form {
    text-align: center;
    padding: 1em;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1em;
}
#error {
  color:red;
}
/* #valid_form {
padding: 0.5em;
} */
input {
padding: 0.5em;
}
#mail:focus, #password:focus {
/* background: #a3eeff; */
border: 3px solid #a3eeff
}
</style>
