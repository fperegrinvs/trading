<template>
    <div id="chart">
        <apexchart type="bar" height="350" :options="chartOptions" :series="series"></apexchart>
      </div>
</template>
<script>
import ApexCharts from 'vue-apexcharts'
import Vue from 'vue'
Vue.component("apexchart", ApexCharts)
export default {
    // mounted() {
    //   document.querySelector('.apexcharts-xaxis.apexcharts-yaxis-inversed').style.display = "none";
    // },
    data() {
        return {
          // series: [{
          //   data: [400, 430, 448, 470, 540, 580, 690, 1100, 1200, 1380]
          // }],
          // chartOptions: {
          //     colors : ['#C86135'],
          //   chart: {
          //     type: 'bar',
          //     height: 350
          //   },
          //   plotOptions: {
          //     bar: {
          //       borderRadius: 4,
          //       horizontal: true,
          //     }
          //   },
          //   dataLabels: {
          //     enabled: false,
          //   },
          //   xaxis: {
          //     categories: ['South Korea', 'Canada', 'United Kingdom', 'Netherlands', 'Italy', 'France', 'Japan',
          //       'United States', 'China', 'Germany'
          //     ],
          //   }
          // },
          series: [{
            name: 'Marine Sprite',
            data: [44, 55, 41, 37, 22, 43, 21]
          }, {
            name: 'Striking Calf',
            data: [53, 32, 33, 52, 13, 43, 32]
          }, {
            name: 'Tank Picture',
            data: [12, 17, 11, 9, 15, 11, 20]
          }, {
            name: 'Bucket Slope',
            data: [9, 7, 5, 8, 6, 9, 4]
          }, {
            name: 'Reborn Kid',
            data: [25, 12, 19, 32, 25, 24, 10]
          }],
          chartOptions: {
            
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
              horizontalAlign: 'left',
              offsetX: 40,
                
              
            }
          },
          
          
        }
    },
}
</script>