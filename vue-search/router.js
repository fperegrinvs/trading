import Vue from 'vue';
import Router from 'vue-router';

import TradingPage from './pages/trading/trading.vue'
import TradingPage2 from './pages/trading/trading-version-2.vue'
import TradingPage3 from './pages/trading/trading-version-3.vue'

Vue.use(Router);

export function createRouter() {
  return router;
}

export const router = new Router({
  mode: 'history',
  routes: [
    { path: '/trading', component: TradingPage, name: "trading"},
    { path: '/trading2', component: TradingPage2, name: "trading2"},
    { path: '/trading3', component: TradingPage3, name: "trading3"},



    { path: '*', redirect: '/trading'},
  ]
});

router.beforeEach((to, from, next) => {
  // redirect to login page if not logged in and trying to access a restricted page
  // const publicPages = ['/login', '/saved', '/manage'];
  // const authRequired = !publicPages.includes(to.path);
  // const loggedIn = localStorage.getItem('user');
  // if (authRequired && !loggedIn) {
  //   return next('/login');
  // }
  next();
})