import Vue from "vue";
import axios from "axios";

const token = localStorage.getItem("user-token");
if (token) {
  axios.defaults.headers.common["Authorization"] = token;
}

axios.interceptors.response.use(undefined, function(err) {
  return new Promise(function(resolve, reject) {
    if (err.response.status === 403) {
      localStorage.removeItem("user-token");
      localStorage.removeItem("user-profile");
      // alert('error');
      window.location.href = "/";
    }
    throw err;
  });
});

axios.g = function(...args) {
  return new Promise((resolve, reject) => {
    this.get(...args)
      .then(response => {
        resolve(response);
      })
      .catch(error => {
        console.log(error);
        reject(error);
      });
  });
};

axios.p = function(...args) {
  return new Promise((resolve, reject) => {
    this.post(...args)
      .then(response => {
        console.log("ax: ", response);
        resolve(response);
      })
      .catch(error => {
        console.log("axerr: ", error);
        reject(error);
      });
  });
};

axios.d = function(...args) {
  return new Promise((resolve, reject) => {
    this.delete(...args)
      .then(response => {
        console.log("del: ", response);
        resolve(response);
      })
      .catch(error => {
        console.log("axios: ", error);
        reject(error);
      });
  });
};

Vue.prototype.$axios = axios;

export default axios;
