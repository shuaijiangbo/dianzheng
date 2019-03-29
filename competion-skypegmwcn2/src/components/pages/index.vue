<template>
  <div>
    <headnav></headnav>
    <router-view/>
    <!--<foot></foot>-->
  </div>
</template>

<script>
  import {get, post} from '@/api/fetch.js';
  import url from '@/api/serviceAPI.config.js';
  import headnav from '@/components/common/header'
  import headnavnologin from '@/components/common/headerNoLogin'
  import foot from '@/components/common/footer'
    export default {
      name: "",
      components:{
        headnav,
        headnavnologin,
        foot
      },
      methods:{

      },
      created(){

      }
    }
</script>

<style type="text/scss" lang="scss" scoped>
div{
  color: #000;
}
</style>
