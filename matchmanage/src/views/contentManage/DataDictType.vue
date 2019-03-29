<template>
  <section>
    <!-- 顶部工具栏 -->
    <el-col :span="24" class="toolbar toptoolbar" style="padding-bottom: 0px;">
      <el-form :inline="true" @submit.native.prevent>
        <div class="left">
          <Button v-has="[dataDictType.addDataDictType]" style="marginRight: 15px" url="./static/images/add.png" @click.native="handleAdd">添加数据字典类型</Button>
          <Button
            v-has="[dataDictType.deleteDataDictType]" 
            url="./static/images/remove.png"
            @click.native="batchRemove"
            type="danger"
            :disabled="this.selects.length===0"
          >批量删除</Button>
        </div>

        <div class="right" v-has="[dataDictType.getDataDictTypes]" >
          <el-input class="top" @keyup.enter.native="handleSearch" style="width: 200px;marginRight: 17px;" v-model="typeName" placeholder="请输入数据字典类型名"></el-input>
          <Button
            url="./static/images/search.png"
            @click.native="handleSearch"
          >查询</Button>
        </div>
        
      </el-form>
    </el-col>

    <!-- 列表-->
    <el-table
      :data="dataDictTypes"
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
      <el-table-column prop="typeName" label="名称" align="center"></el-table-column>
      <el-table-column prop="typeRemark" label="备注" align="center"></el-table-column>

      <el-table-column label="操作" align="center" width="150">
        <template scope="scope">
          <Handle
            v-has="[dataDictType.updateDataDictType]" 
            url="./static/images/edit.png"
            @click.native="handleEdit(scope.$index, scope.row)"
          >编辑</Handle>
          <Handle
            v-has="[dataDictType.deleteDataDictType]" 
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
      :title="Form.id?'编辑数据字典类型': '添加数据字典类型'"
      :visible.sync="FormVisible"
      :close-on-click-modal="false"
      @closed="dialogClosed"
    >
      <el-form class="dialogform" :model="Form" label-width="80px" :rules="FormRules" ref="Form">
        <el-form-item label="名称" prop="typeName">
          <el-input v-model="Form.typeName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="备注" prop="typeRemark">
          <el-input v-model="Form.typeRemark" auto-complete="off"></el-input>
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
import { dataDictType } from "../../api/api";
import Handle from "@/components/Handle";
import Button from "@/components/Button";
export default {
  components: {
    Handle,
    Button
  },
  data() {
    return {
      dataDictType,
      typeName: '', // 查询条件，数据字典类型名字
      emptyContent: "暂无数据",
      dataDictTypes: [], // 数据字典类型列表
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
        typeName: [
          { required: true, message: "请输入数据字典类型名", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    // 获取数据字典类型列表
    getDataDictTypes() {
      let param = {
        pageSize: this.pageSize,
        pageNum: this.pageNum,
        tenantCode: "1",
        typeName: this.typeName.replace(/\s+/g,"") 
      };
      this.listLoading = true;
      dataDictType
        .getDataDictTypes.r(param)
        .then(res => {
          let result = res.data.data;
          this.dataDictTypes = result.datas;
          this.total = result.totalNum;
          this.listLoading = false;
        })
        .catch(res => {
          this.listLoading = false;
          this.emptyContent = "刷新";
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
      })
        .then(
          () => {
            this.listLoading = true;
            let params = { id: row.id, tenantCode: "1", updId: 0 };
            dataDictType.deleteDataDictType.r(params).then(res => {
              this.listLoading = false;
              this.getDataDictTypes();
            });
          },
          () => {}
        )
        .catch(res => {
          this.listLoading = false;
        });
    },
    // 列表操作栏编辑事件
    handleEdit: function(index, row) {
      console.log(row);
      Object.assign(this.Form, row);
      this.FormVisible = true;
    },
    // 添加按钮事件
    handleAdd: function() {
      this.Form.id = "";
      this.Form.typeRemark = "";
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
                dataDictType
                  .updateDataDictType.r(this.Form)
                  .then(res => {
                    this.SubmitLoading = false;
                    this.FormVisible = false;
                    this.getDataDictTypes();
                  })
                  .catch(res => {
                  });
              } else {
                // 添加
                Object.assign(this.Form, { tenantCode: "1", creatorId: 0 });
                dataDictType
                  .addDataDictType.r(this.Form)
                  .then(res => {
                    this.SubmitLoading = false;
                    this.FormVisible = false;
                    this.getDataDictTypes();
                  })
                  .catch(res => {
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
          dataDictType.batchDelete.r(params).then(res => {
            this.listLoading = false;
            this.getDataDictTypes();
          });
        })
        .catch(() => {});
    },
    // 搜索
    handleSearch: function () {
      this.pageNum = 1;
      this.getDataDictTypes();
    },
    // 刷新
    renovate() {
      this.getDataDictTypes();
      console.log(111);
    }
  },

  created() {
    // 1、获取数据字典类型列表
    this.getDataDictTypes();
  }
};
</script>

<style lang="scss" scoped>
</style>