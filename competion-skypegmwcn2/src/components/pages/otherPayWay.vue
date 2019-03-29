<template>
  <div id="">
      <div class="contents">
        <p class="title-box">
          <span class="title">平台展示支付方式</span>
          <button class="back-btn" @click="back">返回</button>
        </p>
        <div v-html="chargesInfo">

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
        this.chargesInfo=this.$route.query.chargesInfo;
        this.id=JSON.parse(sessionStorage.getItem("userId"));
       },
      back(){
        this.$router.go(-1);
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
    .title-box{
      margin-bottom: 20px;
      .title{
        position: relative;
        padding-left: 10px;
        margin-bottom: 20px;
      }
      .title:before{
        content: "";
        height: 18px;
        border-left: 4px solid #ff6000;
        display: block;
        position: absolute;
        top: 3px;
      }
      .back-btn{
        background:#ff6000;
        display: inline-block;
        float: right;
        color: #fff;
        width: 70px;
        height: 30px;
        border: none;
        border-radius: 2px;
        cursor: pointer;
      }
    }

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
