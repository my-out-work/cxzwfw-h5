import Vue from 'vue'
import Vuex from 'vuex'
import storage from './storage'

Vue.use(Vuex)

const userkey = 'user'

export default new Vuex.Store({
  state: {
    user: storage.get(userkey)
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
