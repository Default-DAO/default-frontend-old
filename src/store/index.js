import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import 'es6-promise/auto'

// Modules
import user from './modules/user'
import web3 from './modules/web3'

// Init
export const store = new Vuex.Store({
  modules: {
    user,
    web3,
  },
})
