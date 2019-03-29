<template>
    <div>
      <div class="msg-content">
        <div class="msg-content-box">
          <div class="msg-left-box">
            <div class="img-box">
              <div class="match-txt">
                <p class="event-name">{{eventName}}</p>
                <p class="event-time">比赛时间：{{matchTimeStart|cutTime}}-{{matchTimeEnd|cutTime}}</p>
                <p class="event-time">报名时间：{{signUpTimeStart|cutTime}}-{{signUpTimeEnd|cutTime}}</p>
              </div>
            </div>
            <p class="lists">
              <span class="title-name">距报名截止：</span>
              <span class="list-val">{{instanceStart}}天</span>
            </p>
            <p class="lists">
              <span class="title-name">距赛事开始：</span>
              <span class="list-val">{{instanceEnd}}天</span>
            </p>
            <p class="lists">
              <span class="title-name">比赛地点：</span>
              <span class="list-val">{{address}}</span>
            </p>
            <p class="lists">
              <span class="title-name">赛事联系人：</span>
              <span class="list-val">{{adminName}}</span>
            </p>
            <p class="lists">
              <span class="title-name">联系电话：</span>
              <span class="list-val">{{adminTel}}</span>
            </p>
            <p class="lists">
              <span class="title-name">联系邮箱：</span>
              <span class="list-val">{{adminEmail=='null'?'空':adminEmail}}</span>
            </p>
          </div>
          <div class="msg-right-box">
              <div class="host-title-box">
                <p class="host-title">主办方：</p>
              </div>
              <div class="host-lists">
                 <p v-for="item in sponsors">{{item}}</p>
              </div>
          </div>
        </div>
      </div>
      <div class="supportsList">
        <template v-for="item in supportsList">
          <img :src="item.file" :alt="item.supportName">
        </template>
      </div>
    </div>
</template>

<script>
  import {get, post} from '@/api/fetch.js';
  import url from '@/api/serviceAPI.config.js';
  import {mapState} from 'vuex'
    export default {
        name: "",
        data(){
          return{
            instanceStart:0,
            instanceEnd:0,
            address:'',
            adminName:'',
            adminTel:'',
            supportsList:[],
            eventLogo:'',
            eventName:'',
            matchTimeStart:'',
            matchTimeEnd:'',
            adminEmail:''
          }
        },
      methods:{
         getDetail(matchId){
           get(url.eventdetail,{id:matchId}).then(res=>{
             let event =res.events;
             this.supportsList =res.supportsList;
             this.sponsors =res.sponsors;
             let {publishStatus,eventName,address,adminName,adminTel,adminEmail,signUpTimeEnd,signUpTimeStart,matchTimeStart,matchTimeEnd,eventLogo} =event;
             this.address=address;
             this.adminName=adminName;
             this.eventLogo=eventLogo;
             this.adminTel=adminTel;
             this.signUpTimeEnd=signUpTimeEnd;
             this.signUpTimeStart=signUpTimeStart;
             this.matchTimeStart=matchTimeStart;
             this.matchTimeEnd=matchTimeEnd;
             this.eventName=eventName;
             this.adminEmail=adminEmail;
             this.computeTimeCut(signUpTimeEnd,matchTimeStart,signUpTimeStart);
             sessionStorage.setItem('publishStatus', publishStatus);
           })
         },
        doTime(time){
          return new Date(time.replace(/\-/g,'/').split(' ')[0]);
        },
        computeTimeCut(firstTime,secondTime,thirdTime){
          let startTime=this.doTime(firstTime);       //报名结束时间
          let endTime=this.doTime(secondTime);        //比赛开始时间
          let thirdTimes=this.doTime(thirdTime);       //报名开始时间
         /* let second = parseInt(firstTime - secondTime)/1000;  得到秒差*/
          let now=new Date();
          let day=now.getDate();
          let month=now.getMonth()+1;
          let year=now.getFullYear();
          let today=new Date(`${year}/${month}/${day}`);

          this.instanceStart= parseInt((startTime-today)<0?0:(startTime-today))/1000/60/60/24;
          this.instanceEnd= parseInt((endTime-today)<0?0:(endTime-today))/1000/60/60/24;

          if(thirdTimes>today) {
            sessionStorage.setItem('noStart', true);  //还未到报名时间
          }
          else{
            sessionStorage.setItem('noStart', false); //
          }
          if(startTime<today){
            sessionStorage.setItem('alreadyEnd', true);
          }else {
            sessionStorage.setItem('alreadyEnd', false);
          }
        }
      },
      created(){

      },
      mounted(){
        let matchId=this.$route.query.id;
        if(matchId) {
          sessionStorage.setItem('roles', 'previewer');
          sessionStorage.setItem('events', JSON.stringify({eventId: matchId}));
        }
        this.getDetail(JSON.parse(sessionStorage.getItem('events')).eventId);
      },
      computed:{
        ...mapState(['eventId'])
      },
      filters:{
        cutTime:function(allTime){
          return allTime.split(' ')[0].replace(/-/g,'.');
        }
      },
    }
</script>

<style type="text/scss" lang="scss" scoped>
.msg-content{
  padding:50px 95px 20px 95px;
  .msg-content-box{
    border-bottom: 1px dotted #808080;
    padding-bottom: 20px;
    .msg-left-box{
      float: left;
    }
    .msg-right-box{
      float: right;
      font-size: 14px;
      margin-top: 99px;
      margin-right: 415px;
      .host-title-box{
        float: left;
        margin-right: 5px;
        font-weight: bold;
        height: 32px;
        line-height: 32px;
      }
      .host-lists{
        float: left;
        p{
          height: 32px;
          line-height: 32px;
          color: #555353;
        }
      }
    }
  }
  .msg-content-box:after{
    display: block;
    content: "";
    clear: both;
    width: 0;
    height: 0;
  }
  .img-box{
    .match-logo{
      height: 50px;
      float: left;
    }
    .match-txt{
      .event-name{
        font-size: 20px;
        font-weight: bold;
        font-family: 微软雅黑;
        height: 30px;
        margin-bottom: 5px;
      }
      .event-time{
        color: #666;
        font-size: 14px;
        height: 20px;
      }
    }
  }
  .img-box:after{
    content: '';
    clear: both;
    width: 0;
    display: block;
  }
  p.lists{
    height: 50px;
    line-height: 50px;
  }
  .title-name{
    font-size: 14px;
    font-weight: bold;
    color: #010101;
    display: inline-block;
    width: 90px;
    margin-right: 20px;
  }
  .list-val{
    color: #494949;
    font-size: 14px;
  }
}
  .supportsList{
    padding:0 85px;
    padding-bottom: 20px;
    img{
      width: 225px;
      height: 95px;
      display: inline-block;
      border: 1px solid #ddd;
      margin: 10px;
    }
  }
</style>
