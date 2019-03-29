<template>
  <div class="bs-wp bwbg">
    <top-back titleText="订单信息" back-url="/personCenter"></top-back>
    <el-row style="height: auto;">
      <div class="tab-wp">
        <span class="tab" :class="{'active' : orderType == 'all'}" @click="filterOrder('all')">全部订单</span>
        <span class="tab" :class="{'active' : orderType == 'payed'}" @click="filterOrder('payed')">已支付</span>
        <span class="tab" :class="{'active' : orderType == 'nopay'}" @click="filterOrder('nopay')">未支付</span>
      </div>
    </el-row>
    <div class="order-outer-wp">
      <el-row class="order-content">
        <ul>
          <template v-for="(order, index) in orderFilterData">
            <router-link to="/orderDetail">
              <li class="order-list-li" :class="{'nopay' : order.status == '1', 'payed' : order.status == '2'}" :key="index">
                <p class="title">{{order.matchName}}</p>
                <p>组别名称：{{order.groupName}}</p>
                <p>姓名：{{order.name}}</p>
                <p>性别：{{order.sex}}</p>
                <p>身份证：{{order.idCard}}</p>
                <p>报名编号：{{order.signUpNo}}</p>
              </li>
            </router-link>
          </template>
        </ul>
      </el-row>
    </div>
  </div>
</template>

<script>
  import topBack from '@/components/common/topBack';

  export default {
    name: "orderList",
    data() {
      return {
        orderType: 'all',
        orderData: [
          {
            matchName: '2019上半年等级测试',
            groupName: '重庆站自由滑等级测试一级',
            name: '李大嘴1111',
            sex: '男',
            idCard: '5024654621545646',
            signUpNo: '524654564654',
            status: '1'
          },
          {
            matchName: '2019上半年等级测试',
            groupName: '重庆站自由滑等级测试一级',
            name: '李大嘴222',
            sex: '男',
            idCard: '5024654621545646',
            signUpNo: '524654564654',
            status: '1'
          },
          {
            matchName: '2019上半年等级测试',
            groupName: '重庆站自由滑等级测试一级',
            name: '李大嘴333',
            sex: '男',
            idCard: '5024654621545646',
            signUpNo: '524654564654',
            status: '2'
          },
          {
            matchName: '2019上半年等级测试',
            groupName: '重庆站自由滑等级测试一级',
            name: '李大嘴444',
            sex: '男',
            idCard: '5024654621545646',
            signUpNo: '524654564654',
            status: '2'
          }
        ],
        orderFilterData: []
      }
    },
    components: {topBack},
    created() {
      this.orderFilterData = this.orderData;
    },
    methods: {
      filterOrder(orderType) {
        if(this.orderType != orderType){
          this.orderType = orderType;
          let tempArr = [];
          if(orderType == 'payed'){
            tempArr = this.orderData.filter(v => {
              if(v.status == '1'){
                return v;
              }else{
                return false;
              }
            });
          }else if(orderType == 'nopay'){
              tempArr = this.orderData.filter(v => {
              if(v.status == '2'){
                return v;
              }else{
                return false;
              }
            });
          }else{
            tempArr = this.orderData;
          }
          this.orderFilterData = tempArr;
        }
      }
    }
  }
</script>

<style scoped lang="scss">
  .tab{
    display: inline-block;
    float: left;
    width: 33.33%;
    height: 0.7rem;
    line-height: 0.7rem;
    text-align: center;
    font-size: 24px;
    border-top: 1px solid #ddd;
    border-bottom: 1px solid #ddd;
    background-color: #fff;
    &.active{
      color: #f32627;
      border-bottom: 2px solid #f6462f;
    }
  }
  .order-outer-wp{
    height: calc(100% - 1.6rem);
    overflow-y: auto
  }
  .order-content{
    padding: 0.15rem 0.24rem 0 0.24rem;
    .order-list-li{
      margin-bottom: 0.14rem;
      padding: 0.2rem;
      border: 1px solid #ddd;
      border-radius: 10px;
      background-color: #fff;
      &.payed{
        background: url("../../assets/main/pscen_payed.png") no-repeat right top;
      }
      &.nopay{
        background: url("../../assets/main/pscen_nopay.png") no-repeat right top;
      }
      p{
        margin-bottom: 14px;
        line-height: 1.0;
        font-size: 22px;
        color: #666;
        &:last-child{
          margin-bottom: 0;
        }
      }
      .title{
        margin-bottom: 20px;
        font-size: 30px;
        color: #000;
      }
    }
  }
</style>
