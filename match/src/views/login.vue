<template>
  <div class="content-box login-container" :style="{backgroundImage:'url('+backgroundImage+')'}">
    <div class="login-box">
      <div class="login-title">&nbsp; 登录</div>

      <el-form
        status-icon
        :rules="rules"
        :model="loginForm"
        class="form-register"
        ref="loginForm"
        label-width="120px"
      >
        <el-form-item :error="accountError" label prop="account">
          <el-input
            @focus="accountError=''"
            prefix-icon="iconfont icon-yonghuming"
            v-model="loginForm.account"
            placeholder="用户名"
          ></el-input>
        </el-form-item>
        <el-form-item :error="pwdError" label prop="password" style="margin-top: 20px">
          <el-input
            @focus="pwdError=''"
            prefix-icon="iconfont icon-icon-mima"
            @keyup.enter.native="submitForm('loginForm')"
            type="password"
            v-model="loginForm.password"
            placeholder="密码"
            class="user_pwd"
          ></el-input>
        </el-form-item>

        <el-form-item>
          <el-checkbox-group v-model="loginForm.agree">
            <el-checkbox label="自动登录" name="type" class="check"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>

        <div class="login-password">忘记密码？</div>

        <el-button :loading="loginLoading" class="login-now" :disabled="!allowLogin" @click="submitForm('loginForm')">登录</el-button>
      </el-form>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: "",
  data() {
    return {
      loginLoading: false,
      accountError: "",
      pwdError: "",
      allowLogin: true,
      backgroundImage: require("@/assets/login.png"),
      timer: null,
      loginForm: {
        account: "",
        password: "",
        agree: ""
      },
      rules: {
        account: [{ required: true, message: "请输入用户名", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
      }
    };
  },
  methods: {
    ...mapActions('match/account', ['login']),
    jumper() {
      this.$router.push({ path: "register" });
    },
    submitForm(formName) {
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.$refs[formName].validate(valid => {
          if (valid) {
            this.pwdError = this.accountError = "";
            this.loginLoading = true
            this.login({
              vm: this,
              account: this.loginForm.account,
              password: this.loginForm.password
            }).then(() => {
              this.loginLoading = false
              // 重定向对象不存在则返回顶层路径
              this.$router.replace(this.$route.query.redirect || '/')
            }).catch(err => {
              this.loginLoading = false
            })
          } else {
            return false;
          }
        });
      }, 500);
    },
    weixin() {
      this.$message({
        message: "暂未开放",
        type: "warning"
      });
    }
  },
  created() {}
};
</script>

<style type="text/scss" lang="scss" scoped>
.content-box {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-size: 100%;
  width: 100%;
  height: 100%;
  background-size: 100% 100%;
  .form-box {
    width: 500px;
    margin-left: 60.7%;
    margin-top: 16%;
  }
  .form-register {
    width: 510px;
    margin-left: -21.5%;
    margin-top: 5%;
  }
  .login-box {
    width: 440px;
    height: 420px;
    background-color: white;
    margin-left: 54.68%;
    margin-top: 13.48%;
  }
  .login-title {
    margin-left: 15px;
    color: #ed6d26;
    font-size: 20px;
    border-bottom: 1px solid #cecece;
    padding: 20px 0 10px 0;
    width: 408px;
  }
  .login-xian {
    width: 406px;
    height: 1px;
    background-color: red;
    border: 1px;
    margin-left: 17px;
    margin-top: 10px;
  }
  .login-name {
    height: 60px;
  }
  .login-password {
    color: #f49366;
    font-size: 15px;
    margin-left: 430px;
    margin-top: -56px;
  }
  .login-now {
    width: 394px;
    background-image: linear-gradient(to left, #e22124, #ed6d26);
    color: #fff;
    height: 50px;
    font-size: 18px;

    margin-left: 118px;
    margin-top: 30px;
  }
}
</style>
