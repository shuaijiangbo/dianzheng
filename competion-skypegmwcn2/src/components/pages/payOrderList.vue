<template>
  <div id="" class="content" style="width: 100%;">
    <p class="fTitle"><label style="margin-left: 15px;">订单管理</label></p>
    <div class="conten-box">
        <div class="status-box">
          <ul class="">
            <li :class="activeIndex==index?'active':''" @click="changeStatus(index)" v-for="(item,index) in statusList"  class="pay-status">{{item.name}}</li>
          </ul>
        </div>

      <div v-for="(firstItem,index) in  firstClass">
        <template>
          <div class="table-box">
            <div class="search-box">
              <span>赛事：{{firstItem.eventName}}</span>
              <span style="float: right;margin-right: 10px">支付状态：{{firstItem.orderStatus}}</span>
            </div>
            <div class="table-content" v-for="(personData,roleIndex) in firstItem.orderDetail">
              <el-table
                :data="personData.tableData"
                size="mini"
                @selection-change="changeSelect($event,index)"
                border
                style="width: 100%">
                <el-table-column
                  v-for="fieldItem in personData.tHeader"
                  :prop="fieldItem.id"
                  :label="fieldItem.columnName">
                </el-table-column>
              </el-table>
            </div>
            <div class="submit-content-box">
              <button v-if="!firstItem.payStatus" style="float: right" @click="payAll(firstItem.orderNo,firstItem.totalPrice)">立即支付</button>
              <span class="money-box">合计：
                <i class="￥">￥</i>
                <i class="money">{{firstItem.totalPrice}}</i>
              </span>
            </div>
          </div>
        </template>
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
        identity:"2",   //（2=组织，3=个人）
        events:'1',
        orgId:'8104',     //组织
        haveList:true,
        personId:24413,     //个人
        matchId:'1',
        submitList:[],
        payStatus:'A',
          statusList:[{
            name:'全部订单',
            payStatus:'A'
          },{
            name:'已支付',
            payStatus:'Y'
          },{
            name:'未支付',
            payStatus:'N'
          }],
        activeIndex:0,
        firstClass:[
          {
            createTime:'2019-09-09',
            eventName:'2019上半年花样滑冰重庆站',
            orderDetail:[{
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
            }]
          }
        ],
      }
    },
    methods: {
      changeStatus(index){
        this.haveList=false;
        this.activeIndex=index;
        this.payStatus=this.statusList[index].payStatus;
        this.firstClass=[];
        this.getMsgList();
      },
      getMsgList(){
        this.firstClass=[];
        post(url.getAllOrderList,{orderStatus:this.payStatus})
          .then(res=>{
            for(let item of res.data){
              let {createTime,eventName,orderDetails,orderNo,orderStatus,payStatus,totalPrice}=item;
              let obj={
                createTime:createTime,
                eventName:eventName,
                orderNo:orderNo,
                orderStatus:orderStatus,
                payStatus:payStatus,
                totalPrice:totalPrice,
                chooseTip:false,
                orderDetail:[]
              };
              for(let i in orderDetails){
                let orderGingle=orderDetails[i].enrollValueVo.list;
                obj.orderDetail[i]={};
                obj.orderDetail[i].tHeader=orderGingle;
                let tableData={};
                for(var j in orderGingle){
                  let {id,value}=orderGingle[j];
                  tableData[id]=value;
                }
                obj.orderDetail[i].tableData=[];
                obj.orderDetail[i].tableData[0]=tableData;
              }
              this.firstClass.push(obj);
            }
        })
        console.log(this.firstClass);
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
      payAll(orderNo,money){
        this.$router.push({path:'/index/choosePayWay',query:{orderNo:orderNo,money:money}})
      },
      deleteOrderStatus(orderNo){
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          post(url.deleteOrderStatus,{orderNo:orderNo}).then(res=>{
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
        })
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
        this.submitList=submitList;
        if(this.submitList.length)this.haveList=true;
        else this.haveList=false;
        post(url.countMoney,{registrationInfoId:this.submitList}).then(res=>{
          this.totalPrice=res;
        })
      },
      teamChoose(val,index){
        if(val)this.selects.push(this.firstClass[index].enrollNum);
        else{
          this.selects.splice(index,1);
        }
        this.countCost();
      },
    },
    filters:{
      formatPay: function(paystatus) {
        return paystatus == 'N' ? "未支付" : paystatus == 'Y' ? "已支付" : "订单异常";
      },
    },
    created(){
      this.getMsgList();
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
  }

  .fTitle{
    height: 32px;
    line-height: 32px;
    width: 100%;
    background: #fefefe;
    border: 1px solid #ddd;
    margin-bottom: 20px;
    color: #a7a7a7;
  }
  .status-box{
    height: 32px;
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
    padding-left: 25px;
    border-bottom: none;
    font-size: 14px;
  }
  .table-content{
    padding: 20px;
    padding-bottom: 10px;
    /*border: 1px solid #e8e8e8;*/
  }
  .active{
    color: #fff;
    background: #ff6000;
  }
  .￥{
    color:#ff6000;
  }
  .money{
    float: right;
    margin-right: 25px;
    color:#ff6000;
    font-weight: 600;
    font-size: 18px;
  }
  .payDate{
    margin-right: 20px;
  }

  .table-box{
    margin-bottom: 20px;
    border: 1px solid #e8e8e8;
  }
  .submit-content-box{
    padding: 0 20px 10px 0;
    button{
      background: #ff6000;
      color: #fff;
      border: none;
      padding: 5px 10px;
      cursor: pointer;
      font-size: 14px;
    }
    .money-box{
      float: right;
      height: 30px;
      line-height: 30px;
      font-size: 14px;
    }
  }
  .submit-content-box:after{
    content: "";
    clear: both;
    display: block;

  }
</style>
