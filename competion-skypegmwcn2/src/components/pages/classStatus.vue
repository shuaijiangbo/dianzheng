<template>
    <div class="content-box">
      <div class="content">
        <div class="title-box">
          <span class="title">我的报名</span>
        </div>
        <div class="test-name">
          <span>2019上半年等级测试</span>
          <el-button class="back-btn" size="mini" @click="jumper">返回报名</el-button>
        </div>

         <div v-for="(firstItem,index) in  firstClass">
          <template>
            <div class="table-box">
              <div class="search-box">
                <p>{{firstItem.typesData}}</p>
              </div>
              <div class="table-content">
                <el-table
                  :data="firstItem.tableData"
                  size="mini"
                  @selection-change="changeSelect($event,index)"
                  border
                  style="width: 100%">

                  <el-table-column
                    type="selection"
                    :selectable="selectable"
                    width="55">
                  </el-table-column>

                  <el-table-column
                    label="编号"
                    type="index"
                    width="120">
                  </el-table-column>

                  <el-table-column
                    prop="userName"
                    label="姓名"
                    width="120">
                  </el-table-column>

                  <el-table-column
                    prop="gender"
                    label="性别"
                    :formatter="formatRole"
                    width="120">
                  </el-table-column>

                  <!--<el-table-column
                    prop="gender"
                    :formatter="formatRole"
                    label="性别">
                  </el-table-column>-->

                  <el-table-column
                    prop="cost"
                    label="证件号"
                    show-overflow-tooltip>
                  </el-table-column>

                  <el-table-column
                    prop="userIdcode"
                    label="费用">
                  </el-table-column>

                  <el-table-column
                    label="支付状态">
                    <template  slot-scope="scope">
                      <span :style="{color:scope.row.paystatus=='N'?'#ff6000':''}">{{ scope.row.paystatus|formatPay}}</span>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
            </div>
          </template>
         </div>
        </div>
        <div class="submit-box">
        <div class="submit-content-box">
            <!--<input v-show="false" name="matchId" v-model="matchId"  type="text">-->
            <!--<input v-show="false" name="registrationInfoId" v-model="submitList"  type="text">-->
            <button @click="saveMoney">立即支付</button>
          <p class="price-box">
            <span>合计：</span>
            <span class="total-price">￥{{totalPrice}}</span>
          </p>
        </div>
        </div>
      </div>
<!--    <button @click="jumper">返回报名</button>-->
</template>

<script>
  import {get, post} from '@/api/fetch.js';
  import url from '@/api/serviceAPI.config.js';
    export default {
      name: "",
      data(){
        return {
          identity:"2",   //（2=组织，3=个人）
          events:'1',
          orgId:'8104',     //组织
          matchId:'1',
          totalPrice:0,
          stationData:'',
          submitList:[],
          firstClass:[
           /* {
              typesData:[],           //类别
              typetotalPrice:0,
              typeSubmitList:[],
              tableData: [{
                cost: '',
                userName: '',
                gender: ''
              }]
            }*/
          ],
        }
      },
      methods:{
        jumper(){
            this.$router.push({path:'/index/applyPage',query:{}})
        },
        getEvents(){
            post(url.getStation,{matchId:1}).then(res=>{
            /*this.stationData=res.list;*/
          })
        },
        getMsgList(){
          this.orgId=JSON.parse(sessionStorage.getItem('userId'));
          this.identity=JSON.parse(sessionStorage.getItem("type"));
          post(url.getAllPayList,{matchId:this.events,orgId:this.orgId,personId:this.orgId,payStatus:'A',type:this.identity}).then(res=>{
            for(let item of res.data){
              let arrangement=item.arrangement;
              let registrationinfo=item.registrationinfo;

              let obj={
                typesData:'',           //类别
                typetotalPrice:0,
                typeSubmitList:[],
                tableData: []
              };
              for(let i in arrangement){
                let classname=item.arrangement[i];
                if(classname&&i.indexOf("attribute") != -1) obj.typesData+=classname;
              }
              for(let i in registrationinfo){
                let {personName,id,cost,gender,credentialsNo,payStauts}=registrationinfo[i];
                obj.tableData.push({
                  cost: credentialsNo,                    //身份证
                  userName: personName,
                  gender: gender,
                  userIdcode: cost||0,
                  paystatus:payStauts,
                  id:id,
                })
              }
              this.firstClass.push(obj);
            }
          })
        },
        formatRole: function(row, column) {
          return row.gender == '1' ? "男" : row.gender == '2' ? "女" : "性别不详";
        },
        selectable(row,column) {
          if (row.paystatus == 'Y'){//你需要判断的条件
            return 0;//不可勾选
          } else {
            return 1;//可勾选
          }
        },
        changeSelect(val,index) {
          let typetotalPrice=0;
          let totalPrice=0;
          let typeSubmitList=[];
          let submitList=[];

          for(var item of val){
            typetotalPrice+=parseInt(item.id);
            typeSubmitList.push(item.id);
          }
          this.firstClass[index].typetotalPrice=typetotalPrice;    //单个table总价
          this.firstClass[index].typeSubmitList=typeSubmitList;    //单个table勾选数据

          for(var items of this.firstClass){
            totalPrice+=items.typetotalPrice;
            submitList = submitList.concat(items.typeSubmitList)
          }
          /*this.totalPrice=totalPrice;*/   //前端计算金额
          this.submitList=submitList;

          post(url.countMoney,{registrationInfoId:this.submitList}).then(res=>{
            this.totalPrice=res;
          })
        },
        select(selection, row){
        /*  console.log(selection);
          console.log(row);
          row.userIdcode=111;*/
        },
        saveMoney(){
          post(url.saveMoney,{registrationInfoId:this.submitList,matchId:this.matchId,id:this.orgId,createType:this.identity}).then(res=>{
            this.$router.push({path:'choosePayWay',query:{orderNo:res.orderNo,money:this.totalPrice}});
          })
        }
      },
      filters:{
        formatPay: function(paystatus) {
          return paystatus == 'N' ? "未支付" : paystatus == 'Y' ? "已支付" : paystatus =='P'?'支付中':'订单异常' ;
        },
      },
      created(){
        this.getMsgList();
      }
    }
</script>

<style type="text/scss" lang="scss" scoped>
div{
  color: #000;
}
.table-box{
  margin-bottom: 20px;
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
  background: #f6f6f6;
  color: #000;
  font-size: 14px;
  padding-left: 25px;
  line-height: 40px;
  .back-btn{
    float: right;
    background: #ff6000;
    border: none;
    color: #fff;
    margin: 7px;
  }
}
.search-box{
  height: 50px;
  background: #eaf8ff;
  line-height: 50px;
  border: 1px solid #e8e8e8;
  padding-left: 25px;
  border-bottom: none;
}
.table-content{
  padding: 20px;
  border: 1px solid #e8e8e8;
}

.submit-box{
  width: 100%;
  height: 56px;
  background: #e5e5e5;
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
    .price-box{
      float: right;
      line-height: 56px;
      height: 56px;
      font-size: 14px;
      .total-price{
        color: #ff6100;
        font-size: 20px;
        font-weight: 700;
        margin-right: 20px;
      }
    }
  }
}
</style>
