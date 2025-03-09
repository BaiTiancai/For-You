<template>
  <div class="screen-container" :style="containerStyle">
    <header class="screen-header">
      <div class="screen-header-title">
        <h1>抑郁症数据可视化</h1>
        <span>Visualization analysisof global depression rates</span>
      </div>
      <div class="title-right">
        <img :src="themeSrc" class="qiehuan" @click="handleChangeTheme">
      </div>
    </header>
    <div class="screen-body">
      <section class="screen-middle">
        <div id="middle-top" :class="[fullScreenStatus.worldmap ? 'fullscreen' : '']">
          <!-- 各国自杀率 -->
          <Worldmap ref="worldmap"></Worldmap>
          <div class="resize">
            <!-- icon-compress-alt -->
            <span @click="changeSize('worldmap')"  :class="['iconfont', fullScreenStatus.worldmap ? 'icon-compress-alt' : 'icon-expand-alt']"></span>
          </div>
        </div>
         <div id="right-bottom" class="screen-left-factor" :class="[fullScreenStatus.stock ? 'fullscreen' : '']">
          <!-- 库存销量分析图表 -->
          <Stock ref="stock"></Stock>
          <div class="resize">
            <!-- icon-compress-alt -->
            <span @click="changeSize('stock')"  :class="['iconfont', fullScreenStatus.stock ? 'icon-compress-alt' : 'icon-expand-alt']"></span>
          </div>
        </div>
      </section>
      <div class="screen-box">
        <div class="screen-box-tab">
          <ul>
            <li :class="[!tabActive ? 'active' : '']" @click="onTabChange(0)">Ⅰ</li>
            <li :class="[tabActive ? 'active' : '']" @click="onTabChange(1)">Ⅱ</li>
          </ul>
        </div>
        <section class="screen-left" v-if="!tabActive">
          <div id="left-top" :class="[fullScreenStatus.suirate ? 'fullscreen' : '']">
            <!-- 2009年各国自杀率表 -->
            <Suirate ref="suirate"></Suirate>
            <div class="resize">
              <!-- icon-compress-alt -->
              <span @click="changeSize('suirate')" :class="['iconfont', fullScreenStatus.suirate ? 'icon-compress-alt' : 'icon-expand-alt']"></span>
            </div>
          </div>
          <div id="middle-bottom" :class="[fullScreenStatus.gdpsui ? 'fullscreen' : '']">
            <!-- 地区自杀数据 -->
            <Gdpsui ref="gdpsui"></Gdpsui>
            <div class="resize">
              <!-- icon-compress-alt -->
              <span @click="changeSize('gdpsui')"  :class="['iconfont', fullScreenStatus.gdpsui ? 'icon-compress-alt' : 'icon-expand-alt']"></span>
            </div>
          </div>
        </section>
        <section class="screen-right" v-else>
          <div id="right-top" class="screen-left-age" :class="[fullScreenStatus.country ? 'fullscreen' : '']">
            <!-- 热销商品占比图表 -->
            <Country ref="country"></Country>
            <div class="resize">
              <!-- icon-compress-alt -->
              <span @click="changeSize('country')"  :class="['iconfont', fullScreenStatus.country ? 'icon-compress-alt' : 'icon-expand-alt']"></span>
            </div>
          </div>
          <!-- 排行榜  -->
          <div id="left-bottom" :class="[fullScreenStatus.dynamicbar ? 'fullscreen' : '']">
            <!-- 1985年世界自杀率图表 -->
            <Dynamicbar ref="dynamicbar"></Dynamicbar>
            <div class="resize">
              <!-- icon-compress-alt -->
              <span @click="changeSize('dynamicbar')"  :class="['iconfont', fullScreenStatus.dynamicbar ? 'icon-compress-alt' : 'icon-expand-alt']"></span>
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
import Country from '@/components/Country.vue'
import Worldmap from '@/components/Worldmap.vue'
import Suirate from '@/components/Suirate.vue'
import Stock from '@/components/Stock.vue'
import Dynamicbar from '@/components/Dynamicbar.vue'
import Gdpsui from '@/components/Gdpsui.vue'
import { mapState } from 'vuex'
import { getThemeValue } from '@/utils/theme_utils'
export default {
  created () {
    // 注册接收到数据的回调函数
    this.$socket.registerCallBack('fullScreen', this.recvData)
    this.$socket.registerCallBack('themeChange', this.recvThemeChange)
  },
  destroyed () {
    this.$socket.unRegisterCallBack('fullScreen')
    this.$socket.unRegisterCallBack('themeChange')
  },
  data () {
    return {
      // 定义每一个图表的全屏状态
      fullScreenStatus: {
        dynamicbar: false,
        suirate: false,
        worldmap: false,
        country: false,
        stock: false,
        gdpsui: false,
        dynamicbarpage:false
      },
      tabActive: 0
    }
  },
  methods: {
    onTabChange (active) {
      this.tabActive = active
    },
    changeSize (chartName) {
      //dynamicbarpage
      // if(chartName === 'dynamicbar'){
      //   this.$nextTick(() => {
      //     this.$refs.dynamicbarpage.screenAdapter()
      //     return
      //   })
      // }
      // 1.改变fullScreenStatus的数据
      // this.fullScreenStatus[chartName] = !this.fullScreenStatus[chartName]
      // 2.需要调用每一个图表组件的screenAdapter的方法
      // this.$refs[chartName].screenAdapter()
      // this.$nextTick(() => {
      //   this.$refs[chartName].screenAdapter()
      // })
      // 将数据发送给服务端
      const targetValue = !this.fullScreenStatus[chartName]
      if(this.$refs[chartName].setEchartsData){
        this.$refs[chartName].setEchartsData(false);
      }
      this.$socket.send({
        action: 'fullScreen',
        socketType: 'fullScreen',
        chartName: chartName,
        value: targetValue
      })
    },
    // 接收到全屏数据之后的处理
    recvData (data) {
      // 取出是哪一个图表需要进行切换
      const chartName = data.chartName
      // 取出, 切换成什么状态
      const targetValue = data.value
      this.fullScreenStatus[chartName] = targetValue
      console.log(chartName)
      this.$nextTick(() => {
        if(chartName === 'gdpsui' && targetValue){
          this.$refs[chartName].setEchartsData(targetValue);
        }
        if(chartName === 'dynamicbar'){
          this.$refs[chartName].setEchartsData(true);
        }
        this.$refs[chartName].screenAdapter()
      })
    },
    handleChangeTheme () {
      // 修改VueX中数据
      // this.$store.commit('changeTheme')
      this.$socket.send({
        action: 'themeChange',
        socketType: 'themeChange',
        chartName: '',
        value: ''
      })
    },
    recvThemeChange () {
      this.$store.commit('changeTheme')
    }
  },
  components: {
    Country,
    Worldmap,
    Suirate,
    Stock,
    Dynamicbar,
    Gdpsui
  },
  computed: {
    headerSrc () {
      return '/static/img/' + getThemeValue(this.theme).headerBorderSrc
    },
    themeSrc () {
      return '/static/img/' + getThemeValue(this.theme).themeSrc
    },
    containerStyle () {
      return {
        backgroundColor: getThemeValue(this.theme).backgroundColor,
        color: '#444444'
      }
    },
    ...mapState(['theme'])
  }
}
</script>
<style lang="less" scoped>
@backColor: #f7f8fd;
@mainColor: #7a64e5;
@areaShadow: 1px 2px 5px 2px #ebe5f5;

// 全屏样式的定义
.fullscreen {
  position: fixed!important;
  top: 0 !important;
  left: 0 !important;
  width: 100% !important;
  height: 100% !important;
  margin: 0 !important;
  z-index: 100;
  background-color: #dadada;
}

.screen-container {
  width: 100%;
  height: 100%;
  // padding: 0 20px;
  background-color: @backColor!important;
  // color: #e8e8ea;
  box-sizing: border-box;
}
.screen-header {
  background-color: @backColor;
  width: 100%;
  height: 64px;
  font-size: 20px;
  position: relative;
  &-title {
    padding: 10px 0;
    text-align: center;
    color: #444444;
    padding-left: 20px;
    h1 {
      font-size: 20px;
      line-height: 26px;
      margin: 0;
      padding: 0;
    }
    span {
      display: block;
      font-size: 14px;
    }
  }
  > div {
      img {
        width: 100%;
      }
    }
  .title {
    position: absolute;
    left: 50%;
    top: 20%;
    font-size: 30px;
    transform: translate(-50%, -50%);
    color: #444444;
  }
  .title-min {
    position: absolute;
    left: 50%;
    top:70%;
    font-size: 14px;
    transform: translate(-50%, -50%);
    color: #444444;
  }
  .title-left {
    position: absolute;
    margin-left: 2%;
    left: 7%;
    top:50%;
    font-size: 15px;
    transform: translate(-50%, -50%);
    color: #444444;
  }
  .title-right {
    display: flex;
    align-items: center;
    position:absolute;
    right: 0px;
    top: 50%;
    transform: translateY(-80%);
    color: #444444;
  }
  .qiehuan {
    width: 28px;
    height: 21px;
    cursor: pointer;
  }
  .datetime {
    font-size: 15px;
    margin-left: 10px;
  }
  .logo {
    position: absolute;
    left: 0px;
    top: 50%;
    transform: translateY(-80%);
    img {
      height: 35px;
      width: 128px;
    }
  }
}
.screen-body {
  background-color: @backColor;
  width: 100%;
  height: calc(100% - 70px);
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  // margin-top: 10px;
  .screen-left {
    height: calc(100% - 57px);
    width: 49%;
    display: flex;
    flex-wrap: wrap;
    align-content: space-between;
    #left-top {
      width: 100%;
      height: 49%;
      position: relative;
    }
    #middle-bottom {
      width: 100%;
      height: 49%;
      position: relative;
    }
  }
  .screen-middle {
    height: 100%;
    width: 64%;
    display: flex;
    flex-wrap: wrap;
    align-content: space-between;
    justify-content: space-between;
    .com-container {
      box-shadow: @areaShadow;
    }
    #middle-top {
      width: 100%;
      height: 55%;
      position: relative;
      margin-bottom: 10px;
    }
    #right-bottom {
      width: 100%;
      height: 43%;
      position: relative;
    }
  }
  .screen-right {
    height: calc(100% - 57px);
    width: 24%;
    display: flex;
    flex-wrap: wrap;
    align-content: space-between;
    #right-top {
      width: 100%;
      height: 49%;
      position: relative;
    }
    #left-bottom {
      width: 100%;
      height: 49%;
      position: relative;
    }
  }
}
.resize {
  position: absolute;
  right: 20px;
  top: 20px;
  cursor: pointer;
}

.screen {
  &-box {
    width: 33%;
    height: 100%;
    background: #fff;
    border-radius: 6px;
    box-shadow: @areaShadow;
    &-tab {
      margin-bottom: 15px;
      ul {
        display: flex;
        padding-left: 10px;
        li {
          width: 25%;
          text-align: center;
          color: #666;
          line-height: 40px;
          font-size: 14px;
          font-weight: 500;
          position: relative;
          background: #fff;
          // box-shadow: 1px 3px 5px 1px rgba(0,0,0, 0.25);
          cursor: pointer;
          margin-right: 10px;
          &.active {
            color: @mainColor;
            border-bottom: 2px solid @mainColor;
            // &::before {
            //   content: '';
            //   position: absolute;
            //   left: 0;
            //   bottom: -2px;
            //   width: 100%;
            //   height: 2px;
            //   background: rgba(195, 96, 217, 0.5);
            // }
          }
          &:hover {
            color: @mainColor;
          }
          transition: all .2s;
        }
      }
    }
  }
  &-left {
    width: 100%!important;
  }
  &-right {
    width: 100%!important;
    #left-bottom {
      height: 49%;
    }
  }
}

.com-container {
  border-radius: 6px;
}
</style>
