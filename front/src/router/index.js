import Vue from 'vue'
import VueRouter from 'vue-router'
// import HomeView from '../views/HomeView.vue'
import ConnectUser from '@/components/Connect'
import InscriptionUser from '@/components/Inscription'
import FilActu from '@/components/Fil'

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
    name: 'Fil',
    component: FilActu
  },    
]

const router = new VueRouter({
  routes
})

export default router
