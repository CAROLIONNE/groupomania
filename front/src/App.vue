<template>
  <div id="app">
    {{ $store.state.user }}
    <nav id="nav" v-if="$store.state.user == true">
      <router-link
        :to="{ name: 'FilActu' }"
        class="logo"
        v-if="$store.state.user == true"
      >
        <img
          id="img_logo"
          src="./assets/icon-left-font-monochrome-white.svg"
          alt="logo de groupomania"
        />
      </router-link>
      <div id="navigation">
        <div id="fil_actu">
          <router-link :to="{ name: 'FilActu' }" id="ancre_fil_actu"
            >Fil d'actualité</router-link
          >
        </div>
        <a id="ancre_profil" @click="Profil()"> Profil </a>
        <a id="ancre_logout" @click="logOut()">Deconnexion</a>
      </div>
    </nav>

    <nav id="nav" v-if="$store.state.user == false">
      <router-link to="/" class="logo" v-if="$store.state.user == false">
        <img
          id="img_logo"
          src="./assets/icon-left-font-monochrome-white.svg"
          alt="logo de groupomania"
        />
      </router-link>
      <div id="authentification">
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
export default {
  name: "App",
  mounted() {
  //   // tentative de requete pour token valide
  //   if (localStorage.getItem("user")) {
  //     let user = JSON.parse(localStorage.getItem("user"));
  //     this.axios
  //       .get("http://localhost:3000/api/user/auth", {
  //         headers: {
  //           Authorization: `Bearer ${user.token}`,
  //         },
  //       })
  //       .then((res) => {
  //         console.log(res);
              // this.$store.commit("USER_CONNECT");
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //         localStorage.clear();
  //         this.$store.commit("USER_DISCONNECT");
  //         this.$router.push({ name: "Connect" });
  //       });
  //   } else {
  //     localStorage.clear();
  //     this.$store.commit("USER_DISCONNECT");
  //     this.$router.push({ name: "Connect" });
  //   }

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
    logOut() {
      localStorage.clear();
      this.$router.push({ name: "Connect" });
      this.$store.commit("USER_DISCONNECT");
    },
  },
};
</script>

<style scoped src="@/assets/style.css"></style>
