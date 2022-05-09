<template>
  <div :id="id" class="chartComponent" :style="'width: ' + width + 'px;'">
    <!-- <h1>{{ msg }}</h1> -->
    <trading-vue
      ref="tvjs"
      :id="id + '_TV'"
      :data="chart"
      :width="width"
      :height="height"
      :toolbar="true"
      :overlays="overlays"
      :extensions="ext"
      :x-settings="xsett"
      :title-txt="title_txt"
      :chart-config="chartConfig"
      :colors="colours"
      :legend-buttons="buttons"
      @range-changed="onRange"
      @legend-button-click="onButtonClick"
      @object-selected="onObjectSelected"
      @modify-interface="onModifyInterface"
      @tool-selected="onToolSelected"
      @remove-tool="onToolRemoved"
      @close="onDialogueClose"
    >
    </trading-vue>
    <div
      :id="id + '_TV_progress'"
      class="chartLoading waiting"
      :style="'top: -' + (height / 2 + 50) + 'px;'"
    >
      <h6>
        Loading...<img src="images/chart-loading.svg" height="16" width="16" />
      </h6>
      <div class="mb-2 progress">
        <div
          role="progressbar"
          aria-valuemin="0"
          aria-valuemax="100"
          :aria-valuenow="progressBar"
          class="progress-bar bg-success progress-bar-striped progress-bar-animated"
          :style="'width: ' + progressBar + '%;'"
        >
          {{ Math.floor(progressBar) }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { TradingVue, DataCube } from "trading-vue-js";
import Overlays from "./indicators/index"
import XP from './tvjs-xp/src'

// custom chart tools -----------------------
import fibonacci from "./tools/fibonacci.vue"
import line from "./tools/LineTool.vue"
// import long from "./tools/position-long.vue"
import range from "./tools/RangeTool.vue"
import shapes from "./tools/shapes.vue"
import text from "./tools/text.vue"

// import test from "./tools/position-test.vue"
// import pin from "./tools/test-pin.vue"



const tools = [line, fibonacci, range, shapes, text] //, test, pin]
let   overlays = Object.values(Overlays).concat(tools)

export default {
  name: "PriceChart",
  props: {
    id: {type: String, default: "PriceChart"},
    night: {type: Boolean, default: true},
    width: Number,
    height: {type: Number, required: true},
    title_txt: {type: String, required: true},
    exchName: String,
    config: {type: Object, required: true},
    buttons: Array,
    xsett: Object,
    data: Object,
    interval_ms: Number,
    progress: Number,
    tick: Object,
    message: String,
    options: {type: Object, default: () => {}}
  },
  components: { TradingVue },
  data() {
    return {
      ext: Object.values(XP),
      // overlays: overlays,
      overlays: this.combineOverlays(),
      chart: new DataCube(this.chartData()),
      chartConfig: {
        ...{
          TOOLBAR: 45,
          TB_ICON: 25,
          TB_ITEM_M: 3,
        },
        ...this.config
      },
      chartIsEmpty: true,
      progressBar: this.progress,
      progressHTML: {},
      messageTxt: Vue.observable(this.message.msg),
      selected: {},
      selectedState: "",
      selectedPrev: {},
      dialogue: null,
      widgets: {},
      // chart constants that can be modified via config
      //  https://github.com/tvjsx/trading-vue-js/blob/master/src/stuff/constants.js#L34
      defaultData:
      {
        chart: {
          data: [],
          settings: {},
          grid: {},
          tf: "1h"
        },
        config: {},
        onchart: [],
        offchart: [],
        datasets: [],
        tools: []
      },
      colours: {
        title: "#eee"
      },
      legend: null,
    };
  },
  computed: {
    // messageTxt:()=>this.message.msg
    selectedItem: {
      get: () => {
        if (this.selected) {
          return this.chart.get(this.selected)[0]
        }
      }
    }
  },
  created() {},
  mounted() {

    this.chart.tv.$refs.chart.$emit("custom-event", {
      event: "register-tools",
      args: tools.map(x => ({ use_for: x.methods.use_for(), info: x.methods.tool()})),
    });

    window.addEventListener("resize", this.onResize);
    this.onResize();

    this.chartIsEmpty = true
    console.log('Chart:',this.id,': waiting for data...');
    // console.log('chart object:',JSON.stringify(this.chart))
    let $p = document.getElementById(this.id + "_TV_progress");
    this.progressHTML = $p.cloneNode(true)

    if ($p.classList.contains("waiting")) {
      $p.classList.toggle("waiting");
      $p.classList.toggle("fadein");
    }
  },

  beforeDestroy() {
    window.removeEventListener("resize", this.onResize);
  },

  watch: {

    exchName: function(newValue, oldValue) {
      this.loadNewChart()
    },

    title_txt: function(newValue, oldValue) {
      this.loadNewChart()
    },

    tick: function(newValue, oldValue) {
      let OHLCV = [newValue.t,null,null,null,newValue.price,newValue.volume]
      if (this.chartIsEmpty) {
        this.chartIsEmpty = false
        this.chart.tv.$refs.chart.interval_ms = this.interval_ms
      }
      this.chart.update(newValue);
    },

    data: function(newValue, oldValue) {
      if (this.chartIsEmpty) {
        this.chartIsEmpty = false
        this.chart.tv.$refs.chart.interval_ms = this.interval_ms
      }
      console.log('Chart:',this.id,': Data received!');
      this.chart.merge("chart.data", newValue.chart.data);
    },

    progress: function(newValue, oldValue) {
      this.progressBar = newValue;
    },

    progressBar: function(newValue, oldValue) {
      if (newValue >= 100) {

        this.gridResize()

        setTimeout(
          function(id) {
            console.log('Chart:',id,': history loaded!');
            let $p = document.getElementById(id + "_TV_progress");
            if ($p && $p?.classList.contains("fadein")) {
              $p.classList.toggle("fadein");
              $p.classList.toggle("fadeout");
              setTimeout(
                function(el) {
                  el.remove()
                },
                2000,
                $p
              )
            }
          },
          3000,
          this.id
        );
      }
    },

    message: function(newValue, oldValue) {
      switch(newValue) {
        case 'state':
          this.emitState()
          break;
      }
    },

    'chart.data.selected': function(newValue, oldValue) {

      const dc = this.chart
      const tv = this.chart.tv
      const widgets = this.$el.getElementsByClassName("tvjs-widgets")[0]

      if (oldValue) {
        this.dialogueClose()
      }
      if (newValue) {
        console.log("TVJS: deselected:",oldValue)
        console.log("TVJS: selected:",newValue)
        const selected = this.chart.get(newValue)[0]
        this.selected = selected

        if (selected && selected.settings.$state === "finished")
          this.dialogueOpen()
      }
    },

    'selected.settings.$state': function(newValue, oldValue) {
      let state = (newValue)? newValue : "deselected"
      if (state !== "deselected") {
        console.log("Price Chart: selected:",this.selected.id,"state:",state)
      }

      if (this.selected?.settings.$state === "finished") {
        console.log('selected.settings.$state:',newValue)
        this.dialogueOpen()
        }
    }
  },

  methods: {

    loadNewChart() {

      // TODO: save chart state - indivators, drawings

      // delete old chart data
      console.log("Chart:",this.id,': load new chart:',this.exchName,this.title_txt)
      this.progressBar = 1;
      this.chart.agg.clear()
      this.chart.set('chart.data', [])
      // this.$refs.tvjs.resetChart();
      this.chartIsEmpty = true

      // insert progress bar
      let $o = document.getElementById(this.id)
      $o.appendChild(this.progressHTML)

      this.progressBar = 1

      let $p = document.getElementById(this.id + "_TV_progress");
      if ($p.classList.contains("waiting")) {
        $p.classList.toggle("waiting");
        $p.classList.toggle("fadein");
      }

      // TODO: load matching stored chart state - indicators, drawings

    },
    onResize(event) {
      // this.width = window.innerWidth
      // this.height = window.innerHeight - 50
    },
    onRange(r) {
      // console.log("TVJS: onRange",r)
    },
    onButtonClick(e) {
      console.log("TVJS: Legend Button:",JSON.stringify(e))
      this.legend = e
    },
    onModifyInterface(i) {
      console.log("TVJS: Interface:",JSON.stringify(i))
    },
    onObjectSelected(o) {
      console.log("TVJS: Object Selected:",JSON.stringify(o))
    },
    onToolSelected(t) {
      console.log("TVJS: Tool Selected:",JSON.stringify(t))
    },
    onToolRemoved(t) {
      console.log("TVJS: Tool Removed:",JSON.stringify(t))
      this.dialogueClose()
    },
    onDialogueClose(e) {
      // console.log("dialogue close")
      this.dialogueClose()
    },
    dialogueClose() {
      const widgets = this.$el.getElementsByClassName("tvjs-widgets")[0]

      if (this.dialogue) {
        this.dialogue.sett.$selected = false
        this.dialogue.$destroy(true)
        widgets.removeChild(this.dialogue.$el)
        this.dialogue = null
        this.selected = null
      }
    },

    dialogueOpen() {
      if (this.dialogue) return

      const dc = this.chart
      const tv = this.chart.tv
      const widgets = this.$el.getElementsByClassName("tvjs-widgets")[0]

      const settWin = XP["settings-dialogue"].SettingsDialogue
      const main = XP["settings-dialogue"].Main

      const settWinClass = Vue.extend(settWin)
      // props - id, main, dc, tv, data

      const propsData = {
        id: this.selected.id,
        main: new main(tv, dc),
        dc: dc,
        tv: tv,
        data: {
          ov: this.selected
        }
      }
      const SettWin = new settWinClass({propsData: propsData})
      // Don't mount / replace DOM element - render as off-document element
      SettWin.$mount()
      this.dialogue = SettWin
      // insert component into DOM
      widgets.appendChild(SettWin.$el)

      let close = this.$el.getElementsByClassName("tvjs-x-window-close")[0]
      close.addEventListener("click", this.onDialogueClose)
    },

    // Grid defining overlays
    grid_ovs() {
      let list = [this.chart.data.chart];
      for (var ov of this.chart.data.offchart) {
        if (!ov.grid || ov.grid.id === undefined) {
          list.push(ov);
        }
      }
      return list;
    },
    gridResize() {
      let grids = this.grid_ovs();
      for (let i = 1; i < grids.length; i++) {
        grids[i].grid.height = 0.20;
      }
    },
    // provide a valid datacube
    chartData() {
      if (this.data === undefined)
        // provide an empty chart as fallback
        return this.defaultData
      else
        // return the datacube provided via props
        return this.data
    },
    //  https://discord.com/channels/692731556288004116/693033639528890378/880843353095282699
    // RESET(state) {
    //   state.cache.reset()
    //   state.dc.agg.clear()
    //   state.dc.set('chart.data', [])
    // },
    // https://discord.com/channels/692731556288004116/693033639528890378/882570091127013426
    // resetChart() {
    //   this.$refs.tvjs.resetChart(false)
    // },

    // DataCube API
    // https://github.com/tvjsx/trading-vue-js/tree/master/docs/datacube#datacube-api
    emitState() {
      const state = {
        onchart: [],
        offchart: []
      }
      const onChart = this.chart.get('onchart.')
      onChart.forEach(overlay => {
        let o = {...overlay}
        o.data = []
        delete o.id
        delete o?.loading
        // delete o.settings.$uuid
        // delete o.settings?.$selected
        // delete o.settings?.$state
        state.onchart.push(o)
      })
      const offChart = this.chart.get('offchart.')
      offChart.forEach(overlay => {
        let o = {...overlay}
        o.data = []
        delete o.id
        delete o?.loading
        // delete o.settings.$uuid
        // delete o.settings?.$selected
        // delete o.settings?.$state
        state.offchart.push(o)
      })

      this.$emit('chartState',state)
    },

    combineOverlays() {
      // include custom overlays
      if (typeof this.options !== "undefined"
          && typeof this.options?.overlays !== "undefined") {
        overlays = Object.values(Overlays).concat(this.options.overlays)
      }
      return overlays
    }
  },
  // mixins: [tools]
};
</script>

<style scoped>
.chartLoading {
  position: relative;
  left: 35%;
  width: 30%;
  padding: 20px 30px 30px 20px;
  border-radius: 20px;
  background: #4c4f5480;
  -webkit-backdrop-filter: blur(5px);
  backdrop-filter: blur(5px);
}
.chartLoading h6 img {
  margin: 0 0 5px 1em;
}
.waiting {
  display: none;
  opacity: 0;
}
.fadein {
  /*put animation attributes here. Here's a list.
    (https://www.w3schools.com/css/css3_animations.asp)*/
  /* animation-duration: 2s;
    animation-iteration-count: 1; */
  /* -webkit-animation: fadeIn 3s linear forwards;
    -moz-animation: fadeIn 3s linear forwards;
    -o-animation: fadeIn 3s linear forwards;
    animation: fadeIn 3s linear forwards; */
  /*put the default display and opacity here, the same as "0%"*/
  /* display: none;
    opacity: 0; */
  display: block;
  opacity: 1;
  z-index: 200;
}
.fadeout {
  /*put animation attributes here. Here's a list.
    (https://www.w3schools.com/css/css3_animations.asp)*/
  /* animation-duration: 2s;
    animation-iteration-count: 1; */
  -webkit-animation: fadeOut 2s linear forwards;
  -moz-animation: fadeOut 2s linear forwards;
  -o-animation: fadeOut 2s linear forwards;
  animation: fadeOut 2s linear forwards;
  /*put the default display and opacity here, the same as "0%"*/
  display: block;
  opacity: 1;
  z-index: 200;
  /* display: none;
    opacity: 0; */
}
/*This is a fade in example.*/
@keyframes fadeIn {
  0% {
    display: none;
    opacity: 0;
  }
  1% {
    display: block;
    opacity: 0;
  }
  100% {
    display: block;
    opacity: 1;
  }
}
/*This is a fade out example. */
@keyframes fadeOut {
  0% {
    display: block;
    opacity: 1;
    z-index: 200;
  }
  1% {
    display: block;
    opacity: 1;
  }
  100% {
    display: none;
    opacity: 0;
    z-index: 0;
  }
}
</style>
<style>
.tvjs-x-window.sett-dialogue,
.tvjs-x-window.sett-win {
    padding-bottom: 0 !important;
    border: 1px solid #80808066 !important;
    border-radius: 10px;
    box-shadow: 0 2px 6px #0009;
}
.tvjs-x-window-head {
  font-size: 1.3em !important;
  font-weight: 500;
  height: 2em;
  margin: 0;
}
.sett-dialogue-item,
.sett-win-item {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: flex-start;
    align-content: center;
    align-items: center;
}
.sett-dialogue-item label,
.sett-win-item label {
    min-width: 10em !important;
    padding-top: 2px;
    color: #a7a7a7 !important;
}
.tvjs-std-input {
  margin: 0 5px 5px 0 !important;
  background-color: #161b27;
  border: 1px dotted #353940;
  height: 1.2em !important;
  border-radius: 3px;
  padding: 2px 0px 3px 10px;
  color: whitesmoke;
  font-size: 1em !important;
  outline: none;
  width: 100px;
}
.sett-dialogue-empty,
.sett-win-empty {
    opacity: 0.5;
}
</style>
