<template>
  <div class="content-box">
    <div class="content">
      <el-tabs type="border-card">
        <el-tab-pane label="图片">
            <ul class="picture-box">
              <li>
                <img src="http://dummyimage.com/372x304" alt="">
                <p class="pic-title">1028四川田径竞走比赛拉开序幕</p>
              </li>
              <li>
                <img src="http://dummyimage.com/372x304" alt="">
                <p class="pic-title">1028四川田径竞走比赛拉开序幕1028四川田径竞走比赛拉开序幕</p>
              </li>
              <li>
                <img src="http://dummyimage.com/372x304" alt="">
                <p class="pic-title">1028四川田径竞走比赛拉开序幕1028四川田径竞走比赛拉开序幕</p>
              </li>
              <li>
                <img src="http://dummyimage.com/372x304" alt="">
                <p class="pic-title">1028四川田径竞走比赛拉开序幕</p>
              </li>
              <li>
                <img src="http://dummyimage.com/372x304" alt="">
                <p class="pic-title">1028四川田径竞走比赛拉开序幕</p>
              </li>
              <li>
                <img src="http://dummyimage.com/372x304" alt="">
                <p class="pic-title">1028四川田径竞走比赛拉开序幕</p>
              </li>
            </ul>
        </el-tab-pane>
        <el-tab-pane label="视频">

        </el-tab-pane>
      </el-tabs>
    </div>
    </div>
</template>


<script>
  import Picker from "element-ui/packages/date-picker/src/picker";
  import '@/assets/scss/media.scss'
  export default {
    name: 'HelloWorld',
    data() {
      return {
      }
    },
    methods: {
      getData(){
        console.log(345554);
      },
      jump(detailId){
        this.$router.pusg({path:'',query:{}})
      }
    },
    created(){
      this.getData();
    }
  }
</script>
<style type="text/scss" lang="scss">
  .el-tabs__item{
    font-size: 20px;
    font-weight: 600;
    background: red;
    height: 50px;
    line-height: 50px;
    padding: 0 35px;

  }
  .el-tabs--top.el-tabs--border-card .el-tabs__item:last-child{
    padding:0 35px;
  }
  .el-tabs--border-card>.el-tabs__header .el-tabs__item{
    color: #fff;
    margin:0 15px 0 0;
  }
  .el-tabs--border-card>.el-tabs__header{
    background: #fff;
    border-bottom: 1px solid $base_color;
    width: 1160px;
    margin: 0 auto;
  }
  .el-tabs--border-card{
    padding-top: 20px;
  }

  .el-tabs--border-card>.el-tabs__header .el-tabs__item.is-active{
    color: $base_color;
  }
  .el-tabs--border-card>.el-tabs__header .el-tabs__item.is-active {
    background-color: #fff;
    border-right-color: $base_color;
    border-left-color: $base_color;
    border-top-color: $base_color;
  }

  .el-tabs--border-card>.el-tabs__header .el-tabs__item:not(.is-disabled):hover {
    color: #fff;
  }
  .el-tabs--border-card>.el-tabs__header .el-tabs__item.is-active:not(.is-disabled):hover {
    color: $base_color;
  }
</style>


