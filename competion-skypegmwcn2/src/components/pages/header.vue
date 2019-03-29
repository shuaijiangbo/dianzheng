<template>
  <div id="">
    <header :style="{backgroundImage:`url(${headerBg})`}">
      <div class="header-content-box">
        <img :src=logoImg alt="">
        <div class="pull-right tools-box">
          <span>欢迎您，{{userName}}</span>
          <span class="split-line ml15">|</span>
          <el-dropdown>
          <span class="el-dropdown-link" style="color: #fff;cursor: pointer">
            <i class="iconfont icon-tianchongxing-"></i>
            个人中心
          </span>
            <el-dropdown-menu  slot="dropdown">
              <el-dropdown-item @click.native="jumper('/index/personal/payOrderList')">订单管理</el-dropdown-item>
              <el-dropdown-item @click.native="jumper('/index/personal/count')">个人信息</el-dropdown-item>

              <el-dropdown-item @click.native="jumper('/index/accountSet')">修改密码</el-dropdown-item>
              <el-dropdown-item @click.native="jumper('/index/applyPage')">等级测试报名</el-dropdown-item>

            </el-dropdown-menu>
          </el-dropdown>
          <span class="split-line mr15" >|</span>
          <span @click="logout" style="cursor: pointer"> <i  class="iconfont icon-dianyuan"></i>退出</span>
        </div>
      </div>
    </header>
  </div>
</template>

<script>
  import {get, post} from '@/api/fetch.js';
  import url from '@/api/serviceAPI.config.js';
  import {mapState,mapGetters,mapActions} from 'vuex';
  export default {
    name: "",
    data(){
      return{
        logoImg:require('@/assets/images/logo.png'),
        headerBg:require('@/assets/images/header_bg.png'),
        userName: ''
      }
    },
    mounted() {
      this.userName = JSON.parse(sessionStorage.getItem("user")).account||'';
    },
    methods:{
   /*   ...mapActions(["getUserMsg"]),*/
      jumper(url){
        this.$router.push({path:url,query:{}})
      },
      logout() {
        post(url.doLogout).then(res => {
          if(res.status == 200){
            sessionStorage.removeItem("user");
            this.$router.push('/login');
          }else{
            this.$notify({
              title: res.message,
              type: 'error'
            });
          }
        });
      },
      getUserMsg (){
        let user=JSON.parse(sessionStorage.getItem('user'));
        post(url.getUserInfo,{id:user.id}).then(res => {
          sessionStorage.setItem('type', JSON.stringify(res.account.type));
          sessionStorage.setItem( 'userId',JSON.stringify(res.data.id));
        });
      }
    },
    created(){
      this.getUserMsg();
    },
    computed:{
   /*   ...mapState(["id"]),
      ...mapGetters(["count"]),*/
    },
    watch:{
       $route(to,from){
         let user=JSON.parse(sessionStorage.getItem('user'));
         post(url.getUserInfo,{id:user.id}).then(res => {
           sessionStorage.setItem('type', JSON.stringify(res.account.type));
           sessionStorage.setItem( 'userId',JSON.stringify(res.data.id));
         });
       }
    },
  }
</script>

<style type="text/scss" lang="scss" scoped>
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
    .split-line.ml15{
      margin-left: 15px;
    }
    .split-line.mr15{
      margin-right: 15px;
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
  div{
    color: #000;
  }

</style>
