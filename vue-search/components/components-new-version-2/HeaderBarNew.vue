<template>
    <div class="dark">
        <div class="logo">
            <img src="@/assets/images/Logo.svg" alt="">
        </div>
        <!-- <div class="input"> -->
            <el-input
                @keypress.enter.native.prevent="onEnter" 
                placeholder="Bạn đang cần tìm kiếm gì?"
                suffix-icon="el-icon-search"
                v-model="input1"
                class="input-header-bar-new">
            </el-input>
        <!-- </div>         -->
        <ul class="menu">
            <li class="li-text">
                Khai thác
                <div class="divider"></div>
            </li>
            <li class="li-text">
                Thống kê
                <div class="divider"></div>
            </li>
            <li class="li-text">
                Giới thiệu
                <div class="divider"></div>
            </li>
            <li class="li-text li-user">
                <el-dropdown>
                    <span class="el-dropdown-link">
                        Gia Nguyễn<i class="el-icon-arrow-down el-icon--right"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item>Action 1</el-dropdown-item>
                        <el-dropdown-item>Action 2</el-dropdown-item>
                        <el-dropdown-item>Action 3</el-dropdown-item>
                        <el-dropdown-item disabled>Action 4</el-dropdown-item>
                        <el-dropdown-item divided>Action 5</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </li>
        </ul>
    </div>
</template>
<script>
import {mapActions, mapState} from 'vuex'
export default {
    name: "header-bar-component-new",
    data() {
        return {
            input1: ''
        }
    },
    methods: {
        ...mapActions('search', ['getSearchAPI', 'setSearchFromDetail']),
        onEnter() {
            this.setSearchFromDetail(this.input1);
        },
    },
    created() {
      if (this.searchFromDetail) {
        this.input1 = this.searchFromDetail;
      }
    },
    computed: {
        ...mapState({
            searchFromDetail: state => state.search.searchFromDetail,
        })
    },
}
</script>
<style scoped>
.dark {
    position: absolute;
height: 72px;
left: 0px;
right: 0px;
top: 0px;

background: #453630;
box-shadow: inset 0px -1px 0px rgba(255, 255, 255, 0.08);
}
.logo {
    position: absolute;
width: 119px;
height: 26px;
left: 24px;
top: calc(50% - 26px/2);
}
.menu {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
    padding: 0px;

    position: absolute;
    width: 466px;
    height: 22px;
    right: 24px;
    top: calc(50% - 22px/2);
}
.li-text {

    font-family: 'Noto Sans';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 20px;
    display: flex;
    align-items: center;
    font-feature-settings: 'tnum' on, 'lnum' on;

    color: #FFFFFF;


    /* Inside auto layout */

    flex: none;
    order: 0;
    flex-grow: 0;
    /* margin: 0px 24px; */
}
.divider {
    position: static;
    width: 1px;
    height: 16px;
    /* left: 86px; */
    /* top: 3px; */

    background: rgba(255, 255, 255, 0.1);

    /* Inside auto layout */

    flex: none;
    order: 1;
    flex-grow: 0;
    margin: 0px 24px;
}
.input-header-bar-new {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    position: absolute;
    left: 175px;
    right: 705px;
    top: calc(50% - 40px/2);
    width: 560px;
    height: 40px;
}

</style>