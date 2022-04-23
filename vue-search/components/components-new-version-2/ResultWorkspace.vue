<template>
    <div class="frame">
        
        <div class="header">
            <div class="title">
                <!-- Đọc lại sau -->
                {{currentWorkspace.name}}
                <div class="metas">
                    <p class="meta">
                        <!-- Đã tạo 2 tháng trước -->
                        {{time_ago(currentWorkspace.description)}}
                    </p>
                    <div class="divider">·</div>
                    <p class="meta">
                        <!-- Đã lưu 32 văn bản -->
                        Đã lưu {{currentWorkspace.document_count}} văn bản
                    </p>
                </div>
            </div>
            <div class="button">
                <img src="@/assets/icons-figma/bx-share-alt.svg" alt="">
                <p class="meta">Chia sẻ</p>
                
            </div>
        </div>
        <div class="actions">
            <div class="button" >
                <img style="cursor: pointer;" @click="handleClickDeleteWorkspace" src="@/assets/icons-figma/bx-trash.svg" alt="">
                <p class="meta">Xóa</p>
                
            </div>
            <div class="button">
                <img style="cursor: pointer;" @click="handleClickRenameWorkspace" src="@/assets/icons-figma/bx-rename.svg" alt="">
                <p class="meta">Đổi tên</p>
                
            </div>
        </div>
    </div>
</template>
<script>
import {mapState, mapActions} from 'vuex'
export default {
    computed: {
        ...mapState({
            currentWorkspace: state => state.workspace.currentWorkspace,
            workspaceStatus: state => state.workspace.status
        })
    },
    mounted() {
        // var aDay = 24 * 60 * 60 * 1000;
        // console.log(this.time_ago(new Date(Date.now() - aDay)));
        // console.log(this.time_ago(new Date(Date.now() - aDay * 2)));
        console.log(this.time_ago(this.currentWorkspace.description))
    },
    watch: {
        workspaceStatus() {
            if (this.workspaceStatus == 'deleteWorkspaceSuccess') {
                this.getWorkspace()
            }
        }
    },
    methods: {
        ...mapActions("workspace", ["deleteWorkspace", "getWorkspace"]),
        handleClickRenameWorkspace() {},
        handleClickDeleteWorkspace() {
            this.deleteWorkspace(this.currentWorkspace.id)
        },
        time_ago(time) {

            switch (typeof time) {
                case 'number':
                break;
                case 'string':
                time = +new Date(time);
                break;
                case 'object':
                if (time.constructor === Date) time = time.getTime();
                break;
                default:
                time = +new Date();
            }
            var time_formats = [
                [60, 'giây', 1], // 60
                [120, '1 phút trước', '1 minute from now'], // 60*2
                [3600, 'phút', 60], // 60*60, 60
                [7200, '1 giờ trước', '1 hour from now'], // 60*60*2
                [86400, 'giờ', 3600], // 60*60*24, 60*60
                [172800, 'Hôm qua', 'Tomorrow'], // 60*60*24*2
                [604800, 'ngày', 86400], // 60*60*24*7, 60*60*24
                [1209600, 'Tuần trước', 'Next week'], // 60*60*24*7*4*2
                [2419200, 'tuần', 604800], // 60*60*24*7*4, 60*60*24*7
                [4838400, 'Tháng trước', 'Next month'], // 60*60*24*7*4*2
                [29030400, 'tháng', 2419200], // 60*60*24*7*4*12, 60*60*24*7*4
                [58060800, 'Năm trước', 'Next year'], // 60*60*24*7*4*12*2
                [2903040000, 'năm', 29030400], // 60*60*24*7*4*12*100, 60*60*24*7*4*12
                [5806080000, 'Thế kỉ trước', 'Next century'], // 60*60*24*7*4*12*100*2
                [58060800000, 'thế kỉ', 2903040000] // 60*60*24*7*4*12*100*20, 60*60*24*7*4*12*100
            ];
            var seconds = (+new Date() - time) / 1000,
                token = 'trước',
                list_choice = 1;

            if (seconds < 1) {
                return 'Vừa mới tạo'
            }
            if (seconds < 0) {
                seconds = Math.abs(seconds);
                token = 'từ giờ';
                list_choice = 2;
            }
            var i = 0,
                format;
            while (format = time_formats[i++])
                if (seconds < format[0]) {
                if (typeof format[2] == 'string')
                    return format[list_choice];
                else
                    return "Đã tạo " + Math.floor(seconds / format[2]) + ' ' + format[1] + ' ' + token;
                }
            return time;
            }            
    }
}
</script>
<style scoped>
.header > .button > img, .header > .button {
    text-align: center;
}
.header > .button > img {
    display: inline-block
}
.header > .button > p.meta {
    display: inline-block;
    font-family: 'Noto Sans';
font-style: normal;
font-weight: 400;
font-size: 12px;
line-height: 22px;
/* identical to box height, or 183% */

letter-spacing: -0.01em;

color: #272525;
}
.actions > .button:not(:first-child) {
    margin-left: 24px;
}
.actions > .button > img {
    display: inline-block;
}
.actions > .button > p.meta {
    display: inline-block;
    font-family: "Noto Sans";
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 22px;
    letter-spacing: -0.01em;
    color: rgb(39, 37, 37);
}
.frame {
    /* Auto layout */

display: flex;
flex-direction: column;
align-items: flex-start;
padding: 16px 24px;

/* position: absolute; */
width: 608px;
height: 117px;
/* left: 416px;
top: 136px; */
/* margin-left: 160px; */
margin-left: 44px;
margin-top: 24px;

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
/* left: 24px;
top: 77px; */


/* Inside auto layout */

/* flex: none;
order: 1;
align-self: stretch;
flex-grow: 0; */
margin: 4px 0px; 
}
.header > .title > .metas > .divider {
        width: 4px;
    height: 22px;
    font-family: "Noto Sans";
    font-style: normal;
    font-weight: 400;
    font-size: 13px;
    line-height: 22px;
    color: rgb(80, 77, 77);
    margin: 0px 8px;
}
.header > .title > .metas > p {
    font-family: "Noto Sans";
    font-style: normal;
    font-weight: 400;
    font-size: 13px;
    line-height: 22px;
    letter-spacing: -0.01em;
    color: rgb(80, 77, 77);
}
.header > .title > .metas {
        display: flex;
    flex-direction: row;
    align-items: flex-start;
    padding: 0px;
    position: static;
    width: 560px;
    height: 22px;
    /* left: 0px; */
    /* top: 31px; */
    /* flex: none; */
    /* order: 1; */
    /* flex-grow: 0; */
    margin: 4px 0px;
}
.header > .title {
        font-family: "Noto Serif";
    font-style: normal;
    font-weight: 500;
    font-size: 18px;
    line-height: 150%;
    letter-spacing: -0.01em;
    color: rgb(39, 37, 37);
    width: 520px;
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
/* margin: 8px 0px; */
}
</style>