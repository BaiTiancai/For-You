<!-- 商家分布图表 -->
<template>
  <div class='com-container' @dblclick="revertMap">
    <div class='com-chart' ref='worldmap_ref'></div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import axios from 'axios'
import { getProvinceMapInfo } from '@/utils/map_utils'
import countryInfoList from '../mock/countryInfoList.json'
export default {
  data () {
    return {
      chartInstance: null,
      allData: null,
      mapData: {} // 所获取的省份的地图矢量数据
    }
  },
  created () {
    // 在组件创建完成之后 进行回调函数的注册
    this.$socket.registerCallBack('worldmapData', this.getData)
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
    this.$socket.unRegisterCallBack('worldmapData')
  },
  methods: {
    async initChart () {
      this.chartInstance = this.$echarts.init(this.$refs.worldmap_ref, 'vintage')
      const ret = await axios.get('http://localhost:8999/static/map/world.json')
      this.$echarts.registerMap('world', ret.data)
      const initOption = {
        title: {
          text: '▎世界各国抑郁症患者人数 (2022年)',
          top: 10,
          left: 10
        },
        backgroundColor: '#fff',
        geo: {
          type: 'map',
          map: 'world',
          // top: '20%',
          // bottom: '5%',
          // right: '3%',
          // left: '2%',
          itemStyle: {
            emphasis: {
              label: { show: true },
              areaColor: 'rgba(0, 0, 0, 1.0)'
            },
            areaColor: '#fff',
            borderColor: '#f1f1f1'
          }
        },
        legend: {
          bottom: '5%'
        },
        tooltip: {
          trigger: 'item',
          formatter: function (params) {
            console.log('parm', params)
            return (
              '国家：' + (params.data.name ? params.data.name : '') + '<br/>' + '抑郁症患者数: ' + (params.data.rate !== undefined ? params.data.rate : '')
            )
          },
          backgroundColor: '#dbdbdb', // 提示标签背景颜色
          textStyle: { color: '#000000' } // 提示标签字体颜色
        },
        visualMap: [
          {
            min: 100000,
            max: 2000000,
            text: ['大于200w', '小于10w'],
            // realtime: false,
            // calculable: true,
            inRange: {
                // color: ['lightskyblue', 'yellow', 'orangered']
                color: ['#d4e9f1','#fbe3b0','#fdad7b','#f6746b','#db396a','#ab0175']
            },
            seriesIndex: 3
        }
        ],
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
      console.log(this.allData)
      this.updateChart()
    },
    updateChart () {
      // 处理图表需要的数据
      // 图例的数据
      let seriesArr = [];

      const legendArr = this.allData.map(item => {
        return item.name
      })

      seriesArr = this.allData.map(item => {
        console.log(999, item.children)
        return {
          type: 'effectScatter',
          rippleEffect: {
            scale: 2.5,
            brushType: 'stroke',
          },
          symbolSize: 8,
          name: item.name,
          data: item.children,
          coordinateSystem: 'geo'
        }
      })

      // 热区配置
      const { hotList, hotNameMapList } = this.dealHotData(countryInfoList);
      seriesArr.push({
        type: 'map',
        mapType: 'world', // 自定义扩展图表类型
        data: hotList,
        // 自定义名称映射
        nameMap: hotNameMapList,
        showLegendSymbol: false
      })

      // 获取已有配置
      let options = this.chartInstance.getOption()
      // options.legend = {
      //   data: legendArr
      // }
      options.series = seriesArr

      this.chartInstance.setOption(options)
    },
    /**
     * 处理热区数据
     * 从全部地图数据中分离出热区所需要的数据
     * @param {*} data 
     */
    dealHotData (data) {
      const countryInfoData = {};
      const hotList = [];
      const hotNameMapList = {};

      // 处理数据以简称为key
      this.allData.map(item => {
        item.children.map(child => {
          countryInfoData[child.No] = child
        })
      })

      data.map(res => {
        let current = countryInfoData[res.country_code];
        // 热区需要显示的数据
        hotList.push({
          name: res.cn_name,
          value: current ? current.rate : 0,
          rate: current ? current.rate : 0
        })
        // 热区显示的名字映射
        hotNameMapList[res.en_name] = res.cn_name
      })

      return {
        hotList,
        hotNameMapList
      }
    },
    screenAdapter () {
      const titleFontSize = this.$refs.worldmap_ref.offsetWidth / 100 * 3.6
      const adapterOption = {
        title: {
          textStyle: {
            fontSize: titleFontSize / 2,
            color: '#7a64e5'
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

<style lang='less' scoped>
</style>
