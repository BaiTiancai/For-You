import Vue from 'vue'
import VueRouter from 'vue-router'
import ScreenPage2 from '@/views/ScreenPage2'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/screen2'
  },
  {
    path: '/screen2',
    component: ScreenPage2
  }
]

const router = new VueRouter({
  routes
})

export default router
