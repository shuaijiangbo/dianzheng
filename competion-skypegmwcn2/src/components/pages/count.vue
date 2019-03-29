<template>
  <div id="count" class="content">
    <p class="fTitle"><label style="margin-left: 15px;">完善信息</label></p>
    <div class="conten-box">
      <p class="sTitle">
        <span class="base-msg-title">基本信息</span>
        <!--<span class="msg-complete-percent">资料完整度：<label class="percent">30%</label></span>-->
      </p>
      <div class="form-box">
        <el-alert

          title="完善更多信息，有助于我们提供更加个性化的服务，HOTi将尊重并保护您的隐私"
          type="warning"
          :closable="false">
        </el-alert>
        <!-- <el-form>
           <el-form-item label="用户类型：" label-width="140px">
             <el-radio v-model="userType" v-if="this.nowuserType == '2' || this.nowuserType == '4'" label="2">组织用户</el-radio>
             <el-radio v-model="userType" v-if="this.nowuserType == '3' || this.nowuserType == '4'" label="3">个人用户</el-radio>
           </el-form-item>
         </el-form>-->
        <!--组织用户-->
        <el-form :rules="organFormRules" :model="organForm"   ref="organForm" label-width="150px" class="mes-form">
          <el-form-item label="昵称：" prop="nickname" style="width: 90%">
            <el-input v-model="organForm.nickname" placeholder="请输入昵称"></el-input>
          </el-form-item>
          <!--<el-alert title="组织管理员" type="info" :closable="false" class="organ-el-alert"></el-alert>-->
          <el-form-item label="姓名：" prop="name" style="width: 90%">
            <el-input v-model="organForm.name" placeholder="请输入姓名"></el-input>
            <div class="prompt">(不会公开)</div>
          </el-form-item>

          <el-form-item label="性别：" prop="sex">
            <el-radio v-model="organForm.sex" label="1" value="1">男</el-radio>
            <el-radio v-model="organForm.sex" label="2" value="2">女</el-radio>
          </el-form-item>

          <el-form-item label="生日：" prop="birthday">

            <el-date-picker
              v-model="organForm.birthday"
              type="date"
              placeholder="选择日期"
              format="yyyy 年 MM 月 dd 日">
            </el-date-picker>
          </el-form-item>

          <el-form-item label="所在城市：" prop="address">
            <provice-city ref="provinceCity" @changeProCityVal="changeProCityVal"></provice-city>
            <el-input v-model="organForm.address" style="width: 240px;" placeholder="详细地址"></el-input>
          </el-form-item>

          <el-form-item label="简介：" prop="intro" style="width: 90%">
            <el-input
              type="textarea"
              :rows="7"
              placeholder="请输入内容"
              v-model="organForm.intro">
            </el-input>
          </el-form-item>

          <el-form-item label="证件类型：" prop="credentialsType" >
            <el-select v-model="organForm.credentialsType" placeholder="请选择证件类型" style="width: 514px;">
              <el-option label="身份证" value="1"></el-option>
              <el-option label="护照" value="2"></el-option>
            </el-select>
          </el-form-item>

          <!-- 组织 上传身份证-->
          <el-form-item label="上传证件：" prop="credentialsFrontFile" >
            <el-upload
              class="avatar-uploader"
              accept="image/*"
              :show-file-list="false"
              :action="url"
              prop="shenfzheng"
              name="credentialsFrontFile"
              :on-success="organFrontImgSucc"
              :before-upload="beforeOrganFrontUpload">
              <img v-if="organFrontImg" :src="organFrontImg" class="upload-bg">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
            <el-upload
              class="avatar-uploader"
              accept="image/*"
              action=""
              name="credentialsBackFile"
              :show-file-list="false"
              :on-success="organBackImgSucc"
              :before-upload="beforeOrganBackUpload" style="margin-left: 20px;">
              <img v-if="organBackImg" :src="organBackImg" class="upload-bg">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
            <span class="red-tip">提示：限制文件大小1M；</span>
          </el-form-item>
          <!-- 组织 上传护照 -->
          <!--<el-form-item label="上传护照：" prop="credentialsFrontFile" v-if="organForm.adminCredentialsType=='2'">
            <el-upload
              class="avatar-uploader"
              accept="image/*"
              :show-file-list="false"
              :action="url"
              prop="shenfzheng"
              name="credentialsFrontFile"
              :before-upload="beforeOrganFrontUpload_noperson">
              <img v-if="organFrontImg" :src="organFrontImg" class="upload-bg">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
            <span class="red-tip">提示：限制文件大小1M；</span>
          </el-form-item>-->

          <!-- <el-form-item label="管理员姓名：" prop="adminName">
             <el-input v-model="organForm.adminName" class="w470" placeholder="请输入管理员姓名"></el-input>
           </el-form-item>-->
          <el-form-item label="证件号码：" prop="credentialsNo" >
            <el-input v-model="organForm.credentialsNo" class="w470" placeholder="请输入证件号码" style="width: 514px;"></el-input>
          </el-form-item>
          <!--<el-form-item label="组织联系方式：" prop="contact">
            <el-input v-model="organForm.contact" class="w470" placeholder="请输入组织联系方式"></el-input>
          </el-form-item>
          <el-form-item label="统一社会信用代码：" >
            <el-input v-model="organForm.uscc" class="w470" placeholder="请输入统一社会信用代码"></el-input>
          </el-form-item>
          <el-form-item label="组织地址：" prop="address">
            <provice-city ref="provinceCity" @changeProCityVal="changeProCityVal"></provice-city>
            <el-input v-model="organForm.address" style="width: 240px;" placeholder="请输入组织地址"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary"
                       style="background-color: #ff6000;border-color: #ff6000;width: 100px;"
                       @click="submitOrganForm('organForm')">提交审核
            </el-button>
          </el-form-item>-->
          <el-form-item label="faceld：" prop="facePhotoFile" >

            <el-upload

              accept="image/*"
              :show-file-list="false"
              :action="url"
              prop="face"
              name="facePhotoFile"
              :on-success="organfacePhotoFile"
              :before-upload="beforeOrganfaceUpload">
              <img v-if="faces" :src="faces" class="upload-faceld">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>

            <!--<el-upload
              class="avatar-uploader"
              accept="image/*"
              action=""
              name="credentialsBackFile"
              :show-file-list="false"
              :on-success="organBackImgSucc"
              :before-upload="beforeOrganBackUpload" style="margin-left: 20px;">
              <img v-if="organBackImg" :src="organBackImg" class="upload-bg">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>-->
          </el-form-item>

          <el-button type="primary"
                     class="btns"
                     :disabled="organForm.disabled"
                     @click="submitOrganForm('organForm')">保存
          </el-button>


        </el-form>
        <!--个人用户-->
        <!--<el-form :model="mesForm" :rules="mesFormRules" v-show="userType == '3'" ref="mesForm" label-width="140px"
                 class="mes-form">
          <el-form-item label="证件类型：" prop="credentialsType">
            <el-select v-model="mesForm.credentialsType" placeholder="请选择证件类型">
              <el-option label="身份证" value="1"></el-option>
              <el-option label="护照" value="2"></el-option>
              <el-option label="户口本" value="3"></el-option>
            </el-select>
          </el-form-item>

          &lt;!&ndash; 个人 上传身份证正反面 &ndash;&gt;
          <el-form-item label="上传身份证：" prop="credentialsFrontFile" v-if="mesForm.credentialsType=='1'">
            <el-upload
              class="avatar-uploader"
              :action="url"
              accept="image/*"
              :show-file-list="false"
              name="credentialsFrontFile"
              :on-success="personFrontImgSucc"
              :before-upload="beforeIDFrontUpload">
              <img v-if="personFrontImg" :src="personFrontImg" class="upload-bg">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
            <el-upload
              class="avatar-uploader"
              action=""
              accept="image/*"
              :show-file-list="false"
              name="credentialsBackFile"
              :on-success="personBackImgSucc"
              :before-upload="beforeIDBackUpload" style="margin-left: 20px;">
              <img v-if="personBackImg" :src="personBackImg" class="upload-bg">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
            <span class="red-tip">提示：限制文件大小1M；</span>
          </el-form-item>
          &lt;!&ndash; 个人 上传护照 &ndash;&gt;
          <el-form-item label="上传护照：" prop="credentialsFrontFile" v-if="mesForm.credentialsType=='2'">
            <el-upload
              class="avatar-uploader"
              :action="url"
              accept="image/*"
              :show-file-list="false"
              name="credentialsFrontFile"
              :before-upload="beforeIDFrontUpload_noperson">
              <img v-if="personFrontImg" :src="personFrontImg" class="upload-bg">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
            <span class="red-tip">提示：限制文件大小1M；</span>
          </el-form-item>
          &lt;!&ndash; 个人 上传户口本 &ndash;&gt;
          <el-form-item label="上传户口本：" prop="credentialsFrontFile" v-if="mesForm.credentialsType=='3'">
            <el-upload
              accept="image/*"
              class="avatar-uploader"
              :action="url"
              :show-file-list="false"
              name="credentialsFrontFile"
              :before-upload="beforeIDFrontUpload_noperson">
              <img v-if="personFrontImg" :src="personFrontImg" class="upload-bg">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
            <span class="red-tip">提示：限制文件大小1M；</span>
          </el-form-item>

          <el-form-item label="证件号码：" class="w470" prop="credentialsNo">
            <el-input v-model="mesForm.credentialsNo" placeholder="请输入证件号码"></el-input>
          </el-form-item>
          <el-form-item label="真实姓名：" class="w470" prop="name">
            <el-input v-model="mesForm.name" placeholder="请输入真实姓名"></el-input>
          </el-form-item>
          &lt;!&ndash; <el-form-item label="原等级测试ID" v-if="false" class="w470" prop="oldLvId">
            <el-input v-model="mesForm.oldLvId" placeholder="请输入原等级测试ID"></el-input>
          </el-form-item> &ndash;&gt;
          <el-form-item label="性别：" prop="sex">
            <el-select v-model="mesForm.sex" placeholder="请选择性别">
              <el-option label="男" value="1"></el-option>
              <el-option label="女" value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="出生日期：" class="w470" prop="birthday">
            <el-date-picker
              v-model="mesForm.birthday"
              type="date"
              format="yyyy/MM/dd"
              value-format="yyyy/MM/dd"
              placeholder="请输入出生日期">
            </el-date-picker>
          </el-form-item>

          <el-form-item>
            <el-button type="primary"
                       style="background-color: #ff6000;border-color: #ff6000;width: 100px;"
                       @click="submitMesForm('mesForm')">保存
            </el-button>
          </el-form-item>
        </el-form>-->



      </div>
    </div>
  </div>
</template>

<script>
  import {get, post} from '@/api/fetch.js';
  import url from '@/api/serviceAPI.config.js';
  import zheng from '@/assets/images/idback.png';
  import fan from '@/assets/images/identity.png';
  import face from '@/assets/images/face.png';
  import axios from 'axios';
  import proviceCity from "../provinceCity/proviceCity";
  import util from '@/util'
  export default {
    data() {
      // 个人用户证件上传自定义规则
      /*let equitMesCredentialsFrontFile = (rule, value, callback) => {
        if(this.mesForm.credentialsType === '1') {
          if(this.mesForm.credentialsFrontFile == '' || this.mesForm.credentialsBackFile == '') {
            callback(new Error('请上传证件照'));
          } else {
            callback();
          }
        } else {
          if(this.mesForm.credentialsFrontFile == '') {
            callback(new Error('请上传证件照'));
          } else {
            callback();
          }
        }
      }*/
      // 组织用户证件上传自定义规则
      let equitOrganCredentialsFrontFile = (rule, value, callback) => {
        if(this.organForm.CredentialsType === '1') {
          if(this.organForm.credentialsFrontFile == '' || this.organForm.credentialsBackFile == '') {
            callback(new Error('请上传证件照'));
          } else {
            callback();
          }
        } else {
          if(this.organForm.credentialsFrontFile == '') {
            callback(new Error('请上传证件照'));
          } else {
            callback();
          }
        }
      }
      return {
        radio:'',

        value4:"",
        value5:"",
        organTypeChangeNumber: 0,
        personTypeChangeNumber: 0,
        url: url.discern,
        accountId: '',
        id: null,//已经确认为组织或个人用户，二次编辑时使用
        personFrontImg: zheng,//个人身份证正面
        personBackImg: fan,//个人身份证背面
        organFrontImg: zheng,//组织身份证正面
        organBackImg: fan,//组织身份证背面
        faces:face,
        userType: "2",
        nowuserType:'',
        organForm: {//组织用户
          types:'1',
          name: '',
          nickname:'',
          credentialsType: '1',
          credentialsFrontFile: '',//组织证件正面
          credentialsBackFile: '',//组织证件背面
          adminCredentialsNo: '',
          contact: '',
          uscc: '',
          province: '',
          city: '',
          address: '',
          id:'',
          birthday: '',
          intro:'',
          credentialsNo:'',
          facePhotoFile:'',
          value10:"",
          sex:'',
          timeCode:'60',
          interval:null,
          disabled:false,
          timer:null,
        },

        organFormRules:{
          credentialsFrontFile: [
            { required: true, validator: equitOrganCredentialsFrontFile, trigger: 'blur'}
          ],
          name: [
            { required: true, message: '请输入姓名', trigger: 'blur'},
          ],
          nickname: [
            { required: true, message: '请输入昵称', trigger: 'blur' },
          ],
          credentialsNo: [
            { required: true, message: '请输入身份证号', trigger: 'blur' },
          ],
          adminCredentialsNo: [
            { required: true, message: '请输入证件号码', trigger: 'blur' },
          ],
          contact: [
            { required: true, message: '请输入联系方式', trigger: 'blur' },
          ],
          address:[
            { required: true, message: '请选择地址', trigger: 'blur' },
          ],
          birthday:[
            { required: true, message: '请选择出生日期', trigger: 'blur' },
          ],
          credentialsType: [
            { required: true, message: '请选择证件类型', trigger: 'blur'}
          ]
        }
      };
    },
    beforeMount() {
      console.log('beforeMount')
      console.log(this.personFrontImg)
    },
    components: {proviceCity},
    mounted() {
      this.accountId = JSON.parse(sessionStorage.getItem("user")).id;
      this.userType = JSON.parse(sessionStorage.getItem("user")).type;
      this.nowuserType = JSON.parse(sessionStorage.getItem("type"));
      // if(JSON.parse(sessionStorage.getItem("user")).type == '2'){//组织用户
      let vm = this;
      // 创建实例时设置配置的默认值
      var instance = axios.create();
      // 在实例已创建后修改默认值
      instance.defaults.headers.post['Content-Type'] = 'application/json';
      instance.post(url.getPersonMsg, {id: vm.accountId}).then(res => {
        let data=res.data;
        if(data.status == 200){
          vm.id = data.data.id;
          vm.organForm.name = data.data.name;
          vm.organForm.nickname = data.data.nickname;
          vm.organForm.birthday = new Date(data.data.birthday);
          vm.organForm.province = data.data.province;
          vm.organForm.city = data.data.city;
          vm.organForm.address = data.data.address;
          vm.organForm.intro = data.data.intro;
          vm.organForm.sex = data.data.sex;
          vm.organForm.credentialsType = data.data.credentialsType;
          vm.organForm.credentialsNo = data.data.credentialsNo;
          vm.$refs.provinceCity.pm = data.data.province;
          vm.$refs.provinceCity.cm = data.data.city;
          vm.organForm.address = data.data.address;
          if(data.data.credentialsFrontUrl !== null) {
            vm.organFrontImg = data.data.credentialsFrontUrl + '?v=' + Math.random();
          }
          if(data.data.credentialsBackUrl !== null) {
            vm.organBackImg = data.data.credentialsBackUrl + '?v=' + Math.random();
          }
          if(data.data.facePhotoUrl !== null) {
            vm.faces = data.data.facePhotoUrl + '?v=' + Math.random();
          }

          //vm.organForm.credentialsFrontFile = res.data.credentialsFrontFile;
          //vm.organForm.credentialsBackFile = res.data.credentialsBackFile;
          //vm.organFrontImg = '';
          //vm.organBackImg = '';
        }else{
          vm.$notify({
            title: data.message,
            type: 'error'
          });
        }
      });
      //}
      /*if(JSON.parse(sessionStorage.getItem("user")).type == '3'){//个人用户
        let vm = this;
        // 创建实例时设置配置的默认值
        var instance = axios.create();
        // 在实例已创建后修改默认值
        instance.defaults.headers.post['Content-Type'] = 'application/json';

        instance.post(url.getPersonMsg, {id: vm.accountId}).then(res => {
          let data=res.data;
          if(data.status == 200){
            vm.id = data.data.id;
            vm.organForm.name = data.data.name;
            vm.organForm.nickname = data.data.nickname;
            vm.organForm.birthday = data.data.birthday;
            vm.organForm.province = data.data.province;
            vm.organForm.city = data.data.city;
            vm.organForm.address = data.data.address;
            vm.organForm.intro = data.data.intro;
            vm.organForm.credentialsType = data.data.credentialsType;
            vm.organForm.credentialsNo = data.data.credentialsNo;
            vm.$refs.provinceCity.pm = data.data.province;
            vm.$refs.provinceCity.cm = data.data.city;
            vm.organForm.address = data.data.address;
            if(data.data.credentialsFrontUrl !== null) {
              vm.organFrontImg = data.data.credentialsFrontUrl + '?v=' + Math.random();
            }
            if(data.data.credentialsBackUrl !== null) {
              vm.organBackImg = data.data.credentialsBackUrl + '?v=' + Math.random();
            }
            console.log(vm.personBackImg)
            vm.organForm.id=data.data.id;
          }else{
            vm.$notify({
              title: res.message,
              type: 'error'
            });
          }
        });
      }*/
    },
    methods: {


      submitOrganForm(formName) {

        this.organForm.timer=setTimeout(()=>{



        let vm = this;
        vm.$refs[formName].validate((valid) => {

          this.organForm.disabled=true;
          if (valid) {
            let pm = new FormData();
            if(vm.id){
              pm.append('id', vm.id);
            }

            pm.append("name", vm.organForm.name);
            pm.append("accountId", vm.accountId);
            console.log("sss");
            console.log(vm.accountId);
            pm.append("nickname", vm.organForm.nickname);
            pm.append("sex", vm.organForm.sex);
            pm.append("birthday", vm.organForm.birthday);
            pm.append("intro", vm.organForm.intro);
            pm.append("credentialsType", vm.organForm.credentialsType);
            pm.append("credentialsFrontFile", vm.organForm.credentialsFrontFile);
            pm.append("credentialsBackFile", vm.organForm.credentialsBackFile);
            pm.append("credentialsNo", vm.organForm.credentialsNo);
            pm.append("facePhotoFile", vm.organForm.facePhotoFile);
            pm.append('city', vm.organForm.city);
            pm.append('province', vm.organForm.province);
            pm.append('address', vm.organForm.address);
            let organAxios = axios.create();
            organAxios.defaults.headers.post['Content-Type'] = 'multipart/form-data';
            organAxios.post(url.submitOrganForm,pm).then(res => {
              if (res.data.status == 200) {
                vm.$notify({
                  title: '保存成功',
                  type: 'success'
                });
                let oldUserMsg = JSON.parse(sessionStorage.getItem('user'));//保存成功后，sessionStorage里user的type需要刷新
                oldUserMsg.type = '2';
                sessionStorage.setItem('user', JSON.stringify(oldUserMsg));
                vm.$router.push({path:'/index/applyPage'});
              } else {
                vm.$notify({
                  title: res.data.message,
                  type: 'error',
                });
              }
            }).catch(error => {})
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },100)
      },
      submitMesForm(formName) {//个人
        let vm = this;
        vm.$refs[formName].validate((valid) => {
          if (valid) {
            let pm = new FormData();
            if(vm.id){
              pm.append('id', vm.id);
            }
            pm.append("accountId", vm.accountId);
            pm.append("credentialsType", vm.mesForm.credentialsType);
            pm.append("credentialsNo", vm.mesForm.credentialsNo);
            pm.append("sex", vm.mesForm.sex);
            pm.append("birthday", vm.mesForm.birthday);
            pm.append("name", vm.mesForm.name);
            // pm.append("oldLvId", vm.mesForm.oldLvId);
            pm.append("id", vm.mesForm.id);
            pm.append('credentialsFrontFile', vm.mesForm.credentialsFrontFile);
            console.log('正面')
            console.log(vm.mesForm.credentialsFrontFile)
            pm.append('credentialsBackFile', vm.mesForm.credentialsBackFile);
            console.log('反面')
            console.log(vm.mesForm.credentialsBackFile)
            let perAxios = axios.create();
            perAxios.defaults.headers.post['Content-Type'] = 'multipart/form-data';
            perAxios.post(url.savePerson, pm).then(res => {
              if (res.data.status == 200) {
                vm.$notify({
                  title: '保存成功',
                  type: 'success'
                });
                let oldUserMsg = JSON.parse(sessionStorage.getItem('user'));
                oldUserMsg.type = '3';
                sessionStorage.setItem('user', JSON.stringify(oldUserMsg));
                sessionStorage.setItem('type', JSON.stringify(3));
                vm.$router.push({path:'orderList'});
              } else {
                vm.$notify({
                  title: res.data.message,
                  type: 'error',
                });
              }
            }).catch(error => {})
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      organFrontImgSucc(res, file, imageUrl) { //组织证件正面success
        let vm = this;
        let data = res.data;
        if (res.status == 200 && data.result=="true")  {
          vm.organForm.adminName = data.name;
          vm.organForm.adminCredentialsNo=data.idNumber;
          vm.mesForm.sex=data.gender;
          this.$notify({
            title: '识别成功',
            message: '身份证识别成功，请核对身份信息是否正确！',
            type: 'success'
          });
        }
        this.organFrontImg = URL.createObjectURL(file.raw);
      },
      organBackImgSucc(res, file, imageUrl) {//组织证件背面success
        this.organBackImg = URL.createObjectURL(file.raw);
      },
      organfacePhotoFile(res, file, imageUrl) {//组织证件背面success
        this.faces = URL.createObjectURL(file.raw);
      },
      beforeOrganFrontUpload(file) {//组织证件正面before上传
        const isLt2M = file.size / 1024 / 1024 < 1;
        if (!isLt2M) {
          this.$notify({
            title: '错误提示',
            message: '上传头像图片大小不能超过 1M !',
            type: 'error'
          });
        }
        this.organForm.credentialsFrontFile = file;
      },
      beforeOrganBackUpload(file) {//组织证件背面before上传
        const isLt2M = file.size / 1024 / 1024 < 1;
        if (!isLt2M) {
          this.$notify({
            title: '错误提示',
            message: '上传头像图片大小不能超过 1M !',
            type: 'error'
          });
        }
        this.organBackImg = URL.createObjectURL(file);
        this.organForm.credentialsBackFile = file;
      },
      beforeOrganfaceUpload(file) {//组织证件背面before上传
        const isLt2M = file.size / 1024 / 1024 < 1;
        if (!isLt2M) {
          this.$notify({
            title: '错误提示',
            message: '上传头像图片大小不能超过 1M !',
            type: 'error'
          });
        }
        this.faces = URL.createObjectURL(file);
        this.organForm.facePhotoFile = file;
      },
      // 组织用户 护照上传不需识别，因此需要阻止上传
      beforeOrganFrontUpload_noperson(file) {
        const isLt2M = file.size / 1024 / 1024 < 1;
        if (!isLt2M) {
          this.$notify({
            title: '错误提示',
            message: '上传头像图片大小不能超过 1M !',
            type: 'error'
          });
        }
        this.organForm.credentialsFrontFile = file;
        //创建临时的路径来展示图片
        var windowURL = window.URL || window.webkitURL;
        this.organFrontImg = windowURL.createObjectURL(file);
        return false;
      },
      personFrontImgSucc(res, file, imageUrl) {//个人身份证正面success
        let vm = this;

        let data = res.data;

        if (res.status == 200 && data.result=="true")  {
          vm.mesForm.name = data.name;
          vm.mesForm.credentialsNo=data.idNumber;
          vm.mesForm.sex=data.gender;
          this.$notify({
            title: '识别成功',
            message: '身份证识别成功，请核对身份信息是否正确！',
            type: 'success'
          });
        }
        this.personFrontImg = URL.createObjectURL(file.raw);
      },
      personBackImgSucc(res, file, imageUrl) {//个人身份证背面success
        this.personBackImg = URL.createObjectURL(file.raw);
      },
      beforeIDFrontUpload(file) {//个人身份证正面before上传
        const isLt2M = file.size / 1024 / 1024 < 1;
        if (!isLt2M) {
          this.$notify({
            title: '错误提示',
            message: '上传头像图片大小不能超过 1M !',
            type: 'error'
          });
        }
        this.mesForm.credentialsFrontFile = file;
        console.log(file)
      },
      // 个人用户 护照，户口本上传不需识别，因此需要阻止上传
      beforeIDFrontUpload_noperson(file) {
        const isLt2M = file.size / 1024 / 1024 < 1;
        if (!isLt2M) {
          this.$notify({
            title: '错误提示',
            message: '上传头像图片大小不能超过 1M !',
            type: 'error'
          });
        }
        this.mesForm.credentialsFrontFile = file;
        //创建临时的路径来展示图片
        var windowURL = window.URL || window.webkitURL;
        this.personFrontImg = windowURL.createObjectURL(file);
        return false;
      },
      beforeIDBackUpload(file) {//个人身份证背面before上传
        console.log('阻止个人身份证背面上传')
        const isLt2M = file.size / 1024 / 1024 < 1;
        if (!isLt2M) {
          this.$notify({
            title: '错误提示',
            message: '上传头像图片大小不能超过 1M !',
            type: 'error'
          });
        }
        this.personBackImg = URL.createObjectURL(file);
        this.mesForm.credentialsBackFile = file;
      },
      changeProCityVal(val) {
        this.organForm.province = val.pro;
        this.organForm.city = val.city;
      }
    },
    watch: {
      'mesForm.credentialsType': function (newValue) {
        this.personTypeChangeNumber ++;
        if(this.personTypeChangeNumber !== 1) {
          this.personBackImg = fan;
          this.mesForm.credentialsBackFile = '';
          this.personFrontImg = zheng;
          this.mesForm.credentialsFrontFile = '';
        }
      },
      'organForm.adminCredentialsType': function (newValue) {

        this.organTypeChangeNumber ++;
        console.log(this.organTypeChangeNumber)
        if(this.organTypeChangeNumber !== 1) {
          this.organBackImg = fan;
          this.organForm.credentialsBackFile = '';
          this.organFrontImg = zheng;
          this.organForm.credentialsFrontFile = '';
          this.faces = face;
          this.organForm.facePhotoFile = '';
        }
      },
      personFrontImg(newValue, oldValue) {
        if(this.mesForm.credentialsFrontFile === '' && newValue !== zheng) {
          let suffix = newValue.split('.').pop()
          util.getImgToBase64(newValue, data => {
            var myFile = util.dataURLtoFile(data, `filename.${suffix}`);
            console.log(myFile);
            this.mesForm.credentialsFrontFile = myFile;
          })
        }
      },
      personBackImg(newValue, oldValue) {
        // imgsrc 变化，且证件文件===''且imgsrc不为默认的空，才根据imgsrc生成file
        if(this.mesForm.credentialsBackFile === '' && newValue !== fan) {
          let suffix = newValue.split('.').pop()
          util.getImgToBase64(newValue, data => {
            var myFile = util.dataURLtoFile(data, `filename.${suffix}`);
            console.log(myFile);
            this.mesForm.credentialsBackFile = myFile;
          })
        }
      },
      organFrontImg(newValue, oldValue) {
        if(this.organForm.credentialsFrontFile === '' && newValue !== zheng) {
          let suffix = newValue.split('.').pop()
          util.getImgToBase64(newValue, data => {
            var myFile = util.dataURLtoFile(data, `filename.${suffix}`);
            console.log(myFile);
            this.organForm.credentialsFrontFile = myFile;
          })
        }
      },

      organBackImg(newValue, oldValue) {
        if(this.organForm.credentialsBackFile === '' && newValue !== fan) {
          let suffix = newValue.split('.').pop()
          util.getImgToBase64(newValue, data => {
            var myFile = util.dataURLtoFile(data, `filename.${suffix}`);
            console.log(myFile);
            this.organForm.credentialsBackFile = myFile;
          })
        }
      },

      faces(newValue, oldValue) {
        if(this.organForm.facePhotoFile === '' && newValue !== face) {
          let suffix = newValue.split('.').pop()
          util.getImgToBase64(newValue, data => {
            var myFile = util.dataURLtoFile(data, `filename.${suffix}`);
            console.log(myFile);
            this.organForm.facePhotoFile = myFile;
          })
        }
      }

    }
  }
</script>

<style type="text/scss" lang="scss" scoped>
  .fTitle {
    height: 32px;
    line-height: 32px;
    width: 100%;
    background: #fefefe;
    border: 1px solid #ddd;
    margin-bottom: 20px;
    color: #a7a7a7;
  }

  .conten-box {
    .sTitle {
      width: 100%;
      border-bottom: 2px solid #ff6100;
      .base-msg-title {
        line-height: 30px;
        text-align: center;
        display: inline-block;
        height: 30px;
        padding: 0 28px;
        background: #ff6100;
        color: #fff;
        margin-left: 10px;
        font-size: 15px;
      }
    }
    .w470{
      width: 470px;
    }
    .faceld{
      margin-left: -20px;
    }
    .userType-label {
      display: inline-block;
      width: 100px;
      text-align: right;
      padding-right: 20px;
      font-size: 14px;
      color: #606266;
    }
    .organ-el-alert {
      margin-left: -15px;
      margin-right: -15px;
      width: auto;
      border-color: #ddd;
      background-color: #f4f4f5;
      color: #333;
    }
    .msg-complete-percent {
      float: right;
      line-height: 30px;
      color: #666;
      .percent {
        font-size: 30px;
        color: #ff6000;
      }
    }
    .upload-bg {
      display: block;
      width: 245px;
      height: 140px;
    }
    .upload-faceld{
      width: 98px;
      height: 90px;
    }
    .form-box {
      padding: 10px 30px;
    }
    .prompt{
      margin-left: -73px;
      margin-top: -20px;
      float: left;
      font-size: 12px;
      color: #bdbdbd;
    }
    .btns{
      width: 122px;
      height: 38px;
      margin-left: 149px;
      background: -webkit-linear-gradient(top,#f01722,#fb6e39);
      border: 0px;
    }
    .cons{
      font-size: 14px;
      margin-left: 148px;
      margin-top: 4px;
      color: #a9a9a9;
    }
  }
  .red-tip{
    color: red;
    margin-top: 110px;
    margin-left: 20px;
    display: inline-block;
  }
</style>
