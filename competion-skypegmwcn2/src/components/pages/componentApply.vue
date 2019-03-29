<template>
  <div class="content-table-box">
    <div v-if="showContent">
      <div class="content-table">
        <div v-for="(firstItem,index) in  firstClass">
          <template>
            <div class="table-box">
              <div class="search-box">
                <el-form :inline="true" size="mini" >
                  <el-form-item label="报名组别选择">
                    <el-select v-model="firstItem.groupId" placeholder="请选择">
                      <el-option
                        v-for="item in options"
                        :key="item.id"
                        :label="item.groupName"
                        :value="item.id">
                      </el-option>
                    </el-select>
                  </el-form-item>

                  <el-form-item style="float: right">
                    <el-button style="background: #ff6000;border:none;color: #fff;" icon="el-icon-plus" @click="addType(index)">新增类别</el-button>
                    <el-button style="background: #ff6000;border:none;color: #fff;" :disabled="firstClass.length==1" icon="el-icon-delete" @click="deleteType(index)"  type="primary" >删除报名</el-button>
                  </el-form-item>
                </el-form>
              </div>
              <div class="table-content">
                <el-form size="mini" :model="firstItem"  :ref="'ruleForm'+index" >
                  <template v-for="(rolesTable,roleIndex) in firstItem.roleTables">
                    <p class="roleType-title">{{rolesTable.groupName}}
                      <span v-if="rolesTable.lowerLimit>rolesTable.tableData.length" style="color: red; font-size: 14px;float: right;">（最少条数-{{rolesTable.lowerLimit}}）</span>
                    </p>
                    <el-table
                      :data="rolesTable.tableData"
                      size="mini"
                      border
                      style="width: 100%">
                      <el-table-column :label="date.columnName+'('+date.isMandatory+')'" v-for="date in rolesTable.tHeader">
                        <template scope="scope">
                          <el-form-item style="margin-bottom: 0">
                            <el-select v-if="date.columnType=='单选'" style="width: 100%;" v-model=scope.row[date.id] :placeholder='"请选择"+date.columnName'>
                              <el-option
                                v-for="optionItem in date.content"
                                :label="optionItem"
                                :value="optionItem">
                              </el-option>
                            </el-select>
                            <el-input v-if="date.columnType=='文本'||date.columnType=='数字'" :placeholder='"请输入"+date.columnName' v-model=scope.row[date.id]></el-input>

                            <el-upload
                              v-if="date.columnType=='文件'"
                              class="upload-demo"
                              action=""
                              :before-upload="beforeUpload"
                              :on-exceed="handleExceed"
                              :file-list="scope.row.fileList"
                              multiple
                              :limit="1"
                            >
                              <el-button size="small"  @click="getIndex(index,roleIndex,scope.$index)" type="primary">点击上传</el-button>
                            </el-upload>
                          </el-form-item>
                        </template>
                      </el-table-column>

                      <el-table-column label="操作" width="300" align="center" v-if="">
                        <template scope="scope">
                          <el-form-item style="margin-bottom: 0">
                            <el-button size="small" style="padding: 7px 15px;" @click="addPlayer(index,roleIndex,scope.$index)" icon="el-icon-plus">继续添加信息</el-button>
                            <el-button type="danger" style="padding: 7px 15px;" @click="deletePlayer(index,roleIndex,scope.$index)" size="small" :disabled="rolesTable.tableData.length==1" icon="el-icon-delete">删除</el-button>
                          </el-form-item>
                        </template>
                      </el-table-column>
                    </el-table>
                  </template>
                </el-form>
              </div>
            </div>
          </template>
        </div>
      </div>
      <div class="submit-box" v-if="!loginState">
        <div class="submit-content-box">
          <button @click="savePlayer">立即报名</button>
        </div>
      </div>
    </div>
      <div v-else>
        <p class="close-tip">
          {{noApplytxt}}
        </p>
      </div>
  </div>
</template>

<script>
  import axios from 'axios';
  import {get, post} from '@/api/fetch.js';
  import url from '@/api/serviceAPI.config.js';
  import {mapState} from 'vuex'
  export default {
        name: "",
        data(){
          return {
            showContent:true,
            noApplytxt:'该赛事报名已暂停，具体恢复时间以赛事发布方为准',
            loginStatus:true,
            options:[],
            events:null,
            module:[],
            timer:null,
            index:'',
            roleIndex:'',
            personIndex:'',
            firstClass:[
              {
                groupId:'',
                roleTables:[
                  {
                    groupName:'教练员',
                    lowerLimit:'1',
                    upperLimit:'3',
                    tHeader:[{columnName:'俱乐部名称',id:'1',columnType:'1',showName:'1'},  //1:inpit,2:select
                      {columnName:'身份证',id:'2',columnType:'1',showName:'2'},
                      {columnName:'性别',id:'2',columnType:'2',content:['男','女'],showName:'3'}
                    ],
                    tableData:[
                     /* {
                      '1':"老张",
                      '2':'4r75678687678978987098',
                       fileList:[{name: 'food.jpeg'}],
                       file:'',
                      '3':'男'
                    }*/
                    ]
                  },
                  {
                    groupName:'运动员',
                    lowerLimit:'1',
                    upperLimit:'3',
                    tHeader:[{columnName:'俱乐部名称',id:'1',columnType:'1'},  //1:inpit,2:select
                      {columnName:'身份证',id:'2',columnType:'1'},
                      {columnName:'性别',id:'2',columnType:'2',content:['男','女']},
                      {columnName:'类型',id:'2',columnType:'2',content:['身份证','护照']}
                    ],
                    tableData:[

                    ]
                  }
                ]
              }
            ]
          }
        },
      methods:{
        getSelect(index){
          get(url.getEventGroupList,{id:index}).then(res=>{
            let options=res.data;
            this.options=options;
          })
        },
        getEventColumnList(index){
          get(url.getEventColumnList,{id:index}).then(res=>{
            let datas=res.data;
            for(let i in datas){
              let tableData=datas[i];
              tableData.tHeader=tableData.columnList;
              delete tableData.columnList;//删除属性
              tableData.tableData=[];
              let obj={};
              for(let j in tableData.tHeader){
                obj[tableData.tHeader[j].id]='';
                if(tableData.tHeader[j].columnType=='文件'){
                  obj[tableData.tHeader[j].id]='filename=';
                }
                if(tableData.tHeader[j].columnType=='单选'){
                  tableData.tHeader[j].content=tableData.tHeader[j].content.split(';');
                }
              }
              tableData.tableData.push(obj);
            }
            datas=JSON.parse(JSON.stringify(datas));
            this.module={
              groupId:'',
              roleTables: JSON.parse(JSON.stringify(datas))
            }
            this.firstClass[0].roleTables=datas;
          })
          console.log(this.firstClass);
        },
        addPlayer(index,roleIndex,personIndex){
          if(this.firstClass[index].roleTables[roleIndex].tableData.length>=this.firstClass[index].roleTables[roleIndex].upperLimit){
            this.$message.error('人数达上限，新增失败。')
            return false;
          }
          let emptyObj={};
          for(let i in this.firstClass[index].roleTables[roleIndex].tableData[0]){
            emptyObj[i]='';
          }
          this.firstClass[index].roleTables[roleIndex].tableData.splice(personIndex+1,0,emptyObj)
        },
        deletePlayer(index,roleIndex,personIndex){
          this.firstClass[index].roleTables[roleIndex].tableData.splice(personIndex,1)
        },
        addType(index){
          let module=JSON.parse(JSON.stringify(this.module));
          this.firstClass.splice(index+1,0,module)
        },
        deleteType(index){
          this.firstClass.splice(index,1)
        },
        beforeUpload(file) {   //
          this.firstClass[this.index].roleTables[this.roleIndex].tableData[this.personIndex].fileList=[];
          this.firstClass[this.index].roleTables[this.roleIndex].tableData[this.personIndex].file='';
          this.firstClass[this.index].roleTables[this.roleIndex].tableData[this.personIndex].fileList[0]={name: file.name};
          this.firstClass[this.index].roleTables[this.roleIndex].tableData[this.personIndex].file=file
          return false;
        },
        getIndex(index,roleIndex,personIndex){
          this.index=index;
          this.roleIndex=roleIndex;
          this.personIndex=personIndex;
          this.firstClass[this.index].roleTables[this.roleIndex].tableData[this.personIndex].fileList=[];
        },
        handleExceed(files, fileList){
          this.beforeUpload(files[0])
        },
        savePlayer(){
          let _self=this;
          clearTimeout(_self.timer);
          _self.timer=setTimeout(()=>{
            let sendDate={
              eventsId:_self.events.eventId,
              files:[]
            };
            let pm=new FormData();
            pm.append("eventsId",_self.events.eventId);
            let columnLineDatas=[];
            for(let i in _self.firstClass){
              let groupId=_self.firstClass[i].groupId;
              let roleTables=_self.firstClass[i].roleTables;
              for(let j in roleTables){
                let tableData=roleTables[j].tableData;
                for(let k in tableData){
                  let str=`sort###${i}$$$groupId###${groupId}`;
                  let person=tableData[k];
                  for(let w in person){    //每个人信息
                    if(w!='file'){
                      if(person[w]=='filename=') str=`${str}$$$${w}###${person[w]}${person.fileList[0].name}`;
                        else if(w!='fileList')str=`${str}$$$${w}###${person[w]}`;
                    }else if(w=='file'){
                      pm.append("uploadfiles",person[w]);
                    }
                  }
                  columnLineDatas.push(str);
                }
              }
            }
            pm.append("columnLineDatas",columnLineDatas);
            let json=JSON.stringify(sendDate);

            // 创建实例时设置配置的默认值
            var instance = axios.create();
            // 在实例已创建后修改默认值
            instance.defaults.headers.post['Content-Type'] = 'multipart/form-data';
            instance.post(url.saveEnrollInfo,pm).then(result =>{
              if(result.data.status==200){
                _self.$notify({
                  title: '保存成功',
                  duration:1500,
                  message: result.data.message,
                  type: 'success',
                  onClose:()=>{
                    _self.$router.push({path:'/index/personal/orderList'})
                  }
                });
              }else{
                _self.$notify({
                  title: '保存失败',
                  duration:1500,
                  message: result.data.message,
                  type: 'error',
                });
              }
            }).catch(err => {
              console.log(err);
            })
          },500)
        },
        getloginStatus (){                   //判断登录状态
          post(url.loginStatus).then(res => {
            if(res.status == 200){
              this.loginStatus=true;
            }else if(res.status == 500){
              this.loginStatus=false;
              if(!this.loginState){
                this.$router.push({path:'/login'})
              }
            }
          });
        }
      },
    created(){
      this.events=this.events||JSON.parse(sessionStorage.getItem('events'));
      this.getSelect(this.events.eventId);
      this.getEventColumnList(this.events.eventId);
      this.roles=sessionStorage.getItem('publishStatus');   //赛事状态
      this.loginState=sessionStorage.getItem('roles');     //是否预览者
      console.log(sessionStorage.getItem('publishStatus'));
      if(sessionStorage.getItem('publishStatus')=='3'){
        this.showContent=false;
      }
     /* if(sessionStorage.getItem('publishStatus')=='3'||sessionStorage.getItem('noStart')=='true'||sessionStorage.getItem('alreadyEnd')=='true'){
        this.showContent=false;
      }
      if(sessionStorage.getItem('noStart')=='true') {
        this.noApplytxt='报名未开始，尚未开放报名'
      }
      if(sessionStorage.getItem('alreadyEnd')=='true') {
        this.noApplytxt='报名已经结束'
      }*/
      this.getloginStatus();
    },
    mounted(){

      }
    }
</script>

<style type="text/scss" lang="scss" scoped>
  .content-table-box{
    padding: 20px;
    .table-box{
      border: 1px solid #fe8800;
      margin-bottom: 20px;
      .search-box{
        height: 41px;
        background: #eaf8ff;
        padding-top: 10px;
        border-bottom: 1px solid #fe8800;
        padding-left: 25px;
      }
      .table-content{
        form{
          padding: 20px;
          p.roleType-title{
            color: #ff5100;
            padding-left: 10px;
            margin: 10px 0;
            font-weight: bold;
            position: relative;
          }
          p.roleType-title:before{
            display: inline-block;
            height: 15px;
            border-left: 4px solid;
            border-image: -webkit-linear-gradient(#ff5100 , #f6382a , #fd763e)1 10 1; /* 控制边框颜色渐变 */
            border-image: -moz-linear-gradient(#ff5100 , #f6382a , #fd763e)1 10 1;
            border-image: linear-gradient(#ff5100 , #f6382a , #fd763e)1 10 1; /* 标准的必须写在最后 */
            content: "";
            margin-right: 5px;
            position: absolute;
            left: 0;
            top: 3px;
          }
        }
      }
    }
  }
  .submit-box{
    width: 100%;
    height: 56px;
    background: #e5e5e5;
    position: fixed;
    bottom: 0;
    z-index: 9;
    left: 0;
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
  .close-tip{
    text-align: center;
    height: 500px;
    line-height: 500px;
    font-size: 20px;
    color: #ff6100;
    font-weight: bold;
  }
</style>
