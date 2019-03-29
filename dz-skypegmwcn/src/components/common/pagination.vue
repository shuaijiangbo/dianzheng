<template>
  <!--  <h1>分页组件</h1>-->
  <div class="pages">
    <button class="firstpage" :disabled="sellPage.pageNum==1" @click="sellPage.pageNum=1">首页</button>
    <button class="prevpage" :disabled="sellPage.pageNum==1" @click="sellPage.pageNum--" >上一页</button>

    <div class="pagenums">
      <button v-if="pageObj.pageNum>5">...</button>
      <template v-for="(index,item) in pageObj.pageNum<5?pageObj.pageNum:5">
        <button v-if="item!=0"  @click="chooseIndex(pageObj.pageNum-(pageObj.pageNum<5?pageObj.pageNum:5)+item)">{{pageObj.pageNum-(pageObj.pageNum<5?pageObj.pageNum:5)+item}}</button>
        <!--<button v-if="item!=0"  @click="searchList(pageObj.pageNum-(pageObj.pageNum<5?pageObj.pageNum:5)+item)">{{pageObj.pageNum-(pageObj.pageNum<5?pageObj.pageNum:5)+item}}</button>-->
      </template>
      <button class="active">{{pageObj.pageNum}}</button>
      <template v-for="(index,item) in (pageObj.totalPage-pageObj.pageNum)>5?5:pageObj.totalPage-pageObj.pageNum">
        <button @click="chooseIndex(pageObj.pageNum+index)">{{pageObj.pageNum+index}}</button>
      </template>

      <button v-if="pageObj.totalPage-pageObj.pageNum>5">...</button>
    </div>
    <button @click="sellPage.pageNum++" class="nextpage" :disabled="sellPage.pageNum==pageObj.totalPage">下一页</button>
    <button class="lastpage" @click="sellPage.pageNum=pageObj.totalPage" :disabled="sellPage.pageNum==pageObj.totalPage">末页</button>
    <span id="total">{{'共'+pageObj.totalPage+'页，'+'共'+pageObj.totalNum+'条'}}</span>
  </div>
</template>
<script>
  import {get, post} from '@/api/fetch.js';
/*  import url from '@/api/serviceAPI.config.js';*/
  export default {
    props: ['sendParms'],
    data(){
      return{
        pageObj:{
          pageNum:42,
          pageSize:10,
          totalNum:500,
          totalPage:50
        },
        getData:'',
        sellUrl:'',
        sellPage:{
          pageSize:10,
          pageNum:1,
        }
      }
    },
    mounted(){

    },
    methods:{
      searchList(prames){
        get(this.sellUrl,this.sellPage).then((res) => {
            this.getData = res.data.datas;
            this.pageObj.pageNum=res.data.pageNum;
            this.pageObj.pageSize=res.data.pageSize;
            this.pageObj.totalNum=res.data.totalNum;
            this.pageObj.totalPage=res.data.pages;

            this.$emit("spot", this.getData)
        });
      },
    setButton(){

     },
    chooseIndex(pages){
        this.sellPage.pageNum=pages;
      },
      parmsExtend(){
        this.sellUrl=this.$parent.sendUrl
        this.sellPage=Object.assign(this.sellPage,this.$parent.sendParms);
        this.searchList();
      }
    },
    created(){
      this.parmsExtend();
    },
    watch:{
      'sellPage.pageNum' (val ,oldVal){
        this.searchList();
      }
    },
  }
</script>
<style type="text/scss" lang="scss" scoped>
  .pages{
    width: 100%;
    margin-top: 50px;
    button{
      border: 1px solid $base_color1;
      background: #fff;
      color: $base_color1;
      padding: 5px;
      margin: 0 1px;
    }
    button.active{
      background: $base_color;
      color: $base_color2;
      border: 1px solid $base_color;
    }
    .pagenums{
      display: inline-block;
      button{
        width: 30px;
      }
    }
  }
</style>
