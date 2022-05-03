<template>
  <div id="app">
    <nav id="nav" v-if="GetUser()">
      <router-link :to="{ name: 'FilActu' }" class="logo" v-if="user">
        <img
          id="img_logo"
          src="./assets/icon-left-font-monochrome-white.svg"
          alt="logo de groupomania"
        />
      </router-link>
      <div id="navigation">
        <div id="fil_actu" v-if="user">
          <router-link :to="{ name: 'FilActu' }" id="ancre_fil_actu"
            >Fil d'actualité</router-link
          >
        </div>
        <a id="ancre_profil" @click="Profil()" v-if="user"> Profil </a>
        <a id="ancre_logout" @click="logOut()">Deconnexion</a>
      </div>
    </nav>
   
    <nav id="nav" v-else>
      <router-link to="/" class="logo" v-if="!user">
        <img
          id="img_logo"
          src="./assets/icon-left-font-monochrome-white.svg"
          alt="logo de groupomania"
        />
      </router-link>
      <div id="authentification" v-if="!user">
        <div id="inscription">
          <router-link to="/inscription" id="ancre_inscription"
            >Inscription</router-link
          >
        </div>
        <div id="connexion">
          <router-link to="/" id="ancre_connexion">Connexion</router-link>
        </div>
      </div>
    </nav>
    <router-view />
  </div>
</template>

<script>
// deconnexion auto au bout de 30 minutes
// setTimeout(function () {
//   this.logOut();
// }, 1800000);

// setTimeout(function () {
//       localStorage.clear();
//       // this.$router.push({ name: "Connect" });
//       window.location.href
//       this.user=false
// }, 1800000);


export default {
  name: "App",

  data() {
    return {
      user: false,
    };
  },
  mounted() {
    // // tentative de requete pour token valide
    // if (localStorage.getItem("user")){
    // let user = JSON.parse(localStorage.getItem("user");
    // this.axios
    //   .get("http://localhost:3000/api/user/auth", {
    //     headers: {
    //       Authorization: `Bearer ${user.token}`,
    //     },
    //   })
    //   .then((res) => {
    //     console.log(res);
    //     localStorage.setItem('token', 'valid' );
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //     localStorage.clear();
    //     this.$router.push({ name: "Connect" });
    //     this.user = false;
    //   });
    // } else {
    //     localStorage.clear();
    //     this.user = false;
    //     this.$router.push({ name: "Connect" });
    // }

    // ----------------
    // if (error.response.status === 401) {
    //   this.$router.push({ name: "Connect" });
    // }
  },
  methods: {
    Profil() {
      let user = JSON.parse(localStorage.getItem("user"));
      let id = user.userID;
      if (user) {
        this.$router.push({ name: "DisplayProfil", params: { id } });
      }
    },
    GetUser() {
      let user = JSON.parse(localStorage.getItem("user"));
      if (user) return (this.user = true);
    },
    logOut() {
      localStorage.clear();
      this.$router.push({ name: "Connect" });
      this.user = false;
    },
  },
};
</script>

<style scoped src="@/assets/style.css"></style>
