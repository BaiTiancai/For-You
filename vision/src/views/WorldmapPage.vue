<!--
针对于 /mappage 这条路径而显示出来的
在这个组件中, 通过子组件注册的方式, 要显示出Map.vue这个组件
-->
<template>
  <div class="com-page">
    <worldmap></worldmap>
  </div>
</template>

<script>
import Worldmap from '@/components/Worldmap'
export default {
  data () {
    return {}
  },
  methods: {},
  components: {
    worldmap: Worldmap
  }
}
</script>

<style lang="less" scoped>
</style>
