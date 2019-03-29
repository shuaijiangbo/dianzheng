<template>
    <div class="content-box" :style="{'min-height':minHeight+'px',backgroundImage:`url(${bgImg})`}" >
      <div class="content"  :style="{'min-height':minHeight-80+'px'}">
        <header>{{title}} </header>
        <article v-html="context">
        <!--  {{context}}-->
        </article>
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
            bgImg :require('@/assets/images/bg.png'),
            id:'',
            title:'',
            context:'',
            minHeight:''
          }
        },
      methods:{
          getDeatil(){
            get(url.eventnoticedetail,{id:this.id}).then(res=>{
              let {title,context}=res.data;
              this.title=title;
              this.context=context;
            })
          }
      },
      created(){
        this.id=this.$route.query.id;
      },
      mounted(){
        this.getDeatil();
        this.minHeight= window.screen.availHeight-214
      }
    }
</script>
<style type="text/scss" lang="scss" scoped>
  .content-box{
    overflow: hidden;
    .content{
      width: 1160px;
      margin: 40px auto;
      background: #f7f7f7;
      padding: 0 30px;
      header{
        text-align: center;
        height: 70px;
        line-height: 70px;
      }
    }
  }

</style>
