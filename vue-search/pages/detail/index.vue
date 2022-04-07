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
                                                :key="tag + ' ' + index"
                                                v-for="(tag, index) in dynamicTags"
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
        <!-- <p v-if="currentDoc._source">{{currentDoc._source.signNumber}}</p> -->
        <el-dialog v-if="currentDoc._source" :title="'Chỉnh sửa tài liệu: ' + currentDoc._source.signNumber" :visible.sync="dialogTableVisible">
            <!-- <el-table :data="gridData">
                <el-table-column property="date" label="Date" width="150"></el-table-column>
                <el-table-column property="name" label="Name" width="200"></el-table-column>
                <el-table-column property="address" label="Address"></el-table-column>
            </el-table> -->
            <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane name="first">
                    <!-- <el-badge slot="label" :value="3" class="item"> -->
                        <!-- <el-button size="small">replies</el-button> -->
                        <span slot="label">
                            Tập tin đính kèm<el-badge class="mark" :value="currentDoc._source.attachments.length" />
                        </span>
                    <!-- </el-badge> -->
                    
                    <el-dropdown trigger="click" @command="handleCommand" class="testDropdownDialogDetail" :key="index + ' ' + item.name" v-for="(item, index) in currentDoc._source.attachments">
                        <el-button >
                            {{item.downname}}<i class="el-icon-arrow-down el-icon--right"></i>
                        </el-button>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item :command="'download' + '/' + item.type + '/' + item.name" icon="el-icon-download">Tải xuống</el-dropdown-item>
                            <el-dropdown-item :command="'delete' + '/' + item.name" icon="el-icon-delete">Xóa</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                    <el-upload
                        class="upload-demo mt-2" style="margin-left: 5px;"
                        ref="upload"
                        drag
                        action="https://devcore.chinhta123.com/attachment/"
                        :headers="headers"
                        :on-preview="handlePreview"
                        :on-remove="handleRemove"
                        :file-list="fileList"
                        :before-upload="handleUploadBefore"
                        multiple>
                        <i class="el-icon-upload"></i>
                        <div class="el-upload__text">Drop file here or <em>click to upload</em></div>
                        <!-- <div class="el-upload__tip" slot="tip">jpg/png files with a size less than 500kb</div> -->
                    </el-upload>
                    <el-button @click="handleButtonUpload" type="primary" icon="el-icon-upload">Tải lên</el-button>
                </el-tab-pane>
            </el-tabs>
        </el-dialog>
    </Layout>
</template>
<script>
import Layout from '../layout/index.vue'
import Vue from 'vue'
import { authHeader } from '../../_helpers'
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
            fileList: [],
            headers: authHeader(),
        }
    },
    methods: {
        ...mapActions('document', ['getDocById', 'getDocProps']),
        ...mapActions('search', ['postTag', 'deleteTag', 'getSearchAPI']),
        ...mapActions('attachment', ['deleteAttachment', 'addAttachment']),
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
        },
        // downloadAttachment() {
        //     console.log('download')
        // },
        // deleteAttachment() {
        //     console.log('delete')
        // },
        handlePreview(file) {
            console.log(file);
        },
        handleRemove(file, fileList) {
            console.log(file, fileList);
        },
        handleCommand(command) {
            // this.$message('click on item ' + command);
            let tempList = command.split('/');
            if (tempList[0] == "download") {
                let url = `https://devcore.chinhta123.com/download?id=${tempList[1]}/${tempList[2]}&docid=${this.currentDoc._id}`;
                window.open(url, "_blank");
            }
            else if (tempList[0] == "delete") {
                this.deleteAttachment({attachment: tempList[1], id: this.currentDoc._id});
                // this.getDocById(this.currentDoc._id);
            }
        },
        handleButtonUpload() {
            let obs = [];
            // console.log(this.$refs.upload.uploadFiles);
            // console.log(this.fileList);
            this.$refs.upload.uploadFiles.forEach(file => {
                obs.push(this.getBase64(file.raw));
            });
            // console.log(obs);
            let attachments = [];

            Promise.all(obs)
                .then(res => {
                    res.forEach((base64, idx) => {
                        let nameParts = this.$refs.upload.uploadFiles[idx].raw.name.split(".");
                        attachments.push({
                            downname: this.$refs.upload.uploadFiles[idx].raw.name,
                            data: base64,
                            type: nameParts[nameParts.length - 1]
                        });
                    });

                    this.addAttachment({documentId: this.currentDoc._id, attachments: attachments});
                    if (this.status == 'addAttachmentSuccess') {
                        console.log('success');
                    }
                    // this.getDocById(this.currentDoc._id);
                    // console.log(attachments);
                    this.$refs.upload.uploadFiles = [];
                })
        
        },
        handleUploadBefore(file) {
            // console.log(file.name);
        },


        getBase64(file) {
            return new Promise((resolve => {
                var reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = function () {
                    resolve((reader.result.toString())?.replace(/^.+;base64,/gi, ""));
                };
                reader.onerror = function (error) {
                    console.log('Error: ', error);
                };
            }));
        },



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
            status: state => state.attachment.status,

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
            this.dynamicTags = [];
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
            // console.log(this.currentDoc);
        },
        danhSachCacVanBanLienQuan: function(val) {
            this.tableDataRelevant = val.hits.map(ele => ele._source);
        },
        status(val) {
            if (val == 'addAttachmentSuccess' || val == 'deleteAttachmentSuccess') {
                this.getDocById(this.currentDoc._id);
                // console.log(val);
            }
        },
    }
}
</script>