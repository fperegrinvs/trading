<template>
    <div class="params">
        <p class="text-1">
            Lọc kết quả
        </p>
        <ul class="test-ul-saved-page">
            <!-- <li class="test-li-saved-page">
                 <el-date-picker class="date-picker-params-component"
                v-model="value"
                type="date"
                placeholder="Ngày ban hành" suffix-icon="el-icon-date">
                </el-date-picker>
            </li> -->
            <!-- <li class="test-li-saved-page">
                <el-select :class="value2.length > 0 ? 'need-to-highlight' : ''" @change="handleChangeSelect" popper-class="test-select-params-component" ref="test-select" style="    width: 170px;
            height: 24px;" multiple filterable class="select-params-component test-select-dvbh" v-model="value2"
            placeholder="Đơn vị ban hành">
                    <template slot="prefix">
                        <img src="@/assets/icons-figma/bx-select-multiple.svg" alt="">
                    </template>

                    <el-option
                        v-for="item in donViBanHanh.data"
                        :key="item.name"
                        :label="item.name"                            
                        :value="item.name">
                    </el-option>
                    
                    
                </el-select>
            </li> -->
            <!-- <li class="test-li-saved-page">
                <el-select style="    width: 115px;
    height: 24px;" multiple filterable :class="value3.length > 0 ? 'need-to-highlight' : ''" class="select-params-component test-select-nk" v-model="value3" placeholder="Người ký">
                    <template slot="prefix">
                        <img src="@/assets/icons-figma/bx-select-multiple.svg" alt="">
                    </template>
                    <el-option
                        v-for="item in nguoiKyHienThiOTrangChinh.data"
                        :key="item.name"
                        :label="item.name"                            
                        :value="item.name">
                    </el-option>
                </el-select>
            </li> -->

            <li v-for="(item, index) in prop.data" :key="item.id + 'searchProp'" class="test-li-saved-page">
                <!-- <el-select style="    width: 115px;
    height: 24px;" multiple filterable :class="testValue[index].length > 0 ? 'need-to-highlight' : ''" class="select-params-component"
    v-model="testValue[index]" :placeholder="item.description"> -->
                <el-select v-if="testValue[index]" style="    width: 115px;
                height: 24px;" multiple filterable :class="[testValue[index].length > 0 ? 'need-to-highlight' : '', index == 0 ? 'test-select-nk' : '', index == 1 ? 'test-select-dvbh': '', index == 2 ? 'test-select-ltl' : '']" class="select-params-component"
                v-model="testValue[index]" :placeholder="item.description">
                    <template slot="prefix">
                        <img src="@/assets/icons-figma/bx-select-multiple.svg" alt="">
                    </template>
                    <template v-if="item.id == 1">
                        <el-option
                        v-for="(item, index) in propSigner.data"
                        :key="index + 'signer'"
                        :label="item"      
                        :value="item">
                        </el-option>
                    </template>
                    <template v-else-if="item.id == 2">
                        <el-option
                        v-for="(item, index) in propPublisherName.data"
                        :key="index + 'publisherName'"
                        :label="item"      
                        :value="item">
                        </el-option>
                    </template>
                    <template v-else-if="item.id == 3">
                        <el-option
                        v-for="(item, index) in propDocumentType.data"
                        :key="index + 'documentType'"
                        :label="item"      
                        :value="item">
                        </el-option>
                    </template>
                </el-select>
            </li>
        </ul>
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
            testValue: [],
            text: '',
        }
    },
    mounted() {
        setInterval(function() {
                document.querySelectorAll('.el-select__tags').forEach(ele => {
                    ele.style.display = "none";
                })
            }, 500);
        this.getProp();
        // this.getPropValue(1);
        // this.getPropValue(2);
        // this.getPropValue(3);
    },
    methods: {
        ...mapActions('search', ['getCategory', 'getStat', 'getSearchAPI', 'getSearchProps', 'postFavorite', 'deleteFavorite', 'getFavorite']),
        ...mapActions('searchNewVersion', ['getProp', 'getPropValue']),
        handleChangeSelect() {

        },
    },
    created() {
      if (this.searchFromDetail) {
        this.text = this.searchFromDetail;
        this.getSearchAPI({text:this.text, page:1, pagesize:20, bookmarked:false, sort:"docidx", sort_direction:"desc"});
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
            searchFromDetail: state => state.search.searchFromDetail,



            currentSearchSaved: state => state.searchNewVersion.currentSearchSaved,




            prop: state => state.searchNewVersion.prop,
            propSigner: state => state.searchNewVersion.propSigner,
            propPublisherName: state => state.searchNewVersion.propPublisherName,
            propDocumentType: state => state.searchNewVersion.propDocumentType,
        }),
        copy () { return this.testValue.slice() },
    },
    watch: {
        copy(a) {
            // let tempValue = this.value3;
            setTimeout(function() {
                if (a[0].length != 0) {
                    document.querySelector('.test-select-nk > div.el-input > input').placeholder = `${a[0].length} Người ký`;    
                }
                else {
                    document.querySelector('.test-select-nk > div.el-input > input').placeholder = `Người ký`;
                }
            }, 500)
            setTimeout(function() {
                if (a[1].length != 0) {
                    document.querySelector('.test-select-dvbh > div.el-input > input').placeholder = `${a[1].length} Đơn vị ban hành`;    
                }
                else {
                    document.querySelector('.test-select-dvbh > div.el-input > input').placeholder = `Đơn vị ban hành`;
                }
                }, 500)
            setTimeout(function() {
                if (a[2].length != 0) {
                    document.querySelector('.test-select-ltl > div.el-input > input').placeholder = `${a[2].length} Loại tài liệu`;    
                }
                else {
                    document.querySelector('.test-select-ltl > div.el-input > input').placeholder = `Loại tài liệu`;
                }
                }, 500)
            // console.log(a)
            // console.log(this.testValue);
            // console.log(a[0])
            // console.log(this.testValue[0])
        },
        prop() {
            this.prop.data.forEach(ele => {
                if (ele.searchable) {
                    this.getPropValue(ele.id);
                    this.testValue.push([]);
                }
            })
        },
        currentSearchSaved() {
            this.text = this.currentSearchSaved;
            console.log(this.text);
        },
        searchFromDetail() {
            // this.text = this.searchFromDetail;
            // console.log(this.text);
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
li.test-li-saved-page + li.test-li-saved-page  { border-left: 1px solid rgba(0, 0, 0, 0.1); }
.test-ul-saved-page {
    display: flex;
}
.divider-new {
    display: inline-block;
    height: 16px;
    width: 1px;
    background: rgba(0, 0, 0, 0.1);
}
.params {
    /* Auto layout */

display: flex;
flex-direction: row;
align-items: center;
padding: 8px 16px;

position: absolute;
height: 40px;
left: 0px;
left: 256px;
right: 0px;
top: 72px;

background: #FFFFFF;
box-shadow: inset 0px -1px 0px #E5E5E5;
}
.text-1 {
    position: static;
/* width: 147px;
height: 24px;
left: 16px;
top: 8px; */

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