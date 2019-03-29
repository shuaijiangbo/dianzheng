<template>
  <div id="signup-manage">
    <!-- 顶部栏 -->
    <div class="toptoolbar">
      <lp-button :disabled="multipleSelection.length == 0" size="medium" icon="iconxiazai1" @click="batchDownload">批量下载</lp-button>
      <el-select placeholder="选择分组，默认全部" v-model="formSearch.eventGroupId" style="width: 300px">
        <el-option label="全部" :value="''"></el-option>
        <el-option :label="group.name" :value="group.id" v-for="group in messageGroup" :key="group.id"></el-option>
      </el-select>
    </div>
    <i class="iconfont icon-icongeren2"></i>
    <div class="pay-tb-content">
      <el-table
        v-loading="payTableLoading"
        border
        :data="pays"
        style="width: 100%">
        <el-table-column
          align="center"
          prop="payNum"
          label="未支付"
          min-width="141">
        </el-table-column>
        <el-table-column
          align="center"
          prop="auditNumOne"
          label="待审核"
          min-width="129">
        </el-table-column>
        <el-table-column
          align="center"
          prop="auditNumThree"
          label="已批准"
          min-width="155">
        </el-table-column>
        <el-table-column
          align="center"
          prop="auditNumTwo"
          label="已拒绝"
          min-width="155">
        </el-table-column>
        <el-table-column
          align="center"
          prop="moneyAll"
          label="总支付金额"
          min-width="115">
        </el-table-column>
      </el-table>
    </div>

    <div class="search">
      <el-form @submit.native.prevent :inline="true" :model="formSearch" class="demo-form-inline">        
        <el-form-item>
          <el-select v-model="formSearch.auditStatus" placeholder="状态" style="width: 96px">
            <el-option label="不限" :value="null"></el-option>
            <el-option label="已通过" value="2"></el-option>
            <el-option label="驳回" value="3"></el-option>
            <el-option label="待审核" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-input v-model="formSearch.enrollNum" placeholder="报名编号" style="width: 150px"></el-input>
        </el-form-item>
        <el-form-item label="报名时间" class="date">
          <el-date-picker
            v-model="formSearchTime"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始时间"
            end-placeholder="结束时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <lp-button style="width: 100px" size="medium" icon="iconsousuo5" @click="searchSubmit">搜索</lp-button>
        </el-form-item>
      </el-form>
    </div>

    <div class="tb-content">
      <el-table style="height: 0px; border: 1px solid #fff !important" border>

      </el-table>
      <el-table
        v-loading="signupTableLoading"
        border
        ref="multipleTable"
        :data="enrolls"
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
          prop="personName"
          label="用户实名"
          min-width="155">
        </el-table-column>
        <el-table-column
          align="center"
          prop="createTime"
          label="报名时间"
          min-width="150">
        </el-table-column>
        <el-table-column
          align="center"
          prop="auditStatus"
          label="状态"
          min-width="115">
          <template slot-scope="scope">
            <span :style="scope.row.auditStatus === '2' ? {color: 'green'} : scope.row.auditStatus === '3' ? {color: 'red'} : {}">{{ (scope.row.payStatus !== 'Y' && scope.row.payStatus !== 'U' && scope.row.payStatus !== 'F') ? '未支付' : scope.row.auditStatus === '1' ? '待审核' : scope.row.auditStatus === '2' ? '已批准' : '已拒绝' }}</span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="操作"
          min-width="350">
          <template slot-scope="scope">
            <lp-button size="mini" icon="iconyulan1" @click="handleDetail(scope.$index, scope.row)">查看详情</lp-button>
            <lp-button size="mini" icon="icontongguo" type="success" @click="handleAudit(scope.row.eventsId, '2', scope.row.enrollNum)" :disabled="!((scope.row.payStatus === 'Y' || scope.row.payStatus === 'F' || scope.row.payStatus === 'U') && scope.row.auditStatus === '1') ">审核通过</lp-button>
            <lp-button size="mini" icon="iconbutongguo" type="danger" @click="handleAudit(scope.row.eventsId, '3', scope.row.enrollNum)" :disabled="!((scope.row.payStatus === 'Y' || scope.row.payStatus === 'F' || scope.row.payStatus === 'U') && scope.row.auditStatus === '1') ">拒绝参赛</lp-button>
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
      class="enrollDialogVisible"
      title="报名详细"
      :visible.sync="enrollDialogVisible"
      :close-on-click-modal="false"
      width="815px">
      <ul class="signup-detail">
        <li>
          <p>赛区</p>
          <div>{{ currentEnroll.eventName }}</div>
        </li> 
        <li>
          <p>组别</p>
          <div>{{ currentEnroll.eventGroupName }}</div>
        </li>
      </ul>

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
        <lp-button size="medium" @click="handleAudit(currentEnroll.eventsId, '2', currentEnroll.enrollNum)" type="primary" :disabled="!((currentEnroll.payStatus === 'Y' || currentEnroll.payStatus === 'F' || currentEnroll.payStatus === 'U') && currentEnroll.auditStatus === '1') ">审核通过</lp-button>
        <lp-button size="medium" @click="handleAudit(currentEnroll.eventsId, '3', currentEnroll.enrollNum)" type="danger" :disabled="!((currentEnroll.payStatus === 'Y' || currentEnroll.payStatus === 'F' || currentEnroll.payStatus === 'U') && currentEnroll.auditStatus === '1') ">拒绝参赛</lp-button>
        <lp-button size="medium" @click="enrollDialogVisible = false">取 消</lp-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { excelExportEnroll, queryEnrollForEnrollNum, updateAudit, queryEnrollData, queryPageEnroll } from '@/api/signupManage.js'
import { getListEventGroup } from '@/api/matchManage.js'
import qs from 'qs'
import util from '@/common/util.js'
export default {
  data() {
    return {
      messageGroup: [],
      formSearch: {
        auditStatus: null,
        enrollNum: null,
        beginTime: undefined,
        endTime: undefined,
        eventGroupId: ''
      },
      payTableLoading: false,
      signupTableLoading: false,
      pays: [],
      enrolls: [],
      currentEnroll: {},
      currentEnrollMessage: [], // 报名表信息
      enrollDialogVisible: false,
      multipleSelection: [],
      total: 0, // 分页总数
      pageNum: 1, // 页码
      pageSize: 10, // 一页数量
    }
  },
  methods: {
    handleAudit (id, status, enrollNum) {
      let data = {
        eventsId: id,
        auditStatus: status,
        enrollNum
      }
      updateAudit(qs.stringify(data)).then(res => {
        this.getEnrolls()
        this.enrollDialogVisible = false
      }).catch(err => {
        console.log(err)
      })
    },
    handleDetail (index, row) {
      queryEnrollForEnrollNum(qs.stringify({ enrollNum: row.enrollNum })).then(res => {
        this.currentEnroll = res.data[0]
        this.currentEnroll.eventName = row.eventName
        this.currentEnroll.auditStatus = row.auditStatus
        this.currentEnroll.payStatus = row.payStatus
        this.currentEnroll.enrollNum = row.enrollNum
        this.currentEnroll.eventsId = row.eventsId
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
        
        this.enrollDialogVisible = true
      }).catch(err => {
        console.log(err)
      })
      
    },
    searchSubmit () {
      this.pageNum = 1
      this.getEnrolls()
    },
    batchDownload () {
      window.location.href =  process.env.VUE_APP_API + '/event-api/enroll/excelExportEnroll?enrollNum=' + this.multipleSelection.map(item => item.enrollNum).join(',') + '&type=1'
      this.$refs.multipleTable.clearSelection()
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    // 分页组件两个事件
    handleCurrentChange (val) {
      this.pageNum = val
      this.getEnrolls()
    },
    handleSizeChange (val) {
      this.pageSize = val
      this.getEnrolls()
    },
    getEnrolls () {
      let data = Object.assign(this.formSearch, { 
        pageNum: this.pageNum - 1, 
        pageSize: this.pageSize,
        eventsId: this.$route.params.eventId
      })
      this.signupTableLoading = true
      queryPageEnroll(qs.stringify(data)).then(res => {
        this.enrolls = res.datas
        this.signupTableLoading = false
        this.total = res.totalNum
      }).catch(err => {
        this.signupTableLoading = false
        console.log(err)
      })
    },
    queryEnrollData () {
      queryEnrollData(qs.stringify({
        eventsId: this.$route.params.eventId,
        eventGroupId: this.formSearch.eventGroupId 
      })).then(res => {
        this.pays = res.data
      }).catch(err => {
        console.log(err)
      })
    }
  },
  watch: {
    'formSearch.eventGroupId': function (value) {
      this.queryEnrollData()
    }
  },
  computed: {
    formSearchTime: {
      get: function () {
        return [this.formSearch.beginTime, this.formSearch.endTime]
      },
      set: function (newValue) {
        if (newValue === null) {
          this.formSearch.beginTime = this.formSearch.endTime = undefined
          return 
        }
        this.formSearch.beginTime = util.formatDateTime(newValue[0])
        this.formSearch.endTime = util.formatDateTime(newValue[1])
      }
    }
  },
  created () {
    getListEventGroup({ pageSize: 1000, pageNum: 0, eventId: this.$route.params.eventId }).then(res => {
      this.messageGroup = res.data.map(group => {
        return { id: group.id, name: group.groupName }
      })
    }).catch(err => {
      console.log(err)
    })
    this.queryEnrollData()
    this.getEnrolls()
  }
}
</script>

<style scoped lang="scss">
#signup-manage {
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
  .search {
    border-bottom: 1px solid #DCDFE6;
    padding-top: 20px;
    &after{
      content: '';
      display: table;
      clear: both;
    }
  }
  .pay-tb-content {
    padding-top: 15px;
    padding-right: 40px;
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
