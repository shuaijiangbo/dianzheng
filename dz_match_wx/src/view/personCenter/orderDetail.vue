<template>
  <div class="bs-wp bwbg">
    <top-back titleText="订单详情" back-url="/orderList"></top-back>
    <el-row>
      <div class="line-textwp">
        <label class="title">2019上半年等级测试</label>
      </div>
      <div class="line-textwp">
        <label>当前状态</label>
        <label class="val-text">已支付</label>
      </div>
      <div class="line-textwp">
        <label>分站</label>
        <label class="val-text"></label>
      </div>
      <div class="line-textwp">
        <label>类型</label>
        <label class="val-text"></label>
      </div>
      <div class="line-textwp">
        <label>等级测试</label>
        <label class="val-text"></label>
      </div>
      <div class="line-textwp">
        <label>姓名</label>
        <label class="val-text"></label>
      </div>
      <div class="line-textwp">
        <label>性别</label>
        <label class="val-text"></label>
      </div>
      <div class="line-textwp">
        <label>身份证</label>
        <label class="val-text"></label>
      </div>
      <div class="line-textwp">
        <label>电话</label>
        <label class="val-text"></label>
      </div>
      <div class="line-textwp" style="border-bottom: 1px solid #ddd;">
        <label>邮箱</label>
        <label class="val-text"></label>
      </div>
    </el-row>
    <el-row class="pnt-wp">
      <el-button class="com-btn">立即支付</el-button>
    </el-row>
  </div>
</template>

<script>
  import topBack from '@/components/common/topBack';

  export default {
    name: "orderDetail",
    data() {
      return {

      }
    },
    components: {topBack}
  }
</script>

<style scoped lang="scss">
  .line-textwp{
    padding: 0 20px;
    width: 100%;
    height: 0.75rem;
    line-height: 0.75rem;
    border-top: 1px solid #ddd;
    background-color: #fff;
    label{
      font-size: 20px;
    }
    .title{
      font-size: 30px;
    }
    .val-text{
      float: right;
      color: #666;
    }
  }

  .pnt-wp{
    margin-top: 0.6rem;
    padding: 0 0.5rem;
  }

</style>
