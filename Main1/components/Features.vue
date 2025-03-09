<template>
  <section class="service-one" id="features">
    <div class="container">
      <div class="block-title text-center">
        <h2 class="block-title__title">2022年 <span>全球抑郁症患者数量</span> 分布数据</h2><!-- /.block-title__title -->
      </div><!-- /.block-title -->
      <div class="text1">
        <p><i class="fa fa-check"></i>    总体上，全球抑郁症患者数量庞大，已经达到3.5亿人；</p>
        <p><i class="fa fa-check"></i>    横向比较，相比于发达国家，发展中国家的抑郁症人数更多；</p>
        <p><i class="fa fa-check"></i>    中国成为世界上抑郁症患者群体最庞大的国家，截止统计为止，已经达到9500万人。</p>
      </div>
      <div class='com-container' @dblclick="revertMap">
        <div class='com-chart' ref='worldmap_ref'></div>
      </div>
    </div><!-- /.container -->
  </section>
</template>

<script>
import { mapState } from 'vuex'
import axios from 'axios'
import countryInfoList from '../mock/countryInfoList.json'
    export default {
      name: "Featires",
      created () {
        // 在组件创建完成之后 进行回调函数的注册
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
          this.chartInstance = this.$echarts.init(this.$refs.worldmap_ref, 'hello')
          const ret = await axios.get('/map/world.json')
          this.$echarts.registerMap('world', ret.data)

          const initOption = {
            title: {
              text: '▎ 全球抑郁症患者数量 (2022)',
              left: 20,
              top: 20
            },
            geo: {        //地理坐标系的配置
              type: 'map',
              map: 'world',
              zoom: 1.3,
              itemStyle: {
                emphasis: {
                  label: { show: true },
                  areaColor: 'rgba(255, 126, 197, 1.0)'
                },
                areaColor: '#ffb28d',
                borderColor: '#333'
              }
            },
            visualMap: [      //视觉映射
              {
                min: 100000,
                max: 2000000,
                itemHeight:160,
                text: ['大于200w', '小于10w'],
                inRange: {
                    //世界地图左下角的方框条，颜色由左到右逐渐加深
                    color: ['#d4e9f1','#fbe3b0','#fdad7b','#f6746b','#db396a','#ab0175'],
                    //symbolSize: [1000, 96000000]
                }, 
                seriesIndex: 3
            }
            ],
            legend: {       //图例的位置
              bottom: '5%'
            },
            tooltip: {        //提示框（tooltip）的格式
              formatter: function (params) {
                // console.log('parm', params.data)
                return (
                  '国家：' + (params.data.name ? params.data.name : '') + '<br/>' + '抑郁患者人数: ' + (params.data.rate ? params.data.rate : '')
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
            /*接下来的代码逻辑主要是判断所点击的国家的地图数据是否已经存在，
            如果不存在，则通过异步请求获取该国家的地图数据，并将数据注册为该国家的地图类型。最后，将地图类型更改为所点击国家的地图。*/
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
          setTimeout(() => {
            this.updateHotChart()
          }, 800)
        },
        updateHotChart () {
          let options = this.chartInstance.getOption()
          console.log(88888, options.series)
          if (!options.series.length) return

          const { hotList, hotNameMapList } = this.dealHotData(countryInfoList);
          options.series = [...options.series, {
            type: 'map',
            map: 'world',
            mapType: 'world', // 自定义扩展图表类型
            data: hotList,
            zoom: 1.3,
            // 自定义名称映射
            nameMap: hotNameMapList,
            showLegendSymbol: false,
          }]
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
          // const titleFontSize = this.$refs.worldmap_ref.offsetWidth / 100 * 3.6
          // const adapterOption = {
          //   title: {
          //     textStyle: {
          //       fontSize: titleFontSize
          //     }
          //   },
          //   legend: {
          //     itemWidth: titleFontSize / 2,
          //     itemHeight: titleFontSize / 2,
          //     itemGap: titleFontSize / 2,
          //     textStyle: {
          //       fontSize: titleFontSize / 2
          //     }
          //   }
          // }
          // this.chartInstance.setOption(adapterOption)
          // this.chartInstance.resize()
        },
        // 回到世界地图
        revertMap () {
        //   const revertOption = {
        //     geo: {
        //       map: 'world'
        //     }
        //   }
        //   this.chartInstance.setOption(revertOption)
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
.text1 {
  margin-left: 25%;
}
</style>
