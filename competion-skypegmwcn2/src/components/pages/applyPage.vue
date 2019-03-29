<template>
  <div class="content-box">
    <div class="content">
      <div class="title-box">
        <span class="title">等级测试报名</span>
      </div>
      <div class="test-name">
        <span>2019上半年等级测试</span>
      </div>

      <div v-for="(firstItem,index) in  firstClass">
        <template>
          <div class="table-box">
            <div class="search-box">
              <el-form :inline="true"  size="mini" >
                <el-form-item label="报名类别选择">
                  <el-cascader
                    :options="options"
                    :ref="index"
                    v-model="firstItem.form.value"
                    @change="handleChange($event,index)">
                  </el-cascader>
                </el-form-item>

                <el-form-item style="float: right">
                  <el-button style="background: #ff6000;border:none;color:  #fff;" icon="el-icon-plus" @click="addType(index)">新增类别</el-button>
                  <el-button style="background: #ff6000;border:none;color: #fff;" :disabled="firstClass.length==1" icon="el-icon-delete" @click="deleteType(index)"  type="primary" >删除报名</el-button>
                </el-form-item>
              </el-form>
            </div>
            <div class="table-content">
              <el-form size="mini" :model="firstItem"  :ref="'ruleForm'+index" >
                <el-table
                  :data="firstItem.tableData"
                  size="mini"
                  border
                  style="width: 100%">
                  <el-table-column
                    label="编号"
                    type="index"
                    align='center'
                    color="#fff"
                    width="120">
                  </el-table-column>

                  <el-table-column
                    label="姓名(必填)"
                    width="180">
                    <template scope="scope">
                      <el-form-item style="margin-bottom: 0"
                                    :prop="'tableData.'+scope.$index+'.personNameInfo'"
                                    :rules="[{ required: true, message: ' ', trigger: 'blur' }]"
                      >
                        <!--<el-input v-model="scope.row.userNameInfo"  placeholder="请输入姓名"></el-input>-->
                        <el-autocomplete
                          :disabled="roleType=='3'"
                          v-model="scope.row.personNameInfo"
                          :fetch-suggestions="querySearch"
                          placeholder="请输入名称"
                          :trigger-on-focus="false"
                          @focus="getIndex(index,scope.$index)"
                          @select="handleSelect"
                        ></el-autocomplete>
                      </el-form-item>
                    </template>
                  </el-table-column>

                  <el-table-column
                    label="性别(必填)"
                    width="180">
                    <template scope="scope">
                      <el-form-item style="margin-bottom: 0"
                                    :prop="'tableData.'+scope.$index+'.genderInfo'"
                                    :rules="[{ required: true, message: ' ', trigger: 'blur' }]">
                        <!--<el-select :disabled="firstItem.editOrNot&&scope.row.genderInfollow" v-model="scope.row.genderInfo" placeholder="请选择">-->
                        <el-select v-model="scope.row.genderInfo" placeholder="请选择">
                          <el-option label="男" value="1"></el-option>
                          <el-option label="女" value="2"></el-option>
                        </el-select>
                      </el-form-item>
                    </template>
                  </el-table-column>

                  <el-table-column
                    prop="credentialsTypeInfo"
                    label="证件类型(必填)">
                    <template scope="scope">
                      <el-form-item style="margin-bottom: 0"
                                    :prop="'tableData.'+scope.$index+'.credentialsTypeInfo'"
                                    :rules="[{ required: true, message: ' ', trigger: 'blur' }]">
                        <!--<el-select  v-model="scope.row.credentialsTypeInfo" placeholder="请选择">-->
                        <el-select v-model="scope.row.credentialsTypeInfo" placeholder="请选择">
                          <!--<el-select :disabled="firstItem.editOrNot&&scope.row.TypeInfo" v-model="scope.row.credentialsTypeInfo" placeholder="请选择">-->
                          <el-option label="身份证" value="1"></el-option>
                          <el-option label="护照" value="2"></el-option>
                        </el-select>
                      </el-form-item>
                    </template>
                  </el-table-column>

                  <el-table-column
                    prop="address"
                    label="证件号(必填)">
                    <template scope="scope">
                      <el-form-item  style="margin-bottom: 0"
                                     :prop="'tableData.'+scope.$index+'.personIdcodeInfo'"
                                     :rules="[{ required: true, message: ' ', trigger: 'blur' }]"
                      >
                        <!--:disabled="firstItem.editOrNot&&scope.row.personIdcodeInfo.length"-->
                        <el-input v-model="scope.row.personIdcodeInfo"  placeholder="请输入证件号"></el-input>
                        <!--<el-input :disabled="firstItem.editOrNot&&scope.row.perAllow" v-model="scope.row.personIdcodeInfo"  placeholder="请输入身份证"></el-input>-->
                      </el-form-item>
                    </template>
                  </el-table-column>

                  <el-table-column label="操作" width="300" align="center" v-if="">
                    <template scope="scope">
                      <el-form-item style="margin-bottom: 0">
                        <el-button size="small" style="padding: 7px 15px;" @click="addPlayer(index,scope.$index)" icon="el-icon-plus">继续添加人员</el-button>
                        <el-button type="danger" style="padding: 7px 15px;" :disabled="firstItem.tableData.length==1" @click="deletePlayer(index,scope.$index)" size="small" icon="el-icon-delete">删除</el-button>
                      </el-form-item>
                    </template>
                  </el-table-column>
                </el-table>
              </el-form>
            </div>
          </div>
        </template>
      </div>
    </div>
    <div class="submit-box">
      <div class="submit-content-box">
        <button @click="savePlayer"
                :style="{'cursor':roleType=='4'?'no-drop':'pointer'}"
                :title="roleType=='4'?'完善信息':''"
        >立即报名</button>
      </div>
    </div>
    <!--   <div v-else>
           <p>请完善信息</p>
       </div>-->

  </div>
</template>

<script>
  import axios from 'axios';
  var qs = require('qs');
  import {get, post} from '@/api/fetch.js';
  import url from '@/api/serviceAPI.config.js';
  export default {
    name: "",
    data(){
      return {
        orgId:'',
        roleType:'',
        timer:null,
        clubName:'',
        matchId:1,
        stationData:[],               //分站
        allowApply:'',
        options:[],
        sendData:[],
        libraryData:[
          {
            personIdcodeInfo: '34564575678568679',
            personNameInfo: '李中胡',
            genderInfo: '1',
            credentialsTypeInfo:'2'
          }
        ],
        firstClass:[
          {
            typesData:'',           //类别
            classData:'',
            editOrNot:true,
            form: {
              arrangementId: '',
              value:[]
            },
            tableData: [{
              personIdcodeInfo: '',
              perAllow:true,
              personNameInfo: '',
              genderInfo: '',
              credentialsTypeInfo:'',
              substationNameInfo:'',
              levelCategoryNameInfo:'',
              testLevelNameInfo:'',
              orgId:JSON.parse(sessionStorage.getItem("userId")),
              matchId:1
            }]
          }
        ],
      }
    },
    methods:{
      savePlayer(){
        let _self=this;
        clearTimeout(this.timer);
        this.timer=setTimeout(()=>{
          if(_self.roleType=='4'||!_self.allowApply){
            this.$notify({
              title: '请完善个人信息',
              message: '报名前请完善用户信息！',
              duration:2000,
              type: 'error',
              onClose:()=>{
                return false;
              }
            });
          }else {
            let newArr=[];
            let checkForm=formName=>{
              let result=new Promise((resolve,reject)=>{
                _self.$refs[formName][0].validate((valid,object)=>{
                  if(valid){
                    console.log(valid);
                    resolve();
                  }
                  else {
                    console.log(object);
                    reject();
                  }
                })
              })
              newArr.push(result);
            }

            _self.firstClass.forEach((item,index)=>{
              checkForm('ruleForm'+index)//校验
            })

            Promise.all(newArr).then(()=>{
              this.sendData=[];
              for(let item of this.firstClass){
                this.sendData=this.sendData.concat(item.tableData);
              }
              let json=JSON.stringify(this.sendData);
              /*post(url.savePlayer,{list:json},'application/json;charset=UTF-8').then(res=>{
                console.log(res);
              })*/

              // 创建实例时设置配置的默认值
              var instance = axios.create();
              // 在实例已创建后修改默认值
              instance.defaults.headers.post['Content-Type'] = 'application/json';
              instance.post(url.savePlayer,json,
              ).then(result =>{
                if(result.data.status==200){
                  this.$notify({
                    title: '保存成功',
                    message: result.data.message,
                    duration:1500,
                    type: 'success',
                    onClose:()=>{
                      this.$router.push({path:'classStatus'});
                    }
                  });
                }else{
                  this.$notify({
                    title: '保存失败',
                    duration:1500,
                    message: result.data.data[0],
                    type: 'error',
                  });
                }
              }).catch(err => {
                console.log(err);
              })
            }).catch(()=>{
              console.log("err");
            })
          }
        },500)
      },
      addType(index){
        /*this.firstClass.push(newObj)*/
        this.firstClass.splice(index+1,0,{
          typesData:[],           //类别
          editOrNot:true,
          classData:[],
          form: {
            arrangementId: '',
            value:[]
          },
          tableData: [{
            personIdcodeInfo: '',
            personNameInfo: '',
            genderInfo: '',
            credentialsTypeInfo:'',
            orgId:this.orgId,
            matchId:1
          }]
        })
        /*this.getSelect(this.roleType,index+1);*/
      },
      deleteType(index){
        this.firstClass.splice(index,1)
      },
      addPlayer(typeindex,listindex){
        this.firstClass[typeindex].tableData.splice(listindex+1,0,{
          personIdcodeInfo: '',
          personNameInfo: '',
          genderInfo: '',
          credentialsTypeInfo:'',
          orgId:this.orgId,
          matchId:1,
          arrangementId:this.firstClass[typeindex].form.arrangementId,
          orgName:this.clubName
        })
      },
      deletePlayer(typeindex,listindex){
        this.firstClass[typeindex].tableData.splice(listindex,1);
      },
      getSelect(type,index){
        post(url.getSelect,type=='3'?{id:1,personId:this.orgId}:{id:1}).then(res=>{
          let options=res.value.children;
          this.options=options;
          /*this.orgId=JSON.parse(sessionStorage.getItem("userId"));*/
        })
      },

      getStation(){
        post(url.getStation,{matchId:1}).then(res=>{
          this.stationData=res.list;
        })
      },
      getTypes(parms,index){
        for(let item of this.stationData){
          if(item.id==parms){
            this.firstClass[index].form.substationNameInfo=item.name;
            break
          }
        }
        post(url.getTypes,{substationId :parms}).then(res=>{
          this.firstClass[index].typesData=res.list;
        })
      },
      getClass(parms,index){
        for(let item of this.firstClass[index].typesData){
          if(item.id==parms){
            this.firstClass[index].form.levelCategoryNameInfo=item.categoryName;
            break
          }
        }
        this.firstClass[index].form.testLevelInfo='';
        post(url.getClass,{LevelCategoryId:parms}).then(res=>{
          this.firstClass[index].classData=res.list;
        })
      },
      changeClass(parms,index){
        for(let item of this.firstClass[index].classData){
          if(item.id==parms){
            this.firstClass[index].form.testLevelNameInfo=item.name;
            break
          }
        }
      },
      querySearch(queryString, cb){
        let testType=this.firstClass[this.classIndex].typesData;
        let testLevel=this.firstClass[this.classIndex].classData;
        this.firstClass[this.classIndex].tableData[this.typeIndex].genderInfo='';
        this.firstClass[this.classIndex].tableData[this.typeIndex].personIdcodeInfo='';
        this.firstClass[this.classIndex].tableData[this.typeIndex].credentialsTypeInfo='';
        this.firstClass[this.classIndex].tableData[this.typeIndex].personIdInfo='';
        post(url.searchPlayer,{personName  :queryString,testType :testType,testLevel :testLevel,type  :this.matchId})
          .then(res=>{
            this.libraryData=res.data||[];
            for(let i of this.libraryData){
              let personNameInfo=i.personNameInfo;
              let oldLvId=i.oldLvId?i.oldLvId:'';
              let personIdcodeInfo=i.personIdcodeInfo?'('+i.personIdcodeInfo+')':'(未登记身份信息)';

              i.value = personNameInfo+personIdcodeInfo+oldLvId;  //将想要展示的数据作为value
            }
            cb(this.libraryData);
          })
      },
      handleSelect(item) {
        console.log(item);
        if(item.credentialsTypeInfo=='0'){
          item.credentialsTypeInfo='';
        }
        item.orgName=this.clubName;
        Object.assign(this.firstClass[this.classIndex].tableData[this.typeIndex],item,this.firstClass[this.classIndex].form,{orgId:this.orgId,matchId:1});
        /*item.arrangementId=this.firstClass[this.classIndex].form.selectedOptions;*/
        /*this.$set(this.firstClass[this.classIndex].tableData, this.typeIndex, item);*/
        /*this.firstClass[this.classIndex].tableData[this.typeIndex].personIdcodeInfo=item.personIdcodeInfo;
        this.firstClass[this.classIndex].tableData[this.typeIndex].personNameInfo=item.personNameInfo;
        this.firstClass[this.classIndex].tableData[this.typeIndex].genderInfo=item.genderInfo;
        this.firstClass[this.classIndex].tableData[this.typeIndex].credentialsTypeInfo=item.credentialsTypeInfo;
        this.firstClass[this.classIndex].tableData[this.typeIndex].personIdInfo=item.personIdInfo;
        this.firstClass[this.classIndex].tableData[this.typeIndex].arrangementId=this.firstClass[this.classIndex].form.arrangementId;*/
      },
      getIndex(classIndex,typeIndex){
        this.classIndex=classIndex;
        this.typeIndex=typeIndex;
        if(!this.firstClass[this.classIndex].form.arrangementId){
          this.$message({
            message: '请选择等级报名筛选条件',
            type: 'warning'
          });
        }
      },

      handleChange(value,index){
        this.firstClass[index].tableData=[{
          personIdcodeInfo: '',
          personNameInfo: '',
          genderInfo: '',
          credentialsTypeInfo:'',
          orgId:this.orgId,
          matchId:1
        }];
        if(this.roleType=='3'){                               //个人
          this.firstClass[index].tableData=[{
            personIdcodeInfo:  this.credentialsNo,
            personNameInfo:  this.name,
            genderInfollow:this.sex?true:false,   //是否允许修改性别
            TypeInfo:this.TypeInfoTypeInfo?true:false,   //是否允许修改证件type
            genderInfo:  this.sex,
            credentialsTypeInfo: this.credentialsType,
            orgId:'',
            matchId:1,
            arrangementId:value[2],
            personIdInfo:this.orgId
          }];
        }

        this.firstClass[index].typesData=this.$refs[index][0].currentLabels[1];
        this.firstClass[index].classData=this.$refs[index][0].currentLabels[2];
        this.firstClass[index].form.arrangementId=value[2];


        if(this.firstClass[index].classData=='基础级'||this.firstClass[index].classData=='一级'){       //基础级
          console.log(this.clubName);
          this.firstClass[index].editOrNot=false;
          this.firstClass[index].tableData=[{
            personIdcodeInfo: '',
            personNameInfo: '',
            genderInfo: '',
            credentialsTypeInfo:'',
            orgId:this.orgId,
            matchId:1,
            orgName:this.clubName,
            arrangementId:value[2],
          }]
          if(this.roleType=='3'){
            this.firstClass[index].tableData=[{
              personIdcodeInfo:  this.credentialsNo,
              personNameInfo:  this.name,
              genderInfollow:this.sex?true:false,   //是否允许修改性别
              TypeInfo:this.TypeInfoTypeInfo?true:false,   //是否允许修改证件type
              genderInfo:  this.sex,
              credentialsTypeInfo: this.credentialsType,
              orgId:'',
              matchId:1,
              arrangementId:value[2],
              personIdInfo:this.orgId
            }];
          }
        }else{
          this.firstClass[index].editOrNot=true;
        }
      },

      judgeFull(id){
        post(url.judgeFull,{id:id}).then(res => {
          if(res.status==200){
            this.allowApply=res.data;
            if(!this.allowApply&&this.roleType!='4'){
              const h = this.$createElement;
              this.$msgbox({
                title: '完善信息',
                message: h('p', null, [
                  h('span', null, '请到账户中心完善信息 '),
                  h('i', {
                    style: {color: 'teal',cursor:'pointer'},
                    on: {click:  this.clickHandler},
                  },'前往完善信息>>')
                ]),
                showCancelButton: true,
                confirmButtonText: '确定',
                cancelButtonText: '取消',
              }).then(action => {

              });
            }
          }
        });
      },
      clickHandler(){
        this.$msgbox.close();
        this.$router.push({path:'personal/count'});
      },
      getUserMsg (){
        let user=JSON.parse(sessionStorage.getItem('user'));
        post(url.getUserInfo,{id:user.id}).then(res => {

          sessionStorage.setItem('type', JSON.stringify(res.account.type));
          sessionStorage.setItem('userId',JSON.stringify(res.data?res.data.id:''));

          this.orgId=res.data?res.data.id:'';
          this.roleType=res.account.type;
          this.clubName=res.data?res.data.name:'';
          if(this.roleType=='3'){         //个人
            this.$router.push({path:'personal/orderList'})
            this.name=res.data.name;
            this.sex=res.data.sex;
            this.credentialsType=res.data.credentialsType;   //个人证件类别
            this.credentialsNo=res.data.credentialsNo;
          }
          if(this.roleType=='4'){         //游客
            const h = this.$createElement;
            this.$msgbox({
              title: '完善信息',
              message: h('p', null, [
                h('span', null, '请到账户中心完善信息 '),
                h('i', {
                  style: {color: 'teal',cursor:'pointer'},
                  on: {click:  this.clickHandler},
                  },'前往完善信息>>')
              ]),
              showCancelButton: true,
              confirmButtonText: '确定',
            /*  cancelButtonText: '取消',*/
            }).then(action => {

            });
          }
          this.getSelect(this.roleType,0);
          this.judgeFull(user.id);
        });
      }
    },
    created(){
      this.getUserMsg();
    }
  }
</script>

<style type="text/scss" lang="scss" scoped>
  .table-box{
    margin-bottom: 20px;
  }
  .submit-box{
    width: 100%;
    height: 56px;
    background: #e5e5e5;
    position: fixed;
    bottom: 0;
    z-index: 9;
    .submit-content-box{
      width: 1200px;
      margin: 0 auto;
      button{
        height: 55px;
        background: #ff6100;
        color: #fff;
        font-size: 18px;
        font-weight: 700;
        width: 160px;
        float: right;
        border: none;
        cursor: pointer;
      }
    }
  }
  .search-box{
    height: 41px;
    background: #eaf8ff;
    padding-top: 10px;
    border: 1px solid #e8e8e8;
    padding-left: 25px;
    border-bottom: none;
  }

  .table-content{
    padding: 20px;
    border: 1px solid #e8e8e8;
  }
  .title-box{
    font-size: 18px;
    height: 50px;
    line-height: 50px;
    margin: 15px 0 0px;
    border-bottom: 2px solid #e8e8e8;
    .title{
      color: #ff6000;
      border-bottom: 2px solid #ff6000;
      padding: 13px 35px 13px 25px;
      font-weight: 600;
    }
  }
  .test-name{
    height: 40px;
    line-height: 40px;
    color: #000;
    font-size: 14px;
    background: #f6f6f6;
    padding-left: 25px;
  }
</style>
