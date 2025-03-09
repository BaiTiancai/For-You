import Vue from 'vue'
import VueRouter from 'vue-router'
import ScreenPage2 from '@/views/ScreenPage2'
import MaterPage from '@/views/MaterPage'
import RankPage from '@/views/RankPage'
import SuiratePage from '@/views/SuiratePage'
import WorldmapPage from '@/views/WorldmapPage'
import GdpsuiPage from '@/views/GdpsuiPage'
import DynamicbarPage from '@/views/DynamicbarPage'
import StockPage from '@/views/StockPage'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/screen2'
  },
  {
    path: '/screen2',
    component: ScreenPage2
  },
  {
    path: '/materpage',
    component: MaterPage
  },
  {
    path: '/rankpage',
    component: RankPage
  },
  {
    path: '/suiratepage',
    component: SuiratePage
  },
  {
    path: '/worldmappage',
    component: WorldmapPage
  },
  {
    path: '/gdpsuipage',
    component: GdpsuiPage
  },
  {
    path: '/dynamicbarpage',
    component: DynamicbarPage
  },
  {
    path: '/stockpage',
    component: StockPage
  }
]

const router = new VueRouter({
  routes
})

export default router
