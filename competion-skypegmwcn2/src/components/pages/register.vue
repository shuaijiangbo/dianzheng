<template>
  <div>
    <headnav></headnav>
    <div class="content">
      <div class="titles">注册</div>
      <div class="content-box">

        <el-form status-icon :rules="rules" :model="formRegister" class="form-register" ref="formRegister"  label-width="120px">
          <el-form-item label="用户名称：" prop="account">
            <el-input v-model="formRegister.account" placeholder="请输入用户名称（6-16位数字或字母）"></el-input>
          </el-form-item>
          <el-form-item label="登录密码：" prop="password">
            <el-input type="password" v-model="formRegister.password" placeholder="请输入登录密码（8-16位数字或字母或特殊符号）"></el-input>
          </el-form-item>
          <el-form-item  label="密码确认：" prop="checkPass">
            <el-input type="password" v-model="formRegister.checkPass" placeholder="请输入确认密码"></el-input>
          </el-form-item>
          <el-form-item label="邮箱：">
            <el-input v-model="formRegister.email" placeholder="请输入邮箱"></el-input>
          </el-form-item>
          <el-form-item label="手机号码：" prop="tel">
            <el-input v-model="formRegister.tel" placeholder="请输入手机号码"></el-input>
          </el-form-item>
          <el-form-item label="手机验证码：" prop="vcode" class="phone-code">
            <el-input  v-model="formRegister.vcode" placeholder="请输入手机验证码"></el-input>
            <span @click="getCode" :class="{notouch:!status}" v-text="status?'发送验证码':timeCode+'后重试'"></span>
          </el-form-item>

          <el-form-item>
            <el-checkbox-group v-model="formRegister.agree">
              <el-checkbox label="我同意并已阅读" name="type"></el-checkbox>
              <el-checkbox @click.native="dialogVisible = true" label="《用户注册须知》" class="read" name="type"></el-checkbox>
            </el-checkbox-group>

          </el-form-item>
          <!-- :class="{'regiester-disagree':!formRegister.agree}" -->
          <el-button class="regiester-now" :class="{'regiester-disagree':!formRegister.agree.includes('我同意并已阅读')}"  @click="submitForm('formRegister')">立即注册</el-button>

        </el-form>
      </div>
    </div>
    <el-dialog
      class="register-dialog"
      title="用户注册须知"
      :visible.sync="dialogVisible"
      width="50%">
      <p style="text-align: center;margin-bottom: 30px">用户注册须知</p>
      <p>我们很乐意为您提供服务。本条款将帮助您了解以下内容：</p>
      <p>一、我们如何收集您的信息</p>
      <p>个人信息是指以电子或者其他方式记录的能够单独或者与其他信息结合识别特定自然人身份或者反映特定自然人活动情况的各种信息。</p>
      <p>（一）核心功能，基于实现体育相关报名所收集必要信息</p>
      <p>1、注册会员</p>
      <p>为完成创建账号，您需提供以下信息：您创建的账户名、昵称、密码和手机号码。</p>
      <p>（二）附加功能，基于您的选择所收集的信息</p>
      <p>1、基于您的位置信息个性化推荐功能：为了方便您浏览所在城市站的演出或赛事项目信息，在您开启设备定位功能并授权我们调用相关功能时，我们会收集您的位置信息，若您不希望此信息被收集，您可以通过设备关闭定位功能。</p>
      <p>2、基于摄像头（相机）的附加功能：您可以使用这个附加功能完成头像上传的功能。同时，您可以通过设备关闭调用摄像头功能，停止对您的摄像信息的收集。</p>
      <p>3、基于国家相关管理部门要求，在您开通此服务时，我们会收集包括您的姓名、身份证号等信息。</p>
      <p>（三）其他用途</p>
      <p>我们将信息用于本条款未载明的其他用途，或者将基于特定目的收集而来的信息用于其他用途时，会事先征求您的同意。</p>
      <p>（四）征得授权同意的例外</p>
      <p>1、与国家安全、国防安全有关的；</p>
      <p>2、与公共安全、公共卫生、重大公共利益有关的；</p>
      <p>3、与犯罪侦查、起诉、审判和判决执行等有关的；</p>
      <p>4、所收集的个人信息是个人信息主体自行向社会公众公开的；</p>
      <p>5、从合法公开披露的信息中收集的您的个人信息的，如合法的新闻报道、政府信息公开等渠道；</p>
      <p>6、为合法的新闻报道所必需的；</p>
      <p>7、学术研究机构基于公共利益开展统计或学术研究所必要，且对外提供学术研究或描述的结果时，对结果中所包含的个人信息进行去标识化处理的；</p>
      <p>8、法律法规规定的其他情形。</p>
      <p>二、我们如何使用 Cookie 和同类技术</p>
      <p>1、为确保网站正常运转，我们会在您的计算机或移动设备上存储名为 Cookie 的小数据文件。Cookie 通常包含标识符、站点名称以及一些号码和字符。借助于 Cookie，网站能够存储您的偏好或订单等数据。在您使用服务时，Cookie 和同类技术会自动采集您的设备或软件信息（移动设备、网页浏览器、IP地址和移动设备所用的版本和设备识别码）。</p>
      <p>2、我们不会将 Cookie 用于本条款所述目的之外的任何用途。您可根据自己的偏好管理或删除 Cookie。您可以清除计算机上保存的所有 Cookie，大部分网络浏览器都设有阻止 Cookie 的功能。但如果您这么做，则需要在每一次访问我们的网站时亲自更改用户设置。</p>
      <p>三、我们如何存储和保护您的个人信息</p>
      <p>（一）存储</p>
      <p>1、存储地域</p>
      <p>我们在中华人民共和国境内运营中收集和产生的个人信息，存储在中国境内。</p>
      <p>（二）保护</p>
      <p>1、我们会采取一切合理可行的措施，保护您的个人信息。</p>
      <p>2、我们会采取一切合理可行的措施，遵守收集信息必要性原则，我们只会在本条款声明的期限内保留您的个人信息，除非需要法律法规规定的事由。</p>
      <p>3、互联网环境并非百分之百安全，我们将尽力确保或担保您发送给我们的任何信息的安全性。如果我们的物理、技术、或管理防护设施遭到破坏，导致信息被非授权访问、公开披露、篡改或破坏，致使您的合法权益受损害，我们将承担相应的法律责任。</p>
      <p>4、在不幸发生个人信息安全事件后，我们将按照法律法规的要求，及时向您告知：安全事件的基本情况和可能的影响、我们已采取或将要采取的处置措施、您可自主防范和降低风险的建议、对您的补救措施等。我们将及时将事件相关情况以邮件、信函、电话、推送通知等方式告知您，难以逐一告知个人信息主体时，我们会采取合理、有效的方式发布公告。同时，我们还将按照监管部门要求，主动上报个人信息安全事件的处置情况。</p>
      <p>四、我们如何处理未成年人的个人信息</p>
      <p>如您为未成年人，请您在法定监护人陪同下仔细阅读本条款，并在征得您的法定监护人同意的前提下向我们提供您的个人信息。</p>
      <p>五、《隐私权专项条款》如何更新</p>
      <p>随着法律法规的出台或修订，我们的《隐私权专项条款》可能会发生变更。条款内容变更后，我们会以公告或站内信的形式通知您我们对条款所做的任何变更，或以其他适当方式提醒您相关内容的更新。</p>
      <p>六、如何联系我们</p>
      <p>如您对本《隐私权专项条款》内容有任何疑问、意见或建议，您可通过客服渠道联系我们support@aiegov.com</p>
      <!-- <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span> -->
    </el-dialog>
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
      return {
        dialogVisible: false,
        timeCode:60,
        status:true,
        interval:null,
        timer:null,
        formRegister:{
          account:'',
          password:'',
          checkPass:'',
          email:'',
          tel:'',
          vcode:'',
          agree:[]
        },
        rules:{
          account: [
            { required: true, message: '请输入用户名称', trigger: 'blur' },
          ],
          password:[
            { required: true, message: '请输入登录密码', trigger: 'blur' },
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
      read() {
        console.log('xxx')
      },
      submitForm(formName) {
        if(!this.formRegister.agree)return false;
        clearTimeout(this.timer);
        this.timer=setTimeout(()=>{
          this.$refs[formName].validate((valid) => {
            if (valid) {
              post(url.toRegister,this.formRegister).then(res=>{
                if(res.status==200){
                  this.$notify({
                    title: '注册成功',
                    message: '注册成功，返回登录页',
                    type: 'success',
                    duration: 1500,
                    onClose:()=>{
                      this.$router.push({path:'login'});
                    }
                  });
                }else{
                  this.$notify({
                    title: '注册失败',
                    message: res.message,
                    type: 'error',
                    duration: 1500,
                  });
                }
              }).catch(err=>{
                console.log(err);
              })
            }
          });
        },500)
      },
      getCode(){
        if(!this.status) return false;
        post(url.getCode,{tel:this.formRegister.tel}).then(res=>{
          if(res.status=='200'){
            this.countDown();
          }else{
            this.$notify({
              title: '发送失败',
              message: res.message,
              duration: 1500,
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
  .titles{
    width: 1200px;
    height: 56px;
    background: -webkit-linear-gradient(top,#f01722,#fb6e39);
    margin: 0 auto;
    margin-top: 50px;
    font-size: 25px;
    color: #ffffff;
    text-align: center;
    line-height: 56px;
  }
</style>
