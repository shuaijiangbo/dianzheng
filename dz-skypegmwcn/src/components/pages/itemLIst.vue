<template>
  <div style="width: 1200px;margin: 0 auto" :key="times">
   <div style="width: 150px;height: 16px">

    </div>
    <div class="heads"  :style="{backgroundImage:'url('+ heads+')'}">
      <p class="head_text">{{thisTpyeList.name}}</p>
    </div>

    <div class="contents" >
      <div class="con_box" v-for="item in thisTpyeList.childrens" @click="jupmer(item.typeIndex,thisTpyeListJson)">
        <div class="con_head">
          <div class="icon-box">
            <i class="icon"  :style="{backgroundImage:'url('+project_icon+')',backgroundPosition:item.position}"></i>
          </div>
          <div class="title_text">{{item.name}}</div>
          <div class="title_text1">{{item.des}}</div>
        </div>
        <div class="imgs">
          <img :src="item.pic"/>
        </div>
        <div class="btn">查看详情</div>
      </div>
    </div>
  </div>
</template>

<script>
  import zhihui_u01 from '@/assets/images/itemsmalllist/zhihui_u01.jpg'
  import zhihui_u02 from '@/assets/images/itemsmalllist/zhihui_u02.jpg'

  import hangye_u01 from '@/assets/images/itemsmalllist/hangye_u01.jpg'
  import hangye_u02 from '@/assets/images/itemsmalllist/hangye_u02.jpg'
  import hangye_u03 from '@/assets/images/itemsmalllist/hangye_u03.jpg'
  import hangye_u04 from '@/assets/images/itemsmalllist/hangye_u04.jpg'
  import hangye_u05 from '@/assets/images/itemsmalllist/hangye_u05.jpg'
  import hangye_u06 from '@/assets/images/itemsmalllist/hangye_u06.jpg'
  import hangye_u07 from '@/assets/images/itemsmalllist/hangye_u07.jpg'

  import qita_u01 from '@/assets/images/itemsmalllist/qita_u01.jpg'
  import qita_u02 from '@/assets/images/itemsmalllist/qita_u02.jpg'
  import qita_u03 from '@/assets/images/itemsmalllist/qita_u03.jpg'
  import qita_u04 from '@/assets/images/itemsmalllist/qita_u04.jpg'


  import zhineng_u01 from '@/assets/images/itemsmalllist/zhineng_u01.jpg'
  import zhineng_u02 from '@/assets/images/itemsmalllist/zhineng_u02.jpg'
  import zhineng_u03 from '@/assets/images/itemsmalllist/zhineng_u03.jpg'

  import zhunbei from '@/assets/images/itemlist/zhunbei.jpg'
  import fuwu_03 from '@/assets/images/itemsmalllist/fuwu_03.jpg'


  import chanpin_u01 from '@/assets/images/itemsmalllist/chanpin_u01.jpg'
  import chanpin_u02 from '@/assets/images/itemsmalllist/chanpin_u02.jpg'
  import chanpin_u03 from '@/assets/images/itemsmalllist/chanpin_u03.jpg'
  import chanpin_u04 from '@/assets/images/itemsmalllist/chanpin_u04.jpg'
  import chanpin_u05 from '@/assets/images/itemsmalllist/chanpin_u05.jpg'


  export default {
    name: 'HelloWorld',
    data() {
      return{
        heads:require('@/assets/images/itemlist/heads.png'),
        project_icon:require('@/assets/images/sprite_icon.png'),
        times:new Date().getTime()+'',

        thisTpyeList:'',
        secondList:[{
          name:'智慧城市解决方案',
          childrens:[{
              name:"智慧商圈",
              des:"",
              position:'0px 0',
              typeIndex:'1',
              pic:zhihui_u01,
              detailPic:'zhihui_u01',
              icon:'icon-shangquanguimo'
          },{
            name:"智慧园区",
            des:"",
            position:'-48px 0',
            typeIndex:'2',
            pic:zhihui_u02,
            detailPic:'zhihui_u02',
            icon:'icon-zhihuihua'
          }]
        },{
          name:'行业解决方案',
          childrens:[{
            name:"互联网+政务服务",
            des:"",
            position:'-96px 0',
            typeIndex:'1',
            pic:hangye_u01,
            detailPic:'hangye_u01',
            icon:'icon-hulianwang'
          },{
            name:"政府信用体系建设",
            des:"",
            position:'-144px 0',
            typeIndex:'2',
            pic:hangye_u02,
            detailPic:'hangye_u02',
            icon:'icon-xinyong'
          },{
            name:"法人信息数据库",
            des:"",
            position:'-192px 0',
            typeIndex:'3',
            pic:hangye_u03,
            detailPic:'hangye_u03',
            icon:'icon-web-icon-'
          },{
            name:"社区党建系统",
            des:"",
            position:'-240px 0',
            typeIndex:'4',
            pic:hangye_u04,
            detailPic:'hangye_u04',
            icon:'icon-dangwugongkai'
          },{
            name:"应急管理",
            des:"",
            position:'-288px 0',
            typeIndex:'5',
            pic:hangye_u05,
            detailPic:'hangye_u05',
            icon:'icon-yingji'
          },{
            name:"智慧生态环境管理",
            des:"",
            position:'-336px 0',
            typeIndex:'6',
            pic:hangye_u06,
            detailPic:'hangye_u06',
            icon:'icon-shengtai'
          },{
            name:"海绵城市监测管理",
            des:"",
            position:'-384px 0',
            typeIndex:'7',
            pic:hangye_u07,
            detailPic:'hangye_u07',
            icon:'icon-shengtaibaohu'
          }]
        },{
          name:'其他解决方案',
          childrens:[{
            name:"无人机飞控系统",
            des:"",
            position:'-432px 0',
            typeIndex:'1',
            pic:qita_u01,
            detailPic:'qita_u01',
            icon:'icon-UAV'
          },{
            name:"无人机智能吊舱",
            des:"",
            position:'0 -48px',
            typeIndex:'2',
            pic:qita_u02,
            detailPic:'qita_u02',
            icon:'icon-wurenji'
          },{
            name:"智慧管线监管",
            des:"",
            position:'-48px -48px',
            typeIndex:'3',
            pic:qita_u03,
            detailPic:'qita_u03',
            icon:'icon-guanxianguanli'
          },{
            name:"资产管理系统",
            des:"",
            position:'-96px -48px',
            typeIndex:'4',
            pic:zhunbei,
            detailPic:'zhunbei',
            icon:'icon-zichanguanli'
          }]
        },{
          name:'智能技术',
          childrens:[{
            name:"智能视频分析",
            des:"",
            position:'-384px -48px',
            typeIndex:'1',
            pic:zhineng_u01,
            detailPic:'zhineng_u01',
            icon:'icon-shexiangtou'
          },{
            name:"遥感反演分析",
            des:"",
            position:'-432px -48px',
            typeIndex:'2',
            pic:zhineng_u02,
            detailPic:'zhineng_u02',
            icon:'icon-shujugongxiang'
          },{
            name:"室内定位技术",
            des:"",
            position:'-0 -96px',
            typeIndex:'3',
            pic:zhineng_u03,
            detailPic:'zhineng_u03',
            icon:'icon-shineidingwei'
          }]
        },{
          name:'服务内容',
          childrens:[{
            name:"平台服务",
            des:"",
            position:'-48px -96px',
            typeIndex:'1',
            pic:zhunbei,
            detailPic:'zhunbei',
            icon:'icon-pingtaifuwu'
          },{
            name:"数据服务",
            des:"",
            position:'-96px -96px',
            typeIndex:'2',
            pic:zhunbei,
            detailPic:'zhunbei',
            icon:'icon-shuju'
          },{
            name:"咨询服务",
            des:"",
            position:'-144px -96px',
            typeIndex:'3',
            pic:fuwu_03,
            detailPic:'fuwu_03',
            icon:'icon-icon-'
          }]
        },{
          name:'基础平台产品',
          childrens:[{
            name:"数据共享交换平台",
            des:"",
            position:'-144px -48px',
            typeIndex:'1',
            pic:chanpin_u01,
            detailPic:'chanpin_u01',
            icon:'icon-tongyongleigongxiangyuan'
          },{
            name:"大数据平台",
            des:"",
            position:'-192px -48px',
            typeIndex:'2',
            pic:chanpin_u02,
            detailPic:'chanpin_u02',
            icon:'icon-yidongyunkongzhitaiicon58'
          },{
            name:"人工智能平台",
            des:"",
            position:'-240px -48px',
            typeIndex:'3',
            pic:chanpin_u03,
            detailPic:'chanpin_u03',
            icon:'icon-rengongzhineng'
          },{
            name:"云平台",
            des:"",
            position:'-288px -48px',
            typeIndex:'4',
            pic:chanpin_u04,
            detailPic:'chanpin_u04',
            icon:'icon-yunshuju'
          },{
            name:"物联网平台",
            des:"",
            position:'-336px -48px',
            typeIndex:'5',
            pic:chanpin_u05,
            detailPic:'chanpin_u05',
            icon:'icon-keji'
          }]
        }]
      }
    },
    methods: {
      jupmer(newsId,lists){
        this.$router.push({path:'projectDetail',query:{'tabIndex':newsId,'lists':lists,'name':this.thisTpyeList.name}})
      },
      setData(){
          this.thisTpyeList=this.secondList[this.typeNumber];
          this.thisTpyeListJson=JSON.stringify(this.thisTpyeList.childrens);
      },
      init(){
        this.typeNumber=this.$route.query.typeNumber;
        this.setData();
      }
    },
    created(){
      this.init();
    }
    ,watch:{
      $route(to,from){
        this.activeIndex=to.meta.first;
        this.init();
      }
    },
  }
</script>
<style type="text/scss" lang="scss" scoped>
  .heads{
    width: 1200px;
    height: 92px;
    background-size: 100%;
    margin: 0 auto;
  }
  .head_text{
    font-size: 40px;
    color: white;
    text-align: center;
    line-height: 85px;
    margin-top: 12px;
  }
  .contents{
    white:1200px;
    min-height: 400px;
    margin-top: 30px;
  }
  .con_box{
    width: 364px;
    height: 336px;
    border: 1px solid #d2d2d2;
    float: left;
    margin-right:50px;
    margin-bottom: 30px;
  }
  .con_box:hover{
    cursor: pointer;
  }
  .con_box:nth-child(3n+0)
  {
    margin-right:0;
  }
  .con_head{
    width: 100%;
    height: 98px;
    background-color: #ebebec;
    text-align: left;
  }
  .imgs{
    width: 280px;
    height: 136px;
    margin: 0 auto;
    margin-top: 24px;
  }
  img{
    width: 100%;
    height: 100%;
  }
  .btn{
    width: 94px;
    height: 30px;
    margin-top: 24px;
    color: white;
    background-color: #00c5e9;
    text-align: center;
    margin-left: 128px;
    line-height: 30px;
    cursor: pointer;
  }
  .icon-box{
    width: 48px;
    height: 48px;
    margin-left: 62px;
    margin-top: 24px;
    float: left;
    .icon{
      width: 100%;
      height: 100%;
      display: inline-block;

    }
  }
  .title_text{
    width: 200px;
    float: left;
    color: #191919;
    font-size: 15px;
    margin-top: 28px;
    margin-left: 18px;
  }
  .title_text1{
    width: 200px;
    float: left;
    color: #93989b;
    font-size: 13px;
    margin-top: 2px;
    margin-left: 15px;
  }
</style>


