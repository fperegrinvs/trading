<template>
    <Layout>
        <div>
            <div class="row">
                <div class="col-12">
                    <el-card class="box-card">
                        <!-- <div slot="header" class="clearfix">
                            <span>Card name</span>
                            <el-button style="float: right; padding: 3px 0" type="text">Operation button</el-button>
                        </div>
                        <div v-for="o in 4" :key="o" class="text item">
                            {{'List item ' + o }}
                        </div> -->
                        <el-button @click="backForwardButtonClicked" type="primary" icon="el-icon-arrow-left">Trở lại</el-button>
                        <el-button icon="el-icon-delete">Xóa tài liệu</el-button>
                        <el-button icon="el-icon-edit" @click="dialogTableVisible = true">Sửa</el-button>
                        <el-checkbox-group style="display: inline-block; margin-left: 10px;" @change="changeCheckList" v-model="checkList">

                            <el-checkbox label="Metadata"></el-checkbox>
                            <el-checkbox label="Nội dung"></el-checkbox>
                        
                        </el-checkbox-group>
                        <div class="row">

                            <div :class="{'col-md-6': !filterContent, 'col-md-12': filterContent}" v-if="!filterMetadata">
                                <el-table
                                    :data="tableData"
                                    style="width: 100%">
                                    <el-table-column
                                        prop="metadata"
                                        label="Metadata"
                                        width="200"
                                    >
                                    </el-table-column>
                                    <el-table-column
                                    prop="content"
                                    label="Nội dung">
                                    <template slot-scope="scope">
                                        <template v-if="scope.row.metadata == 'Link document'">
                                            <el-button @click="downloadFile(item)" class="testButtonDetail" v-for="(item, index) in scope.row.content" :key="index" icon="el-icon-download">{{item.split('/').pop().toString()}}<i class="el-icon-document"></i></el-button>
                                        </template>
                                        <template v-else-if="scope.row.metadata == 'Nhãn'">
                                            <el-tag
                                                :key="tag"
                                                v-for="tag in dynamicTags"
                                                closable
                                                :disable-transitions="false"
                                                @close="handleClose(tag)">
                                                {{tag}}
                                            </el-tag>
                                            <el-input
                                                class="input-new-tag"
                                                v-if="inputVisible"
                                                v-model="inputValue"
                                                ref="saveTagInput"
                                                size="mini"
                                                @keyup.enter.native="handleInputConfirm"
                                                @blur="handleInputConfirm"
                                                >
                                            </el-input>
                                            <el-button v-else class="button-new-tag" size="small" @click="showInput">+ Gắn nhãn mới</el-button>
                                        </template>
                                        <template v-else>
                                            {{scope.row.content}}
                                        </template>
                                    </template>
                                    </el-table-column>
                                </el-table>
                            </div>

                            <div :class="{'col-md-6': !filterMetadata, 'col-md-12': filterMetadata}" v-if="!filterContent">
                                <span class="demo-input-label">Hiển thị: 
                                    <el-radio style="margin-left: 10px;" v-model="radio" label="1">Văn bản</el-radio>
                                </span>
                                <el-input
                                    type="textarea"
                                    :rows="30"
                                    placeholder="Please input"
                                    v-model="textarea">
                                </el-input>
                            </div>
                            
                        </div>                        
                    </el-card>
                </div>
            </div>
            <div class="row mt-2">
                <div class="col-12">
                    <el-card class="box-card">
                        <div slot="header" class="clearfix">
                            <span>Các văn bản liên quan</span>
                        </div>
                        <el-table
                            :height="height"
                            :data="tableDataRelevant"
                            style="width: 100%">
                            <el-table-column
                                prop="signNumber"
                                label="Số hiệu"
                                width="100">
                            </el-table-column>
                            <el-table-column
                                prop="subject"
                                label="Trích yếu"
                                >
                            </el-table-column>
                            <el-table-column
                                prop="publisherName"
                                label="Đơn vị ban hành"
                                width="180">
                            </el-table-column>
                            <el-table-column
                                prop="documentName"
                                label="Loại tài liệu"
                                width="100">
                            </el-table-column>
                            <el-table-column
                                prop="signer"
                                label="Người ký"
                                width="100">
                            </el-table-column>
                        </el-table>
                    </el-card>
                </div>
            </div>
        </div>
        <el-dialog :title="'Chỉnh sửa tài liệu: ' + currentDoc._source.signNumber" :visible.sync="dialogTableVisible">
            <!-- <el-table :data="gridData">
                <el-table-column property="date" label="Date" width="150"></el-table-column>
                <el-table-column property="name" label="Name" width="200"></el-table-column>
                <el-table-column property="address" label="Address"></el-table-column>
            </el-table> -->
            <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="User" name="first">User</el-tab-pane>
                <el-tab-pane label="Config" name="second">Config</el-tab-pane>
                <el-tab-pane label="Role" name="third">Role</el-tab-pane>
                <el-tab-pane label="Task" name="fourth">Task</el-tab-pane>
            </el-tabs>
        </el-dialog>
    </Layout>
</template>
<script>
import Layout from '../layout/index.vue'
import Vue from 'vue'
import {mapActions, mapState} from 'vuex'
Vue.component('Layout', Layout)
export default {
    data() {
        return {
            tableData: [],
            textarea: '',
            inputVisible: false,
            inputValue: '',
            dynamicTags: [],
            radio: '1',
            checkList: ['Metadata', 'Nội dung'],
            filterMetadata: false,
            filterContent: false,
            tableDataRelevant: [],
            height: 500,
            dialogTableVisible: false,
            activeName: 'first',

        }
    },
    methods: {
        ...mapActions('document', ['getDocById', 'getDocProps']),
        ...mapActions('search', ['postTag', 'deleteTag', 'getSearchAPI']),
        handleClose(tag) {
            this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
            this.deleteTag({tag: [tag], docId: this.currentDoc._id});
        },
        showInput() {
            this.inputVisible = true;
            this.$nextTick(_ => {
                this.$refs.saveTagInput.$refs.input.focus();
            });
        },
        handleInputConfirm() {
            let inputValue = this.inputValue;
            if (inputValue != '') {
                this.postTag({tag: [inputValue], docId: this.currentDoc._id});
            }
            if (inputValue) {
            this.dynamicTags.push(inputValue);
            }
            this.inputVisible = false;
            this.inputValue = '';
        },
        downloadFile(url) {
            window.open(url, "_blank");
        },
        changeCheckList(val) {
            if (!val.includes("Metadata")) {
                this.filterMetadata = true;
            }
            else {
                this.filterMetadata = false;
            }
            if (!val.includes("Nội dung")) {
                this.filterContent = true;
            }
            else {
                this.filterContent = false;
            }
        },
        backForwardButtonClicked() {
            this.$router.push({name: 'search'});
        },
        handleClick(tab, event) {
            console.log(tab, event);
        }
    },
    created() {        
        this.getDocById(this.$route.params.id);
        this.getDocProps();
        this.getSearchAPI({text:"",page:1,pagesize:10,bookmarked:false,sort:"docidx",sort_direction:"desc"});
    },
    computed: {
        ...mapState({
            docProps: state => state.document.docProps,
            currentDoc: state => state.document.currentDoc,
            danhSachCacVanBanLienQuan: state => state.search.danhSachTimKiem,

        }),
    },
    watch: {
        currentDoc() {
            let tempData = [
                {'signNumber': "Số hiệu"},
                {'subject': "Trích yếu"},
                {'publisherName': "Đơn vị ban hành"},
                {'documentName': "Loại tài liệu"},
                {'signer': "Người ký"},
                {'documentId': "Mã tài liệu"},
                {'tags': "Nhãn"},
                {'categories': "Danh mục"},
                {'promulgationDateStr': "Ngày ban hành dạng chuỗi"},
                {'status': "Trạng thái"},
                {'effectiveDate': "Ngày hiệu lực"},
                {'linkdoc': "Link document"},
                {'content': "Nội dung"}
            ];
            let tempTableData = [];
            tempData.forEach((obj) => {
                Object.keys(obj).forEach((key) => {
                    if (key != "effectiveDate" && key != "tags" && key != "content") {
                        tempTableData.push({metadata: obj[key], content: this.currentDoc['_source'][key]})
                    }
                    else if (key == "effectiveDate") {
                        let tempList = new Date(this.currentDoc['_source'][key]).toLocaleDateString().split('/');
                        tempTableData.push({metadata: obj[key], content: (tempList[1] + "/" + tempList[0] + "/" + tempList[2]) });
                    }
                    else if (key == "tags" && this.currentDoc['_source'][key]) {
                        tempTableData.push({metadata: obj[key], content: this.currentDoc['_source'][key]})
                        for (let i = 0; i < this.currentDoc['_source'][key].length; i++) {                            
                            this.dynamicTags.push(this.currentDoc['_source'][key][i]);
                        }                        
                    }
                    else if (key == "content") {
                        this.textarea = this.currentDoc['_source'][key];
                    }
                })
            })
            // console.log(this.currentDoc);
            // console.log(tempTableData);
            this.tableData = tempTableData;
        },
        danhSachCacVanBanLienQuan: function(val) {
            this.tableDataRelevant = val.hits.map(ele => ele._source);
        }
    }
}
</script>