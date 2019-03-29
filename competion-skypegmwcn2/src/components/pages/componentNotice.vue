<template>
    <div>
      <div class="lists-box">
        <p @click="popTip(item)" class="list-box" v-for="(item,index) in noticeList">
          <span class="">{{item.title}}</span>
          <span class="con-data">{{item.updateTime}}</span>
        </p>
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
          return {
            dialogVisible:false,
            dialogTitle:'',
            tipContent:'',
            noticeList:[]
          }
        },
      methods:{
        popTip(item){
              let routeUrl=this.$router.resolve({
              path:'/index/noticeDeatil',
              query:{id:item.id}
            })
          window.open(routeUrl .href, '_blank');
        },
        getNoticList(matchId){
          get(url.eventnoticelist,{id:matchId}).then(res=>{
            this.noticeList=res.data;
          })
        }
      },
      created(){
         this.getNoticList(this.eventId||JSON.parse(sessionStorage.getItem('events')).eventId);
      },
      computed:{
        ...mapState(['eventId','eventName'])
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
  }
</style>
