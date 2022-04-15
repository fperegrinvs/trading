<template>
    <div class="params">
        <p class="text-1">
            Lọc kết quả
        </p>
        <el-date-picker class="date-picker-params-component"
            v-model="value"
            type="date"
            placeholder="Ngày ban hành" suffix-icon="el-icon-date">
            <!-- <template slot="suffix">
                <i class="el-icon-arrow-down"></i>
            </template> -->
        </el-date-picker>
        <div class="divider-1"></div>
        <el-select :class="value2.length > 0 ? 'need-to-highlight' : ''" @change="handleChangeSelect" popper-class="test-select-params-component" ref="test-select" style="    width: 170px;
    height: 24px;" multiple filterable class="select-params-component test-select-dvbh" v-model="value2"
     placeholder="Đơn vị ban hành">
            <template slot="prefix">
                <!-- <i class="el-icon-date icon-params-component"></i> -->
                <img src="@/assets/icons-figma/bx-select-multiple.svg" alt="">
            </template>
            <!-- <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
            </el-option> -->

            <el-option
                v-for="item in donViBanHanh.data"
                :key="item.name"
                :label="item.name"                            
                :value="item.name">
            </el-option>
            
            
        </el-select>
        <div class="divider-2"></div>
        <el-select style="    width: 115px;
    height: 24px;" multiple filterable :class="value3.length > 0 ? 'need-to-highlight' : ''" class="select-params-component test-select-nk" v-model="value3" placeholder="Người ký">
            <template slot="prefix">
                <!-- <i class="el-icon-date icon-params-component"></i> -->
                <img src="@/assets/icons-figma/bx-select-multiple.svg" alt="">
            </template>
            <!-- <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
            </el-option> -->
            <el-option
                v-for="item in nguoiKyHienThiOTrangChinh.data"
                :key="item.name"
                :label="item.name"                            
                :value="item.name">
            </el-option>
        </el-select>
        <div class="divider-3"></div>
        <el-select style="    width: 103px;
    height: 24px;" multiple filterable class="select-params-component test-select-cd" :class="value4.length > 0 ? 'need-to-highlight' : ''" v-model="value4" placeholder="Chủ đề">
            <template slot="prefix">
                <!-- <i class="el-icon-date icon-params-component"></i> -->
                <img src="@/assets/icons-figma/bx-select-multiple.svg" alt="">
            </template>
            <!-- <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
            </el-option> -->
            <el-option
                v-for="item in chuDe.data"
                :key="item.name"
                :label="item.name"                            
                :value="item.name">
            </el-option>
        </el-select>
        <div class="divider-4"></div>
        <el-select style="    width: 94px;
    height: 24px;" multiple filterable class="select-params-component test-select-n" :class="value5.length > 0 ? 'need-to-highlight' : ''" v-model="value5" placeholder="Nhãn">
            <template slot="prefix">
                <!-- <i class="el-icon-date icon-params-component"></i> -->
                <img src="@/assets/icons-figma/bx-select-multiple.svg" alt="">
            </template>
            <!-- <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
            </el-option> -->
            <el-option
                v-for="item in nhan.data"
                :key="item.name"
                :label="item.name"                            
                :value="item.name">
            </el-option>
        </el-select>
        <div class="divider-5"></div>
        <el-select style="    width: 138px;
    height: 24px;" multiple filterable class="select-params-component test-select-ttt" :class="value6.length > 0 ? 'need-to-highlight' : ''" v-model="value6" placeholder="Thực thể tên">
            <template slot="prefix">
                <!-- <i class="el-icon-date icon-params-component"></i> -->
                <img src="@/assets/icons-figma/bx-select-multiple.svg" alt="">
            </template>
            <!-- <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
            </el-option> -->
            <el-option 
                v-for="item in thucTheTen.data"
                :key="item.name"
                :label="item.name"                            
                :value="item.name">
            </el-option>
        </el-select>
        <span style="/* Auto layout */

display: flex;
flex-direction: row;
align-items: flex-start;
padding: 0px;

position: absolute;
width: 50%;
height: 24px;
left: 165px;
top: 62px;">
            <span v-if="this.text != ''" class="el-tag el-tag--info el-tag--small el-tag--light">
                <span class="el-select__tags-text">
                    {{text}}
                </span>
                <i class="el-tag__close el-icon-close"></i>
            </span>
            <span v-for="(item, index) in value2" :key="index + 'dvbh'" class="el-tag el-tag--info el-tag--small el-tag--light">
                <span class="el-select__tags-text">{{item}}</span>
                <i class="el-tag__close el-icon-close"></i>                
            </span>
            <span v-for="(item, index) in value3" :key="index + 'nk'" class="el-tag el-tag--info el-tag--small el-tag--light">
                <span class="el-select__tags-text">{{item}}</span>
                <i class="el-tag__close el-icon-close"></i>                
            </span>
            <span v-for="(item, index) in value4" :key="index + 'cd'" class="el-tag el-tag--info el-tag--small el-tag--light">
                <span class="el-select__tags-text">{{item}}</span>
                <i class="el-tag__close el-icon-close"></i>                
            </span>
            <span v-for="(item, index) in value5" :key="index + 'n'" class="el-tag el-tag--info el-tag--small el-tag--light">
                <span class="el-select__tags-text">{{item}}</span>
                <i class="el-tag__close el-icon-close"></i>                
            </span>
            <span v-for="(item, index) in value6" :key="index + 'ttt'" class="el-tag el-tag--info el-tag--small el-tag--light">
                <span class="el-select__tags-text">{{item}}</span>
                <i class="el-tag__close el-icon-close"></i>                
            </span>
        </span>
    </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
export default {
    name: 'params-component',
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
            value: '',
            value2: [],
            value3: [],
            value4: [],
            value5: [],
            value6: [],
            text: '',
        }
    },
    mounted() {
        document.querySelectorAll('.el-select__tags').forEach(ele => {
            ele.style.display = "none";
        });
    },
    methods: {
        ...mapActions('search', ['getCategory', 'getStat', 'getSearchAPI', 'getSearchProps', 'postFavorite', 'deleteFavorite', 'getFavorite']),
        handleChangeSelect() {

        },
    },
    computed: {
        ...mapState({
            donViBanHanh: state => state.search.donViBanHanh,
            loaiTaiLieu: state => state.search.loaiTaiLieu,
            nguoiKyHienThiOTrangChinh: state => state.search.nguoiKyHienThiOTrangChinh,
            chuDe: state => state.search.chuDe,
            thucTheTen: state => state.search.thucTheTen,
            nhan: state => state.search.nhan,
            searchFromDetail: state => state.search.searchFromDetail,
        })
    },
    watch: {
        searchFromDetail() {
            this.text = this.searchFromDetail;
        //     this.getSearchAPI({text:this.text, page:1, pagesize:20, bookmarked:false, sort:"docidx", sort_direction:"desc", publisherName: this.value2});
        },
        value2() {
            // console.log(document.querySelector('.test-select-dvbh > div.el-input > input').placeholder);
            let tempValue = this.value2;
            setTimeout(function() {
                if (tempValue.length != 0) {
                    document.querySelector('.test-select-dvbh > div.el-input > input').placeholder = `${tempValue.length} Đơn vị ban hành`;    
                }
                else {
                    document.querySelector('.test-select-dvbh > div.el-input > input').placeholder = `Đơn vị ban hành`;
                }
                }, 500)
            // console.log(document.querySelector('.test-select-dvbh > div.el-input > input').placeholder);
            this.getSearchAPI({text:this.searchFromDetail, page:1, pagesize:20, bookmarked:false, sort:"docidx", sort_direction:"desc", publisherName: this.value2});
        },
        value3() {
            let tempValue = this.value3;
            setTimeout(function() {
                if (tempValue.length != 0) {
                    document.querySelector('.test-select-nk > div.el-input > input').placeholder = `${tempValue.length} Người ký`;    
                }
                else {
                    document.querySelector('.test-select-nk > div.el-input > input').placeholder = `Người ký`;
                }
                }, 500)
        },
        value4() {
            let tempValue = this.value4;
            setTimeout(function() {
                if (tempValue.length != 0) {
                    document.querySelector('.test-select-cd > div.el-input > input').placeholder = `${tempValue.length} Chủ đề`;    
                }
                else {
                    document.querySelector('.test-select-cd > div.el-input > input').placeholder = `Chủ đề`;
                }
                }, 500)
        },
        value5() {
            let tempValue = this.value5;
            setTimeout(function() {
                if (tempValue.length != 0) {
                    document.querySelector('.test-select-n > div.el-input > input').placeholder = `${tempValue.length} Nhãn`;    
                }
                else {
                    document.querySelector('.test-select-n > div.el-input > input').placeholder = `Nhãn`;
                }
                }, 500)
        },
        value6() {
            let tempValue = this.value6;
            setTimeout(function() {
                if (tempValue.length != 0) {
                    document.querySelector('.test-select-ttt > div.el-input > input').placeholder = `${tempValue.length} Thực thể tên`;    
                }
                else {
                    document.querySelector('.test-select-ttt > div.el-input > input').placeholder = `Thực thể tên`;
                }
                }, 500)
        },
    }
}
</script>
<style scoped>
.params {
    /* Auto layout */

display: flex;
flex-direction: row;
align-items: center;
padding: 8px 16px;

position: absolute;
height: 40px;
left: 0px;
right: 0px;
top: 72px;

background: #FFFFFF;
box-shadow: inset 0px -1px 0px #E5E5E5;
}
.text-1 {
    position: static;
width: 147px;
height: 24px;
left: 16px;
top: 8px;

font-family: 'Noto Sans';
font-style: normal;
font-weight: 400;
font-size: 13px;
line-height: 24px;
/* identical to box height, or 185% */

text-align: right;

color: #000000;
}
.select-params-component {
    /* Auto layout */

display: flex;
flex-direction: row;
align-items: center;
padding: 0px;

position: static;
width: 146px;
height: 24px;
left: 175px;
top: 8px;


/* Inside auto layout */

flex: none;
order: 1;
flex-grow: 0;
margin: 0px 12px;
}
.icon-params-component {
        /* font-size: 7.61px; */
    line-height: 25px;
}
.divider {
    position: static;
width: 1px;
height: 16px;
/* left: 333px;
top: 12px; */

background: rgba(0, 0, 0, 0.1);

/* Inside auto layout */

flex: none;
order: 2;
flex-grow: 0;
/* margin: 0px 12px; */
}

.divider-2 {
/* divider */


position: static;
width: 1px;
height: 16px;
position: absolute;
left: 493px;
top: 12px;
/* left: 528px;
top: 12px; */

background: rgba(0, 0, 0, 0.1);

/* Inside auto layout */

flex: none;
order:2;
flex-grow: 0;
margin-left: 1px;
/* margin: 0px 12px; */
}

.divider-1 {
    /* divider */


/* position: static; */

width: 1px;
height: 16px;
position: absolute;
left: 313px;
top: 12px;

background: rgba(0, 0, 0, 0.1);

/* Inside auto layout */

flex: none;
order: 1;
flex-grow: 0;
margin-left: 1px;
/* margin: 0px 12px; */
}
.divider-3 {
    /* divider */


position: static;
width: 1px;
height: 16px;
position: absolute;
left: 618px;
top: 12px;
/* left: 333px; */
/* top: 12px; */

background: rgba(0, 0, 0, 0.1);

/* Inside auto layout */

flex: none;
order: 3;
flex-grow: 0;
margin-left: 1px;
/* margin: 0px 12px; */
}
.divider-4 {
    /* divider */


position: static;
width: 1px;
height: 16px;
position: absolute;
left: 734px;
top: 12px;
/* left: 333px; */
/* top: 12px; */

background: rgba(0, 0, 0, 0.1);

/* Inside auto layout */

flex: none;
order: 4;
flex-grow: 0;
margin-left: 1px;
/* margin: 0px 12px; */
}
.divider-5 {
    /* divider */


position: static;
width: 1px;
height: 16px;
position: absolute;
left: 842px;
top: 12px;
/* left: 333px; */
/* top: 12px; */

background: rgba(0, 0, 0, 0.1);

/* Inside auto layout */

flex: none;
order: 5;
flex-grow: 0;
margin-left: 1px;
/* margin: 0px 12px; */
}
.divider-6 {
    /* divider */


position: static;
width: 1px;
height: 16px;
/* left: 333px; */
/* top: 12px; */

background: rgba(0, 0, 0, 0.1);

/* Inside auto layout */

flex: none;
order: 6;
flex-grow: 0;
margin-left: 1px;
/* margin: 0px 12px; */
}

.select-params-component {
    margin-right: unset;
}

</style>