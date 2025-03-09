<template>
  <section class="video-one" id="video">
    <img src="/assets/images/background/video-one-bg.png" alt="Awesome Image" class="video-one__bg" />
    <div class="container wow fadeInUp" data-wow-duration="1500ms">
      <div class="video-one__box ">
        <img src="/assets/images/resources/video-1-1.jpg" alt="">
        <div class="video-one__content">
          <a href="https://www.bilibili.com/video/BV1D5411772Q" class="video-popup video-one__btn"><i class="fa fa-play"></i><!-- /.fa fa-play --></a>
          <!-- /.video-popup -->
          <h2 class="video-one__title"><span>抑郁症：一场心灵的“感冒” </span> <br></h2><!-- /.video-one__title -->
        </div><!-- /.video-one__content -->
      </div><!-- /.video-one__box -->
    </div><!-- /.container -->
  </section>
</template>

<script>
    export default {
      name: "Video",
      mounted() {
        if ($('.video-popup').length) {
          $('.video-popup').magnificPopup({
            disableOn: 700,
            type: 'iframe',
            mainClass: 'mfp-fade',
            removalDelay: 160,
            preloader: true,
          });
        }
      }
    }
</script>

<style scoped>
  .video-one .container {
    height: 500px;
  }
  .video-one__box {
    height: 100%;
  }
</style>
