<template>
    <LayoutNewVersion2>        
        <!-- <template v-for="item in tableData" >
            <result-component :data="item" :key="item._id"/>
        </template>
        <template v-slot:layout-for-search-right>
            <result-right-component />
        </template> -->
        <result-workspace />
    </LayoutNewVersion2>
</template>
<script>
// import PieChart from '../../components/PieChart.vue'
// import BarChart from '../../components/BarChart.vue'
// import ResultComponent from '../../components/components-new/Result.vue'
// import ResultRightComponent from '../../components/components-new/ResultRight.vue'
import resultWorkspace from '../../components/components-new-version-2/ResultWorkspace.vue'
import LayoutNewVersion2 from '../layout-new-version-2/index.vue'
import Vue from 'vue'
Vue.component('LayoutNewVersion2', LayoutNewVersion2)
Vue.component('result-workspace', resultWorkspace)
// Vue.component('BarChart', BarChart)
// Vue.component('PieChart', PieChart)
// Vue.component('result-component', ResultComponent)
// Vue.component('result-right-component', ResultRightComponent)
import { mapState, mapActions } from 'vuex'
export default {
    data() {
      return {
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
        }),
        
    },
    methods: {
        ...mapActions('search', ['getCategory', 'getStat', 'getSearchAPI', 'getSearchProps', 'postFavorite', 'deleteFavorite', 'getFavorite']),
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
                // console.log(this.realityHideColumns);
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
            // console.log(val);
            this.getSearchAPI({text:val, page:1, pagesize:20, bookmarked:false, sort:"docidx", sort_direction:"desc"});
        },
    },
    created() {
        // this.getCategory({level1: 2, showall: true, limit: 100});
        // this.getCategory({level1: 0, showall: true, limit: 100});
        // this.getCategory({level1: 1, showall: true, limit: 100});
        // this.getCategory({level1: 9, showall: true, limit: 100});
        // this.getCategory({level1: 3, showall: true, limit: 100});
        // this.getCategory({level1: 4, showall: true, limit: 100});
        // if (this.$route.query.text) {
        //     this.getSearchAPI({text:this.$route.query.text,page:1,pagesize:20,bookmarked:false,sort:"docidx",sort_direction:"desc"});
        // }
        // else {
        //     this.getSearchAPI({text:"",page:1,pagesize:20,bookmarked:false,sort:"docidx",sort_direction:"desc"});
        // }        
        // this.getSearchProps();
        // this.getFavorite();
    }
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