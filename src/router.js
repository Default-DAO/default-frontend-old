import VueRouter from 'vue-router';

import { Register, Clout, Value, Pool } from '@/pages';

const routes = [
  // Register
  { path: '/', component: Register },

  // Pages
  { path: '/clout', component: Clout },
  { path: '/value', component: Value },
  { path: '/pool', component: Pool },

  // Fallback
  { path: '*', redirect: '/' }
];

const router = new VueRouter({
  routes
});

const pushPrototype = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return pushPrototype.call(this, location).catch(err => err)
};

export default router
