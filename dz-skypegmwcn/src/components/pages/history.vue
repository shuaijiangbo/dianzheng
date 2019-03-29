<template>
  <div class="content-box">
    <div class="content">
      <el-tabs type="border-card" @tab-click="jupmer" v-model="activeName">
        <el-tab-pane label="图片" name="first">
            <ul class="picture-box" >
              <li>
                <img src="http://dummyimage.com/280x304" alt="">
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
              <li>
                <img src="http://dummyimage.com/280x304" alt="">
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
        </el-tab-pane>
        <el-tab-pane  label="视频" name="second">

        </el-tab-pane>
      </el-tabs>
      <pages :send-parms="sendParms" ref="headerChild" v-on:spot="spot"></pages>
    </div>
  </div>
</template>

<script>
  import Picker from "element-ui/packages/date-picker/src/picker";
  import '@/assets/scss/media.scss'
  import pages from '@/components/common/pagination'
  export default {
    name: 'HelloWorld',
    components:{
      pages
    },
    data() {
      return{
        sendParms:{
          url:'getNewListPage',
          pageNum:1,
          pageSize:10,
        },
        dataList:'',
        activeName:'first'
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
      spot(data){
        console.log(data);
        this.dataList=data;
      }
    },
    created(){
      this.activeName=this.$route.query.tabIndex;
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
        }
      }
      li:hover{
        cursor: pointer;
      }
    }
  }
</style>


