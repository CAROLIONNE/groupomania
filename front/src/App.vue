<template>
  <div id="app">
    <nav id="nav">
      <router-link to="/" id="ancre_accueil">
        <img
          id="img_logo"
          src="./assets/icon-left-font-monochrome-white.svg"
          alt="logo de groupomania"
        />
      </router-link>
      <div id="navigation">
        <div id="authentification" v-if="!userConnect">
          <div id="inscription">
            <router-link to="/inscription" id="ancre_inscription"
              >Inscription</router-link
            >
          </div>
          <div id="connexion">
            <router-link to="/" id="ancre_connexion">Connexion</router-link>
          </div>
        </div>
        <div id="fil_actu" v-if="userConnect">
          <!-- <router-link to="/articles" id="ancre_fil_actu">Fil d'actualité</router-link> -->
          <router-link :to="{ name: 'FilActu' }" id="ancre_fil_actu">Fil d'actualité</router-link>
        </div>
        <a id="ancre_profil" @click="Profil()" v-if="userConnect">
          Profil
          <!-- <div id="profil"> -->
          <!-- <router-link id="ancre_profil" :to="{ name: 'DisplayProfil', params: { id } }">Profil</router-link> -->
        </a>
        <a id="ancre_logout" @click="logOut()" v-if="userConnect">Deconnexion</a>
      </div>
    </nav>
    <router-view />
  </div>
</template>

<script>
// deconnexion auto au bout de 20 minutes
setTimeout(function () {
      localStorage.clear();
      window.location = "/"
      // this.$router.push({ name: "Connect" });
  }, 1200000); 

// setTimeout(logOut(), 1200000); 

export default {
  name: "App",
   data() {
    return {
      userConnect: localStorage.getItem("user")
    };
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
    },
  },
};
</script>

<style scoped src="@/assets/style.css"></style>
