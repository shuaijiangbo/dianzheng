<template>
  <div>
    <div class="content">
      <div class="content-box">
        <el-form status-icon :rules="rules" :model="formRegister" class="form-register" ref="formRegister"  label-width="120px">
          <el-form-item label="旧密码：" prop="password">
            <el-input type="password" @input="checkPassword" v-model="formRegister.password" placeholder="请输入旧密码"></el-input>
          </el-form-item>
          <el-form-item  label="新密码：" prop="newPassword">
            <el-input type="password" v-model="formRegister.newPassword" placeholder="请输入新密码（8-16位数字或字母或特殊符号）"></el-input>
          </el-form-item>

          <el-form-item  label="确认新密码：" prop="checkPass">
            <el-input type="password" v-model="formRegister.checkPass" placeholder="请输入新密码（8-16位数字或字母或特殊符号）"></el-input>
          </el-form-item>

          <el-button class="regiester-now" @click="submitForm('formRegister')">提交修改</el-button>

        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
  import {get, post} from '@/api/fetch.js';
  import url from '@/api/serviceAPI.config.js';
    export default {
      name: "",
      data(){
        let equitPass = (rule, value, callback) => {
          if (value === '') {
            callback(new Error('请再次输入密码'));
          } else if (value !== this.formRegister.newPassword) {
            callback(new Error('两次输入密码不一致!'));
          } else {
            callback();
          }
        }
        let equitNewPass = (rule, value, callback) => {
          if(value.length < 8 || value.length > 16) {
            callback(new Error('密码应为8-16位数字或字母或特殊符号'));
          } else {
            callback();
          }
        }
        return {
          timeCode:60,
          status:true,
          interval:null,
          formRegister:{
            password:'',
            newPassword:'',
            checkPass:'',
          },
          rules:{
            password:[
              { required: true, message: '请输入旧密码', trigger: 'blur' },
            ],
            newPassword:[
              {required: true, validator: equitNewPass, trigger: 'blur' }
            ],
            checkPass:[
              {required: true, validator: equitPass, trigger: 'blur' }
            ],
          }
        }
      },
      methods:{
        async checkPassword(event) {
          console.log(event)
          let password = event;
          if(password.length < 6 || password.length > 22) {
            this.rules.password = [{
              trigger: 'blur',
              validator: (rule, value, callback) => {
                console.log('长度不对')
                callback(new Error('密码长度不对'))
              }
            }]
          } else {
            let params = {
              accountId: JSON.parse(sessionStorage.getItem("user")).id || '',
              oldPassword: this.formRegister.password
            }
            await post(url.checkPwd, params).then(res => {
              if(res.status !== 200) {
                this.rules.password = [{
                  trigger: 'blur',
                  validator: (rule, value, callback) => {
                    console.log('密码错误')
                    callback(new Error('密码错误'))
                  }
                }]
                this.$refs.formRegister.validateField(['password'])
              } else {
                this.rules.password = [{
                  trigger: 'blur',
                  validator: (rule, value, callback) => {
                    callback()
                  }
                }]
                this.$refs.formRegister.validateField(['password'])
              }
            })
          }
        },
        submitForm(formName) {
          // 提交之前检查error是否为空，再手动修改验证规则
          // if(this.error !== '') {
          //   this.rules.password = [{
          //     trigger: 'blur',
          //     validator: (rule, value, callback) => {
          //       callback(new Error('密码错误'))
          //     }
          //   }]
          // }

          this.$refs[formName].validate((valid) => {
            if (valid) {
              let params = {
                accountId: JSON.parse(sessionStorage.getItem("user")).id || '',
                oldPassword: this.formRegister.password,
                newPassword: this.formRegister.newPassword
              }
              post(url.updatePwd, params).then(res=>{
                if(res.status==200){
                  this.$refs.formRegister.resetFields()
                  this.$notify({
                    title: '修改成功',
                    message: '修改成功，返回登录页',
                    type: 'success',
                    onClose:()=>{
                      this.$router.push({path:'/login'});
                    }
                  });
                }else{
                  this.$notify({
                    title: '修改失败',
                    message: res.message,
                    type: 'error',
                  });
                }
              })
            }
          });
        },
      },
      created(){

      },
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
