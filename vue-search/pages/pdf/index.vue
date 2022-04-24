<template>
<div>
    <vue-pdf-app @pages-rendered="pagesRendered" style="height: 100vh;" :pdf="pdfUrl"  @open="openHandler">
    </vue-pdf-app>
    <div style="
        position: absolute;
width: 409px;
height: 48px;
left: calc(50% - 409px/2 + 0.5px);
bottom: 0px;

background: #FFFFFF;
border: 1px solid rgba(0, 0, 0, 0.2);
border-radius: 4px 4px 0px 0px;
display: flex;
align-items: center;
z-index: 3;
    ">
        <div class="zoom">
            <template v-if="pdfApp">
                <input type="number" min="1" :max="pdfApp.pagesCount" class="text-zoom" v-model='currentPage' @keypress.enter.prevent="onEnter"/>
            </template>
            
        </div>
        <!-- <div data-v-4aaa9b0d="" class="page-number-current"><input data-v-4aaa9b0d="" id="vuePdfAppPageNumber" name="pageNumber" type="number" max="9" class=""></div> -->
        <p class="text-parent-zoom">
            <!-- / 12 -->/ 
            <template v-if="pdfApp">
                {{pdfApp.pdfViewer.pdfDocument.numPages}}
            </template>
            
        </p>
        <el-divider class="test-divider-pdf" direction="vertical"></el-divider>
        <div style="width: 120px; margin-left: 10px;">
            <el-slider :min="10" :max="400"  v-model="value1"></el-slider>
        </div>
        <el-select class="test-select-pdf" v-model="value" placeholder="Select">
            <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
            </el-option>
        </el-select>
        <el-button-group class="test-button-group-pdf">
            <el-button @click="handleClickButtonZoomOut" class="test-button-pdf">
                <img src="@/assets/icons-figma/bx-zoom-out.svg" alt="">
            </el-button>
            <el-button @click="handleClickButtonZoomIn" class="test-button-pdf">
                <img src="@/assets/icons-figma/bx-zoom-in.svg" alt="">
            </el-button>
        </el-button-group>
        <!-- <el-input placeholder="Please input" v-model="inputSearch" @keypress.enter.native.prevent="onEnterSearch"></el-input> -->
    </div>
    
</div>
    
    
</template>
<script>

// const getSidebar = () => ({
//   viewThumbnail: true,
//   viewOutline: true,
//   viewAttachments: true,
// });
// const getSecondaryToolbar = () => ({
//   secondaryPresentationMode: true,
//   secondaryOpenFile: true,
//   secondaryPrint: true,
//   secondaryDownload: true,
//   secondaryViewBookmark: true,
//   firstPage: true,
//   lastPage: true,
//   pageRotateCw: true,
//   pageRotateCcw: true,
//   cursorSelectTool: true,
//   cursorHandTool: true,
//   scrollVertical: true,
//   scrollHorizontal: true,
//   scrollWrapped: true,
//   spreadNone: true,
//   spreadOdd: true,
//   spreadEven: true,
//   documentProperties: true,
// });
// const getToolbarViewerLeft = () => ({
//   findbar: true,
//   previous: true,
//   next: true,
//   pageNumber: true,
// });
// const getToolbarViewerRight = () => ({
//   presentationMode: true,
//   openFile: true,
//   print: true,
//   download: true,
//   viewBookmark: true,
// });
// const getToolbarViewerMiddle = () => ({
//   zoomOut: true,
//   zoomIn: true,
//   scaleSelectContainer: true,
// });
// const getToolbar = () => ({
//   toolbarViewerLeft: getToolbarViewerLeft(),
//   toolbarViewerRight: getToolbarViewerRight(),
//   toolbarViewerMiddle: getToolbarViewerMiddle(),
// });

import VuePdfApp from "vue-pdf-app";
import "vue-pdf-app/dist/icons/main.css";
// import { authHeaderVersion2 } from "../../_helpers"

import Vue from 'vue'
Vue.component("vue-pdf-app", VuePdfApp)
import {mapState, mapActions} from 'vuex'
export default {
    name: 'pdf-page',
    computed: {
        ...mapState({
            pdfUrl: state => state.searchNewVersion.currentPdfUrl,
            searchFromDetail: state => state.search.searchFromDetail
        })
    },
    data() {
        return {
            flag: false,
            // idConfig: {
            //     cursorHandTool: "vuePdfAppCursorHandTool",
            //     cursorSelectTool: "vuePdfAppCursorSelectTool",
            //     documentProperties: "vuePdfAppDocumentProperties",
            //     download: "vuePdfAppDownload",
            //     findbar: "vuePdfAppFindbar",
            //     findEntireWord: "vuePdfAppFindEntireWord",
            //     findHighlightAll: "vuePdfAppFindHighlightAll",
            //     findInput: "vuePdfAppFindInput",
            //     findMessage: "vuePdfAppFindMessage",
            //     findMatchCase: "vuePdfAppFindMatchCase",
            //     findNext: "vuePdfAppFindNext",
            //     findPrevious: "vuePdfAppFindPrevious",
            //     findResultsCount: "vuePdfAppFindResultsCount",
            //     firstPage: "vuePdfAppFirstPage",
            //     lastPage: "vuePdfAppLastPage",
            //     nextPage: "vuePdfAppNextPage",
            //     numPages: "vuePdfAppNumPages",
            //     openFile: "vuePdfAppOpenFile",
            //     pageNumber: "vuePdfAppPageNumber",
            //     pageRotateCcw: "vuePdfAppPageRotateCcw",
            //     pageRotateCw: "vuePdfAppPageRotateCw",
            //     presentationMode: "vuePdfAppPresentationMode",
            //     previousPage: "vuePdfAppPreviousPage",
            //     print: "vuePdfAppPrint",
            //     scrollHorizontal: "vuePdfAppScrollHorizontal",
            //     scrollVertical: "vuePdfAppScrollVertical",
            //     scrollWrapped: "vuePdfAppScrollWrapped",
            //     sidebarToggle: "vuePdfAppSidebarToggle",
            //     spreadEven: "vuePdfAppSpreadEven",
            //     spreadNone: "vuePdfAppSpreadNone",
            //     spreadOdd: "vuePdfAppSpreadOdd",
            //     toggleFindbar: "vuePdfAppToggleFindbar",
            //     viewAttachments: "vuePdfAppViewAttachments",
            //     viewBookmark: "vuePdfAppViewBookmark",
            //     viewOutline: "vuePdfAppViewOutline",
            //     viewThumbnail: "vuePdfAppViewThumbnail",
            //     zoomIn: "vuePdfAppZoomIn",
            //     zoomOut: "vuePdfAppZoomOut",
            // },
            // config: {
            //     sidebar: getSidebar(),
            //     secondaryToolbar: getSecondaryToolbar(),
            //     toolbar: getToolbar(),
            //     errorWrapper: true,
            // },
            //value1: slider
            value1: 100,
            options: [
                {
                value: 'auto',
                label: 'Automatic Zoom'
                },
                {
                value: 'page-actual',
                label: 'Actual Size'
                },
                {
                value: 'page-fit',
                label: 'Page Fit'
                },
                {
                value: 'page-width',
                label: 'Page Width'
                },
                {
                value: 50,
                label: '50%'
                }, {
                value: 75,
                label: '75%'
                }, {
                value: 100,
                label: '100%'
                }, {
                value: 125,
                label: '125%'
                }, {
                value: 150,
                label: '150%'
                },
                {
                value: 200,
                label: '200%'
                },
                {
                value:300,
                label: '300%'
                },
                {
                value: 400,
                label: '400%'
                }
                ],
            //value: select
            value: 100,
            pdfApp: null,
            currentPage: 1,
            inputSearch: '',
            pdfSrc: null,
        };
    },
    methods: {
        ...mapActions("searchNewVersion", ["setCurrentPdfUrl"]),
        // getPdf () {
        //     const requestOptions = {
        //         method: 'POST',
        //         // headers: { 'Content-Type': 'application/json' },
        //         headers: {
        //             'Authorization': authHeaderVersion2().Authorization,
        //             'Content-Type': 'application/json'
        //         },
        //         responseType: 'blob'        
        //     }
        //     fetch(`https://searchapi.chinhta123.com/static/58230925-QĐ-BKHCN/925-QĐ-BKHCN.pdf`, requestOptions).then((res) => {
        //         const blob = new Blob([res.data])
        //         this.pdfSrc = URL.createObjectURL(blob)
        //     })
        // },

        onEnterSearch() {
            // console.log('abcd')
            this.pdfApp.pdfViewer.findController.executeCommand('find',{
                caseSensitive: false, 
                findPrevious: undefined,
                highlightAll: true, 
                phraseSearch: true, 
                query: this.inputSearch
            })
        },
        onEnter() {
            // console.log('testtt')
            if (this.currentPage != '' && this.currentPage != '0' && this.currentPage >= 1 && this.currentPage <= this.pdfApp.pagesCount) {
                this.pdfApp.pdfViewer.currentPageNumber = parseInt(this.currentPage);
            }
        },
        handleClickButtonZoomIn() {
            // console.log('zom in')
            document.getElementById('zoomIn').click();
            this.value1 = parseInt(this.pdfApp.pdfViewer.currentScaleValue * 100)
        },
        handleClickButtonZoomOut() {
            // console.log('zoom out')
            document.getElementById('zoomOut').click();
            this.value1 = parseInt(this.pdfApp.pdfViewer.currentScaleValue * 100)
        },
        openHandler(pdfApp) {
            window._pdfApp = pdfApp;
        },
        toggleToolbar(bool) {
            this.config.toolbar = bool ? getToolbar() : false;
    },
        toggleLeftToolbar(bool) {
            this.config.toolbar.toolbarViewerLeft = bool
            ? getToolbarViewerLeft()
            : false;
        },
        toggleMiddleToolbar(bool) {
            this.config.toolbar.toolbarViewerMiddle = bool
            ? getToolbarViewerMiddle()
            : false;
        },
        toggleRightToolbar(bool) {
            this.config.toolbar.toolbarViewerRight = bool
            ? getToolbarViewerRight()
            : false;
        },
        toggleSidebar(bool) {
            this.config.sidebar = bool ? getSidebar() : false;
        },
        toggleSecondaryToolbar(bool) {
            this.config.secondaryToolbar = bool ? getSecondaryToolbar() : false;
        },
        myCustomFunction() {
            document.getElementById('thumbnailView').style.width = "100%";
            document.getElementById('toolbarViewer').style.display = "none";
            let toolbarViewer = document.getElementById('toolbarViewer');
            let div = document.createElement('div');
            // div.textContent ='Sửa đổi, bổ sung một số điều của Thông tư số 42/2015/TT-NHNN ngày 31 tháng 12 năm 2015 của Thống đốc Ngân hàng Nhà nước Việt... — Trang 1/12';
            // div.innerHTML = "<div id='test-appended-div'></div>"
            div.classList.add('test-appended-toolbarViewer');
            this.insertAfter(div, toolbarViewer);
            let div_buttonX = document.createElement('div');
            div_buttonX.innerHTML ="<img src='close.svg'/>";
            div_buttonX.classList.add('test-button-appended-toolbarViewer');
            let _this = this;
            div_buttonX.style.cursor = "pointer"
            div_buttonX.onclick = function() {
                // _this.flag = true;
                // _this.setCurrentPdfUrl("");
                // _this.$router.push({name: 'detail'})
                _this.setCurrentPdfUrl("");
            }
            // div.classList.add('test-appended-toolbarViewer');
            this.insertAfter(div_buttonX, toolbarViewer);
            document.getElementById('toolbarContainer').style.height = "40px";
            document.getElementById('viewerContainer').style.marginTop = "8px";
            document.getElementById('viewerContainer').style.zIndex = "3";
            document.getElementById('viewerContainer').style.backgroundColor = "#FCFBFB";
            document.getElementById('sidebarContent').style.marginTop = "4px";
            document.getElementById('sidebarContent').style.backgroundColor = "#FCFBFB";
            document.getElementById('sidebarContent').style.boxShadow = "unset";
            // document.getElementById('sidebarToggle').click()
            // this.createThumbnailNumber();
        },
        createThumbnailNumber () {
            // console.log(document.getElementsByClassName('thumbnailSelectionRing'))
            // document.getElementsByClassName('thumbnailSelectionRing').forEach(ele => console.log(ele))
            document.getElementsByClassName('thumbnailSelectionRing').forEach((ele, index) => {
                // console.log('??')
                let div = document.createElement('div')
                div.className = 'thumbnail-number'
                div.innerHTML = `<span>${index + 1}</span>`
                // ele.parentNode.insertAfter(div, ele)
                this.insertAfter(div, ele)
            })
            // document.getElementsByClassName('thumbnailSelectionRing').forEach((item, index) => {
            //     let div = document.createElement('div')
            //     div.className = 'thumbnail-number'
            //     div.innerHTML = `<span>${index + 1}</span>`
            //     item.parentNode.insertBefore(div, item)
            // })
            // let tempDom = document;
            let currentPagesCount = this.pdfApp.pagesCount;
            // let currentPage = this.pdfApp.page;
            let _this = this;
            document.getElementsByClassName('thumbnail').forEach(ele => {
                ele.addEventListener('click', function(event) {
                    // console.dir(event.currentTarget.getAttribute('data-page-number'))
                    // console.log('??????')
                    let tempCurrentPage = event.currentTarget.getAttribute('data-page-number')
                    document.querySelector('.text-small-page-pdf-header').textContent = `Trang ${tempCurrentPage}/${currentPagesCount}`;
                    _this.currentPage = tempCurrentPage
                })
            })
        },

        insertAfter(newNode, existingNode) {
            existingNode.parentNode.insertBefore(newNode, existingNode.nextSibling);
        },
        pagesRendered (pdfApp) {
            this.pdfApp = pdfApp;
            console.log(this.pdfApp);
            console.log(this.searchFromDetail);
            // this.pdfApp.pdfViewer.findController.executeCommand('find',{
            //     caseSensitive: false, 
            //     findPrevious: undefined,
            //     highlightAll: true, 
            //     phraseSearch: true, 
            //     query: this.searchFromDetail
            // })
            let testString = 'Sửa đổi, bổ sung một số điều của Thông tư số 42/2015/TT-NHNN ngày 31 tháng 12 năm 2015 của Thống đốc Ngân hàng Nhà nước Việt...'
            document.querySelector('.test-appended-toolbarViewer').innerHTML = `<p class='text-large-title-pdf-header'>${testString} — <strong class='text-small-page-pdf-header'>Trang ${this.pdfApp.page}/${this.pdfApp.pagesCount}</strong></p>`


            this.currentPage = this.pdfApp.page;
            // this.value = Math.round(this.pdfApp.pdfViewer.currentScaleValue * 100)
            // this.value1 = Math.round(this.pdfApp.pdfViewer.currentScaleValue * 100)
            this.value = Math.round(this.pdfApp.pdfViewer.currentScale * 100)
            this.value1 = Math.round(this.pdfApp.pdfViewer.currentScale * 100)

            let _this = this;
            let _document = document;
            this.createThumbnailNumber();
            pdfApp.eventBus.on('pagechanging', (event) => {
                _this.currentPage = event.pageNumber
                
                
                _document.querySelector('.text-small-page-pdf-header').textContent = `Trang ${_this.currentPage}/${_this.pdfApp.pagesCount}`;
                // if (this.highLight.X !== null) {
                //     this.removeCurrentHighLight(this.highLight.X, this.highLight.Y, this.highLight.widthHtml, this.highLight.H, this.highLight.ctxDomCanvasHtml2)
                // }
            })
            
            pdfApp.eventBus.on('scalechanging', (event) => {
                let pageScale = Math.round(event.scale * 100)
                // if (!this.isChangeSelectedScale) {
                //     this.selectedScale = this.pageScale + '%'
                // }
                // this.isChangeSelectedScale = false
                // console.log(event.scale * 100);
                if (pageScale <= 400) {
                    _this.value = pageScale
                    _this.value1 = pageScale
                }
            })
            if (!document.getElementById('outerContainer').classList.contains('sidebarOpen')) {
                document.getElementById('sidebarToggle').click()
            }
            
            console.log(this.pdfApp)
                        this.pdfApp.pdfViewer.findController.executeCommand('find', {
                            caseSensitive: false, 
                            findPrevious: undefined,
                            highlightAll: true, 
                            phraseSearch: true, 
                            query: this.searchFromDetail
                        });
            // document.getElementById('sidebarToggle').click()

        }
    },
    mounted() {
        // this.getPdf();
        // document.getElementById('outerContainer').classList.add('sidebarOpen');
        this.myCustomFunction();
    },
    watch: {
        // currentPage() {
        //     if (this.currentPage != '' && this.currentPage != '0' && this.currentPage >= 1 && this.currentPage <= this.pdfApp.pagesCount) {
        //         this.pdfApp.pdfViewer.currentPageNumber = parseInt(this.currentPage);
        //     }
            
        // },
        value1() {
            // this.value = this.value1;
            if (this.value1 != 0 && this.value1) {
                this.pdfApp.pdfViewer.currentScaleValue = this.value1 / 100
            }
        },
        value() {
            if (this.value) {
                if (typeof this.value === 'number') {
                    this.pdfApp.pdfViewer.currentScaleValue = this.value / 100
                } else {
                    if (this.value != '0') {
                        this.pdfApp.pdfViewer.currentScaleValue = this.value
                    }
                    
                }
            }
            
        }
    }
}
</script>
<style>
.thumbnail {
    position: relative;
}
.thumbnail.selected > div.thumbnail-number {
    background: #C86135;
}
.thumbnail-number > span {
    
font-family: 'Noto Sans';
font-style: normal;
font-weight: 700;
font-size: 10px;
line-height: 14px;
color: #FFFFFF;
}
.thumbnail-number {
    position: absolute;
    z-index: 2;
    width: 18px;
    height: 14px;
    bottom: 0;
    right: 0;
    margin-bottom: -7px;
    margin-right: 7px;
    /* background-color: #000; */
    /* background: #C86135; */
    background: #161212;
border-radius: 4px 0px 2px;
    font-size: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-top-left-radius: 4px;
    border-bottom-right-radius: 4px;

}
.text-small-page-pdf-header {
    font-family: 'Noto Sans';
font-style: normal;
font-weight: 400;
font-size: 12px;
line-height: 17px;
/* display: flex; */
align-items: center;
font-feature-settings: 'tnum' on, 'lnum' on;

color: #161212;
}
.zoom > input[type=number]::-webkit-inner-spin-button {
  -webkit-appearance: none;
}
.test-button-group-pdf {
    margin-left: 10px;
}
.test-button-pdf {
    /* border: 1px solid #363434!important; */
    height: 32px;
    border: 1px solid #E5E5E5;
    padding: 0 11px!important;
    border-radius: 4px;
    /* border-radius: unset; */
    /* display: flex; */
    display: inline-block;
    align-items: center;
}
.test-select-pdf > div > span > span > i {
    font-size: 8px;
    line-height: 20px;
}
.test-select-pdf > div > span {
    right: 0px;
}
.test-select-pdf > div > input {
    width: 60px;
    padding: unset;
    padding-right: unset !important;
    padding-left: 5px;
    height: 32px;
}
.test-select-pdf {
    margin-left: 10px;
}
.el-slider__button {
    border: 2px solid #C86135 !important;
}
.el-slider__bar {
    background: #C86135 !important;
/* border-radius: 4px; */
}
.test-divider-pdf {
    height: 2rem;
    margin-right: 16px;
}
.text-parent-zoom {
    font-family: 'Noto Sans';
font-style: normal;
font-weight: 400;
font-size: 12px;
line-height: 17px;
display: flex;
align-items: center;
font-feature-settings: 'tnum' on, 'lnum' on;
display: inline-block;

color: #161212;
}
.text-zoom:focus-visible {
    outline: unset;
}
.text-zoom {
    text-align: center;
    font-family: 'Noto Sans';
font-style: normal;
font-weight: 700;
font-size: 12px;
line-height: 17px;
/* display: flex; */
align-items: center;
font-feature-settings: 'tnum' on, 'lnum' on;

color: #161212;
display: inline-block;
width: 100%;
    height: 100%;
}
.zoom {
    display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
padding: 0px 8px;

/* position: static; */
width: 40px;
height: 32px;
/* left: 0px; */
/* top: 0px; */

background: #FFFFFF;
border: 1px solid #E5E5E5;
box-sizing: border-box;
border-radius: 4px;

/* Inside auto layout */

/* flex: none;
order: 0;
flex-grow: 0; */
margin: 8px 8px;
display: inline-block;
text-align: center;
}
#thumbnailView {
    overflow: hidden;
}

.test-button-appended-toolbarViewer {
    float: right;
}
a:not(:first-child) > div {
    margin-top: 11px !important;
}
/* div.thumbnail:first-child {
    margin-top: 11px;
} */
.thumbnail.selected > div > img {
    border: 2px solid #C86135;
border-radius: 4px;
}
.pdf-app #thumbnailView {
    padding-top: 17px;
    overflow: hidden;
}
.pdf-app #thumbnailView::-webkit-scrollbar {
    display: none;
}
.pdf-app #thumbnailView {
    overflow-y: scroll;
    -ms-overflow-style: none;  /* Internet Explorer 10+ */
    scrollbar-width: none; 
}
.pdf-app .thumbnailImage {
    box-shadow: unset;
    border: 1px solid rgba(22, 18, 18, 0.1);
    border-radius: 4px
}
.thumbnailSelectionRing {
    /* width: 130px !important; */
    width: 144px !important;
    height: 169px !important;
}
.thumbnailImage {
    width: 130px !important;
    height: 169px !important;
}
.canvasWrapper {
    border: 1px solid rgba(0, 0, 0, 0.1);
border-radius: 4px;
}
.page {
    border-image: unset !important;
}
.page:first-child {
    margin-top: 15px !important;
}
.viewer {
    background: #FCFBFB;
}
.test-appended-toolbarViewer {
        font-family: 'Noto Sans';
    font-style: normal;
    font-weight: 700;
    font-size: 14px;
    line-height: 20px;
    display: flex;
    align-items: center;
    font-feature-settings: 'tnum' on, 'lnum' on;
    color: #161212;
    height: 100%;
    margin-left: 15%;
}
.page:not(:first-child) {
    margin-top: 18px !important;
}
html[dir=ltr] .pdf-app #toolbarContainer {
    /* box-shadow: inset 0 1px 1px rgb(0 0 0 / 15%), inset 0 -1px 0 hsl(0deg 0% 100% / 5%), 0 1px 0 rgb(0 0 0 / 15%), 0 1px 1px rgb(0 0 0 / 10%); */
    background: #FCFBFB;
    box-shadow: inset 0px -1px 0px rgba(0, 0, 0, 0.05);
}
html[dir=ltr] .pdf-app #viewerContainer {
    overflow-y: scroll;
    scrollbar-width: none; /* Firefox */
    -ms-overflow-style: none;  /* Internet Explorer 10+ */
}
html[dir=ltr] .pdf-app #viewerContainer::-webkit-scrollbar { /* WebKit */
    width: 0;
    height: 0;
}


/* .pdf-app[class] #sidebarContent {
    background-color: red;
} */
/* .toolbar-demo-wrapper {
  display: flex;
  height: 100%;
}

.toolbar-demo-wrapper > :first-child {
  flex: 8 0 10px;
}

.toolbar-demo-wrapper > :last-child {
  flex: 4 0 10px;
} */
</style>