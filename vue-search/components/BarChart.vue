<template>
  <Bar
    :chart-options="chartOptions"
    :chart-data="chartData"
    :chart-id="chartId"
    :dataset-id-key="datasetIdKey"
    :plugins="plugins"
    :css-classes="cssClasses"
    :styles="styles"
    :width="width"
    :height="height"
  />
</template>
<script>
import { Bar } from 'vue-chartjs/legacy'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

export default {
  name: 'BarChart',
  components: { Bar },
  props: {
    chartData: {
      type: Object,
      default: () => {}
    },
    chartOptions: {
      type: Object, default: () => {responsive: true}
    },
    chartId: {
      type: String,
      default: 'bar-chart'
    },
    datasetIdKey: {
      type: String,
      default: 'label'
    },
    width: {
      type: Number,
      default: 400
    },
    height: {
      type: Number,
      default: 400
    },
    cssClasses: {
      default: '',
      type: String
    },
    styles: {
      type: Object,
      default: () => {}
    },
    plugins: {
      type: Array,
      default: () => []
    }
  },
  // data() {
  //   return {
  //     chartData: {
  //       labels: [ 'January', 'February', 'March' ],
  //       datasets: [           
  //         { label: "tstt",data: [40, 20, 12],
  //         backgroundColor: [
  //     'rgb(255, 99, 132)',
  //     'rgb(54, 162, 235)',
  //     'rgb(255, 205, 86)'
  //   ], } ]
  //     },
  //     chartOptions: {
  //       responsive: true
  //     }
  //   }
  // }
}
</script>