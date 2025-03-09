<template>
  <div>
    <HeaderTwo />
    <PageHeader title="Blog Page" />
    <Blog />
    <Footer />
  </div>
</template>
<script>
  import PageHeader from "~/components/PageHeader.vue";
  import Blog from "~/components/Blog.vue";
  import Footer from "~/components/Footer.vue";
  export default {
    components: {
      PageHeader,
      Blog,
      Footer,
    },
    head(){
      return {
        title: "Dimon | Blog"
      }
    }
  }
</script>
