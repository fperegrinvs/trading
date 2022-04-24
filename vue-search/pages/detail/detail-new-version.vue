<template>
    <layout-for-detail-page>
        <template v-slot:result-detail>
            <!-- <h1>hello</h1> -->
            <result-detail />
        </template>
        <template v-slot:result-detail-right>
            <h1 class="title">
                Thông tin văn bản
            </h1>
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
                                {{scope.row.content}}
                        </template>
                        </el-table-column>
                    </el-table>
            </div>
        </template>
        <template v-slot:layout-for-pdf>
            <pdfPage v-if="pdfUrl" />
        </template>
    </layout-for-detail-page>
</template>
<script>
import Vue from 'vue';
import layoutForDetailPage from '../layout-new-version-2/layout-for-detail-page.vue';
import resultDetail from '../../components/components-new-version-2/ResultDetail.vue'
Vue.component('layout-for-detail-page', layoutForDetailPage)
Vue.component('result-detail', resultDetail)
import {mapState} from 'vuex'
export default {
    data() {
        return {
            tableData: [],
        }
    },
    computed: {
        ...mapState({
            currentDoc: state => state.document.currentDocCopyFromHTML,
            pdfUrl: state => state.searchNewVersion.currentPdfUrl,
        })
    },
    watch: {
        currentDoc() {
            console.log(this.currentDoc);
            let tempTableData = [];
            this.currentDoc.metadata.forEach(ele => {
                if (ele.key == "signer") {
                    tempTableData.push({metadata: "Người ký", content: ele.value})
                }
                else if (ele.key == "publisherName") {
                    tempTableData.push({metadata: "Đơn vị ban hành", content: ele.value})
                }
                else if (ele.key == "documentType") {
                    tempTableData.push({metadata: "Loại tài liệu", content: ele.value})
                }
            })
            this.tableData = tempTableData;
        },
    },
    created() {
        console.log('hello')
        console.log(this.currentDoc);
        let tempTableData = [];
        if (this.currentDoc.metadata) {
            this.currentDoc.metadata.forEach(ele => {
                if (ele.key == "signer") {
                    tempTableData.push({metadata: "Người ký", content: ele.value})
                }
                else if (ele.key == "publisherName") {
                    tempTableData.push({metadata: "Đơn vị ban hành", content: ele.value})
                }
                else if (ele.key == "documentType") {
                    tempTableData.push({metadata: "Loại tài liệu", content: ele.value})
                }
            })
        }
        
        this.tableData = tempTableData;
        console.log(this.tableData);
    },
}
</script>
<style scoped>
.title {
    font-family: 'Noto Serif';
font-style: normal;
font-weight: 500;
font-size: 18px;
line-height: 150%;
/* or 27px */

letter-spacing: -0.01em;

color: #272525;
/* width: 593px;
width: 650px; */

/* Inside auto layout */

flex: none;
order: 0;
flex-grow: 1;
/* margin: 0px 8px; */
display: inline-block;
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