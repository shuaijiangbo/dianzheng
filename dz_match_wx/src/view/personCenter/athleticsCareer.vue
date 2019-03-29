<template>
  <div class="bs-wp bwbg">
    <top-back titleText="运动生涯" back-url="/personCenter"></top-back>
    <div class="ath-career-wp">
      <div class="ath-info-wp">
        <span class="head">
          <div class="ath-head-wp">
            <img src="../../assets/main/pscen_headphoto.png"/>
          </div>
        </span>
        <span>
          <p class="ath-name">sdfsdfsdfsdfds</p>
          <p>我的运动生涯</p>
        </span>
      </div>
      <div class="time-line-wp">
        <div class="spec-left-line"></div>
        <el-timeline>
          <el-timeline-item>
            <el-card>
              <div class="tl-main-content">
                <div class="cell-dv left">
                  <p class="mtime">2019-01-22 18:00:00</p>
                  <p class="mname">2019沃尔沃汽车成都双遗马拉松</p>
                  <p class="mrank">半程赛第1名</p>
                </div>
                <div class="cell-dv right">
                  <span class="cl-sp cl-lf"><img src="../../assets/main/pscen_matcheg.jpg"/></span>
                  <span class="cl-sp cl-rt lf-bar-bg">
                    <p>详<br/>情</p>
                  </span>
                </div>
              </div>
            </el-card>
          </el-timeline-item>
          <el-timeline-item>
            <el-card>
              <div class="tl-main-content">
                <div class="cell-dv left">
                  <p class="mtime">2019-01-22 18:00:00</p>
                  <p class="mname">2019沃尔沃汽车成都双遗马拉松</p>
                  <p class="mrank">半程赛第1名</p>
                </div>
                <div class="cell-dv right">
                  <span class="cl-sp cl-lf"><img src="../../assets/main/pscen_matcheg.jpg"/></span>
                  <span class="cl-sp cl-rt lf-bar-bg">
                    <p>详<br/>情</p>
                  </span>
                </div>
              </div>
            </el-card>
          </el-timeline-item>
          <el-timeline-item>
            <el-card>
              <div class="tl-main-content">
                <div class="cell-dv left">
                  <p class="mtime">2019-01-22 18:00:00</p>
                  <p class="mname">2019沃尔沃汽车成都双遗马拉松</p>
                  <p class="mrank">半程赛第1名</p>
                </div>
                <div class="cell-dv right">
                  <span class="cl-sp cl-lf"><img src="../../assets/main/pscen_matcheg.jpg"/></span>
                  <span class="cl-sp cl-rt lf-bar-bg">
                    <p>详<br/>情</p>
                  </span>
                </div>
              </div>
            </el-card>
          </el-timeline-item>
        </el-timeline>
      </div>
    </div>
  </div>
</template>

<script>
  import topBack from '@/components/common/topBack';

  export default {
    name: "athleticsCareer",
    data() {
      return {}
    },
    components: {topBack}
  }
</script>

<style scoped lang="scss">
  .ath-career-wp {
    padding: 0.24rem;
    .ath-info-wp {
      display: table;
      width: 100%;
      height: 1.7rem;
      background: url("../../assets/main/pscen_athcareerbg.jpg") no-repeat center center;
      background-size: 100% 100%;
      -webkit-border-radius: 8px;
      -moz-border-radius: 8px;
      border-radius: 8px;
      > span {
        display: table-cell;
        vertical-align: middle;
        &.head {
          padding-left: 0.25rem;
          width: 1.75rem;
        }
        p {
          font-size: 24px;
          color: #fff;
          &.ath-name {
            font-size: 36px;
          }
        }
      }
      .ath-head-wp {
        width: 1.1rem;
        height: 1.1rem;
        border: 3px solid #fff;
        text-align: center;
        -webkit-border-radius: 50%;
        -moz-border-radius: 50%;
        border-radius: 50%;
        > img {
          max-width: 100%;
          max-height: 100%;
        }
      }
    }
    .time-line-wp {
      position: relative;
      padding-top: 26px;
      padding-left: 35px;
      .spec-left-line {
        position: absolute;
        top: 0;
        left: 44px;
        width: 4px;
        height: 26px;
        background-color: #f11821;
      }
      .tl-main-content {
        width: 100%;
        height: 0.94rem;
        .cell-dv {
          display: inline-block;
          float: left;
          height: 100%;
          &.left {
            width: calc(100% - 1.72rem);
          }
          &.right {
            width: 1.72rem;
            border: 1px solid #f32e38;
          }
          p {
            font-size: 18px;
            line-height: 1.0;
            &.mtime {
              margin-bottom: 0.16rem;
              color: #f22937;
            }
            &.mname {
              margin-bottom: 0.1rem;
              font-weight: 600;
            }
            &.mrank {
              color: #666;
            }
          }
          .cl-sp {
            display: inline-block;
            float: left;
            height: 100%;
            text-align: center;
            color: #fff;
            &.cl-lf {
              width: 1.4rem;
              img {
                max-width: 100%;
                height: 100%;
              }
            }
            &.cl-rt {
              width: calc(100% - 1.4rem);
            }
            p {
              margin-top: 0.2rem;
              font-size: 16px;
              white-space: pre-wrap;
              line-height: 0.24rem;
            }
          }
        }
      }
    }
  }
</style>
