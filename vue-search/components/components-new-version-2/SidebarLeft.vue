<template>
    <div class="sidebar-left">
        <div class="section">
            <h1 class="title">
                Chuyên mục lưu trữ
            </h1>
            <div class="categories">
                <!-- <div v-for="index in 4" :key="index" class="field">
                    <div class="icon">
                        <img src="@/assets/icons-figma/bx-folder.svg" alt="">
                    </div>
                    <div class="text">
                        Tất cả văn bản đã lưu
                    </div>
                </div> -->
                <div class="field" :class="{chosen: currentWorkspace.id == item.id}" v-for="(item,index) in dataWorkspace" :key="index + 'dataWorkspace'" @click="chooseCurrentWorkspace(item)">
                    <div class="icon">
                        <img src="@/assets/icons-figma/bx-folder.svg" alt="">
                    </div>
                    <div class="text">
                        {{item.name}}
                    </div>
                </div>
            </div>
        </div>
        <div class="new">
            <h1 class="title">
                Thêm chuyên mục mới
            </h1>
            <div class="add-bar">
                <el-input class="test-input-sidebar-left" placeholder="Nhập tên chuyên mục" v-model="input" @keypress.enter.native.prevent="onEnter"></el-input>
                <el-button class="test-button-sidebar-left">+</el-button>
            </div>
        </div>
    </div>
</template>
<script>
import {mapState, mapActions} from 'vuex'
export default {
    data() {
        return {
            input: '',
            currentWorkspaceHTML: '',
        }
    },
    computed: {
        ...mapState({
            dataWorkspace: state => state.workspace.workspace.data,
            workspaceStatus: state => state.workspace.status,
            allDocsOfAllWorkspace: state => state.workspace.allDocsOfAllWorkspace,


            currentWorkspace: state => state.workspace.currentWorkspace,
        })
    },
    methods: {
        ...mapActions("workspace", ["postWorkspace", "getWorkspace", "setCurrentWorkspace", "getDocsOfWorkspace", "getAllDocsOfAllWorkspace"]),
        onEnter() {
            this.postWorkspace({name: this.input, description: new Date(Date.now())})
            this.input = '';
        },
        chooseCurrentWorkspace(workspace) {
            this.setCurrentWorkspace(workspace);
            this.getDocsOfWorkspace(workspace.id);
        }
    },
    watch: {
        workspaceStatus() {
            if (this.workspaceStatus == 'postWorkspaceSuccess') {
                this.getWorkspace();
            }
            // if (this.workspaceStatus == 'postDocToWorkspaceSuccess') {
            //     this.getWorkspace();

            // }
        },
        dataWorkspace() {
            this.dataWorkspace.forEach(ele => {
                this.getAllDocsOfAllWorkspace(ele.id);
            })
            let _this = this;
            setTimeout(function() {
                console.log(_this.allDocsOfAllWorkspace);
            }, 500);
        }
    },
    created() {
        
    }
}
</script>
<style scoped>
.sidebar-left::-webkit-scrollbar {
    display: none;
}
.sidebar-left {
    overflow-y: scroll;
    -ms-overflow-style: none;  /* Internet Explorer 10+ */
    scrollbar-width: none; 
}
.categories > .field.chosen > .icon > img {
    filter: invert(42%) sepia(20%) saturate(2241%) hue-rotate(336deg) brightness(100%) contrast(81%);
}

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
cursor: pointer;
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


height: 680px;
height: unset;

background: #FFFFFF;
box-shadow: inset -1px 0px 0px #E5E5E5;
}
</style>