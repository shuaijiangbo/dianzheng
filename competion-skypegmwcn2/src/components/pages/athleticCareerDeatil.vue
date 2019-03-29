<template>
  <div class="">
    <div class="">
      <p class="fTitle"><label style="margin-left: 15px;">我的运动生涯</label></p>
      <div class="title-box">
        <span class="title">运动生涯</span>
      </div>
      <div class="">
        <iframe v-if="datas.isMap=='2'" :src='mapUrl' frameborder="0"></iframe>
        <ul v-if="datas.isMap!='2'">
          <li class="video-item" v-for="item in datas.details">
            <video controls="controls" loop="loop" :src="item.fileUrl"></video>
          </li>
        </ul>
      </div>
      <div class="edit-box">
        <!-- 图片上传组件辅助-->
        <el-upload
          class="avatar-uploader"
          action="http://119.84.121.211:22082/event-api/management/addFile"
          name="file"
          :show-file-list="false"
          :on-success="uploadSuccess"
          :on-error="uploadError"
          :before-upload="beforeUpload">
        </el-upload>
        <el-row>
          <quill-editor ref="myQuillEditor"
                        :options="editorOption"
                        v-model="editVal"
                        @blur="onEditorBlur($event)"
                        @focus="onEditorFocus($event)"
                        @ready="onEditorReady($event)"
                        @change="onEditorChange($event)"
          ></quill-editor>
        </el-row>
      </div>
    </div>
  </div>
</template>
<script>
  import axios from 'axios';
  var qs = require('qs');
  import {get, post} from '@/api/fetch.js';
  import url from '@/api/serviceAPI.config.js';
  import { quillEditor } from 'vue-quill-editor'


  export default {
    name: "",
    data(){
      // 工具栏配置
      const toolbarOptions = [
        ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
        ['blockquote', 'code-block'],

        [{'header': 1}, {'header': 2}],               // custom button values
        [{'list': 'ordered'}, {'list': 'bullet'}],
        [{'script': 'sub'}, {'script': 'super'}],      // superscript/subscript
        [{'indent': '-1'}, {'indent': '+1'}],          // outdent/indent
        [{'direction': 'rtl'}],                         // text direction

        [{'size': ['small', false, 'large', 'huge']}],  // custom dropdown
        [{'header': [1, 2, 3, 4, 5, 6, false]}],

        [{'color': []}, {'background': []}],          // dropdown with defaults from theme
        [{'font': []}],
        [{'align': []}],
        ['link', 'image', 'video'],
        ['clean']                                         // remove formatting button
      ]
      return {
        posterImg:require('@/assets/images/logins.png'),
        mapUrl:'',
        ids:{},
        datas:{},
        editorOption: {
          modules: {
            // imageDrop:true,
            toolbar: {
              container: toolbarOptions, // 工具栏
              handlers: {
                'image': function (value) {
                  if (value) {
                    console.log('自定义富文本编辑器的图片上传事件')
                    document.querySelector('.edit-box .avatar-uploader input').click()
                  } else {
                    this.quill.format('image', false);
                  }
                }
              }
            }
          },
        },
        editVal:''
      }
    },
    methods:{
      getTree:function(){
          post(url.eventLogDetails,{eventLogId:this.ids.logId}).then(res=>{
            this.datas=res.data;
            console.log(this.datas);
          })
      },
      onEditorBlur (quill) {
      },
      onEditorFocus (quill) {
      },
      onEditorReady (quill) {
      },
      onEditorChange ({ quill, html, text }) {
        this.editVal = html
      },
      // onEditorChangeInfo ({ quill, html, text }) {
      //   this.basicInfoForm.chargesInfo = html
      // },

      uploadSuccess (res, file) {
        // res为图片服务器返回的数据
        // 获取富文本组件实例
        let quill = this.$refs.myQuillEditor.quill;
        // 如果上传成功
        if (res.status === 200 && res.data[0] !== null) {
          // 获取光标所在位置
          let length = quill.getSelection().index;
          // 插入图片  res.data.info为服务器返回的图片地址
          quill.insertEmbed(length, 'image', res.data[0])
          // 调整光标到最后
          quill.setSelection(length + 1)
        } else {
          this.$message.error('图片插入失败')
        }
        // loading动画消失
        this.quillUpdateImg = false
      },
      // 富文本图片上传失败
      uploadError(){
        // loading动画消失
        this.quillUpdateImg = false
        this.$message.error('图片插入失败')
      },
      beforeUpload(){
        // 显示loading动画
        this.quillUpdateImg = true
      },
    },
    created(){

      this.ids=this.$route.query;
      this.mapUrl=`${url.mapUrl}?eventId=${this.ids.eventId}&logId=${this.ids.logId}`
      this.getTree();
    }
  }
</script>

<style type="text/scss" lang="scss" scoped>
  .fTitle {
    height: 32px;
    line-height: 32px;
    width: 100%;
    background: #fefefe;
    border: 1px solid #ddd;
    margin-bottom: 20px;
    color: #a7a7a7;
  }
  iframe{
    width: 100%;
    height: 600px;
    margin-bottom: 30px;
  }
  .video-item{
    width: 100%;
    video{
      width: 100%;
    }
  }
</style>
