import Vue from 'vue'
import SocketService from '../utils/socket_service'
// 引入字体的文件
import '~/static/assets/font2/iconfont.css'
// 引入全局的样式文件
// import './assets/css/global.less'
// 对服务端进行websocket的连接
SocketService.Instance.connect()
// 其他的组件  this.$socket
Vue.prototype.$socket = SocketService.Instance

Vue.prototype.$echarts = window.echarts