<template>
    <div id="register" class="boder_box">
      <h1 >{{title}}</h1>
      <div v-html="content">

      </div>
    </div>
</template>

<script>
  import Picker from "element-ui/packages/date-picker/src/picker";
  import {get, post} from '@/api/fetch.js';
  export default {
    name: 'HelloWorld',
    data () {
      return {
        content: '',
        newId:'',
        url:'cms/article/detail',
        title:''

      }
    },
    methods:{

    },
    created(){
      this.newsId= this.$route.query.newsId;
      get(this.url,{id:this.newsId,tenantCode:1}).then((res)=>{
        this.content=res.data.content;
        this.title=res.data.title;
      })
    },
  }

</script>

<style type="text/scss" lang="scss" scoped>
  /*    $base_botton_color:green;*/

  .content-box:after{
    width: 0;
    height: 0;
    clear: both;
    display: block;
    content: " ";
  }
  .content-box{
    background:#f2f6fc ;
    padding-bottom: 50px;
  }
  .boder_box{
    height: auto;
    width: 930px;
    background-color: white;
    float: left;
    margin-left: 20px;
    margin-top: 20px;
  }

  .mulu{
    width: 250px;
    height: 1000px;
    background-color: white;
    float: left;
    margin-left: 360px;
    margin-top: 20px;
  }

  h5{
    margin-top: 18px;
    line-height: 41px;
    padding: 23px;
    text-align: left;
  }

  h1{
    font-size: 21px;
    margin-top: 19px;
  }

  .tu{
    width: 890px;
    height: 590px;
  }

  img{
    width: 100%;
    height: 100%;
  }


</style>


