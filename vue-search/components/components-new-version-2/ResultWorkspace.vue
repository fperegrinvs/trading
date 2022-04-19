<template>
    <div class="frame">
        <div class="actions">
            <div class="button">
                <p class="meta">Xóa</p>
                <img src="@/assets/icons-figma/bx-trash.svg" alt="">
            </div>
            <div class="button">
                <p class="meta">Đổi tên</p>
                <img src="@/assets/icons-figma/bx-rename.svg" alt="">
            </div>
        </div>
        <div class="header">
            <div class="title">
                Đọc lại sau
                <div class="metas">
                    <p class="meta">Đã tạo 2 tháng trước</p>
                    <div class="divider"></div>
                    <p class="meta">Đã lưu 32 văn bản</p>
                </div>
            </div>
            <div class="button">
                <p class="meta">Chia sẻ</p>
                <img src="@/assets/icons-figma/bx-share-alt.svg" alt="">
            </div>
        </div>
    </div>
</template>
<script>
export default {
    
}
</script>
<style scoped>
.frame {
    /* Auto layout */

display: flex;
flex-direction: column;
align-items: flex-start;
padding: 16px 24px;

position: absolute;
width: 608px;
height: 117px;
left: 416px;
top: 136px;

background: #F8F0F0;
border-radius: 8px;
}

.actions {
    /* Auto layout */

display: flex;
flex-direction: row;
align-items: flex-start;
padding: 0px;

position: static;
width: 560px;
height: 24px;
left: 24px;
top: 77px;


/* Inside auto layout */

flex: none;
order: 1;
align-self: stretch;
flex-grow: 0;
margin: 8px 0px;
}
.header {
    /* Auto layout */

display: flex;
flex-direction: row;
align-items: flex-start;
padding: 0px;

position: static;
width: 560px;
height: 53px;
left: 24px;
top: 16px;


/* Inside auto layout */

flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;
margin: 8px 0px;
}
</style>