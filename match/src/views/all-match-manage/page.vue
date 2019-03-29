<template>
  <div id="all-match-manage">
    <!-- 顶部栏 -->
    <div class="toptoolbar">
      <lp-button size="medium" type="primary" icon="iconicon-test" @click="addMatch">创建总赛事</lp-button>
    </div>

    <div class="tb-content">
      <el-table
        v-loading="matchsTableLoading"
        border
        :data="matchs"
        style="width: 100%">
        <el-table-column align="center" type="index" :index="1" label="序号">
        </el-table-column>
        <el-table-column
          align="center"
          prop="parentName"
          label="总赛事名称">
        </el-table-column>
        <el-table-column
          align="center"
          prop="status"
          label="状态">
          <template slot-scope="scope">
            <span :style="scope.row.status === '1' ? {color: 'red'} : {color: 'green'}">{{ scope.row.status === '1' ? '未发布' : '已发布' }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="300">
          <template slot-scope="scope">
            <lp-button size="mini" type="success" icon="iconbianji-copy" @click="handleEdit(scope.$index, scope.row)">编辑</lp-button>
            <lp-button size="mini" type="primary" icon="iconfabu" @click="handlePublish(scope.$index, scope.row)">发布赛事</lp-button>
            <lp-button size="mini" type="delete" icon="iconshanchu" @click="handleDelete(scope.$index, scope.row)">删除</lp-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    
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

    <el-dialog
      class="addDialogVisible"
      :title="form.id ? '编辑总赛事' : '创建总赛事'"
      :visible.sync="addDialogVisible"
      @closed="addDialogClosed"
      :close-on-click-modal="false"
      width="50%">
        <el-form ref="form" :rules="rules" :model="form" label-width="100px">
          <el-form-item label="总赛事名称" prop="parentName">
            <el-input v-model="form.parentName" placeholder="总赛事名称" autofocus></el-input>
          </el-form-item>
        </el-form>

      <span slot="footer" class="dialog-footer">
        <lp-button size="medium" type="primary" @click="startAdd('form')">确认</lp-button>
        <lp-button size="medium" @click="addDialogVisible = false">取 消</lp-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { queryParentEvent, deleteParentEvent, addParentEvent, updateParentEvent } from '@/api/allMatchManage.js'
import qs from 'qs'
export default {
  data() {
    return {
      form: {
        parentName: ''
      },
      matchs: [],
      addDialogVisible: false,
      rules: {
        parentName: [
          { required: true, message: '请输入总赛事名称', trigger: 'blur' }
        ]
      },
      total: 0, // 分页总数
      pageNum: 1, // 页码
      pageSize: 10, // 一页数量
      matchsTableLoading: false
    }
  },
  methods: {
    startAdd (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.form.id) { // 修改
            updateParentEvent(qs.stringify({ id: this.form.id, parentName: this.form.parentName})).then(res => {
              this.getMatchs()
              this.addDialogVisible = false
            }).catch(err => {
              console.log(err)
            })
          } else { // 创建
            addParentEvent(qs.stringify(this.form)).then(res => {
              this.getMatchs()
              this.addDialogVisible = false
            }).catch(err => {
              console.log(err)
            })
          }
        }
      })
      
    },
    addMatch () {
      this.addDialogVisible = true
    },
    handleDelete (index, row) {
      this.$confirm('此操作将永久删除该赛事, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteParentEvent(qs.stringify({ id: row.id })).then(res => {
          this.getMatchs()
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
    handlePublish (index, row) {
      let data = { 
        id: row.id, 
        parentName: row.parentName, 
        status: '2'
      }
      updateParentEvent(qs.stringify(data)).then(res => {
        this.getMatchs()
      }).catch(err => {
        console.log(err)
      })
    },
    handleEdit (index, row) {
      this.form = row
      this.addDialogVisible = true
    },
    addDialogClosed () {
      this.form = {
        parentName: '',
      }
      this.$refs.form.clearValidate()
    },
    // 分页组件两个事件
    handleCurrentChange (val) {
      this.pageNum = val
      this.getMatchs()
    },
    handleSizeChange (val) {
      this.pageSize = val
      this.getMatchs()
    },
    getMatchs () {
      let data = {
        pageNum: this.pageNum - 1,
        pageSize: this.pageSize
      }
      this.matchsTableLoading = true
      queryParentEvent(qs.stringify(data)).then(res => {
        this.matchs = res.data.datas
        this.total = res.totalNum
        this.matchsTableLoading = false
      })
    }
  },
  created () {
    this.getMatchs()
  }
}
</script>

<style scoped lang="scss">
#all-match-manage {
  overflow: hidden;
  height: 100%;
  display: flex;
  flex-direction: column;
  > div {
    padding-left: 30px !important;
  }
  .toptoolbar {
    padding: 15px 0;
    border-bottom: 1px solid #DCDFE6;
  }
  .tb-content {
    flex: 1;
    overflow: scroll;
    overflow-x: hidden;
    padding: 20px;
  }
  .bottomtoolbar {
    overflow: hidden;
    padding: 20px;
  }
}
</style>
