<template>
  <div>
    <h1>Cette page est introuvable &#x1F9D0;</h1>
    <p>
      <router-link to="/" class="link" v-if="!user">
        La page de connexion c'est par ici &#128521;
      </router-link>
    </p>
    <!-- si utilisateur connecté afficher une redirection-->
    <p>
      <router-link :to="{ name: 'FilActu' }" class="link" v-if="user">
        Le fil d'actualité c'est par ici &#128521;
      </router-link>
    </p>
    <router-view />
    <img src="../assets/page_not_found_.png"/>
  </div>
</template>

<script>
export default {
  name: "NotFound",
  data() {
    return {
      user: false,
    };
  },
  created() {
    let user = JSON.parse(localStorage.getItem("isAuthentificated"));
    if (user) return (this.user = true);
  },
};
</script>

<style scoped>
img {
  max-width: 60%;
}
div {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 5em;
  padding: 1em;
  border: thick double var(--color-secondary);
  width: fit-content;
}
/* h1 {
  padding: 0.3em;
  text-align: center;
} */
p {
  padding: 0.3em;
}
p :hover{
  text-decoration: underline;
}
.link {
  text-decoration: none;
}
</style>
