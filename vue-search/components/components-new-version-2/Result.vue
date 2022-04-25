<template>
<div>
    <div class="metas" :class="currentDoc._id == data.id ? 'chosen' : ''">
        <div>
            <div class="first">
                <!-- Thông tư -->
                {{data.metadata[2].value}}
                <div class="text-divider">
                    ·
                </div>
                <strong class="text-strong">
                    09/2021/TT-NHNN
                    <!-- {{data.signNumber}} -->
                </strong>
                <div class="text-divider">
                    ·
                </div>
                <!-- Ngân hàng Nhà nước Việt Nam -->
                {{data.metadata[1].value}}
            </div>
            
            
            <h1 class="title" >
                <!-- <template v-if="listFavorite.includes(data.id.toString())">
                    <img @click="removeFavorite(data.docidx)" class="icon-bx-star" src="@/assets/icons-figma/bx-star-hover.svg" style="display: inline; margin-right: 10px;" alt="">
                </template>
                <template v-else>
                    <img @click="addFavorite(data.id)" class="icon-bx-star" src="@/assets/icons-figma/bx-star.svg" style="display: inline; margin-right: 10px;" alt="">
                </template> -->
                <el-dropdown trigger="click" :hide-on-click="false">
                    <template v-if="flag">
                        <img class="icon-bx-star" src="@/assets/icons-figma/bx-star-hover.svg" style="display: inline; margin-right: 10px;" alt="">
                    </template>
                    <template v-else>
                        <img class="icon-bx-star" src="@/assets/icons-figma/bx-star.svg" style="display: inline; margin-right: 10px;" alt="">
                    </template>
  
  <el-dropdown-menu class="test-dropdown-result-component-new-version-2" slot="dropdown">
    <!-- <el-dropdown-item>Action 1</el-dropdown-item>
    <el-dropdown-item>Action 2</el-dropdown-item>
    <el-dropdown-item>Action 3</el-dropdown-item>
    <el-dropdown-item>Action 4</el-dropdown-item>
    <el-dropdown-item>Action 5</el-dropdown-item> -->
    <h1 class="title-dropdown">Lưu vào kho của bạn</h1>
    <!-- <el-dropdown-item v-for="(item, index) in dataWorkspace" :key="index + 'dataworkspace'">
        <el-checkbox :value="checkBool" @change="handleUpdateBool">Option</el-checkbox>
    </el-dropdown-item> -->
    <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
        <el-checkbox v-for="(item, index) in dataWorkspace" :label="item.id" :key="index + 'checkboxworkspace'">{{item.name}}</el-checkbox>
    </el-checkbox-group>
    <h1 class="title-dropdown">Tạo chuyên mục mới</h1>
    <el-input @keypress.enter.native.prevent="onEnterDropdownButtonSave" placeholder="Nhập tên chuyên mục" v-model="inputWorkspace"></el-input>
    <div class="frame-buttons">
                <el-button class="btn-image"><img src="@/assets/icons-figma/bx-bookmark-minus.svg" alt=""></el-button>
                <el-button @click="onEnterDropdownButtonSave" class="btn-not-image">Lưu</el-button>
            </div>
  </el-dropdown-menu>
</el-dropdown>




                <!-- <img class="icon-bx-star" src="@/assets/icons-figma/bx-star.svg" style="display: inline; margin-right: 10px;" alt=""> -->
                <!-- Sửa đổi, bổ sung một số điều của Thông tư số 42/2015... -->
                {{data.title}}
                <!-- {{data.highlight}} -->
                <!-- <template v-html="data.title"></template> -->
            </h1>
            <p v-if="data.highlight" class="content" v-html="data.highlight" @click="handleClickTitle($event)">
                <!-- {{data.title}} -->
                <!-- Sửa đổi, bổ sung một số điều của Thông tư số 42/2015/TT-NHNN ngày 31 tháng
12 năm 2015 của Thống đốc Ngân hàng Nhà nước Việt Nam quy định về nghiệp vụ
thị trường mở -->
            </p>
            <p v-else class="content" v-html="data.title" @click="handleClickTitle($event)"></p>
            <div class="last">
                <!-- Nguyễn Thị Hồng -->
                {{data.metadata[0].value}}
                <div class="text-divider">
                    ·
                </div>
                cập nhật 10/04/2022
                <!-- cập nhật {{data.effectiveDateStr}} -->
            </div>
        </div>
    </div>
</div>
    
</template>
<script>
// import vntk from 'vntk'
// var vntk = require('vntk');
// var wordTokenizer = vntk.wordTokenizer()
import {mapActions, mapState} from 'vuex'
export default {
    name: 'result-component',
    props: ["data"],
    methods: {
        ...mapActions('document', ['getDocById', 'getDocProps', 'setCurrentDoc']),
        ...mapActions('search', ['postFavorite', 'deleteFavorite']),
        ...mapActions('searchNewVersion', ['getDoc',
        'getDocsSimilarityGivenDocId']),
        ...mapActions('workspace', ['getAllDocsOfAllWorkspace', 'postDocToWorkspace', 'getWorkspace', 'deleteDocOfWorkspace', 'postWorkspace']),
        
        onEnterDropdownButtonSave() {
            this.postWorkspace({name: this.inputWorkspace, description: new Date(Date.now())})
            this.inputWorkspace = '';
        },
        handleClickTitle(event) {
            console.log(this.data);
            // this.getDocById(this.data.docidx);
            this.setCurrentDoc(this.data);
            this.getDoc(this.data.id);
            this.getDocsSimilarityGivenDocId({size: 10, doc_id: this.data.id});
            this.$router.push({name: "detail"});
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
        handleUpdateBool(val) {
            console.log(val);
            console.log('retstt')
        },
        handleCheckedCitiesChange(value) {
            // console.log(value)
            // value.forEach(ele => {
            //     this.postDocToWorkspace({workspace_id: ele, doc_id: this.data.id})
            // })
            // if (this.checkedTrueFalse.length == 0) {
            //     value.forEach(ele => {
            //         this.postDocToWorkspace({workspace_id: ele, doc_id: this.data.id});
            //     })
            // }
            // else {
            //     this.checkedTrueFalse.forEach(ele => {
            //         if (this.value.includes(ele)) {
            //             this.postDocToWorkspace({workspace_id: ele, doc_id: this.data.id});
            //         }
            //         else {
            //             this.deleteDocToWorkspace({workspace_id: ele, doc_id: this.data.id});
            //         }
            //     })
            // }
            console.log(value)
            value.forEach(ele => {
                if (!this.checkedTrueFalse.includes(ele)) {
                    this.postDocToWorkspace({workspace_id: ele, doc_id: this.data.id});
                    this.checkedTrueFalse.push(ele);
                    this.flag = true;
                }
                // else {
                //     this.postDocToWorkspace({workspace_id: ele, doc_id: this.data.id});
                // }
            })
            this.checkedTrueFalse.forEach(ele => {
                if (!value.includes(ele)) {
                    this.deleteDocOfWorkspace({workspace_id: ele, doc_id: this.data.id});
                    let index = this.checkedTrueFalse.indexOf(ele);
                    if (index > -1) {
                        this.checkedTrueFalse.splice(index, 1);
                    }
                }
            })
            if (value.length == 0) {
                this.flag = false;
            }
            // let checkedCount = value.length;
            // this.checkAll = checkedCount === this.cities.length;
            // this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length;
        }
    },
    watch: {
        data() {
            // console.log(wordTokenizer(this.searchFromDetail));
            this.flag = false;
            this.checkedCities = []
            this.checkedTrueFalse = []
            this.allDocsOfAllWorkspace.forEach((ele, index) => {
                ele.forEach(ele2 => {
                    if (ele2.id == this.data.id) {
                        this.flag = true;
                        this.checkedCities.push(this.dataWorkspace[index].id);
                        this.checkedTrueFalse.push(this.dataWorkspace[index].id);
                    }
                })
            })
            // console.log(this.data)
        },  
        allDocsOfAllWorkspace() {
            // console.log(this.allDocsOfAllWorkspace);
        //     this.checkedCities = [];
        //     this.checkedTrueFalse = [];
        //     this.allDocsOfAllWorkspace.forEach(ele => {
        //         ele.forEach(ele2 => {
        //             if (ele2.id == this.data.id) {
        //                 this.checkedCities.push(ele2.id);
        //                 this.checkedTrueFalse.push(ele2.id);
        //             }
        //         })
        //     })
        // }
        // workspaceStatus() {
        //     if (this.workspaceStatus == 'postDocToWorkspaceSuccess') {
        //         this.getWorkspace();
        //     }
        }
    },
    computed: {
        ...mapState({
            currentDoc: state => state.document.currentDoc,
            listFavorite: state => state.search.listFavorite,


            dataWorkspace: state => state.workspace.workspace.data,
            allDocsOfAllWorkspace: state => state.workspace.allDocsOfAllWorkspace,
            workspaceStatus: state => state.workspace.status,


            searchFromDetail: state => state.search.searchFromDetail
        }),
        checkBool() {
            this.allDocsOfAllWorkspace.forEach(ele => {
                // if (ele.includes(this.data.id)) {
                //     return true
                // }
                this.ele.forEach(ele2 => {
                    if (ele2.id == this.data.id) {
                        return true;
                    }
                })
            });
            return false;
        }
    },
    data() {
        return {
            tempTitle: '',
            testListCheckbox: [],
            checkedCities: [],
            checkedTrueFalse: [],
            inputWorkspace: '',
            flag: false,
        }
    },
    created() {
        // console.log(this.allDocsOfAllWorkspace)
        // console.log(this.checkedTrueFalse);
        // console.log(this.checkedCities)
        
        // console.log(wordTokenizer(this.searchFromDetail));

        // if (this.searchFromDetail != "") {
        //     fetch(`https://nlp.yeu.ai/api/v1/tok?text=${this.searchFromDetail}`,{method: 'GET'}).then(this.handleResponse).then(res => console.log(res));
        // }
        
        
        // console.log(this.data.metadata[2].value)
        this.checkedTrueFalse = [];
        this.checkedCities = [];
        // let _this = this;
        //     setTimeout(function() {
        //         _this.allDocsOfAllWorkspace.forEach((ele, index) => {
        //             ele.forEach(ele2 => {
        //                 if (ele2.id == _this.data.id) {
        //                     _this.checkedCities.push(_this.dataWorkspace[index].id);
        //                     _this.checkedTrueFalse.push(_this.dataWorkspace[index].id);
        //                 }
        //             })
        //         })
        //         }, 500)
        this.flag = false;
        this.allDocsOfAllWorkspace.forEach((ele, index) => {
            ele.forEach(ele2 => {
                if (ele2.id == this.data.id) {
                    this.flag = true;
                    this.checkedCities.push(this.dataWorkspace[index].id);
                    this.checkedTrueFalse.push(this.dataWorkspace[index].id);
                }
            })
        })
        // console.log(this.checkedTrueFalse);
        // console.log(this.checkedCities)
        // console.log('hello')
        // console.log(this.checkedCities)
        // console.log(this.checkedTrueFalse)
    },
}
</script>
<style scoped>
.frame-buttons {
    display: flex;
    margin-top: 8px;
}
.frame-buttons > button.btn-not-image {
        padding: 10px 55.13px;
        background-color: #C86135;
        color: #fff;

}
.frame-buttons > button.btn-image {
        padding: 5px 7px;
        background-color: #F9DED6;
}


.metas {
    padding: 12px 32px 12px 60px;
    cursor: pointer;
}
.metas:hover, .metas.chosen {
    background: #F8F0F0;
/* border-radius: 4px 0px 0px 4px; */
border-radius: 4px;
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
/* .content em {
    background-color: #FFFF00;
} */
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