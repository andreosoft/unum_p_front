import axios from 'axios'
import api from '@/config/api'

const state = {
  token: localStorage.getItem('user-token') || '',
  profile: null,
  status: '',
  error: '',
}

const getters = {
  isAuthenticated: state => !!state.token,
  profile: state => {
    let profile = state.profile;
    if (!profile) {
      try { profile = JSON.parse(localStorage.getItem('user-profile')); }
      catch  {}
      if (!profile) {
        profile = { role: 0 };
        localStorage.setItem('user-profile', JSON.stringify(profile))
      } 
      state.profile = profile;
    }
    return profile;
  },
  role: state => {
    return getters.profile(state).role
  },
  status: state => state.status,
  error: state => state.error,
}

const actions = {
  login: ({ commit, dispatch }, user) => {
    return new Promise((resolve, reject) => {
      commit('authLoading')
      axios({ url: api.token_login, data: user, method: 'POST' })
        .then(resp => {
          if (resp.data.status == 'ok') {
            commit('authSuccess', resp.data.data.token)
            commit('updateProfile', resp.data.data.profile)
          } else {
            commit('authError', resp.data.error)
          }
          resolve(resp)
        })
    })
  },
  logout: ({ commit, dispatch }) => {
    commit('authLogout')
  },
  updateProfile: ({ commit, dispatch }) => {
    axios.get(api.get_profile)
      .then(resp => {
        if (resp.data.status == 'ok') {
          commit('updateProfile', resp.data.profile)
        }
      })
      .catch(err => {
        console.log(err);
      })
  }
}

const mutations = {
  authLoading: (state) => {
    state.status = 'loading'
  },
  authSuccess: (state, token) => {
    state.status = 'success'
    state.token = token
    localStorage.setItem('user-token', token)
    axios.defaults.headers.common['Authorization'] = token
  },
  authError: (state, error) => {
    state.status = 'error'
    state.error = error
    localStorage.removeItem('user-token')
  },
  authLogout: (state) => {
    state.token = ''
    localStorage.removeItem('user-token')
    localStorage.removeItem('user-profile')
    delete axios.defaults.headers.common['Authorization']
  },
  updateProfile: (state, data) => {
    state.profile = data
    localStorage.setItem('user-profile', JSON.stringify(data))
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
