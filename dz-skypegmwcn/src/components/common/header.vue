<template>
  <header :style="{ backgroundImage: 'url('+ headerBg +')'}">
    <div  class="header-content-box" >
      <img :src="logoImg" alt="">
    </div>
    <nav class="nav-lists">
      <ul class="navbar">
        <li v-for="(item,index) in active" :class="activeIndex==index?'active':''" @click="liactiveClick(index)">
          <router-link :to="{name:item.url,query:item.params}">
            {{item.name}}
          </router-link>
        </li>
      </ul>
    </nav>
  </header>
</template>
<script>
  export default {
    name: 'HelloWorld',
    data () {
      return {
        msg: 'Welcome to Your Vue.js App',
        logoImg:require('@/assets/images/logo.png'),
        headerBg:require('@/assets/images/top_backgroundpicu01.png'),
        logoEngImg:require('@/assets/images/eng_logo.png'),
        activeIndex:'',

        active:[
          {
            isTrue:false,
            name:'首页',
            url:'home',
          },
          {
            isTrue:false,
            name:'智慧城市解决方案',
            url:'itemLIst',
            params:{typeNumber:0}
          },
          {
            isTrue:false,
            name:'行业解决方案',
            url:'itemLIsthangye',
            params:{typeNumber:1}
          },
          {
            isTrue:false,
            name:'其他解决方案',
            url:'itemLIstqita',
            params:{typeNumber:2}
          },
          {
            isTrue:false,
            name:'智能技术',
            url:'itemLIstzhineng',
            params:{typeNumber:3}
          },
          {
            isTrue:false,
            name:'服务内容',
            url:'itemLIstfuwu',
            params:{typeNumber:4}
          },
          {
            isTrue:false,
            name:'基础平台产品',
            url:'itemLIstjichu',
            params:{typeNumber:5}
          },
          {
            isTrue:false,
            name:'关于我们',
            url:'aboutUs',
            params:{typeNumber:6}
          },
        ]
      }
    },
    methods:{
      liactiveClick:function (index) {
        this.active.map((x)=>{
          x.isTrue = false;
        })
        this.active[index].isTrue = true;
      }
    },
    watch:{
      $route(to,from){
        this.activeIndex=to.meta.first+1>=0?to.meta.first:(to.query.firstClassActiveIndex+1)?(to.query.firstClassActiveIndex+1):sessionStorage.index;
        sessionStorage.index=this.activeIndex;
        window.scrollTo(0,0);
      }
    },
    created() {
      this.activeIndex=sessionStorage.index||0;
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  type="text/scss" lang="scss" scoped>
  h1, h2 {
    font-weight: normal;
  }
  ul {
    list-style-type: none;
    padding: 0;
  }

  header {
    position: relative;
    background: #0e1730;
    background-repeat: no-repeat;
    background-size: contain;
    background-size: auto 46px;
  }

  .tools-box{
    margin-top: 30px;
  }
  .header-content-box{
    width: 1200px;
    height: 46px;
    margin: 0 auto;
    text-align: left;
    display: flex;
    align-items: center;
  }
  .nav-lists{
    background: #000;
    height: 46px;
  }
  .nav-lists ul{
    width: 1200px;
    margin: 0 auto;
    height: 100%;
  }
  .nav-lists li{
    height: 46px;
    line-height: 46px;
    width: 150px;
    float: left;
    color:#fff;
  }
  .nav-lists li.active{
    background:#034882;
  }

  .nav-lists li a{
    height: 46px;
    display: inline-block;
    width: 100%;
    color: #fff;
    font-size: 13px;
  }
  .nav-lists li:hover{
    background:#034882;
  }
  .logo-box {
    float: left;
    height: 60px;
    /*  padding: 20px 0;*/
  }
  .logo-box>div{
    float: left;
  }
  .logo-icon-box {
    margin-right: 15px;
  }
  .logo-txt-box {
    width: 258px;
    margin-top: 15px;
  }


</style>
