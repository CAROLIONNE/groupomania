import Vue from 'vue'
import VueRouter from 'vue-router'
import ConnectUser from '@/views/Connect'
import InscriptionUser from '@/views/Inscription'
import FilActu from '@/views/FilActu'
import NewArticle from '@/views/NewArticle'
import DisplayArticle from '@/views/DisplayArticle'
import DisplayArticle2 from '@/views/DisplayArticle2'
import DisplayProfil from '@/views/DisplayProfil'
import NotFound from '@/views/NotFound'



Vue.use(VueRouter)

// import axios from 'vue-axios'
// function isAuthenticated(to, from, next) {
//   let ls = localStorage.getItem('user')
//   if(ls){
//   let user = JSON.parse(localStorage.getItem("user"));
//   let token = user.token;
//   console.log("test token", token);
//   axios
//     .get("http://localhost:3000/api/user/auth", {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     })
//     .then((res) => {
//       console.log(res);
//       next()
//     }) 
//     .catch((err) => {
//       console.log(err);
//       localStorage.clear();
//       this.$router.push({ name: "Connect" });
//     });
//   } else {
//     localStorage.clear();
//     next('/');
//   }
// }

function isAuthenticated(to, from, next) {
  let isAuthenticated= false; 
  if(localStorage.getItem('user')) {isAuthenticated = true} 
  else {isAuthenticated= false}
  if(isAuthenticated) { 
    next(); // permet d'entrer la route 
  } else{ 
    next('/'); // aller à la page de connexion; 
    // this.$router.push({ name: "Connect" });
  } 
}

const routes = [
  {
    path: '/',
    name: 'Connect',
    component: ConnectUser
  },    
  {
    path: '/inscription',
    name: 'Inscription',
    component: InscriptionUser
  },    
  {
    path: '/articles',
    name: 'FilActu',
    beforeEnter : isAuthenticated, 
    component: FilActu
  },    
  {
    path: '/articles/post',
    name: 'NewArticle',
    beforeEnter : isAuthenticated, 
    component: NewArticle
  },    
  {
    path: '/article/:id',
    name: 'DisplayArticle',
    beforeEnter : isAuthenticated, 
    component: DisplayArticle
  },    
  {
    path: '/articletest/:id',
    name: 'DisplayArticle2',
    component: DisplayArticle2
  },
  {
    path: '/profil/:id',
    name: 'DisplayProfil',
    beforeEnter : isAuthenticated, 
    component: DisplayProfil  
  },     
  {
    path: '/*',
    name: 'NotFound',
    component: NotFound,
    meta: {
      title: '404 not Found'
    }
  },    

]

const router = new VueRouter({
  routes
})

let user = JSON.parse(localStorage.getItem("user"));
console.log(user);

// router.beforeEach(async (to) => {
//   if (
//     // make sure the user is authenticated
//     !user 
//   ) {
//     console.log("ROUTER if");
//     // redirect the user to the login page
//     return '/'
//   } else {
//     console.log("router else")
//   }
// })


export default router
