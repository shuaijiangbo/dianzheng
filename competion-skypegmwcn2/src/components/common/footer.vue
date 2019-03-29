<template>
    <div class="the_end">
      <div class="one">
        联系我们  @2018豪体体育HOTi  all  rights  reserved
      </div>
      <div class="two">
        渝ICP备18004163号
      </div>
    </div>
</template>

<script>
  import {get, post} from '@/api/fetch.js';
  import url from '@/api/serviceAPI.config.js';
    export default {
      name: "",
      methods:{

      },
      created(){

      }
    }
</script>

<style type="text/scss" lang="scss" scoped>
  .the_end{
    width: 100%;
    height: 90px;
    background-color: #ececec;
/*    margin-top: 30px;*/
    text-align: center;
  }

  .two{
    color: #8f8f8f;
    font-size: 16px;
    line-height: 3px;
  }

  .one{
    line-height: 53px;
    color: #8f8f8f;
    font-size: 16px;
    padding-top: 10px;
  }

</style>
