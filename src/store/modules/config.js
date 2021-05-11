import axios from "axios";
import api from "@/config/api";

const state = {
  data: {},
  appBarTitle: null
};

const getters = {
  get: state => state.data,
  getAppBarTitle: state => state.appBarTitle
};

const actions = {
  fitch: ({ commit, dispatch }) => {
    return new Promise((resolve, reject) => {
      axios
        .get(api.config)
        .then(response => {
          commit("set", response.data);
          resolve();
        })
        .catch(error => {
          console.log(error);
        });
    });
  },
  setAppBarTitle({ commit, title }) {
    commit("setAppBarTitle", title);
  }
};

const mutations = {
  set: (state, resp) => {
    state.data = resp;
  },
  setAppBarTitle: (state, title) => {
    state.appBarTitle = title;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
