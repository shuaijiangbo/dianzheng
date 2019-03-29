<template>
  <div class="bs-wp bwbg">
    <top-back titleText="我的参赛" back-url="/personCenter"></top-back>
    <div class="mjm-wp">
      <div class="line-cnt-wp">
        <p class="mmname">2019年上半年等级测试</p>
        <p class="mmtime">比赛时间：2019-02-25</p>
        <p class="mmgrade">最终成绩：166.66</p>
        <el-button class="mth-btn match-log-btn btn-bgc" @click="toMatchLog">赛事日志</el-button>
        <el-button class="mth-btn match-cmt-btn">点  评</el-button>
      </div>
      <div class="line-cnt-wp">
        <p class="mmname">2019年上半年等级测试</p>
        <p class="mmtime">比赛时间：2019-02-25</p>
        <p class="mmgrade">最终成绩：166.66</p>
        <el-button class="mth-btn match-log-btn btn-bgc">赛事日志</el-button>
        <el-button class="mth-btn match-cmt-btn">点  评</el-button>
      </div>
      <div class="line-cnt-wp">
        <p class="mmname">2019年上半年等级测试</p>
        <p class="mmtime">比赛时间：2019-02-25</p>
        <p class="mmgrade">最终成绩：166.66</p>
        <el-button class="mth-btn match-log-btn btn-bgc">赛事日志</el-button>
        <el-button class="mth-btn match-cmt-btn">点  评</el-button>
      </div>
      <div class="line-cnt-wp">
        <p class="mmname">2019年上半年等级测试</p>
        <p class="mmtime">比赛时间：2019-02-25</p>
        <p class="mmgrade">最终成绩：166.66</p>
        <el-button class="mth-btn match-log-btn btn-bgc">赛事日志</el-button>
        <el-button class="mth-btn match-cmt-btn">点  评</el-button>
      </div>
    </div>
  </div>
</template>

<script>
  import topBack from '@/components/common/topBack';

  export default {
    name: "myJoinMatch",
    data() {
      return {}
    },
    components: {topBack},
    methods: {
      toMatchLog() {
        this.$router.push('/matchLog');
      }
    }
  }
</script>

<style scoped lang="scss">
  .mjm-wp {
    padding: 0.36rem 0.24rem;
    .line-cnt-wp {
      position: relative;
      margin-bottom: 0.26rem;
      width: 100%;
      padding: 0.24rem 0.2rem;
      border: 1px solid #ddd;
      background-color: #fff;
      -webkit-border-radius: 8px;
      -moz-border-radius: 8px;
      border-radius: 8px;
      p {
        font-size: 16px;
        color: #666;
        line-height: 1.0;
        &.mmname{
          margin-bottom: 0.2rem;
          font-size: 22px;
          color: #000;
        }
        &.mmtime,
        &.mmgrade{
          max-width: 3.8rem;
        }
        &.mmgrade{
          margin-top: 0.1rem;
        }
      }
      .mth-btn{
        position: absolute;
        bottom: 0.24rem;
        padding: 0;
        width: 1.2rem;
        height: 0.4rem;
        font-size: 18px;
        color: #fff;
        &.match-log-btn{
          right: 1.6rem;
        }
        &.match-cmt-btn{
          right: 0.24rem;
          background: linear-gradient(to right, #45d5cd, #20becb);
          background: -moz-linear-gradient(to right, #45d5cd, #20becb);
          background: -ms-linear-gradient(to right, #45d5cd, #20becb);
          background: -webkit-linear-gradient(left, #45d5cd, #20becb);
        }
      }
    }
  }
</style>
