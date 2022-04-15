<template>
<div style="margin-left: 24px; margin-top: 24px; margin-right: 56px; margin-bottom: 24px;">
    <div class="header">
        <h1 class="title">
        <!-- Sửa đổi, bổ sung một số điều của Thông tư số 42/2015/TT-NHNN ngày 31 tháng 12 năm 2015 của Thống đốc Ngân hàng Nhà nước Việt Nam quy định về nghiệp vụ thị trường mở -->
        {{title}}
        <img src="@/assets/icons-figma/bx-star.svg" style="display: inline-block;" alt="">
        </h1>
        <div class="icon" style="display: inline-block; float: right;">
            <img src="@/assets/icons-figma/bx-x.svg" alt="">
        </div>    
    </div>
    
    <div class="previewers">
        <p class="text-1">
            phát hiện từ khóa
        </p>
        <!-- <div class="occours">
            <div class="items">

            </div>
        </div> -->
    </div>
    <div class="metadata">
        <p class="text-2">Metadata</p>
        <el-table
            :show-header="false"
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
                    <!-- <el-button @click="downloadFile(item)" class="testButtonDetail" v-for="(item, index) in scope.row.content" :key="index" icon="el-icon-download">{{item.split('/').pop().toString()}}<i class="el-icon-document"></i></el-button> -->
                </template>
                <template v-else-if="scope.row.metadata == 'Tập tin đính kèm'">
                    <!-- <el-button @click="downloadFile(item)" class="testButtonDetail" v-for="(item, index) in scope.row.content" :key="index" icon="el-icon-download">{{item.downname}}<i class="el-icon-document"></i></el-button> -->
                </template>
                <template v-else-if="scope.row.metadata == 'Nhãn'">
                    <!-- <el-tag
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
                    <el-button v-else class="button-new-tag" size="small" @click="showInput">+ Gắn nhãn mới</el-button> -->
                </template>
                <template v-else>
                    {{scope.row.content}}
                </template>
            </template>
            </el-table-column>
        </el-table>
    </div>

    <div class="files-wrapper">
        <p class="text-files">
            Tập tin đính kèm
        </p>
        <div class="files-wrapper-level-2">
            <template v-if="currentDoc._source">
                <attachment-file :data="item" v-for="(item, index) in currentDoc._source.attachments" :key="index + 'attachment-file'" />
            </template>
            <!-- <attachment-file v-for="index in 6" :key="index + 'test files'"/> -->
            
        </div>
    </div>

    <div class="related">
        <p class="text-related">
            Các văn bản liên quan
        </p>
        <div class="links">
            <div class="link">
                <p class="link-text">Công văn <strong class="link-text-strong">(1,200)</strong></p>
            </div>
            <div class="link">
                <p class="link-text">Thông tư <strong class="link-text-strong">(1,420)</strong></p>
            </div>
            <div class="link">
                <p class="link-text">Quyết định <strong class="link-text-strong">(199)</strong></p>
            </div>
            <div class="link">
                <p class="link-text">Luật - Pháp lệnh <strong class="link-text-strong">(199)</strong></p>
            </div>
            <div class="link">
                <p class="link-text">Hướng dẫn <strong class="link-text-strong">(159)</strong></p>
            </div>
            <div class="link">
                <p class="link-text">Khác <strong class="link-text-strong">(3,456)</strong></p>
            </div>
        </div>
    </div>

</div>
    
</template>
<script>
import {mapState} from 'vuex'
import AttachmentFile from './AttachmentFile.vue';
export default {
  components: { AttachmentFile },
    name: 'result-right-component',
    data() {
        return {
            dynamicTags: [],
            tableData: [],
            title: 'Sửa đổi, bổ sung một số điều của Thông tư số 42/2015/TT-NHNN ngày 31 tháng 12 năm 2015 của Thống đốc Ngân hàng Nhà nước Việt Nam quy định về nghiệp vụ thị trường mở'
        }
    },
    computed: {
        ...mapState({
            currentDoc: state => state.document.currentDoc,
        })
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
                {'subject': "Test"},
                // {'tags': "Nhãn"},
                // {'categories': "Danh mục"},
                {'promulgationDateStr': "Ngày ban hành"},
                // {'status': "Trạng thái"},
                // {'effectiveDate': "Ngày hiệu lực"},
                // {'linkdoc': "Link document"},
                // {'content': "Nội dung"},
                // {'attachments': "Tập tin đính kèm"},
            ];
            let tempTableData = [];
            this.dynamicTags = [];
            tempData.forEach((obj) => {
                Object.keys(obj).forEach((key) => {
                    if (key != "effectiveDate" && key != "tags" && key != "content" && key != 'subject') {
                        tempTableData.push({metadata: obj[key], content: this.currentDoc['_source'][key]})
                    }
                    else if (key == "effectiveDate") {
                        let tempList = new Date(this.currentDoc['_source'][key]).toLocaleDateString().split('/');
                        tempTableData.push({metadata: obj[key], content: (tempList[1] + "/" + tempList[0] + "/" + tempList[2]) });
                    }
                    else if (key == "tags") {
                        if (this.currentDoc['_source'][key]) {
                            // console.log(this.currentDoc['_source'][key])
                            tempTableData.push({metadata: obj[key], content: this.currentDoc['_source'][key]})
                            for (let i = 0; i < this.currentDoc['_source'][key].length; i++) {                            
                                this.dynamicTags.push(this.currentDoc['_source'][key][i]);
                            }     
                        }
                        else {
                            // console.log(this.currentDoc['_source'][key])
                            tempTableData.push({metadata: obj[key], content: []})
                        }
                    }
                    else if (key == "content") {
                        this.textarea = this.currentDoc['_source'][key];
                    }
                    else if (key == 'subject') {
                        // console.log('sbjs')
                        this.title = this.currentDoc['_source'][key];
                    }
                })
            })
            // console.log(this.currentDoc);
            // console.log(tempTableData);
            this.tableData = tempTableData;
            // console.log(this.currentDoc);
        },
    },
    methods: {
    },
}
</script>
<style scoped>
.link-text-strong {
    font-family: 'Noto Sans';
font-style: normal;
font-weight: 400;
font-size: 12px;
line-height: 24px;
/* identical to box height, or 200% */


color: #C86135;

}
.link-text {
    margin: 0 12px;
    font-family: 'Noto Sans';
font-style: normal;
font-weight: 400;
font-size: 12px;
line-height: 24px;
/* identical to box height, or 200% */


color: #000000;

}
.link {
    /* flex: 1 0 21%; */
    display: inline-block;
    margin-top: 12px;
    margin-right: 12px;
    background: #F0F0F0;
border-radius: 16px;
}
.links {
    /* display: flex;
    flex-wrap: wrap; */
    display: inline-block;
}
.text-related {
    font-family: 'Noto Sans';
font-style: normal;
font-weight: 600;
font-size: 11px;
line-height: 16.5px;
/* identical to box height, or 16px */

letter-spacing: -0.01em;
text-transform: uppercase;

color: #595858;
}
.related {
    margin-top: 24px;
}
.files-wrapper-level-2 {
    /* display: flex;
    flex-wrap: wrap; */
    display: inline-block
}
.files-wrapper {
    margin-top: 24px;
}
.text-files {
    font-family: 'Noto Sans';
font-style: normal;
font-weight: 600;
font-size: 11px;
line-height: 16.5px;
/* identical to box height, or 16px */

letter-spacing: -0.01em;
text-transform: uppercase;

color: #595858;
}
.title {
    font-family: 'Noto Serif';
font-style: normal;
font-weight: 500;
font-size: 18px;
line-height: 150%;
/* or 27px */

letter-spacing: -0.01em;

color: #272525;
width: 593px;

/* Inside auto layout */

flex: none;
order: 0;
flex-grow: 1;
/* margin: 0px 8px; */
display: inline-block;
}
.text-1 {
    font-family: 'Noto Sans';
font-style: normal;
font-weight: 600;
font-size: 11px;
line-height: 16.5px;
/* identical to box height, or 16px */

letter-spacing: -0.01em;
text-transform: uppercase;

color: #595858;


/* Inside auto layout */

flex: none;
order: 0;
flex-grow: 0;
margin: 16px 0px;
}
.previewers {
    width: 625px;
height: 234px;
}
.text-2 {
    font-family: 'Noto Sans';
font-style: normal;
font-weight: 600;
font-size: 11px;
line-height: 150%;
/* identical to box height, or 16px */

letter-spacing: -0.01em;
text-transform: uppercase;

color: #595858;
}
.metadata {
    /* Inside auto layout */

flex: none;
order: 2;
align-self: stretch;
flex-grow: 0;
margin: 24px 0px;
}
</style>