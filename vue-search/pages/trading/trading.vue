<template>
<!-- <h1>hi</h1> -->

<div>
    <div class="header-top-trading">
        <el-dropdown class="test-dropdown" @command="handleCommand">
            <span class="el-dropdown-link">
                {{dropdownItemSelected}}<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="BTCUSDT">BTC/USDT</el-dropdown-item>
                <el-dropdown-item command="ACABUSD">ACA/BUSD</el-dropdown-item>
                <el-dropdown-item command="SCRTBUSD">SCRT/BUSD</el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
        <div class="css-vf13qh">
            <div class="css-1udcben">
                <div class="css-e2pgpg">
                <div id="Time" class="css-1pj8e72">Thời gian</div>
                <div id="5m" @click="handleSelectTime($event)" class="css-1pj8e72" :class="[selectedTime == '5Phút' ? 'css-ktyfxp' : '']">5Phút</div>
                <div id="15m" @click="handleSelectTime($event)" class="css-1pj8e72" :class="[selectedTime == '15Phút' ? 'css-ktyfxp' : '']">15Phút</div>
                <div id="1h" @click="handleSelectTime($event)" class="css-1pj8e72" :class="[selectedTime == '1h' ? 'css-ktyfxp' : '']">1h</div>
                <div id="4h" @click="handleSelectTime($event)" class="css-1pj8e72" :class="[selectedTime == '4h' ? 'css-ktyfxp' : '']">4h</div>
                </div>
            </div>
        </div>
    </div>
    <trading-vue class="test-trading" :titleTxt="chartTitle" :data="chart" :width="width" colorBack="#161A1E" colorGrid="#1B1F24" colorCandleUp="#0ECB81" colorCandleDw="#F6465D" :height="height"></trading-vue>
    <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="Long" name="first">
            <el-input placeholder="Please inputThoiGian" v-model="inputThoiGian"></el-input>
            <el-input placeholder="Please inputGiaSan" v-model="inputGiaSan"></el-input>
            <el-input placeholder="Please inputGiaTran" v-model="inputGiaTran"></el-input>
            <el-input placeholder="Please inputLuoi" v-model="inputLuoi"></el-input>
            <p>Loi nhuan/luoi: </p>
            <hr>
            <p>So du kha dung: </p>
            <el-input placeholder="Please inputKyQuyBanDau" v-model="inputKyQuyBanDau"></el-input>
            <p>SL/Lenh: </p>
            <p>Tong dau tu: </p>
            <hr>
            <p>Nang cao (tuy chon)</p>
            <p>Kich hoat luoi</p>
            <el-input placeholder="Please inputGiaKichHoat" v-model="inputGiaKichHoat"></el-input>
            <p>Kich hoat stop</p>
            <el-input placeholder="Please inputStopLoss" v-model="inputStopLoss"></el-input>
            <el-input placeholder="Please inputTakeProfit" v-model="inputTakeProfit"></el-input>
            <hr>
            <el-button>Tao</el-button>
        </el-tab-pane>
        <el-tab-pane label="Short" name="second">Config</el-tab-pane>
    </el-tabs>

</div>
</template>
<script>

import TradingVue from 'trading-vue-js'
import * as d3 from 'd3-fetch';

async function getData(file_name) {
    let data = [];
    let abc = await d3.text(file_name)

    abc.split("\n").forEach((l) => {
        const d = l.split(",");
        if (d[0] != "") {
            const open = parseFloat(d[1]);
        const high = parseFloat(d[2]);
        const low = parseFloat(d[3]);
        const close = parseFloat(d[4]);
        const volumn = parseFloat(d[5]);


        data.push([parseFloat(d[0]), open, high, low, close, volumn]);
        }

            
    });
    return data;
}
import { DataCube } from "trading-vue-js"
export default {
    name: 'app',
    components: { TradingVue },
    async mounted() {
        let file_name = "BTCUSDT-15m-2022-04-29.csv"
        let temp = await getData(file_name)
        this.chart.set('chart.data', temp)
    },
    data() {
        return {
            inputThoiGian: '',
            inputGiaSan: '',
            inputGiaTran: '',
            inputLuoi: '',
            inputKyQuyBanDau: '',
            inputGiaKichHoat: '',
            inputStopLoss: '',
            inputTakeProfit: '',
            activeName: 'first',
            chartTitle: "BTCUSDT",
            selectedTime: "15Phút",
            selectedCoin: "BTCUSDT",
            dropdownItemSelected: "BTC/USDT",
            width: window.innerWidth,
            height: window.innerHeight - 44.19,
            chart: new DataCube({
                chart: {}, onchart: [], offchart: []
            })

        }
    },
    methods: {
        handleClick(tab, event) {
            console.log(tab, event);
        },
        async handleCommand(command) {
            this.selectedCoin = command;
            switch(command) {
                case "BTCUSDT":
                    this.dropdownItemSelected = "BTC/USDT"
                    break;
                case "SCRTBUSD":
                    this.dropdownItemSelected = "SCRT/BUSD"
                    break;
                case "ACABUSD":
                    this.dropdownItemSelected = "ACA/BUSD"
                    break;
                default:
                    break;
            }
            this.chartTitle = command;
            let file_name;
            let temp;
            switch (this.selectedTime) {
                case "15Phút":
                    file_name = this.selectedCoin + "-15m-2022-04-29.csv"
                    temp = await getData(file_name)
                    this.chart.set('chart.data', temp)
                    break;
                case "5Phút":
                    file_name = this.selectedCoin + "-5m-2022-04-29.csv"
                    temp = await getData(file_name)
                    this.chart.set('chart.data', temp)
                    break;
                case "1h":
                    file_name = this.selectedCoin + "-1h-2022-04-29.csv"
                    temp = await getData(file_name)
                    this.chart.set('chart.data', temp)
                    break;
                case "4h":
                    file_name = this.selectedCoin + "-4h-2022-04-29.csv"
                    temp = await getData(file_name)
                    this.chart.set('chart.data', temp)
                    break;
                default:
                    break;
            }
        },
        async handleSelectTime(event) {
            let file_name = ''
            let temp;
            switch (event.currentTarget.innerText) {
                case "15Phút":
                    file_name = this.selectedCoin + "-15m-2022-04-29.csv"
                    temp = await getData(file_name)
                    this.chart.set('chart.data', temp)
                    this.selectedTime = "15Phút"
                    break;
                case "5Phút":
                    file_name = this.selectedCoin + "-5m-2022-04-29.csv"
                    temp = await getData(file_name)
                    this.chart.set('chart.data', temp)
                    this.selectedTime = "5Phút"
                    break;
                case "1h":
                    file_name = this.selectedCoin + "-1h-2022-04-29.csv"
                    temp = await getData(file_name)
                    this.chart.set('chart.data', temp)
                    this.selectedTime = "1h"
                    break;
                case "4h":
                    file_name = this.selectedCoin + "-4h-2022-04-29.csv"
                    temp = await getData(file_name)
                    this.chart.set('chart.data', temp)
                    this.selectedTime = "4h"
                    break;
                default:
                    break;
            }
        }
    }
}
</script>
<style scoped>
/* .test-trading {
    margin-top: 44.19px;
} */
.header-top-trading {
    height: 44.19px;
    background-color: rgb(20, 21, 26);
    display: flex;
    -webkit-box-pack: justify;
    -webkit-box-align: center;
    align-items: center;
    box-sizing: border-box;
    margin: 0px;
    min-width: 0px;
    padding-left: 16px;
    padding-right: 16px;
}
.header-top-trading > div.test-dropdown {
        box-sizing: border-box;
    margin: 0px;
    min-width: 0px;
    display: flex;
    flex-direction: column;
    padding-right: 24px;
    height: auto;
    justify-content: space-around;
    border-right: 0px solid rgb(37, 41, 48);
}
.header-top-trading > div > span {
    color: rgb(234, 236, 239);
}
.css-vf13qh {
    box-sizing: border-box;
    margin-top: 0px;
    margin-right: 0px;
    margin-bottom: 0px;
    min-width: 0px;
    margin-left: 0px !important;
}
.css-1udcben {
    box-sizing: border-box;
    margin: 0px;
    min-width: 0px;
    display: flex;
    height: 24px;
}
.css-e2pgpg {
    box-sizing: border-box;
    margin: 0px;
    min-width: 0px;
    display: flex;
    flex-wrap: wrap;
    overflow: hidden;
    -webkit-box-pack: justify;
    justify-content: space-between;
}
.css-1pj8e72 {
    box-sizing: border-box;
    margin: 0px 8px 0px 0px;
    min-width: 0px;
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-pack: center;
    justify-content: center;
    color: rgb(132, 142, 156);
    cursor: pointer;
    font-size: 12px;
    line-height: 16px;
    padding: 4px;
    border-radius: 2px;
}
.css-ktyfxp {
    box-sizing: border-box;
    margin: 0px 8px 0px 0px;
    min-width: 0px;
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-pack: center;
    justify-content: center;
    color: rgb(240, 185, 11);
    cursor: pointer;
    font-size: 12px;
    line-height: 16px;
    padding: 4px;
    border-radius: 2px;
}








</style>