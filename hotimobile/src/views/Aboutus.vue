<template>
  <div class="wrapper">
    <div class="watermark"></div>
      <div class="top"></div>
      <div class="service">
        <span class="one">SAAS服务</span>
        <span class="two">互联网</span>
        <span class="three">体育</span> 
        <img src="@/assets/images/aboutus3.png" alt="">
      </div>

      <div class="titleimage">
        <ul>
          <li v-for="(data, index) in $router.options.routes.filter((r)=>r.name==$route.name)[0].query.datas" :key="index">
            <div class="title">
              <img src="@/assets/images/divbg2.png" alt="">
              <h3>{{data.title}}</h3>
            </div>
            <img v-for="(img, index) in data.images" :key="index" :src="img" alt="">
          </li>
        </ul>
      </div>

      <ul class="friend">
        <li><img src="@/assets/images/hagongdajiqi.jpg" alt=""></li>
        <li><img src="@/assets/images/huawei.jpg" alt=""></li>
        <li><img src="@/assets/images/zhongkeyuan.jpg" alt=""></li>
        <li><img src="@/assets/images/zhongdianke.jpg" alt=""></li>
        <li><img src="@/assets/images/weishi.jpg" alt=""></li>
        <li><img src="@/assets/images/supermap.jpg" alt=""></li>
        
        <li><img src="@/assets/images/chongyou.jpg" alt=""></li>
        <li><img src="@/assets/images/hagongda.jpg" alt=""></li>
        <li><img src="@/assets/images/xiamendaxue.jpg" alt=""></li>
        <li><img src="@/assets/images/shenzhendaxue.jpg" alt=""></li>
        <li><img src="@/assets/images/soft.jpg" alt=""></li>
        <li><img src="@/assets/images/langchao.jpg" alt=""></li>
        <li><img src="@/assets/images/hualu.jpg" alt=""></li>
      </ul>
  </div>
</template>

<script>
  export default {
    data() {
      return {

      }
    },
  }
</script>

<style scoped lang="scss">
  .wrapper {
    box-sizing: border-box;
    background-color: #f6f9fc;
    position: relative;
    .watermark {
      position: absolute;
      top: 0;
      height: 100%;
      width: 100%;
      background: url('../assets/images/shuiyin.png');
    }
    .top {
      background: url('../assets/images/topbg2_03.jpg') no-repeat;
      background-size: 100% 100%;
      height: px2rem(256px);
    }
    .service {
      text-align: center;
      position: relative;
      height: px2rem(354px);
      line-height: px2rem(354px);
      img {
        width: px2rem(195px);
      }
      span {
        position: absolute;
        width: px2rem(210px);
        height: px2rem(67px);
        background: url('../assets/images/divbg3.png') no-repeat;
        background-size: 100% 100%;
        color: #fff;
        font-size: px2rem(24px);
        line-height: px2rem(67px);
      }
      .one {
        left: px2rem(40px);
        top: 50%;
        transform: translateY(-50%);
      }
      .two {
        top: px2rem(30px);
        left: px2rem(400px);
      }
      .three {
        right: px2rem(40px);
        bottom: px2rem(100px);
      }
    }
  }

  .titleimage {
    position: relative;
    ul {
      background-color: #f6f9fc;
      li {
        padding: px2rem(40px) 0;
        text-align: center;
        div.title {
          position: relative;
          height: px2rem(130px);
          line-height: px2rem(130px);
          text-align: center;
          margin-bottom: px2rem(20px);
          img {
            position: absolute;
            width: px2rem(145px);
            left: px2rem(40px);
          }
          h3 {
            display: inline-block;
            width: px2rem(523px);
            height: px2rem(73px);
            background: url('../assets/images/divbg1.jpg') no-repeat;
            background-size: 100% 100%;
            line-height: px2rem(73px);
            text-align: center;
            color: #fff;
            font-size: px2rem(20px);
            font-weight: normal;       
          }
        }
        >img {
          width: 96%;
          +img {
            margin-top: px2rem(45px);
          }
        }
      }
    }
  }
  
  ul.friend {
    overflow: hidden;
    text-align: center;
    // display: flex;
    // flex-wrap: wrap;
    // justify-content: center;
    li {
      display: inline-flex;
      align-items: center;
      width: px2rem(290px);
      height: px2rem(200px);
      margin: px2rem(10px);
      img {
        max-width: 100%;
        max-height: 100%;
      }
      &:last-child {
        width: px2rem(580px);
        position: relative;
        bottom: px2rem(30px);
      }
    }
  }
  
</style>
