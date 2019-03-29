<template>
  <div id="index" :key="times">
    <headnav></headnav>

    <transition name="fade">
      <router-view></router-view>
    </transition>
    <footers></footers>
  </div>
</template>

<script>
  import headnav from '@/components/common/header'
  import footers from '@/components/common/footer'
  export default {
    name: 'index',
    data(){
      return {
        activeIndex:'',
        times:new Date().getTime()+'',
      }
    },
    components:{
      headnav,
      footers
    },
    methods:{

    },
    created(){
        (function(){
          var ua = window.navigator.userAgent.toLowerCase();
          if (!(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent))) {
            /*window.location.href = "pc page";*/
          }
          else if (ua.indexOf("iphone") > 0 || ua.indexOf("android") > 0) {
            window.location.href = "http://www.aiegov.com/mobile/index.html";
          }
        }());
    }
/*    watch:{
      $route(to,from){
        this.activeIndex=to.meta;
      }
    }*/
  }
</script>

<style type="text/scss" lang="scss" scoped>
div{
  color: #000;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .3s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
