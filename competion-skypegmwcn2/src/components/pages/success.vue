<template>
  <div id="" class="content-box">
      <div class="icons">
        <img :src=successful alt="" >
        <span class="classstatus_text">支付成功</span>
        <div style="clear: both"></div>
      </div>

      <div class="details">
        <span>订单号：</span>
        <span>{{orderId}}</span>
        <span class="split-line">|</span>
        <span>共计：</span>
        <span>{{payMoney}}元</span>
        <span class="split-line">|</span>
        <span>支付宝交易号：</span>
        <span>{{tradeNo}}</span>
      </div>

      <div class="btns">
        <button style="cursor: pointer" @click="jumper()">立即返回首页</button>
      </div>
  </div>
</template>

<script>
  import {get, post} from '@/api/fetch.js';
  import url from '@/api/serviceAPI.config.js';
  export default {
    name: "",
    data(){
      return{
        successful:require('@/assets/images/successful.png'),
        tradeNo:'',               //交易号
        orderId:'',               //订单号
        payStatus:'',               //订单状态
        payMoney:'',               //订单金额
      }
    },
    methods:{
      init(){
      /*  window.location.href.split('?');*/
        this.tradeNo=this.$route.query.tradeNo;
        this.orderId=this.$route.query.orderNo;
        this.payStatus=this.$route.query.payStatus;
        this.payMoney=this.$route.query.money;
      },
      jumper(){
        this.$router.push({'path':'/index/chooseComponents'});
      },
    },
    created(){
      this.init();
    }
  }
</script>

<style type="text/scss" lang="scss" scoped>
.content-box{
  margin-top: 100px;
}
  .btns{
    text-align: center;
    button{
      width: 262px;
      height: 62px;
      background-color: #ff6000;
      text-align: center;
      line-height: 62px;
      color: #fff;
      font-size: 20px;
      outline: none;
      border: none;
    }
  }

  .icons{
      text-align: center;
      img{
        vertical-align: bottom;
      }
    .classstatus_text{
      font-size: 40px;
      margin-left: 20px;
      color: #ff6000;
      vertical-align: 25px;
    }
  }

  .details{
    margin: 100px 0 100px;
    text-align: center;
    .split-line{
      margin: 0 20px;
    }
  }

  .three{
    width: 914px;
    height: 2px;
    background-color: #a3a9a3;
    float: left;
    margin-left: 286px;
    margin-top: -2px;
  }

  .two{
    width: 143px;
    height: 2px;
    background-color: #fe7a02;
    float: left;
    margin-left: 143px;
    margin-top: -2px;
  }

  .one{
    width: 143px;
    height: 2px;
    background-color: #a3a9a3;
  }

  .line{
    width: 1200px;
    margin-left: 360px;
    margin-top: 10px;
  }

  .titles{
    margin-left: 386px;
    margin-top: 30px;
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
</style>
