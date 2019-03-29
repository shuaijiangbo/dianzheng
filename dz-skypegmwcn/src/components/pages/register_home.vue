<template>
    <div id="register">
      <h2 class="jj">{{string2}}</h2>
      <div class="content-box">{{array}}</div>
      <button class="button-base">基础按钮</button>
    </div>
</template>

<script>

    import axios from 'axios';
    import url from '@/api/serviceAPI.config.js';
    export default {
        name: "register",
        data(){
          return{
            string2:'',
            array:'',
          }
        },
      beforeCreate(){
        console.log('1-beforeCreate 初始化之前');
      },
      created(){
         axios({
          url: url.getTextData,
          method: 'get',
        })
          .then(response => {
            console.log(response.data);
            let data=response.data;
            this.string2=data.string2;
            this.array=data.array;

          })
          .catch((error) => {
          })
        console.log('2-beforeCreate 初始化完成');
      },
      beforeMount(){
        console.log('3-beforeCreate 挂载之前');
      },
      mounted(){             //挂在完成
        console.log('4-beforeCreate 挂载完成');
      },
      beforeUpdate(){
        console.log('5-beforeCreate 更新之前');
      },
      updated(){
        console.log('6-beforeCreate 更新完成');
      },
      beforeDestroy(){
        console.log('7-beforeCreate 销毁之前');
      },
      destroyed(){
        console.log('8-beforeCreate 销毁完成');
      }
    }
</script>

<style type="text/scss" lang="scss" scoped>
/*    $base_botton_color:green;*/
.content-box{
  background: $base_botton_color;
}

</style>
