import { createRouter, createWebHashHistory } from 'vue-router'
// import HomeView from '../views/HomeView.vue'
// import Fil from '../components/Fil.vue'
import FilActu from '@/components/Fil'
import ConnectUser from '@/components/Connect'
import InscriptionUser from '@/components/Inscription'

const routes = [

  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  // },
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

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
