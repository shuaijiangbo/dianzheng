<template>
  <!--  <h1>轮播组件</h1>-->
    <!-- 轮播模块-->
    <div class="swiper-container">
      <div class="swiper-wrapper">
       <div class="swiper-slide" v-for="str in bannerNoticList" :style="{ backgroundImage: 'url(' + str.coverImageUrl + ')' }" @click="jumpTo(str.id)">
       </div>
      </div>
      <div class="swiper-pagination swiper-pagination-white" style="text-align: right;width: 98%;"></div>
    </div>
</template>
<script>
  import Swiper from 'swiper';
  import 'swiper/dist/css/swiper.min.css';
  export default {
    props: ['bannerNoticList'],
    data(){
      return{
        dd:[],
      }
    },
    mounted() {
      setTimeout(function(){
        var swiper = new Swiper('.swiper-container', {
          paginationClickable: true,
          loop: true,
          speed: 600,
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
        this.$emit('jumpDetail',id)
      }
    },
    watch: {
/*      listImg: function(newVal,oldVal){
        this.cData = newVal;  //newVal即是chartData
        var swiper = new Swiper('.swiper-container', {
          paginationClickable: true,
          loop: true,
          speed: 600,
          autoplay: {
            delay: 1000,//1秒切换一次
          },
          pagination: {
            el: '.swiper-pagination',
            clickable :true,
          },
        });
      }*/
    },
    created(){
      setTimeout(()=>{
        console.log(this.bannerNoticList);
      },3000)
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
