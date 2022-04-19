import Vue from 'vue';
import Router from 'vue-router';

import LoginPage from './pages/login/index.vue'
import SearchPage from './pages/search/index.vue'
import SearchPageNew from './pages/search-new/index.vue'
import DetailPage from './pages/detail/index.vue'
import ManagePage from './pages/manage/index.vue'
import ManageWorkspacePage from './pages/manage/workspace'
import HomePage from './pages/home/index.vue'
import PdfPage from './pages/pdf/index.vue'
import SavedPage from './pages/saved/index.vue'

Vue.use(Router);

export function createRouter() {
  return router;
}

export const router = new Router({
  mode: 'history',
  routes: [
    { path: '/login', component: LoginPage },
    { path: '/search', component: SearchPage, name: 'search' },
    { path: '/detail/:id', component: DetailPage, name: 'detail' },
    { path: '/manage', component: ManagePage, name: 'manage' },
    { path: '/home', component: HomePage, name: 'home' },
    { path: '/search-new', component: SearchPageNew, name: 'search-new' },
    { path: '/pdf', component: PdfPage, name: 'pdf' },
    { path: '/manage/workspace', component: ManageWorkspacePage, name: 'workspace' },
    { path: '/saved', component: SavedPage, name: 'saved' },



    { path: '*', redirect: '/search'},
  ]
});

router.beforeEach((to, from, next) => {
  // redirect to login page if not logged in and trying to access a restricted page
  const publicPages = ['/login'];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem('user');
  if (authRequired && !loggedIn) {
    return next('/login');
  }
  // if (from.name == 'detail' && to.name == 'search') {
  //   console.log(from)
  //   console.log(to)
  // }
  next();
})