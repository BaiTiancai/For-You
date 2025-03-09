<!--
针对于 /masterpage 这条路径而显示出来的
在这个组件中, 通过子组件注册的方式, 要显示出Mater.vue这个组件
 -->
<template>
  <div class="com-page">
    <gdpsui></gdpsui>
  </div>
</template>

<script>
import Gdpsui from '@/components/Gdpsui'
export default {
  data () {
    return {}
  },
  methods: {},
  components: {
    gdpsui: Gdpsui
  }
}
</script>

<style lang="less" scoped>
</style>
