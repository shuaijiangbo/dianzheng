<template>
  <div id="register" class="boder_box">
    <div v-show="dataList">
      <div class="news-lists-box">
        <ul class="news-lists">
          <li class="news-list" v-for="item in dataList">
            <span>{{item.title}}</span>
            <button class="data">立即报名</button>
          </li>
        </ul>
      </div>
      <pages :send-parms="sendParms" ref="headerChild" v-on:spot="spot"></pages>
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
            url:'getNewListPage',
            pageNum:1,
            pageSize:10,
          },
          dataList:''
        }
      },
      methods:{
        spot(data){
          console.log(data);
          this.dataList=data;
        }
      }
    }
</script>

<style  type="text/scss" lang="scss" scoped>
  .it{
    width: 490px;
    height: 52px;
    border: 2px solid #ea000b;
    margin-top: 28px;
  }

  input:focus{border-color:$base_color;}
  input:focus {outline:none;}

  .btn{
    width: 148px;
    height: 59px;
    background-color: $base_color;
    color: white;
    padding: 0px;
    margin-left: -23px;
    margin-top: 15px;
    border: 17px solid $base_color;
  }

  .news-list{
    height: 100px;
    line-height: 100px;
    span{
      float: left;
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
