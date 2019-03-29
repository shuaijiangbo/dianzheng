<template>
  <div class="bs-wp">
    <!-- header  -->
    <div class="header-wrap">
      <div class="header">
        <div class="desc">个人中心</div>
        <div class="photo"><img src="../../assets/logo.png"/></div>
        <div class="uname">哟西哟西</div>
      </div>
    </div>
    <!-- my  -->
    <div class="mmatch-wp">
      <div class="my-match">
        <span>
          <router-link to="/myJoinMatch">
            <img src="../../assets/main/pscen_mymatch.png"/>
            <label class="desc-lb">我的参赛</label>
          </router-link>
        </span>
      </div>
      <div class="match-life">
        <span>
          <router-link to="/athleticsCareer">
            <img src="../../assets/main/pscen_matchlife.png"/>
            <label class="desc-lb">运动生涯</label>
           </router-link>
        </span>
      </div>
    </div>
    <!-- ul item  -->
    <div class="ul-wrap">
      <ul class="item-ul">
        <router-link to="/signUpInfo">
          <li>
            <span class="ic iconfont iconbaomingxinxi"></span>
            <span class="iname">报名信息</span>
            <span class="rt iconfont iconrightLink"></span>
          </li>
        </router-link>
        <router-link to="/orderList">
          <li>
            <span class="ic iconfont icondingdan"></span>
            <span class="iname">订单信息</span>
            <span class="rt iconfont iconrightLink"></span>
          </li>
        </router-link>
        <router-link to="/perfectInfo">
          <li>
            <span class="ic iconfont iconwanshanxinxi"></span>
            <span class="iname">完善信息</span>
            <span class="rt iconfont iconrightLink"></span>
          </li>
        </router-link>
        <router-link to="/resetPsd">
          <li>
            <span class="ic iconfont iconmima"></span>
            <span class="iname">修改密码</span>
            <span class="rt iconfont iconrightLink"></span>
         </li>
        </router-link>
        <li style="border-bottom: 1px solid #dedede;">
          <span class="ic iconfont icontuichu"></span>
          <span class="iname">退出</span>
          <span class="rt iconfont iconrightLink"></span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    name: "personCenterIndex",
    data() {
      return {

      }
    }
  }
</script>

<style scoped lang="scss">
  .header-wrap {
    display: table;
    width: 100%;
    height: 3rem;
    background: url("../../assets/main/pscen_topbg.jpg") no-repeat center center;
    background-size: 100% 100%;
    .header {
      display: table-cell;
      vertical-align: middle;
      div {
        text-align: center;
        color: #fff;
        line-height: 1.0;
      }
      .desc {
        margin-bottom: 0.4rem;
        font-size: 36px;
      }
      .photo {
        margin: 0 auto;
        width: 1.3rem;
        height: 1.3rem;
        line-height: 1.3rem;
        text-align: center;
        border: 5px solid #fff;
        -moz-border-radius: 50%;
        -ms-border-radius: 50%;
        border-radius: 50%;
        img {
          max-width: 100%;
          max-height: 100%;
          -moz-border-radius: 50%;
          -ms-border-radius: 50%;
          border-radius: 50%;
        }
      }
      .uname {
        margin-top: 0.14rem;
        font-size: 30px;
      }
    }
  }

  .mmatch-wp {
    padding: 0.12rem 0.2rem;
    width: 100%;
    height: 1.3rem;
    background-color: #fbfbfb;
    > div {
      float: left;
      display: table;
      width: 48%;
      height: 100%;
      -moz-border-radius: 12px;
      -ms-border-radius: 12px;
      border-radius: 12px;
      > span {
        display: table-cell;
        vertical-align: middle;
        text-align: center;
      }
      &.my-match {
        background-color: #6161ff;
      }
      &.match-life {
        margin-left: 4%;
        background-color: #0de181;
      }
      .desc-lb {
        margin-left: 10px;
        vertical-align: -6px;
        font-size: 30px;
        color: #fff;
        line-height: 1.0;
      }
    }
  }

  .ul-wrap {
    .item-ul {
      li {
        padding-left: 0.48rem;
        width: 100%;
        height: 0.75rem;
        line-height: 0.75rem;
        border-top: 1px solid #dedede;
        .ic {
          color: #f32c28;
          font-size: 36px;
        }
        .iname {
          margin-left: 10px;
          font-size: 28px;
          color: #646464;
        }
        .rt {
          float: right;
          margin-right: 25px;
          font-size: 28px;
          color: #d4d4d4;
        }
      }
    }
  }
</style>
