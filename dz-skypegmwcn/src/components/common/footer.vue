<template>
  <!-- 功能板块 -->
  <div class="service">
    <ul class="wrapper">
      <li>
        <ul>
          <li>智慧城市解决方案</li>
          <li @click="jumper(0,1)">智慧商圈</li>
          <li @click="jumper(0,2)">智慧园区</li>
        </ul>
      </li>

      <li>
        <ul>
          <li>行业解决方案</li>
          <li @click="jumper(1,1)">互联网+政务服务</li>
          <li @click="jumper(1,2)">政府信用体系建设</li>
          <li @click="jumper(1,3)">法人信息数据库</li>
          <li @click="jumper(1,4)">社区党建系统</li>
          <li @click="jumper(1,5)">应急管理</li>
          <li @click="jumper(1,6)">智慧生态环境管理</li>
          <li @click="jumper(1,7)">海绵城市监测管理</li>
        </ul>
      </li>

      <li>
        <ul>
          <li >其他解决方案</li>
          <li @click="jumper(2,1)">无人机飞控系统</li>
          <li @click="jumper(2,2)">无人机智能吊舱</li>
          <li @click="jumper(2,3)">智慧管线监管</li>
          <li @click="jumper(2,4)">资产管理系统</li>
        </ul>
      </li>

      <li>
        <ul>
          <li>智能技术</li>
          <li @click="jumper(3,1)">智能视频分析</li>
          <li @click="jumper(3,2)">遥感反演分析</li>
          <li @click="jumper(3,3)">室内定位技术</li>
        </ul>
      </li>

      <li>
        <ul>
          <li>服务内容</li>
          <li @click="jumper(4,1)">平台服务</li>
          <li @click="jumper(4,2)">数据服务</li>
          <li @click="jumper(4,3)">咨询服务</li>
        </ul>
      </li>

      <li>
        <ul>
          <li>基础平台产品</li>
          <li @click="jumper(5,1)">数据共享交换平台</li>
          <li @click="jumper(5,2)">大数据平台</li>
          <li @click="jumper(5,3)">人工智能平台</li>
          <li @click="jumper(5,4)">云平台</li>
          <li @click="jumper(5,5)">物联网平台</li>
          <li><a href ="http://www.aiegov.com/show/index.html">系统汇总</a></li>
        </ul>
      </li>

      <li>
        <ul>
          <li>体育事业解决方案</li>
          <li><a href="http://www.hotisports.com/">HOTi</a></li>
        </ul>
      </li>

      <li>
        <ul>
          <li>关于我们</li>
          <li>关于我们</li>
          <li>合作伙伴</li>
          <li>招贤纳士</li>
        </ul>
      </li>

    </ul>
    <footer>
      <div class="wrapper">
        <p>
          <a style="cursor: text" >联系我们</a>
          <span class="message">@2018 电政信息科技</span>
          <span>all rights reserved</span>
        </p>
        <p>渝ICP备18004163</p>
      </div>
    </footer>
  </div>

  <!-- 底部 -->

</template>
<script>
  export default {
    data(){
      return{
        button_logo:require('@/assets/images/button-logo.png/'),
        footer:require('@/assets/images/footer.png'),
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
            name:"社区党建",
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
            name:"数据共享",
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
        ],
        firstNames:[
          '智慧城市解决方案',
          '行业解决方案',
          '其他解决方案',
          '智能技术',
          '服务内容',
          '基础平台',
        ],
        url:'/portal/projectDetail',
      }
    },
    methods:{
      jumper(typeNumber,typeIndex){
        let lists=JSON.stringify(this.jumperParame[typeNumber]);
        let newsId=typeIndex;
        this.$router.push({path:this.url,query:{'tabIndex':newsId,'lists':lists,'firstClassActiveIndex':typeNumber,'name':this.firstNames[typeNumber]}})
      },
    },
    mounted(){

    },
    watch:{
     /* $route(to,from){
        console.log();
        this.url=to.name=='home'?'portal/projectDetail':'projectDetail';
        /!*window.location.reload()*!/
      }*/
    },
  }
</script>

<style type="text/scss" lang="scss" scoped>
  footer {
    background-color: #373d41;
    margin-top: 20px;
  }

  footer .wrapper {
    width: 1200px;
    margin: 0 auto;
    padding-left: 20px;
    text-align: center;
    height: 57px;
    color: #fff;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 13px;
  }

  footer .wrapper p a {
    color: #fff;
  }

  footer .wrapper p .message {
    margin: 0 40px;
  }

  footer .wrapper p:last-child {
    margin-top: 7px;
  }
  div.service{
    margin-top: 30px;
  }

  div.service ul.wrapper {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    letter-spacing: 1px;
    justify-content: space-around;
  }

  div.service ul.wrapper > li + li {
    margin-left: 40px;
  }

  div.service ul.wrapper > li ul li {
    font-size: 13px;
    margin-top: 12px;
  }
  div.service ul.wrapper > li ul li:not(:first-child) {
    color: #7f8385;
    cursor: pointer;
  }
  div.service ul.wrapper > li ul li:first-child {
    font-size: 13px;
    font-weight: bold;
  }
  div.service ul.wrapper > li ul li a {
    color: #373d41;
  }
</style>
