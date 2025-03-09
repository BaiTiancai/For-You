<template>
  <div>
    <footer class="site-footer">
      <div class="site-footer__upper">
        <div class="container">
          <div class="row">
            <div class="col-lg-3">
              <div class="footer-widget footer-widget__about">
                <img src="/assets/images/resources/logo-light.png" width="250" alt="" class="footer-widget__logo">
              </div><!-- /.footer-widget -->
            </div><!-- /.col-lg-2 -->
            <div class="col-lg-6 d-flex justify-content-between footer-widget__links-wrap">
              <div class="footer-widget">
                <h1 class="footer-widget__title">作者： 石秋爽、 何杭薇、 张司羽</h1><!-- /.footer-widget__title -->
              </div><!-- /.footer-widget -->
            </div>
          </div><!-- /.row -->
        </div><!-- /.container -->
      </div><!-- /.site-footer__upper -->
    </footer>

      <a href="#" data-target="html" class="scroll-to-target scroll-to-top"><i class="fa fa-angle-up"></i></a>

  </div>
</template>

<script>
    export default {
      name: "Footer",
      mounted() {

        $(window).on('scroll', function () {
          if ($('.scroll-to-top').length) {
            var strickyScrollPos = 100;
            if ($(window).scrollTop() > strickyScrollPos) {
              $('.scroll-to-top').fadeIn(500);
            } else if ($(this).scrollTop() <= strickyScrollPos) {
              $('.scroll-to-top').fadeOut(500);
            }
          }
        })
      }
    }
</script>

<style scoped>

</style>
