import Vue from 'vue';
import Router from 'vue-router';

// import Dashboard from './pages/dashboard'
// import SHGiaiDoanKS from './pages/sohoahskt/giaidoanks.vue'
// import SHGiaiDoanKT from './pages/sohoahskt/giaidoankt.vue'
// import SHGiaiDoanSauPHBCKT from './pages/sohoahskt/giaidoansauphbckt'
import LoginPage from './pages/login/index.vue'
import SearchPage from './pages/search/index.vue'
// import ChucVuPage from './pages/danhmuc/chucvu.vue'
// import CuocKiemToanPage from './pages/danhmuc/cuockiemtoan.vue'
// import DonViPage from './pages/danhmuc/donvi.vue'
// import LinhVucKiemToanPage from './pages/danhmuc/linhvuckiemtoan.vue'
// import PhongBanPage from './pages/danhmuc/phongban.vue'

Vue.use(Router);

export function createRouter() {
  return router;
}

export const router = new Router({
  mode: 'history',
  routes: [
    { path: '/login', component: LoginPage },
    { path: '/search', component: SearchPage },
    // {path: '/dashboard', component: Dashboard},

    // {path: '/sohoahskt/giaidoanks', component: SHGiaiDoanKS},
    // {path: '/sohoahskt/giaidoankt', component: SHGiaiDoanKT},
    // {path: '/sohoahskt/giaidoansauphbckt', component: SHGiaiDoanSauPHBCKT},
    // {path: '/danhmuc/chucvu', component: ChucVuPage},
    // {path: '/danhmuc/cuockiemtoan', component: CuocKiemToanPage},
    // {path: '/danhmuc/donvi', component: DonViPage},
    // {path: '/danhmuc/linhvuckiemtoan', component: LinhVucKiemToanPage},
    // {path: '/danhmuc/phongban', component: PhongBanPage},

    // { path: '*', redirect: '/dashboard'},
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

  next();
})