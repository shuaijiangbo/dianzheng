<template>
  <div id="">

    <div class="outside">
      <div style="margin-top: 115px;font-size: 14px">
        <span>订单详情：合并</span>
        <span class="split-line">|</span>
        <span>3笔订单</span>
      </div>

      <div style="margin-top: 30px">
        <span class="amount">26800.00</span>
        <span>元</span>
      </div>

      <div style="margin-top: 10px">
        <img :src=code alt="" style="zoom: 80%;">
      </div>

      <div style="margin-top: 10px">
        <img :src=Flicking alt="" style="zoom: 80%;">
      </div>
    </div>

    <form action="http://192.168.3.28:8094/api/pay" method="post">
      <input type="text" name="orderNo" value="2019012417080731123">
      <input type="text" name="tradeType" value="A">
      <button type="submit">提交支付</button>
    </form>
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
        code:require('@/assets/images/code.png'),
        Flicking:require('@/assets/images/Flicking.png'),
      }
    },
    methods:{

    },
    created(){

    }
  }
</script>

<style type="text/scss" lang="scss" scoped>

  .amount{
    font-size: 43px;
    color: #ff6000;
  }

  .outside{
    width: 100%;
    text-align: center;

  }
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
    .split-line{
      margin: 0 15px;
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
