<template>
  <div id="register" class="boder_box">
    <div class="search-box">
      <input type="text" v-model="sendParms.title" placeholder="请输入查询关键字" class="search-input">
      <button class="search-btn" @click="search"><i class="iconfont icon-sousuo"></i> 搜索</button>
    </div>
    <div v-show="dataList">
      <div class="news-lists-box">
        <ul class="news-lists">
          <li class="news-list"  v-for="item in dataList">
            <p  class="times-box">
              <span class="date">{{item.updateTime.split('-')[2]}}</span>
              <span class="year-month">{{item.updateTime.split('-')[0]+"-"+item.updateTime.split('-')[1]}}</span>
            </p>
            <span @click="jupmer(item.id)" class="competion-name">{{item.title}}</span>
          </li>
        </ul>
      </div>
      <pages :send-parms="sendParms,sendUrl" ref="ddd" v-on:spot="spot"></pages>
    </div>
  </div>
</template>
<script>
  import pages from '@/components/common/pagination'
    export default {
      name: "",
      components:{
        pages
      },
      data(){
        return{
          sendParms:{
            title:'',
            pageNum:1,
            pageSize:8,
            tenantCode:1
          },
          sendUrl:'cms/article/list',
          dataList:'',
          searVal:''
        }
      },
      methods:{
        spot(data){
          this.dataList=data;
        },
        jupmer(newsId){
          this.$router.push({path:'noticeDetail',query:{newsId:newsId}})
        },
        search(){
          this.$refs.ddd.parmsExtend();
          /*this.$refs.ddd.childAction();*/
        }
      },
      filters:{
        dateSplit:function(val){
          return val.split(' ')[0];
        },
        itemType:function(val){
          if(val=='promotionalproduct'){
            return '促销'
          }else if(val=='hotSales'){
            return '爆款'
          }else if(val=='newArrivals'){
            return '新品'
          }else if(val=='bargain'){
            return '特价'
          }
        }
      }
    }
</script>

<style  type="text/scss" lang="scss" scoped>
  .search-box{
    display: flex;
    justify-content:center;
    .search-input{
      width: 466px;
      height: 41px;
      font-size: 20px;
      padding: 5px 10px;
      border: 2px solid $base_color;
      color: #343434;
    }
    .search-btn{
      padding: 14px;
      color: #fff;
      font-size: 20px;
      background: $base_color;
      width:150px;
    }
  }

  input:focus{border-color:$base_color;}
  input:focus {outline:none;}


  .news-list{
    border-bottom: 2px dashed #dcdcdc;
    height: 100px;
    .times-box {
      background: $base_color;
      padding: 12px 6px;
      float: left;
      height: 33px;
      color: #fff;
      width: 53px;
      font-size: 13px;
      margin-top: 20px;
      margin-right: 20px;
      .date {
        display: block;
        margin-bottom: 3px;
      }
    }
    span.competion-name{
      height: 100px;
      line-height: 100px;
      float: left;
      cursor: pointer;
    }
    button{
      float: right;
      width: 114px;
      height: 37px;
      background-color: $base_color;
      color: white;
      line-height: 29px;
      font-size: 16px;
      margin-top: 30px;
    }
  }
</style>
