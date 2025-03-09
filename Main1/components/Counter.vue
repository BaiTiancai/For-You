<template>
  <section class="fact-one" id="Counter">
    <div class="container">
      <div class="block-title text-center">
        <h2 class="block-title__title"><span>抑郁症的成因分析</span></h2><!-- /.block-title__title -->
      </div><!-- /.block-title -->
      <div class="text1">
        <p><i class="fa fa-check"></i>    研究发现，抑郁症与遗传有一定的关系，家族中有抑郁症患者的人，其患 <br> 病风险相对较高。抑郁症的形成与心理因素有关，压力与情绪困扰、敏感内 <br> 向的个性特质、对自己要求过高、过分在意他人评价等也可能增加抑郁的风险。</p>
        <p><i class="fa fa-check"></i>    社会环境的影响，重大的生活事件、人际关系的紧张、低经济收入、文化 <br> 冲突、社会不公等都可能成为抑郁症的诱因。</p>
        <p><i class="fa fa-check"></i>    不良的童年经历，如双亲丧亡、缺乏关爱、虐待、长期封闭环境等，可能 <br> 对个体的心理健康产生长远影响，增加成年后患抑郁症的风险。</p>
      </div>
      <div class='com-container'>
        <div class='com-chart' ref='stock_ref'></div>
      </div>
    </div><!-- /.container -->
  </section>
</template>

<script>
import { mapState } from 'vuex'
    export default {
      name: "Counter",
      data () {
        return {
          chartInstance: null,
          allData: null,
          currentIndex: 0, // 当前显示的数据
          timerId: null // 定时器的标识
        }
      },
      created () {
        // 在组件创建完成之后 进行回调函数的注册
        if (this.$socket && this.$socket.registerCallBack) {
          this.$socket.registerCallBack('stockData', this.getData)
        }
      },
      mounted() {
        if ($('.counter').length) {
          $('.counter').counterUp({
            delay: 10,
            time: 3000
          });
        }
        this.initChart()
        // this.getData()
        this.$socket.send({
          action: 'getData',
          socketType: 'stockData',
          chartName: 'stock',
          value: ''
        })
        window.addEventListener('resize', this.screenAdapter)
        this.screenAdapter()
      },
      destroyed () {
        window.removeEventListener('resize', this.screenAdapter)
        clearInterval(this.timerId)
        this.$socket.unRegisterCallBack('stockData')
      },
      methods: {
        initChart () {
          this.chartInstance = this.$echarts.init(this.$refs.stock_ref, 'vintage')
          const initOption = {
            title: {
              text: '▎成因分析',
              left: 20,
              top: 20
            }
          }
          this.chartInstance.setOption(initOption)
          this.chartInstance.on('mouseover', () => {
            clearInterval(this.timerId)
          })
          this.chartInstance.on('mouseout', () => {
            this.startInterval()
          })
        },
        getData (ret) {
          // 获取服务器的数据, 对this.allData进行赋值之后, 调用updateChart方法更新图表
          // const { data: ret } = await this.$http.get('stock')
          this.allData = ret
          console.log(this.allData)
          this.updateChart()
          this.startInterval()
        },
        updateChart () {
          const centerArr = [
            ['18%', '50%'],
            ['50%', '50%'],
            ['82%', '50%'],
            ['34%', '75%'],
            ['66%', '75%']
          ]
          const colorArr = [
            ['#f56cdf', '#bc4ed4'],
            ['#4aafe7', '#51add2'],
            ['#fa88c3', '#ffb08c'],
            ['#5052EE', '#AB6EE5'],
            ['#23E5E5', '#2E72BF']
          ]
          // 处理图表需要的数据
          const start = this.currentIndex * 3
          const end = (this.currentIndex + 1) * 3
          const showData = this.allData.slice(start, end)
          const seriesArr = showData.map((item, index) => {
            return {
              type: 'pie',
              center: centerArr[index],
              hoverAnimation: false, // 关闭鼠标移入到饼图时的动画效果
              labelLine: {
                show: false // 隐藏指示线
              },
              label: {
                normal: {
                  position: 'center',
                  show: false,
              },
              },
              data: [
                {
                  name: item.name + '\n\n' + item.sales + '%',
                  value: item.sales,
                  label: {show: true, color: colorArr[index][0]},
                  itemStyle: {
                    color: new this.$echarts.graphic.LinearGradient(0, 1, 0, 0, [
                      {
                        offset: 0,
                        color: colorArr[index][0]
                      },
                      {
                        offset: 1,
                        color: colorArr[index][1]
                      }
                    ])
                  }
                },
                {
                  value: item.stock,
                  itemStyle: {
                    color: '#333843'
                  }
                }
              ]
            }
          })
          const dataOption = {
            series: seriesArr
          }
          this.chartInstance.setOption(dataOption)
        },
        screenAdapter () {
          const titleFontSize = this.$refs.stock_ref.offsetWidth / 100 * 3.6
          const innerRadius = titleFontSize * 2.8
          const outterRadius = innerRadius * 1.125
          const adapterOption = {
            title: {
              textStyle: {
                fontSize: titleFontSize
              }
            },
            series: [
              {
                type: 'pie',
                radius: [outterRadius, innerRadius],
                label: {
                  fontSize: titleFontSize / 2
                }
              },
              {
                type: 'pie',
                radius: [outterRadius, innerRadius],
                label: {
                  fontSize: titleFontSize / 2
                }
              },
              {
                type: 'pie',
                radius: [outterRadius, innerRadius],
                label: {
                  fontSize: titleFontSize / 2
                }
              },
              {
                type: 'pie',
                radius: [outterRadius, innerRadius],
                label: {
                  fontSize: titleFontSize / 2
                }
              },
              {
                type: 'pie',
                radius: [outterRadius, innerRadius],
                label: {
                  fontSize: titleFontSize / 2
                }
              }
            ]
          }
          this.chartInstance.setOption(adapterOption)
          this.chartInstance.resize()
        },
        startInterval () {
          if (this.timerId) {
            clearInterval(this.timerId)
          }
          this.timerId = setInterval(() => {
            this.currentIndex++
            if (this.currentIndex > 3) {
              this.currentIndex = 0
            }
            this.updateChart() // 在更改完currentIndex之后 , 需要更新界面
          }, 2500)
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
