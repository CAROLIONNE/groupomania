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
      </div>
    </nav>
    <router-view />
  </div>
</template>

<script>


export default {
  name: "App",
  methods: {
    
  },
};
</script>
 
 <style scoped src="@/assets/style.css"></style>
