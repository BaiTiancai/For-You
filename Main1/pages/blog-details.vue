<template>
  <div>
    <HeaderTwo />
    <PageHeader title="Blog Details" />
    <BlogDetails />
    <Footer />
  </div>
</template>
<script>
  import PageHeader from "~/components/PageHeader.vue";
  import BlogDetails from "~/components/BlogDetails.vue";
  import Footer from "~/components/Footer.vue";
  export default {
    components: {
      PageHeader,
      BlogDetails,
      Footer
    },
    head(){
      return {
        title: "Dimon | Blog Details"
      }
    }
  }
</script>
