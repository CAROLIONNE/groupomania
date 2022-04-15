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
          <!-- <router-link to="/articles" id="ancre_fil_actu">Fil d'actualité</router-link> -->
          <router-link :to="{ name: 'FilActu' }" id="ancre_fil_actu"
            >Fil d'actualité</router-link
          >
        </div>
        <a id="ancre_profil" @click="Profil()" v-if="user">
          Profil
        </a>
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
setTimeout(function () {
  this.logOut();
}, 1800000);

// setTimeout(this.logOut(), 1200000);

export default {
  name: "App",
  data() {
    return {
      user: false,
    };
  },
  computed: {
    //   GetUser2() {
    //     let user = JSON.parse(localStorage.getItem("user"))
    //     if (user) {
    //       return this.user=true
    //     }
    //  },
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
      this.user=false
    },
  },
};
</script>

<style scoped src="@/assets/style.css"></style>
