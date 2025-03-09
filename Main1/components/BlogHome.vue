<template>
  <section class="blog-one blog-one__home thm-gray-bg" id="news">
    <div class="container">
      <div class="block-title text-center">
        <h2 class="block-title__title">分析不同国家 <span>按职业类型和内部性别</span> <br> 划分的抑郁症患者占比</h2><!-- /.block-title__title -->
      </div><!-- /.block-title -->
      <div class="text1">
        <p><i class="fa fa-check"></i>    在不同的国家中，抑郁症患者群体都呈现低龄化、年轻化的趋势，当代年轻 <br> 人的心理状态和精神困境问题越发严重，学生群体成为抑郁症的高发群体。同 <br> 时呈现出女性患病率大于男性的趋势。 </p>
        <p><i class="fa fa-check"></i>    在不同的职业类型当中，从事金融、IT等行业的人群更容易患抑郁症，可能 <br> 是由于这些行业的竞争压力大，“内卷”程度高，员工的工作压力较大。</p>
        <p><i class="fa fa-check"></i>    抑郁症患者的数量与其从事的工作是否高收入之间并无直接的联系，高收入 <br> 并不意味着低抑郁率和高幸福感。</p>
      </div>
      <div class="com-container">
        <div class="com-chart" ref="country_ref"></div>
        <span class="iconfont arr_left" @click="toLeft" :style="comStyle">&#xe6ef;</span>
        <span class="iconfont arr_right" @click="toRight" :style="comStyle">&#xe6ed;</span>
        <span class="cat_name" :style="comStyle">{{ catName }}</span>
      </div>
    </div><!-- /.container -->
  </section>
</template>

<script>
import { mapState } from 'vuex'
import { getThemeValue } from '~/utils/theme_utils'
    export default {
      name: "BlogHome",
      data () {
        return {
          chartInstance: null,
          allData: null,
          currentIndex: 0, // 当前所展示出的一级分类数据
          titleFontSize: 0
        }
      },
      created () {
        // 在组件创建完成之后 进行回调函数的注册
        if (this.$socket && this.$socket.registerCallBack) {
          this.$socket.registerCallBack('countryData', this.getData)
        }
      },
      computed: {
        catName () {
          if (!this.allData) {
            return ''
          } else {
            return this.allData[this.currentIndex].name
          }
        },
        comStyle () {
          return {
            fontSize: this.titleFontSize + 'px',
            color: getThemeValue(this.theme).titleColor
          }
        },
        ...mapState(['theme'])
      },
      mounted () {
        this.initChart()
        // this.getData()
        this.$socket.send({
          action: 'getData',
          socketType: 'countryData',
          chartName: 'country',
          value: ''
        })
        window.addEventListener('resize', this.screenAdapter)
        this.screenAdapter()
      },
      // 组件销毁时取消监听
      destroyed () {
        window.removeEventListener('resize', this.screenAdapter)
        this.$socket.unRegisterCallBack('countryData')
      },
      methods: {
        initChart () {
          this.chartInstance = this.$echarts.init(this.$refs.country_ref, 'chalk')
          // 指定图表的配置项和数据
          const initOption = {
            title: {
              text: '▎ 各国不同年龄的抑郁症患者占比',
              textStyle: { color: '#000000' },
              left: 20,
              top: 20,
            },
            legend: {
              top: '10%',
              icon: 'circle'
            },
            tooltip: {
              show: true,
              formatter: arg => {
                const thirdCategory = arg.data.children
                // 计算出所有三级分类的数值总和
                let total = 0
                thirdCategory.forEach(item => {
                  total += item.value
                })
                let retStr = ''
                thirdCategory.forEach(item => {
                  retStr += `
                  ${item.name}:${parseInt(item.value / total * 100) + '%'}
                  <br/>
                  `
                })
                return retStr
              }
            },
            series: [
              {
                name: '面积模式',
                type: 'pie',
                roseType: 'radius',
                label: {
                  show: true
                },
                emphasis: {
                  label: {
                    show: true
                  },
                  labelLine: {
                    show: true
                  }
                },
                itemStyle: {
                  borderRadius: 8
                }
              }
            ]
          }
          this.chartInstance.setOption(initOption)
        },
        getData (ret) {
          // 获取服务器的数据, 对this.allData进行赋值之后, 调用updateChart方法更新图表
          // const { data: ret } = await this.$http.get('country')
          this.allData = ret
          console.log(this.allData)
          this.updateChart()
        },
        updateChart () {
          // 处理图表需要的数据
          const legendData = this.allData[this.currentIndex].children.map(item => {
            return item.name
          })
          const seriesData = this.allData[this.currentIndex].children.map(item => {
            return {
              name: item.name,
              value: item.value,
              children: item.children
            }
          })
          const dataOption = {
            legend: {
              data: legendData
            },
            series: [{
              data: seriesData
            }]
          }
          this.chartInstance.setOption(dataOption)
        },
        // 当浏览器的大小发生变化的时候, 会调用的方法, 来完成屏幕的适配
        screenAdapter () {
          this.titleFontSize = this.$refs.country_ref.offsetWidth / 100 * 3.6
          const adapterOption = {
            title: {
              textStyle: {
                fontSize: this.titleFontSize / 1.5
              }
            },
            legend: {
              itemWidth: this.titleFontSize / 2,
              itemHeight: this.titleFontSize / 2,
              itemGap: this.titleFontSize / 2,
              textStyle: {
                fontSize: this.titleFontSize / 2
              }
            },
            series: [
              {
                radius: this.titleFontSize * 4.5,
                center: ['50%', '60%']
              }
            ]
          }
          this.chartInstance.setOption(adapterOption)
          this.chartInstance.resize()
        },
        toLeft () {
          this.currentIndex--
          if (this.currentIndex < 0) {
            this.currentIndex = this.allData.length - 1
          }
          this.updateChart()
        },
        toRight () {
          this.currentIndex++
          if (this.currentIndex > this.allData.length - 1) {
            this.currentIndex = 0
          }
          this.updateChart()
        }
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
  position: relative;
}
.com-chart {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.arr_left {
  position: absolute;
  left: 10%;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  color: white;
}
.arr_right {
  position: absolute;
  right: 10%;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  color: white;
}
.text1 {
  margin-left: 25%;
}
.cat_name {
  position: absolute;
  left: 80%;
  bottom: 10%;
  font-weight: bold;
  color: white;
}
</style>
