<template>
<div>
    <div class="metas" :class="currentDoc._id == data.docidx ? 'chosen' : ''">
        <div>
            <div class="first">
                <!-- Thông tư -->
                {{data.documentName}}
                <div class="text-divider">
                    ·
                </div>
                <strong class="text-strong">
                    <!-- 09/2021/TT-NHNN -->
                    {{data.signNumber}}
                </strong>
                <div class="text-divider">
                    ·
                </div>
                <!-- Ngân hàng Nhà nước Việt Nam -->
                {{data.publisherName}}
            </div>
            
            
            <h1 class="title" @click="handleClickTitle($event)">
                <template v-if="listFavorite.includes(data.docidx.toString())">
                    <img @click="removeFavorite(data.docidx)" class="icon-bx-star" src="@/assets/icons-figma/bx-star-hover.svg" style="display: inline; margin-right: 10px;" alt="">
                </template>
                <template v-else>
                    <img @click="addFavorite(data.docidx)" class="icon-bx-star" src="@/assets/icons-figma/bx-star.svg" style="display: inline; margin-right: 10px;" alt="">
                </template>
                <!-- <img class="icon-bx-star" src="@/assets/icons-figma/bx-star.svg" style="display: inline; margin-right: 10px;" alt=""> -->
                <!-- Sửa đổi, bổ sung một số điều của Thông tư số 42/2015... -->
                {{data.subject}}
            </h1>
            <p class="content">
                {{data.subject}}
                <!-- Sửa đổi, bổ sung một số điều của Thông tư số 42/2015/TT-NHNN ngày 31 tháng
12 năm 2015 của Thống đốc Ngân hàng Nhà nước Việt Nam quy định về nghiệp vụ
thị trường mở -->
            </p>
            <div class="last">
                <!-- Nguyễn Thị Hồng -->
                {{data.signer}}
                <div class="text-divider">
                    ·
                </div>
                <!-- cập nhật 10/04/2022 -->
                cập nhật {{data.effectiveDateStr}}
            </div>
        </div>
    </div>
</div>
    
</template>
<script>
import {mapActions, mapState} from 'vuex'
export default {
    name: 'result-component',
    props: ["data"],
    methods: {
        ...mapActions('document', ['getDocById', 'getDocProps', 'setCurrentDoc']),
        ...mapActions('search', ['postFavorite', 'deleteFavorite']),
        handleClickTitle(event) {
            console.log(this.data);
            // this.getDocById(this.data.docidx);
            this.setCurrentDoc(this.data);
        },
        addFavorite(docidx) {
            let stringDocidx = docidx.toString()
            this.listFavorite.push(stringDocidx)
            this.postFavorite(stringDocidx)
        },
        removeFavorite(docidx) {
            let stringDocidx = docidx.toString()
            this.$confirm('Xác nhận bỏ đánh dấu tài liệu này?')
                .then(_ => {
                    // alert('yes')
                    let tempIndex = this.listFavorite.indexOf(stringDocidx);
                    this.listFavorite.splice(tempIndex, 1);
                    this.deleteFavorite(stringDocidx)
                })
                .catch(_ => {
                    // alert('no')
                });
        },
    },
    computed: {
        ...mapState({
            currentDoc: state => state.document.currentDoc,
            listFavorite: state => state.search.listFavorite,
        })
    }
}
</script>
<style scoped>
.metas {
    padding: 12px 32px 12px 60px;
    cursor: pointer;
}
.metas:hover, .metas.chosen {
    background: #F8F0F0;
border-radius: 4px 0px 0px 4px;
}
.first {
    font-family: 'Noto Sans';
font-style: normal;
font-weight: 400;
font-size: 13px;
line-height: 22px;
/* identical to box height, or 169% */

letter-spacing: -0.01em;

color: #272525;
}
.text-divider {
    height: 22px;
    width: 4px;
    font-family: 'Noto Sans';
font-style: normal;
font-weight: 400;
font-size: 13px;
line-height: 22px;
/* identical to box height, or 169% */


color: #272525;


/* Inside auto layout */

flex: none;
order: 1;
flex-grow: 0;
margin: 0px 4px;
display: inline-block;
}
.title {
    font-family: 'Noto Serif';
font-style: normal;
font-weight: 600;
font-size: 18px;
line-height: 130%;
/* or 23px */

letter-spacing: -0.01em;

color: #AF542D;
margin-left: -40px;
overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    line-clamp: 1;
    -webkit-box-orient: vertical;
}
.content {
    font-family: 'Noto Sans';
font-style: normal;
font-weight: 400;
font-size: 14px;
line-height: 22px;
/* or 157% */

letter-spacing: -0.01em;

color: #504D4D;


/* Inside auto layout */

flex: none;
order: 2;
align-self: stretch;
flex-grow: 0;
margin: 4px 0px;
}
.last {
    font-family: 'Noto Sans';
font-style: normal;
font-weight: 400;
font-size: 13px;
line-height: 22px;
/* identical to box height, or 169% */

letter-spacing: -0.01em;

color: #272525;


/* Inside auto layout */

flex: none;
order: 2;
flex-grow: 0;
margin: 0px 8px;
margin-left: 0px;
}
.text-strong {
    font-family: 'Noto Sans';
font-style: normal;
font-weight: 700;
font-size: 13px;
line-height: 22px;
/* identical to box height, or 169% */

letter-spacing: -0.01em;

color: #272525;


/* Inside auto layout */

/* flex: none; */
/* order: 2; */
/* flex-grow: 0; */
/* margin: 0px 8px; */
}
</style>