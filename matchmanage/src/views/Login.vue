<template>
  <div class="ypt-container" >
    <div class="ypt-background-One"><img :src="login_backgroundpic" style="width:100%;height:100%" /></div>
    <div class="login_bottom"><img :src="login_bottom" /></div>

    <div class="ypt-login-content">
      <div class="ypt-title"><img :src="login_titlepic" /></div>
      <div class="ypt-contentu01">

        <div class="login-box">

          <div class="ypt-box" :style="{backgroundImage: 'url('+login_boxu01+')'}">



            <div class="dz_login_box">

              <div class="ypt-login-title"><img :src="login_right_titlepicu01" /></div>
              <div class="pdsdata-login-input" style="margin-top:15px;">



                <input autofocus v-model="username" name="" class="pdsdd-gr-input pds-gr-input-user" type="text"  :style="{backgroundImage: 'url('+login_iconu01+')'} "/>
                <input v-model="password" name="" class="pdsdd-gr-input pds-gr-input-poww"  type="password" :style="{backgroundImage: 'url('+login_iconu02+')'} "/>
                <input v-model="code" name="" class="pdsdd-gr-input pds-gr-input-yzm"  type="text" :style="{backgroundImage: 'url('+login_iconu03+')'} "/>
                <img :src="login_yzmpicu01"  class="login_yzmpic"/>
                <div class="clear"></div>
                <div class="pdsyzm-content" style="margin-top: 12px;">
                  <a class="pdsdata-input-btn" @click="login">{{btnText}}</a>
                </div>


              </div>
            </div>
          </div>

          <div class="login_leftpic"><img :src="login_leftpicu01" /></div>
          <div class="login_rightpic"><img :src="login_rightpicu01" /></div>

        </div>


      </div>


    </div>
  </div>
</template>

<script>
import util from '@/common/util.js'
import { system } from '@/api/api'
  export default {

    data() {
      return {
        login_backgroundpic:require('@/assets/login_backgroundpic.jpg'),
        login_bottom:require('@/assets/login_bottom.png'),
        login_boxu01:require('@/assets/login_boxu01.png'),
        login_btn:require('@/assets/login_btn.png'),
        login_btn_active:require('@/assets/login_btn_active.png'),
        login_btn_hover:require('@/assets/login_btn_hover.png'),
        login_iconu01:require('@/assets/login_iconu01.png'),
        login_iconu02:require('@/assets/login_iconu02.png'),
        login_iconu03:require('@/assets/login_iconu03.png'),
        login_leftpicu01:require('@/assets/login_leftpicu01.png'),
        login_right_titlepicu01:require('@/assets/login_right_titlepicu01.png'),
        login_rightpicu01:require('@/assets/login_rightpicu01.png'),
        login_titlepic:require('@/assets/login_titlepic.png'),
        login_yzmpicu01:require('@/assets/login_yzmpicu01.png'),
        username: '',
        password: '',
        code: '',
        isLoading: false,
      }
    },
    computed: {
      btnText() {
        if (this.isLoading) return '登录中...';
        return '立即登录';
      }
    },
    methods: {
      // 登录
      login() {
        if(!this.username) {
          this.$message({
            message: '请填写用户名！',
          })
          return;
        }
        if(!this.password) {
          this.$message({
            message: '请填写密码！',
          })
          return;
        }
        // 1. 调用登陆接口判断是否成功
        // 2. 正确就存储用户信息到sessionStorage并触发login事件，父组件(App)执行loginDirect方法
        // 3. loginDirect() 执行 signin(cb) ---> signin() 获取用户权限并执行cb里的路由跳转 
        this.isLoading = true;
        system.dologin.r({account: this.username, pwd: this.password}).then(res => {
          util.session('user', res.data);
          this.$emit('login', this.$router.currentRoute.query.from);
          this.isLoading = false; 
        }).catch(res => {
          this.isLoading = false;
        })
        
      }
    },
  }
</script>

<style type="text/scss" lang="scss" scoped>
  div,form,input,table,p,h1,h2,textrea,body,ul,li,iframe{margin:0px;padding:0px;}
  body,table,div,td,input,textarea{
    font-size: 12px;
    font-family: verdana,"宋体";
    color: #333;
    margin: 0px;
    padding: 0px;
  }
  html,body{
    height: 100%;
  }
  ul,li{
    list-style-type: none;
  }
  a{color:#333;text-decoration:none;}
  a:hover{
    text-decoration: none;
    color: #3399ee;
  }
  img{
    border-top-width: 0px;
    border-right-width: 0px;
    border-bottom-width: 0px;
    border-left-width: 0px;
  }

  #container {
    height:100%; width:100%; overflow:hidden;
  }

  .clear{clear:both;}
  .ypt-container {
    min-height: 100%;
    height: auto !important;
    height: 100%; /*IE6不识别min-height*/
    position: relative;

    overflow: hidden;
    background-size: 100% 100%;
  }

  .ypt-background-One{
    position: fixed;
    height: 100%;
    width: 100%;
    top: 0px;
    bottom: 0px;
    z-index: 0;
    overflow: hidden;
  }
  .ypt-login-content{
    width:1200px;
    margin:7% auto 0px;

    overflow:hidden;
    position: relative;
    z-index: 1;
  }
  
  .ypt-title {
    overflow:hidden;
    text-align: center;
  }
  .ypt-left{
    float:left;
    overflow:hidden;
  }
  .ypt-box{
    width:638px;
    height:393px;

    background-position: 0 0;
    background-repeat: no-repeat;
    margin: 30px auto 0px;
    overflow: hidden;
    position: relative;
  }

  .pdsdata-login-input {
    width: 353px;
    margin-right: auto;
    margin-left: auto;
  }
  .pdsdd-gr-input {
    height: 38px;
    width: 288px;
    line-height: 38px;
    font-size: 14px;
    padding-left: 60px;
    margin-top:10px;
    background: #010a11;
    color: #a4a5a5;
    border: 2px solid #13a6f6;
    display: block;
    background-repeat: no-repeat;
    background-position: 0px 0px;
    margin: 22px auto;
  }
  .pds-gr-input-user {

    background-position: left -4px;
  }

  .pds-gr-input-poww {
    //background-image: url(../images/login_iconu02.png);
    background-position: left -3px;
  }
  .pds-gr-input-yzm {
    //background-image: url(../images/login_iconu03.png);
    background-position: left -4px;
    width: 152px;
    float: left;
    margin: 0px;
  }

  .pdsdata-input-text {
    float: left;
    cursor: pointer;
    color: #419ef7;
    font-size: 13px;
    margin-top: 20px;
    margin-left: 8px;
  }
  .pdsdata-input-btn {
    font-size: 18px;
    line-height: 48px;
    color: #FFF;
    //background-image: url(../images/login_btn.png);
    background-repeat: no-repeat;
    background-position: -2px 0px;
    height: 48px;
    width: 352px;
    display: block;
    text-align: center;
    cursor: pointer;
    margin: 0 auto;
    padding: 0px;
    font-family:"微软雅黑";

    background:linear-gradient(to right,#04bef4, #4564e1)
  }
  .pdsdata-input-btn:hover {
    //background-image: url(../images/login_btn_hover.png);
    color: #FFF;
  }
  .pdsdata-input-btn:active {
   // background-image: url(../images/login_btn_active.png);
    color: #FFF;
  }
  .pdsyzm-content {
    clear: both;
    overflow: hidden;
  }
  .ypt-login-title {
    text-align:center;
    margin: 31px 0px;
  }

  .login-box {
    position:relative;
    padding-bottom: 100px;
    margin-top: 50px
  }
  .login_leftpic {
    position: absolute;
    top: -145px;
    left: -67px;
    z-index: -1;
  }
  .login_rightpic {
    position: absolute;
    top: -36px;
    right: -37px;
    z-index: -1;
  }
  .login_bottom {
    position: absolute;
    bottom: -66px;
    left: 50%;
    margin-left: -364px;
    z-index: 0;
  }
  .login_yzmpic {
    float: left;
    margin-left: 10px;
  }

</style>
