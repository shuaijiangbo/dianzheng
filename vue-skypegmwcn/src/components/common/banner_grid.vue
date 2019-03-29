<template>
  <!--  <h1>轮播组件</h1>-->
    <!-- 轮播模块-->
<div  class="swiper-container1-box">
  <div class="swiper-container1">
    <div class="swiper-wrapper">
      <div class="swiper-slide" :style="{ backgroundImage: 'url('+ branch_bg +')' }">
      </div>
      <div class="swiper-slide"></div>
      <div class="swiper-slide"></div>
      <div class="swiper-slide"></div>
      <div class="swiper-slide"></div>
      <div class="swiper-slide"></div>
    </div>
    <!-- Add Arrows -->
    <div class="swiper-button-next" :style="{ backgroundImage: 'url('+ swiper_right +')' }"></div>
    <div class="swiper-button-prev" :style="{ backgroundImage: 'url('+ swiper_left +')' }"></div>
  </div>
</div>

</template>
<script>
  import Swiper from 'swiper';
  import 'swiper/dist/css/swiper.min.css';
  export default {
    data () {
      return {
        swiper_right:require('@/assets/images/swiper_right.png'),
        swiper_left:require('@/assets/images/swiper_left.png'),
        branch_bg:require('@/assets/images/branch_bg.png'),

      }
    },
    mounted(){
      var swiper = new Swiper('.swiper-container1', {
        slidesPerView: 5,
        spaceBetween: 10,
        slideToClickedSlide: true,
        loop: true,
        speed: 600,
        autoplay: {
          delay: 10000,//1秒切换一次
      },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
      })
    }
  }

</script>

<style type="text/scss" lang="scss" scoped>

.swiper-container1-box{
  width: 100%;
  height: 100%;
  position: relative;
}
  .swiper-container1 {
    width: 1130px;
    height: 100%;
      margin: 0 auto;

      overflow: hidden;
      list-style: none;
      padding: 0;
      z-index: 1;
    .swiper-button-next,.swiper-button-prev{
      width: 24px;
      height: 24px;
      background-size: 100% 100%;
      border-radius: 12px;
      top: 30px;
    }
    .swiper-button-next{
      right: 0;
    }
    .swiper-button-prev{
      left: 0;
    }
  }
  .swiper-slide {
    text-align: center;
    font-size: 18px;
    background: red;

  }
</style>
