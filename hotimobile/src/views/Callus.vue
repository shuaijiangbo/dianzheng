<template>
  <div class="wrapper">
    <img src="@/assets/images/address.png" alt="">
    <div>
      <Icon name="location-o"></Icon><p>地址：重庆市渝北区光电园双子座B座6楼</p>
    </div>
    <div>
       <Icon name="phone-o"></Icon><p>电话：023-67468469</p>
    </div>
    
  </div>
</template>

<script>
import { Icon } from 'vant'
  export default {
    components: {
      Icon,
    },
    data() {
      return {

      }
    },
  }
</script>

<style scoped lang="scss">
 .wrapper {
   display: flex;
   flex-direction: column;
   align-items: center;
   img {
    width: 100%;
   }
   div {
     width: 100%;
     padding-left: px2rem(36px);
     box-sizing: border-box;
     border-bottom: 1px solid #DDDDDD;
     height: px2rem(85px);
     display: flex;
     align-items: center;
   }
   p{
     display: inline-block;
     color: #666666;
     padding-left: px2rem(20px);
   }
   .van-icon {
     color: #e47646;
   }
 }
  
</style>
