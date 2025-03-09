<template>
  <div  class="com-container">
    <div id='lefexpect_ref' style='width: 100%;height:100%;' ref="lefexpect_ref"></div>
  </div>
</template>

<script>
import fontSize from '@/assets/utils/fontSize'
import axios from 'axios'
export default {
  data () {
    return {
      chartInstance: null,
      allData: null,
      scatterScale: 20
    }
  },
  created () {
    this.$socket.registerCallBack('pergdpsui', this.getData)
  },
  // 分辨率适配 对窗口大小变化的事件进行监听
  async mounted () {
    this.$socket.send({
      action: 'getData',
      socketType: 'pergdpsui',
      chartName: 'pergdpsui',
      value: ''
    })
    
  },
  destroyed () {

  },
  methods: {
    setEchartsData(value){
      console.log(value)
      if(value){
        this.draw({titleFontSize:100,yAxisFontSize:18})
      }else{
        this.draw({titleFontSize:30,yAxisFontSize:14})
      }
    },
    getData (ret) {
      // 获取服务器的数据, 对this.allData进行赋值之后, 调用updateChart方法更新图表
      // const { data: ret } = await axios.get('http://localhost:9998/api/pergdpsui')
      this.allData = ret
      console.log(99090909, ret)
      this.draw()
      this.screenAdapter()
    },
    draw (obj = {titleFontSize: 30,yAxisFontSize:14}) {
      const myChart = this.$echarts.init(this.$refs.lefexpect_ref, 'vintage')
      this.chartInstance = myChart
      const data = this.allData
      console.log(282, data)
      const itemStyle = {
        opacity: 0.8
      }
      const sizeFunction = function (x, b) {
        const y = Math.sqrt(x / 5e8) + 0.1
        return y * b
      }
      // Schema:
      const schema = [
        { name: 'Income', index: 0, text: '人均收入', unit: '美元' },
        { name: 'LifeExpectancy', index: 1, text: '抑郁症人数', unit: '' },
        { name: 'Population', index: 2, text: '总人口', unit: '' },
        { name: 'Country', index: 3, text: '国家', unit: '' }
      ]
      const option = {
        baseOption: {
          backgroundColor: '#fff',
          timeline: {
            axisType: 'category',
            orient: 'vertical',
            autoPlay: true,
            inverse: true,
            playInterval: 1000,
            left: null,
            right: 0,
            top: 20,
            bottom: 20,
            width: 55,
            height: null,
            symbol: 'none',
            color: '#444444',
            checkpointStyle: {
              borderWidth: 2,
              color: '#444444'
            },
            controlStyle: {
              showNextBtn: false,
              showPrevBtn: false,
              color: '#444444'
            },
            data: []
          },
          title: [{
            text: 1234,
            textAlign: 'center',
            left: '75%',
            top: 60,
            textStyle: {
              fontSize: obj.titleFontSize,
              color: '#cacaca'
            }
          }, {
            text: '▎各国抑郁症的严重程度与经济情况关系演变',
            textStyle: { color: '#7a64e5', fontSize: obj.yAxisFontSize},
            left: 10,
            top: 10,
          }],
          tooltip: {
            padding: 5,
            borderWidth: 1,
            color: '#444444',
            formatter: function (obj) {
              const value = obj.value
              return schema[3].text + '：' + value[3] + '<br>' + schema[1].text + '：' + value[1] + schema[1].unit + '<br>' + schema[0].text + '：' + value[0] + schema[0].unit + '<br>' + schema[2].text + '：' + value[2] + '<br>'
            }
          },
          grid: {
            top: 100,
            bottom: '10%',
            containLabel: true,
            left: '14%',
            right: 110,
            color: '#444444'
          },
          xAxis: {
            type: 'log',
            name: '人均收入',
            max: 100000,
            min: 300,
            nameGap: 25,
            nameLocation: 'middle',
            nameTextStyle: {
              fontSize: obj.yAxisFontSize,
              color: '#444444'
            },
            splitLine: {
              show: false,
              color: '#444444'
            },
            axisLabel: {
              formatter: '{value} $',
              fontSize: 14,
              color: '#444444'
            }
          },
          yAxis: {
            type: 'value',
            name: '抑郁症人数',
            max: 5000000,
            nameTextStyle: {
              fontSize: obj.yAxisFontSize / 1.5,
              color: '#444444',
              width: 10
            },
            splitLine: {
              show: false
            },
            axisLabel: {
              formatter: '{value} ',
              color: '#444444'
            }
          },
          visualMap: [
            {
              show: false,
              dimension: 3,
              categories: data.counties,
              inRange: {
                color: (function () {
                  const colors = ['#f56cdf', '#bc4ed4', '#68b9b9', '#2054de', '#c955d7', '#ffa2a1', '#64b8c2', '#f56cdf', '#b6a2de', '#c360d9', '#8752d8', '#2f3ed4']
                  return colors.concat(colors)
                })()
              }
            }
          ],
          series: [
            {
              type: 'scatter',
              itemStyle: itemStyle,
              data: data.series[0],
              symbolSize: (val) => {
                return sizeFunction(val[2], this.scatterScale)
              }
            }
          ],
          animationDurationUpdate: 1000,
          animationEasingUpdate: 'quinticInOut'
        },
        options: []
      }
      for (let n = 0; n < data.timeline.length; n++) {
        option.baseOption.timeline.data.push(data.timeline[n])
        option.options.push({
          title: {
            show: true,
            text: data.timeline[n] + ''
          },
          series: {
            name: data.timeline[n],
            type: 'scatter',
            itemStyle: itemStyle,
            data: data.series[n],
            symbolSize: (val) => {
              return sizeFunction(val[2], this.scatterScale)
            }
          }
        })
      }
      this.chartInstance.setOption(option)
      window.addEventListener('resize', this.screenAdapter)
    },
    screenAdapter () {
      this.scatterScale = this.$refs.lefexpect_ref.offsetWidth > 1000 ? 80 : 30
      this.chartInstance.resize()
    }
  }
}
</script>

<style scoped>
</style>
