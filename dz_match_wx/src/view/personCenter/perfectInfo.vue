<template>
  <div class="bs-wp bwbg">
    <top-back titleText="完善信息" back-url="/personCenter"></top-back>
    <el-row class="pf-wp bwbg">
      <div class="tip-wp">
        <label>完善更多个人信息,有助于我们为您提供更加个性化的服务,HOTi将尊重并保护您的隐私。</label>
      </div>
      <div class="info-wp">
        <div class="info-line header-line">
          <div class="lt-part">头像</div>
          <div class="rt-part">
            <el-upload
              class="avatar-uploader"
              action=""
              :on-success="dd"
              :before-upload="dd">
              <img v-if="flag" src="../../assets/main/pscen_headphoto.png" class="headPhoto-bar">
              <span v-else class="headPhoto-bar headPhoto"></span>
            </el-upload>
          </div>
        </div>
        <div class="info-line">
          <div class="lt-part">昵称</div>
          <div class="rt-part">
            <input type="text" class="bs-sti" />
          </div>
        </div>
        <div class="info-line">
          <div class="lt-part">姓名</div>
          <div class="rt-part">
            <input type="text" class="bs-sti" />
          </div>
        </div>
        <div class="info-line">
          <div class="lt-part">性别</div>
          <div class="rt-part">33</div>
        </div>
        <div class="info-line">
          <div class="lt-part">生日</div>
          <div class="rt-part">33</div>
        </div>
        <div class="info-line">
          <div class="lt-part">所在城市</div>
          <div class="rt-part">33</div>
        </div>
        <div class="info-line">
          <div class="lt-part" style="border-right: none;"></div>
          <div class="rt-part">
            <input type="text" class="bs-sti" />
          </div>
        </div>
        <div class="info-line">
          <div class="lt-part">证件类型</div>
          <div class="rt-part">33</div>
        </div>
        <div class="info-line upload-file-line">
          <div class="lt-part"  style="border-right: none">上传证件</div>
          <span class="upload-span">
            <span class="file-span">
              <el-upload
                class="avatar-uploader"
                action=""
                :on-success="dd"
                :before-upload="dd">
              <img v-if="flag" src="../../assets/main/pscen_idcard_front.jpg" class="idCard-bar">
              <span v-else class="idCard-bar idcard-front"></span>
            </el-upload>
            </span>
            <span class="file-span">
              <el-upload
                class="avatar-uploader"
                action=""
                :on-success="dd"
                :before-upload="dd">
              <img v-if="flag" src="../../assets/main/pscen_idcard_back.jpg" class="idCard-bar">
              <span v-else class="idCard-bar idcard-back"></span>
              </el-upload>
            </span>
          </span>
        </div>
        <div class="info-line">
          <div class="lt-part">证件号码</div>
          <div class="rt-part">
            <input type="text" class="bs-sti" />
          </div>
        </div>
        <div class="info-line faceId-line">
          <div class="lt-part">faceId</div>
          <div class="rt-part">
            <el-upload
              class="avatar-uploader"
              action=""
              :on-success="dd"
              :before-upload="dd">
              <img v-if="flag" src="../../assets/main/pscen_facephoto.jpg" class="facePhoto-bar">
              <span v-else class="facePhoto-bar facePhoto"></span>
            </el-upload>
          </div>
        </div>
        <div class="info-line intro-line">
          <div class="lt-part">简介</div>
          <div class="rt-part">
            <textarea class="bs-sti"></textarea>
          </div>
        </div>
      </div>
      <div class="info-save-wp">
        <el-button class="com-btn btn-bgc">保 存</el-button>
      </div>
    </el-row>
  </div>
</template>

<script>
  import topBack from '@/components/common/topBack';

  export default {
    name: "perfectInfo",
    data() {
      return {
        flag: true
      }
    },
    components: {topBack},
    methods: {
      dd() {

      }
    }
  }
</script>

<style scoped lang="scss">

  .tip-wp {
    margin: 0.14rem 0.24rem;
    padding-left: 0.16rem;
    line-height: 0.44rem;
    color: #999;
    font-size: 16px;
    white-space: pre-wrap;
    border: 1px solid #edd28b;
    background-color: #fffdee;
  }

  .info-line {
    padding: 0.24rem 0.24rem 0.16rem;
    border-top: 1px solid #dedede;
    background-color: #fff;
    overflow: hidden;
    &:last-child {
      border-bottom: 1px solid #dedede;
    }
    > div {
      height: 0.36rem;
      line-height: 0.36rem;
      float: left;
      display: inline-block;
      font-size: 20px;
    }
    &.header-line,
    &.faceId-line,
    &.intro-line {
      > div {
        height: 1rem;
        line-height: 1rem;
      }
    }
    &.upload-file-line {
      height: auto;
    }
    .upload-span {
      display: block;
      margin-top: 0.4rem;
      .file-span {
        float: left;
        display: inline-block;
        margin-top: 0.2rem;
        &:first-child{
          margin-left: 0.3rem;
          margin-right: 0.2rem;
        }
      }
    }
    .lt-part {
      width: 145px;
      color: #666;
      border-right: 1px solid #bfbfbf;
    }
    .rt-part {
      padding-left: 0.25rem;
      width: calc(100% - 150px);
      color: #333;
    }
  }

  .info-save-wp {
    padding: 0.2rem 0.48rem 0.45rem;
  }

  .bs-sti{
    float: left;
    width: 100%;
    height: 100%;
    vertical-align: middle;
    border: none;
  }
</style>
