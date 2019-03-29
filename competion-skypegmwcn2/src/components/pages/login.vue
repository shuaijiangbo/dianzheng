<template>
  <div class="content-box"  :style="{backgroundImage:'url('+backgroundImage+')'}">
    <!--<img :src=logoImg alt="" class="imgs">-->

    <div class="form-box login-form">
      <div >
        <span class="login_size">
      用户登录
      </span>
      </div>
      <div>
        <span class="login_size1">
        USER LOGIN
      </span>
      </div>

      <el-form  status-icon :rules="rules" :model="loginForm" class="form-register" ref="loginForm"  label-width="120px">
        <el-form-item :error="accountError" label="" prop="account">
          <el-input @focus="accountError=''" prefix-icon="iconfont icon-yonghuming"  v-model="loginForm.account" placeholder="请输入用户名或手机号" class="user_name"></el-input>
        </el-form-item>
        <el-form-item :error="pwdError" label="" prop="password">
          <el-input @focus="pwdError=''" prefix-icon="iconfont icon-icon-mima" @keyup.enter.native="submitForm('loginForm')" type="password" v-model="loginForm.password" placeholder="请输入登录密码" class="user_pwd"></el-input>
        </el-form-item>
        <!-- <el-form-item>
           <el-checkbox-group v-model="loginForm.agree">
             <el-checkbox label="记住密码" name="type" class="check"></el-checkbox>
           </el-checkbox-group>
         </el-form-item>-->
        <el-button class="login-now" :disabled="!allowLogin"  @click="submitForm('loginForm')">登录</el-button>
        <!--<el-button class="login-now" class=""  @click="submitForm('loginForm')">登录</el-button>-->
      </el-form>
      <div class="forget">
        <img :src=wx alt="" @click="weixin">
        <span @click="$router.push({path:'forgetpwd'})" style="color: #ff6f19;cursor: pointer;">忘记密码？</span>
      </div>
      <div class="names4">
        <span>还没有账号?</span>
        <span @click="jumper" style="color: #ff6f19;cursor: pointer;">立即注册</span>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import {get, post} from '@/api/fetch.js';
  import url from '@/api/serviceAPI.config.js';
  import {mapState,mapGetters,mapActions} from 'vuex';
  export default {
    name: "",
    data(){
      return{
        accountError: '',
        pwdError: '',
        allowLogin:true,
        logoImg:require('@/assets/images/users.png'),
        keys:require('@/assets/images/keys.png'),
        backgroundImage: require('@/assets/images/beijing.png'),
        the_pwd:require('@/assets/images/the_pwd.png'),
        wx:require('@/assets/images/wx.png'),
        timer:null,
        loginForm:{
          account:'',
          password:'',
          agree:''
        },
        rules:{
          account: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
          ],
          password:[
            { required: true, message: '请输入密码', trigger: 'blur' },
          ],
        }
      }
    },
    methods:{
      ...mapActions(["getUserMsg"]),
      jumper(){
        this.$router.push({path:'register'});
      },
      submitForm(formName) {

        //clearTimeout(this.timer);
        this.timer=setTimeout(()=>{
          this.$refs[formName].validate((valid) => {
            if (valid) {
              this.pwdError = this.accountError = '';

              post(url.personLogin,this.loginForm).then(res=>{
                if(res.status==200){
                  this.allowLogin=false;
                  this.$notify({
                    title: '登录成功',
                    type: 'success',
                    duration:2000,
                    onClose:()=>{
                      sessionStorage.setItem('user', JSON.stringify(res.data));
                      sessionStorage.setItem('type', JSON.stringify(res.data.type));
                     /* if(res.data.type==3)this.$router.push({path:'index/personal/count'});*/
                       this.$router.push({path:'index/chooseComponents'});
                    }
                  });
                }else{
                  if(res.message === '密码错误') {
                    this.pwdError = '密码错误';
                  } else {
                    this.accountError = '用户名不存在'
                  }
                  this.$notify({
                    title: '登录失败',
                    message: res.message,
                    type: 'error',
                    duration:2500,
                  });
                }
              }).catch(err=>{
                console.log(err);
              })
            }else {
              return false;
            }
          });
        },50)
      },
      weixin(){
        this.$message({
          message: '暂未开放',
          type: 'warning'
        });
      }
    },
    created(){
      /*store.dispatch('getUserMsg');*/

    }
  }
</script>

<style type="text/scss" lang="scss" scoped>
  .content-box{
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-size: 100%;
    width: 100%;
    height: 100%;
    background-size: 100% 100%;
    .form-box{
      width: 500px;
      margin-left: 60.7%;
      margin-top: 16%;
    }
    .form-register{
      width: 300px;
    }
    .user_name{

    }
  }
  .login_size{
    font-size: 18px;
    color: #ff6f18;
  }
  .login_size1{
    font-size: 12px;
    color:#b2b2b2;
  }
  .login-register .el-input__inner{
    border-radius: 0;
    height: 40px;
    line-height: 50px;
  }

  .user_name{
    position: relative;
    font-size: 14px;
    display: inline-block;
    width: 176%;
    margin-left: -119px;
    margin-top: 30px;
    height:53px;
  }
  .user_pwd{
    position: relative;
    font-size: 14px;
    display: inline-block;
    width: 176%;
    margin-left: -119px;
    margin-top: 10px;
  }

  .check{
    margin-left: -119px;
  }
  .el-button.login-now{
    width: 316px;
    background: #ff6000;
    color: #fff;
    height: 50px;
    font-size: 18px;
    margin-left: 120px;
    margin-left: 0px;
  }

  .forget {
    width: 316px;
    line-height: 34px;
  }
  .forget span {
    float: right;
  }
</style>
