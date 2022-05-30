// Config Axios
import axios from 'axios'

// Config Url
const instance = axios.create({
    baseURL: 'http://localhost:3000/api/',
});

// Configuration du token dans les headers
instance.interceptors.request.use(
    function(config) {
      const token = localStorage.getItem("token"); 
      if (token) {
        config.headers["Authorization"] = 'Bearer ' + token;
      }
      return config;
    },
    function(error) {
      return Promise.reject(error);
    }
  );
    
export default instance;