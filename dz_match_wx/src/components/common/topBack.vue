<template>
  <el-row class="top-back-wp">
    <div class="back-bar back-bgc">
      <router-link :to="backUrl"><span class="back-ic iconfont iconrightLink"></span></router-link>
      <span class="titleText">{{titleText}}</span>
    </div>
  </el-row>
</template>

<script>
  export default {
    name: "topBack",
    props: {
      titleText: {
        type: String
      },
      backUrl: {
        type: String,
        require: true
      }
    }
  }
</script>

<style scoped lang="scss">
  .back-bar{
    position: relative;
    width: 100%;
    height: 100%;
    text-align: center;
  }
  .titleText{
    color: #fff;
    font-size: 32px;
  }
  .back-ic{
    position: absolute;
    top: 0;
    left: 0;
    padding: 0 20px;
    height: 100%;
    font-size: 40px;
    color: #fff;
  }
</style>
