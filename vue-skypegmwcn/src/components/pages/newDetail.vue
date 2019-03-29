<template>
    <div id="newDetail">
      <h2 class="jj">{{string2}}</h2>
      <h2 class="jj">{{newsId}}</h2>
    </div>
</template>
<script>
    import axios from 'axios';
    import url from '@/api/serviceAPI.config.js';
    export default {
        name: "newDetail",
        data(){
          return{
            string2:'阿萨德撒多',
            newsId:'',
          }
        },
      beforeCreate(){
        console.log('1-beforeCreate 初始化之前');
      },
      created(){
          this.newsId= this.$route.query.newsId;
      },
      methods:{

      }
    }
</script>

<style type="text/scss" lang="scss" scoped>
/*    $base_botton_color:green;*/
.content-box{
  background: $base_botton_color;
}

</style>
