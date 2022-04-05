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
    <h2>{{ intro }}</h2>
    <form>
      <label for="mail">Mail :</label>
      <input v-model="mail" placeholder="mail" /><br />
      <label for="mot de passe">Mot de passe :</label>
      <input type="password" v-model="password" placeholder="mot de passe" /><br/>
      <label for="pseudonyme">Pseudonyme :</label>
      <input type="text" v-model="pseudonyme" placeholder="pseudonyme" />
    <div id="submit_form">
    <p id="error" v-if="errors.length"> {{ errors }} </p>
    <input id ="btn_submit" type="submit" v-on:click="signUp()" value="Envoyer"/>
    </div>
    </form>
  </div>
</template>

<script>
export default {
  name: "InscriptionUser",
  data() {
    return {
      intro: "Pour une meilleure ambiance au travail",
      mail: '',
      password: '',
      pseudonyme: '',
      errors: ''
    };
  },
  methods: {
    signUp() {
      this.axios.post(`http://localhost:3000/api/user/signup`, {
        mail: this.mail,
        mot_psw: this.password,
        pseudonyme: this.pseudonyme
      })
      .then((response) => {
          let userConnect = response.data;
          localStorage.setItem('user', JSON.stringify(userConnect) );
          response.headers.authorization = userConnect.token
          this.$router.push({ name: "FilActu" });
      })
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
  /* gap: 0.5em; */
  position: absolute;
  top: 6em;
  right:4em;
  background: black;
  color:white;
  opacity: 0.8;
  padding:1em;
  border: 3px solid;
  border-radius: 1em;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px;
}
input {
  margin: 1em;
  padding: 0.5em;
}
input:focus {
   border: 3px solid #a3eeff;
}
/* #btn_submit {
  width:100%;
  
} */


/* CSS */
#btn_submit {
  margin-left: auto;
  margin-right: auto;
  width:100%;
  background-color: #fff;
  border: 0 solid #e2e8f0;
  border-radius: 1.5rem;
  box-sizing: border-box;
  color: #0d172a;
  cursor: pointer;
  display: inline-block;
  font-family: "Basier circle",-apple-system,system-ui,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji";
  font-size: 1.1rem;
  font-weight: 600;
  line-height: 1;
  padding: 1rem 1.6rem;
  text-align: center;
  text-decoration: none #0d172a solid;
  text-decoration-thickness: auto;
  transition: all .1s cubic-bezier(.4, 0, .2, 1);
  box-shadow: 0px 1px 2px rgba(166, 175, 195, 0.25);
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
}

#btn_submit:hover {
  background-color: #1e293b;
  color: #fff;
}

@media (min-width: 768px) {
  #btn_submit {
    font-size: 1.125rem;
    padding: 1rem 2rem;
  }
}
</style>
