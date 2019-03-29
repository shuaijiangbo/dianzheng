<template>
  <section>
    <!-- 顶部工具栏 -->
    <el-col :span="24" class="toolbar toptoolbar" style="padding-bottom: 0px;">
      <el-form :inline="true" @submit.native.prevent>
        <div class="left">
          <Button v-has="[attachmente.addDatum]" style="marginRight: 15px" url="./static/images/add.png" @click.native="handleAdd">添加附件</Button>
          <Button
            v-has="[attachmente.batchDelete]"
            url="./static/images/remove.png"
            @click.native="batchRemove"
            type="danger"
            :disabled="this.sels.length===0"
          >批量删除</Button>
        </div>

        <div class="right" v-has="[attachmente.getDatums]">
          <el-input class="top" @keyup.enter.native="handleSearch" style="width: 200px;marginRight: 17px;" v-model="attachName" placeholder="请输入附件名"></el-input>
          <Button
            url="./static/images/search.png"
            @click.native="handleSearch"
          >查询</Button>
        </div>
        
      </el-form>
    </el-col>

    <!-- 列表-->
    <el-table
      :data="attachments"
      highlight-current-row
      v-loading="listLoading"
      @selection-change="selsChange"
      border
      style="width: 100%;"
    >
      <template slot="empty">
        <span class="renovate" @click="renovate">
          {{emptyContent}}
          <i class="el-icon-refresh" style="fontSize: 15px;marginLeft: 3px"></i>
        </span>
      </template>
      <el-table-column type="selection" width="55" align="center"></el-table-column>
      <el-table-column prop="datumName" label="附件名" align="center"></el-table-column>
      <el-table-column prop="datumType" label="类型" align="center" :formatter="formatType"></el-table-column>
      <el-table-column prop="datumUrl" label="下载地址" align="center"></el-table-column>
      <el-table-column prop="state" label="状态" align="center" :formatter="formatState"></el-table-column>

      <el-table-column label="操作" width="250" align="right">
        <template scope="scope">
          <Handle
            v-has="[attachmente.submitDatum]"
            url="./static/images/submit.png"
            v-if="scope.row.state == 0 || scope.row.state == 1"
            @click.native="handleSubmit(scope.$index, scope.row)"
          >提交</Handle>
          <Handle
            v-has="[attachmente.auditDatum]"
            url="./static/images/shenhe.png"
            v-else-if="scope.row.state == 2"
            @click.native="handleAudit(scope.$index, scope.row)"
          >审核</Handle>
          <Handle
            v-has="[attachmente.auditDatum]"
            url="./static/images/plush.png"
            v-else-if="scope.row.state == 3"
            @click.native="handlePublish(scope.$index, scope.row)"
          >发布</Handle>
          <Handle
            v-has="[attachmente.auditDatum]"
            url="./static/images/cancle.png"
            v-else-if="scope.row.state == 4"
            type="danger"
            @click.native="handleCancel(scope.$index, scope.row)"
          >撤销发布</Handle>
          <Handle
            v-has="[attachmente.updateDatum]"
            url="./static/images/edit.png"
            @click.native="handleEdit(scope.$index, scope.row)"
          >编辑</Handle>
          <Handle
            v-has="[attachmente.deleteDatum]"
            url="./static/images/delete.png"
            type="danger"
            @click.native="handleDel(scope.$index, scope.row)"
          >删除</Handle>
        </template>
      </el-table-column>
    </el-table>

    <!-- 底部工具栏 -->
    <el-col :span="24" class="toolbar">
      <el-pagination
        layout="total, sizes, prev, pager, next, jumper"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        background
        :page-sizes="[10,20,30,40]"
        :page-size="pageSize"
        :total="total"
        style="float:right;"
      ></el-pagination>
    </el-col>

    <!-- 添加and编辑界面-->
    <el-dialog
      :title="Form.id?'编辑附件':'添加附件'"
      :visible.sync="FormVisible"
      :close-on-click-modal="false"
      @closed="$refs.Form.clearValidate()"
    >
      <el-form class="dialogform" :model="Form" label-width="80px" :rules="FormRules" ref="Form">
        <el-form-item label="名字" prop="datumName">
          <el-input v-model="Form.datumName" auto-complete="off"></el-input>
        </el-form-item>

        <el-form-item label="类型" prop="datumType">
          <el-select v-model="Form.datumType" placeholder="请选择附件类型">
            <el-option
              v-for="(dataDict, index) in dataDicts"
              :label="dataDict.dataValue"
              :value="dataDict.id"
              :key="index"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="附件" v-if="!Form.id" prop="fileList" class="file-item">
          <!-- <el-upload
            class="upload-demo"
            action="https://jsonplaceholder.typicode.com/posts/"
            :on-change="handleChange"
            :before-upload="beforeUpload"
            :on-remove="handleRemove"
            :file-list="fileList"
          >
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">上传文件，且不超过500kb</div>
          </el-upload> -->
          <input style="width:100%" type="file" ref="file" @change="changpic()" >

        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="FormVisible = false">取消</el-button>
        <el-button type="primary" @click.native="Submit" :loading="addLoading">提交</el-button>
      </div>
    </el-dialog>

    <el-dialog title="附件" :visible.sync="dialogVisible" width="30%">
      <div slot="footer" class="dialog-footer">
        <el-button type="danger" @click.native="rebut">驳 回</el-button>
        <el-button type="primary" @click.native="permit">审核通过</el-button>
      </div>
    </el-dialog>
  </section>
</template>

<script>
import util from "../../common/util";
import { attachmente, dataDict } from "../../api/api";
import Handle from "@/components/Handle";
import Button from "@/components/Button";
export default {
  components: {
    Handle,
    Button
  },
  data() {
    return {
      attachmente,
      attachName: '', // 查询条件，附件名
      dataDicts: [],
      dataDictsObject: {}, // 数据字典对象
      emptyContent: "暂无数据",
      attachments: [], // 附件列表
      total: 0,
      pageNum: 1,
      pageSize: 10,
      listLoading: false,
      fileList: [],
      fileFlag: 0,
      sels: [], //列表选中列
      formData: new FormData(),
      FormRules: {
        datumName: [
          { required: true, message: "请输入附件名", trigger: "blur" }
        ],
        datumType: [
          { required: true, message: "请选择附件类型", trigger: "blur" }
        ],
        fileList: [{ required: true, message: "请上传附件", trigger: "blur" }]
      },
      //编辑界面数据
      Form: {},
      FormVisible: false, //添加and编辑// 界面是否显示
      dialogVisible: false,
      addLoading: false
    };
  },
  methods: {
    // 获取附件列表
    getDatums() {
      let param = {
        pageSize: this.pageSize,
        pageNum: this.pageNum,
        tenantCode: "1",
        datumName: this.attachName.replace(/\s+/g,"")
      };
      this.listLoading = true;
      attachmente
        .getDatums.r(param)
        .then(res => {
          let result = res.data.data;
          this.attachments = result.datas;
          this.total = result.totalNum;
          this.listLoading = false;
        })
        .catch(res => {
          this.listLoading = false;
          this.emptyContent = "刷新";
        });
    },
    // 获取数据字典列表
    getDataDictList() {
      let params = { tenantCode: "1", pageNum: 1, pageSize: 1000, typeId: 3 };
      this.listLoading = true;
      dataDict
        .getDataDictList.r(params)
        .then(res => {
          this.dataDicts = res.data.data.datas;
          for (let dataDict of this.dataDicts) {
            this.dataDictsObject[dataDict.id] = dataDict.dataValue;
          }
          // 获取附件列表
          this.getDatums();
        })
        .catch(res => {
          this.listLoading = false;
          this.emptyContent = "刷新";
        });
    },

    onEditorBlur() {
      //失去焦点事件
    },
    onEditorFocus() {
      //获得焦点事件
    },
    onEditorChange() {
      //内容改变事件
    },

    handleCurrentChange(val) {
      this.pageNum = val;
      this.getDatums();
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.getDatums();
    },

    // 删除
    handleDel: function(index, row) {
      this.$confirm("确认删除该记录吗?", "提示", {
        type: "warning"
      })
        .then(() => {
          this.listLoading = true;
          let params = { id: row.id, updId: 1 };
          attachmente
            .deleteDatum.r(params)
            .then(res => {
              this.listLoading = false;
              this.getDatums();
            })
            .catch(res => {
              this.listLoading = false;
            });
        })
        .catch(() => {});
    },
    // 显示编辑界面
    handleEdit: function(index, row) {
      console.log(row);
      this.Form = Object.assign({}, row);
      //this.fileList = [`http://192.168.3.240${this.Form.datumUrl}`]
      this.FormVisible = true;
    },
    // 显示添加and编辑界面
    handleAdd: function() {
      this.Form = {
        id: "",
        datumName: "",
      };
      this.FormVisible = true;
    },

    // 添加and编辑
    Submit: function() {
      this.$refs.Form.validate(valid => {
        if (valid) {
          this.$confirm("确认提交吗？", "提示", {})
            .then(() => {
              this.addLoading = true;

              this.formData.append("creatorId", 1);
              this.formData.append("tenantCode", "1");
              this.formData.append("id", this.Form.id);
              this.formData.append("datumName", this.Form.datumName);
              this.formData.append("datumType", this.Form.datumType);

              let headers = { "Content-Type": "multipart/form-data" };
              if (!this.Form.id) {
                attachmente
                  .addDatum.r(this.formData, headers)
                  .then(res => {
                    this.addLoading = false;
                    // 重置
                    this.Form = {};
                    this.formData = new FormData();
                    this.FormVisible = false;
                    this.fileList = [];
                    this.getDatums();
                  })
                  .catch(res => {
                    this.addLoading = false;
                    this.formData.delete("creatorId");
                    this.formData.delete("tenantCode");
                    this.formData.delete("id");
                    this.formData.delete("datumName");
                  });
              } else {
                // 编辑
                attachmente
                  .updateDatum.r(this.formData, headers)
                  .then(res => {
                    this.addLoading = false;
                    // 重置
                    this.Form = {};
                    this.formData = new FormData();
                    this.fileList = [];
                    this.FormVisible = false;
                    this.getDatums();
                  })
                  .catch(res => {
                    this.addLoading = false;
                    this.formData.delete("creatorId");
                    this.formData.delete("tenantCode");
                    this.formData.delete("id");
                    this.formData.delete("datumName");
                  });
              }
            })
            .catch(() => {});
        }
      });
    },
    selsChange: function(sels) {
      this.sels = sels;
    },
    // 批量删除
    batchRemove: function() {
      if (!this.sels.length) {
        return;
      }
      var ids = this.sels.map(item => item.id);
      this.$confirm("确认删除选中记录吗？", "提示", {
        type: "warning"
      })
        .then(() => {
          this.listLoading = true;
          let params = { ids, tenantCode: 1, updId: 1 };
          // 调用批量删除接口
          attachmente
            .batchDelete.r(params)
            .then(res => {
              this.listLoading = false;
              this.getDatums();
            })
            .catch(res => {
              this.listLoading = false;
            });
        })
        .catch(() => {});
    },
    // 搜索
    handleSearch: function () {
      this.pageNum = 1;
      this.getDatums();
    },

    // 附件提交状态
    handleSubmit: function(index, row) {
      this.$confirm("确认提交吗？", "提示", {})
        .then(() => {
          let params = {
            id: row.id,
            tenantCode: "1",
            updId: 1
          };
          attachmente
            .submitDatum.r(params)
            .then(res => {
              this.getDatums();
            })
            .catch(res => {
            });
        })
        .catch(() => {});
    },
    // 打开审核框
    handleAudit: function(index, row) {
      console.log(row);
      this.Form = Object.assign({}, row);
      this.dialogVisible = true;
    },
    // 驳回
    rebut() {
      this.$prompt("请输入驳回理由", "驳回理由", {
        confirmButtonText: "提交",
        cancelButtonText: "取消"
      })
        .then(({ value }) => {
          let params = {
            auditMsg: value,
            id: this.Form.id,
            resourceId: this.Form.id,
            tenantCode: "1",
            auditor: 1,
            state: 2
          };
          attachmente
            .auditDatum.r(params)
            .then(res => {
              this.dialogVisible = false;
              this.Form = {};
              this.getDatums();
            })
            .catch(res => {
            });
        })
        .catch(() => {});
    },
    // 审核通过
    permit() {
      let params = {
        auditMsg: "",
        id: this.Form.id,
        resourceId: this.Form.id,
        tenantCode: "1",
        auditor: 1,
        state: 3
      };

      attachmente
        .auditDatum.r(params)
        .then(res => {
          this.dialogVisible = false;
          this.Form = {};
          this.getDatums();
        })
        .catch(res => {
        });
    },
    // 文章发布
    handlePublish: function(index, row) {
      this.$confirm("确认提交吗？", "提示", {})
        .then(() => {
          let params = {
            auditMsg: "",
            id: row.id,
            resourceId: row.id,
            tenantCode: "1",
            auditor: 1,
            state: 4
          };

          attachmente
            .auditDatum.r(params)
            .then(res => {
              this.getDatums();
            })
            .catch(res => {
            });
        })
        .catch(() => {});
    },
    // 撤销发布
    handleCancel: function(index, row) {
      this.$confirm("确认提交吗？", "提示", {})
        .then(() => {
          let params = {
            auditMsg: "",
            id: row.id,
            resourceId: row.id,
            tenantCode: "1",
            auditor: 1,
            state: 3
          };
          attachmente
            .auditDatum.r(params)
            .then(res => {
              this.Form = {};
              this.getDatums();
            })
            .catch(res => {
            });
        })
        .catch(() => {});
    },

    // 上传表单change事件
    changpic() {
      this.fileList = this.$refs.file.files;
      let file = this.$refs.file.files[0];
      this.formData.append("cover", file);  
    },

    // 文件上传
    handleChange(file, fileList) {
      this.fileList = [fileList[fileList.length - 1]]; // 这句不能少,用于显示上传的文件名
      this.fileFlag++;
    },
    beforeUpload(file) {
      var windowURL = window.URL || window.webkitURL;
      this.formData.append("cover", file);
      return false;
    },
    handleRemove(file, fileList) {
      this.fileFlag++;
      if (this.fileFlag % 2 != 0) {
        this.formData = new FormData();
        this.fileFlag = 0;
        console.log("删除");
      }
    },
    formatState(row, column, cellValue, index) {
      switch (cellValue) {
        case 0:
          return "草稿";
          break;
        case 1:
          return "驳回";
          break;
        case 2:
          return "待审核";
          break;
        case 3:
          return "审核通过";
          break;
        case 4:
          return "已发布";
          break;
      }
    },
    formatType(row, column, cellValue, index) {
      return this.dataDictsObject[cellValue];
    },
    // 刷新
    renovate() {
      this.getDatums();
    }
  },
  watch: {
    fileList(newValue, oldValue) {
      this.$set(this.Form, "fileList", newValue);
    }
  },
  created() {
    // 1、获取附件列表
    this.getDataDictList();
  }
};
</script>

<style lang="scss" scoped>
</style>