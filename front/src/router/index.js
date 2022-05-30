import Vue from 'vue'
import VueRouter from 'vue-router'
import ConnectUser from '@/views/Connect'
import InscriptionUser from '@/views/Inscription'
import FilActu from '@/views/FilActu'
import NewArticle from '@/views/NewArticle'
import DisplayArticle from '@/views/DisplayArticle'
import DisplayProfil from '@/views/DisplayProfil'
import NotFound from '@/views/NotFound'



Vue.use(VueRouter)

// Securiser navigation non authentifiée
function isAuthenticated(to, from, next) {
  let isAuthenticated= false; 
  if(localStorage.getItem('isAuthentificated')) {isAuthenticated = true} 
  else {isAuthenticated= false}
  if(isAuthenticated) { 
    next(); // permet d'entrer la route 
  } else{ 
    next('/'); // aller à la page de connexion; 
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

export default router
