<template>
    <div class="read">
        <div class="container">
            <h2 class="read-title">推荐阅读</h2>
            <div class="read-swiper">
                <div v-swiper:mySwiper="swiperOption" class="swiperWrap">
                <div class="swiper-wrapper">
                    <div class="swiper-slide" v-for="(banner, index) in banners" :key="index">
                        <a class="swiper-slide-container" :href="banner.link" target="_blank">
                            <h4>{{banner.title}}</h4>
                            <p>{{banner.content}}</p>
                        </a>
                    </div>
                </div>
                
            </div>
            <div class="swiper-nav-button swiper-prev" @click="swiperNavClick('slidePrev')"><span class="fa fa-angle-left" aria-hidden="true"></span></div>
            <div class="swiper-nav-button swiper-next" @click="swiperNavClick('slideNext')"><span class="fa fa-angle-right" aria-hidden="true"></span></div>
            
            </div>
        </div>
    </div>
</template>

<script>
import Vue from 'vue'
import VueAwesomeSwiper from 'vue-awesome-swiper'
 
Vue.use(VueAwesomeSwiper)

export default {
    data(){
        return{
            banners:[
                {
                    title: '认识抑郁症',
                    content: '点击查看更多关于抑郁症的信息', 
                    link: 'https://baike.baidu.com/item/%E6%8A%91%E9%83%81%E7%97%87'
                },
                {
                    title: '北京心理危机研究和干预中心',
                    content: '点击进入你可以得到想要的帮助', 
                    link: 'http://www.crisis.org.cn/'
                },
                {
                    title: '心理自助手册',
                    content: '使用认知行为疗法，帮助你面对生命中那些不知所措的时刻，你都可以在这里找到答案。', 
                    link: 'http://www.psyhelpguide.com/'
                },
                {
                    title: '中国心理学会',
                    content: '点击查看更多心理预防有效的基本要素', 
                    link: 'https://www.cpsbeijing.org/'
                },
                {
                    title: '中国抑郁症网',
                    content: '抑郁症有哪些不同的分型……点击进入抑郁症科普平台，正确认识抑郁症', 
                    link: 'http://www.yiyuzheng.com.cn/'
                },
            ],
            swiperOption: {
                loop: true,
                slidesPerView : 4,
                // centeredSlides : true,
                // centeredSlidesBounds: true,
                spaceBetween: 20,
                on: {
                    slideChange() {
                        console.log('onSlideChangeEnd', this);
                    },
                    tap() {
                        console.log('onTap', this);
                    }
                }
            }
        }
    },
    mounted(){
        
        
    },
    methods: {
        swiperNavClick (navType) {
            const swiper = document.querySelector('.swiper-container').swiper
            swiper[navType]()
        }
    }
}
</script>

<style lang="css" scoped>
.read {
    background-color: #fafafa;
    padding: 50px 0;
}
.read-title {
    font-size: 50px;
    color: #2a2833;
    margin-bottom: 45px;
    text-align: center;
}
.read-swiper {
    position: relative;
}
.swiper-container {
    width: 85%;
    padding: 10px;
}
.swiper-nav-button {
    position: absolute;
    width: 50px;
    height: 50px;
    top: 50%;
    transform: translateY(-50%);
    background: #fff;
    border-radius: 50%;
    box-shadow: 1px 1px 3px 0px rgba(0,0,0,0.25);
    cursor: pointer;
    text-align: center;
    vertical-align: middle;
}
.swiper-prev {
    left: 10px;
}
.swiper-next {
    right: 10px;
}
.swiper-slide h4 {
    font-size: 20px;
    margin-bottom: 20px;
}
.swiper-slide p {
    color: #777;
    font-size: 16px;
    line-height: 24px;
}
.swiper-slide a {
    display: block;
    color: #444!important;
    background: #fff;
    padding: 30px 20px;
    height: 240px;
    border-radius: 10px;
    box-shadow: 1px 1px 5px 0px rgba(0,0,0,0.25);
    transition: all 0.2s;
}

.swiper-slide a:hover {
    box-shadow: 1px 2px 10px 0px rgba(0,0,0,0.25);
}
.fa-angle-left,.fa-angle-right {
    position: absolute;
    left: 50%;
    top: 50%;
    font-size: 40px;
    transform: translate(-50%, -50%);
}
</style>