<template>
  <section>
    <!-- 顶部工具栏 -->
    <el-col :span="24" class="toolbar toptoolbar" style="padding-bottom: 0px;">
      <el-form :inline="true" @submit.native.prevent>
        <div class="left">
          <Button v-has="[dataDict.addDataDict]" style="marginRight: 15px" url="./static/images/add.png" @click.native="handleAdd">添加数据字典</Button>
          <Button
            v-has="[dataDict.batchDelete]"
            url="./static/images/remove.png"
            @click.native="batchRemove"
            type="danger"
            :disabled="this.selects.length===0"
          >批量删除</Button>
        </div>

        <div class="right" v-has="[dataDict.getDataDictList]">
          <span class="label">数据字典类型</span>
          <el-select v-model="dataDictTypeId" placeholder="请选择数据字典类型">
            <el-option label="不限" :value="0"></el-option>
            <el-option
              v-for="(value, key) in dataDictTypes"
              :key="key"
              :label="value"
              :value="key">
            </el-option>
          </el-select>
          <el-input class="top" @keyup.enter.native="handleSearch" style="width: 200px;marginRight: 17px;" v-model="dataDictName" placeholder="请输入数据字典名"></el-input>
          <Button
            url="./static/images/search.png"
            @click.native="handleSearch"
          >查询</Button>
        </div>
        
      </el-form>
    </el-col>

    <!-- 列表-->
    <el-table
      :data="dataDictes"
      highlight-current-row
      v-loading="listLoading"
      @selection-change="selectsChange"
      border
      style="width: 100%;"
    >
      <template slot="empty">
        <span class="renovate" @click="renovate">
          {{emptyContent}}
          <i class="el-icon-refresh" style="fontSize: 15px;marginLeft: 3px"></i>
        </span>
      </template>
      <el-table-column type="selection" align="center" width="55"></el-table-column>
      <el-table-column prop="dataValue" label="数据字典" align="center"></el-table-column>
      <el-table-column prop="typeId" label="类型" align="center" :formatter="formatType"></el-table-column>
      <el-table-column prop="dataRemark" label="备注" align="center"></el-table-column>

      <el-table-column label="操作" align="center" width="150">
        <template scope="scope">
          <Handle
            v-has="[dataDict.updateDataDict]"
            url="./static/images/edit.png"
            @click.native="handleEdit(scope.$index, scope.row)"
          >编辑</Handle>
          <Handle
            v-has="[dataDict.deleteDataDictById]"  
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

    <!-- 编辑界面-->
    <el-dialog
      :title="Form.id?'编辑数据字典': '添加数据字典'"
      :visible.sync="FormVisible"
      :close-on-click-modal="false"
      @closed="dialogClosed"
    >
      <el-form class="dialogform" :model="Form" label-width="80px" :rules="FormRules" ref="Form">
        <el-form-item label="名称" prop="dataValue">
          <el-input v-model="Form.dataValue" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="类型" prop="typeId">
          <el-select v-model="Form.typeId" placeholder="请选择数据字典类型">
            <el-option
              v-for="(value, key) in dataDictTypes"
              :label="value"
              :value="parseInt(key)"
              :key="key"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="描述" prop="dataRemark">
          <el-input v-model="Form.dataRemark" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="FormVisible = false">取消</el-button>
        <el-button type="primary" @click.native="editSubmit" :loading="SubmitLoading">提交</el-button>
      </div>
    </el-dialog>
  </section>
</template>

<script>
import { dataDict, dataDictType } from "../../api/api";
import Button from "../../components/Button";
import Handle from "../../components/Handle";
export default {
  components: {
    Button,
    Handle
  },
  data() {
    return {
      dataDict,
      dataDictTypeId: '', // 查询条件，数据字典类型ID
      dataDictName: '', // 查询条件，数据字典名
      emptyContent: "暂无数据",
      dataDictes: [], // 数据字典列表
      dataDictTypes: {},
      total: 0, // 分页总数
      pageNum: 1, // 页码
      pageSize: 10, // 一页数量

      selects: [], // 列表选中列
      // 编辑界面是否显示
      FormVisible: false,
      // 模态框界面数据
      Form: {},
      SubmitLoading: false,
      listLoading: false, // 列表加载标记
      FormRules: {
        dataValue: [
          { required: true, message: "请输入数据字典名", trigger: "blur" }
        ],
        typeId: [
          { required: true, message: "请选择数据字典类型", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    // 获取数据字典列表
    getDataDictes() {
      let param = {
        pageSize: this.pageSize,
        pageNum: this.pageNum,
        tenantCode: "1",
        dataValue: this.dataDictName.replace(/\s+/g,""),
        typeId: this.dataDictTypeId ? this.dataDictTypeId : ''
      };
      this.listLoading = true;
      dataDict
        .getDataDictList.r(param)
        .then(res => {
          let result = res.data.data;
          this.dataDictes = result.datas;
          this.total = result.totalNum;
          this.listLoading = false;
        })
        .catch(res => {
          this.listLoading = false;
          this.emptyContent = "获取数据失败啦";
        });
    },
    // 获取数据字典类型列表
    getDataDictTypes() {
      let param = {
        pageSize: 1000,
        pageNum: 0,
        tenantCode: "1"
      };
      this.listLoading = true;
      dataDictType
        .getDataDictTypes.r(param)
        .then(res => {
          let result = res.data.data;
          let arr = result.datas;
          for (let dataDictType of arr) {
            this.dataDictTypes[dataDictType.id] = dataDictType.typeName;
          }
          // 获取数据字典列表
          this.getDataDictes();
        })
        .catch(res => {
          this.emptyContent = "刷新";
          this.listLoading = false;
        });
    },

    // 分页组件两个事件
    handleCurrentChange(val) {
      this.pageNum = val;
      this.getDataDictTypes();
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.getDataDictTypes();
    },

    onEditorBlur() {
      // 失去焦点事件
    },
    onEditorFocus() {
      // 获得焦点事件
    },
    onEditorChange() {
      // 内容改变事件
    },
    // 列表操作栏删除事件
    handleDel: function(index, row) {
      this.$confirm("确认删除该记录吗?", "提示", {
        type: "warning"
      }).then(
        () => {
          this.listLoading = true;
          let params = { id: row.id, tenantCode: "1", updId: 0 };
          dataDict
            .deleteDataDictById.r(params)
            .then(res => {
              this.listLoading = false;
              this.getDataDictes();
            })
            .catch(res => {
              this.listLoading = false;
            });
        },
        () => {}
      );
    },
    // 列表操作栏编辑事件
    handleEdit: function(index, row) {
      console.log(row);
      this.Form = Object.assign({}, row);
      this.FormVisible = true;
    },
    // 添加按钮事件
    handleAdd: function() {
      this.Form.id = "";
      this.Form.dataRemark = "";
      this.FormVisible = true;
    },

    // 模态框中 提交事件
    editSubmit: function() {
      this.$refs.Form.validate(valid => {
        if (valid) {
          this.$confirm("确认提交吗？", "提示", {}).then(
            () => {
              this.SubmitLoading = true;
              if (this.Form.id) {
                // 更新

                Object.assign(this.Form, { tenantCode: "1", updId: 0 });
                dataDict
                  .updateDataDict.r(this.Form)
                  .then(res => {
                    this.SubmitLoading = false;
                    this.FormVisible = false;
                    this.getDataDictes();
                  })
                  .catch(res => {
                    this.SubmitLoading = false;
                  });
              } else {
                // 添加
                Object.assign(this.Form, { tenantCode: "1", creatorId: 0 });
                dataDict
                  .addDataDict.r(this.Form)
                  .then(res => {
                    this.SubmitLoading = false;
                    this.FormVisible = false;
                    this.getDataDictes();
                  })
                  .catch(res => {
                    this.SubmitLoading = false;
                  });
              }
            },
            () => {}
          );
        }
      });
    },
    // 模态框关闭动画后的回调
    dialogClosed: function() {
      this.Form = {};
      this.$refs.Form.clearValidate();
    },

    // 列表项选中事件
    selectsChange: function(selects) {
      this.selects = selects;
    },

    // 批量删除事件
    batchRemove: function() {
      if (!this.selects.length) {
        return;
      }
      var ids = this.selects.map(item => item.id);
      this.$confirm("确认删除选中记录吗？", "提示", {
        type: "warning"
      })
        .then(() => {
          this.listLoading = true;
          let params = { ids, tenantCode: 1, updId: 1 };
          // 调用批量删除接口
          dataDict
            .batchDelete.r(params)
            .then(res => {
              this.listLoading = false;
              this.getDataDictes();
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
      this.getDataDictes();
    },
    formatType: function(row, column, cellValue, index) {
      return this.dataDictTypes[cellValue];
    },
    // 刷新
    renovate() {
      this.getDataDictTypes();
    }
  },

  created() {
    // 1. 获取所有数据字典类型
    this.getDataDictTypes();
    // 2、获取数据字典列表
  }
};
</script>

<style lang="scss" scoped>
</style>