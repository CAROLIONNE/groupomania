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
      this.axios
        .post(`http://localhost:3000/api/user/login`, {
          mail: this.mail,
          mot_psw: this.password,
        })
        .then((response) => {
          let userConnect = response.data;
          response.headers.authorization = userConnect.token
          localStorage.setItem('user', JSON.stringify(userConnect) );
          this.$router.push({ name: "FilActu" });
          this.$store.commit('USER_CONNECT');
          // this.$store.dispatch('fetchUser', userConnect.userID);
        })
        .catch((e) => {
          console.log(e);
          this.errors = e.response.data.error;
        });
    },
  },
};
</script>

<style scoped>
h1 {
  text-align: center;
  padding: 1em;
}
.auth {
  height: 17em;
}
form {
  margin-bottom: 6em;
  padding: 1em;
  display: flex;
  align-items: center;
  background: #a3eeff;
  width: 24em;
  flex-direction: column;
  margin-left: auto;
  margin-right: auto;
  border: black 2px solid;
  border-radius: 20px;
  box-shadow: 0.2em 0.2em 10px #a8a7a7;
  background: rgb(144, 140, 153);
  background: linear-gradient(
    309deg,
    rgba(144, 140, 153, 0.510224158022584) 0%,
    rgba(208, 210, 237, 0.5858544101234244) 29%
  );
}
label {
  margin: 0.5em;
}
#error {
  color: red;
  padding: 0.5em;
}
#mail,
#password {
  padding: 0.5em;
  width: 50%;
}
#mail:focus,
#password:focus {
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
