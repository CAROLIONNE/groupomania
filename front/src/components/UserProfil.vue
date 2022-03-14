<template>
  <div>
    <div id="detail">
      <img :src="userInfo.avatar">
      <h2>Profil</h2>
      <h2>Voici vos informations {{ userInfo.pseudonyme }}</h2>
      <p>E-mail : {{ userInfo.mail }}</p>
      <p v-if="userInfo.poste">Poste : {{ userInfo.poste }}</p>
      <p v-if="userInfo.bureau">Bureau : {{ userInfo.bureau }}</p>
      <p>Inscrit depuis le {{ timestamp }}</p>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
let userJson = localStorage.getItem("user");
let user = JSON.parse(userJson);
let token = user.token;
let id = user.userID;
console.log(user);
export default {
  name: "UserProfil",
  data() {
    return {
      userInfo: "",
    };
  },
  mounted() {
    this.axios
      .get(`http://localhost:3000/api/user/${id}`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((user) => {
        // this.articles = user.data;
        this.userInfo = user.data;
        console.log("data", user.data);
      })
      .catch((e) => {
        this.errors = e;
      });
  },
  methods: {},
  computed: {
  timestamp: function () {
    return moment(this.userInfo.date_crea).format('DD-MM-YYYY');
  }
}
};
</script>
