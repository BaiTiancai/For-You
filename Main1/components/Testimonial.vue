<template>
  <section class="testimonials-one">
    <div class="container">
      <div class="block-title text-center">
        <h2 class="block-title__title">各国 <span>抑郁症的严重程度与经济情况</span> <br> 随年份的变化</h2><!-- /.block-title__title -->
        <p><br><i class="fa fa-check"></i>    抑郁症在一个国家分布的严重程度用“因抑郁症进行残疾调整生命年（DALY）的人口数”这一指标来衡量。</p>
        <p><i class="fa fa-check"></i>    数据说明，抑郁症的严重程度与国家的发展水平并无直接关系，高GDP并不意味着低抑郁率，相反，收入增加带来的竞争压力的加大，反而会使抑郁症分布的严重程度上升。</p>
      </div><!-- /.block-title -->
      <div  class="com-container">
        <div class="com-chart" ref="lefexpect_ref"></div>
      </div>
    </div><!-- /.container -->
  </section>
</template>

<script>
import axios from 'axios'
    export default {
      name: "Testimonial",
      data () {
        return {
          chartInstance: null,
          allData: null
        }
      },
      mounted() {
        if ($('.testimonials-one__carousel').length) {
          $('.testimonials-one__carousel').owlCarousel({
            loop: true,
            margin: 0,
            nav: false,
            dots: false,
            autoWidth: false,
            autoplay: true,
            smartSpeed: 700,
            autoplayTimeout: 5000,
            autoplayHoverPause: true,
            items: 1
          });

          $('.testimonials-one__nav-left').on('click', function() {
            $('.testimonials-one__carousel').trigger('next.owl.carousel');
            return false;
          });
          $('.testimonials-one__nav-right').on('click', function() {
            $('.testimonials-one__carousel').trigger('prev.owl.carousel');
            return false;
          });
        }

        this.getData()
        // this.draw()
        window.addEventListener('resize', this.screenAdapter)
        this.screenAdapter()
      },
      destroyed () {
        window.removeEventListener('resize', this.screenAdapter)
      },
  methods: {
    async getData () {
      // 获取服务器的数据, 对this.allData进行赋值之后, 调用updateChart方法更新图表
      // const { data: ret } = await this.$http.get('pergdpsui')
      const { data: ret } = await axios.get('/pergdpsui.json')
      this.allData = ret
      console.log(this.allData)
      this.draw()
    },
    draw () {
      this.chartInstance = this.$echarts.init(this.$refs.lefexpect_ref, 'vintage')
      const data = this.allData
      console.log('===========')
      console.log(data)
      console.log(data.timeline)
      const itemStyle = {
        opacity: 0.8
      }
      const sizeFunction = function (x) {
        const y = Math.sqrt(x / 5e8) + 0.1
        return y * 80
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
          timeline: {
            axisType: 'category',
            orient: 'vertical',
            autoPlay: true,
            inverse: true,
            playInterval: 1000,
            left: null,
            right: 40,
            top: 20,
            bottom: '7%',
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
            text: 1990,
            textAlign: 'center',
            left: '63%',
            top: '55%',
            textStyle: {
              fontSize: 100,
              color: '#444444'
            }
          }, {
            text: '▎ 各国抑郁症的严重程度与经济情况关系演变',
            left: 0,
            top: '2%',
            textStyle: {
              fontWeight: 'normal',
              fontSize: 35,
              color: '#444444'
            }
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
            containLabel: true,
            left: '7%',
            right: '5%',
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
              fontSize: 18,
              color: '#444444'
            },
            splitLine: {
              show: false,
              color: '#444444'
            },
            axisLabel: {
              formatter: '{value} $',
              color: '#444444'
            }
          },
          yAxis: {
            type: 'value',
            name: '抑郁症人数',
            max: 5000000,
            nameTextStyle: {
              fontSize: 15,
              color: '#444444'
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
              symbolSize: function (val) {
                return sizeFunction(val[2])
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
            symbolSize: function (val) {
              return sizeFunction(val[2])
            }
          }
        })
      }
      this.chartInstance.setOption(option)
    },
    screenAdapter () {
      this.titleFontSize = this.$refs.lefexpect_ref.offsetWidth / 100 * 3.6
    }
  }
}
</script>

<style scoped>
.com-container {
  width: 100%;
  height: 700px;
  overflow: hidden;
}
.com-chart {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
</style>
