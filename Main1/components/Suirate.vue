<template>
  <div class="com-container">
    <div class="title" :style="comStyle">
      <span>{{ '▎ ' +  showTitle }}</span>
      <span class="iconfont title-icon" :style="comStyle"  @click="showChoice = !showChoice">&#xe6eb;</span>
      <div class="select-con" v-show="showChoice" :style="marginStyle">
        <div class="select-item" v-for="item in selectTypes" :key="item.key" @click="handleSelect(item.key)">
          {{ item.text }}
        </div>
      </div>
    </div>
    <div class="com-chart" ref="suirate_ref"></div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: "Suirate",
  data() {
    return {
      chartInstane: null,
      allData: null, // 从服务器中获取的所有数据
      showChoice: false, // 是否显示可选项
      choiceType: 'suirate', // 显示的数据类型
      titleFontSize: 0 // 指明标题的字体大小
    }
  },
  created () {
    // 在组件创建完成之后 进行回调函数的注册
    if (this.$socket && this.$socket.registerCallBack) {
      this.$socket.registerCallBack('suirateData', this.getData)
    }
  },
  mounted () {
    function toggleTabWithSwitch() {
        var toggleSwitch = $('#switch-toggle-tab label.switch');
        var monthTabTitle = $('#switch-toggle-tab li.month');
        var yearTabTitle = $('#switch-toggle-tab li.year');
        var monthTabContent = $('#month');
        var yearTabContent = $('#year');
        // hidden show deafult;
        monthTabContent.fadeIn();
        yearTabContent.fadeOut();
    
        function toggleHandle() {
          if (toggleSwitch.hasClass('on')) {
            yearTabContent.fadeOut();
            monthTabContent.fadeIn();
            monthTabTitle.addClass('active');
            yearTabTitle.removeClass('active');
          } else {
            monthTabContent.fadeOut();
            yearTabContent.fadeIn();
            yearTabTitle.addClass('active');
            monthTabTitle.removeClass('active');
          }
        };
        monthTabTitle.on('click', function() {
          toggleSwitch.addClass('on').removeClass('off');
          toggleHandle();
          return false;
        });
        yearTabTitle.on('click', function() {
          toggleSwitch.addClass('off').removeClass('on');
          toggleHandle();
          return false;
        });
        toggleSwitch.on('click', function() {
          toggleSwitch.toggleClass('on off');
          toggleHandle();
        });
    
      }
      toggleTabWithSwitch();
    
      this.initChart()
      // this.getData()
      this.$socket.send({
        action: 'getData',
        socketType: 'suirateData',
        chartName: 'suirate',
        value: ''
      })
      window.addEventListener('resize', this.screenAdapter)
      this.screenAdapter()
    },
  destroyed () {
    window.removeEventListener('resize', this.screenAdapter)
  },
  computed: {
    selectTypes () {
      if (!this.allData) {
        return []
      } else {
        return this.allData.types.filter(item => {
          return item.key !== this.choiceType
        })
      }
    },
    showTitle () {
      if (!this.allData) {
        return ''
      } else {
        return this.allData[this.choiceType].title
      }
    },
    // 设置给标题的样式
    comStyle () {
      return {
        fontSize: 20,
        color: '#444444'
      }
    },
    marginStyle () {
      return {
        marginLeft: this.titleFontSize + 'px'
      }
    },
    ...mapState(['theme'])
  },
  methods: {
    initChart () {
      this.chartInstane = this.$echarts.init(this.$refs.suirate_ref, 'vintage_vue')
      const initOption = {
        grid: {
          left: '3%',
          top: '35%',
          right: '4%',
          bottom: '4%',
          containLabel: true
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          left: 20,
          top: '15%',
          icon: 'circle'
        },
        xAxis: {
          type: 'category',
          boundaryGap: false
        },
        yAxis: {
          type: 'value'
        },
        notMerge: true
      }
      this.chartInstane.setOption(initOption)
    },
    getData (ret) {
      // await this.$http.get()
      // 对allData进行赋值
      // const { data: ret } = await this.$http.get('suirate')
      this.allData = ret
      console.log(this.allData)
      this.updateChart()
    },
    updateChart () {
      // 半透明的颜色值
      const colorArr1 = [
        'rgba(245, 108, 223, 0.5)',
        'rgba(182, 162, 222, 0.5)',
        'rgba(195, 96, 217, 0.5)',
        'rgba(135, 82, 216, 0.5)',
        'rgba(47, 62, 212, 0.5)',
        'rgba(104, 185, 185, 0.5)'
      ]
      // 全透明的颜色值
      const colorArr2 = [
        'rgba(245, 108, 223, 1.0)',
        'rgba(182, 162, 222, 1.0)',
        'rgba(195, 96, 217, 1.0)',
        'rgba(135, 82, 216, 1.0)',
        'rgba(47, 62, 212, 1.0)',
        'rgba(104, 185, 185, 1.0)'
      ]
      // 处理数据
      // 类目轴的数据
      const timeArr = this.allData.common.year
      // y轴的数据 series下的数据
      const valueArr = this.allData[this.choiceType].data
      const seriesArr = valueArr.map((item, index) => {
        return {
          name: item.name,
          type: 'line',
          data: item.data,
          stack: this.choiceType,
          // 颜色填充
          areaStyle: {
            // 渐变颜色  LinearGradient(x1, y1, x2, y2, [])指定方向由(x1,y1)->(x2,y2) []表示不同区域颜色
            color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: colorArr1[index]
              }, // %0的颜色值
              {
                offset: 1,
                color: colorArr2[index]
              } // 100%的颜色值
            ])
          }
        }
      })
      // 图例的数据
      const legendArr = valueArr.map(item => {
        return item.name
      })
      const dataOption = {
        xAxis: {
          data: timeArr
        },
        legend: {
          data: legendArr
        },
        series: seriesArr
      }
      this.chartInstane.setOption(dataOption)
    },
    screenAdapter () {
      this.titleFontSize = this.$refs.suirate_ref.offsetWidth / 100 * 3.6
      const adapterOption = {
        legend: {
          itemWidth: this.titleFontSize,
          itemHeight: this.titleFontSize,
          itemGap: this.titleFontSize,
          textStyle: {
            fontSize: this.titleFontSize / 2,
            color: '#444444'
          }
        }
      }
      this.chartInstane.setOption(adapterOption)
      this.chartInstane.resize()
    },
    handleSelect (currentType) {
      this.choiceType = currentType
      this.updateChart()
      this.showChoice = false
    }
  },
  watch: {
    theme () {
      console.log('主题切换了')
      this.chartInstane.dispose() // 销毁当前的图表
      this.initChart() // 重新以最新的主题名称初始化图表对象
      this.screenAdapter() // 完成屏幕的适配
      this.updateChart() // 更新图表的展示
    }
  }
}
</script>

<style scoped>
.title {
  position: absolute;
  left: 20px;
  top: 20px;
  z-index: 10;
  color: white;
}
.title .title-icon {
  margin-left: 10px;
  cursor: pointer;
}
.title .select-con {
  background-color: #e5e6e7;
  margin-top: 15px
}
.com-container {
  width: 100%;
  height: 900px;
  overflow: hidden;
}
.com-chart {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
</style>
