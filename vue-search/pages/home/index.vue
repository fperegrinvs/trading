<template>
    <div>
        <div class="bg">
            <div class="overlay"></div>
            <HeaderBar />
            <div class="features">
                <div class="card">
                    <div class="cover">
                        <div class="image">

                        </div>
                        <p class="text-4" style="margin-left: 33px; margin-right: 33px;">Tra cứu hơn 2,000,000<br /> văn bản số hóa</p>
                    </div>
                </div>
                <div class="card">
                    <div class="cover">
                        <div class="image">

                        </div>
                        <p class="text-4" style="margin-left: 15px; margin-right: 15px;">Tìm kiếm văn bản hiệu quả và nhanh chóng hơn thông qua hệ thống phân loại chính xác</p>
                    </div>
                </div>
                <div class="card">
                    <div class="cover">
                        <div class="image">

                        </div>
                        <p class="text-4" style="margin-left: 15px; margin-right: 15px;">Nâng cao hiệu suất tìm kiếm bằng việc gợi ý kết quả<br /> thông minh</p>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="content">
            <h1 class="text-1">Thư viện khai thác nội dung văn bản số.</h1>
            <h4 class="text-2">Truy cập hiệu quả, nhanh chóng <strong>2,000,000+</strong> đầu mục nội dung.</h4>
            <!-- <div class="search"> -->
            <el-input class="input-home"
                placeholder="Bạn đang cần tìm kiếm gì?"
                suffix-icon="el-icon-search"
                v-model="input1">
            </el-input>
            <!-- </div> -->
            <p class="text-3">Nổi bật — văn bản pháp quy, về việc sử dụng đất, cải cách giáo dục</p>
        </div>
    </div>
</template>
<script>
import HeaderBar from './header-bar/index.vue'
import Vue from 'vue'
Vue.component("HeaderBar", HeaderBar)
export default {
    name: 'HomePage',
    data() {
        return {
            input1: ''
        }
    }
}
</script>
<style scoped>
.bg {
    height: 560px;
    background: url("@/assets/images/background.png");
    background-size: cover;
    background-position: center;
}
.overlay {
    position: absolute;
    left: 0%;
    right: 0%;
    top: 0%;
    bottom: 0%;
    height: 560px;
    /* background: url("@/assets/images/background.png");
    background-size: cover;
    background-position: center; */
}
.overlay::before{
  background-color: rgba(62, 51, 46, 0.85);
  content: '';
  display: block;
  height: 100%;
  position: absolute;
  width: 100%;
}
.features {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    padding: 0px;

    position: absolute;
    width: 784px;
    height: 290px;
    left: 328px;
    top: 415px;
}
.card {
    /* Auto layout */

display: flex;
flex-direction: column;
align-items: flex-start;
padding: 24px 0px;

position: static;
width: 240px;
height: 290px;
left: 0px;
top: 0px;

background: #F8F0F0;
border-radius: 12px;

/* Inside auto layout */

flex: none;
order: 0;
align-self: stretch;
flex-grow: 1;
margin: 0px 32px;
}

.cover {
    position: static;
width: 240px;
height: 160px;
left: calc(50% - 240px/2);
top: 24px;


/* Inside auto layout */

flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;
margin: 16px 0px;
}

.card:first-child .cover .image {
    /* background-image: ; */
width: 174px;
height: 136.38px;
margin-left: 33px;

background-image: url("@/assets/images/feature.svg");
background-size: 174px 136.38px;
}

.card:nth-child(2) .cover .image {
    /* background-image: ; */
width: 174px;
height: 136.38px;
margin-left: 33px;

background-image: url("@/assets/images/feature2.svg");
background-size: 174px 136.38px;
}

.card:nth-child(3) .cover .image {
    /* background-image: ; */
width: 174px;
height: 136.38px;
margin-left: 33px;

background-image: url("@/assets/images/feature3.svg");
background-size: 174px 136.38px;
}

.content {
    position: absolute;
    width: 560px;
    height: 171px;
    left: calc(50% - 560px/2);
    bottom: 673px;
    top: 180px;
}
.text-1 {
    font-family: 'Noto Serif';
    font-style: normal;
    font-weight: 700;
    font-size: 24px;
    line-height: 32px;
    color: #FFFFFF;
}
.text-2 {
    font-family: 'Noto Serif';
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 32px;
    color: #FFFFFF;
}
.search {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    padding: 16px;

    position: absolute;
    height: 56px;
    left: 0px;
    right: 0px;
    top: calc(50% - 56px/2 + 25.5px);

    background: #FFFFFF;
    border-radius: 6px;
}
.text-3 {
    font-family: 'Noto Sans';
font-style: normal;
font-weight: 400;
font-size: 13px;
line-height: 24px;
color: #FFFFFF;
margin-top: 12px;
}
.text-4 {
    font-family: 'Noto Sans';
font-style: normal;
font-weight: 400;
font-size: 14px;
line-height: 150%;
/* or 21px */

text-align: center;
letter-spacing: -0.01em;

color: #453630;


/* Inside auto layout */

flex: none;
order: 1;
align-self: stretch;
flex-grow: 1;
margin: 16px 0px;
}
.text-4:nth-child(3)  {
    margin-left: 33px;
    margin-right: 33px;
}
p.text-4:nth-child(2) {
    margin-left: 15px;
    margin-right: 15px;
}
p.text-4:nth-m {
    margin-left: 33px;
    margin-right: 33px;
}
</style>
