<!--
针对于 /sellerpage 这条路径而显示出来的
在这个组件中, 通过子组件注册的方式, 要显示出Seller.vue这个组件
 -->
<template>
  <div class="com-page">
    <master></master>
  </div>
</template>

<script>
import Master from '@/components/Master'
export default {
  data () {
    return {}
  },
  methods: {},
  components: {
    master: Master
  }
}
</script>

<style lang="less" scoped>
</style>
