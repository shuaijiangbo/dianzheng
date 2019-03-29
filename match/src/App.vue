<template>
  <div id="app">
    <router-view></router-view>
  </div>
  
</template>

<script>
import Vue from "vue";
import util from "./common/util.js";

export default {
  data() {
    return {

    };
  }
};
</script>

<style type="text/scss" lang="scss">
@import "~scss_vars";

body {
  margin: 0px;
  padding: 0px;
  font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB,
    Microsoft YaHei, SimSun, sans-serif;
  font-size: 14px;
  -webkit-font-smoothing: antialiased;
}

#app {
  height: 100%;
}

.el-submenu [class^="fa"] {
  vertical-align: baseline;
  margin-right: 10px;
}

.el-menu-item [class^="fa"] {
  vertical-align: baseline;
  margin-right: 10px;
}


</style>