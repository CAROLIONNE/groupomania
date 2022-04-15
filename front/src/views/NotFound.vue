<template>
<div>
    <h1> Cette page est introuvable &#x1F9D0; </h1>
    <p>
    <router-link to="/" class="link" v-if="!this.user">
    La page de connexion c'est par ici &#128521;
    </router-link>
    </p>
    <!-- si utilisateur connecté afficher-->
    <p>
    <router-link :to="{ name: 'FilActu' }" class="link" v-if="GetUser()">
    Le fil d'actualité c'est par ici &#128521;
    </router-link>
    </p>
    <router-view />
</div>
</template>

<script>
export default {
  name: "NotFound",
  data() {
    return {
        user: false,
    }
  },
 methods: {
     GetUser() {
        let user = JSON.parse(localStorage.getItem("user"))
        if (user) return this.user=true
     }
 },
 }
</script>


<style scoped>
div {
display: flex;
flex-direction: column;
align-items: center;
margin: 5em;
padding: 1em;
border: thick double black;
width: fit-content;
margin-right: auto;
margin-left: auto;
}
h1 {
    padding: 0.3em;
}
p {
    padding: 0.3em;
}
.link {
    text-decoration: none;
}
</style>