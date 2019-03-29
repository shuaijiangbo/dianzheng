<template>
  <div id="notice-manage">
    <!-- 顶部栏 -->
    <div class="toptoolbar">
      <lp-button size="medium" icon="iconicon-test" @click="addNotice">新建通知</lp-button>
    </div>

    <div class="tb-content">
      <el-table
        v-loading="TableLoading"
        border
        ref="multipleTable"
        :data="notices"
        style="width: 100%">
        <el-table-column
          align="center"
          prop="title"
          min-width="400"
          label="标题">
        </el-table-column>
        <el-table-column
          align="center"
          prop="type"
          min-width="100"
          label="方式">
        </el-table-column>
        <el-table-column
          align="center"
          prop="publishStatus"
          min-width="100"
          label="状态">
          <template slot-scope="scope">
            <span :style="scope.row.publishStatus === '1' ? {color: 'red'} : {color: 'green'}">{{ scope.row.publishStatus === '1' ? '未发布' : '已发布' }}</span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="操作"
          min-width="300">
          <template slot-scope="scope">
            <lp-button size="mini" type="success" icon="iconbianji-copy" @click="handleEdit(scope.row)">编辑</lp-button>
            <lp-button size="mini" :disabled="scope.row.publishStatus !== '1'" @click="handlePublish(scope.row.id)" icon="iconfabu">发布通知</lp-button>
            <lp-button size="mini" type="danger" icon="iconshanchu" @click="handleDelete(scope.row.id)">删除</lp-button>
          </template>
        </el-table-column>
      </el-table>

      <div class="bottomtoolbar">
        <el-pagination
          prev-text="上一页"
          next-text="下一页"
          layout="total, sizes, prev, pager, next, jumper"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          background
          :page-sizes="[5,10,15]"
          :page-size="pageSize"
          :total="total"
          style="float:right;"
        ></el-pagination>
      </div>
    </div>

    

    <el-dialog
      class="addDialogVisible notice-manage-dialog"
      :title="notice.id ? '编辑通知' : '新建通知'"
      :visible.sync="addDialogVisible"
      @closed="closed"
      :close-on-click-modal="false"
      width="50%">
        <el-form ref="form" :model="notice" :rules="rules" label-width="100px">
          <el-form-item label="标题" prop="title">
            <el-input v-model="notice.title" placeholder="标题"></el-input>
          </el-form-item>
          <el-form-item label="通知方式" prop="type" class="logo-upload">
            <el-select v-model="notice.type" placeholder="通知方式">
              <el-option :label="type" :value="type" v-for="(type, index) in types" :key="index"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="内容" prop="context" class="logo-upload">
            <!-- 图片上传组件辅助-->
            <el-upload
              class="avatar-uploader"
              :action="serverUrl"
              name="file"
              :show-file-list="false"
              :on-success="uploadSuccess"
              :on-error="uploadError"
              :before-upload="beforeUpload">
            </el-upload>
            <!--富文本编辑器组件-->
            <el-row v-loading="quillUpdateImg">
              <quill-editor v-model="notice.context"
                ref="myQuillEditor"
                :options="editorOption"
                @blur="onEditorBlur($event)"
                @focus="onEditorFocus($event)"
                @ready="onEditorReady($event)"
                @change="onEditorChange($event)">
              </quill-editor>
            </el-row>
          </el-form-item>

        </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button :loading="submitLoading" size="medium" type="primary" @click="startAdd">提交</el-button>
        <el-button size="medium" @click="addDialogVisible = false">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { publishEventNotice, enitEventNotice, pageEventNotice, addEventNotice, deleteEventNotice } from '@/api/noticeManage.js'
import { getListDicts } from '@/api/matchManage.js'
import util from '@/common/util.js'
export default {
  data() {
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
      quillUpdateImg: false, // 根据图片上传状态来确定是否显示loading动画，刚开始是false,不显示
      serverUrl: `${process.env.VUE_APP_API}/event-api/management/addFile`,  // 这里写你要上传的图片服务器地址
      editorOption: {
        modules: {
          imageResize: {},
          // imageDrop:true,
          toolbar: {
            container: toolbarOptions, // 工具栏
            handlers: {
              'image': function (value) {
                  if (value) {
                    console.log('自定义富文本编辑器的图片上传事件')
                    document.querySelector('.notice-manage-dialog .avatar-uploader input').click()
                  }else {
                    this.quill.format('image', false);
                  }
              }
            }
          }
        }
      },
      rules: {
        title: [
          { required: true, message: '请输入通知标题', trigger: 'blur' },
        ],
        type: [
          { required: true, message: '请选择通知方式', trigger: 'blur' },
        ],
        context: [
          { required: true, message: '请输入通知内容', trigger: 'blur' },
        ],
      },
      notice: {
        eventsId: this.$route.params.eventId,
        id: 0,
        context: '',
        publishStatus: '',
        title: '',
        type: ''
      },
      types: [],
      notices: [],
      total: 0, // 分页总数
      pageNum: 1, // 页码
      pageSize: 10, // 一页数量
      submitLoading: false,
      TableLoading: false,
      addDialogVisible: false,
    }
  },
  methods: {
    startAdd () {
      let formData = new FormData()
      formData = util.objToFormData({ data: this.notice })

      this.$refs.form.validate((valid) => {
        if (valid) {
          this.submitLoading = true
          addEventNotice(formData).then(res => {
            this.getNotices()
            this.submitLoading = false
            this.addDialogVisible = false
          }).catch(err => {
            this.submitLoading = false
            console.log(err)
          })
        }
      })
      
    },
    addNotice () {
      getListDicts({ dictionaryName: '通知方式' }).then(res => {
        this.types = res.data.map(item => item.value)
        this.addDialogVisible = true
      }).catch(err => {
        console.log(err)
      })
    },
    handleEdit (row) {
      getListDicts({ dictionaryName: '通知方式' }).then(res => {
        this.types = res.data.map(item => item.value)
        this.notice.title = row.title
        this.notice.type = row.type
        this.notice.context = row.context
        this.addDialogVisible = true
      }).catch(err => {
        console.log(err)
      })
    },
    handlePublish (id) {
      let data = {
        id,
        publishStatus: '2'
      }
      publishEventNotice(data).then(res => {
        this.getNotices()
      }).catch(err => {
        console.log(err)
      })
    },
    handleDelete (id) {
      this.$confirm('此操作将永久删除该赛事通知, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteEventNotice({ ids: id }).then(res => {
          this.getNotices()
        }).catch(err => {
          console.log(err)
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })       
      })
      
    },
    getNotices () {
      let data = {
        pageSize: this.pageSize,
        pageNum: this.pageNum - 1,
        eventId: this.$route.params.eventId
      }
      let formData = new FormData()
      formData = util.objToFormData({ data })
      this.TableLoading = true
      pageEventNotice(formData).then(res => {
        this.notices = res.datas
        this.total = res.totalNum
        this.TableLoading = false
      }).catch(err => {
        this.TableLoading = false
        console.log(err)
      })
    },
    noticesbeforeUpload (file) {
      this.$set(this.fileList, 0, { name: file.name })
      const isLt50M = file.size / 1024 / 1024 < 50

      if (!isLt50M) {
        this.$message.error('上传文件大小不能超过 50MB!')
      }
      this.notice.file = file

      return false
    },
    closed () {
      this.$refs.form.resetFields()
      this.notice = {
        eventsId: this.$route.params.eventId,
        id: 0,
        context: '',
        publishStatus: '',
        title: '',
        type: ''
      }
    },
    // 分页组件两个事件
    handleCurrentChange (val) {
      this.pageNum = val
      this.getNotices()
    },
    handleSizeChange (val) {
      this.pageSize = val
      this.getNotices()
    },
    onEditorBlur (quill) {
      console.log('editor 失焦!', quill)
    },
    onEditorFocus (quill) {
      console.log('editor 聚焦!', quill)
    },
    onEditorReady (quill) {
      console.log('editor 准备!', quill)
    },
    onEditorChange ({ quill, html, text }) {
      this.notice.context = html
      console.log(html)
    },
    uploadSuccess(res, file) {
        // res为图片服务器返回的数据
        // 获取富文本组件实例
        let quill = this.$refs.myQuillEditor.quill
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
    uploadError() {
        // loading动画消失
        this.quillUpdateImg = false
        this.$message.error('图片插入失败')
    },
    beforeUpload() {
      // 显示loading动画
      this.quillUpdateImg = true
    },
  },
  created () {
    this.getNotices()
  },
  components: {

  }
}
</script>

<style scoped lang="scss">
.notice-manage-dialog {
  .avatar-uploader {
    display: none;
  }
}
#notice-manage {
  height: 100%;
  display: flex;
  flex-direction: column;
  > div {
    padding-left: 30px !important;
  }
  .toptoolbar {
    padding-top: 15px;
  }
  .bottomtoolbar {
    overflow: hidden;
    padding: 20px;
  }
  .tb-content {
    flex: 1;
    overflow: scroll;
    overflow-x: hidden;
    padding: 20px;
  }
}
</style>
