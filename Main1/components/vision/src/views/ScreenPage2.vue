<template>
  <div class="screen-container" :style="containerStyle">
    <header class="screen-header">
      <div>
      </div>
      <span class="title">抑郁症数据可视化</span>
      <span class="title-min">Visualization analysisof global suicide rates</span>
      <div class="title-right">
        <img :src="themeSrc" class="qiehuan" @click="handleChangeTheme">
      </div>
    </header>
    <div class="screen-body">
      <section class="screen-left">
        <!-- 该接口名字！！！！！！   -->
        <div id="left-top" :class="[fullScreenStatus.suirate ? 'fullscreen' : '']">
          <!-- 2009年各国自杀率表 -->
          <Suirate ref="suirate"></Suirate>
          <div class="resize">
            <!-- icon-compress-alt -->
            <span @click="changeSize('suirate')" :class="['iconfont', fullScreenStatus.suirate ? 'icon-compress-alt' : 'icon-expand-alt']"></span>
          </div>
        </div>
        <div id="left-bottom" :class="[fullScreenStatus.dynamicbar ? 'fullscreen' : '']">
          <!-- 1985年世界自杀率图表 -->
          <Dynamicbar ref="dynamicbar"></Dynamicbar>
          <div class="resize">
            <!-- icon-compress-alt -->
            <span @click="changeSize('dynamicbar')"  :class="['iconfont', fullScreenStatus.dynamicbar ? 'icon-compress-alt' : 'icon-expand-alt']"></span>
          </div>
        </div>
      </section>
      <section class="screen-middle">
        <div id="middle-top" :class="[fullScreenStatus.worldmap ? 'fullscreen' : '']">
          <!-- 商家分布图表 -->
          <Worldmap ref="worldmap"></Worldmap>
          <div class="resize">
            <!-- icon-compress-alt -->
            <span @click="changeSize('worldmap')"  :class="['iconfont', fullScreenStatus.worldmap ? 'icon-compress-alt' : 'icon-expand-alt']"></span>
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
      <section class="screen-right">
        <div id="right-top" :class="[fullScreenStatus.country ? 'fullscreen' : '']">
          <!-- 热销商品占比图表 -->
          <Country ref="country"></Country>
          <div class="resize">
            <!-- icon-compress-alt -->
            <span @click="changeSize('country')"  :class="['iconfont', fullScreenStatus.country ? 'icon-compress-alt' : 'icon-expand-alt']"></span>
          </div>
        </div>
        <div id="right-bottom" :class="[fullScreenStatus.stock ? 'fullscreen' : '']">
          <!-- 库存销量分析图表 -->
          <Stock ref="stock"></Stock>
          <div class="resize">
            <!-- icon-compress-alt -->
            <span @click="changeSize('stock')"  :class="['iconfont', fullScreenStatus.stock ? 'icon-compress-alt' : 'icon-expand-alt']"></span>
          </div>
        </div>
      </section>
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
import screenfull from 'screenfull'
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
       fullscreen: false, //是否全屏
    }
  },
  mounted(){
    this.$nextTick(()=>{
      setTimeout(()=>{
         screenfull.request()
        // this.FullScreenx()
      })
    })
  },
  methods: {
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
  background-color: #dadada;
  // color: #e8e8ea;
  box-sizing: border-box;
}
.screen-header {
  background-color: #dadada;
  width: 100%;
  height: 64px;
  font-size: 20px;
  position: relative;
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
  background-color: #dadada;
  width: 100%;
  height: 100%;
  display: flex;
  // margin-top: 10px;
  .screen-left {
    height: 100%;
    width: 29%;
    #left-top {
      height: 53%;
      position: relative;
    }
    #left-bottom {
      height: 31%;
      margin-top: 15px;
      position: relative;
    }
  }
  .screen-middle {
    height: 100%;
    width: 39.8%;
    margin-left: 1%;
    margin-right: 1%;
    #middle-top {
      width: 100%;
      height: 56%;
      position: relative;
    }
    #middle-bottom {
      margin-top: 15px;
      width: 100%;
      height: 28%;
      position: relative;
    }
  }
  .screen-right {
    height: 100%;
    width: 29%;
    #right-top {
      height: 46%;
      position: relative;
    }
    #right-bottom {
      height: 38%;
      margin-top: 15px;
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
</style>
