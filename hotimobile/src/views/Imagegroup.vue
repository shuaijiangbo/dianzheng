<template>
  <div class="imagegroup">
    <h3>{{datas.title}}</h3>
    <p class="time">HOTi官网 <span>2018-12-07 11:01</span><Button @click.native="$router.push({path: '/moreimage',})" type="warning" >更多精彩</Button></p>
    <p class="content">{{datas.content}}</p>
    <div v-for="(image, index) in datas.images" :key="index">
      <img :src="image.src" alt="">
      <p>{{image.desc}}</p>
    </div>
  </div>
</template>

<script>
import { Button } from 'vant'
  export default {
    components: {
      Button,
    },
    data() {
      return {
        
      } 
    }, 
    computed: {
      datas() {
        return JSON.parse(this.$route.query.datas)
      }
    }
  }
</script>

<style scoped lang="scss">
  .van-button {
    height: px2rem(55px);
    line-height: px2rem(55px);
    padding: 0 px2rem(10px);
    width: px2rem(160px);
    font-size: px2rem(20px);
    float: right;
  }

  .imagegroup {
    padding: px2rem(25px) px2rem(10px);

    h3 {
      font-size: px2rem(40px);
    }
    p.time {
      line-height: px2rem(55px);
      overflow: hidden;
      color: #8a8b8c; 
      padding: px2rem(17px) 0px;
      padding-right: px2rem(30px);
      span {
        margin-left: px2rem(15px);
      }

    }
    p.content {
      padding: px2rem(17px) px2rem(30px);
      border-top: 1px solid #dddddd;
      text-indent: 2em;
      color: #333333;
      font-size: px2rem(30px)
    }
    >div {
      display: flex;
      flex-direction: column;
      align-items: center;
      img {
        max-width: 100%;
        margin-bottom: px2rem(10px);
      }
      padding: px2rem(20px) px2rem(30px);
    }
  }
</style>
