<template>
  <div id="support-manage">
    <!-- 顶部栏 -->
    <div class="toptoolbar">
      <lp-button size="medium" icon="iconicon-test" @click="addSupport">添加支持方</lp-button>
    </div>
    
    <div class="tb-content">
      <el-table
        v-loading="TableLoading"
        border
        ref="multipleTable"
        :data="supports"
        style="width: 100%">
        <el-table-column align="center" type="index" :index="1" label="序号">
        </el-table-column>
        <el-table-column
          align="center"
          prop="type"
          label="类别">
        </el-table-column>
        <el-table-column
          align="center"
          prop="supportName"
          label="支持方名称">
        </el-table-column>
        <el-table-column
          align="center"
          prop="createTime"
          label="支持方LOGO">
          <template slot-scope="scope">
            <img v-if="scope.row.fileUrl" :src="scope.row.fileUrl">
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          min-width="160"
          label="操作">
          <template slot-scope="scope">
            <lp-button size="small" type="success" @click="handleEdit(scope.row)" icon="iconbianji-copy">编辑</lp-button>
            <lp-button size="small" type="delete" @click="handleDelete(scope.row.id)" icon="iconshanchu">删除</lp-button>
            <lp-button size="small" :disabled="scope.$index === 0" @click="upAnddown(supports, scope.$index, 1)" icon="iconshangsheng">上升</lp-button>
            <lp-button size="small" :disabled="scope.$index === supports.length - 1" type="danger" @click="upAnddown(supports, scope.$index, 0)" icon="iconxiajiang">下降</lp-button>
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
      :title="support.id ? '编辑支持方' : '添加支持方'"
      :visible.sync="addDialogVisible"
      @closed="closed"
      :close-on-click-modal="false"
      width="50%">
        <el-form ref="form" :rules="rules" :model="support" label-width="110px">
          <el-form-item label="支持方名称" prop="supportName">
            <el-input v-model="support.supportName"></el-input>
          </el-form-item>
          <el-form-item label="类别" prop="type">
            <el-select v-model="support.type" placeholder="冠名赞助" style="width: 150px">
              <el-option :label="type" :value="type" v-for="(type, index) in matchSupportType" :key="index"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="支持方LOGO" class="logo-upload" prop="file">
            <el-upload
              action=""
              class="avatar-uploader"
              accept="image/*"
              :show-file-list="false"
              :before-upload="beforeLogoUpload">
              <img v-if="support.fileUrl" :src="support.fileUrl" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              <div slot="tip" class="el-upload__tip">只能上传图片文件，且不超过5M</div>
            </el-upload>
          </el-form-item>
        </el-form>
      <span slot="footer" class="dialog-footer">
        <lp-button :loading="submitLoading" size="medium" type="primary" @click="startAdd">提交</lp-button>
        <lp-button size="medium" @click="addDialogVisible = false">取 消</lp-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { addEventEventSupports, getListDicts, deleteEventSupports, listEventSupports } from '@/api/matchManage.js'
import { pageEventSupport, enitEventSupport } from '@/api/supportManage.js'
import util from '@/common/util.js'
export default {
  data() {
    return {
      rules: {
        type: [
          { required: true, message: '请选择支持方类别', trigger: 'blur' },
        ],
        supportName: [
          { required: true, message: '请输入支持方名称', trigger: 'blur' },
        ],
        file: [
          { required: true, message: '请上传支持方LOGO', trigger: 'blur' },
        ],
      },
      submitLoading: false,
      matchSupportType: [],
      support: {
        id: 0,
        eventsId: '',
        type: '',
        supportName: '',
        file: '',
        fileUrl: '',
        sort: ''
      },
      supports: [],
      total: 0, // 分页总数
      pageNum: 1, // 页码
      pageSize: 10, // 一页数量
      TableLoading: false,
      addDialogVisible: false,
    }
  },
  methods: {
    startAdd () {
      this.support.eventsId = this.$route.params.eventId
      this.support.sort = this.supports.length
      let formData = new FormData()
      formData = util.objToFormData({ data: this.support })

      this.$refs.form.validate((valid) => {
        if (valid) {
          this.submitLoading = true
          addEventEventSupports(formData).then(res => {
          this.$refs.form.resetFields()
          this.getSupports()
          this.addDialogVisible = false
          this.submitLoading = false
        }).catch(err => {
          this.submitLoading = false
        })
        }
      })
  
    },
    beforeLogoUpload (file) {
      const isLt5M = file.size / 1024 / 1024 < 5;

      if (!isLt5M) {
        this.$message.error('上传LOGO图片大小不能超过 5MB!');
      } else {
        var windowURL = window.URL || window.webkitURL;
        this.support.fileUrl = windowURL.createObjectURL(file);
        this.support.file = file
      }
      return false;
    },
    addSupport () {
      getListDicts({ dictionaryName: '赛事支持类别' }).then(res => {
        this.matchSupportType = res.data.map(item => item.value)
        this.addDialogVisible = true
      }).catch(err => {
        console.log(err)
      })
    },
    handleDelete (id) {
      this.$confirm('此操作将永久删除该赛事支持方, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteEventSupports({ ids: id }).then(res => {
          this.getSupports()
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
    handleEdit (row) {
      getListDicts({ dictionaryName: '赛事支持类别' }).then(res => {
        this.matchSupportType = res.data.map(item => item.value)
        Object.assign(this.support, row)
        this.addDialogVisible = true
      }).catch(err => {
        console.log(err)
      })
    },
    getSupports () {
      this.TableLoading = true
      let formData = new FormData()
      formData = util.objToFormData({ data: { eventId: this.$route.params.eventId, pageSize: this.pageSize, pageNum: this.pageNum - 1 }})
      pageEventSupport(formData).then(res => {
        this.supports = res.datas
        this.total = res.totalNum
        this.TableLoading = false
      }).catch(err => {
        console.log(err)
        this.TableLoading = false
      })
    },
    closed () {
      this.support = {
        id: 0,
        eventsId: '',
        type: '',
        supportName: '',
        file: '',
        fileUrl: '',
        sort: ''
      }
    },
    // 分页组件两个事件
    handleCurrentChange (val) {
      this.pageNum = val
      this.getSupports()
    },
    handleSizeChange (val) {
      this.pageSize = val
      this.getSupports()
    },
    // 上升下降
    upAnddown (array, index, type) {
      let temp
      if (type) { // 上升
        let formData = new FormData()
        formData = util.objToFormData({ data: { id: array[index].id, sort: array[index].sort - 1 } })
        let formData1 = new FormData()
        formData1 = util.objToFormData({ data: { id: array[index - 1].id, sort: array[index - 1].sort + 1 } })
        Promise.all([
          enitEventSupport(formData), 
          enitEventSupport(formData1)
        ]).then(([res, res1]) => {
          temp = array[index - 1]
          this.$set(array, index - 1, array[index])
          this.$set(array, index, temp)
        }).catch(err => {
          console.log(err)
        })
      } else {
        let formData = new FormData()
        formData = util.objToFormData({ data: { id: array[index].id, sort: array[index].sort + 1 } })
        let formData1 = new FormData()
        formData1 = util.objToFormData({ data: { id: array[index + 1].id, sort: array[index + 1].sort - 1 } })
        Promise.all([
          enitEventSupport(formData), 
          enitEventSupport(formData1)
        ]).then(([res, res1]) => {
          temp = array[index + 1]
          this.$set(array, index + 1, array[index])
          this.$set(array, index, temp)
        }).catch(err => {
          console.log(err)
        }) 
      }
    }
  },
  created () {
    this.getSupports()
  }
}
</script>

<style scoped lang="scss">
#support-manage {
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
