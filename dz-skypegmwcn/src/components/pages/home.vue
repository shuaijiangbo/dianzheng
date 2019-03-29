<template>
  <div id="home">
    <!-- 轮播模块-->
    <div class="silder-latest" :style="{height:bannerHeight}">
        <div class="silder-box">
          <banner_grid></banner_grid>
        </div>
    </div>
    <!-- 轮播模块-->
    <div class="special-projects-box">
      <ul class="special-projects">
        <li @click="changes(project.typeNum,index)" :class="{'active':project.active}" v-for="(project,index) in special_project_data" :style="{backgroundImage:'url('+project.backIcon+')'}">
        <!--<li v-for="(project,index) in special_project_data" :style="{backgroundImage:'url(require('+`'@/assets/images/project_bg${index}.png')`+')'}">-->
            <p class="projects-name">{{project.name}}</p>
            <p class="projects-describe">{{project.describe}}</p>
        </li>
      </ul>
    </div>
    <!-- 所有项目模块-->
    <div class="all-projects-box">
      <ul class="all-projects" :class="{'show-all':showTip}">
        <li class="single-project"
            v-show="nowTypeNum==7?true:nowTypeNum==project.typeNumber?true:false"
            @mouseout="project.isHover=false"
            @mouseover="project.isHover=true"
            v-for="(project,index) in project_data"
            @click="jumper(project.typeNumber,project.typeIndex)">
          <i class="project-icon"  :style="{backgroundImage:'url('+(project.isHover?project_icon_hover:project_icon)+')',backgroundPosition:project.position}"></i>
          <p class="project-name">
            {{project.name}}
          </p>
        </li>
      </ul>
      <div>
        <button  type="button" v-show="nowTypeNum==7" class="learn-more" @click="showTip=!showTip" v-text="showTip?'收起':'查看更多'"></button>
      </div>
    </div>
    <!-- 所有项目模块-->

    <div class="module-wrap-box">
      <div class="module-wrap">
          <div class="slide-body">
              <ul class="slide-content">
                <li class="slide-item" @click="jumperTypePage('itemLIstzhihui',0)">
                  <img class="item-bg" :src=picu01 alt="">
                  <div class="mask">
                    <div class="bg other-bg"></div>
                    <div class="content">
                      <div class="item-img-panel" style="height: 72px;">
                        <img :src=icon_u01 alt="" class="item-img">
                        <img :src=icon_u01_hover alt="" class="item-img-hover">
                      </div>
                      <p class="line-panel">
                        <i class="item-line"></i>
                      </p>
                      <h3 class="item-title">智慧城市解决方案</h3>
                      <p class="item-desc">
                        提供智慧商圈与园区的各种解决方案
                      </p>
                      <span class="item-link">查看详情</span>
                    </div>
                  </div>
                </li>

                <li class="slide-item" @click="jumperTypePage('itemLIsthangye',1)">
                  <img class="item-bg" :src=picu02  alt="">
                  <div class="mask">
                    <div class="bg other-bg"></div>
                    <div class="content">
                      <div class="item-img-panel" style="height: 72px;">
                        <img :src=icon_u02 alt="" class="item-img">
                        <img :src=icon_u02_hover alt="" class="item-img-hover">
                      </div>
                      <p class="line-panel">
                        <i class="item-line"></i>
                      </p>
                      <h3 class="item-title">行业解决方案</h3>
                      <p class="item-desc">
                        为不同行业提供专业解决方案
                      </p>
                      <span class="item-link">查看详情</span>
                    </div>
                  </div>
                </li>

                <li class="slide-item">
                  <a href ="http://www.hotisports.com/">
                  <img class="item-bg":src=picu03  alt="">
                  <div class="mask">
                    <div class="bg other-bg"></div>
                    <div class="content">
                      <div class="item-img-panel" style="height: 72px;">
                        <img :src=icon_u03 alt="" class="item-img">
                        <img :src=icon_u03_hover alt="" class="item-img-hover">
                      </div>
                      <p class="line-panel">
                        <i class="item-line"></i>
                      </p>
                      <h3 class="item-title">体育事业解决方案</h3>
                      <p class="item-desc">
                        提供与体育事业相关的咨询、设计、建设、实施、运营等方案及服务
                      </p>
                      <span class="item-link">查看详情</span>
                    </div>
                  </div>
                  </a>
                </li>
                <li class="slide-item"  @click="jumperTypePage('itemLIstzhineng',3)">
                  <img class="item-bg" :src=picu04  alt="">
                  <div class="mask">
                    <div class="bg other-bg"></div>
                    <div class="content">
                      <div class="item-img-panel" style="height: 72px;">
                        <img :src=icon_u04 alt="" class="item-img">
                        <img :src=icon_u04_hover alt="" class="item-img-hover">
                      </div>
                      <p class="line-panel">
                        <i class="item-line"></i>
                      </p>
                      <h3 class="item-title">智能技术</h3>
                      <p class="item-desc">
                        通过研发与实践，提供可落地的智能技术
                      </p>
                      <span class="item-link">查看详情</span>
                    </div>
                  </div>
                </li>
                <li class="slide-item"  @click="jumperTypePage('itemLIstfuwu',4)">
                  <img class="item-bg" :src=picu05  alt="">
                  <div class="mask">
                    <div class="bg other-bg"></div>
                    <div class="content">
                      <div class="item-img-panel" style="height: 72px;">
                        <img :src=icon_u05 alt="" class="item-img">
                        <img :src=icon_u05_hover alt="" class="item-img-hover">
                      </div>
                      <p class="line-panel">
                        <i class="item-line"></i>
                      </p>
                      <h3 class="item-title">服务内容</h3>
                      <p class="item-desc">
                        提供平台服务、数据服务、咨询服务的三大服务
                      </p>
                      <span class="item-link">查看详情</span>
                    </div>
                  </div>
                </li>
              </ul>
          </div>
      </div>
    </div>
  </div>
</template>
<script>
  import {get, post} from '@/api/fetch.js';
  import url from '@/api/serviceAPI.config.js';
  import banner_grid from '@/components/common/banner_grid';

  import project_bg0 from '@/assets/images/project_bg0.png';
  import project_bg1 from '@/assets/images/project_bg1.png';
  import project_bg2 from '@/assets/images/project_bg2.png';
  import project_bg3 from '@/assets/images/project_bg3.png';
  import project_bg4 from '@/assets/images/project_bg4.png';

  export default {
    name: "register",
    components:{
      banner_grid
    },
    data() {
      return {
        project_icon:require('@/assets/images/sprite_icon.png'),
        project_icon_hover:require('@/assets/images/iconu01_hover.png'),
       /* project_bg0:require('@/assets/images/project_bg0.png'),
        project_bg1:require('@/assets/images/project_bg0.png'),
        project_bg2:require('@/assets/images/project_bg0.png'),
        project_bg3:require('@/assets/images/project_bg0.png'),*/
        picu01:require('@/assets/images/picu01.png'),
        picu02:require('@/assets/images/picu02.png'),
        picu03:require('@/assets/images/picu03.png'),
        picu04:require('@/assets/images/picu04.png'),
        picu05:require('@/assets/images/picu05.png'),

        icon_u01:require('@/assets/images/icon_u01.png'),
        icon_u02:require('@/assets/images/icon_u02.png'),
        icon_u03:require('@/assets/images/icon_u03.png'),
        icon_u04:require('@/assets/images/icon_u04.png'),
        icon_u05:require('@/assets/images/icon_u05.png'),

        icon_u01_hover:require('@/assets/images/icon_u01_hover.png'),
        icon_u02_hover:require('@/assets/images/icon_u02_hover.png'),
        icon_u03_hover:require('@/assets/images/icon_u03_hover.png'),
        icon_u04_hover:require('@/assets/images/icon_u04_hover.png'),
        icon_u05_hover:require('@/assets/images/icon_u05_hover.png'),

        nowTypeNum:7,
        bannerHeight:'',
        noticList: '',
        laTest:'',
        competiInformation:'',  //赛事资讯
        associationNotic:'',      //协会公告
        bannerNoticList:[],       //赛事资讯
        array: '',
        showTip:false,
        hoverBack:false,
        project_data:[{
            name:'智慧商圈',
            position:'0px 0',
            typeNumber:0,
            typeIndex:'1',
            isHover:false
        },{
          name:'智慧园区',
          position:'-48px 0',
          typeNumber:0,
          typeIndex:'2',
          isHover:false
        },{
          name:'互联网+政务服务',
          position:'-96px 0',
          typeNumber:1,
          typeIndex:'1',
          isHover:false
        },{
          name:'政府信用体系建设',
          position:'-144px 0',
          typeNumber:1,
          typeIndex:'2',
          isHover:false
        },{
          name:'法人信息数据库',
          position:'-192px 0',
          typeNumber:1,
          typeIndex:'3',
          isHover:false
        },{
          name:'社区党建系统',
          position:'-240px 0',
          typeNumber:1,
          typeIndex:'4',
          isHover:false
        },{
          name:'应急管理',
          position:'-288px 0',
          typeNumber:1,
          typeIndex:'5',
          isHover:false
        },{
          name:'智慧生态环境管理',
          position:'-336px 0',
          typeNumber:1,
          typeIndex:'6',
          isHover:false
        },{
          name:'海绵城市监测管理',
          position:'-384px 0',
          typeNumber:1,
          typeIndex:'7',
          isHover:false
        },{
          name:'无人机飞控系统',
          position:'-432px 0',
          typeNumber:2,
          typeIndex:'1',
          isHover:false
        },{
          name:'无人机智能吊舱',
          position:'0 -48px',
          typeNumber:2,
          typeIndex:'2',
          isHover:false
        },{
          name:'智慧管线监管',
          position:'-48px -48px',
          typeNumber:2,
          typeIndex:'3',
          isHover:false
        },{
          name:'智能视频分析',
          position:'-144px -48px',
          typeNumber:3,
          typeIndex:'1',
          isHover:false
        },{
          name:'遥感反演分析',
          position:'-192px -48px',
          typeNumber:3,
          typeIndex:'2',
          isHover:false
        },{
          name:'室内定位技术',
          position:'-240px -48px',
          typeNumber:3,
          typeIndex:'3',
          isHover:false
        },{
          name:'咨询服务',
          position:'-432px -48px',
          typeNumber:4,
          typeIndex:'3',
          isHover:false
        },{
          name:'数据共享交换平台',
          position:'-384px -48px',
          typeNumber:5,
          typeIndex:'1',
          isHover:false
        },{
          name:'大数据平台',
          position:'0 -96px',
          typeNumber:5,
          typeIndex:'2',
          isHover:false
        },{
          name:'人工智能平台',
          position:'-48px -96px',
          typeNumber:5,
          typeIndex:'3',
          isHover:false
        },{
          name:'云平台',
          position:'-96px -96px',
          typeNumber:5,
          typeIndex:'4',
          isHover:false
        },{
          name:'物联网平台',
          position:'-144px -96px',
          typeNumber:5,
          typeIndex:'5',
          isHover:false
        }],
        special_project_data:[{
          name:'智慧城市解决方案',
          describe:'辅助招商，快速落地',
          backIcon:project_bg0,
          typeNum:0,
          active:false,
        },{
          name:'行业解决方案',
          describe:'各种信用信息一站式查询，优良信息不良信息公示。',
          backIcon:project_bg1,
          typeNum:1,
          active:false
        },{
          name:'其他解决方案',
          describe:'海关监控、航空施药、无人吊舱',
          backIcon:project_bg2,
          typeNum:2,
          active:false
        },{
          name:'智能技术',
          describe:'智能分析、遥感、室内定位智能技术算法支撑',
          backIcon:project_bg3,
          typeNum:3,
          active:false
        },{
          name:'基础平台产品',
          describe:'多个基础信息平台支撑',
          backIcon:project_bg4,
          typeNum:5,
          active:false
        }],

        firstNames:[
          '智慧城市解决方案',
          '行业解决方案',
          '其他解决方案',
          '智能技术',
          '服务内容',
          '基础平台',
        ],
        jumperParame:[
          [{
            name:"智慧商圈",
            des:"辅助招商，快速落地",
            position:'0px 0',
            typeIndex:'1',
            detailPic:'zhihui_u01',
            icon:'icon-shangquanguimo'
          },{
            name:"智慧园区",
            des:"辅助招商，快速落地，辅助招商，快速落地",
            position:'-48px 0',
            typeIndex:'2',
            detailPic:'zhihui_u02',
            icon:'icon-zhihuihua'
          }],[{
            name:"互联网+政务服务",
            des:"辅助招商，快速落地",
            position:'-96px 0',
            typeIndex:'1',
            detailPic:'hangye_u01',
            icon:'icon-hulianwang'
          },{
            name:"政府信用体系建设",
            des:"辅助招商，快速落地",
            position:'-144px 0',
            typeIndex:'2',
            detailPic:'hangye_u02',
            icon:'icon-xinyong'
          },{
            name:"法人信息数据库",
            des:"辅助招商，快速落地",
            position:'-192px 0',
            typeIndex:'3',
            detailPic:'hangye_u03',
            icon:'icon-web-icon-'
          },{
            name:"社区党建系统",
            des:"辅助招商，快速落地",
            position:'-240px 0',
            typeIndex:'4',
            detailPic:'hangye_u04',
            icon:'icon-dangwugongkai'
          },{
            name:"应急管理",
            des:"辅助招商，快速落地",
            position:'-288px 0',
            typeIndex:'5',
            detailPic:'hangye_u05',
            icon:'icon-yingji'
          },{
            name:"智慧生态环境管理",
            des:"辅助招商，快速落地",
            position:'-336px 0',
            typeIndex:'6',
            detailPic:'hangye_u06',
            icon:'icon-shengtai'
          },{
            name:"海绵城市监测管理",
            des:"辅助招商，快速落地",
            position:'-384px 0',
            typeIndex:'7',
            detailPic:'hangye_u07',
            icon:'icon-shengtaibaohu'
          }],[{
            name:"无人机飞控系统",
            des:"辅助招商，快速落地",
            position:'-432px 0',
            typeIndex:'1',
            detailPic:'qita_u01',
            icon:'icon-UAV'
          },{
            name:"无人机智能吊舱",
            des:"辅助招商，快速落地",
            position:'0 -48px',
            typeIndex:'2',
            detailPic:'qita_u02',
            icon:'icon-wurenji'
          },{
            name:"智慧管线监管",
            des:"辅助招商，快速落地",
            position:'-48px -48px',
            typeIndex:'3',
            detailPic:'qita_u03',
            icon:'icon-guanxianguanli'
          },{
            name:"资产管理系统",
            des:"辅助招商，快速落地",
            position:'-96px -48px',
            typeIndex:'4',
            detailPic:'zhunbei',
            icon:'icon-zichanguanli'
          }],[{
            name:"智能视频分析",
            des:"辅助招商，快速落地",
            position:'-144px -48px',
            typeIndex:'1',
            detailPic:'zhineng_u01',
            icon:'icon-shexiangtou'
          },{
            name:"遥感反演分析",
            des:"辅助招商，快速落地",
            position:'-192px -48px',
            typeIndex:'2',
            detailPic:'zhineng_u02',
            icon:'icon-shujugongxiang'
          },{
            name:"室内定位技术",
            des:"辅助招商，快速落地",
            position:'-240px -48px',
            typeIndex:'3',
            detailPic:'zhineng_u03',
            icon:'icon-shineidingwei'
          }],[{
            name:"平台服务",
            des:"辅助招商，快速落地",
            position:'-144px -48px',
            typeIndex:'1',
            detailPic:'zhunbei',
            icon:'icon-pingtaifuwu'
          },{
            name:"数据服务",
            des:"辅助招商，快速落地",
            position:'-192px -48px',
            typeIndex:'2',
            detailPic:'zhunbei',
            icon:'icon-shuju'
          },{
            name:"咨询服务",
            des:"辅助招商，快速落地",
            position:'-240px -48px',
            typeIndex:'3',
            detailPic:'fuwu_03',
            icon:'icon-icon-'
          }],[{
            name:"数据共享交换平台",
            des:"辅助招商，快速落地",
            position:'-144px -48px',
            typeIndex:'1',
            detailPic:'chanpin_u01',
            icon:'icon-tongyongleigongxiangyuan'
          },{
            name:"大数据平台",
            des:"辅助招商，快速落地",
            position:'-192px -48px',
            typeIndex:'2',
            detailPic:'chanpin_u02',
            icon:'icon-yidongyunkongzhitaiicon58'
          },{
            name:"人工智能平台",
            des:"辅助招商，快速落地",
            position:'-240px -48px',
            typeIndex:'3',
            detailPic:'chanpin_u03',
            icon:'icon-rengongzhineng'
          },{
            name:"云平台",
            des:"辅助招商，快速落地",
            position:'-288px -48px',
            typeIndex:'4',
            detailPic:'chanpin_u04',
            icon:'icon-yunshuju'
          },{
            name:"物联网平台",
            des:"辅助招商，快速落地",
            position:'-336px -48px',
            typeIndex:'5',
            detailPic:'chanpin_u05',
            icon:'icon-keji'
          }]
        ]
      }
    },

    methods: {
      toDeatil(id) {
        this.$router.push({path: 'portal/athletics/noticeDetail', query: {newsId: id}})
      },
      getBanner(){
        post(url.getNoticList).then((res) => {
          this.bannerNoticList = res.data;
          this.listLoading = false;
        });
      },
      getWidth(){
        let _width=document.body.clientWidth;
        this.bannerHeight=(535/1920)*_width+'px';
      },
      jumper(typeNumber,typeIndex){
        let lists=JSON.stringify(this.jumperParame[typeNumber]);
        let newsId=typeIndex;
        this.$router.push({path:'portal/projectDetail',query:{'tabIndex':newsId,'lists':lists,'firstClassActiveIndex':typeNumber,'name':this.firstNames[typeNumber]}})
      },
      jumperTypePage(itemLIstzhihui,index){
        this.$router.push({path:'portal/'+itemLIstzhihui,query:{'typeNumber':index}})
      },
      changes(index,activeIndex){
        this.nowTypeNum=index;
        for(let item of this.special_project_data){
          item.active=false;
        }
        this.special_project_data[activeIndex].active=true;
      }
    },
    created(){
      this.getBanner();
      this.getWidth();
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
/*    height: 476px;*/
    background: #fff;
    .silder-box{
      width: 100%;
      height: 100%;
    }
  }

  .all-projects-box{
    width: 100%;
    font-size: 13px;
    padding-top: 50px;
    padding-bottom: 50px;
    .all-projects{
      width: 1200px;
      margin: 0 auto;
      overflow: hidden;
      height: 260px;
      overflow: hidden;
      transition:0.2s ease-in;
      li.single-project{
        float: left;
        width: 16.6%;
        height: 130px;
        cursor: pointer;
        transition: all ease-in-out .3s;
        i.project-icon{
          display: block;
          height: 48px;
          width: 48px;
          margin: 0 auto;
          background-size: auto;
          background-repeat: no-repeat;
          margin-bottom: 20px;
        }
      }
      li.single-project:hover{
        color: #078dff;
      }
    }
    .show-all{
      height: 600px;
    }
    .learn-more{
      width: 140px;
      height: 40px;
      background: none;
      border: 1px solid #bfbfbf;
    }
  }

  .special-projects-box{
    width: 100%;
    background: #2d3035;
    height: 95px;
    font-size: 13px;
    .special-projects{
      width: 1200px;
      overflow: hidden;
      margin: 0 auto;
      li.active{
        background-color:hsla(0,0%,100%,.06); ;
      }
      li{
        float: left;
        width: 20%;
        padding-top: 18px;
        height: 95px;
        background-position: bottom right;
        background-repeat: no-repeat;
        text-align: left;
        border-left: 1px solid;
        border-color:  hsla(0,0%,100%,.06);
        box-sizing: border-box;
        transition: all .3s;
        .projects-name{
          color: #fff;
          font-size: 15px;
          margin-bottom: 5px;
          margin-left: 10px;
        }
        .projects-describe{
          color: #bbb;
          width: 190px;
          margin-left: 10px;
        }
      }
      li:last-child{
        border-right: 1px solid;
        border-color:  hsla(0,0%,100%,.06);
        box-sizing: border-box;
      }
      li:hover{
        background-color: hsla(0,0%,100%,.06);
        cursor: pointer;
        border-color: transparent!important;
      }
/*      li:nth-child(5){
        border-right: none;
      }*/
    }
  }
  .module-wrap-box{
    width: 100%;
    background: #373d41;
    height: 350px;
    .module-wrap{
      width: 1200px;
      margin: 0 auto;
      height: 350px;
      .slide-body{
        position: relative;
        overflow: hidden;
        height: 350px;
        .slide-content{
          position: absolute;
          left: 0;
          top: 0;
          .slide-item{
            width: 240px;
            height: 350px;
            position: relative;
            float: left;
            color: #000;
            font-size: 0;
            text-align: center;
            /*min-width: 236px;
            max-width: 288px;*/
            min-height: 344px;
            cursor: pointer;
            img.item-bg{
              width: 100%;
              height: 100%;
            }
            .mask{
              position: absolute;
              left: 0;
              right: 0;
              top: 0;
              bottom: 0;
              .bg{
                position: absolute;
                left: 0;
                right: 0;
                top: 0;
                bottom: 0;
                background: #161a1d;
                opacity: .2;
                filter: alpha(opacity=20);
                -ms-filter: progid:DXImageTransform.Microsoft.Alpha(opacity=(20));
                transition: all .4s cubic-bezier(.4,0,.2,1);
              }
              .content{
                position: absolute;
                left: 0;
                right: 0;
                top: 100px;
                bottom: 0;
                transition: all .4s cubic-bezier(.4,0,.2,1);
                .item-img-panel{
                  position: relative;
                  width: 25%;
                  height: 54px;
                  display: inline-block;
                  .item-img,.item-img-hover{
                    position: absolute;
                    left: 0;
                    right: 0;
                    top: 0;
                    width: 100%;
                    display: inline-block;
                    opacity: 1;
                    filter: alpha(opacity=100);
                    -ms-filter: progid:DXImageTransform.Microsoft.Alpha(opacity=(100));
                    transition: all .4s cubic-bezier(.4,0,.2,1);
                  }
                  .item-img-hover{
                    opacity: 0;
                    filter: alpha(opacity=0);
                    -ms-filter: progid:DXImageTransform.Microsoft.Alpha(opacity=(0));
                    transition: all .4s cubic-bezier(.4,0,.2,1);
                  }
                }
                .line-panel{
                  padding: 0;
                  margin: 0;
                  font-size: 0;
                  line-height: 0;
                  margin-top: 20px;
                  transition: all .4s cubic-bezier(.4,0,.2,1);
                  .item-line{
                    width: 20px;
                    height: 2px;
                    background: #fff;
                    display: inline-block;
                    opacity: 1;
                    filter: alpha(opacity=100);
                    -ms-filter: progid:DXImageTransform.Microsoft.Alpha(opacity=(100));
                    transition: all .4s cubic-bezier(.4,0,.2,1);
                  }
                }
                .item-title{
                  color: #fff;
                  font-size: 22px;
                  line-height: 24px;
                  margin: 0;
                  padding: 0;
                  margin-top: 24px;
                  font-weight: 700;
                  transition: all .4s cubic-bezier(.4,0,.2,1);
                }
                .item-desc{
                  font-size: 14px;
                  color: #fff;
                  text-align: center;
                  margin-top: 30px;
                  padding: 0 23px;
                  line-height: 24px;
                  height: 72px;
                }
                .item-link{
                  display: inline-block;
                  border: 1px solid #fff;
                  width: 120px;
                  height: 36px;
                  line-height: 36px;
                  font-size: 14px;
                  color: #fff;
                  text-decoration: none;
                  margin-top: 62px;
                }

                .item-desc,.item-link{
                  opacity: 0;
                  filter: alpha(opacity=0);
                  -ms-filter: progid:DXImageTransform.Microsoft.Alpha(opacity=(0));
                  transition: all .4s cubic-bezier(.4,0,.2,1);
                }
              }
            }
          }

          .slide-item:hover{
            .bg{
              background: #078dff;
              opacity: .8;
              filter: alpha(opacity=80);
              -ms-filter: progid:DXImageTransform.Microsoft.Alpha(opacity=(80));
            }
            .content{
              top: 13%;
              .item-img-panel{
                .item-img{
                  opacity: 0;
                  filter: alpha(opacity=0);
                  -ms-filter: progid:DXImageTransform.Microsoft.Alpha opacity=0;
                  -webkit-transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
                  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
                }
                .item-img-hover {
                  opacity: 1;
                  filter: alpha(opacity=100);
                  -ms-filter: progid:DXImageTransform.Microsoft.Alpha(opacity=(100));
                }
              }

              .item-title{
                margin-top: 12px;
              }

              .line-panel{
                margin-top: 10px;
                .item-line{
                  opacity: 0;
                  filter: alpha(opacity=0);
                  -ms-filter: progid:DXImageTransform.Microsoft.Alpha(opacity=(0));
                }
              }
              .item-desc,.item-link{
                opacity: 1;
                filter: alpha(opacity=100);
                -ms-filter: progid:DXImageTransform.Microsoft.Alpha(opacity=(100));
              }
              .item-desc{
                margin-top: 22px;
              }
              .item-link{
                margin-top: 14%;
              }
            }
          }
        }
      }
    }
  }
</style>
