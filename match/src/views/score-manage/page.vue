<template>
  <div id="score-manage">
    <!-- 顶部栏 -->
    <div class="toptoolbar">
      <lp-button :disabled="multipleSelection.length == 0" size="medium" icon="iconxiazai1" @click="batchDownload">批量下载</lp-button>
    </div>

    <div class="tb-content">
      <el-table style="height: 0px; border: 1px solid #fff !important" border></el-table>
      
      <el-table
        v-loading="scoreTableLoading"
        border
        ref="multipleTable"
        :data="scores"
        @selection-change="handleSelectionChange"
        style="width: 100%">
        <el-table-column
          align="center"
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          align="center"
          prop="enrollNum"
          label="报名编号"
          min-width="141">
        </el-table-column>
        <el-table-column
          align="center"
          prop="name"
          label="报名用户"
          min-width="155">
        </el-table-column>
        <el-table-column
          align="center"
          prop="score"
          label="最终成绩"
          min-width="155">
        </el-table-column>
        <el-table-column
          align="center"
          prop="describes"
          label="成绩描述"
          min-width="155">
        </el-table-column>

        <el-table-column
          align="center"
          label="操作"
          min-width="350">
          <template slot-scope="scope">
            <lp-button size="mini" icon="iconyulan1" @click="handleDetail(scope.$index, scope.row)">查看详情</lp-button>
            <lp-button size="mini" icon="iconchengjiguanli" @click="handlePublish(scope.row)">{{ scope.row.score === null ? '发布成绩' : '修改成绩' }}</lp-button>
            <lp-button size="mini" icon="iconzhengshu-copy">颁发电子证书</lp-button>
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

    <!-- 发布成绩弹框 -->
    <el-dialog
      class="issueDialogVisible"
      title="发布成绩"
      :visible.sync="issueDialogVisible"
      :close-on-click-modal="false"
      width="400px"
      @closed="closed"
    >
      <el-form ref="scoreFrom" :model="form" :rules="rules" label-width="80px" size="medium">
        <el-form-item label="最终成绩" prop="score">
          <el-input v-model="form.score" autofocus="true"></el-input>
        </el-form-item>
        <el-form-item label="成绩说明" prop="describes">
          <el-input type="textarea" v-model="form.describes"></el-input>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <lp-button size="medium" type="primary" @click="handleSave">保 存</lp-button>
        <lp-button size="medium" @click="issueDialogVisible = false">取 消</lp-button>
      </div>
    </el-dialog>

    <el-dialog
      class="enrollDialogVisible"
      title="成绩详情"
      :visible.sync="enrollDialogVisible"
      :close-on-click-modal="false"
      width="815px">
      <div class="signups">
        <div class="signup" v-for="(signup, index) in currentEnroll.list" :key="index">
          <div class="head">
            <div class="tag"></div>
            <span>{{ signup.enrollGroupName }}</span>
          </div>
          
          <el-table
            border
            :data="currentEnrollMessage[index]"
            style="width: 100%">
            <el-table-column
              v-for="(column, index) in signup.list[0].list"
              :key="index"
              align="center"
              :prop="index.toString()"
              :label="column.columnName">
            </el-table-column>

          </el-table>
        </div>
      </div>

      <span slot="footer" class="dialog-footer">
        <lp-button size="medium" type="primary" icon="iconchengjiguanli" @click="handlePublish(form)">{{ form.score === null ? '发布成绩' : '修改成绩' }}</lp-button>
        <lp-button size="medium" type="danger">颁发电子证书</lp-button>
        <lp-button size="medium" @click="enrollDialogVisible = false">取 消</lp-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { excelExportEnroll, queryEnrollForEnrollNum, updateAudit, queryEnrollData, queryPageEnroll } from '@/api/signupManage.js'
import { updateScore, issueScore, queryScore } from '@/api/scoreManage.js'
import qs from 'qs'
import util from '@/common/util.js'
export default {
  data() {
    // let validatorScore = (rule, value, cb) => {
    //   isNaN(value) ? cb(new Error('请填写合适的成绩')) : cb()
    // }
    return {
      rules: {
        score: [
          { required: true , message: '请填写最终成绩', trigger: 'blur' },
        ],
      },
      form: {
        id: '',
        score: '',
        describes: '',
        enrollNum: '',
      },
      scoreTableLoading: false,
      scores: [],
      currentEnroll: {},
      currentEnrollMessage: [], // 报名表信息
      enrollDialogVisible: false,
      issueDialogVisible: false,
      multipleSelection: [],
      total: 0, // 分页总数
      pageNum: 1, // 页码
      pageSize: 10, // 一页数量
    }
  },
  methods: {
    handleSave () {
      let data = {
        eventsId: this.$route.params.eventId,
        ...this.form,
      }
      this.$refs.scoreFrom.validate((valid) => {
        if (valid) {
          if (this.form.id) { // 修改
            updateScore(qs.stringify(data)).then(res => {
              this.issueDialogVisible = false
              this.enrollDialogVisible = false
              this.getScores()
            }).catch(err => {
              console.log(err)
            })
          } else {
            issueScore(qs.stringify(data)).then(res => {
              this.enrollDialogVisible = false
              this.issueDialogVisible = false
              this.getScores()
            }).catch(err => {
              console.log(err)
            })
          }
        }
      })
    },
    closed () {
      this.$refs.scoreFrom.resetFields()
      this.form = {
        id: '',
        score: '',
        describes: '',
        enrollNum: '',
      }
    },
    handleDetail (index, row) {
      queryEnrollForEnrollNum(qs.stringify({ enrollNum: row.enrollNum })).then(res => {
        this.currentEnroll = res.data[0]
        this.currentEnroll.enrollNum = row.enrollNum
        this.currentEnroll.id = row.id
        // 重置
        this.currentEnrollMessage = []

        for (let i = 0; i < res.data[0].list.length; i ++) {
          
          for (let j = 0; j < res.data[0].list[i].list.length; j ++) {
            let obj = {}
            for (let k = 0; k < res.data[0].list[i].list[j].list.length; k ++) {
              obj[k] = res.data[0].list[i].list[j].list[k].value
            }
            Array.isArray(this.currentEnrollMessage[i]) ? this.currentEnrollMessage[i].push(obj) : this.currentEnrollMessage[i] = [obj]
          }
        }

        this.form.score = row.score
        this.form.enrollNum = row.enrollNum
        this.form.describes = row.describes
        this.form.id = row.id
        this.enrollDialogVisible = true
      }).catch(err => {
        console.log(err)
      })
      
    },
    handlePublish (row) {
      this.form.score = row.score
      this.form.enrollNum = row.enrollNum
      this.form.describes = row.describes
      this.form.id = row.id
      this.issueDialogVisible = true
    },
    batchDownload () {
      window.location.href =  process.env.VUE_APP_API + '/event-api/enroll/excelExportEnroll?enrollNum=' + this.multipleSelection.map(item => item.enrollNum).join(',') + '&type=3'
      this.$refs.multipleTable.clearSelection()
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    // 分页组件两个事件
    handleCurrentChange (val) {
      this.pageNum = val
      this.getScores()
    },
    handleSizeChange (val) {
      this.pageSize = val
      this.getScores()
    },
    getScores () {
      let data = {
        pageNum: this.pageNum - 1, 
        pageSize: this.pageSize,
        eventsId: this.$route.params.eventId
      }
      this.scoreTableLoading = true
      queryScore(qs.stringify(data)).then(res => {
        this.scores = res.datas
        this.scoreTableLoading = false
        this.total = res.totalNum
      }).catch(err => {
        this.scoreTableLoading = false
        console.log(err)
      })
    },
  },
  created () {
    this.getScores()
  }
}
</script>

<style scoped lang="scss">
#score-manage {
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
  .signups {
    .signup {
      .head {
        height: 35px;
        line-height: 35px;
        margin: 10px 0;
        .tag {
          float: left;
          width: 8px;
          height: 35px;
          background-color: #f08728;
          margin-right: 10px;
        }
      }
    }
  }
}
.signup-detail {
  list-style: none;
  padding: 0;
  margin: 10px 0;
  li {
    border: 1px solid #dddddd;
    & + li {
      border-top: none;
    }
    p {
      float: left;
      margin: 0;
      width: 138px;
      height: 36px;
      text-align: center;
      line-height: 36px;
      background-color: #f5f5f5;
      border-right: 1px solid #dddddd;
    }
    div {
      padding-left: 11px;
      margin-left: 138px;
      height: 36px;
      line-height: 36px;
    }
  }
  
}
</style>
