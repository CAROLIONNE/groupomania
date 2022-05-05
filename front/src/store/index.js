import Vue from 'vue'
import Vuex from 'vuex'
// const axios = require('axios')

Vue.use(Vuex)
console.log(Vuex);

// let user = localStorage.getItem('user')
// if (!user) {
//   user = {
//     userId: -1,
//     token: ''
//   }
// } else {
//   try {
//     user = JSON.parse(user)
//     console.log(user);
//     axios
//         .get(`http://localhost:3000/api/user/auth`, {
//           headers: {
//             Authorization: "Bearer " + user.token,
//           },
//         })
//   } catch (error) {
//     user = {
//       userId: -1,
//       token: ''
//     }
//   }
// }

export default new Vuex.Store({
  state: {
    // user: "",
    // date: 'date'
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
