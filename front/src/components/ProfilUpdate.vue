<template>
  <div id="page_mod">
    <button v-on:click="show()">Modifier</button>
    <form id="update_detail" v-if="choiceUpdate" enctype="multipart/form-data">
      <h2>Modification de votre profil</h2>
      <!-- <img src="" /> -->
      <input type="file" />
      <label>Adresse email</label>
      <input type="email" v-model="mail" />
      <label>Poste</label>
      <input type="text" v-model="poste" />
      <label>Bureau</label>
      <input type="text" v-model="bureau" />
    <input type="submit" value="Valider"  v-on:click="updateUser()"/>
    </form>
  </div>
</template>

<script>
let userJson = localStorage.getItem("user");
let user = JSON.parse(userJson);
let token = user.token;
let id = user.userID;
export default {
  name: "UserProfil",
  data() {
    return {
      // avatar: '',
      mail: null,
      poste: "",
      bureau: "",
      infos: [],
      choiceUpdate: false,
      // TO DO recupérer ID
    };
  },
  methods: {
    updateUser() {
      this.axios
        .put(
          `http://localhost:3000/api/user/${id}`,
          {
            //   avatar: this.avatar
            mail: this.mail,
            poste: this.poste,
            bureau: this.bureau,
          },
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        )
        .then((newInfo) => {
          // JSON responses are automatically parsed.
          this.infos.push(newInfo.data);
        })
        .catch((e) => {
          console.log(e);
          this.errors = e;
        });
    },
    show() {
      this.choiceUpdate = true;
    },
  },
};
</script>

<style>
form {
    display : flex;
    flex-direction: column;
    align-items: center;
}
</style>