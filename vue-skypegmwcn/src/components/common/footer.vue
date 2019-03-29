<template>
  <div class="footer-box">
    <div class="botton-logo">
      <img style="margin-top: 28px" :src="button_logo"/>
    </div>

    <span class="jiesao">协会介绍</span>
    <span class="fazhan">协会发展</span>


    <span class="gusi">四川田径故事</span>
    <span class="guize">田径规则</span>

    <span class="baomin">赛事报名</span>

    <span class="saishijiesao">赛事介绍</span>
    <span class="gongao">赛事公告</span>
    <span class="xinxi">成绩信息</span>
    <span class="chaxun">成绩查询</span>

    <span class="gongshi">Copyright2018-2019China Sichuan Athletic Association.All rights reserved.</span>
    <span class="gongshi" style="margin-top: 213px">四川省田径协会版权所有.渝ICP备18004163号-2</span>
    <span class="gongshi" style="margin-top: 240px">本网站由豪体体育发展有限公司提供制作及技术支持</span>

    <img style="margin-top: 16px;margin-left: 132px;" :src="footer"/>

  </div>

</template>
<script>
  export default {
    data(){
      return{
        button_logo:require('@/assets/images/button-logo.png/'),
        footer:require('@/assets/images/footer.png'),
      }
    },
    mounted() {

    }
  }
</script>

<style type="text/scss" lang="scss" scoped>
  .footer-box{
    width: 100%;
    background-color: black;
    height: 336px;
  }

  .botton-logo{
    width: 300px;
    height: 280px;
    position: relative;
    background: #fff;
    text-align: center;
    top: -20px;
    float: left;
    margin-left:357px;
  }

  .botton-logo:after {
    content: "";
    position: absolute;
    top: 0;
    right: -42px;
    display: inline-block;
    border-width: 20px 21px 0px;
    border-style: solid;
    border-color: transparent transparent transparent #dfdfdf;
  }

  span{
    color: white;
  }
  .jiesao{

    margin-top: 24px;
    margin-left: 36px;
    float: left;
  }

  .fazhan{
    float: left;
    margin-left: -64px;
    margin-top: 50px;
  }

  .gusi{

    margin-top: 24px;
    margin-left: 128px;
    float: left;
  }

  .guize{
    float: left;
    margin-left: -96px;
    margin-top: 50px;
  }

  .baomin{

    margin-top: 24px;
    margin-left: 96px;
    float: left;
  }

  .saishijiesao{

    margin-top: 24px;
    margin-left: 138px;
    float: left;
  }

  .gongao{
    float: left;
    margin-left: -64px;
    margin-top: 50px;
  }

  .xinxi{
    float: left;
    margin-left: -64px;
    margin-top: 75px;
  }

  .chaxun{
    float: left;
    margin-left: -64px;
    margin-top: 99px;
  }

  .gongshi{
    float: left;
    margin-left: -650px;
    margin-top: 186px;
    font-size: 14px;
    color: #7D7D7D;
  }

</style>
