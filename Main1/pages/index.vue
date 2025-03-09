<template>
  <div>
    <Header />
    <Banner />
    <Features />
    <Video />
    <CallToAction />
    <CallToActionTwo />
    <Counter />
    <Testimonial />
    <BlogHome />
    <Pricing />
    <Screenshots />
    <Qa />
    <Faq />
    <Read />
    <Subscribe />
  </div>
</template>
<script>
  import Header from "~/components/Header.vue";
  import Banner from "~/components/Banner.vue";
  import Features from "~/components/Features.vue";
  import Video from "~/components/Video.vue";
  import CallToAction from "~/components/CallToAction.vue";
  import CallToActionTwo from "~/components/CallToActionTwo.vue";
  import Counter from "~/components/Counter.vue";
  import Testimonial from "~/components/Testimonial.vue";
  import BlogHome from "~/components/BlogHome.vue";
  import Pricing from "~/components/Pricing.vue";
  import Screenshots from "~/components/Screenshots.vue";
  import Brands from "~/components/Brands.vue";
  import Faq from "~/components/Faq.vue";
  import Qa from '~/components/Qa.vue'
  import Subscribe from "~/components/Subscribe.vue";
  import Read from '~/components/Read.vue';
  export default {
    components: {
      Header,
      Banner,
      Features,
      Video,
      CallToAction,
      CallToActionTwo,
      Pricing,
      Testimonial,
      Counter,
      Screenshots,
      BlogHome,
      Brands,
      Faq,
      Subscribe,
      Qa,
      Read
    }
  }
</script>
