<template>
    <LayoutForSearchPage>        
        <!-- <template v-slot:result-workspace>
            <result-workspace />
        </template> -->
        <!-- <template v-slot:params>
            <span style="/* Auto layout */
    /*left: 50px;*/
display: flex;
flex-direction: row;
align-items: flex-start;
padding: 0px;

position: absolute;
    width: 100%;
    height: 24px;
    

    top: 134px;">
    <span v-if="$route.query.text != undefined && searchFromDetail == ''" class="el-tag el-tag--info el-tag--small el-tag--light">
                <span class="el-select__tags-text">
                    {{$route.query.text}}
                </span>
                <i class="el-tag__close el-icon-close"></i>
            </span>
            <span v-else-if="searchFromDetail != ''" class="el-tag el-tag--info el-tag--small el-tag--light">
                <span class="el-select__tags-text">
                    {{searchFromDetail}}
                </span>
                <i class="el-tag__close el-icon-close"></i>
            </span>
            
        </span>
        </template> -->
        <span style="/* Auto layout */
    /*left: 50px;*/
display: flex;
flex-direction: row;
align-items: flex-start;
padding: 0px;

    width: 100%;
    height: 24px;
    margin-left: 45px;

    top: 134px;">
            <!-- {{$route.query.text}} -->
            <!-- <span v-if="$route.query.text != undefined && searchFromDetail == ''" class="el-tag el-tag--info el-tag--small el-tag--light">
                        <span class="el-select__tags-text">
                            {{$route.query.text}}
                        </span>
                        <i class="el-tag__close el-icon-close"></i>
                    </span>
                    <span v-else-if="searchFromDetail != ''" class="el-tag el-tag--info el-tag--small el-tag--light">
                        <span class="el-select__tags-text">
                            {{searchFromDetail}}
                        </span>
                        <i class="el-tag__close el-icon-close"></i>
            </span> -->

            <!-- <span v-if="searchFromDetail == ''" class="el-tag el-tag--info el-tag--small el-tag--light">
                        <span class="el-select__tags-text">
                            {{$route.query.text}}
                        </span>
                        <i class="el-tag__close el-icon-close"></i>
            </span> -->
            <span v-if="searchFromDetail != ''" class="el-tag el-tag--info el-tag--small el-tag--light">
                        <span class="el-select__tags-text">
                            {{searchFromDetail}}
                        </span>
                        <i class="el-tag__close el-icon-close"></i>
            </span>
            
        </span>
        <el-card class="test-show-time" v-if="currentTimeSearch > 0 &&dataSearchNewVersion.page">
                <h1>Hiển thị {{dataSearchNewVersion.page * dataSearchNewVersion.size - dataSearchNewVersion.size + 1}} - {{dataSearchNewVersion.totalItems - (dataSearchNewVersion.page * dataSearchNewVersion.size) > 0 ? (dataSearchNewVersion.page * dataSearchNewVersion.size) : dataSearchNewVersion.totalItems}} / {{dataSearchNewVersion.totalItems}} văn bản trong {{
                Math.round((currentTimeSearch / 1000) * 100000) / 100000
                }} s
                </h1>
        </el-card>
        <div v-if="dataSearchNewVersion.data" class="block" style="position: relative;">
                <el-pagination
                    @size-change="handleSizeChange2"
                    @current-change="handleCurrentChange2"
                    :current-page.sync="dataSearchNewVersion.page"
                    :page-sizes="[10, 20, 50]"
                    :page-size="dataSearchNewVersion.size"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="dataSearchNewVersion.totalItems">
                </el-pagination>
        </div>
        <template v-for="item in dataSearchNewVersion.data" >
                <result-new-version-component :data="item" :key="item._id"/>
                
        </template>
        <div v-if="dataSearchNewVersion.data" class="block" style="position: relative;">
                <el-pagination
                    @size-change="handleSizeChange2"
                    @current-change="handleCurrentChange2"
                    :current-page.sync="dataSearchNewVersion.page"
                    :page-sizes="[10, 20, 50]"
                    :page-size="dataSearchNewVersion.size"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="dataSearchNewVersion.totalItems">
                </el-pagination>
        </div>
        <template v-slot:result-right>
            <!-- <h1>Hello</h1> -->
            <!-- <div id="chart">
                <ApexCharts v-show="series.length > 0" ref="demoChart" type="bar" height="380" :options="chartOptions" :series="series"/> -->

            <div id="chart">
            <ApexCharts v-show="currentSeries.length > 0" ref="demoChart" type="bar" height="380" :options="currentChartOptions" :series="currentSeries"/>
                
            </div>

            <div id="chartNK">
                <ApexCharts v-show="currentSeriesNK.length > 0" ref="demoChartNK" type="bar" height="380" :options="currentChartOptionsNK" :series="currentSeriesNK"/>
            </div>

            

            <!-- <div id="chartNK">
                <ApexCharts v-show="seriesNK.length > 0" ref="demoChartNK" type="bar" height="380" :options="chartOptionsNK" :series="seriesNK"/>
            </div> -->
        </template>
        <!-- <template v-slot:show-time>
            <el-card v-if="currentTimeSearch > 0 &&dataSearchNewVersion.page">
                <h1>Hiển thị {{dataSearchNewVersion.page * dataSearchNewVersion.size - dataSearchNewVersion.size + 1}} - {{dataSearchNewVersion.totalItems - (dataSearchNewVersion.page * dataSearchNewVersion.size) > 0 ? (dataSearchNewVersion.page * dataSearchNewVersion.size) : dataSearchNewVersion.totalItems}} / {{dataSearchNewVersion.totalItems}} văn bản trong {{
                Math.round((currentTimeSearch / 1000) * 100000) / 100000
                }} s
                </h1>
            </el-card>
        </template> -->



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
                        :data="tableDataDetail"
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
    </LayoutForSearchPage>
</template>
<script>

// import PieChart from '../../components/PieChart.vue'
// import BarChart from '../../components/BarChart.vue'
// import ResultComponent from '../../components/components-new/Result.vue'
import TestApexCharts from '../../components/ApexCharts.vue'
import ResultComponent from '../../components/components-new-version-2/Result.vue'
// import ResultRightComponent from '../../components/components-new/ResultRight.vue'
import resultWorkspace from '../../components/components-new-version-2/ResultWorkspace.vue'
import bookmark from '../../components/components-new-version-2/Bookmark.vue'
import LayoutNewVersion2 from '../layout-new-version-2/index.vue'
import LayoutForSearchPage from '../layout-new-version-2/layout-for-search-page.vue'
import pdfPage from '../pdf/index.vue'
import Vue from 'vue'
Vue.component('LayoutForSearchPage', LayoutForSearchPage)
Vue.component('result-workspace', resultWorkspace)
Vue.component('result-new-version-component', ResultComponent)
Vue.component('bookmark', bookmark)
Vue.component('pdfPage', pdfPage)
Vue.component('test-apex-charts', TestApexCharts)


import resultDetail from '../../components/components-new-version-2/ResultDetail.vue'
Vue.component('result-detail', resultDetail)


import ApexCharts from 'vue-apexcharts'
// Vue.component("apexchart", ApexCharts)



// Vue.component('BarChart', BarChart)
// Vue.component('PieChart', PieChart)
// Vue.component('result-component', ResultComponent)
// Vue.component('result-right-component', ResultRightComponent)
import { mapState, mapActions } from 'vuex'
// import ApexCharts from '../../components/ApexCharts.vue'
export default {
  components: { ApexCharts },
    data() {
      return {
          tableDataDetail: [],
          time_taken: 0,
        // currentSize: 20,
        // currentPage4: 1,
        options: [{
          value: 'Option1',
          label: 'Option1'
        }, {
          value: 'Option2',
          label: 'Option2'
        }, {
          value: 'Option3',
          label: 'Option3'
        }, {
          value: 'Option4',
          label: 'Option4'
        }, {
          value: 'Option5',
          label: 'Option5'
        }],
        value: [],
        value2: [],
        value3: '',
        value4: '',
        value5: [],
        value6: [],
        value7: [],
        value8: [],
        value9: [],
        outerVisible: false,
        currentDataForDialog: {},
        chartData: {            
            labels: [ 'January', 'February', 'March', 'March2', 'March3' ],
            datasets: [{
            label: 'Title',
            data: [45, 55, 48, 35, 12],
            backgroundColor: [
                'rgb(255, 99, 132)',
                'rgb(54, 162, 235)',
                'rgb(255, 205, 86)',
                'rgb(255, 205, 86)',
                'rgb(255, 205, 86)'
            ]
          }]
        },
        chartDataPie: {
            labels: ['Test', 'EmberJs', 'ReactJs', 'AngularJs'],
            datasets: [
            {
                backgroundColor: ['#41B883', '#E46651', '#00D8FF', '#DD1B16'],
                data: [40, 20, 80, 10]
            }
            ]
        },
        label: '',
        multipleSelection: [],
        tableColumns: [],
        tableData: [],
        tableHeight: 1237,
        currentPage1: 1,
        totalRow: 500,
        pageSize: 20,
        dialogVisible: false,
        leftFilter: false,
        topFilter: false,
        hideColumns: [],
        realityHideColumns: [],




        statistics: [
            [],
            [],
            []
        ],
        testTestHolder2: [],
        testTestHolder3: [],
        series: [],
        seriesNK: [],
        // series: [{
        //     name: 'Marine Sprite',
        //     data: [44, 55, 41, 37, 22, 43, 21]
        //   }, {
        //     name: 'Striking Calf',
        //     data: [53, 32, 33, 52, 13, 43, 32]
        //   }, {
        //     name: 'Tank Picture',
        //     data: [12, 17, 11, 9, 15, 11, 20]
        //   }, {
        //     name: 'Bucket Slope',
        //     data: [9, 7, 5, 8, 6, 9, 4]
        //   }, {
        //     name: 'Reborn Kid',
        //     data: [25, 12, 19, 32, 25, 24, 10]
        //   }],
        chartOptions: {
            // colors: ['#C86135', '#C88635', '#C8AB35', '#C1C835', '#9CC835', '#77C835'],
            colors: ["#c86135",
"#cd7049",
"#d3805d",
"#d89071",
"#dea085",
"#e3b09a",
"#e9bfae",
"#eecfc2",
"#f4dfd6",
"#f9efea"
],
            chart: {
              type: 'bar',
              height: 350,
              stacked: true,
            },
            plotOptions: {
              bar: {
                horizontal: true,
              },
            },
            dataLabels: {
              enabled: false,
            },
            stroke: {
              width: 1,
              colors: ['#fff']
            },
            title: {
              text: 'Fiction Books Sales'
            },
            xaxis: {
              categories: [2008, 2009, 2010, 2011, 2012, 2013, 2014],
              labels: {
                formatter: function (val) {
                  return val + "K"
                }
              }
            },
            yaxis: {
              title: {
                text: undefined
              },
              labels: {
                  align: 'right',
                //   maxWidth: 250
              },
            //   min: 12,
            //   max: 12
            },
            tooltip: {
              y: {
                formatter: function (val) {
                  return val + "K"
                }
              }
            },
            fill: {
              opacity: 1
            },
            legend: {
              position: 'bottom',
              horizontalAlign: 'center',
              offsetX: 40,
            //   markers: {
            //       fillColors: ['#C86135', '#C88635', '#C8AB35', '#C1C835', '#9CC835', '#77C835'],
            //   },
            }
        },

        chartOptionsNK: {
            // colors: ['#C86135', '#C88635', '#C8AB35', '#C1C835', '#9CC835', '#77C835'],
            colors: ["#c86135",
"#cd7049",
"#d3805d",
"#d89071",
"#dea085",
"#e3b09a",
"#e9bfae",
"#eecfc2",
"#f4dfd6",
"#f9efea"
],
            chart: {
              type: 'bar',
              height: 350,
              stacked: true,
            },
            plotOptions: {
              bar: {
                horizontal: true,
              },
            },
            dataLabels: {
              enabled: false
            },
            stroke: {
              width: 1,
              colors: ['#fff']
            },
            title: {
              text: 'Fiction Books Sales'
            },
            xaxis: {
              categories: [2008, 2009, 2010, 2011, 2012, 2013, 2014],
              labels: {
                formatter: function (val) {
                  return val + "K"
                }
              }
            },
            yaxis: {
              title: {
                text: undefined
              },
              labels: {
                  align: 'right',
                //   maxWidth: 250
              },
            },
            tooltip: {
              y: {
                formatter: function (val) {
                  return val + "K"
                }
              }
            },
            fill: {
              opacity: 1
            },
            legend: {
              position: 'bottom',
              horizontalAlign: 'center',
              offsetX: 40
            }
        },

      }
    },
    computed: {
        ...mapState({
            donViBanHanh: state => state.search.donViBanHanh,
            loaiTaiLieu: state => state.search.loaiTaiLieu,
            nguoiKyHienThiOTrangChinh: state => state.search.nguoiKyHienThiOTrangChinh,
            chuDe: state => state.search.chuDe,
            thucTheTen: state => state.search.thucTheTen,
            nhan: state => state.search.nhan,
            danhSachTimKiem: state => state.search.danhSachTimKiem,
            thuocTinhBang: state => state.search.thuocTinhBang.items,
            listFavorite: state => state.search.listFavorite,
            flag: state => state.search.flag,
            searchFromDetail: state => state.search.searchFromDetail,
            



            loaiTaiLieu2: state => state.search.loaiTaiLieu2,
            nguoiKy: state => state.search.nguoiKy,
            noiBanHanh: state => state.search.noiBanHanh,
            ngayBanHanh: state => state.search.ngayBanHanh,


            dataSearchNewVersion: state => state.searchNewVersion.data,
            dataWorkspace: state => state.workspace.workspace,
            docsOfWorkspace: state => state.workspace.docsOfWorkspace,
            currentSeries: state => state.searchNewVersion.currentSeries,
            currentChartOptions: state => state.searchNewVersion.currentChartOptions,
            currentSeriesNK: state => state.searchNewVersion.currentSeriesNK,
            currentChartOptionsNK: state => state.searchNewVersion.currentChartOptionsNK,
            currentTimeSearch: state => state.searchNewVersion.currentTimeSearch,
            currentDoc: state => state.document.currentDocCopyFromHTML,
            pdfUrl: state => state.searchNewVersion.currentPdfUrl,
        }),
        
    },
    methods: {
        ...mapActions('search', ['getCategory', 'getStat', 'getSearchAPI', 'getSearchProps', 'postFavorite', 'deleteFavorite', 'getFavorite', 'setSearchFromDetail']),
        ...mapActions('searchNewVersion', ['postSearch', 'setCurrentSeries', 'setCurrentChartOptions', 'setCurrentSeriesNK', 'setCurrentChartOptionsNK', 'setTempListWordSegmentation',
        'setCurrentTimeSearch']),
        ...mapActions('workspace', ['getWorkspace']),
        msToTime(duration) {
            var milliseconds = parseInt((duration%1000))
                , seconds = parseInt((duration/1000)%60)
                // , minutes = parseInt((duration/(1000*60))%60)
                // , hours = parseInt((duration/(1000*60*60))%24);

            // hours = (hours < 10) ? "0" + hours : hours;
            // minutes = (minutes < 10) ? "0" + minutes : minutes;
            // seconds = (seconds < 10) ? "0" + seconds : seconds;

            // return hours + ":" + minutes + ":" + seconds + "." + milliseconds;
            return seconds + "." + milliseconds;
        },
        handleSizeChange2(val) {
            // console.log(`${val} items per page`);
            // this.currentSize = val;

            // var start = new Date().getTime();

            var startTime = performance.now()


            this.postSearch({by_title: false, page: this.dataSearchNewVersion.page, size: val, text: this.searchFromDetail})

            var endTime = performance.now()
            // alert(`Call search api took ${endTime - startTime} milliseconds`)

            this.time_taken = endTime - startTime
            this.setCurrentTimeSearch(this.time_taken)
            let _this = this
            // setTimeout(function() {
            //     _this.time_taken = 0
            // }, 3000)

            // setTimeout(function() {
            //     alert(`Call search api took ${endTime - startTime} milliseconds`)
            // }, 3000)
            // setTimeout(function() {
            //     window.close()
            // }, 3000)
            // var end = new Date().getTime();
            // var time = end - start;
            // alert('Execution time: ' + time);
        },
        handleCurrentChange2(val) {
            // console.log(`current page: ${val}`);

            
            // var start = new Date().getTime();
            var startTime = performance.now()



            this.postSearch({by_title: false, page: val, size: this.dataSearchNewVersion.size, text: this.searchFromDetail})


            var endTime = performance.now()


            this.time_taken = endTime - startTime
            this.setCurrentTimeSearch(this.time_taken)
            let _this = this
            // setTimeout(function() {
            //     _this.time_taken = 0
            // }, 3000)

            // setTimeout(function() {
            //     alert(`Call search api took ${endTime - startTime} milliseconds`)
            // }, 3000)
            // setTimeout(function() {
            //     window.close()
            // }, 3000)

            // var end = new Date().getTime();
            // var time = end - start;
            // alert('Execution time: ' + time);
            // setTimeout(function(){}, 1000);
            // console.log(this.dataSearchNewVersion);
        },
        handleResponse(response) {
            return response.text().then(text => {
                const data = text && JSON.parse(text);
                if (!response.ok) {
                    if (response.status === 401) {
                        // auto logout if 401 response returned from api
                        // logout();
                        // location.reload(true);
                        return
                    }

                    const error = (data && data.message) || response.statusText;
                    return Promise.reject(error);
                }
                return data;
            });
        },
        insertAfter(newNode, existingNode) {
            existingNode.parentNode.insertBefore(newNode, existingNode.nextSibling);
        },
        handleButtonClick(event) {
            switch (event.currentTarget.textContent) {
                case "Loại tài liệu":
                    this.outerVisible = true;                    
                    this.options = [{
                        value: "5 loại tài liệu nổi bật",
                        label: "5 loại tài liệu nổi bật"
                    },
                    {
                        value: "10 loại tài liệu nổi bật",
                        label: "10 loại tài liệu nổi bật"
                    },
                    {
                        value: "15 loại tài liệu nổi bật",
                        label: "15 loại tài liệu nổi bật"
                    },
                    ];
                    this.value3 = "5 loại tài liệu nổi bật";
                    this.label = "Loại tài liệu";
                    break;
                case "Người ký":
                    this.outerVisible = true;                    
                    this.options = [{
                        value: "5 người ký nổi bật",
                        label: "5 người ký nổi bật"
                    },
                    {
                        value: "10 người ký nổi bật",
                        label: "10 người ký nổi bật"
                    },
                    {
                        value: "15 người ký nổi bật",
                        label: "15 người ký nổi bật"
                    },
                    ];
                    this.value3 = "5 người ký nổi bật";
                    this.label = "Người ký";
                    break;
                case "Nơi ban hành":
                    this.outerVisible = true;                    
                    this.options = [{
                        value: "5 nơi ban hành nổi bật",
                        label: "5 nơi ban hành nổi bật"
                    },
                    {
                        value: "10 nơi ban hành nổi bật",
                        label: "10 nơi ban hành nổi bật"
                    },
                    {
                        value: "15 nơi ban hành nổi bật",
                        label: "15 nơi ban hành nổi bật"
                    },
                    ];
                    this.value3 = "5 nơi ban hành nổi bật";
                    this.label = "Nơi ban hành";
                    break;
                case "Ngày ban hành":
                    this.outerVisible = true;                    
                    this.options = [{
                        value: "5 ngày ban hành nổi bật",
                        label: "5 ngày ban hành nổi bật"
                    },
                    {
                        value: "10 ngày ban hành nổi bật",
                        label: "10 ngày ban hành nổi bật"
                    },
                    {
                        value: "15 ngày ban hành nổi bật",
                        label: "15 ngày ban hành nổi bật"
                    },
                    ];
                    this.value3 = "5 ngày ban hành nổi bật";
                    this.label = "Ngày ban hành";
                    break;
                default:
                    break;
            }
        },
        getRandomColor(n) {
            var letters = '0123456789ABCDEF'.split('');
            var color = '#';
            for (var i = 0; i < 6; i++ ) {
                color += letters[Math.floor(Math.random() * 16)];
            }
            return color;
        },
        dynamicColors() {
            var r = Math.floor(Math.random() * 255);
            var g = Math.floor(Math.random() * 255);
            var b = Math.floor(Math.random() * 255);
            return "rgb(" + r + "," + g + "," + b + ")";
        },
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
        handleSizeChange(val) {
            // console.log(`${val} items per page`);
            this.getSearchAPI({text:"",page:this.currentPage1,pagesize:val,bookmarked:false,sort:"docidx",sort_direction:"desc"});
        },
        handleCurrentChange(val) {
            // console.log(`current page: ${val}`);
            this.getSearchAPI({text:"",page:val,pagesize:this.pageSize,bookmarked:false,sort:"docidx",sort_direction:"desc"});
        },
        handleFavoriteClick(val) {
            // this.postFavorite(val.row.docidx);
            // console.log(val);
            // console.log(document.querySelector('.col-lg-9.flex.flex-col'))
            // document.querySelector(`td.${val.column.id}`).parentElement.classList.add('favorite-row');
            // console.log(document.querySelector(`td.${val.column.id}`));
            // console.log(this.$el.querySelector(`td.${val.column.id}`));
            let stringDocidx = val.row.docidx.toString()
            if (this.listFavorite.includes(stringDocidx)) {
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
                // this.dialogVisible = true;
                
            }
            else {
                this.listFavorite.push(stringDocidx)
                this.postFavorite(stringDocidx)
            }
            
            // console.log(val.row.docidx)
            // console.log(val.$index)
            // this.tableRowClassName({row: val.row, rowIndex: val.$index})
            // console.log(this.$refs.tableRef);
            // this.$refs.tableRef.rowClassName({row: val.row, rowIndex: val.$index})
        },
        tableRowClassName({row, rowIndex}) {
            // console.log(this.listFavorite)
            if (this.listFavorite.includes(row.docidx.toString())) {
                return 'favorite-row';
            }
            return '';
        },
        // testClass(val) {
        //     console.log
        //     if (this.listFavorite.includes(val.row.docidx)) {
        //         return 'favorite-button-clicked'
        //     }
        //     return 'testttttt'
        // },
        topFilterFunction(event) {
            this.topFilter = ! this.topFilter;
            event.currentTarget.classList.toggle('clicked');
        },
        leftFilterFunction(event) {
            this.leftFilter = ! this.leftFilter;
            event.currentTarget.classList.toggle('clicked');
        },
        handleRowClick(row, column) {
            // console.log(row);
            if (column.label == "Trích yếu") {
                this.$router.push({name: 'detail', params: {id: row.docidx}, query: {from: 'search'}});
            }
            
        }
    },
    watch: {
        currentDoc() {
            console.log(this.currentDoc);
            let tempTableData = [];
            if (Array.isArray(this.currentDoc.metadata)) {
                tempTableData.push({metadata: "Số hiệu", content: this.currentDoc.signNumber})
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
                    // else if (ele.key == "unique_id") {
                    //     tempTableData.push({metadata: "Số hiệu", content: ele.value})
                    // }
                })
            }
            // this.currentDoc.metadata.forEach(ele => {
            //     if (ele.key == "signer") {
            //         tempTableData.push({metadata: "Người ký", content: ele.value})
            //     }
            //     else if (ele.key == "publisherName") {
            //         tempTableData.push({metadata: "Đơn vị ban hành", content: ele.value})
            //     }
            //     else if (ele.key == "documentType") {
            //         tempTableData.push({metadata: "Loại tài liệu", content: ele.value})
            //     }
            // })
            else {
                tempTableData.push({metadata: "Số hiệu", content: this.currentDoc.signNumber})
            tempTableData.push({metadata: "Người ký", content: this.currentDoc.metadata['signer']})
            tempTableData.push({metadata: "Đơn vị ban hành", content: this.currentDoc.metadata['publisherName']})
            tempTableData.push({metadata: "Loại tài liệu", content: this.currentDoc.metadata['documentType']})
            }
            
            
            this.tableDataDetail = tempTableData;
        },
    
        // currentDoc() {
        //     console.log(this.currentDoc.id);
        //     if (this.currentDoc.id) {
        //         document.querySelector('.layout-for-result-detail-right').classList.remove('display-none')
        //         document.querySelector('.layour-for-result-detail').classList.remove
        //     }
        // },
        
        value2: function(val) {
            this.getSearchAPI({text:this.searchFromDetail, page:1, pagesize:20, bookmarked:false, sort:"docidx", sort_direction:"desc", publisherName: this.value, documentName: val});
        },
        value: function(val) {
            // console.log(val)            
            this.getSearchAPI({text:this.searchFromDetail, page:1, pagesize:20, bookmarked:false, sort:"docidx", sort_direction:"desc", publisherName: val, documentName: this.value2});
        },
        value3: function (val) {
            switch (val) {
                case "15 loại tài liệu nổi bật":
                    this.getStat({type: 0, limit: 15})
                    setTimeout(() => 
                    {
                        this.currentDataForDialog = this.loaiTaiLieu2
                        let tempLabels = []
                        let tempData = []
                        let coloR = []
                        this.currentDataForDialog.data.forEach(ele => {
                            tempLabels.push(ele.name);
                            tempData.push(ele.value)
                            coloR.push(this.dynamicColors())
                        });
                        let tempLabel = "Loại tài liệu"
                        this.chartData = {            
                            labels: tempLabels,
                            datasets: [{
                                label: tempLabel,
                                data: tempData,
                                
                                backgroundColor: coloR
                            }]
                        }
                        this.chartDataPie = {
                            labels: tempLabels,
                            datasets: [{
                                label: tempLabel,
                                data: tempData,                            
                                backgroundColor: coloR
                            }]
                        }
                    }, 500)                    
                    break;
                case "10 loại tài liệu nổi bật":
                    this.getStat({type: 0, limit: 10})
                    setTimeout(() => 
                    {
                        this.currentDataForDialog = this.loaiTaiLieu2
                        let tempLabels = []
                        let tempData = []
                        let coloR = []
                        this.currentDataForDialog.data.forEach(ele => {
                            tempLabels.push(ele.name);
                            tempData.push(ele.value)
                            coloR.push(this.dynamicColors())
                        });
                        let tempLabel = "Loại tài liệu"
                        this.chartData = {            
                            labels: tempLabels,
                            datasets: [{
                                label: tempLabel,
                                data: tempData,
                                backgroundColor: coloR
                            }]
                        }
                        this.chartDataPie = {
                            labels: tempLabels,
                            datasets: [{
                                label: tempLabel,
                                data: tempData,                                
                                backgroundColor: coloR
                            }]
                        }
                    }, 500)
                    break;
                case "5 loại tài liệu nổi bật":
                    this.getStat({type: 0, limit: 5})
                    setTimeout(() => 
                    {
                        this.currentDataForDialog = this.loaiTaiLieu2
                        let tempLabels = []
                        let tempData = []
                        let coloR = []
                        this.currentDataForDialog.data.forEach(ele => {
                            tempLabels.push(ele.name);
                            tempData.push(ele.value)
                            coloR.push(this.dynamicColors())
                        });
                        let tempLabel = "Loại tài liệu"
                        this.chartData = {            
                            labels: tempLabels,
                            datasets: [{
                                label: tempLabel,
                                data: tempData,
                                backgroundColor: coloR
                            }]
                        }
                        this.chartDataPie = {
                            labels: tempLabels,
                            datasets: [{
                                label: tempLabel,
                                data: tempData,
                                backgroundColor: coloR
                            }]
                        }
                    }, 500)
                    break;
                case "15 người ký nổi bật":
                    this.getStat({type: 1, limit: 15})
                    setTimeout(() => 
                    {
                        this.currentDataForDialog = this.nguoiKy
                        let tempLabels = []
                        let tempData = []
                        let coloR = []
                        this.currentDataForDialog.data.forEach(ele => {
                            tempLabels.push(ele.name);
                            tempData.push(ele.value)
                            coloR.push(this.dynamicColors())
                        });
                        let tempLabel = "Người ký"
                        this.chartData = {            
                            labels: tempLabels,
                            datasets: [{
                                label: tempLabel,
                                data: tempData,
                                
                                backgroundColor: coloR
                            }]
                        }
                        this.chartDataPie = {
                            labels: tempLabels,
                            datasets: [{
                                label: tempLabel,
                                data: tempData,                            
                                backgroundColor: coloR
                            }]
                        }
                    }, 500)                    
                    break;
                case "10 người ký nổi bật":
                    this.getStat({type: 1, limit: 10})
                    setTimeout(() => 
                    {
                        this.currentDataForDialog = this.nguoiKy
                        let tempLabels = []
                        let tempData = []
                        let coloR = []
                        this.currentDataForDialog.data.forEach(ele => {
                            tempLabels.push(ele.name);
                            tempData.push(ele.value)
                            coloR.push(this.dynamicColors())
                        });
                        let tempLabel = "Người ký"
                        this.chartData = {            
                            labels: tempLabels,
                            datasets: [{
                                label: tempLabel,
                                data: tempData,
                                backgroundColor: coloR
                            }]
                        }
                        this.chartDataPie = {
                            labels: tempLabels,
                            datasets: [{
                                label: tempLabel,
                                data: tempData,                                
                                backgroundColor: coloR
                            }]
                        }
                    }, 500)
                    break;
                case "5 người ký nổi bật":
                    this.getStat({type: 1, limit: 5})
                    setTimeout(() => 
                    {
                        this.currentDataForDialog = this.nguoiKy
                        let tempLabels = []
                        let tempData = []
                        let coloR = []
                        this.currentDataForDialog.data.forEach(ele => {
                            tempLabels.push(ele.name);
                            tempData.push(ele.value)
                            coloR.push(this.dynamicColors())
                        });
                        let tempLabel = "Người ký"
                        this.chartData = {            
                            labels: tempLabels,
                            datasets: [{
                                label: tempLabel,
                                data: tempData,
                                backgroundColor: coloR
                            }]
                        }
                        this.chartDataPie = {
                            labels: tempLabels,
                            datasets: [{
                                label: tempLabel,
                                data: tempData,
                                backgroundColor: coloR
                            }]
                        }
                    }, 500)
                    break;
                case "15 nơi ban hành nổi bật":
                    this.getStat({type: 2, limit: 15})
                    setTimeout(() => 
                    {
                        this.currentDataForDialog = this.noiBanHanh
                        let tempLabels = []
                        let tempData = []
                        let coloR = []
                        this.currentDataForDialog.data.forEach(ele => {
                            tempLabels.push(ele.name);
                            tempData.push(ele.value)
                            coloR.push(this.dynamicColors())
                        });
                        let tempLabel = "Nơi ban hành"
                        this.chartData = {            
                            labels: tempLabels,
                            datasets: [{
                                label: tempLabel,
                                data: tempData,
                                
                                backgroundColor: coloR
                            }]
                        }
                        this.chartDataPie = {
                            labels: tempLabels,
                            datasets: [{
                                label: tempLabel,
                                data: tempData,                            
                                backgroundColor: coloR
                            }]
                        }
                    }, 500)                    
                    break;
                case "10 nơi ban hành nổi bật":
                    this.getStat({type: 2, limit: 10})
                    setTimeout(() => 
                    {
                        this.currentDataForDialog = this.noiBanHanh
                        let tempLabels = []
                        let tempData = []
                        let coloR = []
                        this.currentDataForDialog.data.forEach(ele => {
                            tempLabels.push(ele.name);
                            tempData.push(ele.value)
                            coloR.push(this.dynamicColors())
                        });
                        let tempLabel = "Nơi ban hành"
                        this.chartData = {            
                            labels: tempLabels,
                            datasets: [{
                                label: tempLabel,
                                data: tempData,
                                backgroundColor: coloR
                            }]
                        }
                        this.chartDataPie = {
                            labels: tempLabels,
                            datasets: [{
                                label: tempLabel,
                                data: tempData,                                
                                backgroundColor: coloR
                            }]
                        }
                    }, 500)
                    break;
                case "5 nơi ban hành nổi bật":
                    this.getStat({type: 2, limit: 5})
                    setTimeout(() => 
                    {
                        this.currentDataForDialog = this.noiBanHanh
                        let tempLabels = []
                        let tempData = []
                        let coloR = []
                        this.currentDataForDialog.data.forEach(ele => {
                            tempLabels.push(ele.name);
                            tempData.push(ele.value)
                            coloR.push(this.dynamicColors())
                        });
                        let tempLabel = "Nơi ban hành"
                        this.chartData = {            
                            labels: tempLabels,
                            datasets: [{
                                label: tempLabel,
                                data: tempData,
                                backgroundColor: coloR
                            }]
                        }
                        this.chartDataPie = {
                            labels: tempLabels,
                            datasets: [{
                                label: tempLabel,
                                data: tempData,
                                backgroundColor: coloR
                            }]
                        }
                    }, 500)
                    break;
                case "15 ngày ban hành nổi bật":
                    this.getStat({type: 5, limit: 15})
                    setTimeout(() => 
                    {
                        this.currentDataForDialog = this.ngayBanHanh
                        let tempLabels = []
                        let tempData = []
                        let coloR = []
                        this.currentDataForDialog.data.forEach(ele => {
                            tempLabels.push(ele.name);
                            tempData.push(ele.value)
                            coloR.push(this.dynamicColors())
                        });
                        let tempLabel = "Ngày ban hành"
                        this.chartData = {            
                            labels: tempLabels,
                            datasets: [{
                                label: tempLabel,
                                data: tempData,
                                
                                backgroundColor: coloR
                            }]
                        }
                        this.chartDataPie = {
                            labels: tempLabels,
                            datasets: [{
                                label: tempLabel,
                                data: tempData,                            
                                backgroundColor: coloR
                            }]
                        }
                    }, 500)                    
                    break;
                case "10 ngày ban hành nổi bật":
                    this.getStat({type: 5, limit: 10})
                    setTimeout(() => 
                    {
                        this.currentDataForDialog = this.ngayBanHanh
                        let tempLabels = []
                        let tempData = []
                        let coloR = []
                        this.currentDataForDialog.data.forEach(ele => {
                            tempLabels.push(ele.name);
                            tempData.push(ele.value)
                            coloR.push(this.dynamicColors())
                        });
                        let tempLabel = "Ngày ban hành"
                        this.chartData = {            
                            labels: tempLabels,
                            datasets: [{
                                label: tempLabel,
                                data: tempData,
                                backgroundColor: coloR
                            }]
                        }
                        this.chartDataPie = {
                            labels: tempLabels,
                            datasets: [{
                                label: tempLabel,
                                data: tempData,                                
                                backgroundColor: coloR
                            }]
                        }
                    }, 500)
                    break;
                case "5 ngày ban hành nổi bật":
                    this.getStat({type: 5, limit: 5})
                    setTimeout(() => 
                    {
                        this.currentDataForDialog = this.ngayBanHanh
                        let tempLabels = []
                        let tempData = []
                        let coloR = []
                        this.currentDataForDialog.data.forEach(ele => {
                            tempLabels.push(ele.name);
                            tempData.push(ele.value)
                            coloR.push(this.dynamicColors())
                        });
                        let tempLabel = "Ngày ban hành"
                        this.chartData = {            
                            labels: tempLabels,
                            datasets: [{
                                label: tempLabel,
                                data: tempData,
                                backgroundColor: coloR
                            }]
                        }
                        this.chartDataPie = {
                            labels: tempLabels,
                            datasets: [{
                                label: tempLabel,
                                data: tempData,
                                backgroundColor: coloR
                            }]
                        }
                    }, 500)
                    break;
                default:
                    break;
            }
        },
        thuocTinhBang: function(val) {
            let tempVal = val.slice(0,6)
            tempVal.forEach(ele => {
                if (ele.name != 'promulgationDate' && ele.name != "subject") {
                    this.tableColumns.push({
                        property: ele.name,
                        label: ele.note,
                        width: "125"
                    })
                    this.hideColumns.push({property: ele.name, label: ele.note, checked: false});
                }
                else if (ele.name == "subject") {
                    this.tableColumns.push({
                        property: ele.name,
                        label: ele.note
                    })
                    this.hideColumns.push({property: ele.name, label: ele.note, checked: false});
                }
            })
        },
        hideColumns: {
            deep: true,
            handler(val) {
                val.forEach(ele => {
                    if (ele.checked && !this.realityHideColumns.includes(ele.property)) {
                        this.realityHideColumns.push(ele.property);                  
                    }
                    else if (!ele.checked && this.realityHideColumns.includes(ele.property)) {
                        this.realityHideColumns.splice(this.realityHideColumns.indexOf(ele.property), 1);
                    }
                })
            }
        },
        danhSachTimKiem: function(val) {
            this.tableData = val.hits.map(ele => ele._source);
            this.totalRow = val.total_row;
            this.currentPage1 = val.page;
            this.pageSize = val.pagesize
            this.tableHeight = 1000
        },
        searchFromDetail: function(val) {
            console.log('hellllllooooo')
            // if (this.searchFromDetail != "") {
            //     fetch(`https://nlp.yeu.ai/api/v1/tok?text=${this.searchFromDetail}`,{method: 'GET'}).then(this.handleResponse).then(res => this.setTempListWordSegmentation(res.response));
            // }
            console.log(val);
            // this.$router.replace({ params: {text: val}});
            if (val != '') {
                if (window.location.origin.toString().split("?").length > 1) {
                    history.replaceState({}, null, window.location.origin + `?text=${val}`)
                }
                else {
                    history.replaceState({}, null, window.location.origin + `/search?text=${val}`)
                }
            }
            else {
                history.replaceState({}, null, window.location.origin + '/search')
            }
            




            // var start = new Date().getTime();
            var startTime = performance.now()


            
            this.postSearch({by_title: false, page: 1, size: 20, text: val})




            var endTime = performance.now()

            this.time_taken = endTime - startTime
            this.setCurrentTimeSearch(this.time_taken)
            let _This = this
            // setTimeout(function() {
            //     _This.time_taken = 0
            // }, 3000)

            // alert(`Call search api took ${endTime - startTime} milliseconds`)
            // setTimeout(function() {
            //     alert(`Call search api took ${endTime - startTime} milliseconds`)
            // }, 3000)
            // setTimeout(function() {
            //     window.close()
            // }, 3000)
            // var end = new Date().getTime();
            // var time = end - start;
            // alert('Execution time: ' + time);

            setTimeout(function(){}, 1000);
            console.log(this.dataSearchNewVersion);
        },
    },
    created() {
        this.getWorkspace();
        console.log(this.$route.query.text)
        if (this.$route.query.text && this.dataSearchNewVersion.length == 0) {
            var startTime = performance.now()


            
            this.postSearch({by_title: false, page: 1, size: 20, text: this.$route.query.text})



            var endTime = performance.now()

            this.time_taken = endTime - startTime
            this.setCurrentTimeSearch(this.time_taken)
            this.setSearchFromDetail(this.$route.query.text)
        }
        if (this.searchFromDetail != "" && this.dataSearchNewVersion.length == 0 && this.$route.query.text == "") {
            // var start = new Date().getTime();
            var startTime = performance.now()


            this.postSearch({by_title: false, page: 1, size: 10, text: this.searchFromDetail});

            // var end = new Date().getTime();
            var endTime = performance.now()

            this.time_taken = endTime - startTime
            this.setCurrentTimeSearch(this.time_taken)
            // let _this = this
            // setTimeout(function() {
            //     _this.time_taken = 0
            // }, 3000)


            // alert(`Call search api took ${endTime - startTime} milliseconds`)
            // setTimeout(function() {
            //     alert(`Call search api took ${endTime - startTime} milliseconds`)
            // }, 3000)
            // setTimeout(function() {
            //     window.close()
            // }, 3000)
            // var time = end - start;
            // alert('Execution time: ' + time);

        }
    },
    mounted() {
        // select the target element
        // let e = document.querySelector(".apexcharts-menu");
        // console.log(e);
        // // remove the list item
        // e.style.display = "none";
    },
}
</script>
<style scoped>
.left-toggle, .top-toggle {
    position: absolute;
    right: 2rem;
    top: 1rem;
    cursor: pointer;
}
.testCard > div.el-card__header {
    padding-top: 15px;
    padding-bottom: 15px;
}
.el-button+.el-button {
    margin-left: unset;
    margin-top: 5px;
}
.demo-input-label {
    display: inline-block;
    width: 130px;
}
.el-table .warning-row {
    background: oldlace;
  }

  .el-table .success-row {
    background: #f0f9eb;
  }
</style>