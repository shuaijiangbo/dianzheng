<template>
  <div class="bs-wp">
     <top-back titleText="修改密码" back-url="/personCenter"></top-back>
    <el-row style="padding: 0 0.48rem;">
      <div class="line-wrap">
        <div class="col-bar title">
          <label class="line-title">旧密码</label>
        </div>
        <div class="col-bar input">
          <input type="password" class="base-pt" maxlength="18" placeholder="请输入旧密码"/>
        </div>
      </div>
      <div class="line-wrap">
        <div class="col-bar title">
          <label class="line-title">新密码</label>
        </div>
        <div class="col-bar input">
          <input type="password" class="base-pt" maxlength="18" placeholder="请输入新密码"/>
        </div>
      </div>
      <div class="line-wrap">
        <div class="col-bar title">
          <label class="line-title">确认新密码</label>
        </div>
        <div class="col-bar input">
          <input type="password" class="base-pt" maxlength="18" placeholder="请确认新密码"/>
        </div>
      </div>
    </el-row>
  </div>
</template>

<script>
  import topBack from '@/components/common/topBack';

  export default {
    name: "resetPsd",
    data() {
      return {
      }
    },
    components: {topBack},
    methods: {

    }
  }
</script>

<style scoped>

</style>
