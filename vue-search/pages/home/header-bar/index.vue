<template>
    <div class="header-bar">
        <div class="logo">
            <img src="@/assets/images/Logo.svg" alt="">
        </div>
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
        </ul>
        <!-- <div class="menu">
            <div class="li-text">Khai thác</div>
            <div class="li-text">Thống kê</div>
            <div class="li-text">Giới thiệu</div>
        </div> -->
    </div>
</template>
<script>
export default {
    
}
</script>
<style scoped>
.body {
    font-family: "Noto Sans"
}
.logo {
    position: absolute;
    width: 119px;
    height: 26px;
    left: 24px;
    top: calc(50% - 26px/2);
}
.header-bar {
    position: absolute;
    height: 90px;
    left: 0px;
    right: 0px;
    top: 0px;

    background: rgba(255, 255, 255, 0.01);
    box-shadow: inset 0px -1px 0px rgba(255, 255, 255, 0.08);
    
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
</style>