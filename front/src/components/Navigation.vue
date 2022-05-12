<template>
  <div id="content">
    connecté : {{ $store.state.userConnect }} /
    user : {{ $store.state.user }}

    <!-- Navigation desktop -->
    <div id="nav_desktop" v-if="!mobile">
      <!-- Navigation avec authentification -->
      <nav class="nav" v-if="$store.state.userConnect == true">
        <router-link
          :to="{ name: 'FilActu' }"
          class="logo"
          v-if="$store.state.userConnect == true"
        >
          <img
            class="img_logo"
            src="../assets/icon-left-font-monochrome-white.svg"
            alt="logo de groupomania"
          />
        </router-link>
        <div class="navigation">
          <div class="fil_actu">
            <router-link :to="{ name: 'FilActu' }" class="ancre_fil_actu"
              >Fil d'actualité</router-link
            >
          </div>
          <a class="ancre_profil" @click="Profil()"> Profil </a>
          <a class="ancre_logout" @click="logOut()">Deconnexion</a>
        </div>
      </nav>
      <!-- Navigation sans authentification -->
      <nav class="nav" v-if="$store.state.userConnect == false">
        <router-link to="/" class="logo" v-if="$store.state.userConnect == false">
          <img
            class="img_logo"
            src="../assets/icon-left-font-monochrome-white.svg"
            alt="logo de groupomania"
          />
        </router-link>
        <div class="authentification">
          <div class="inscription">
            <router-link to="/inscription" class="ancre_inscription"
              >Inscription</router-link
            >
          </div>
          <div class="connexion">
            <router-link to="/" class="ancre_connexion">Connexion</router-link>
          </div>
        </div>
      </nav>
    </div>

    <div id="nav_mobile" v-if="mobile">
      <nav class="nav" v-if="$store.state.userConnect == true">
        <!-- Navigation avec authentification -->
        <router-link
          :to="{ name: 'FilActu' }"
          class="logo"
          v-if="$store.state.userConnect == true"
        >
          <img
            class="img_logo"
            src="../assets/icon-left-font-monochrome-white.svg"
            alt="logo de groupomania"
          />
        </router-link>
        <i
          @click="toggleMobileNav"
          class="fa fa-bars"
          :class="{ 'icon-active': mobileNav }"
          v-if="mobile"
        ></i>
        <transition name="mobile-nav"> </transition>
        <div v-show="mobileNav" id="nav_auth-mobile">
          <!-- <transition name="mobile-nav-menu">  -->
          <div class="navigation_M">
            <div class="fil_actu">
              <router-link :to="{ name: 'FilActu' }" class="ancre_fil_actu">
                Fil d'actualité
              </router-link>
            </div>
            <a class="ancre_profil" @click="Profil()"> Profil </a>
            <a class="ancre_logout" @click="logOut()"> Deconnexion </a>
          </div>
        </div>
      </nav>
      <nav class="nav" v-if="$store.state.userConnect == false">
        <router-link to="/" class="logo" v-if="$store.state.userConnect == false">
          <i
            @click="toggleMobileNav"
            class="fa fa-bars"
            :class="{ 'icon-active': mobileNav }"
            v-if="mobile"
          ></i>
          <transition name="mobile-nav"> </transition>
          <!-- Navigation sans authentification -->
          <img
            class="img_logo"
            src="../assets/icon-left-font-monochrome-white.svg"
            alt="logo de groupomania"
          />
        </router-link>
        <div v-show="mobileNav" id="nav_!auth-mobile">
          <div class="navigation_M">
            <div class="inscription">
              <router-link to="/inscription" class="ancre_inscription"
                >Inscription</router-link
              >
            </div>
            <div class="connexion">
              <router-link to="/" class="ancre_connexion"
                >Connexion</router-link
              >
            </div>
          </div>
        </div>
      </nav>
    </div>
    <router-view />
  </div>
</template>

<script>
export default {
  name: "NavBar",
  data() {
    return {
      scrollPosition: null,
      mobile: null,
      mobileNav: null,
      windowWidth: null,
    };
  },
  created() {
    window.addEventListener("resize", this.checkScreen);
    this.checkScreen();
  },
  methods: {
    Profil() {
      let user = JSON.parse(localStorage.getItem("user"));
      let id = user.userID;
      // let id = this.$store.state.user.id;
      if (user) {
        this.$router.push({ name: "DisplayProfil", params: { id } });
      }
    },
    logOut() {
      localStorage.clear();
      this.$router.push({ name: "Connect" });
      this.$store.commit("USER_DISCONNECT");
    },
    toggleMobileNav() {
      this.mobileNav = !this.mobileNav;
    },
    checkScreen() {
      this.windowWidth = window.innerWidth;
      if (this.windowWidth <= 750) {
        this.mobile = true;
        return;
      }
      this.mobile = false;
      this.mobileNav = false;
      return;
    },
  },
};
</script>

<style scoped>
a {
  text-decoration: none;
}
#app {
  margin-bottom: 2em;
}
.nav {
  display: flex;
  /* align-items: center; */
  height: 3rem;
  background-color: black;
  /* test */
  width: 100%;
}

#nav_mobile {
  display: flex;
  align-items: center;
  width: 100%;
  background-color: black;
}
.img_logo {
  max-width: 11rem;
  height: 100%;
  margin-left: 1em;
}
.navigation,
.authentification {
  display: flex;
  align-items: center;
}
.navigation_M {
  display: flex;
  flex-direction: column;
  top: 45px;
  right: 0;
  position: absolute;
  background: rgba(0, 0, 0, 0.8);
  transition: transform ease-in 2s;
  overflow: hidden;
  z-index: 10;
  /* visibility: hidden; */
}
/* .navigation_M:click {
    visibility: visible;
    transform: translateX(45px);
} */
.inscription,
.connexion,
.fil_actu,
.profil,
.ancre_profil,
.ancre_logout {
  margin: 1em;
  display: flex;
}

.ancre_inscription,
.ancre_connexion,
.ancre_fil_actu,
.ancre_profil,
.ancre_logout {
  color: white;
  font-size: larger;
  cursor: pointer;
}

.ancre_inscription:hover,
.ancre_connexion:hover,
.ancre_fil_actu:hover,
.ancre_profil:hover {
  color: #a3eeff;
  transition: all 0.15s ease-in-out;
  transform: scale(1.1);
}
.ancre_logout:hover {
  color: orange;
  transition: all 0.15s ease-in-out;
  transform: scale(1.1);
}
.fa-bars {
  padding: 0.5em;
  position: absolute;
  top: 0;
  flex-basis: 100%;
  right: 0;
  /* height: 100%; */
  cursor: pointer;
  color: white;
  cursor: pointer;
  font-size: 25px;
  transition: 0.5s ease all;
}
.icon-active {
  transform: rotate(180deg);
}
</style>
