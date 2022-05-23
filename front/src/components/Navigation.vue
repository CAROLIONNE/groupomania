<template>
  <div id="content">
    <!-- Navigation desktop -->
    <div id="nav_desktop" v-if="!mobile">
      <!-- Navigation avec authentification -->
      <nav class="nav" v-if="$store.state.isAuthentificated == true">
        <router-link
          :to="{ name: 'FilActu' }"
          class="logo"
          v-if="$store.state.isAuthentificated == true"
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
      <nav class="nav" v-if="$store.state.isAuthentificated == false">
        <router-link to="/" class="logo" v-if="$store.state.isAuthentificated == false">
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
    connecté : {{ $store.state.isAuthentificated }} /
    user : {{ $store.state.user }}
    </div>

    <div id="nav_mobile" v-if="mobile" >
      <nav class="nav" v-if="$store.state.isAuthentificated == true">
        <!-- Navigation avec authentification -->
        <router-link
          :to="{ name: 'FilActu' }"
          class="logo"
          v-if="$store.state.isAuthentificated == true"
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
          <transition name="mobile"> 
          <div class="navigation_M">
            
            <!-- <div class="navigation_M" :class="{ 'menu-enter-active': mobile-nav-menu }"> -->

            <div class="fil_actu">
              <router-link :to="{ name: 'FilActu' }" class="ancre_fil_actu">
                Fil d'actualité
              </router-link>
            </div>
            <a class="ancre_profil" @click="Profil()"> Profil </a>
            <a class="ancre_logout" @click="logOut()"> Deconnexion </a>
          </div>
          </transition>
        </div>
      </nav>
      <nav class="nav" v-if="$store.state.isAuthentificated == false">
        <router-link to="/" class="logo" v-if="$store.state.isAuthentificated == false">
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
      this.$router.push({ name: "DisplayProfil", params: { id } });
    },
    logOut() {
      this.$store.dispatch("logOut");
    },
    toggleMobileNav() {
      this.mobileNav = !this.mobileNav;
    },
    checkScreen() {
      this.windowWidth = window.innerWidth;
      if (this.windowWidth <= 768) {
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
  height: 3rem;
  background-color: var(--color-secondary);
  width: 100%;
}

#nav_mobile {
  display: flex;
  align-items: center;
  width: 100%;
  background-color: var(--color-secondary);
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
  top: 40px;
  right: 0;
  position: absolute;
  background: var(--color-secondary);
  transition: all ease-in-out 1s;
  overflow: hidden;
  z-index: 10;
  /* visibility: hidden; */
}
/* i:active + .navigation_M {
  z-index: 10;
  transform: translateY(60px), scale(50px);
    visibility: visible;
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
  color: var(--color-primary);
  font-size: larger;
  cursor: pointer;
}

.ancre_inscription:hover,
.ancre_connexion:hover,
.ancre_fil_actu:hover,
.ancre_profil:hover {
  color: var(--color-tertiary);
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
  cursor: pointer;
  color: var(--color-primary);
  cursor: pointer;
  font-size: 25px;
  transition: 0.5s ease all;
}
.icon-active {
  transform: rotate(180deg);
}
.mobile-enter-active {
  transition: opacity 1s;
    /* z-index: 10;
  transform: translateY(60px), scale(50px); */
}
.mobile-enter {
  opacity: 0;
  /* z-index: 10;
  transform: translateY(60px), scale(50px); */
}
</style>
