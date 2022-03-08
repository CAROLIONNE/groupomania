<template>
  <div class="auth">
    <h1>Page de connexion</h1>
    <form>
      <label for="mail">Mail :</label>
      <input id="mail" v-model="mail" placeholder="mail" /><br />
      <label for="mot de passe">Mot de passe :</label>
      <input
        id="password"
        type="password"
        v-model="password"
        placeholder="mot de passe"
      />
      <br />
      <p id="error" v-if="errors.length">{{ errors }}</p>
      <input
        id="valid_form"
        type="submit"
        v-on:click="login()"
        value="Valider"
      />
    </form>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "ConnectUser",
  data() {
    return {
      mail: "",
      password: "",
      errors: "",
    };
  },
  methods: {
    login() {
      axios
        .post(`http://localhost:3000/api/user/login`, {
          mail: this.mail,
          mot_psw: this.password,
        })
        .then((response) => {
          let userConnect = response.data;
          console.log(response);
          localStorage.setItem('user', JSON.stringify(userConnect) );
          response.headers.authorization = userConnect.token
          this.$router.push({ name: "FilActu" });
        })
        .catch((e) => {
          console.log(e);
          this.errors = e.response.data.error;
        });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1 {
  text-align: center;
  padding: 1em;
}
.auth {
  height: 17em;
}
form {
  /* text-align: center; */
  padding: 1em;
  display: flex;
  /* justify-content: center; */
  align-items: center;
  background: #a3eeff;
  width: 24em;
  flex-direction: column;
  border-radius: 2em;
  margin-left: auto;
  margin-right: auto;
  border: black 3px solid;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
}
label {
  margin: 0.5em;
}
#error {
  color: red;
  height: 2em;
}

#mail,
#password {
  padding: 0.5em;
  width: 50%;
}
#mail:focus,
#password:focus {
  /* background: #a3eeff; */
  border: 3px solid #a3eeff;
}
#valid_form {
  width: 30%;
  appearance: none;
  background-color: transparent;
  border: 2px solid #1a1a1a;
  border-radius: 15px;
  box-sizing: border-box;
  color: #3b3b3b;
  cursor: pointer;
  display: inline-block;
  font-family: Roobert, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica,
    Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  font-size: 16px;
  font-weight: 600;
  line-height: normal;
  margin: 1em;
  min-height: 60px;
  min-width: 0;
  outline: none;
  padding: 16px 24px;
  text-align: center;
  text-decoration: none;
  transition: all 300ms cubic-bezier(0.23, 1, 0.32, 1);
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  /* width: 100%; */
  will-change: transform;
}

#valid_form:disabled {
  pointer-events: none;
}

#valid_form:hover {
  color: #fff;
  background-color: #1a1a1a;
  box-shadow: rgba(0, 0, 0, 0.25) 0 8px 15px;
  transform: translateY(-2px);
}

#valid_form:active {
  box-shadow: none;
  transform: translateY(0);
}
</style>
