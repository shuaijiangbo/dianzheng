<template>
  <div id="attch-manage">
    <!-- 顶部栏 -->
    <div class="toptoolbar">
      <lp-button size="medium" icon="iconicon-test" @click="addAttch">添加资料</lp-button>
      <!-- <el-button size="medium" type="primary" icon="el-icon-plus" @click="addAttch">添加资料</el-button> -->
    </div>

    <div class="tb-content">
      <el-table
        v-loading="TableLoading"
        border
        ref="multipleTable"
        :data="attchs"
        style="width: 100%">
        <el-table-column width="100" align="center" type="index" :index="1" label="序号">
        </el-table-column>
        <el-table-column
          align="center"
          prop="fileName"
          min-width="600"
          label="资料名">
        </el-table-column>
        <el-table-column
          align="center"
          label="操作"
          min-width="300">
          <template slot-scope="scope">
            <lp-button icon="iconbianji-copy" size="mini" @click="handleEdit(scope.row)">编辑</lp-button>
            <lp-button icon="iconshanchu" size="mini" type="delete" @click="handleDelete(scope.row.id)">删除</lp-button>
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
      class="addDialogVisible"
      :title="attch.id ? '编辑资料' : '添加资料'"
      :visible.sync="addDialogVisible"
      @closed="closed"
      :close-on-click-modal="false"
      width="50%">
        <el-form ref="form" :model="attch" :rules="rules" label-width="100px">
          <el-form-item label="资料名称" prop="fileName">
            <el-input v-model="attch.fileName" placeholder="资料名"></el-input>
          </el-form-item>
          <el-form-item label="资料文件" prop="file" class="logo-upload">
              <el-upload
                @click.native="uploadClick($event)"
                ref="upload"
                class="upload-demo"
                action=""
                multiple
                :limit="2"
                :before-upload="attchsbeforeUpload"
                :file-list="fileList">
                <el-button size="small" type="primary" icon="el-icon-upload2">选择资料</el-button>
                <div slot="tip" class="el-upload__tip">上传文件大小不能超过 50MB!</div>
              </el-upload>
          </el-form-item>
        </el-form>
      <span slot="footer" class="dialog-footer">
        <lp-button :loading="submitLoading" size="medium" @click="startAdd">提交</lp-button>
        <lp-button size="medium" @click="addDialogVisible = false">取 消</lp-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { pageEventFile } from '@/api/attchManage.js'
import { deleteEventInformation, addEventInformation } from '@/api/matchManage.js'
import util from '@/common/util.js'
export default {
  data() {
    return {
      fileList: [],
      rules: {
        fileName: [
          { required: true, message: '请输入资料名称', trigger: 'blur' },
        ],
        file: [
          { required: true, message: '请上传资料', trigger: 'blur' },
        ],
      },
      attch: {
        eventsId: this.$route.params.eventId,
        id: 0,
        fileName: '',
        file: ''
      },
      attchs: [],
      total: 0, // 分页总数
      pageNum: 1, // 页码
      pageSize: 10, // 一页数量
      submitLoading: false,
      TableLoading: false,
      addDialogVisible: false,
    }
  },
  methods: {
    uploadClick (e) {
      if (e.target.classList[0] === 'el-icon-close') {
        this.attch.file = ''
      }
    },
    startAdd () {
      let formData = new FormData()
      formData = util.objToFormData({ data: this.attch })

      this.$refs.form.validate((valid) => {
        if (valid) {
          this.submitLoading = true
          addEventInformation(formData).then(res => {
            this.getAttchs()
            this.submitLoading = false
            this.addDialogVisible = false
          }).catch(err => {
            this.submitLoading = false
            console.log(err)
          })
        }
      })
      
    },
    addAttch () {
      this.addDialogVisible = true
    },
    handleEdit (row) {
      this.attch = Object.assign(this.attch, row)
      this.addDialogVisible = true
    },
    handleDelete (id) {
      this.$confirm('此操作将永久删除该赛事资料, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteEventInformation({ ids: id }).then(res => {
          this.getAttchs()
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
    getAttchs () {
      let data = {
        pageSize: this.pageSize,
        pageNum: this.pageNum - 1,
        eventId: this.$route.params.eventId
      }
      let formData = new FormData()
      formData = util.objToFormData({ data })
      this.TableLoading = true
      pageEventFile(formData).then(res => {
        this.attchs = res.datas
        this.total = res.totalNum
        this.TableLoading = false
      }).catch(err => {
        this.TableLoading = false
        console.log(err)
      })
    },
    attchsbeforeUpload (file) {
      this.$set(this.fileList, 0, { name: file.name })
      const isLt50M = file.size / 1024 / 1024 < 50

      if (!isLt50M) {
        this.$message.error('上传文件大小不能超过 50MB!')
      }
      this.attch.file = file

      return false
    },
    closed () {
      this.$refs.form.resetFields()
      this.fileList = []
      this.attch = {
        eventsId: this.$route.params.eventId,
        id: 0,
        fileName: '',
        file: ''
      }
    },
    // 分页组件两个事件
    handleCurrentChange (val) {
      this.pageNum = val
      this.getAttchs()
    },
    handleSizeChange (val) {
      this.pageSize = val
      this.getAttchs()
    },
  },
  created () {
    this.getAttchs()
  },
}
</script>

<style scoped lang="scss">
#attch-manage {
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
