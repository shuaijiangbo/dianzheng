<template>
  <div>
    <div id="" class="content"  :style="{backgroundImage:`url(${bgImg})`}">
      <div class="content-box">
        <div class="top-item-box">
          <ul>
            <li v-for="(item,index) in list" :style="{backgroundImage:`url(${item.link==activeIndex?activeBtn:greyBtn})`}" :class="item.link==activeIndex?'active':''">
              <router-link :to="{name:item.link}" class="link">
                {{item.firstName}}
              </router-link>
            </li>
          </ul>
        </div>
        <div class="buttom-content-box">
          <transition name="fade">
            <router-view />
          </transition>
        </div>
      </div>
    </div>
    <!--<foot></foot>-->
  </div>
</template>

<script>
  import {get, post} from '@/api/fetch.js';
  import {mapState,mapGetters,mapMutations,mapActions} from 'vuex'
  import url from '@/api/serviceAPI.config.js';
  import foot from '@/components/common/footer'
  export default {
    name: "",
    data(){
      return{
        bgImg :require('@/assets/images/bg.png'),
        greyBtn :require('@/assets/images/grey_btn.png'),
        activeBtn :require('@/assets/images/active_btn.png'),
        events:null,
        list:[
          {
            firstName: '首页',
            link:'componentHome'
          },
          {
            firstName:'赛事规章',
            link:'componentRule'
          },
          {
            firstName:'赛事资料',
            link:'componentData'
          },
          {
            firstName:'赛事公告',
            link:'componentNotice'
          },
          {
            firstName:'报名参赛',
            link:'componentApply'
          },
          {
            firstName:'比赛日志',
            link:'componentLog'
          }
        ]
      }
    },
    components:{
      foot
    },
    methods:{
      ...mapMutations(['saveEventId']),
      changeActive(){
        this.activeIndex=this.$route.meta.second;
      },
    },
    created(){
      this.changeActive();
    },
    watch:{
      $route(to,from){
        this.activeIndex=to.meta.second;
      }
    },
    computed:{
      ...mapState(["eventId","eventName"]),
    },
    mounted(){
      this.saveEventId(JSON.parse(sessionStorage.getItem('events')));
    }
  }
</script>

<style type="text/scss" lang="scss" scoped>
  .fade-enter-active {
    transition: opacity .5s;
  }
  /*.fade-leave-active{

  }*/
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }

  .content{
    width: 100%;
    overflow: hidden;
    background: #f7f7f7;
    .content-box{
      width: 1160px;
      min-height: 750px;
      margin: 0 auto;
      margin-top: 20px;
      background: #fff;
      padding: 20px;
      margin-bottom: 70px;
      .top-item-box{
        border-bottom: 5px solid #ff6100;
        li{
          float: left;
          width: 148px;
          padding-right: 10px;
          height: 50px;
          line-height: 50px;
          text-align: center;
          background-size: 100% 100%;
          .link{
            font-size: 16px;
            padding-left: 0px;
            height: 30px;
            line-height: 30px;
            color: #333;
            font-weight: bold;
            display: inline-block;
            width: 100%;
            height: 100%;
          }
        }
        li.active {
          /* background: -ms-linear-gradient(top, rgba(240,19,34, 0.9), rgba(255,135,66, 0.7));
           background: -moz-linear-gradient(top, rgba(240,19,34, 0.9), rgba(255,135,66, 0.7));
           !*background: -webkit-gradient(linear, 0 0, 0 bottom, from(rgba(240,19,34, 0.9)), to(rgba(255,135,66, 0.7)));*!
           background: linear-gradient(to top, rgba(255,135,66, 1), rgba(240,19,34, 1)); !* 标准的语法 *!
           filter: progid:DXImageTransform.Microsoft.gradient(startcolorstr=rgba(240,19,34, 0.8), endcolorstr=rgba(255,135,66, 0.7), gradientType=0);
           */a.link{
            color: #fff;
          }
        }
      }
      .top-item-box:after{
        content: '';
        display: block;
        height: 0;
        clear: both;
      }
      .buttom-content-box{
        border: 1px solid #ddd;
        padding-bottom: 10px;
        min-height: 660px;
      }
    }
  }
</style>
