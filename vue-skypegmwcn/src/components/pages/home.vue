<template>
  <div id="home">
    <!-- 轮播模块-->
    <div class="silder-latest">
      <div class="silder-latest-box">
        <div class="silder-box">
          <banner :bannerNoticList="bannerNoticList"  @jumpDetail="toDeatil"></banner>
        </div>
        <div class="latest-box" :style="{ backgroundImage: 'url('+ latest_bg +')' }">
          <h1 class="latest-title">最新消息</h1>
          <div class="latest-content-box">
            <ul class="latest-lists">
              <template v-for="item in laTest">
                <li class="latest-news-list" @click="toDeatil(item.id)">
                  <span class="latest-news-title">{{item.title}}</span>
                  <span class="latest-news-date">{{item.createTime.split(' ')[0]}}</span>
                </li>
              </template>
            </ul>
            <button class="search-more">查看更多信息</button>
          </div>
        </div>
      </div>
    </div>
    <!-- 轮播模块-->
    <!-- 分会模块-->
    <div class="branch-box">
        <div class="branch-silder-box">
          <banner_grid></banner_grid>
        </div>
    </div>



    <!-- 新闻公告模块-->
    <div class="new-bg-box">
      <div class="new-notice-box">
        <div class="new-box">
          <p class="new-title"><i class="iconfont icon-list"></i> 赛事资讯</p>
          <ul>
            <template v-for="item in competiInformation">
              <li class="news-list" @click="toDeatil(item.id)">
                <span class="news-title ">{{item.title}}</span>
                <span class="news-date ">{{'['+item.createTime.split(' ')[0]+']'}}</span>
              </li>
            </template>
          </ul>
        </div>

        <div class="notice-box">
          <p class="notice-title"><i class="iconfont icon-lingdang"></i> 协会公告</p>
          <ul>
              <li class="notic-list"  v-for="item in associationNotic"  @click="toDeatil(item.id)">
                <p class="times-box">
                  <span class="date">{{item.createTime|separate|getDate}}</span>
                  <span class="year-month">{{item.createTime|separate|getMouth}}</span>
                </p>
                <p class="notice-name">{{item.title}}</p>
              </li>
          </ul>
        </div>
      </div>
    </div>
    <!-- 新闻公告模块-->

    <!-- 图片视频模块-->
    <div class="picturn-video">
      <div class="picturn-video-box">
        <div class="picturn-video-title">
          <i class="icon-vedio" :style="{backgroundImage:'url('+ vedio_bg +')' }"></i>图片·视频
        </div>
        <div class="picturn-video-content">

        </div>
      </div>
    </div>
    <!-- 图片视频模块-->
    <!-- 分块导航模块-->
    <div class="module-nav">
      <ul class="module-nav-box">
        <li class="module-nav-list nav-join" :style="{backgroundImage:'url('+ bg_1+')'}">
          <div class="nav-list-content">
            <img :src="join_icon" class="nav-list-icon" alt="">
            <div class="nav-list-txt">
              <p>报备赛事</p>
              <p class="list-eng-txt">Sporting Events</p>
            </div>
          </div>
        </li>
        <li class="module-nav-list nav-competion" :style="{backgroundImage:'url('+ bg_2+')'}">
          <div class="nav-list-content">
            <img :src="competion_icon" class="nav-list-icon" alt="">
            <div class="nav-list-txt">
              <p>赛事服务</p>
              <p class="list-eng-txt">Event service</p>
            </div>
          </div>
        </li>
        <li class="module-nav-list nav-service" :style="{backgroundImage:'url('+ bg_3+')'}">
          <div class="nav-list-content">
            <img :src="server_icon" class="nav-list-icon" alt="">
            <div class="nav-list-txt">
              <p>协会服务</p>
              <p class="list-eng-txt">sporting events</p>
            </div>
          </div>
        </li>
        <li class="module-nav-list nav-branch" :style="{backgroundImage:'url('+ bg_4+')'}">
          <div class="nav-list-content">
            <img :src="branch_icon" class="nav-list-icon" alt="">
            <div class="nav-list-txt">
              <p>分会一览</p>
              <p class="list-eng-txt">sporting events</p>
            </div>
          </div>
        </li>
        <li class="module-nav-list nav-msgsearch" :style="{backgroundImage:'url('+ bg_5+')'}">
          <div class="nav-list-content">
            <img :src="msgsearch_icon" class="nav-list-icon" alt="">
            <div class="nav-list-txt">
              <p>信息查询</p>
              <p class="list-eng-txt">Sporting Events</p>
            </div>
          </div>
        </li>
        <li class="module-nav-list nav-branch" :style="{backgroundImage:'url('+ bg_1+')'}">
          <div class="nav-list-content">
            <img :src="xiehui_icon" class="nav-list-icon" alt="">
            <div class="nav-list-txt">
              <p>关于协会</p>
              <p class="list-eng-txt">About Association</p>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <!-- 分块导航模块-->
  </div>
</template>
<script>
  import {get, post} from '@/api/fetch.js';
  import url from '@/api/serviceAPI.config.js';
  import banner from '@/components/common/banner';
  import banner_grid from '@/components/common/banner_grid';

  export default {
    name: "register",
    components:{
      banner,
      banner_grid
    },
    data() {
      return {
        latest_bg:require('@/assets/images/latest_bg.png'),
        vedio_bg:require('@/assets/images/video_icon.png'),
        bg_1:require('@/assets/images/bg_1.png'),
        bg_2:require('@/assets/images/bg_2.png'),
        bg_3:require('@/assets/images/bg_3.png'),
        bg_4:require('@/assets/images/bg_4.png'),
        bg_5:require('@/assets/images/bg_5.png'),
        bg_6:require('@/assets/images/bg_5.png'),

        join_icon:require('@/assets/images/join_icon.png'),
        competion_icon:require('@/assets/images/competion_icon.png'),
        server_icon:require('@/assets/images/server_icon.png'),
        branch_icon:require('@/assets/images/branch_icon.png'),
        msgsearch_icon:require('@/assets/images/msgsearch_icon.png'),
        xiehui_icon:require('@/assets/images/xiehui_icon.png'),
        noticList: '',
        laTest:'',
        competiInformation:'',  //赛事资讯
        associationNotic:'',      //协会公告
        bannerNoticList:[],       //赛事资讯
        array: ''
      }
    },

    methods: {
      toDeatil(id) {
        this.$router.push({path: 'portal/athletics/noticeDetail', query: {newsId: id}})
      },
      getBanner(){
        get(url.getNoticList,{tenantCode:1}).then((res) => {
          this.bannerNoticList = res.data.articles;
          this.listLoading = false;
        });
      },
      getLatest(){
        get(url.getLatest,{tentantCode:1}).then((res) => {
          this.laTest = res.data;
        });
      },
      getcompetiMsg(){
        get(url.competiInformation,{tentantCode:1,dictId:13}).then((res) => {
          this.competiInformation = res.data;
        });
      },
      getassociationNotic(){
        get(url.associationNotic,{tentantCode:1,dictId:14}).then((res) => {
          this.associationNotic = res.data;
        });
      }
    },
    created(){
      this.getBanner();
      this.getLatest();
      this.getcompetiMsg();
      this.getassociationNotic();
     /* get(url.getNoticList,{tenantCode:1}).then((res) => {
        this.bannerNoticList = res.data.articles;
        console.log(this.bannerNoticList);
        this.listLoading = false;
      });*/
    },
    filters:{
      separate:function(val){
        return val.split(' ')[0];
      },
      getMouth:(val)=>{return val.split('-')[0]+'-'+val.split('-')[1]},
      getDate:(val)=>{return val.split('-')[2];}
    }
  }
</script>

<style type="text/scss" lang="scss" scoped>
  /*    $base_botton_color:green;*/
  .silder-latest {
    width: 100%;
    height: 476px;
    padding: 20px 0;
    background: #404040;
  }

  .silder-latest-box {
    width: 1200px;
    height: 476px;
    margin: 0 auto;
    .silder-box {
      width: 800px;
      height: 476px;
      background: #3a8ee6;
      float: left;
    }
    .latest-box {
      height: 476px;
      width: 380px;
      margin-left: 20px;
      float: left;
      padding: 20px;
      box-sizing: border-box;
      .latest-title {
        text-align: left;
        width: 100%;
        height: 40px;
        line-height: 40px;
        background: #000;
        color: #fff;
        padding: 0 10px;
        box-sizing: border-box;
      }
      .latest-content-box {
        box-sizing: border-box;
        width: 100%;
        height: 388px;
        background: #fff;
        margin-top: 7px;
        padding: 13px;
        .latest-lists{
          height: 310px;
          width: 100%;
        }
        .latest-news-list {
          height: 34px;
          line-height: 34px;
          .latest-news-title {
            float: left;
          }
          .latest-news-date {
            float: right;
          }
        }
        .latest-news-list:hover{
          color: $base_color;
          cursor: pointer;
        }
      }
      .search-more {
        padding: 16px 33px;
        color: #fff;
        background: $base_color1;
      }
    }
  }

  .branch-box{
    background: $base_color1;
    height: 150px;
    width: 100%;
    .branch-silder-box{
      width: 1200px;
      height: 80px;
      padding: 34px 0;
      margin: 0 auto;
    }
  }


  .new-bg-box {
    width: 100%;
    height: 420px;
    background: #f1f1f1;
    padding: 20px 0;
  }

  .new-notice-box {
    width: 1200px;
    margin: 0 auto;
    height: 420px;

    .new-box, .notice-box {
      width: 590px;
      background: #fff;
      height: 420px;
      float: left;
      padding: 20px;
      box-sizing: border-box;
    }
    .notice-box {
      margin-left: 20px;
    }
    .notice-title, .new-title {
      margin-bottom: 25px;
      text-align: left;
      font-weight: 600;
    }
  }

  .notic-list {
    width: 100%;
    height: 57px;
    margin: 10px 0;
    cursor: pointer;
    .times-box {
      background: $base_color;
      padding: 12px 6px;
      float: left;
      height: 33px;
      color: #fff;
      width: 53px;
      font-size: 13px;
      .date {
        display: block;
        margin-bottom: 3px;
      }
    }
    .notice-name {
      float: left;
      height: 57px;
      line-height: 57px;
      background: #f1f1f1;
      width: 445px;
      padding: 0 20px;
      text-align: left;
    }
  }

  .news-list {
    border-bottom: 1px dashed #a5a6a8;
    position: relative;
    padding-left: 20px;
    height: 49px;
    line-height: 49px;
    .news-title {
      float: left;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      width: 255px;
      height: 100%;
      cursor: pointer;
      text-align: left;
    }
    .news-date {
      float: right;
      margin-right: 80px;
    }
  }

  .news-list:before {
    content: "";
    display: inline-block;
    position: absolute;
    top: 24px;
    left: 6px;
    width: 4px;
    height: 4px;
    background-color: #042444;
    border-radius: 2px;
  }


  .picturn-video{
    width: 100%;
    height: 461px;
    background: #333;
    .picturn-video-box{
      width: 1200px;
      height: 100%;
      padding: 20px 0 30px 0;
      margin: 0 auto;
      box-sizing: border-box;
      .picturn-video-title{
        height: 47px;
        color: #fff;
        text-align: left;
        font-size: 18px;
        .icon-vedio{
          display: inline-block;
          width: 26px;
          height: 26px;
          vertical-align: top;
          margin-right: 10px;
        }
      }
      .picturn-video-content{
        height: 365px;
        width: 100%;
        background: #fff;
      }
    }
  }

  .module-nav{
    height: 453px;
    width: 100%;
    background: #f1f1f1;
    .module-nav-box{
      width: 1224px;
      height: 100%;
      padding: 20px 0 30px 0;
      margin: 0 auto;
      box-sizing: border-box;
      .module-nav-list{
        width: 390px;
        height: 185px;
        float: left;
        margin: 0 0 14px 14px;
      }
      .module-nav-list{
        .nav-list-content{
          margin-left: 70px;
          margin-top: 50px;
          .nav-list-icon{
            float: left;
            margin-right: 15px;
            margin-top: 5px;
          }
          .nav-list-txt{
            float: left;
            text-align: left;
            font-size: 26px;
            color: #fff;
            line-height: 35px;
            .list-eng-txt{
              font-size: 20px;
            }
          }
        }
      }
    }
  }
</style>
