<template>
<div class="layout-wrapper">
<div>
  <div  class="header d-print-none">
    <div  class="header-container">
      <div  class="header-body">
        <div  class="header-body-left">
          <ul  class="navbar-nav">
            <li  class="nav-item navigation-toggler">
              <a  href="javascript: void(0)" class="nav-link">
              </a>
            </li>
            <li  class="nav-item search-toggler">
              <a  href="javascript: void(0)" class="nav-link">
              </a>
            </li>
            <li  class="nav-item">
              <div>
                <div  class="header-search-form">
                  <form  novalidate="" class="ng-untouched ng-pristine ng-valid">
                    <div  class="input-group">
                      <div  class="input-group-prepend">
                      </div>
                      <!-- <input  type="text" placeholder="Tìm kiếm ..." class="form-control ng-untouched ng-pristine ng-valid" ng-reflect-options="[object Object]" ng-reflect-model=""> -->
                      <el-input @keypress.enter.native.prevent="onEnter" prefix-icon="el-icon-search" v-model="input" placeholder="Tìm kiếm ..."></el-input>
                      <div  class="input-group-append">
                        <button  type="button" class="btn header-search-close-btn">
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <div  class="header-body-right">
          <div  >
            <ul  class="navbar-nav">
              <li class="nav-item dropdown">
                <el-dropdown trigger="click">
                    <a>
                        <img  src="@/assets/icons/bxs-grid-alt.svg" class="rounded-circle">
                    </a>
                    <el-dropdown-menu slot="dropdown" class="testDropdown">
                        <el-dropdown-item>
                          <div  class="list-group-item module-item cursor-pointer ng-star-inserted">
                              <div  class="module-icon-wrapper" style="background-color: rgb(147, 197, 253);">
                                  <img  alt="" src="@/assets/icons/white/bx-server.svg">
                              </div>
                              <div  class="module-text" style="padding-left: 1rem; line-height: 21px;">
                                  <strong >Số hoá tài liệu</strong>
                                  <p >Số hoá tài liệu</p>
                              </div>
                          </div>
                        </el-dropdown-item>
                        <el-dropdown-item>
                          <div  class="list-group-item module-item cursor-pointer ng-star-inserted">
                              <div  class="module-icon-wrapper" style="background-color: rgb(110, 231, 183);">
                                  <img  alt="" src="@/assets/icons/white/bxs-book-content.svg">
                              </div>
                              <div  class="module-text" style="padding-left: 1rem; line-height: 21px;">
                                  <strong >Quản lý tài liệu</strong>
                                  <p >Quản lý tài liệu</p>
                              </div>
                            </div>
                        </el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
              </li>
              <li  ngbdropdown="" class="nav-item dropdown">
                <el-dropdown trigger="click">
                    <a style="margin-left: 10px;">
                        <span class="el-dropdown-link" style="display: inline-block;">
                            Khoa Ngo
                        </span>
                        <img style="display: inline-block;" src="@/assets/icons/bxs-user.svg" alt="avatar" class="rounded-circle">
                        <i class="el-icon-arrow-down el-icon--right"></i>
                    </a>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item>Tài liệu của tôi</el-dropdown-item>
                        <el-dropdown-item divided>Đăng xuất</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
<div  class="content-wrapper">
  <div  >
    <div  class="navigation">
      <div  class="logo">
        <a  href="https://chinhta123.com">
          <img  src="@/assets/images/ademax_no_font.png" alt="logo">
        </a>
      </div>
      <ul >
        <li  attooltipposition="right" class="mat-tooltip-trigger ng-star-inserted" ng-reflect-message="Tìm kiếm" aria-describedby="cdk-describedby-message-0" cdk-describedby-host="">
          <a  ng-reflect-router-link="/app/search" href="/app/search">
            <img  src="@/assets/icons/primary/bx-search-alt.svg">
            <!--bindings={}-->
          </a>
        </li>
        <!--container-->
        <li  attooltipposition="right" class="mat-tooltip-trigger ng-star-inserted" ng-reflect-message="Các mục đánh dấu" aria-describedby="cdk-describedby-message-1" cdk-describedby-host="">
          <a  ng-reflect-router-link="/app/bookmark" href="/app/bookmark">
            <img  src="@/assets/icons/gray/bxs-star.svg">
            <!--bindings={}-->
          </a>
        </li>
        <!--container-->
        <li  attooltipposition="right" class="mat-tooltip-trigger ng-star-inserted" ng-reflect-message="Tài liệu của tôi" aria-describedby="cdk-describedby-message-2" cdk-describedby-host="">
          <a  ng-reflect-router-link="/app/mydoc" href="/app/mydoc">
            <img  src="@/assets/icons/gray/bxs-user-detail.svg">
            <!--bindings={}-->
          </a>
        </li>
        <!--container-->
        <li  attooltipposition="right" class="mat-tooltip-trigger ng-star-inserted" ng-reflect-message="Duyệt tài liệu" aria-describedby="cdk-describedby-message-3" cdk-describedby-host="">
          <a  ng-reflect-router-link="/app/approve" href="/app/approve">
            <img  src="@/assets/icons/gray/bx-list-check.svg">
            <span  class="badge badge-danger ng-star-inserted">2</span>
            <!--bindings={
  "ng-reflect-ng-if": "true"
}-->
          </a>
        </li>
        <!--container-->
        <li  attooltipposition="right" class="mat-tooltip-trigger ng-star-inserted" ng-reflect-message="Quy trình duyệt" aria-describedby="cdk-describedby-message-4" cdk-describedby-host="">
          <a  ng-reflect-router-link="/app/workflow" href="/app/workflow">
            <img  src="@/assets/icons/gray/bx-list-ol.svg">
            <!--bindings={}-->
          </a>
        </li>
        <!--container-->
        <!--bindings={
  "ng-reflect-ng-for-of": "[object Object],[object Object"
}-->
      </ul>
    </div>
  </div>
  <div class="content-body">
      <div class="content">
          <slot></slot>
      </div>
  </div>
</div>
</div>
</template>
<script>
import {mapActions} from 'vuex';
export default {
    data() {
      return {
        input: '',
      }
    },
    methods: {
      ...mapActions('search', ['getSearchAPI', 'setSearchFromDetail']),
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