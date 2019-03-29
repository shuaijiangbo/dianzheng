<template>
  <div class="bs-wp">
    <top-back titleText="赛事日志" back-url="/myJoinMatch"></top-back>
    <div class="mh-log-wp">
      <div class="mh-log-column">
      <div class="top-intro">
        <div class="lf-headPhoto"><img src="../../assets/main/pscen_headphoto.png"/></div>
        <div class="rt-content">
          <p class="author">艾玛电动车</p>
          <p class="log-time">5分钟前</p>
          <p class="content">半程业余组/2h33'34''、 -平均配速 5'41''、 -最高配速 6‘02、 -平均心率 165 次/分、-最高配速 6‘02</p>
          <div class="video-play">
            <img src="../../assets/main/pscen_mlvideo.jpg"/>
          </div>
        </div>
      </div>
      <div class="bottom-oper">
        <span><label class="iconfont iconshoucang"></label><label class="opname">收藏</label></span>
        <span><label class="iconfont iconzhuanfa"></label><label class="opname" title="转发">3</label></span>
        <span><label class="iconfont iconpinglun"></label><label class="opname" title="评论">3</label></span>
        <span><label class="iconfont icondianzan"></label><label class="opname" title="点赞">3</label></span>
      </div>
    </div>
      <div class="mh-log-column">
        <div class="top-intro">
          <div class="lf-headPhoto"><img src="../../assets/main/pscen_headphoto.png"/></div>
          <div class="rt-content">
            <p class="author">艾玛电动车</p>
            <p class="log-time">5分钟前</p>
            <p class="content">半程业余组/2h33'34''、 -平均配速 5'41''、 -最高配速 6‘02、 -平均心率 165 次/分、-最高配速 6‘02</p>
            <div class="video-play">
              <img src="../../assets/main/pscen_mlvideo.jpg"/>
            </div>
          </div>
        </div>
        <div class="bottom-oper">
          <span><label class="iconfont iconshoucang"></label><label class="opname">收藏</label></span>
          <span><label class="iconfont iconzhuanfa"></label><label class="opname" title="转发">3</label></span>
          <span><label class="iconfont iconpinglun"></label><label class="opname" title="评论">3</label></span>
          <span><label class="iconfont icondianzan"></label><label class="opname" title="点赞">3</label></span>
        </div>
      </div>
      <div class="mh-log-column">
        <div class="top-intro">
          <div class="lf-headPhoto"><img src="../../assets/main/pscen_headphoto.png"/></div>
          <div class="rt-content">
            <p class="author">艾玛电动车</p>
            <p class="log-time">5分钟前</p>
            <p class="content">半程业余组/2h33'34''、 -平均配速 5'41''、 -最高配速 6‘02、 -平均心率 165 次/分、-最高配速 6‘02</p>
            <div class="video-play">
              <img src="../../assets/main/pscen_mlvideo.jpg"/>
            </div>
          </div>
        </div>
        <div class="bottom-oper">
          <span><label class="iconfont iconshoucang"></label><label class="opname">收藏</label></span>
          <span><label class="iconfont iconzhuanfa"></label><label class="opname" title="转发">3</label></span>
          <span><label class="iconfont iconpinglun"></label><label class="opname" title="评论">3</label></span>
          <span><label class="iconfont icondianzan"></label><label class="opname" title="点赞">3</label></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import topBack from '@/components/common/topBack';

  export default {
    name: "matchLog",
    data() {
      return {}
    },
    components: {topBack},
  }
</script>

<style scoped lang="scss">
  .mh-log-wp {
    padding: 0.24rem;
    .mh-log-column {
      margin-bottom: 0.26rem;
      padding: 0.24rem;
      width: 100%;
      border: 1px solid #f1f1f1;
      box-shadow: 0 0 10px #e7e7e7;
      overflow: hidden;
      .top-intro {
        overflow: hidden;
      }
      .lf-headPhoto {
        float: left;
        width: 0.6rem;
        height: 0.6rem;
        text-align: center;
        img {
          max-width: 100%;
          height: 100%;
          -webkit-border-radius: 50%;
          -moz-border-radius: 50%;
          border-radius: 50%;
        }
      }
      .rt-content {
        float: left;
        width: calc(100% - 0.6rem);
        padding-left: 0.1rem;
        padding-top: 0.1rem;
        p {
          line-height: 1.0;
        }
        .author {
          margin-bottom: 0.1rem;
          font-size: 18px;
          color: #333;
        }
        .log-time {
          margin-bottom: 0.1rem;
          font-size: 16px;
          color: #999;
        }
        .content {
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          overflow: hidden;
          font-size: 16px;
          line-height: 1.5;
          color: #333;
        }
        .video-play {
          margin-top: 0.1rem;
          width: 5rem;
          height: 2.8rem;
        }
      }
      .bottom-oper {
        margin-top: 0.2rem;
        overflow: hidden;
        > span {
          float: left;
          display: table-cell;
          width: 25%;
          color: #666;
          text-align: center;
          border-right: 1px solid #ddd;
          &:last-child {
            border-right: none;
          }
          .opname {
            margin-left: 6px;
            font-size: 14px;
          }
          .iconfont{
            font-size: 18px;
          }
          > label {
            display: inline-block;
            vertical-align: middle;
            margin-top: -2px;
            height: 0.24rem;
            line-height: 0.2rem;
          }
        }
      }
    }
  }
</style>
