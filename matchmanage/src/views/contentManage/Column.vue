<template>
  <section>
    <!-- 顶部工具栏 -->
    <el-col :span="24" class="toolbar toptoolbar" style="padding-bottom: 0px;">
      <el-form :inline="true" @submit.native.prevent>
        <div class="left">
          <Button v-has="[column.addColumn]" style="marginRight: 15px" url="./static/images/add.png" @click.native="handleAdd">添加栏目</Button>
          <Button
            v-has="[column.batchDelete]"
            url="./static/images/remove.png"
            @click.native="batchRemove"
            type="danger"
            :disabled="this.selects.length===0"
          >批量删除</Button>
        </div>

        <div class="right" v-has="[column.getColumns]">
          <el-input class="top" @keyup.enter.native="handleSearch" style="width: 200px;marginRight: 17px;" v-model="columnName" placeholder="请输入栏目名"></el-input>
          <Button
            url="./static/images/search.png"
            @click.native="handleSearch"
          >查询</Button>
        </div>
        
      </el-form>
    </el-col>

    <!-- 列表-->
    <el-table
      :data="columns"
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
      <el-table-column prop="name" label="栏目名" align="center"></el-table-column>
      <el-table-column prop="parentColumnName" label="父级栏目" align="center" sortable></el-table-column>
      <el-table-column prop="sortOrder" label="排序" align="center"></el-table-column>
      <el-table-column prop="path" label="绝对路径" align="center"></el-table-column>
      <el-table-column prop="status" label="状态" align="center">
        <template slot-scope="scope">
          <el-tag
            :type="scope.row.status === '1' ? 'success' : 'danger'"
            disable-transitions>
            {{scope.row.status === '1' ? '上线' : '下线'}}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="200">
        <template scope="scope">
          <Handle
            v-has="[column.offline, column.online]"
            url="./static/images/edit.png"
            @click.native="handleStatus(scope.$index, scope.row)"
            :type="scope.row.status == '1' ? 'danger' : ''"
          >{{scope.row.status == '1' ? '下线' : '上线'}}</Handle>
          <Handle
            v-has="[column.updateColumn]"
            url="./static/images/edit.png"
            @click.native="handleEdit(scope.$index, scope.row)"
          >编辑</Handle>
          <Handle
            v-has="[column.deleteColumn]"
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
      :title="Form.id?'编辑栏目': '添加栏目'"
      :visible.sync="FormVisible"
      :close-on-click-modal="false"
      @closed="dialogClosed"
    >
      <el-form class="dialogform" :model="Form" label-width="80px" :rules="FormRules" ref="Form">
        <el-form-item label="栏目名:" prop="name">
          <el-input v-model="Form.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="绝对路径:" prop="path">
          <el-input v-model="Form.path" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="父级栏目:">
          <el-cascader :options="options" v-model="cascaderValue" change-on-select></el-cascader>
        </el-form-item>
        <el-form-item label="排序:" prop="sortOrder">
          <el-input v-model.number="Form.sortOrder" auto-complete="off"></el-input>
        </el-form-item>

        <el-form-item label="栏目图标:" prop="icon" class="file-item">
          <!-- <el-upload
            class="avatar-uploader"
            action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false"
            :before-upload="beforeuploadForm"
          >
            <img v-if="ImageUrl" :src="ImageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload> -->
          
          <input style="width:100%" type="file" ref="file" @change="changpic()" accept="image/png, image/jpeg, image/gif, image/jpg">
         
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
import util from "../../common/util";
import { mapActions, mapGetters } from "vuex";
import Handle from "@/components/Handle";
import Button from "@/components/Button";

import { column } from "../../api/api";
export default {
  components: {
    Handle,
    Button
  },
  data() {
    return {
      column, // 栏目api对象
      columnName: '', // 查询的栏目名
      emptyContent: "暂无数据",
      columns: [], // 栏目列表
      //options: [], // 栏目级联数据
      total: 0, // 分页总数
      pageNum: 1, // 页码
      pageSize: 10, // 一页数量
      listLoading: false, // 列表加载标记
      cascaderValue: [""], // 级联的默认值

      ImageUrl: "",

      selects: [], // 列表选中列
      formData: new FormData(), // 提交参数的载体
      // 编辑界面是否显示
      FormVisible: false,
      SubmitLoading: false,
      // 模态框界面数据
      Form: {},
      // 模态框是否显示
      FormVisible: false,
      // 模态框提交按钮加载事件
      addLoading: false,
      // 模态框 表单检验规则
      FormRules: {
        name: [{ required: true, message: "请输入栏目名", trigger: "blur" }],
        path: [{ required: true, message: "请输入路径", trigger: "blur" }],
        sortOrder: [
          { required: true, message: "请输入排序", trigger: "blur" },
          { type: "number", message: "排序必须为数字值" }
        ],
        icon: [{ required: true, message: "请上传栏目图标", trigger: "blur" }]
      }
    };
  },
  computed: {
    ...mapGetters({ options: "cascaderColumns" }),
    ...mapGetters(["keyValueColumns"])
  },
  methods: {
    ...mapActions(["getAllColumns"]),
    // 获取栏目列表
    getColumns() {
      let param = {
        pageSize: this.pageSize,
        pageNum: this.pageNum,
        tenantCode: "1",
        name: this.columnName.replace(/\s+/g,"")
      };
      this.listLoading = true;
      column
        .getColumns.r(param)
        .then(res => {
          let result = res.data.data;
          this.columns = result.datas;
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
      this.getColumns();
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.getColumns();
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
            let params = { id: row.id, tenantCode: "string", updId: 0 };
            column.deleteColumn.r(params).then(res => {
              this.listLoading = false;

              this.getColumns();
              this.getAllColumns().catch(res => {
              });
            });
          },
          () => {}
        )
        .catch(res => {
        });
    },
    // 列表操作栏编辑事件
    handleEdit: function(index, row) {
      console.log(row);
      // 该方法参数为栏目id，返回值为父辈级和当前栏目的数组
      column.getParents.r({ id: row.id, tenantCode: 1, updId: 1 }).then(res => {
        let result = res.data.data; // result 是一个包含父辈级和当前栏目的数组。
        if (result.length == 1) {
          // 没有父级栏目，返回的只有当前栏目，此时设置为空
          this.cascaderValue = [""];
        } else {
          this.cascaderValue = [];
          for (let item of result) {
            this.cascaderValue.push(item.id);
          }
          this.cascaderValue.pop(); // 剔除最后一个也就是当前栏目，只显示父级栏目
        }
        this.Form = Object.assign({}, row);
        this.ImageUrl = `${util.baseUrl}${this.Form.iconPath}`;
        
        this.FormVisible = true;
      }).catch(res => {});
    },
    handleStatus: function(index, row) {
      this.$confirm("确认提交吗？", "提示", {})
        .then(() => {
          if (row.status == '1') {
            let params = { id: row.id, updId: 0, tenantCode: "1" };
            column
              .offline.r(params)
              .then(res => {
                this.getColumns();
              })
              .catch(res => {
              });
          } else {
            let params = { id: row.id, updId: 0, tenantCode: "1" };
            column
              .online.r(params)
              .then(res => {
                this.getColumns();
              })
              .catch(res => {
              });
          }
        })
        .catch(() => {});
    },
    // 添加按钮事件
    handleAdd: function() {
      this.Form.id = "";
      this.FormVisible = true;
    },

    // 模态框中 提交事件
    editSubmit: function() {
      this.$refs.Form.validate(valid => {
        if (valid) {
          this.$confirm("确认提交吗？", "提示", {}).then(
            () => {
              this.SubmitLoading = true;

              this.formData.append("creatorId", 1);
              this.formData.append("tenantCode", "1");
              this.formData.append("id", this.Form.id);
              this.formData.append("name", this.Form.name);
              this.formData.append(
                "parentId",
                this.cascaderValue[this.cascaderValue.length - 1]
              );
              this.formData.append("path", this.Form.path);
              this.formData.append("sortOrder", this.Form.sortOrder);

              let headers = { "Content-Type": "multipart/form-data" };
              if (this.Form.id) {
                // 更新
                column
                  .updateColumn.r(this.formData, headers)
                  .then(res => {
                    this.SubmitLoading = false;
                    this.reset();
                    this.getColumns();
                    this.getAllColumns().catch(res => {
                    });
                  })
                  .catch(res => {
                    this.SubmitLoading = false;
                    this.formData.delete("creatorId");
                    this.formData.delete("tenantCode");
                    this.formData.delete("id");
                    this.formData.delete("name");
                    this.formData.delete("parentId");
                    this.formData.delete("path");
                    this.formData.delete("sortOrder");
                  });
              } else {
                // 添加
                column
                  .addColumn.r(this.formData, headers)
                  .then(res => {
                    this.SubmitLoading = false;
                    this.reset();
                    this.getColumns();
                    this.getAllColumns().catch(res => {
                    });
                  })
                  .catch(res => {
                    this.SubmitLoading = false;
                    this.formData.delete("creatorId");
                    this.formData.delete("tenantCode");
                    this.formData.delete("id");
                    this.formData.delete("name");
                    this.formData.delete("parentId");
                    this.formData.delete("path");
                    this.formData.delete("sortOrder");
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
      this.reset();
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
          column
            .batchDelete.r(params)
            .then(res => {
              this.listLoading = false;
              this.getColumns();
              this.getAllColumns().catch(res => {
              });
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
      this.getColumns();
    },

    // 上传
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },

    // 上传表单change事件
    changpic() {
      let file = this.$refs.file.files[0];
      this.ImageUrl = window[window.URL ? 'URL' : 'webkitURL']['createObjectURL'](file);
      this.formData = new FormData(); // 这句话适用在提交失败，再次提交，更新icon
      this.formData.append("icon", file);  
    },

    beforeuploadForm(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
        return false;
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
        return false;
      }

      //创建临时的路径来展示图片
      var windowURL = window.URL || window.webkitURL;
      this.ImageUrl = windowURL.createObjectURL(file);
      this.formData = new FormData(); // 这句话适用在提交失败，再次提交，更新icon
      this.formData.append("icon", file);
      return false;
    },
    // 重置数据，关闭模态框, 获取栏目列表
    reset() {
      this.FormVisible = false;
      this.Form = {};
      this.formData = new FormData();
      this.ImageUrl = "";
      this.cascaderValue = [""];
      this.$refs.Form.clearValidate();
      this.$refs.file.value = '';
    },
    // 刷新
    renovate() {
      // 1、获取栏目列表
      this.getColumns();
      // 2. 获取所有栏目
      //this.getAllColumns();
    }
  },
  watch: {
    ImageUrl: function(val) {
      this.$set(this.Form, "icon", val);
    }
  },
  created() {
    // 1、获取栏目列表
    this.getColumns();
    // 2. 获取所有栏目
    //this.getAllColumns();
  }
};
</script>

<style lang="scss" scoped>
.avatar-uploader .el-upload {
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  border-radius: 6px;
  border: 1px dashed #d9d9d9;
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}

.el-cascader {
  width: 100%;
}
</style>