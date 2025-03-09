<!-- 商家分布图表 -->
<template>
  <div class='com-container' @dblclick="revertMap">
    <div class='com-chart' ref='worldmap_ref'></div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import axios from 'axios'
  export default {
    name: "Worldmap",
    created () {
        if (this.$socket && this.$socket.registerCallBack) {
          this.$socket.registerCallBack('worldmapData', this.getData)
        }
      },
      mounted () {
        this.initChart()
        // this.getData()
        this.$socket.send({
          action: 'getData',
          socketType: 'worldmapData',
          chartName: 'worldmap',
          value: ''
        })
        window.addEventListener('resize', this.screenAdapter)
        this.screenAdapter()
      },
      destroyed () {
        window.removeEventListener('resize', this.screenAdapter)
      },
      methods: {
        async initChart () {
          this.chartInstance = this.$echarts.init(this.$refs.worldmap_ref, 'vintage_vue')
          const ret = await axios.get('/map/world.json')
          this.$echarts.registerMap('world', ret.data)
          const initOption = {
            title: {
              text: '▎ 世界各国自杀率 (2019)',
              eft: 20,
              top: 20
            },
            geo: {
              type: 'map',
              map: 'world',
              top: '20%',
              bottom: '5%',
              right: '3%',
              left: '2%',
              itemStyle: {
                emphasis: {
                  label: { show: true },
                  areaColor: 'rgba(255, 126, 197, 1.0)'
                },
                areaColor: '#ffb28d',
                borderColor: '#333'
              }
            },
            legend: {
              left: '5%',
              bottom: '5%',
              orient: 'vertical'
            },
            tooltip: {
              formatter: function (params) {
                // console.log('parm', params.data)
                return (
                  '国家：' + (params.data.name ? params.data.name : '') + '<br/>' + '自杀率: ' + (params.data.rate ? params.data.rate : '')
                )
              },
              backgroundColor: '#dbdbdb', // 提示标签背景颜色
              textStyle: { color: '#000000' } // 提示标签字体颜色
            }
          }
          this.chartInstance.setOption(initOption)
          this.chartInstance.on('click', async arg => {
            // arg.name 得到所点击的国家名字
            const countryInfo = getProvinceMapInfo(arg.No)
            console.log(countryInfo)
            // 需要获取这个国家的地图矢量数据
            // 判断当前所点击的这个国家的地图矢量数据在mapData中是否存在
            if (!this.mapData[countryInfo.key]) {
              const ret = await axios.get('http://localhost:9999' + countryInfo.path)
              this.mapData[countryInfo.key] = getProvinceMapInfo(ret.data)
              this.$echarts.registerMap(countryInfo.key, ret.data)
            }
            const changeOption = {
              geo: {
                map: countryInfo.key
              }
            }
            this.chartInstance.setOption(changeOption)
          })
        },
        getData (ret) {
          // 获取服务器的数据, 对this.allData进行赋值之后, 调用updateChart方法更新图表
          // const { data: ret } = await this.$http.get('worldMap')
          this.allData = ret
          console.log(this.allData, 'alldatA')
          this.updateChart()
        },
        updateChart () {
          // 处理图表需要的数据
          // 图例的数据
          const legendArr = this.allData.map(item => {
            return item.name
          })
          const seriesArr = this.allData.map(item => {
            return {
              type: 'effectScatter',
              rippleEffect: {
                scale: 5,
                brushType: 'stroke'
              },
              name: item.name,
              data: item.children,
              coordinateSystem: 'geo'
            }
          })
          const dataOption = {
            legend: {
              data: legendArr
            },
            series: seriesArr
          }
          this.chartInstance.setOption(dataOption)
        },
        screenAdapter () {
          const titleFontSize = this.$refs.worldmap_ref.offsetWidth / 100 * 3.6
          const adapterOption = {
            title: {
              textStyle: {
                fontSize: titleFontSize
              }
            },
            legend: {
              itemWidth: titleFontSize / 2,
              itemHeight: titleFontSize / 2,
              itemGap: titleFontSize / 2,
              textStyle: {
                fontSize: titleFontSize / 2
              }
            }
          }
          this.chartInstance.setOption(adapterOption)
          this.chartInstance.resize()
        },
        // 回到世界地图
        revertMap () {
          const revertOption = {
            geo: {
              map: 'world'
            }
          }
          this.chartInstance.setOption(revertOption)
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

<style scoped>
.com-container {
  width: 100%;
  height: 800px;
  overflow: hidden;
}
.com-chart {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
</style>
