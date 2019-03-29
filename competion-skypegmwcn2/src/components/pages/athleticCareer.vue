<template>
  <div class="content-box">
    <div class="content">
      <p class="fTitle"><label style="margin-left: 15px;">我的运动生涯</label></p>
      <div class="title-box">
        <span class="title">运动生涯</span>
      </div>

      <div class="tree-box">
        <ul>
          <template v-for="(item,index) in treeData">
            <li class="tree-item"  :class="index%2?'tree-item-left':'tree-item-right'">
              <i class="circle"></i>
              <i class="triangle"></i>
              <i class="line"></i>
              <div class="txt-box" @click="jumper(item.eventId,item.id)">
                <p class="date-time">{{item.matchTime}}</p>
                <p class="event-name">{{item.eventName}}</p>
                <p class="group-name">{{item.eventGroupName}}</p>
                <div>
                  <video :src="item.eventFileUrl"></video>
                  <p class="txt-zizhi">日志</p>
                </div>
              </div>
            </li>
          </template>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
  import axios from 'axios';
  import {get, post} from '@/api/fetch.js';
  import url from '@/api/serviceAPI.config.js';
  export default {
    name: "",
    data(){
      return {
        treeData:[],
        posterImg:require('@/assets/images/logins.png'),
      }
    },
    methods:{
      getTree:function(){
          post(url.listEventLog).then(res=>{
            this.treeData=res.data;

          })
        },
      jumper(eventId,logId){
        this.$router.push({path:'athleticCareerDeatil',query:{eventId:eventId,logId:logId}})
      }
    },
    created(){
      this.getTree();
    }
  }
</script>

<style type="text/scss" lang="scss" scoped>
  .fTitle {
    height: 32px;
    line-height: 32px;
    width: 100%;
    background: #fefefe;
    border: 1px solid #ddd;
    margin-bottom: 20px;
    color: #a7a7a7;
  }

  .tree-box{
    .tree-item{
      position: relative;
      margin-left: 50%;
      height: 235px;
      .circle{
        width: 20px;
        height: 20px;
        border-radius: 10px;
        background:#ff6000 ;
        display: inline-block;
      }
      .triangle{
        display: inline-block;
        width: 0;
        height: 0;
        border-width:4px 0 4px 22px;
        border-style:solid;
        border-color:transparent transparent transparent #ff6000;/*透明 透明 透明 黄*/
      }
      .line{
        height: 230px;
        border-left: 1px solid #ff6000;
        display: inline-block;
      }
      .txt-box{
        position: absolute;
        left: 40px;
        top: -14px;
        cursor: pointer;
        .date-time{
          color:#ff6000 ;
          height: 30px;
          font-size: 18px;
        }
        .event-name{
          color:#010101 ;
          font-size: 18px;
          font-weight: bold;
          height: 30px;
          line-height: 30px;
        }
        .group-name{
          color:#666 ;
          font-size: 14px;
          height: 24px;
          line-height: 24px;
          margin-bottom: 10px;
        }
        div{
          /*float: right;*/
          video{
            height: 110px;
            float: left;
          }
          .txt-zizhi{
            height: 48px;
            width: 28px;
            border: 1px solid #fe6000;
            float: left;
            text-align: center;
            padding: 30px 5px;
            color: #fff;
            font-size: 16px;
            font-weight: bold;
            background: -ms-linear-gradient(top, rgba(240,19,34, 0.9), rgba(255,135,66, 0.7));
            background: -moz-linear-gradient(top, rgba(240,19,34, 0.9), rgba(255,135,66, 0.7));
            /*background: -webkit-gradient(linear, 0 0, 0 bottom, from(rgba(240,19,34, 0.9)), to(rgba(255,135,66, 0.7)));*/
            background: linear-gradient(to top, rgba(255,135,66, 1), rgba(240,19,34, 1)); /* 标准的语法 */
            filter: progid:DXImageTransform.Microsoft.gradient(startcolorstr=rgba(240,19,34, 0.8), endcolorstr=rgba(255,135,66, 0.7), gradientType=0);
          }
        }
      }
    }
    .tree-item-right{
      .circle{
        position: absolute;
        top: -13px;
        left: -10px;
      }
      .triangle{
        position: absolute;
        top: -6px;
        left: 8px;
      }

    }
    .tree-item-left{
      width: 50%;
      margin: 0;
      .triangle{
        display: inline-block;
        width: 0;
        height: 0;
        border-width:4px 22px 4px 0px;
        border-style:solid;
        border-color:transparent #ff6000 transparent transparent ;/*透明 透明 透明 黄*/
        position: absolute;
        top: 0;
        right: 9px;
      }
      .circle{
        position: absolute;
        top: -6px;
        right: -10px;
      }
      .txt-box{
        position: absolute;
        right:40px;
        top: -8px;
        text-align: right;
        div{
          .txt-zizhi,video{
            float: right;
          }
        }
      }
      .line{
        position: absolute;
        right: -1px;
      }
    }
  }
</style>
