<template>
    <Layout>
        <div>
            <div class="row">
                <div class="col-12 page-header">
                    <img src="@/assets/icons/primary/bx-search-alt.svg">
                    <h1>Tìm kiếm tài liệu</h1>
                </div>
            </div>
            <div class="row">
                <div class="col-lg-3">
                    <el-card class="box-card testCard">
                        <div slot="header" class="clearfix">
                            <span>
                                <img 
                                style="display: inline-block;"
                                class="mr-2" src="@/assets/icons/bx-search-alt.svg">
                                Lọc theo tiêu chí
                                </span>
                            <img _ngcontent-bye-c251="" src="@/assets/icons/bx-chevrons-left.svg" class="mr-2 left-toggle">
                        </div>
                        <el-select collapse-tags autocomplete multiple style="width: 100%; margin-bottom: 5px;" v-model="value" filterable placeholder="Đơn vị ban hành">
                            <el-option
                            v-for="item in donViBanHanh.data"
                            :key="item.name"
                            :label="item.name"                            
                            :value="item.value">
                            </el-option>                            
                        </el-select>
                        <el-select collapse-tags autocomplete multiple style="width: 100%;" v-model="value2" filterable placeholder="Loại tài liệu">
                            <el-option
                            v-for="item in loaiTaiLieu.data"
                            :key="item.name"
                            :label="item.name"                            
                            :value="item.value">
                            </el-option>                            
                        </el-select>
                    </el-card>

                    <el-card class="box-card testCard">
                        <div slot="header" class="clearfix">
                            <span>
                                <img 
                                style="display: inline-block;"
                                class="mr-2" src="@/assets/icons/bx-search-alt.svg">
                                Thống kê
                                </span>
                        </div>
                        <el-button @click="handleButtonClick" style="width: 100%; text-align: unset;" icon="el-icon-s-data">Loại tài liệu</el-button>
                        <el-button @click="handleButtonClick" style="width: 100%; text-align: unset;" icon="el-icon-s-data">Người ký</el-button>
                        <el-button @click="handleButtonClick" style="width: 100%; text-align: unset;" icon="el-icon-s-data">Nơi ban hành</el-button>
                        <el-button @click="handleButtonClick" style="width: 100%; text-align: unset;" icon="el-icon-s-data">Ngày ban hành</el-button>
                    </el-card>
                </div>
                <div class="col-lg-9 flex flex-col">
                    <el-card class="box-card">
                        <el-button style="float: right; padding: 3px 0"><img src="@/assets/icons/bx-chevrons-left.svg" class="mr-2 top-toggle"></el-button>
                        <div class="inline-block">
                            <el-date-picker style="width: 205.4px;"
                            suffix-icon="el-icon-date"
                            v-model="value4"
                            type="date"
                            placeholder="Ngày ban hành">
                            </el-date-picker>
                        </div>
                        <div class="inline-block">
                            <el-select collapse-tags autocomplete multiple v-model="value5" filterable placeholder="Đơn vị ban hành">
                                <el-option
                                v-for="item in donViBanHanh.data"
                                :key="item.name"
                                :label="item.name"                            
                                :value="item.value">
                                </el-option>                            
                            </el-select>
                        </div>
                        <div class="inline-block">
                            <el-select collapse-tags autocomplete multiple v-model="value6" filterable placeholder="Người ký">
                                <el-option
                                v-for="item in nguoiKyHienThiOTrangChinh.data"
                                :key="item.name"
                                :label="item.name"                            
                                :value="item.value">
                                </el-option>                            
                            </el-select>
                        </div>
                        <div class="inline-block">
                            <el-select collapse-tags autocomplete multiple v-model="value7" filterable placeholder="Chủ đề">
                                <el-option
                                v-for="item in chuDe.data"
                                :key="item.name"
                                :label="item.name"                            
                                :value="item.value">
                                </el-option>                            
                            </el-select>
                        </div>
                        <div class="inline-block mt-2">
                            <el-select collapse-tags autocomplete multiple v-model="value8" filterable placeholder="Nhãn">
                                <el-option
                                v-for="item in nhan.data"
                                :key="item.name"
                                :label="item.name"                            
                                :value="item.value">
                                </el-option>                            
                            </el-select>
                        </div>
                        <div class="inline-block">
                            <el-select collapse-tags autocomplete multiple v-model="value9" filterable placeholder="Thực thể tên">
                                <el-option
                                v-for="item in thucTheTen.data"
                                :key="item.name"
                                :label="item.name"                            
                                :value="item.value">
                                </el-option>                            
                            </el-select>
                        </div>
                        <div class="block mt-2 text-right">
                            <el-button icon="el-icon-search">Xóa tất cả</el-button>
                            <el-button type="primary" icon="el-icon-search">Tìm kiếm</el-button>    
                        </div>                        
                    </el-card>
                    <el-card class="flex-1 main-table mt-2">

                    </el-card>
                </div>
            </div>
        </div>
        <el-dialog custom-class="testDialog" title="Thống kê" :visible.sync="outerVisible">
            <span class="demo-input-label"><i class="el-icon-s-data" style="margin-right: 5px;"></i>{{label}}</span>
            <el-select :default-first-option="true" v-model="value3" placeholder="Select">
                <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select>
            <BarChart :width=300 :height=150 :chartData="chartData"/>
            <PieChart :chart-data="chartDataPie"/>
            <div slot="footer" class="dialog-footer">
            <el-button @click="outerVisible = false">Cancel</el-button>
            </div>
        </el-dialog>
    </Layout>
</template>
<script>
import PieChart from '../../components/PieChart.vue'
import BarChart from '../../components/BarChart.vue'
import Layout from '../layout/index.vue'
import Vue from 'vue'
Vue.component('Layout', Layout)
Vue.component('BarChart', BarChart)
Vue.component('PieChart', PieChart)
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





            loaiTaiLieu2: state => state.search.loaiTaiLieu2,
            nguoiKy: state => state.search.nguoiKy,
            noiBanHanh: state => state.search.noiBanHanh,
            ngayBanHanh: state => state.search.ngayBanHanh,
        })
    },
    methods: {
        ...mapActions('search', ['getCategory', 'getStat']),
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
        }
    },
    watch: {
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
        }
    },
    created() {
        this.getCategory({level1: 2, showall: true, limit: 100});
        this.getCategory({level1: 0, showall: true, limit: 100});
        this.getCategory({level1: 1, showall: true, limit: 100});
        this.getCategory({level1: 9, showall: true, limit: 100});
        this.getCategory({level1: 3, showall: true, limit: 100});
        this.getCategory({level1: 4, showall: true, limit: 100});
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
</style>