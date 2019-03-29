<template>
  <div>
    <div class="lists-box">
      <div style="margin-top: 40px;text-align: center;">
        <el-input placeholder="请输入内容" v-model="input5" class="input-with-select">

          <el-button slot="append"  class="btns">搜索</el-button>
        </el-input>
      </div>

<template v-for="item in datas">



      <div>
      <div class="icon-box">
          <img :src="item.headPhotoUrl" class="iconimg" />
      </div>
        <span class="title-name">{{item.userName}}</span>
        <span class="title-date">{{item.matchTime}}</span>
      </div>
      <div class="results">
        <span class="titles">{{item.result}}  {{item.describes}}  {{item.braceletJson}}</span>
        <!--<span >/2h33'34”、</span>
        <span class="titles">-平均配速 </span><span >5'41“、</span>
        <span class="titles">-最高配速 </span><span >6'02”、</span>
        <span class="titles">-平均心率 </span><span >165次/分、</span>
        <span class="titles">-最高心率 </span><span >185次/分、</span>
        <span class="titles">综合评价 </span><span >A</span>-->

      </div>

      <div class="whole">
        <video :src="item.eventFileUrl" controls='controls' class="videos">
        </video>
      </div>


      <div class="comments">
        <div class="collection">
          <img :src=collections  class="img-icon"/>
          <span class="img-tex">&nbsp;收藏</span>
        </div>

        <div class="collection">
          <img :src=forwarding  class="img-icon" style="margin-top: 7px"/>
          <span class="img-tex"> &nbsp; 转发</span>
        </div>

        <div class="collection">
          <img :src=comments1  class="img-icon" style="margin-top: 7px"/>
          <span class="img-tex">&nbsp;{{item.commentNumber}}</span>
        </div>

        <div class="collection" style="border: 0px" @click="getnumber(item.id)">
          <img :src=collection1  class="img-icon" style="margin-top: 6px;"/>
          <span class="img-tex">&nbsp;{{item.praiseNumber}}</span>
        </div>
      </div>

</template>

      <pages v-show="datas.length" :send-parms="sendParms" v-on:spot="spot"></pages>
    </div>
  </div>
</template>

<script>
  import {get, post} from '@/api/fetch.js';
  import url from '@/api/serviceAPI.config.js';
  import pages from '@/components/common/pagination';
  import {mapState} from 'vuex'
  export default {
    name: "componentLog",
    components:{
      pages
    },
    data(){
      return {
        btn:require('@/assets/images/active_btn.png'),
        icons:require('@/assets/images/headicon.png'),
        videoOptions: '@/assets/images/sss.mp4',
        collections:require('@/assets/images/collection.png'),
        forwarding:require('@/assets/images/forwarding.png'),
        comments1:require('@/assets/images/comments1.png'),
        collection1:require('@/assets/images/collection1.png'),
        sendParms:{
          url:url.listEventLog,
          eventId:JSON.parse(sessionStorage.getItem('events')).eventId,
          pageNum:0,
          pageSize:10,

        },
        datas:[]
      }
    },
    methods: {
      jumper(id,name){
        sessionStorage.setItem('events',JSON.stringify({eventId:id,eventName:name}));
      },
      spot(data){
        this.datas= data;

      },
      getnumber(id){
        get(url.addEventLogPraise,{eventLogId:id}).then(res=>{
          for(var e of this.datas){
            if(e.id==id){
              e.praiseNumber=res.data;
            }
          }
        })
      }

    }


  }



</script>

<style type="text/scss" lang="scss" scoped>
  .lists-box{
    padding: 0 30px;
    .list-box{
      height: 50px;
      line-height: 50px;
      border-bottom: 1px dotted #dcdcdc;
      font-size: 14px;
      position: relative;
      padding-left: 14px;
    }
    .list-box:before{
      display: inline-block;
      height: 13px;
      border-left: 4px solid;
      border-image: -webkit-linear-gradient(#ff5100 , #f6382a , #fd763e)1 10 1; /* 控制边框颜色渐变 */
      border-image: -moz-linear-gradient(#ff5100 , #f6382a , #fd763e)1 10 1;
      border-image: linear-gradient(#ff5100 , #f6382a , #fd763e)1 10 1; /* 标准的必须写在最后 */

      content: "";
      margin-right: 5px;
      position: absolute;
      left: 0;
      top: 20px;
    }
    .list-box:hover{
      color:#ee353d ;
      cursor: pointer;
      .con-data{
        color: #ee353d;
      }
    }
    .con-data{
      float: right;
      color: #666;
      font-family: cursive;
    }
    .input-with-select{
      width: 540px;
    }
    .btns{
      width: 92px;
      background-color: #ff6100;
      height: 40px;
      color: white;
      font-size: 16px;
    }
    .iconimg{
      width: 100%;
      height: 100%;
    }
    .title-name{
      margin-top: 48px;
      float: left;
      margin-left: 18px;
    }
    .title-date{
      float: left;
      margin-top: 80px;
      margin-left: -48px;
      font-size: 12px;
      color: #666666;
    }
    .results{
      margin-top: 106px;
      font-size: 14px;
      margin-left: 176px;
    }
    .titles{
      color: #ff6100;
      margin-left: 0px;
    }
    .whole{
      margin-left: 176px;
      margin-top: 4px;
    }
    .videos{
      width: 500px;
      height: 280px;

    }
    .comments{
      width: 974px;
      height: 48px;
      margin-left: 60px;
      border: 1px solid #dddddd;
      margin-top: 4px;


    }
    .collection{
      width: 242px;
      border-right: 1px solid #dddddd;
      height: 30px;
      margin-top: 9px;
      float: left;
    }
    .img-icon{
      margin-top: 4px;
      float: left;
      margin-left: 106px;
    }
    .img-tex{
      margin-top:3px;
      float: left;
    }
    .icon-box{
      margin-top: 40px;
      margin-left: 100px;
      float: left;
      height: 60px;
      width: 60px;
      border-radius:50%;




    }

  }
</style>
