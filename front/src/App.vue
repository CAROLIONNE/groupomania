<template>
  <div id="app">
    <NavBar />
  </div>
</template>

<script>
import NavBar from "./components/Navigation.vue";

export default {
  name: "App",
  components: { NavBar },

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
  },
};
</script>

<style scoped src="@/assets/style.css"></style>
