<template>
  <div id="competition">
    <div class="mulu">
      <ul class="navber-lists">
        <li class="title-txt">赛事资讯</li>
         <template v-for="(item,index) in list">
           <li :class="item.link==activeIndex?'active':''" @click="changeActive(index)">
             <router-link :to="{name:item.link}">
               {{item.name}}
             </router-link>
           </li>
         </template>
      </ul>
    </div>

   <!--<searchList></searchList>-->
    <transition>
        <router-view/>
    </transition>
  </div>
</template>
<script>
  import Picker from "element-ui/packages/date-picker/src/picker";
  import searchList from "@/components/pages/search_list";
  export default {
    data(){
      return {
        activeIndex:'',
        list:[{name:'四川田径历史',link:'history'},
              {name:'田径规则',link:'rule'},
             ]
      }
    },
    components: {
      searchList
    },
    methods:{
      changeActive(){
        this.activeIndex=this.$route.meta.second;
        console.log(this.activeIndex);
      },
    },
    mounted(){             //挂在完成

    },
    created() {
      this.changeActive();
    },
    watch:{
      $route(to,from){
        this.activeIndex=to.meta.second;
      }
    }
  }
</script>

<style type="text/scss" lang="scss" scoped>
  /*    $base_botton_color:green;*/
  #competition:after{
    content: '';
    display: block;
    width: 0px;
    height: 0px;
    clear: both;
  }
  #competition{
    background:#f2f6fc ;
    padding-bottom: 50px;
  }

  .boder_box{
    height: 1060px;
    width: 930px;
    background-color: white;
    float: left;
    margin-left: 20px;
    margin-top: 20px;
    padding: 20px;
    box-sizing: border-box;
  }

  .mulu{
    width: 250px;
    height: 1060px;
    background-color: white;
    float: left;
    margin-left: 360px;
    margin-top: 20px;
  }

  .title-txt{
/*    height: 40px;*/
    background: #000;
    color: #fff;
/*    line-height: 40px;*/
  }

  .navber-lists>li{
    text-align: left;
    padding:10px 10%;
    border-bottom: 1px solid #eee;
  }
  .navber-lists>li a{
    color: #000;
  }

  .navber-lists>li.active{
    color:$base_color ;
    border-left: 5px solid $base_color;
  }
  .navber-lists>li.active:before{
   /* display: inline-block;
    content: '';*/
  border-left: 5px solid $base_color;
  }
  .navber-lists>li.active a{
    color:$base_color ;
  }
  .fade-enter-active, .fade-leave-active {
    transition: opacity .3s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }

</style>


