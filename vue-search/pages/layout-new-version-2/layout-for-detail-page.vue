<template>
  <div>
      <div class="btn-back" @click="handleBtnBack">
        <!-- <h1>Button back</h1> -->
        <el-button class="test-btn-replace-btn-chrome" icon="el-icon-back"></el-button>
    </div>
    <div class="btn-forward" @click="handleBtnForward">
        <!-- <h1>Button forward</h1> -->
        <el-button class="test-btn-replace-btn-chrome" icon="el-icon-right"></el-button>
    </div>
    <!-- <header-bar-component-new /> -->
    <header-bar-component-new-version-2 />
    <!-- <params-component-version-2 /> -->
    
    
    <!-- <sidebar-left /> -->


    <sidebar-left-copy />

    <!-- <div class="layout-for-search-left" style="position: absolute;
    top: 300px;
    left: 378px;
    width: 652px;
    height: 580px;">
        <slot></slot>
    </div> -->
    <div class="layout-for-result-detail" style="
    padding: 24px 32px 24px 24px;

position: absolute;
left: 255px;
right: 0px;
top: 72px;
bottom: 0px;

background: #FFFFFF;
box-shadow: inset 1px 0px 0px #E5E5E5;
height: 682px;
width: 913px;">
        <slot name="result-detail"></slot>
    </div>
    <div class="layout-for-result-detail-right" style="
    position: absolute;
left: 1167px;
right: 0px;
top: 72px;
bottom: 0px;

background: #FFFFFF;
box-shadow: inset 1px 0px 0px #E5E5E5;
padding: 24px 32px 24px 24px;

height: 682px;
">
        <!-- left: 1041px; -->
        <slot name="result-detail-right"></slot>
    </div>
    <!-- <div class="layout-for-search-right" style="position: absolute; top: 112px; left: 767px; height: 640px; background: #FFFFFF;
box-shadow: inset 1px 0px 0px #E5E5E5;">
        <slot name="layout-for-search-right"></slot>
    </div> -->
    <div class="layout-for-pdf">
        <slot name="layout-for-pdf"></slot>
    </div>
  </div>
</template>
<script>
import {mapActions} from 'vuex';
import HeaderBarNew from '../../components/components-new-version-2/HeaderBarNew.vue'
import ParamsComponentVersion2 from '../../components/components-new-version-2/Params.vue'
import SidebarLeft from '../../components/components-new-version-2/SidebarLeft.vue'
import SidebarLeftCopy from '../../components/components-new-version-2/SidebarLeftCopy.vue'
import Vue from 'vue'
Vue.component("header-bar-component-new-version-2", HeaderBarNew)
Vue.component("params-component-version-2", ParamsComponentVersion2)
Vue.component("sidebar-left", SidebarLeft)
Vue.component("sidebar-left-copy", SidebarLeftCopy)
export default {
    data() {
      return {
        input: '',
      }
    },
    methods: {
      ...mapActions('search', ['getSearchAPI', 'setSearchFromDetail']),
      handleBtnBack() {
          this.$router.go(-1);
      },
      handleBtnForward() {
          this.$router.go(1);
      },
      onEnter() {
        this.setSearchFromDetail(this.input);
        // console.log(this.input);
        if (this.$router.currentRoute.path != '/search') {
          this.$router.push({name: 'search', query: {text: this.input}});
          // this.getSearchAPI({text:this.input,page:1,pagesize:20,bookmarked:false,sort:"docidx",sort_direction:"desc"});
          // this.setSearchFromDetail(this.input);
        }
        else {
          // this.getSearchAPI({text:this.input,page:1,pagesize:20,bookmarked:false,sort:"docidx",sort_direction:"desc"});
        }
        // 
      }
    },
    created() {
      if (this.$route.query.text) {
        this.input = this.$route.query.text;
      }
    },
}
</script>
<style scoped>
.test-btn-replace-btn-chrome:focus {
    outline: unset;
}
.test-btn-replace-btn-chrome {
    padding: 4px 16px;
    border: unset;
}
.btn-forward {
        position: absolute;
    color: white;
    z-index: 2;
    top: 71px;
    right: 0;    
}
.btn-back {
    position: absolute;
    color: white;
    z-index: 2;
    top: 71px;
}
.layout-for-result-detail::-webkit-scrollbar {
    display: none;
}
.layout-for-result-detail {
    overflow-y: scroll;
    -ms-overflow-style: none;  /* Internet Explorer 10+ */
    scrollbar-width: none; 
}

.layout-for-search-left::-webkit-scrollbar {
    display: none;
}
.layout-for-search-left {
    overflow-y: scroll;
    -ms-overflow-style: none;  /* Internet Explorer 10+ */
    scrollbar-width: none; 
}

.layout-for-search-right::-webkit-scrollbar {
    display: none;
}
.layout-for-search-right {
    overflow-y: scroll;
    -ms-overflow-style: none;  /* Internet Explorer 10+ */
    scrollbar-width: none; 
}

/* .layout-for-search {
    -ms-overflow-style: none;
} */
.layout-wrapper {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
}
.header {
    z-index: 999;
    position: fixed;
    right: 0px;
    left: 80px;
    top: 0;
    background-color: #FFFFFF;
}
.header .header-container {
    display: flex;
    height: 90px;
    padding: 0 30px;
}
.header .header-body {
    position: relative;
    display: flex;
    flex: 1 1 auto;
    align-items: center;
    justify-content: space-between;
}
.header .header-body .header-body-left {
    flex: 1 1 0%;
}
.header ul.navbar-nav {
    flex-direction: row;
    align-items: center;
}
.navbar-nav {
    display: flex;
    flex-direction: column;
    padding-left: 0;
    margin-bottom: 0;
    list-style: none;
}
.header .navigation-toggler {
    display: none;
    margin-right: 30px;
}
.header .search-toggler {
    display: none;
}
.header-search-form {
    position: relative;
    width: 450px;
}
.header-search-form .input-group {
    align-items: center;
}
.header-search-form .input-group-prepend {
    position: absolute;
    z-index: 4;
}
.header-search-form .form-control {
    height: auto;
    --tw-text-opacity: 1;
    color: rgba(0, 0, 0, var(--tw-text-opacity));
    border-radius: 8px;
    padding: 10px 15px;
    padding-left: 45px;
}
.header-search-form .input-group-append {
    position: absolute;
    right: 0px;
    z-index: 4;
    height: 36px;
}
.header-search-form .header-search-close-btn {
    display: none;
}
.dropdown {
    display: inline;
}
ul.navbar-nav li.nav-item a.nav-link {
    line-height: 100%;
    padding: 10px 15px;
}
ul.navbar-nav li.nav-item a.nav-link.profile-nav-link {
    display: flex;
    align-items: center;
    padding: 0px;
    margin-left: 10px;
}
ul.navbar-nav li.nav-item a.nav-link:hover, ul.navbar-nav li.nav-item a.nav-link:focus {
    --tw-text-opacity: 1;
    color: rgba(0, 0, 0, var(--tw-text-opacity));
    outline: 2px solid transparent;
    outline-offset: 2px;
}
.dropdown-toggle.hide-caret::after {
    display: none !important;
}
.navigation {
    z-index: 998;
    width: 80px;
    position: fixed;
    display: flex;
    flex-direction: column;
    left: 0;
    bottom: 0;
    top: 0;
    background-color: #1f2937;
}
.navigation .logo {
    margin-left: auto;
    margin-right: auto;
    margin-top: 30px;
    font-size: 40px;
    font-weight: bold;
    text-align: center;
    color: #ff9500;
    height: 90px;
}
.navigation ul {
    padding: 0 10px;
    display: flex;
    flex-direction: column;
    flex: 1;
    margin-top: 1rem;
}
.navigation ul li {
    margin-bottom: 7px;
    position: relative;
}
.navigation ul li a {
    color: rgba(255, 255, 255, 0.8) !important;
    display: flex;
    flex-direction: column;
    padding: 15px 0;
    justify-content: center;
    align-items: center;
    transition: background 0.3s;
    border-radius: 5px;
}
.navigation ul li a img {
    height: 40px;
}
.navigation ul li a .badge {
    top: 0;
    right: 0;
    position: absolute;
    padding: 3px 5px;
}

.badge {
    font-size: 0.75rem;
}
.el-dropdown-link {
    cursor: pointer;
    color: #409EFF;
}
.el-icon-arrow-down {
    font-size: 12px;
}
.module-icon-wrapper {
    border-radius: 0.25rem;
    padding: 0.5rem;
}
.module-item {
    display: flex;
}
.list-group .list-group-item {
    background: white !important;
    text-decoration: none !important;
    color: black;
    outline: none;
}
.list-group .list-group-item {
    background: white !important;
    text-decoration: none !important;
    color: black;
    outline: none;
}
.layout-wrapper .content-wrapper {
    display: flex;
    flex: 1 1 0%;
}
.layout-wrapper .content-wrapper .content-body {
    width: 0;
    display: flex;
    flex: 1 1 0%;
    flex-direction: column;
    background: #FFFFFF;
}
.layout-wrapper .content-wrapper .content-body .content {
    padding: 30px;
    padding-top: 90px;
    padding-left: 110px;
    padding-bottom: 0;
}
</style>