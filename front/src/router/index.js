import Vue from 'vue'
import VueRouter from 'vue-router'
// import HomeView from '../views/HomeView.vue'
import ConnectUser from '@/components/Connect'
import InscriptionUser from '@/components/Inscription'
import FilActu from '@/components/FilActu'
import CreateArticle from '@/components/CreateArticle'
// import DisplayArticle from '@/components/DisplayArticle'

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
    component: CreateArticle
  },    
  // {
  //   path: '/article:id',
  //   name: 'DisplayArticle',
  //   component: DisplayArticle
  // },    
]

const router = new VueRouter({
  routes
})

export default router
