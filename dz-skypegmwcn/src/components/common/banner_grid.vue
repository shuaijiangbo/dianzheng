<template>
  <!--  <h1>轮播组件</h1>-->
    <!-- 轮播模块-->
<div  class="swiper-container1-box">
      <div class="swiper-box">
        <transition  name="image">
          <!--<img style="{width:100%;height:450px}" v-if="ifshow" :src=bannerNoticList[activeIndex].image alt="">-->
          <div class="image-bg-box" v-if="ifshow"  :style="{backgroundImage:`url(${bannerNoticList[activeIndex].image})`}">

          </div>
        </transition>
      </div>
      <div class="icons-box">
        <ul>
          <li class="icons-items" @click="changeIcon(index)" :class="index==activeIndex?'active':''" v-for="(item,index) in bannerNoticList">
            <p v-if="index==activeIndex" :style="'width:'+ width +'px'"></p>
          </li>
        </ul>
      </div>
</div>
</template>
<script>
  import banner0 from '@/assets/images/banner0.jpg';
  import banner1 from '@/assets/images/banner1.jpg';
  import banner2 from '@/assets/images/banner2.jpg';
  import banner3 from '@/assets/images/banner3.jpg';
  export default {
    data () {
      return {
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
        activeIndex:0,
        ifshow:true,
        timer:null,
        bigtimer:null,
        width:0,
      }
    },
    mounted(){
      this.creatIcons();
      this.go();
    },
    methods:{
      creatIcons(){
        var i=1;
        this.width=0;
        clearInterval(this.timer);
        let _self=this;
        this.timer=setInterval(()=>{
          i+=1;
          _self.width=i*1;
        },200)
      },
      goto(index){
        let that = this;
        this.ifshow = false;
        setTimeout(function(){
          that.ifshow = true;
          that.activeIndex = index;
        },200)
      },
      go(){
        var _self=this;
        clearInterval(this.bigtimer);
        this.bigtimer=setInterval(()=>{
          let activeIndex=_self.activeIndex>=3?0:++_self.activeIndex;
          _self.goto(activeIndex);
          _self.creatIcons();
        },10000)
      },
      changeIcon(index){
        this.creatIcons();
        this.goto(index);
        this.go();
      }
    }
  }

</script>

<style type="text/scss" lang="scss" scoped>

  .image-enter-active, .image-leave-active {
    transition: opacity .4s;

  }
   .image-leave-to /*!* .fade-leave-active below version 2.1.8 *! */{
    opacity: 0;
  }
  .image-enter{
    opacity: 0;
  }

  .image-leave{
    opacity: 1;
  }
  image-enter-to{
    opacity: 1;
  }


.swiper-container1-box{
  width: 100%;
  height: 100%;
  position: relative;
  .swiper-box{
    width: 100%;
    height: 100%;
    overflow: hidden;
    li{
      width: 100%;
      height: 100%;
    }
  }
  .icons-box{
    position: absolute;
    width: 100%;
    bottom: 2px;
    ul{
      width: 250px;
      margin: 0 auto;
      .icons-items{
        width: 50px;
        height: 8px;
        background: rgba(0,0,0,.7);
        float: left;
        margin-right: 10px;
        cursor: pointer;
        position: relative;
        p{
          position: absolute;
          width: 0px;
          height: 8px;
          background: #078dff;
        }
      }
      .icons-items.active{
        p{
          /*width: 20px;*/
        }
      }
    }
  }
}
  .image-bg-box{
    width: 100%;
    height: 100%;
    background-size: contain;
  }
</style>
