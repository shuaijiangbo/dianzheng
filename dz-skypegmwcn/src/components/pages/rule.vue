<template>
  <div class="boder_box">
      <ul class="items-box">

        <template  v-for="(item,index) in items">
          <li @mouseover="item.isTrue=1" @mouseout="item.isTrue=0" :style="{backgroundImage:'url('+(item.isTrue?ruleBg1:ruleBg)+')'}">
            <p class="china-txt">{{item.cname}}</p>
            <p class="eng-txt">{{item.ename}}</p>
          </li>
        </template>

        <!--<li :style="{backgroundImage:'url('+ruleBg+')'}">
          <p class="china-txt">跑</p>
          <p class="eng-txt">RUN</p>
        </li>-->
      </ul>
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
        ruleBg:require('@/assets/images/rule_bg.png'),
        ruleBg1:require('@/assets/images/rule_bg1.png'),
        sendParms:{
          url:'getNewListPage',
          pageNum:1,
          pageSize:10,
        },
        dataList:'',
        activeName:'first',
        items:[
          {
            cname:'跑',
            ename:'RUN',
            url:'home',
            isTrue:false,
          },
          {
            cname:'跳跃',
            ename:'JUMP',
            url:'home',
            isTrue:false,
          },
          {
            cname:'竞走',
            ename:'WALK',
            url:'home',
            isTrue:false,
          },
          {
            cname:'跑',
            ename:'RUN',
            url:'home',
            isTrue:false,
          },
          {
            cname:'跑',
            ename:'RUN',
            url:'home',
            isTrue:false,
          },
          {
            cname:'跑',
            ename:'RUN',
            url:'home',
            isTrue:false,
          },
        ]
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
      .boder_box{
        height: 1060px;
        width: 930px;
        background-color: white;
        float: left;
        margin-left: 20px;
        margin-top: 20px;
        padding: 20px;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
      }
    .items-box{
      display: flex;
      justify-content:space-between;
      flex-wrap:wrap;
      li{
        margin-bottom: 15px;
        width: 280px;
        height: 178px;
        background-size: cover;
        p{
          width:100%;
          font-size: 24px;
          color: #fff;
        }
        p.china-txt{
          margin-top: 50px;
          font-size: 36px;
        }
      }
      li:hover{
        cursor: pointer;
      }
    }

</style>


