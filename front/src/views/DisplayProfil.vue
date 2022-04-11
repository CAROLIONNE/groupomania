<template>
  <div>
    <div id="container">
      <form id="update_detail">
        <fieldset>
          <legend><h2>Profil</h2></legend>
          <p>Voici vos informations {{ userInfo.pseudonyme }}</p>
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
      <form
        id="update_avatar"
        @submit.prevent="updateAvatar($event, userInfo.user_id)"
      >
        <fieldset>
          <legend><h2>Avatar</h2></legend>
          <img :src="userInfo.avatar" />
          <input id="file" type="file" name="image"  />

          <div id="btn">
            <input type="submit" value="Sauvegarder" />
            <input
              id="delete"
              type="submit"
              value="Supprimer"
              v-on:click="deleteAvatar(userInfo.user_id)"
            />
          </div>
        </fieldset>
      </form>
    </div>
  </div>
</template>

<script>
import moment from "moment";
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
    let user = JSON.parse(localStorage.getItem("user"));
    let token = user.token;
    let id = user.userID;
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
    updateAvatar($event, id) {
      let user = JSON.parse(localStorage.getItem("user"));
      let token = user.token;
      // const postId = String(id);
      const updatedPost = new FormData($event.target);
      // console.log(updatedPost);
      // console.log($event.target);
      this.axios
        .put(
          `http://localhost:3000/api/user/avatar/${id}`, updatedPost,
          {
            headers: {
              Authorization: "Bearer " + token,
              // "content-Type": "multipart/form-data",
            },
          }
        )
        .then((res) => {
          alert(res.data)
          // console.log(res);
        })
        .catch((e) => {
          console.log(e);
          this.errors = e;
        });
    },
    updateUser() {
      let user = JSON.parse(localStorage.getItem("user"));
      let token = user.token;
      let id = user.userID;
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
        .then((response) => {
          alert(response.data);
        })
        .catch((e) => {
          console.log(e);
          this.errors = e;
        });
    },

    deleteUser() {
      let user = JSON.parse(localStorage.getItem("user"));
      let token = user.token;
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
            alert("erreur", e.response.data);
            // console.log(e.response.config.data);
            this.errors = e.response.data;
          });
      }
    },
    deleteAvatar(id) {
      console.log("deleteAvatar");
      let user = JSON.parse(localStorage.getItem("user"));
      let token = user.token;
      const updatedPost = new FormData();
      updatedPost.append("image", "default.png");
      console.log(updatedPost);
      this.axios
        .put(
          `http://localhost:3000/api/user/avatar/${id}`, updatedPost,
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        )
        .then((res) => {
          alert(res.data)
          // console.log(res);
        })
        .catch((e) => {
          console.log(e);
          this.errors = e;
        });
    }
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
  /* object-fit: cover; */
  border: outset;
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
p {
  padding: 0.2em;
}
</style>
