<template>
    <div class="sidebar-left">
        <div class="section">
            <h1 class="title">
                Chuyên mục lưu trữ
            </h1>
            <div class="categories">
                <div v-for="index in 4" :key="index" class="field">
                    <div class="icon">
                        <img src="@/assets/icons-figma/bx-folder.svg" alt="">
                    </div>
                    <div class="text">
                        Tất cả văn bản đã lưu
                    </div>
                </div>
            </div>
        </div>
        <div class="new">
            <h1 class="title">
                Thêm chuyên mục mới
            </h1>
            <div class="add-bar">
                <el-input class="test-input-sidebar-left" placeholder="Please input" v-model="input"></el-input>
                <el-button class="test-button-sidebar-left">+</el-button>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    
}
</script>
<style scoped>
.add-bar {
    margin-top: 8px;
}
.test-input-sidebar-left {
    width: 174px;
}
/* .test-input-sidebar-left > input {
        line-height: 36px;
    height: 36px;
    width: 174px;
} */
.test-button-sidebar-left {
    padding: 10px 14.14px;
}
.icon {
    margin: 0 6px;
}
.text {
    font-family: 'Noto Sans';
font-style: normal;
font-weight: 400;
font-size: 13px;
line-height: 24px;
/* identical to box height, or 185% */


color: #595959;
}
.field {
    /* Auto layout */

display: flex;
flex-direction: row;
align-items: center;
padding: 8px 8px 8px 12px;
}
.categories {
    margin: 8px 0px;
    display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
}
.title {
    font-family: 'Noto Sans';
font-style: normal;
font-weight: 700;
font-size: 13px;
line-height: 24px;
/* identical to box height, or 185% */

text-transform: uppercase;

color: #272525;
}
.sidebar-left {
    display: flex;
flex-direction: column;
align-items: flex-start;
padding: 24px 16px;

position: absolute;
width: 256px;
left: 0px;
top: 72px;
bottom: 0px;

background: #FFFFFF;
box-shadow: inset -1px 0px 0px #E5E5E5;
}
</style>