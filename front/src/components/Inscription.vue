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
      <label for="mail">Mail:</label>
      <input v-model="mail" placeholder="mail" /><br />
      <label for="mot de passe">Mot de passe:</label>
      <input type="password" v-model="password" placeholder="mot de passe" /><br/>
      <label for="pseudonyme">Pseudonyme:</label>
      <input type="text" v-model="pseudonyme" placeholder="pseudonyme" />
    <div id="submit_form">
    <p id="error" v-if="errors.length"> {{ errors }} </p>
     <!-- redirection vers fil d'actualité -->
    <input type="submit" v-on:click="signUp()" value="Envoyer"/>
    </div>
    </form>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: "InscriptionUser",
  data() {
    return {
      msg: "Pour une meilleure ambiance au travail",
      mail: '',
      password: '',
      pseudonyme: '',
      errors: ''
    };
  },
  methods: {
    signUp() {
      // this.errors = '';
      axios.post(`http://localhost:3000/api/user/signup`, {
        mail: this.mail,
        mot_psw: this.password,
        pseudonyme: this.pseudonyme
      })
      // .then(res => {
      //  this.valid = res.data
      //   })
      .catch(e => {
        this.errors = e.response.data.error
      })
    }
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
#error {
  color:red;
  padding: 0.5em;
}
#valid {
  color:green;
}
form {
  display: grid;
  gap: 0.5em;
  position: absolute;
  top: 9em;
  right:8em;
  background: black;
  color:white;
  opacity: 0.9;
  padding:1em;
  border-radius: 1em;
}
input:focus {
   border: 3px solid #a3eeff;
}
</style>
