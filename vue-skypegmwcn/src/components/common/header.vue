<template>
  <header>
      <div class="header-content-box">
          <div class="logo-box">
            <div class="logo-icon-box">
              <img :src="logoImg" alt="">
            </div>
            <div class="logo-txt-box">
              <img :src="logoChaImg" alt="">
              <img :src="logoEngImg" alt="">
            </div>
          </div>
        <div class="pull-right tools-box">
          <router-link :to="{name:'regist',params:{username:'jspang'}}">
            <button class="button-default button-radius">注册</button>
          </router-link>
          <router-link :to="{name:'login',params:{username:'jspang'}}">
            <button class="button-color1 button-radius" >登录</button>
          </router-link>
        </div>
      </div>

    <div class="nav-lists">
      <ul>
        <!--<li v-for="(item,index) in active" :class="{active:item.isTrue}" @click="liactiveClick(index)">
          <router-link :to="{name:item.url}">
            {{item.name}}
          </router-link>
        </li>-->
        <li v-for="(item,index) in active" :class="activeIndex==index?'active':''" @click="liactiveClick(index)">
          <router-link :to="{name:item.url}">
            {{item.name}}
          </router-link>
        </li>
      </ul>
    </div>
  </header>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      logoImg:require('@/assets/images/logo.png'),
      logoChaImg:require('@/assets/images/chinese_logo.png'),
      logoEngImg:require('@/assets/images/eng_logo.png'),
      activeIndex:'',

      active:[
        {
          isTrue:false,
          name:'首页',
          url:'home',
          params:"username:'jspang'"
        },
        {
          isTrue:false,
          name:'协会公告',
          url:'regist',
          params:"username:'jspang'"
        },
        {
          isTrue:false,
          name:'赛事资讯',
          url:'searchList',
          params:"username:'jspang'"
        },
        {
          isTrue:false,
          name:'报备赛事',
          url:'notice',
          params:"username:'jspang'"
        },
        {
          isTrue:false,
          name:'赛事服务',
          url:'regist',
          params:"username:'jspang'"
        },
        {
          isTrue:false,
          name:'图片、视频',
          url:'media',
          params:"username:'jspang'"
        },
        {
          isTrue:false,
          name:'田径故事',
          url:'history',
          params:"username:'jspang'"
        },
        {
          isTrue:false,
          name:'关于协会',
          url:'regist',
          params:"username:'jspang'"
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
      this.activeIndex=to.meta.first;
      console.log(this.activeIndex);
      window.scrollTo(0,0);
    }
  },
  created() {
    this.activeIndex=this.$route.meta.first;
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
  height: 155px;
/*  background: url(/static/images/header.png) no-repeat center center;
  background-size: cover;*/
}

.tools-box{
  margin-top: 30px;
}
.header-content-box{
  width: 1200px;
  height: 90px;
  margin: 0 auto;
  background: #fff;
}
.nav-lists{
  background: #000;
  height: 65px;
}
.nav-lists ul{
  width: 1200px;
  margin: 0 auto;
  height: 100%;
}
.nav-lists li{
  height: 65px;
  line-height: 65px;
  width: 150px;
  float: left;
  color:#fff;
}
.nav-lists li.active{
  background:$base_color;
}

.nav-lists li a{
  height: 65px;
  display: inline-block;
  width: 100%;
  color: #fff;
}
.nav-lists li:hover{
  background:$base_color ;
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
