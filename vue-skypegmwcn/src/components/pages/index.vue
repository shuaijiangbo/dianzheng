<template>
  <div id="index">
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
        activeIndex:''
      }
    },
    components:{
      headnav,
      footers
    },
    methods:{

    },
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
