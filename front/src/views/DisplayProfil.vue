<template>
  <div>
    <div id="container">
      <!-- <form id="update_detail" method = "PUT" enctype="multipart/form-data"> -->
      <form id="update_detail">
        <fieldset>
          <legend><h2>Profil</h2></legend>
          Voici vos informations {{ userInfo.pseudonyme }}
          <!-- <img :src="userInfo.avatar" /> -->
          <!-- <input type="file" /> -->
          <!-- <input id="file" type="file" name="image" v-on:change="fileChange" /> -->
          <label>Adresse email : </label>
          <input type="email" v-model.trim="userInfo.mail" />
          <label>Pseudonyme : </label>
          <input type="text" v-model.trim="userInfo.pseudonyme" />
          <label>Poste : </label>
          <input
            type="text"
            v-model.trim="userInfo.poste"
            placeholder="Indiquez votre bureau"
          />
          <label>Bureau : </label>
          <input
            type="text"
            v-model.trim="userInfo.bureau"
            placeholder="Indiquez votre bureau"
          />
          <p>Inscrit depuis le {{ timestamp }}</p>
          <div id="btn">
            <input type="submit" value="Modifier" v-on:click="updateUser()" />
            <input
              id="delete"
              type="submit"
              value="Supprimer"
              v-on:click="deleteUser()"
            />
          </div>
        </fieldset>
      </form>
      <!-- </div> -->
      <!-------------------------------------------------------------------->
      <form id="update_avatar" method="PUT" enctype="multipart/form-data">
        <!-- <form id="update_avatar"> -->
        <fieldset>
          <legend><h2>Avatar</h2></legend>
          <img :src="userInfo.avatar" />
          <input
            id="file"
            type="file"
            name="image"
            v-on:change="fileChange()"
          />

          <div id="btn">
            <input
              type="submit"
              value="Sauvegarder"
              v-on:click="updateAvatar()"
            />
            <input
              id="delete"
              type="submit"
              value="Supprimer"
              v-on:click="deleteAvatar()"
            />
          </div>
        </fieldset>
      </form>
    </div>
  </div>
</template>

<script>
import moment from "moment";
let user = JSON.parse(localStorage.getItem("user"));
let token = user.token;
let id = user.userID;
export default {
  name: "UserProfil",
  data() {
    return {
      userInfo: {
        mail: "",
        pseudonyme: "",
        poste: "",
        bureau: "",
        avatar: "",
      },
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
        this.userInfo = user.data;
        this.mail = this.userInfo.mail;
        this.pseudonyme = this.userInfo.pseudonyme;
        this.poste = this.userInfo.poste;
        this.bureau = this.userInfo.bureau;
      })
      .catch((e) => {
        this.errors = e;
      });
  },
  methods: {
    updateUser() {
      this.axios
        .put(
          `http://localhost:3000/api/user/${id}`,
          {
            mail: this.userInfo.mail,
            pseudonyme: this.userInfo.pseudonyme,
            poste: this.userInfo.poste,
            bureau: this.userInfo.bureau,
          },
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        )
        .catch((e) => {
          console.log(e);
          this.errors = e;
        });
    },
    // updateUserAvatar() {
    //   // const data = new FormData();
    //   // data.append("mail", this.userInfo.mail);
    //   // data.append("pseudonyme", this.userInfo.pseudonyme);
    //   // data.append("poste", this.userInfo.poste,);
    //   // data.append("bureau", this.userInfo.bureau,);
    //   // data.append("image", this.avatar);
    //   // console.log(data);
    //   this.axios
    //     .put(
    //       `http://localhost:3000/api/user/${id}`,
    //       {
    //         mail: this.userInfo.mail,
    //         pseudonyme: this.userInfo.pseudonyme,
    //         poste: this.userInfo.poste,
    //         bureau: this.userInfo.bureau,
    //       },
    //       {
    //         headers: {
    //           Authorization: "Bearer " + token,
    //         },
    //       }
    //     )
    //     .catch((e) => {
    //       console.log(e);
    //       this.errors = e;
    //     });
    // },

    deleteUser() {
      let $id = this.$route.params.id;
      const valid = confirm("Voulez vous supprimer votre compte ?");
      if (valid) {
      this.axios
        .delete(`http://localhost:3000/api/user/` + $id, {
          headers: {
            Authorization: "Bearer " + token,
          },
        })
        .then((response) => {
          alert(response.data);
          this.$router.push({ name: "Inscription" });
        })
        .catch((e) => {
          console.log("log erreur", e.response.data);
          // console.log(e.response.config.data);
          this.errors = e.response.data;
        });
      }
    },
    fileChange(e) {
      let files = e.target.files || e.dataTransfer.files;
      this.userInfo.avatar = files[0];
      console.log("Avatar utilisateur", this.userInfo.avatar);
    },
  },
  computed: {
    timestamp: function () {
      return moment(this.userInfo.date_crea).format("DD-MM-YYYY");
    },
  },
};
</script>

<style scoped>
fieldset {
  width: 18em;

  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1em;
  margin: 1em;
  border-radius: 20px;
  box-shadow: 0.2em 0.2em 10px #a8a7a7;
  background: rgb(144, 140, 153);
  background: linear-gradient(
    309deg,
    rgba(144, 140, 153, 0.510224158022584) 0%,
    rgba(208, 210, 237, 0.5858544101234244) 29%
  );
}
img {
  width: 90%;
  height: 13em;
}

input {
  padding: 0.2em;
  margin: 0.2em;
  border-radius: 0.5em;
}
#delete {
  background-color: orange;
  border: 1px solid black;
  cursor: pointer;
}
#container {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
}
</style>
