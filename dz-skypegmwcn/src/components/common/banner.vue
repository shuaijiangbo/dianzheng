<template>
  <!--  <h1>轮播组件</h1>-->
    <!-- 轮播模块-->
    <div class="swiper-container">
      <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="str in bannerNoticList" :style="{ backgroundImage: 'url(' + str.image + ')' }" @click="jumpTo(str.id)">
        </div>
      </div>
      <div class="swiper-pagination swiper-pagination-white" style="text-align: center;width: 98%;"></div>
    </div>
</template>
<script>
  import Swiper from 'swiper';
  import 'swiper/dist/css/swiper.min.css';
  import banner0 from '@/assets/images/banner0.jpg';
  import banner1 from '@/assets/images/banner1.jpg';
  import banner2 from '@/assets/images/banner2.jpg';
  import banner3 from '@/assets/images/banner3.jpg';
  export default {
    /*props: ['bannerNoticList'],*/
    data(){
      return{
        bannerNoticList:[
          {
            "date": "1992-04-13",
            "id": "810000197503165126",
            "image":banner0,
            "title": "★四川省第一届冬季田径协会联赛"
          },
          {
            "date": "2004-12-03",
            "id": "210000198310273959",
            "image": banner1,
            "title": "★四川省第一届冬季田径协会联赛"
          },
          {
            "date": "1998-02-11",
            "id": "330000200309113170",
            "image": banner2,
            "title": "★四川省第一届冬季田径协会联赛"
          },
          {
            "date": "2012-11-02",
            "id": "820000201008275409",
            "image": banner3,
            "title": "★四川省第一届冬季田径协会联赛"
          },
        ],
      }
    },
    mounted() {
      setTimeout(function(){
        var swiper = new Swiper('.swiper-container', {
          paginationClickable: true,
          loop: true,
          speed: 600,
          effect:'fade',   //动画效果：渐变
          autoplay: {
            delay: 6000,//1秒切换一次
          },
          pagination: {
            el: '.swiper-pagination',
            clickable :true,
          },
        });
      },1000)
    },
    methods:{
      jumpTo(id){
        /*this.$emit('jumpDetail',id)*/
      }
    },
    watch: {

    },
    created(){

    }
  }
</script>

<style type="text/scss" lang="scss" scoped>

  .swiper-container {
    width: 100%;
    height: 100%;
    .swiper-wrapper {
      width: 100%;
      height: 100%;
    }
    .swiper-slide {
      background-position: center;
      background-size: cover;
      width: 100%;
      height: 100%;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .swiper-pagination-bullet {
      width:0.833rem;
      height: 0.833rem;
      display: inline-block;
      background: #7c5e53;
    }
  }

  /*包裹自定义分页器的div的位置等CSS样式*/
  .swiper-pagination-custom {
    bottom: 10px;
    left: 0;
    width: 100%;
  }
  /*自定义分页器的样式，这个你自己想要什么样子自己写*/
  .swiper-pagination-customs {
    width: 30px;
    height: 4px;
    display: inline-block;
    background: #000;
    opacity: .3;
    margin: 0 5px;
  }
  /*自定义分页器激活时的样式表现*/
  .swiper-pagination-customs-active {
    opacity: 1;
    background-color: #F78E00;
  }

</style>
