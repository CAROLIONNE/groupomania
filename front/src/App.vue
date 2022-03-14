<template>
  <div id="app">
    <nav class="nav" id="nav">
      <router-link to="/" id="ancre_accueil"><img
        id="img_logo"
        src="./assets/icon-left-font-monochrome-white.svg"
        alt="logo de groupomania"
      /></router-link
          >
      <div class="authentification">
        <div id="inscription">
          <router-link to="/inscription" id="ancre_inscription">Inscription</router-link
          >
        </div>
        <div id="connexion">
          <router-link to="/" id="ancre_connexion">Connexion</router-link>
        </div>
        <div id="fil_actu">
          <router-link to="/articles" id="ancre_fil_actu">Fil d'actualité</router-link>
        </div>
        <div id="profil">
          <router-link to="/profil/${id}" id="ancre_profil">Profil</router-link>
        </div>
      </div>
    </nav>
    <router-view />
  </div>
</template>

<script>
// let userJson = localStorage.getItem("user");
// let user = JSON.parse(userJson);
// let token = user.token;
// let id = user.userID;
export default {
  name: "App",
  methods: {
    
  },
};
</script>
 
 <style scoped src="@/assets/style.css"></style>
