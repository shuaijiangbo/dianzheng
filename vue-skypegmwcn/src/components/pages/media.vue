<template>
  <div class="content-box">
    <div class="content">
      <el-tabs type="border-card" v-model="activeName">
        <el-tab-pane label="图片" name="first">
          <ul class="picture-box">
            <li v-for="picItems in this.imgs" @click="jump(picItems.id,'first')">
              <div>
                <img :src=picItems.coverImageUrl alt="" width="372px" height="304px">
                <p class="pic-title">{{picItems.name}}</p>
              </div>
            </li>
          </ul>
          <pages :send-parms="sendImgsParms" ref="headerChild" v-on:spot="spotImg"></pages>
        </el-tab-pane>
        <el-tab-pane label="视频" name="second">
          <ul class="picture-box">
            <li @click="jump()">
              <div>
                <img src="http://dummyimage.com/372x304" alt="">
                <p class="pic-title">1028四川田径竞走比赛拉开序幕1028四川田径竞走比赛拉开序幕</p>
              </div>
            </li>

            <li>
              <div>
                <img src="http://dummyimage.com/372x304" alt="">
                <p class="pic-title">1028四川田径竞走比赛拉开序幕</p>
              </div>
            </li>
            <li>
              <div>
                <img src="http://dummyimage.com/372x304" alt="">
                <p class="pic-title">1028四川田径竞走比赛拉开序幕</p>
              </div>
            </li>
          </ul>
          <pages :send-parms="sendVideoParms" ref="headerChild" v-on:spot="spotVideo"></pages>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>


<script>
  import Picker from "element-ui/packages/date-picker/src/picker";
  import '@/assets/scss/media.scss'
  import pages from '@/components/common/pagination1'
  export default {
    name: 'HelloWorld',
    data() {
      return {
        activeName:'first',
        imgs:'',
        videos:'',
        sendImgsParms:{
          url:'/cms/imageCollection/homeListImageCollection',
          pageNum:1,
          pageSize:10,
          tenantCode:1
        },
        sendVideoParms:{
          url:'/cms/video/homeListVideo',
          pageNum:1,
          pageSize:10,
          tenantCode:1
        }
      }
    },
    components:{
      pages
    },
    methods: {
      getData(){
        console.log(345554);
      },
      jump(detailId){
        this.$router.push({path:'picture',query:{'detailId':detailId,'tabIndex':this.activeName}})
      },
      spotImg(data){
        this.imgs=data;
      },
      spotVideo(data){
        this.videos=data;
      },
    },
    created(){
      this.activeName= this.$route.query.tabIndex||'first';
      this.getData();
    }
  }
</script>
<style type="text/scss" lang="scss" scoped>
  .content-box{
    background: #f1f1f1;
    height: 1000px;
    overflow: hidden;
    .content{
      width: 1200px;
      margin: 0 auto;
      padding-bottom: 20px;
      box-shadow: 0 2px 4px 0 rgba(0,0,0,.12), 0 0 6px 0 rgba(0,0,0,.04);
      margin-top: 20px;
      background: #fff;
    }
    .picture-box{
      display: flex;
      justify-content:space-between;
      flex-wrap:wrap;
      li{
        margin-bottom: 5px;
        width: 33.3%;
        height: 395px;
        padding:5px ;
        padding-bottom: 10px;
        box-sizing: border-box;
        div{
          border: 1px solid #ddd;
        }
        p.pic-title{
          text-align: left;
          height: 65px;
          line-height: 30px;
          padding: 0 20px;
        }
        img{
          width: 100%;
        }
      }
      li:hover{
        cursor: pointer;
        p.pic-title{
          color: $base_color;
        }
        div{
          border: 1px solid $base_color;
        }
      }
    }
  }
</style>


