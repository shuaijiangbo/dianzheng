<template>
  <div id="">
      <div class="contents">
        <div class="order">
          <img :src=order alt="" class="imgs">
          <span class="order-one">订单提交成功：请尽快付款：71925303941</span>
          <span class="amount"> 元</span>
          <span class="money">{{money}}</span>
          <span class="amount">应付金额 </span>

          <span class="order-two">推荐使用扫码支付|请您在30分钟内完成支付，否则订单会被自动取消</span>
        </div>

        <div class="choose-way-box">
          <p class="choose-way-txt">选择支付方式</p>
        </div>

        <div class="treasure">
          <el-checkbox v-model="checked1" disabled style="zoom: 150%;float: left;margin-left: 20px">
          </el-checkbox>
          <div class="treasure-title">
            <img :src=micro alt="" style="float: left;margin-top: 16px;">
            <span style="float: left; margin-left: 20px;">微信支付</span>
          </div>
        </div>

        <div class="micro">
          <el-checkbox v-model="checked" style="zoom: 150%;float: left;margin-left: 20px">

          </el-checkbox>
          <div class="treasure-title">
            <img :src=treasure alt="" style="float: left;margin-top: 16px;">
            <span style="float: left; margin-left: 20px;">支付宝</span>
          </div>
          <span class="amount1"> 元</span>
          <span class="money">{{money}}</span>
          <span class="amount1">支付</span>
        </div>
        <div class="btn">
          <form action="http://192.168.3.132:8080/event-api/api/aliPay" method="post">
            <input v-show="false" type="text" name="orderNo" v-model="orderNo">
            <input v-show="false" type="text" name="tradeType" value="A">
            <button class="btns" type="submit">立即支付</button>
          </form>
        </div>
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
        logoImg:require('@/assets/images/logo.png'),
        headerBg:require('@/assets/images/header_bg.png'),
        order:require('@/assets/images/order.png'),
        treasure:require('@/assets/images/treasure.png'),
        micro:require('@/assets/images/micro.png'),

        checked1: false,
        checked:true,
        orderNo:'',
        money:''
      }
    },
    methods:{
      init(){
        this.orderNo=this.$route.query.orderNo;
        this.money=this.$route.query.money;
        this.id=JSON.parse(sessionStorage.getItem("userId"));
       }
    },
    created(){
        this.init();
    }
  }
</script>

<style type="text/scss" lang="scss" scoped>

  .contents{
    margin: 0 auto;
    width: 1200px;
    margin-top: 20px;
    .order:after{
      content: '';
      height: 0;
      width: 0;
      clear: both;
      display: block;
    }
    .order-one{
      font-size: 14px;
      float: left;
      margin-left: 10px;
    }
    .imgs{
      float: left;
    }
    .amount{
      font-size: 14px;
      float: right;
      margin-top: 11px;
      margin-right: 10px;
    }
    .amount1{
      font-size: 14px;
      float: right;
      margin-top: 3px;
      margin-right: 10px;
    }
    .money{
      font-size: 25px;
      color: #ff6000;
      float: right;
    }
    .order-two{
      float: left;
      margin-top: 22px;
      margin-left: -273px;
      font-size: 12px;
      color: #595959;
    }
    .con_title{
      font-size: 18px;
      margin-left: -570px;
      margin-top: 120px;
      color: #ff6000;
      float: left;
    }
    .xian{
      width: 160px;
      height: 2px;
      background-color: #ff6000;
      float: left;
      margin-top: 155px;
      margin-left:-590px ;
    }
    .xian1{
      width: 1040px;
      height: 2px;
      background-color: #e8e8e8;
      float: left;
      margin-top: 118px;
      margin-left: -1px;
    }
    .treasure{
      margin-top: 40px;
      float: left;
      margin-left: 20px;
      width: 1158px;
      height: 60px;
      line-height: 60px;
    }
    .micro{
      border: 2px solid #85a1d4;
      float: left;
      margin-left: 20px;
      width: 1158px;

      height: 60px;
      line-height: 60px;
    }
    .treasure-title{
      margin-top: 2px;
      float: left;
      margin-left: 20px;
    }
    .btn{
      float: left;
      margin-left: 1026px;
      margin-top: 30px;
    }
    .btns{
      background-color: #ff6000;
      color: #ffffff;
      line-height: 1px;
      width: 155px;
      height: 40px;
      border: none;
      outline: none;
      cursor: pointer;
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
.choose-way-box{
  height: 50px;
  border-bottom: 2px solid #e8e8e8;
  margin-top: 70px;
  line-height: 50px;
  .choose-way-txt{
    width: 100px;
    padding: 0 20px;
    border-bottom: 2px solid #ff6000;
    color:#ff6000;
    font-weight: bold;
  }
}
</style>
