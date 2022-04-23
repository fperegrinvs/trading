<template>
    <div class="bookmark">
        <div class="categories">
            <div class="section">
                <h1 class="title">
                    Lưu vào kho của bạn
                </h1>
                <div class="categories" v-if="testCheckboxList.length > 0">
                    <div class="field" v-for="(item, index) in dataWorkspace" :key="index + 'field'">
                        <el-checkbox v-model="testCheckboxList[index]['checkbox']">{{item.name}}</el-checkbox>
                    </div>
                </div>

            </div>
            <div class="new">
                <h1 class="title" @click="handleClickTitle">
                    Tạo chuyên mục mới
                </h1>
                <el-input placeholder="Nhập tên chuyên mục" v-model="input"></el-input>
            </div>
            <div class="frame-buttons">
                <el-button class="btn-image"><img src="@/assets/icons-figma/bx-bookmark-minus.svg" alt=""></el-button>
                <el-button @click="handleClickSaveButton" class="btn-not-image">Lưu</el-button>
            </div>
        </div>
        
    </div>
</template>
<script>
import {mapActions, mapState} from 'vuex'
export default {
    computed: {
        ...mapState({
            dataWorkspace: state => state.workspace.workspace.data,
            currentDocCopyFromHTML: state => state.document.currentDocCopyFromHTML,
        })
    },
    data() {
        return {
            testCheckboxList: [],
            input: ''
        }
    },
    methods: {
        ...mapActions("workspace", ['postDocToWorkspace']),
        handleClickTitle() {
            console.log(this.testCheckboxList);
        },
        handleClickSaveButton() {
            this.testCheckboxList.forEach(ele => {
                if(ele['checkbox'] == true) {
                    console.log(ele['id'])
                    this.postDocToWorkspace({workspace_id: ele['id'], doc_id: this.currentDocCopyFromHTML.id})
                    // console.log(this.currentDocCopyFromHTML);   
                }
            })
        }
    },
    watch: {
        dataWorkspace() {
            this.dataWorkspace.forEach((ele, index) => {
                // console.log(ele)
                let obj= {}
                obj['checkbox'] = false
                obj['id'] = ele.id
                this.testCheckboxList.push(obj)
            })
            console.log(this.testCheckboxList);
        }
    }
}
</script>
<style scoped>
.frame-buttons {
    display: flex;
    margin-top: 8px;
}
.frame-buttons > button.btn-not-image {
        padding: 10px 55.13px;
}
.frame-buttons > button.btn-image {
        padding: 5px 7px;
}
.bookmark {
    position: relative;
width: 218px;
height: 284px;
}
.bookmark > .categories > .section > .title {
    font-family: 'Noto Sans';
    font-style: normal;
    font-weight: 700;
    font-size: 12px;
    line-height: 24px;
    color: #000000;
}
.bookmark > .categories > .new > h1 {
    font-family: 'Noto Sans';
    font-style: normal;
    font-weight: 700;
    font-size: 12px;
    line-height: 24px;
    color: #000000;
}
</style>