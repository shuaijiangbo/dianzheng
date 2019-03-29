<template>
  <div class="content-box">
    <div class="content">
      <template v-for="item in datas">
        <div class="item-list">
          <img :src="item.eventLogo||nopic" class="event-logo" alt="">
          <div class="event-txt-box">
            <p class="event-name">{{item.eventName}}</p>
            <p class="event-sign-time">报名时间：{{item.signUpTimeStart|cutTime}}-{{item.signUpTimeEnd|cutTime}}</p>
            <p class="event-match-time">比赛时间：{{item.matchTimeStart|cutTime}}-{{item.matchTimeEnd|cutTime}}</p>
            <p class="event-adress">{{`比赛地点：${item.address}`}}</p>
            <p class="event-detail-btn"><button @click="jumper(item.id,item.eventName)">查看详情</button></p>
          </div>
          <div class="support-box" >
            <img v-if="index<4" :src="imgSrc.file" :alt="imgSrc.supportName" v-for="(imgSrc, index) in item.supportsList">
          </div>
        </div>
      </template>
      <pages v-show="datas.length" :send-parms="sendParms" ref="headerChild" v-on:spot="spot"></pages>
    </div>
  </div>
</template>
<script>
  import {get, post} from '@/api/fetch.js';
  import url from '@/api/serviceAPI.config.js';
  import pages from '@/components/common/pagination';
  import {mapState,mapGetters,mapMutations,mapActions} from 'vuex'
    export default {
        name: "chooseComponent",
        components:{
          pages
        },
        data(){
          return{
            nopic:require('@/assets/images/nopic.png'),
            sendParms:{
              url:url.getEventlist,
              pageNum:0,
              pageSize:8,
            },
            datas:[]
          }
        },
        methods:{
          ...mapMutations(['saveEventId']),
          jumper(id,name){
        /*    this.saveEventId({eventId:id,eventName:name});   */ //更改state
            sessionStorage.setItem('events',JSON.stringify({eventId:id,eventName:name}));
            this.$router.push({path:'/index/comContainer/componentHome'})
          },
          spot(data){
            this.datas= data
          }
      },
      created(){
       /* this.getEventlist();*/
        sessionStorage.removeItem('roles');
      },
      filters:{
          cutTime:function(allTime){
            return allTime?allTime.split(' ')[0].replace(/-/g,'.'):'空';
          }
      },
      computed:{
        ...mapState(["eventId"]),
      }
    }
</script>

<style type="text/scss" lang="scss" scoped>
  .content{
    border: 1px solid #e9e9e9;
    padding:0 40px;
    width: 1118px;
  }
.item-list{
  height: 240px;
  padding: 25px 0;
  border-bottom: 1px dotted #e9e9e9;
  img.event-logo{
    width: 190px;
    height: 230px;
    border: 1px solid #e9e9e9;
    float: left;
  }
  .event-txt-box{
    width: 860px;
    float: left;
    margin-left: 30px;
    position: relative;
    border-bottom: 1px dotted #ddd;
    padding-bottom: 10px;
    .event-name{
      color: #000;
      font-size: 18px;
      margin-bottom: 16px;
    }
    .event-sign-time,
    .event-match-time,
    .event-adress{
      color: #959595;
      font-size: 14px;
      height: 26px;
      line-height: 26px;
    }
    .event-detail-btn{
      position: absolute;
      top: 70px;
      right: 10px;
      button{
        width: 165px;
        height: 46px;
        border: none;
        background: -ms-linear-gradient(top, rgba(240,19,34, 1), rgba(255,135,66, 1));
        background: -moz-linear-gradient(top, rgba(240,19,34, 1), rgba(255,135,66, 1));
        background: -webkit-gradient(linear, 0 0, 0 bottom, from(rgba(240,19,34, 1)), to(rgba(255,135,66, 1)));
        filter: progid:DXImageTransform.Microsoft.gradient(startcolorstr=rgba(240,19,34, 1), endcolorstr=rgba(255,135,66, 1), gradientType=0);
        color: #fff;
        font-size: 16px;
        cursor: pointer;
      }
    }
  }
  .support-box{
    float: left;
    margin-top: 10px;
    margin-left: 30px;
    img{
      width: 202px;
      height: 85px;
      border: 1px solid #ddd;
      margin-right: 15px;
      display: inline-block;
      float: left;
    }
  }
}
</style>
