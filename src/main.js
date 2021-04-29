import Vue from 'vue'
import Vuex from 'vuex'
import App from './App.vue'

// Store
import { store } from './store'

// HTTP Client
import Axios from 'axios';
Axios.defaults.baseURL = 'http://localhost:8003/api';
Vue.prototype.$http = Axios;
Vuex.Store.prototype.$http = Axios;

// Router
import router from './router';
import VueRouter from 'vue-router';
Vue.use(VueRouter);

// Event Bus
Vue.prototype.$bus = new Vue();

// Web3
const Ethers = require('./assets/scripts/ethers.js');
Vue.prototype.$ethers = Ethers;
Vuex.Store.prototype.$ethers = Ethers;

// Misc
Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
  store,
  router,
}).$mount('#app')
