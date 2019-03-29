<template>
  <div id="">
  <header :style="{backgroundImage:`url(${headerBg})`}">
    <div class="header-content-box">
      <img :src=logoImg alt="">
      <div class="pull-right">
      </div>
    </div>
  </header>
  </div>
</template>

<script>
  import {get, post} from '@/api/fetch.js';
  import url from '@/api/serviceAPI.config.js';
    export default {
      name: "",
      data(){
        return{
          logoImg:require('@/assets/images/logo.png'),
          headerBg:require('@/assets/images/header_bg.png'),
        }
      },
      methods:{
        jumper(url){
          this.$router.push({path:'/index/classStatus',query:{}})
        }
      },
      created(){

      }
    }
</script>

<style type="text/scss" lang="scss" scoped>
  header {
    position: relative;
    height: 95px;
     /*background: url(/static/images/header.png) no-repeat center center;*/
      background-size: cover;
    .header-content-box{
      width: 1200px;
      height: 95px;
      margin: 0 auto;

      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .split-line.ml15{
      margin-left: 15px;
    }
    .split-line.mr15{
      margin-right: 15px;
    }
    .tools-box{
      color: #fff;
      font-size: 14px;
      .icon-dianyuan{
        margin-right: 5px;
        font-size: 15px;
      }
    }
  }
  .pull-right{
    float: right;
  }
  .pull-left{
    float: left;
  }
div{
  color: #000;
}

</style>
