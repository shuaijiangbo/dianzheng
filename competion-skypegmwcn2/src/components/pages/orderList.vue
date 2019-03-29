<template>
  <div id="" class="content" style="width: 100%;">
    <p class="fTitle"><label style="margin-left: 15px;">报名信息</label></p>
    <div class="conten-box">
        <div class="status-box">
          <label for="">选择赛事：</label>
          <el-select v-model="eventId"  @change="changeEvent">
            <el-option
              v-for="item in options"
              :key="item.id"
              :label="item.eventName"
              :value="item.id">
            </el-option>
          </el-select>
          <!--<ul class="">
            <li :class="activeIndex==index?'active':''" @click="changeStatus(index)" v-for="(item,index) in statusList"  class="pay-status">{{item.name}}</li>
          </ul>-->
      </div>

      <div v-for="(firstItem,index) in  firstClass">
        <template>
          <div class="table-box">
            <div class="search-box">
              <p>
               <el-checkbox  v-if="firstItem.participating"
                            v-model="firstItem.chooseTip" @change="teamChoose($event,index,firstItem.enrollNum)"></el-checkbox>
                <span>{{firstItem.eventGroupName}}</span>
               <span style="color: #666;font-size: 12px">{{firstItem.createTime}}</span>
               <span style="color: #666;font-size: 12px;margin-left:10px" v-if="firstItem.participating">报名编号:{{firstItem.enrollNum}}</span>
               <span v-if="firstItem.participating" style="float: right;color: #ff6000">￥{{firstItem.money}}</span>
               <span v-if="firstItem.participating" style="float: right">{{firstItem.payStatus}}-</span>
              </p>
            </div>
            <div class="table-content"  v-for="(rolesTable,roleIndex) in firstItem.roleTables">
              <p class="role-title">{{rolesTable.roleName}}</p>
              <el-table
                :data="rolesTable.tableData"
                @selection-change="handleSelectionChange($event,index,roleIndex)"
                size="mini"
                border
                style="width: 100%">
                <el-table-column
                    type="selection"
                    :selectable=getSelect
                    width="55">
                </el-table-column>
                <el-table-column v-for="date in rolesTable.tHeader"
                                  :label="date.columnName"
                                  :prop="date.id">
                </el-table-column>
              </el-table>
            </div>
          </div>
        </template>
      </div>
      <div class="submit-box">
      <div data-v-00ad882c="" class="submit-content-box">
        <button @click="payAll" :class="{'disarrow-pay-all':!selects.length}" :disabled="!selects.length">立即报名</button>
        <span class="money-box">合计：
          <i class="￥">￥</i>
          <i class="money">{{totalPrice}}</i>
        </span>
      </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {get, post} from '@/api/fetch.js';
  import url from '@/api/serviceAPI.config.js';

  export default {
    data() {
      return {
        selects:[],
        options:null,
        totalPrice:0,
        eventId:'',
        firstClass:[
          {
            chooseTip:'',
            enrollNum:'',
            createTime:'',
            eventGroupName:'男女子甲组',
            payStatus:'免费',
            money:'￥88',
            participating:'ture',
            roleTables:[
              {
                roleName:'教练员',
                submitList:[],
                tHeader:[{columnName:'俱乐部名称',id:'1'},
                  {columnName:'身份证',id:'2'},
                  {columnName:'性别',id:'3'}
                ],
                tableData:[
                   {
                     '1':"老张",
                     '2':'4r75678687678978987098',
                     '3':'男'
                  }
                ]
              },
              {
                roleName:'运动员',
                submitList:[],
                tHeader:[{columnName:'俱乐部名称',id:'1'},
                  {columnName:'身份证',id:'2',},
                  {columnName:'性别',id:'2',},
                  {columnName:'类型',id:'2',}
                ],
                tableData:[
                  {
                    '1':"老张",
                    '2':'4r75678687678978987098',
                    '3':'男'
                  }
                ]
              }
            ]
          }
        ]
      }
    },
    methods: {
      getEventlist(){
        this.getMsgList();
        post(url.listEventsByEnroll).then(res=>{
          this.options= res.data
          this.eventId=this.options[0].id;
        })
      },
      changeStatus(index){
        this.haveList=false;
        this.activeIndex=index;
        this.payStatus=this.statusList[index].payStatus
        this.firstClass=[];
        this.getMsgList();
      },
      getMsgList(){
        this.firstClass=[];
        post(url.getApplyList,{createId:1,eventId:this.eventId})
          .then(res=>{
            let firstObj=[];
          for(let i in res.data){
            let {eventGroupName,payStatus,participating,money,list,enrollNum, createTime}=res.data[i];
            firstObj[i]={        //
              chooseTip:false,
              eventGroupName:eventGroupName,
              payStatus:payStatus,
              enrollNum:enrollNum,
              createTime:createTime,
              money:money,
              participating:participating,
              roleTables:[]
            };
            for(var j in list){
              let obj={
                submitList:[],
              };
              let roleTypeList=list[j];             //运动员或者教练员所有信息
              let roleName=roleTypeList.enrollGroupName;   //运动员或者教练员
              let tableData=roleTypeList.list;  //该身份下所有的人员
              let tHeader=tableData[0].list;    //人员字段
              let tableNewData=[];
              obj.roleName=roleName;

              obj.tHeader=tHeader;
              for(var k in tableData){
                let {uniqueIdentifier,list,payStatus,participating,enrollNum}=tableData[k];
                let personObj={
                  participating:participating,
                  enrollNum:enrollNum
                };
                for(var w in list){
                  personObj[list[w].id]=list[w].value;
                }
                tableNewData.push(personObj);
              }
              obj.tableData=tableNewData;
              firstObj[i].roleTables.push(obj);
            }
          }
          this.firstClass=JSON.parse(JSON.stringify(firstObj));
        })
      },
      formatRole: function(row, column) {
        return row.gender == '1' ? "男" : row.gender == '2' ? "女" : "性别不详";
      },
      getSelect(row,column) {
        if (row.participating){//你需要判断的条件
          return 1;//可勾选
        } else {
          return 0;//不可勾选
        }
      },
      paySingle(id){
        post(url.saveMoney1,{registrationInfoId:id||this.submitList,matchId:this.matchId,id:this.orgId,createType:this.identity}).then(res=>{
          this.$router.push({path:'/index/choosePayWay',query:{orderNo:res.orderNo,money:res.cost}});
        })
      },
      payAll(){
        post(url.addPayOrder,{enrollNum:this.selects.join(','),eventsId :this.eventId}).then(res=>{
          if(res.type=='2'){
            this.$router.push({path:'/index/otherPayWay',query:{chargesInfo:res.chargesInfo}});
          }else{
            this.$router.push({path:'/index/choosePayWay',query:{orderNo:res.orderNo,money:res.cost}});
          }
        })
      },
      deletes(id){
        let ids=id||this.submitList
        post(url.deletePlay,{registrationInfoId:ids,matchId:this.matchId}).then(res=>{
          if(res.status==200){
            this.$notify({
              title: '删除成功',
              message: '删除成功',
              type: 'success',
              duration: 2000,
              onClose:()=>{
                this.getMsgList();
              }
            });
          }else{
            this.$notify({
              title: '删除失败',
              message: '删除失败',
              type: 'error',
              duration: 2000
            });
          }
        })
      },
      handleSelectionChange(val,index,roleIndex) {
        let typeSubmitList=[];
        let selects=[];
        for(var item of val){
          typeSubmitList.push(item.enrollNum);
        }
        this.firstClass[index].roleTables[roleIndex].submitList=typeSubmitList;
        for(var i in this.firstClass){
          let roleTables=this.firstClass[i].roleTables;
          for(var j in roleTables){
            selects=selects.concat(roleTables[j].submitList);
          }
        }
        this.selects=selects;
     /*   this.selects=Array.from(new Set(selects.concat(typeSubmitList))); //合并set去重，类数组转数组
        let kk=this.selects.join(',');*/
        this.countCost();
      },
      selectable(row,column) {
        if (row.participating){   //你需要判断的条件
          return 0;//不可勾选
        } else {
          return 1;//可勾选
        }
      },
      changeEvent(val){
        this.eventId=val;
        this.selects=[];
        this.totalPrice=0;
        this.getMsgList();
      },
      teamChoose(val,index,enrollNum){
        if(val){
          this.selects.push(this.firstClass[index].enrollNum);
        }
        else{
          let index = this.selects.indexOf(enrollNum);
          this.selects.splice(index,1);
        }
        this.countCost();
      },
      countCost(){
        post(url.conutOrderMoney,{enrollNum:this.selects.join(',')}).then(res=>{
          this.totalPrice=res;
        })
      }
    },
    filters:{
      formatPay: function(paystatus) {
        return paystatus == 'N' ? "未支付" : paystatus == 'Y' ? "已支付" : paystatus =='P'?'支付中':'订单异常' ;
      },
    },
    created(){
      this.getEventlist();
    }
  }
</script>

<style type="text/scss" lang="scss" scoped>
  .pay-all{
    padding: 7px 15px;
    border: none;
    background: rgb(255, 96, 0);
    color: #fff;
    cursor: pointer;
    float: right;
  }

  .fTitle{
    height: 55px;
    line-height: 55px;
    width: 100%;
    background: #fefefe;
    border: 1px solid #ddd;
    margin-bottom: 20px;
    color: #a7a7a7;
  }
  .status-box{
    height: 55px;
    border-bottom: 2px solid #ff6000;
  }
.pay-status{
  float: left;
  width: 110px;
  height: 31px;
  text-align: center;
  line-height: 31px;
  border: 1px solid #ddd;
  background: #f9f9f9;
  cursor: pointer;
  margin-right: 15px;
  border-bottom: none;
  color: #666;
}
  .search-box{
    height: 50px;
    background: #eaf8ff;
    line-height: 50px;
    border-bottom: 1px solid #e8e8e8;
    padding:0 25px;
  }
  .table-box{
    border: 1px solid #e8e8e8;
    margin-bottom: 20px;
  }
  .table-content{
    padding: 20px;
    width: 940px;
  }
  .active{
    color: #fff;
    background: #ff6000;
  }
  .role-title{
    color: #ff5100;
    padding-left: 10px;
    margin: 10px 0;
    font-weight: bold;
    position: relative;
  }
  .role-title:before{
    display: inline-block;
    height: 15px;
    border-left: 4px solid;
    -o-border-image: linear-gradient(#ff5100, #f6382a, #fd763e) 1 10 1;
    border-image: -webkit-gradient(linear, left top, left bottom, from(#ff5100), color-stop(#f6382a), to(#fd763e)) 1 10 1;
    border-image: linear-gradient(#ff5100, #f6382a, #fd763e) 1 10 1;
    content: "";
    margin-right: 5px;
    position: absolute;
    left: 0;
    top: 3px;
  }

  .submit-box{
    width: 100%;
    height: 56px;
    background: #e5e5e5;
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 9;
    .money-box{
      font-size: 14px;
      margin-right: 10px;
      color: #717171;
      .money{
        color: #ff6100;
        font-size: 20px;
        font-weight: bold;
      }
      .￥{
        color: #ff6100;
        font-size: 14px;
        font-weight: bold;
      }
    }
    .submit-content-box{
      width: 1200px;
      margin: 0 auto;
      span{
        float: right;
        display: inline-block;
        height: 60px;
        line-height: 60px;
      }
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
      button.disarrow-pay-all{
        color: #fff;
        background: #ddd;
        cursor: no-drop;
      }
    }
  }
</style>
