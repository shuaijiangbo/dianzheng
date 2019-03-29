<template>
 <div class="bs-wp">
    <div class="banner-wrap">
      <img src="../../assets/login/bg_01.jpg" />
      <div class="desc-part">
        <div class="desc-con">
          <span class="lg-span" :class="{'active': formType == 'login'}" @click="changeType('login')">登 录</span>
          <span class="rg-span":class="{'active': formType == 'register'}" @click="changeType('register')">注 册</span>
        </div>
      </div>
    </div>
    <div class="form-wrap">
      <el-form :model="loginForm" v-if="formType == 'login'">
        <div class="line-wrap">
          <div class="col-bar title">
            <label class="line-title">用户名称</label>
          </div>
          <div class="col-bar input">
            <input type="text" class="base-pt" v-model="loginForm.name" maxlength="40" placeholder="请输入用户名称"/>
          </div>
        </div>
        <div class="line-wrap">
          <div class="col-bar title">
            <label class="line-title">密码</label>
          </div>
          <div class="col-bar input">
            <input type="text" class="base-pt" v-model="loginForm.password" maxlength="18" placeholder="请输入密码"/>
          </div>
        </div>
        <div class="line-wrap" style="margin-top:0;border: none;">
          <div class="col-bar" style="padding-left: 20px;"  @click="loginRemPsd">
            <span class="ckb-span" :class="{'checked': remPsd}"></span>
            <span style="font-size: 22px;vertical-align:-2px;"><label>记住密码</label></span>
          </div>
        </div>
        <div class="line-wrap" style="border: none">
          <el-button class="com-btn" @click="toLogin">登  录</el-button>
        </div>
      </el-form>
      <el-form :model="registerForm" v-if="formType == 'register'">
        <div class="line-wrap">
          <div class="col-bar title">
            <label class="line-title">用户名称</label>
          </div>
          <div class="col-bar input">
            <input type="text" class="base-pt" maxlength="32" placeholder="填写用户名称"/>
          </div>
        </div>
        <div class="line-wrap">
          <div class="col-bar title">
            <label class="line-title">设置密码</label>
          </div>
          <div class="col-bar input">
            <input type="text" class="base-pt" maxlength="18" placeholder="6-18位数字，字母组成"/>
          </div>
        </div>
        <div class="line-wrap">
          <div class="col-bar title">
            <label class="line-title">邮箱</label>
          </div>
          <div class="col-bar input">
            <input type="text" class="base-pt" maxlength="48" placeholder="填写邮箱"/>
          </div>
        </div>
        <div class="line-wrap">
          <div class="col-bar title">
            <label class="line-title">手机号码</label>
          </div>
          <div class="col-bar input">
            <input type="text" class="base-pt" maxlength="11" placeholder="填写手机号码"/>
          </div>
        </div>
        <div class="line-wrap">
          <div class="col-bar title">
            <label class="line-title">验证码</label>
          </div>
          <div class="col-bar input">
            <input type="text" class="base-pt" maxlength="8" placeholder="填写短信验证码" style="width: calc(100% - 170px);" />
            <el-button class="getCodeBtn btn-bgc">获取验证码</el-button>
          </div>
        </div>
        <div class="line-wrap" style="margin-top:0;border: none;">
          <div class="col-bar" style="padding-left: 20px;">
            <span class="ckb-span" :class="{'checked': acceptProtocol}" @click="rgAcceptPtl"></span>
            <span style="font-size: 22px;vertical-align:-2px;"><label @click="rgAcceptPtl">我已阅读并接受</label><a href="#" style="color: #ff6000;">《隐私权条例》</a></span>
          </div>
        </div>
        <div class="line-wrap" style="border: none">
          <el-button class="com-btn">立即注册</el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
  export default {
    name: "login",
    data() {
      return {
        formType: 'login',
        remPsd: true,
        acceptProtocol: true,
        loginForm: {
          name: '',
          password: ''
        },
        registerForm: {

        }
      }
    },
    methods: {
      toLogin() {
        this.$router.push('/match');
      },
      loginRemPsd() {
        this.remPsd = !this.remPsd;
      },
      rgAcceptPtl() {
        this.acceptProtocol = !this.acceptProtocol;
      },
      changeType(ftype) {
        this.formType = ftype;
      }
    }
  }
</script>

<style scoped lang="scss">
  .banner-wrap {
    position: relative;
    width: 100%;
    height: 3rem;
    > img {
      width: 100%;
      max-width: 100%;
      max-height: 100%;
    }
    .desc-part{
      position: absolute;
      left: 0;
      bottom: -0.35rem;
      width: 100%;
      height: 0.7rem;
      padding-left: 1.2rem;
      padding-right: 1.2rem;
      .desc-con{
        width: 100%;
        height: 100%;
        border-radius: 0.4rem;
        box-shadow: 0 10px 20px #fbbfb9;
      }
      span{
        position: relative;
        float: left;
        display: inline-block;
        width: 55%;
        height: 100%;
        line-height: 0.7rem;
        text-align: center;
        font-size: 28px;
        color: #666;
        background-color: #fff;
        &.lg-span{
          z-index: 99;
          border-radius: 0.4rem;
          &.active{
            color: #fff;
            background: linear-gradient(to right, #ff8942, #f01120);
            background: -moz-linear-gradient(to right, #ff8942, #f01120);
            background: -ms-linear-gradient(to right, #ff8942, #f01120);
            background: -webkit-linear-gradient(left, #ff8942, #f01120);
          }
        }
        &.rg-span{
          z-index: 98;
          margin-left: -10%;
          padding-left: 10%;
          border-bottom-right-radius: 0.4rem;
          border-top-right-radius: 0.4rem;
          &.active{
            color: #fff;
            background: linear-gradient(to right, #f6422e, #f01120);
            background: -moz-linear-gradient(to right, #f6422e, #f01120);
            background: -ms-linear-gradient(to right, #f6422e, #f01120);
            background: -webkit-linear-gradient(left, #f6422e, #f01120);
          }
        }
      }
    }
  }

  .form-wrap {
    margin-top: 0.6rem;
    padding-right: 0.5rem;
    padding-left: 0.5rem;
    .ckb-span{
      display: inline-block;
      width: 28px;
      height: 28px;
      border: 1px solid #b3b3b3;
      vertical-align: middle;
      &.checked{
        background: url("../../assets/login/checked.png") no-repeat center center;
      }
    }
    .getCodeBtn{
      width: 1.5rem;
      height: 0.48rem;
      max-width: 160px;
      text-align: center;
      font-size: 22px;
      color: #fff;
    }
  }

</style>
