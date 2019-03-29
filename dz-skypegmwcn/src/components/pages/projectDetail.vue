<template>
  <div :key="times">
  <!-- 面包屑 -->
 <div class="breadcrumb">
    <ul>
      <li><img :src=home alt=""><a @click="jumpToIndex" href="javascript:void(0)">首页</a></li>
      <li><i class="iconfont">&#xe658;</i><a style="cursor: text"  href="javascript:void(0)">{{firstName}}</a></li>
      <li><i class="iconfont">&#xe658;</i><a style="cursor: text"  href="javascript:void(0)">{{perjectName}}</a></li>
    </ul>
  </div>
  <!-- 主要内容 -->
  <main :key="times">
    <div class="wrapper">
      <!-- 侧边栏 -->
      <aside>
       <img :src=small_backgroundpicu01 alt="">
        <ul>
          <li v-for="(item,index) in lists" @click="jumper(item.typeIndex)" :class="{active:newsId==index+1}">
            <i class="iconfont" :class="item.icon"></i>
            {{item.name}}
            <i class="iconfont">&#xe658;</i>
          </li>
        </ul>
      </aside>
      <!-- 内容 -->
      <section :key="times">
        <div class="title">
          <div></div>
          <h3 style="text-align: left">{{perjectName}}</h3>
        </div>
        <img :src="require('@/assets/images/itemlist/'+this.projectDetail.detailPic+'.jpg')"  alt="">
      </section>
    </div>
  </main>
  </div>
</template>
<script>
    import axios from 'axios';
    import url from '@/api/serviceAPI.config.js';
    export default {
        name: "newDetail",
        data(){
          return{
            imgUrl:'../../assets/images/itemlist/',
            perjectPic:'',
            newsId:'',
            home:require('@/assets/images/home.png'),
            small_backgroundpicu01:require('@/assets/images/small_backgroundpicu01.png'),
            detailPic:require('@/assets/images/small_backgroundpicu01.png'),
            firstName:'',
            times:new Date().getTime()+'',
          }
        },
      beforeCreate(){

      },
      created(){
        this.init();
      },
      methods:{
          init(){
            this.firstName=this.$route.query.name;
            this.newsId= this.$route.query.tabIndex;
            this.lists=JSON.parse(this.$route.query.lists);

            this.projectDetail=this.lists[this.newsId-1];
            this.perjectName=this.projectDetail.name;
          },
        jumper(newsId){
          this.$router.push({path:'projectDetail',query:{'tabIndex':newsId,'lists':this.$route.query.lists,'name':this.firstName}});
          this.init();
        },
        jumpToIndex(){
          this.$router.push({path:'/'})
        }
      },
      watch:{
        $route(to,from){
          this.init();
        }
      },
    }
</script>

<style type="text/scss" lang="scss" scoped>
  main .wrapper {
    width: 1200px;
    margin: 0 auto;
    overflow: hidden;
  }

  main .wrapper aside {
    float: left;
  }

  main .wrapper aside ul {
    width: 180px;
    display: flex;
    flex-direction: column;
  }

  main .wrapper aside ul li {
    padding: 0 10px;
    height: 37px;
    line-height: 37px;
    color: #474747;
    border: 1px solid #c9c9c9;
    border-top: 0;
    cursor: pointer;
    text-align: left;
    font-size: 13px;
  }

  main .wrapper aside ul li .iconfont {
    color: #474747;
    vertical-align: middle;
  }

  main .wrapper aside ul li a {
    padding-left: 5px;
  }

  main .wrapper aside ul li i:last-child {
    font-size: 10px;
    float: right;
  }

  main .wrapper aside ul li:hover,main .wrapper aside ul li.active {
    background: #1775d9;
    color: #fff;
  }

  main .wrapper aside ul li:hover a ,main .wrapper aside ul li.active a{
    color: #fff;
  }

  main .wrapper aside ul li:hover .iconfont,  main .wrapper aside ul li.active .iconfont {
    color: #f6fafe;
  }

  main .wrapper section {
    width: 1020px;
    float: left;
    padding-left: 15px;
    box-sizing: border-box;
    min-height: 467px;
  }

  main .wrapper section .title {
    line-height: 24px;
  }

  main .wrapper section .title div {
    width: 12px;
    height: 24px;
    background-color: #337de6;
    float: left;
    margin-right: 7px;
  }

  main .wrapper section .title h3 {
    font-size: 17.76px;
    color: #222222;
  }

  main .wrapper section img {
    width: 100%;
  }

  .breadcrumb ul {
    width: 1200px;
    margin: 0 auto;
    display: flex;
  }

  .breadcrumb ul .iconfont {
    font-size: 5px;
    color: #747474;
  }

  .breadcrumb ul img {
    margin-bottom: 3px;
  }

  .breadcrumb ul a {
    display: inline-block;
    padding: 0 13px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    color: #747474;
    font-size: 13px;
  }

  .breadcrumb ul a:hover {
    text-decoration: none;
  }
</style>
