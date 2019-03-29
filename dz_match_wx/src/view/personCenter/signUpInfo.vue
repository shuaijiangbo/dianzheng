<template>
  <div class="bs-wp bwbg">
    <topBack titleText="报名信息" back-url="/personCenter"></topBack>
    <el-row>
      <div class="sgup-wp">
        <div class="cbody">
          <p class="title">2019上半年等级测试</p>
          <p>组别名称：重庆站自由滑等级测试一级</p>
          <el-row class="player-wp">
            <div class="clog-type">
              <span class="lf-bar-bg"></span>
              <label>运动员信息</label>
            </div>
            <div class="msg-wp">
              <div class="msg-item-line">
                <label>姓名</label>
                <label class="label-val">张三</label>
              </div>
              <div class="msg-item-line">
                <label>姓名</label>
                <label class="label-val">张三</label>
              </div>
              <div class="msg-item-line">
                <label>姓名</label>
                <label class="label-val">张三</label>
              </div>
            </div>
          </el-row>
          <el-row class="coach-wp">
            <div class="clog-type">
              <span class="lf-bar-bg"></span>
              <label>教练员信息</label>
            </div>
            <div class="msg-wp">
              <div class="msg-item-line">
                <label>姓名</label>
                <label class="label-val">张三</label>
              </div>
              <div class="msg-item-line">
                <label>姓名</label>
                <label class="label-val">张三</label>
              </div>
              <div class="msg-item-line">
                <label>姓名</label>
                <label class="label-val">张三</label>
              </div>
            </div>
          </el-row>
          <el-row>
            <el-button class="com-btn btn-bgc">提交报名</el-button>
          </el-row>
        </div>
      </div>
    </el-row>
  </div>
</template>

<script>
  import topBack from '@/components/common/topBack';

  export default {
    name: "signUpMsg",
    data() {
      return {}
    },
    components: {topBack}
  }
</script>

<style scoped lang="scss">
  .sgup-wp {
    margin: 0.25rem 0.25rem 0;
    .cbody {
      padding: 0.35rem 0.22rem 0.25rem;
      border: 1px solid #ddd;
      -webkit-border-radius: 8px;
      -moz-border-radius: 8px;
      border-radius: 8px;
      > p {
        margin-bottom: 0.15rem;
        font-size: 16px;
        color: #666;
        line-height: 1.0;
      }
      .title {
        color: #000;
        font-size: 22px;
      }
      .player-wp,
      .coach-wp{
        margin-bottom: 0.18rem;
      }
      .clog-type {
        margin-bottom: 8px;
        height: 20px;
        line-height: 20px;
        > span {
          display: inline-block;
          float: left;
          width: 5px;
          height: 100%;
        }
        > label {
          float: left;
          margin-left: 8px;
          font-size: 18px;
        }
      }
      .msg-wp {
        .msg-item-line {
          padding-left: 0.22rem;
          padding-right: 0.14rem;
          width: 100%;
          height: 0.6rem;
          line-height: 0.6rem;
          font-size: 20px;
          color: #333;
          border-top: 1px solid #dedede;
          border-left: 1px solid #dedede;
          border-right: 1px solid #dedede;
          &:last-child {
            border-bottom: 1px solid #dedede;
          }
        }
        .label-val {
          float: right;
          color: #666;
        }
      }
    }
  }
</style>
