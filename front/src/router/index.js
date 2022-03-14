import Vue from 'vue'
import VueRouter from 'vue-router'
import ConnectUser from '@/views/Connect'
import InscriptionUser from '@/views/Inscription'
import FilActu from '@/views/FilActu'
import NewArticle from '@/views/NewArticle'
import DisplayArticle from '@/views/DisplayArticle'
import DisplayProfil from '@/views/DisplayProfil'

Vue.use(VueRouter)

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
    component: FilActu
  },    
  {
    path: '/articles/post',
    name: 'NewArticle',
    component: NewArticle
  },    
  {
    path: '/article/:id',
    name: 'DisplayArticle',
    component: DisplayArticle
  },    
  {
    path: '/profil/:id',
    name: 'DisplayProfil',
    component: DisplayProfil
  },    
]

const router = new VueRouter({
  routes
})

export default router
