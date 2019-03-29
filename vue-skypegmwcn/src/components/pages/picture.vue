<template>
  <div class="content-box">
    <div class="content">
      <el-tabs type="border-card" @tab-click="jupmer" v-model="activeName">
        <el-tab-pane label="图片" name="first">
            <ul class="picture-box" >
              <li v-for="picsItem in dataImgsList">
                <img :src=picsItem.path preview="0" preview-text="描述文字" alt="">
              </li>
              <li>
                <img src="http://dummyimage.com/280x304" preview="0" preview-text="描述文字" alt="">
              </li>
              <li>
                <img src="http://dummyimage.com/280x304" preview="0" preview-text="描述文字" alt="">
              </li>
              <li>
                <img src="http://dummyimage.com/280x304" preview="0" preview-text="描述文字" alt="">
              </li>
              <li>
                <img src="http://dummyimage.com/280x304" preview="0" preview-text="描述文字" alt="">
              </li>
              <li>
                <img :src="ruleBg" preview="0" preview-text="描述文字" alt="">
              </li>
              <li>
                <img :src="ruleBg1" preview="0" preview-text="描述文字" alt="">
              </li>
              <li>
                <img :src="ruleBg2" preview="0" preview-text="描述文字" alt="">
              </li>
              <li>
                <img src="http://dummyimage.com/280x304" alt="">
              </li>
              <li>
                <img src="http://dummyimage.com/280x304" alt="">
              </li>
              <li>
                <img src="http://dummyimage.com/280x304" alt="">
              </li>
            </ul>
          <pages v-if="activeName=='first'" :send-parms="sendParms" ref="headerChild" v-on:spot="spotList"></pages>
        </el-tab-pane>
        <el-tab-pane  label="视频" name="second">
          <video src=""></video>
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
    components:{
      pages
    },
    data() {
      return{
        sendParms:{
          url:'/cms/image/4/list',
          pageNum:1,
          pageSize:10,
          collectionId:'',
          tenantCode:1,
        },
        dataImgsList:'',
        videoUrl:'',
        dataList:'',
        activeName:'first',
        ruleBg:require('@/assets/images/psb.jpg'),
        ruleBg1:require('@/assets/images/psb (1).jpg'),
        ruleBg2:require('@/assets/images/5acb330f8dd49.jpg'),
      }
    },
    methods: {
      getData(){

      },
      jupmer(newsId){
        this.$router.push({path:'media',query:{'tabIndex':newsId.name}})
      },
      jump(detailId){
/*        this.$router.push({path:'media',query:{'tabIndex':'first'}})*/
      },
      spotList(data){
        this.dataImgsList=data;
      }
    },
    created(){
      this.activeName=this.$route.query.tabIndex;
      this.sendParms.collectionId=this.$route.query.detailId;
      this.videoUrl=this.$route.query.tabIndex;
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
      justify-content:flex-start;
      flex-wrap:wrap;
      li{
        margin-bottom: 15px;
        width: 25%;
        height: 222px;
        padding: 0 5px;
        box-sizing: border-box;
        overflow: hidden;
        img{
          width:100%;
          height: 100%;
        }
      }
      li:hover{
        cursor: pointer;
      }
    }
  }
</style>


