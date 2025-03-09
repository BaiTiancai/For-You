<template>
  <div class="page-wrapper">
    <Preloader />
    <nuxt />
  </div>
</template>


<script>
  import Preloader from "~/components/Preloader.vue";
  export default {
    components: {
      Preloader
    },
    head(){
      return {
        title: "For You —— 基于Echarts的抑郁症数据可视化平台"
      }
    }

  }
</script>
