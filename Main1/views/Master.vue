<!-- 商家销量统计的横向柱状图 -->
<template>
  <div class="com-container">
    <div class="com-chart" ref="master_ref"></div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data () {
    name: "Master",
    return {
      chartInstance: null,
      allData: null, // 服务器返回的数据
      currentPage: 1, // 当前显示的页数
      totalPage: 0, // 一共有多少页
      timerId: null // 定时器的标识
    }
  },
  created () {
    // 在组件创建完成之后 进行回调函数的注册
    this.$socket.registerCallBack('masterData', this.getData)
  },
  mounted () {
    this.initChart()
    // this.getData()
    this.$socket.send({
      action: 'getData',
      socketType: 'masterData',
      chartName: 'master',
      value: ''
    })
    window.addEventListener('resize', this.screenAdapter)
    // 在页面加载完成的时候, 主动进行屏幕的适配
    this.screenAdapter()
  },
  destroyed () {
    clearInterval(this.timerId)
    // 在组件销毁的时候, 需要将监听器取消掉
    window.removeEventListener('resize', this.screenAdapter)
    this.$socket.unRegisterCallBack('masterData')
  },
  methods: {
    // 初始化echartInstance对象
    initChart () {
      this.chartInstance = this.$echarts.init(this.$refs.master_ref, 'vintage')
      // 对图表初始化配置的控制
      const initOption = {
        title: {
          text: '▎ 各国自杀率',
          textStyle: { color: '#444444' },
          left: 20,
          top: 20
        },
        grid: {
          top: '20%',
          left: '3%',
          right: '6%',
          bottom: '3%',
          containLabel: true // 距离是包含坐标轴上的文字
        },
        xAxis: {
          type: 'value'
        },
        yAxis: {
          type: 'category'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'line',
            z: 0,
            lineStyle: {
              color: '#ff9cad'
            }
          }
        },
        series: [
          {
            type: 'bar',
            label: {
              show: true,
              position: 'right',
              textStyle: {
                color: '#ff9cad'
              }
            },
            itemStyle: {
              // 指明颜色渐变的方向
              // 指明不同百分比之下颜色的值
              color: new this.$echarts.graphic.LinearGradient(0, 0, 1, 0, [
                // 百分之0状态之下的颜色值
                {
                  offset: 0,
                  color: '#c553d7'
                },
                // 百分之100状态之下的颜色值
                {
                  offset: 1,
                  color: '#fbb787'
                }
              ])
            }
          }
        ]
      }
      this.chartInstance.setOption(initOption)
      // 对图表对象进行鼠标事件的监听
      this.chartInstance.on('mouseover', () => {
        clearInterval(this.timerId)
      })
      this.chartInstance.on('mouseout', () => {
        this.startInterval()
      })
    },
    // 获取服务器的数据
    async getData (ret) {
      // http://127.0.0.1:8888/api/seller
      // const { data: ret } = await this.$http.get('map1985')
      this.allData = ret
      // 对数据排序
      this.allData.sort((a, b) => {
        return a.value - b.value // 从小到大的排序
      })
      // 每8个元素显示一页
      this.totalPage = this.allData.length % 8 === 0 ? this.allData.length / 8 : this.allData.length / 8 + 1
      this.updateChart()
      // 启动定时器
      this.startInterval()
    },
    // 更新图表
    updateChart () {
      const start = (this.currentPage - 1) * 8
      const end = this.currentPage * 8
      const showData = this.allData.slice(start, end)
      const CountryNames = showData.map((item) => {
        return item.Country
      })
      const CountryRate = showData.map((item) => {
        return item.Rate
      })
      const dataOption = {
        yAxis: {
          data: CountryNames
        },
        series: [
          {
            data: CountryRate
          }
        ]
      }
      this.chartInstance.setOption(dataOption)
    },
    startInterval () {
      if (this.timerId) {
        clearInterval(this.timerId)
      }
      this.timerId = setInterval(() => {
        this.currentPage++
        if (this.currentPage > this.totalPage) {
          this.currentPage = 1
        }
        this.updateChart()
      }, 3000)
    },
    // 当浏览器的大小发生变化的时候, 会调用的方法, 来完成屏幕的适配
    screenAdapter () {
      console.log(this.$refs.master_ref.offsetWidth)
      const titleFontSize = this.$refs.master_ref.offsetWidth / 100 * 3.6
      // 和分辨率大小相关的配置项
      const adapterOption = {
        title: {
          textStyle: {
            fontSize: titleFontSize
          }
        },
        tooltip: {
          axisPointer: {
            lineStyle: {
              width: titleFontSize
            }
          }
        },
        series: [
          {
            barWidth: titleFontSize,
            itemStyle: {
              barBorderRadius: [0, titleFontSize / 2, titleFontSize / 2, 0]
            }
          }
        ]
      }
      this.chartInstance.setOption(adapterOption)
      // 手动的调用图表对象的resize 才能产生效果
      this.chartInstance.resize()
    }
  },
  computed: {
    ...mapState(['theme'])
  },
  watch: {
    theme () {
      console.log('主题切换了')
      this.chartInstance.dispose() // 销毁当前的图表
      this.initChart() // 重新以最新的主题名称初始化图表对象
      this.screenAdapter() // 完成屏幕的适配
      this.updateChart() // 更新图表的展示
    }
  }
}
</script>

<style lang="less" scoped>
</style>
