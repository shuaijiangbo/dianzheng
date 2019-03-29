<template>
  <div>
    <headnav></headnav>
    <div class="content">
      <div class="content-box">
        <el-form status-icon :rules="rules" :model="formRegister" class="form-register" ref="formRegister"  label-width="120px">
          <el-form-item label="新密码：" prop="password">
            <el-input type="password" v-model="formRegister.password" placeholder="请输入新密码（8-16位数字或字母或特殊符号）"></el-input>
          </el-form-item>
          <el-form-item  label="密码确认：" prop="checkPass">
            <el-input type="password" v-model="formRegister.checkPass" placeholder="请输入确认密码"></el-input>
          </el-form-item>
          <el-form-item label="手机号码：" prop="tel">
            <el-input v-model="formRegister.tel" placeholder="请输入手机号码"></el-input>
          </el-form-item>
          <el-form-item label="手机验证码：" prop="vcode" class="phone-code">
            <el-input  v-model="formRegister.vcode" placeholder="请输入手机验证码"></el-input>
            <span @click="getCode" :class="{notouch:!status}" v-text="status?'发送验证码':timeCode+'后重试'"></span>
          </el-form-item>

          <el-button class="regiester-now" @click="submitForm('formRegister')">重置密码</el-button>

        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
  import {get, post} from '@/api/fetch.js';
  import url from '@/api/serviceAPI.config.js';
  import headnav from '@/components/common/headerNoLogin'
    export default {
      name: "",
      data(){
        let equitPass = (rule, value, callback) => {
          if (value === '') {
            callback(new Error('请再次输入密码'));
          } else if (value !== this.formRegister.password) {
            callback(new Error('两次输入密码不一致!'));
          } else {
            callback();
          }
        };
        let tel = (rule, value, callback) => {
          if (!/^(1+\d{10})$/.test(value)) {
            callback(new Error('请输入正确的手机号'));
          } else {
            callback();
          }
        };
        let equitNewPass = (rule, value, callback) => {
          if(value.length < 8 || value.length > 16) {
            callback(new Error('密码长度不对'));
          } else {
            callback()
          }
        }
        return {
          timeCode:60,
          status:true,
          interval:null,
          formRegister:{
            password:'',
            checkPass:'',
            email:'',
            tel:'',
            vcode:'',
          },
          rules:{
            password:[
              {validator: equitNewPass, trigger: 'blur' },
            ],
            checkPass:[
              {required: true, validator: equitPass, trigger: 'blur' }
            ],
            tel:[
              { required: true, message: '请输入手机号码', trigger: 'blur' },
              {validator:tel}
            ],
            vcode:[
              { required: true, message: '请输入验证码', trigger: 'blur' },
            ]
          }
        }
      },
      methods:{
        submitForm(formName) {
          this.$refs[formName].validate((valid) => {
            if (valid) {
              let params = {
                tel: this.formRegister.tel,
                vCode: this.formRegister.vcode,
                newPassword: this.formRegister.password
              }
              post(url.resetPwd, params).then(res=>{
                if(res.status==200){
                  this.$notify({
                    title: '重置密码成功',
                    message: '重置密码成功，返回登录页',
                    type: 'success',
                    onClose:()=>{
                      this.$router.push({path:'login'});
                    }
                  });
                }else{
                  this.$notify({
                    title: '重置密码失败',
                    message: res.message,
                    type: 'error',
                  });
                }
              })
            }
          });
        },
        getCode(){
          if(!this.status) return false;
            post(url.sendVcodeForPwd,{tel:this.formRegister.tel}).then(res=>{
              if(res.status=='200'){
                this.countDown();
              }else{
                this.$notify({
                  title: '发送失败',
                  message: res.message,
                  type: 'error',
                });
              }
          })
        },
        countDown(time){
          let _self=this
          this.status=false;
          this.interval=setInterval(()=>{
            if(_self.timeCode>0){
              _self.timeCode--
            }else{
              _self.timeCode=60;
              clearTimeout(this.interval);
              _self.status=true;
            }
          },1000)
        }
      },
      created(){

      },
      components:{
        headnav
      }
    }
</script>

<style type="text/scss" lang="scss" scoped>

  div{
    color: #000;
  }
  .content{
    width: 100%;
    height: 80%;
  }
  .content-box{
    width: 1200px;
    height: 100%;
    margin: 0 auto;
    background: #f9f9f9;
    padding: 100px 0;
    form{
      width: 580px;
      margin: 0 auto;
    }
  }
  .phone-code{
    position: relative;
  }
  .phone-code span{
    display: inline-block;
    border: none;
    height: 40px;
    line-height: 50px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    background-color: #fff;
    text-align: center;
    color: #ff6000;
    cursor: pointer;
    position: absolute;
    top: 0;
    margin-top: 1px;
    right: 30px;
  }
  .phone-code span.notouch{
    cursor: no-drop;
    color:#c0c4cc;
  }
</style>
