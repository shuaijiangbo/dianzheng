<template>


    <div id="register" class="boder_box">
      <ul>
        <li class="modular"  :style="{backgroundImage: 'url(' + logoEngImg + ')'  }  ">
          <span class="written" >跑</span>
          <span class="english">RUN</span>
        </li>

        <li class="modular"  :style="{backgroundImage: 'url(' + logoEngImg + ')'  }  ">
          <span class="written" STYLE="margin-left: 109px;">跳跃</span>
          <span class="english" style="margin-left: 97px">JUMP</span>
        </li>

        <li class="modular"  :style="{backgroundImage: 'url(' + logoEngImg + ')'  }  ">
          <span class="written" STYLE="margin-left: 109px;">竞走</span>
          <span class="english" style="margin-left: 97px;">WALK</span>
        </li>
        <li class="modular"  :style="{backgroundImage: 'url(' + logoEngImg + ')'  }  ">
        <span class="written" >跑</span>
        <span class="english">RUN</span>
        </li>

        <li class="modular"  :style="{backgroundImage: 'url(' + logoEngImg + ')'  }  ">
          <span class="written" STYLE="margin-left: 109px;">跳跃</span>
          <span class="english" style="margin-left: 97px">JUMP</span>
        </li>

        <li class="modular"  :style="{backgroundImage: 'url(' + logoEngImg + ')'  }  ">
          <span class="written" STYLE="margin-left: 109px;">竞走</span>
          <span class="english" style="margin-left: 97px;">WALK</span>
        </li>
      </ul>
    </div>


</template>

<script>
  import Picker from "element-ui/packages/date-picker/src/picker";


  export default {
    name: 'HelloWorld',
    data () {
      return {
        msg: 'Welcome to Your Vue.js App',
        /*logoEngImg:require('@/assets/images/moduler.png'),*/
      }
    }
  }

</script>

<style type="text/scss" lang="scss" scoped>
  /*    $base_botton_color:green;*/

  .boder_box{
    height: 420px;
    width: 930px;
    background-color: white;
    float: left;
    margin-left: 20px;
    margin-top: 20px;
  }

  .mulu{
    width: 250px;
    height: 420px;
    background-color: white;
    float: left;
    margin-left: 360px;
    margin-top: 20px;
  }

  .modular{
    width: 280px;
    height: 180px;
    margin-top: 19px;
    margin-left: 22px;
    float: left;
  }
  .written{
    color: white;
    font-size: 30px;
    float: left;
    margin-left: 128px;
    margin-top: 52px;
  }
  .english{
    color: white;
    font-size: 30px;
    float: left;
    margin-left: 110px;
    margin-top: 6px;
  }


</style>


