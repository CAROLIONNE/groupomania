<template>
  <div>
    <div id="container">
      <form id="update_detail" @submit="updateUser(userInfo.user_id)">
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
            <input class="submit" type="submit" value="Modifier" />
            <input
              id="delete"
              type="submit"
              value="Supprimer"
              v-on:click="deleteUser()"
            />
          </div>
        </fieldset>
      </form>
      <Modale :show="show" :toggleModale="toggleModale" :message="message" />
      <form
        id="update_avatar"
        @submit.prevent="updateAvatar($event, userInfo.user_id)"
      >
        <fieldset>
          <legend><h2>Avatar</h2></legend>
          <img :src="userInfo.avatar" />
          <input id="avatar" type="file" name="image" />
          <div id="btn">
            <input class="submit" type="submit" value="Sauvegarder" />
          </div>
        </fieldset>
      </form>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import Modale from "../components/ModaleBox.vue";
export default {
  name: "UserProfil",
  components: { Modale },
  data() {
    return {
      show: false,
      message: null,
    };
  },
  created() {
    this.$store.dispatch("fetchUser", this.$store.state.id);
  },
  computed: {
    timestamp: function () {
      return moment(this.userInfo.createdAt).format("DD-MM-YYYY");
    },
    userInfo(){
      return this.$store.state.user
    }
  },
  methods: {
    toggleModale() {
      this.show = !this.show;
    },
    updateAvatar($event, id) {
      let token = localStorage.getItem("token");
      const updatedPost = new FormData($event.target);
      this.axios
        .put(`http://localhost:3000/api/user/avatar/${id}`, updatedPost, {
          headers: {
            Authorization: "Bearer " + token,
          },
        })
        .then(() => {
          // Reset input
          document.getElementById("avatar").value = "";
          // Mise a jour du store
          setTimeout(() => {
            this.$store.dispatch("fetchUser", this.$store.state.id);
          }, 499);
        })
        .catch((e) => {
          console.log(e);
          // Modale si erreur
          this.message = e.response.data;
          this.toggleModale();
        });
    },
    updateUser(id) {
      let token = localStorage.getItem("token");
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
          // Mise a jour du store
          this.$store.dispatch("getUser", this.userInfo);
          // Modale
          this.message = response.data;
          this.toggleModale();
        })
        .catch((e) => {
          console.log(e);
          this.message = e.response.data;
          this.toggleModale();
        });
    },

    deleteUser() {
      let token = localStorage.getItem("token");
      const valid = confirm("Voulez vous supprimer votre compte ?");
      if (valid) {
        this.axios
          .delete(`http://localhost:3000/api/user/${this.$route.params.id}`, {
            headers: {
              Authorization: "Bearer " + token,
            },
          })
          .then((response) => {
            // Modale
            this.message = response.data;
            this.toggleModale();
            setTimeout(() => {
              // Vide le LS et renvoie a la page d'inscription
              localStorage.clear();
              this.$store.commit("USER_DISCONNECT");
              this.$router.push({ name: "Inscription" });
            }, 1500);
          })
          .catch((e) => {
            this.message = e.response.data;
            this.toggleModale();
          });
      }
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
  background: var(--gradiant);
}
img {
  width: 90%;
  height: 13em;
  border: outset;
}
#delete {
  background-color: white;
  color: var(--color-secondary);
  border: 2px solid #f44336;
}
#delete:hover {
  background-color: #f44336;
  color: white;
}
input {
  cursor: pointer;
}
.submit {
  background-color: white;
  color: black;
  border: 2px solid #555555;
}
.submit:hover {
  background-color: #555555;
  color: white;
}
input {
  padding: 0.2em;
  margin: 0.2em;
  border-radius: 0.5em;
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
