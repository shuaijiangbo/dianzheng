<template>
  <div id="" class="content">
    <div class="content-box">
      <div class="left-item-box">
        <p class="totle-title">账户中心</p>
        <div v-for="(item,index) in list">
          <p class="two_title">{{item.firstName}}</p>
          <ul>
            <li :class="secondItem.link==activeIndex?'active':''" v-for="secondItem in item.children" >
              <i class="el-icon-arrow-right icon-jiantou"></i>
              <router-link :to="{name:secondItem.link}" class="link">
                {{secondItem.secondName}}
              </router-link>
            </li>
          </ul>
        </div>
      </div>
      <div class="right-content-box">
        <transition>
          <router-view />
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
  import {get, post} from '@/api/fetch.js';
  import url from '@/api/serviceAPI.config.js';
  import blue from '@/assets/images/blue.png';
  import yello from '@/assets/images/yello.png';
  export default {
    name: "",
    data(){
      return{
        blue :require('@/assets/images/blue.png'),
        list:[
          {
            firstName: '我的报名',
            children: [
              {secondName:'报名信息',link:'orderList'},
            ]
          },
          {
            firstName:'交易中心',
            children:[
              {secondName:'订单管理',link:'payOrderList'}
            ]
          },{
            firstName:'账户信息',
            children:[
              {secondName:'完善信息',link:'count'},
              {secondName:'我的运动生涯',link:'athleticCareer'}
            ]
          }
        ]
      }
    },
    methods:{
      changeActive(){
        this.activeIndex=this.$route.meta.second;
      },
    },
    created(){
      this.changeActive();
    },
    watch:{
    $route(to,from){
      this.activeIndex=to.meta.second;
    }
  }
  }
</script>

<style type="text/scss" lang="scss" scoped>
  .content{
    width: 100%;
    .content-box{
      width: 1200px;
      margin: 0 auto;
      margin-top: 20px;
      .left-item-box{
        width: 200px;
        margin-right: 10px;
        border: 1px solid #dddddd;
        float: left;
        .totle-title{
          height: 32px;
          line-height: 32px;
          padding-left:10px ;
          background-image: linear-gradient(to  top,#ff6102,#ff873f);
          color: #ffffff;
          font-size: 14px;
        }
      }
      .right-content-box{
        width: 988px;
        float: right;
      }
      .two_title{
        font-size: 12px;
        color: #333333;
        padding-left: 20px;
        border-bottom: 1px solid #dddddd;
        border-top:1px solid #dddddd;
        height: 30px;
        line-height: 30px;
        background-image: linear-gradient(to  top,#fcfbfc,#fbfbfb);
      }
      .link{
        font-size: 12px;
        color: #767676;
        padding-left: 0px;
        height: 30px;
        line-height: 30px;
      }

      .icon-jiantou{
        margin-left: 36px;
        font-size: 12px;
        color: #4ca6c1;
      }
      .active {
        .icon-jiantou{
          float: right;
          margin: 10px 10px;
          color: #ff873f;
        }
        .link{
          margin-left: 42px;
        }
      }
    }
  }
.active{
  background: #f5f5f5;
  border-left: 2px solid #ff873f;
  margin-left: -1px;
}
</style>
