<template>
  <div class="footer-wrap">
    <router-link to="match">
      <div class="item-wp">
          <div class="item" :class="{'active': itemFlag == 'main'}" @click="changeItem('main')">
            <p class="icon-p"><i class="iconfont iconshouye"></i></p>
            <p class="title">首页</p>
          </div>
      </div>
    </router-link>
    <router-link to="mySignUp">
      <div class="item-wp">
          <div class="item" :class="{'active': itemFlag == 'mySignUp'}" @click="changeItem('mySignUp')">
            <p class="icon-p"><i class="iconfont iconwodebaoming"></i></p>
            <p class="title">我的报名</p>
          </div>
      </div>
    </router-link>
    <router-link to="personCenter">
      <div class="item-wp" style="border: none">
          <div class="item" :class="{'active': itemFlag == 'personCenter'}" @click="changeItem('personCenter')">
            <p class="icon-p"><i class="iconfont icongerenzhongxin"></i></p>
            <p class="title">个人中心</p>
          </div>
      </div>
    </router-link>
  </div>
</template>

<script>
  export default {
    name: "comFooter",
    data() {
      return {
        itemFlag: 'main'
      }
    },
    created (){
      this.activedItem();
    },
    methods: {
      activedItem() {
        if(sessionStorage.getItem('itemFlag')){
          this.itemFlag = sessionStorage.getItem('itemFlag');
        }
      },
      changeItem(item) {
        if(this.itemFlag != item){
          this.itemFlag = item;
          sessionStorage.setItem('itemFlag', item);
        }
      }
    }
  }
</script>

<style scoped lang="scss">
  .footer-wrap{
    position: absolute;
    left: 0;
    bottom: 0;
    padding: 10px 0;
    width: 100%;
    height: 100px;
    border-top: 1px solid #ddd;
    .item-wp{
      float: left;
      display: table;
      width: 33.33%;
      height: 100%;
      text-align: center;
      border-right: 1px solid #ddd;
      .item{
        display: table-cell;
        vertical-align: middle;
        i{
          line-height: 1.0;
          font-size: 36px;
        }
        .title{
          letter-spacing: -1px;
          margin-top: 8px;
          font-size: 24px;
          line-height: 1.0;
          color: #999;
        }
        &.active{
          p{
            color: #f11722;
          }
        }
      }
    }
  }
</style>
