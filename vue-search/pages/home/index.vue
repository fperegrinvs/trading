<template>
    <div>
        <div class="bg">
            <div class="overlay"></div>
            <HeaderBar />
            <div class="features">
                <div class="card">
                    <div class="cover">
                        <!-- <div class="image">

                        </div> -->
                        <p class="text-4" style="margin-left: 33px; margin-right: 33px;">Tra cứu hơn 2,000,000<br /> văn bản số hóa</p>
                    </div>
                </div>
                <div class="card">
                    <div class="cover">
                        <!-- <div class="image">

                        </div> -->
                        <p class="text-4" style="margin-left: 15px; margin-right: 15px;">Tìm kiếm văn bản hiệu quả và nhanh chóng hơn thông qua hệ thống phân loại chính xác</p>
                    </div>
                </div>
                <div class="card">
                    <div class="cover">
                        <!-- <div class="image">

                        </div> -->
                        <p class="text-4" style="margin-left: 15px; margin-right: 15px;">Nâng cao hiệu suất tìm kiếm bằng việc gợi ý kết quả<br /> thông minh</p>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="content">
            <h1 class="text-1">Thư viện khai thác nội dung văn bản số.</h1>
            <h4 class="text-2">Truy cập hiệu quả, nhanh chóng <strong>2,000,000+</strong> đầu mục nội dung.</h4>
            <!-- <div class="search"> -->
            <el-input class="input-home"
                @keypress.enter.native.prevent="onEnter"
                placeholder="Bạn đang cần tìm kiếm gì?"
                suffix-icon="el-icon-search"
                v-model="input1">
            </el-input>
            <!-- </div> -->
            <p class="text-3">Nổi bật — văn bản pháp quy, về việc sử dụng đất, cải cách giáo dục</p>
        </div>
        <!-- <el-card class="box-card testCard">
                <div slot="header" class="clearfix">
                    <span>
                        <img 
                        style="display: inline-block;"
                        class="mr-2" src="@/assets/icons/bx-search-alt.svg">
                        Thống kê
                        </span>
                </div>
                <el-button class="font-normal" @click="handleButtonClick" style="width: 100%; text-align: unset;" icon="el-icon-s-data">Loại tài liệu</el-button>
                <el-button class="font-normal" @click="handleButtonClick" style="width: 100%; text-align: unset;" icon="el-icon-s-data">Người ký</el-button>
                <el-button class="font-normal" @click="handleButtonClick" style="width: 100%; text-align: unset;" icon="el-icon-s-data">Nơi ban hành</el-button>
                <el-button class="font-normal" @click="handleButtonClick" style="width: 100%; text-align: unset;" icon="el-icon-s-data">Ngày ban hành</el-button>
        </el-card>
        <el-dialog custom-class="testDialog" title="Thống kê" :visible.sync="outerVisible2" top="12vh">
            <span class="demo-input-label"><i class="el-icon-s-data" style="margin-right: 5px;"></i>{{label}}</span>
            <el-select :default-first-option="true" v-model="value3" placeholder="Select">
                <el-option
                v-for="item in options2"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select>
            <BarChart :width=300 :height=150 :chartData="chartData"/>
            <PieChart :chart-data="chartDataPie"/>
            <div slot="footer" class="dialog-footer">
            <el-button @click="outerVisible2 = false">Cancel</el-button>
            </div>
        </el-dialog> -->
    </div>
</template>
<script>
import HeaderBar from './header-bar/index.vue'
import Vue from 'vue'
import {mapActions, mapState} from 'vuex'
Vue.component("HeaderBar", HeaderBar)
export default {
    name: 'HomePage',
    data() {
        return {
            input1: '',
            outerVisible2: false,
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
            value3: '',
            options2: [{
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
            currentDataForDialog: {},
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
        },
    },
    methods: {
        ...mapActions('search', ['getSearchAPI', 'setSearchFromDetail', 'getStat']),
        dynamicColors() {
            var r = Math.floor(Math.random() * 255);
            var g = Math.floor(Math.random() * 255);
            var b = Math.floor(Math.random() * 255);
            return "rgb(" + r + "," + g + "," + b + ")";
        },
        onEnter() {
            this.setSearchFromDetail(this.input1);
            this.$router.push({name: 'search'});
        },
        handleButtonClick(event) {
            switch (event.currentTarget.textContent) {
                case "Loại tài liệu":
                    this.outerVisible2 = true;                    
                    this.options2 = [{
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
                    this.outerVisible2 = true;                    
                    this.options2 = [{
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
                    this.outerVisible2 = true;                    
                    this.options2 = [{
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
                    this.outerVisible2 = true;                    
                    this.options2 = [{
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
    }
}
</script>
<style scoped>
.bg {
    /* height: 560px; */
    height: 100vh;
    background: url("@/assets/images/background.png");
    background-size: cover;
    background-position: center;
}
.overlay {
    position: absolute;
    left: 0%;
    right: 0%;
    top: 0%;
    bottom: 0%;
    /* height: 560px; */
    height: 100vh;
    /* background: url("@/assets/images/background.png");
    background-size: cover;
    background-position: center; */
}
.overlay::before{
  background-color: rgba(62, 51, 46, 0.85);
  content: '';
  display: block;
  height: 100%;
  position: absolute;
  width: 100%;
}
.features {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    padding: 0px;

    position: absolute;
    width: 784px;
    height: 290px;
    left: 328px;
    top: 415px;
}
.card {
    /* Auto layout */

display: flex;
flex-direction: column;
align-items: flex-start;
/* padding: 24px 0px; */

position: static;
width: 240px;
height: 111px;
left: 0px;
top: 0px;

/* background: #F8F0F0; */
background-color: unset;

border-radius: 12px;

/* Inside auto layout */

flex: none;
order: 0;
align-self: stretch;
flex-grow: 1;
margin: 0px 32px;


border: 1px solid rgba(255, 255, 255, 0.1);
box-sizing: border-box;
border-radius: 6px;

}

.cover {
    position: static;
width: 240px;
/* height: 160px; */
/* left: calc(50% - 240px/2); */
/* top: 24px; */


/* Inside auto layout */

flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;
/* margin: 16px 0px; */
}

.card:first-child .cover .image {
    /* background-image: ; */
width: 174px;
height: 136.38px;
margin-left: 33px;

background-image: url("@/assets/images/feature.svg");
background-size: 174px 136.38px;
}

.card:nth-child(2) .cover .image {
    /* background-image: ; */
width: 174px;
height: 136.38px;
margin-left: 33px;

background-image: url("@/assets/images/feature2.svg");
background-size: 174px 136.38px;
}

.card:nth-child(3) .cover .image {
    /* background-image: ; */
width: 174px;
height: 136.38px;
margin-left: 33px;

background-image: url("@/assets/images/feature3.svg");
background-size: 174px 136.38px;
}

.content {
    position: absolute;
    width: 560px;
    height: 171px;
    left: calc(50% - 560px/2);
    bottom: 673px;
    top: 180px;
}
.text-1 {
    font-family: 'Noto Serif';
    font-style: normal;
    font-weight: 700;
    font-size: 24px;
    line-height: 32px;
    color: #FFFFFF;
}
.text-2 {
    font-family: 'Noto Serif';
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 32px;
    color: #FFFFFF;
}
.search {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    padding: 16px;

    position: absolute;
    height: 56px;
    left: 0px;
    right: 0px;
    top: calc(50% - 56px/2 + 25.5px);

    background: #FFFFFF;
    border-radius: 6px;
}
.text-3 {
    font-family: 'Noto Sans';
font-style: normal;
font-weight: 400;
font-size: 13px;
line-height: 24px;
color: #FFFFFF;
margin-top: 12px;
}
.text-4 {
    font-family: 'Noto Sans';
font-style: normal;
font-weight: 400;
font-size: 14px;
line-height: 150%;
/* or 21px */

text-align: center;
letter-spacing: -0.01em;

/* color: #453630; */
color: #fff;


/* Inside auto layout */

flex: none;
order: 1;
align-self: stretch;
flex-grow: 1;
margin: 16px 0px;
}
.text-4:nth-child(3)  {
    margin-left: 33px;
    margin-right: 33px;
}
p.text-4:nth-child(2) {
    margin-left: 15px;
    margin-right: 15px;
}
p.text-4:nth-m {
    margin-left: 33px;
    margin-right: 33px;
}
</style>
