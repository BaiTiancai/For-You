<template>
  <section class="faq-one">
    <!-- <img src="/assets/images/background/faq-one-bg.png" alt="Awesome Image" class="faq-one__bg" /> -->
    <div class="container">
      <div class="block-title text-center">
        <h2 class="block-title__title">抑郁症 <span>相关知识</span>小贴士</h2><!-- /.block-title__title -->
      </div><!-- /.block-title -->
      <div class="accrodion-grp" data-grp-name="faq-accrodion">
        <div class="accrodion active wow fadeInUp" data-wow-duration="1500ms" data-wow-delay="0ms">
          <div class="accrodion-inner">
            <div class="accrodion-title">
              <h4>预测抑郁的信号</h4>
            </div>
            <div class="accrodion-content">
              <div class="inner">
                <p>抑郁症可能在人们的生活中展现出一系列信号，如持续的情绪低落、失去兴趣和享乐、睡眠问题、精力不足、食欲变化、自我负面评价、注意力和集中力问题以及身体不适等。这些信号可能表明一个人可能患有抑郁症，因此及早寻求专业的心理咨询和治疗至关重要。</p>
              </div><!-- /.inner -->
            </div>
          </div><!-- /.accrodion-inner -->
        </div>
        <div class="accrodion  wow fadeInUp" data-wow-duration="1500ms" data-wow-delay="100ms">
          <div class="accrodion-inner">
            <div class="accrodion-title">
              <h4>缓解抑郁情绪的方法</h4>
            </div>
            <div class="accrodion-content">
              <div class="inner">
                <p>缓解抑郁情绪的方法包括与亲友交流倾诉、保持身体活动、寻求专业帮助、培养爱好兴趣、保持规律作息、避免孤独与隔离、保持健康饮食和规律运动、学习放松和呼吸练习、寻找生活中的乐趣和意义，并积极寻求支持和帮助。 </p>
              </div><!-- /.inner -->
            </div>
          </div><!-- /.accrodion-inner -->
        </div>
        <div class="accrodion wow fadeInUp" data-wow-duration="1500ms" data-wow-delay="200ms">
          <div class="accrodion-inner">
            <div class="accrodion-title">
              <h4>如何帮助抑郁症患者</h4>
            </div>
            <div class="accrodion-content">
              <div class="inner">
                <p>帮助抑郁症患者的方法包括耐心倾听、理解和支持他们的情绪，提供温暖和安全的环境，鼓励他们寻求专业治疗和支持网络，与他们分享积极的活动和爱好，帮助他们建立自我价值感和积极的思维模式，避免批评和指责，鼓励他们积极参与社交活动和日常生活，以及定期关注他们的健康状况并提供必要的支持和帮助。</p>
              </div><!-- /.inner -->
            </div>
          </div><!-- /.accrodion-inner -->
        </div>
      </div>
    </div><!-- /.container -->
  </section>
</template>

<script>
    export default {
      name: "Faq",
      mounted() {
        if ($('.accrodion-grp').length) {
          var accrodionGrp = $('.accrodion-grp');
          accrodionGrp.each(function() {
            var accrodionName = $(this).data('grp-name');
            var Self = $(this);
            var accordion = Self.find('.accrodion');
            Self.addClass(accrodionName);
            Self.find('.accrodion .accrodion-content').hide();
            Self.find('.accrodion.active').find('.accrodion-content').show();
            accordion.each(function() {
              $(this).find('.accrodion-title').on('click', function() {
                if ($(this).parent().parent().hasClass('active') === false) {
                  $('.accrodion-grp.' + accrodionName).find('.accrodion').removeClass('active');
                  $('.accrodion-grp.' + accrodionName).find('.accrodion').find('.accrodion-content').slideUp();
                  $(this).parent().parent().addClass('active');
                  $(this).parent().parent().find('.accrodion-content').slideDown();
                };


              });
            });
          });

        }
      }
    }
</script>

<style scoped>

</style>
