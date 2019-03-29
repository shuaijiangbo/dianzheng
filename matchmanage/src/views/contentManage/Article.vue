<template>
  <section>
    <!-- 顶部工具栏 -->
    <el-col :span="24" class="toolbar toptoolbar" style="padding-bottom: 0px;">
      <el-form :inline="true" @submit.native.prevent>
        <div class="left">
          <Button v-has="[article.addArticle]" style="marginRight: 15px" url="./static/images/add.png" @click.native="handleAdd">添加文章</Button>
          <Button
            v-has="[article.batchDelete]"
            url="./static/images/remove.png"
            @click.native="batchRemove"
            type="danger"
            :disabled="this.sels.length===0"
          >批量删除</Button>
        </div>

        <div class="right" v-has="[article.getArticles]">
          <span class="label">文章类型</span>
          <el-select v-model="dataDictId" placeholder="请选择文章类型">
            <el-option label="不限" :value="0"></el-option>
            <el-option
              v-for="(value, key) in dataDictsObject"
              :key="key"
              :label="value"
              :value="key">
            </el-option>
          </el-select>
          <el-input class="top" @keyup.enter.native="handleSearch" style="width: 200px;marginRight: 17px;" v-model="articleTitle" placeholder="请输入文章标题"></el-input>
          <Button
            url="./static/images/search.png"
            @click.native="handleSearch"
          >查询</Button>
        </div>
        
      </el-form>
    </el-col>

    <!-- 列表-->
    <el-table
      :data="articles"
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
      <el-table-column prop="title" label="标题" align="center"></el-table-column>
      <el-table-column
        prop="leafColumnId"
        label="所属栏目"
        align="center"
        :formatter="formatLeafColumn"
      ></el-table-column>
      <el-table-column prop="type" label="类型" align="center" :formatter="formatType"></el-table-column>
      <el-table-column prop="sourceFrom" label="来源" align="center"></el-table-column>
      <el-table-column prop="isTop" label="是否置顶" align="center" :formatter="formatIsTop"></el-table-column>
      <el-table-column prop="state" label="状态" align="center" :formatter="formatState"></el-table-column>
      <el-table-column label="操作" width="240" align="right">
        <template scope="scope">
          <Handle
            v-has="[article.submitArticles]"
            url="./static/images/submit.png"
            v-if="scope.row.state == 0 || scope.row.state == 1"
            @click.native="handleSubmit(scope.$index, scope.row)"
          >提交</Handle>
          <Handle
            v-has="[article.auditArticles]"
            url="./static/images/shenhe.png"
            v-else-if="scope.row.state == 2"
            @click.native="handleAudit(scope.$index, scope.row)"
          >审核</Handle>
          <Handle
            v-has="[article.auditArticles]"
            url="./static/images/plush.png"
            v-else-if="scope.row.state == 3"
            @click.native="handlePublish(scope.$index, scope.row)"
          >发布</Handle>
          <Handle
            v-has="[article.auditArticles]"
            url="./static/images/cancle.png"
            v-else-if="scope.row.state == 4"
            type="danger"
            @click.native="handleCancel(scope.$index, scope.row)"
          >撤销发布</Handle>
          <Handle
            v-has="[article.updateArticle]"
            url="./static/images/edit.png"
            @click.native="handleEdit(scope.$index, scope.row)"
          >编辑</Handle>
          <Handle
            v-has="[article.deleteArticle]"
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
      :title="Form.id?'编辑文章':'添加文章'"
      :visible.sync="FormVisible"
      :close-on-click-modal="false"
      @opened="dialogOpen"
      @closed="dialogClosed"
    >
      <el-form class="dialogform" :model="Form" label-width="80px" :rules="FormRules" ref="Form">
        <el-form-item label="标题:" prop="title">
          <el-input v-model="Form.title" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="类型:" prop="type">
          <el-select v-model="Form.type" placeholder="请选择文章类型">
            <el-option
              v-for="(dataDict, index) in dataDicts"
              :label="dataDict.dataValue"
              :value="dataDict.id"
              :key="index"
            ></el-option>
          </el-select>
        </el-form-item>
        <!-- 文章的父级栏目不能为系统的默认顶级栏目，因此-1 -->
        <el-form-item label="父级栏目:" prop="leafColumnId" placeholder="请选择文章父级栏目">
          <el-cascader
            :options="options.filter((item, index) => {return index < options.length - 1})"
            v-model="Form.leafColumnId"
            change-on-select
          ></el-cascader>
        </el-form-item>
        <el-form-item label="来源:" prop="sourceForm">
          <el-input v-model="Form.sourceFrom" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="链接:" prop="href">
          <el-input v-model="Form.href" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="说明:" prop="summary">
          <el-input v-model="Form.summary" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="是否轮播:" prop="carousel" class="gender">
          <el-radio-group v-model="Form.carousel">
            <el-radio :label="0">不轮播</el-radio>
            <el-radio :label="1">轮播</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="是否置顶:" prop="isTop" class="gender">
          <el-radio-group v-model="Form.isTop">
            <el-radio :label="0">不置顶</el-radio>
            <el-radio :label="1">置顶</el-radio>
          </el-radio-group>
        </el-form-item>
        
        <el-form-item label="封面:" prop="coverImageUrl" v-show="Form.carousel" class="file-item">
          <!-- <el-upload
            class="avatar-uploader"
            action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false"
            :before-upload="beforeupload"
          >
            <img v-if="ImageUrl" :src="ImageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload> -->
          <input style="width:100%" type="file" ref="file" @change="changpic()" accept="image/png, image/jpeg, image/gif, image/jpg">
        </el-form-item>

        <el-form-item class="ueditor">
          <Uediter :value="ueditor.value" :config="ueditor.config" ref="ue"></Uediter>
        </el-form-item>
        <!-- <Uediter :value="ueditor.value" :config="ueditor.config" ref="ue"></Uediter> -->
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="FormCancel">取消</el-button>
        <el-button type="primary" @click.native="Submit" :loading="addLoading">提交</el-button>
      </div>
    </el-dialog>

    <el-dialog title="文章" :visible.sync="dialogVisible" width="50%">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>栏目</el-breadcrumb-item>
        <el-breadcrumb-item v-for="(name, index) in Form.leafColumnId" :key="index">{{name}}</el-breadcrumb-item>
      </el-breadcrumb>
      <h1>{{Form.title}}</h1>
      <div class="message">
        <span>{{Form.createTime}}</span>
        <span class="anthor">张三</span>
      </div>
      <p v-html="Form.content"></p>

      <div slot="footer" class="dialog-footer">
        <el-button type="danger" @click.native="rebut">驳 回</el-button>
        <el-button type="primary" @click.native="permit">审核通过</el-button>
      </div>
    </el-dialog>
  </section>
</template>

<script>
import util from "@/common/util";
import { mapGetters, mapActions } from "vuex";
import Handle from "@/components/Handle";
import Button from "@/components/Button";
//vue富文本
import editors from "@/components/ue";
import { quillEditor } from "vue-quill-editor";
//百度富文本
import Uediter from "@/components/ueditor";

import { article, column, dataDict } from "@/api/api";

export default {
  components: {
    editors,
    Uediter,
    Handle,
    Button,
  },
  data() {
    return {
      article, // 文章api对象
      articleTitle: '', // 查询条件，文章标题
      dataDictId: '', // 查询条件，数据字典id
      emptyContent: "暂无数据",
      articles: [], // 文章列表
      //options: [],
      cascaderValue: [],
      ImageUrl: "", // 临时保存图片的路径
      formData: new FormData(),
      dataDicts: [],
      dataDictsObject: {},
      content: null,
      /*百度富文本*/
      ueditor: {
        value: ""
      },
      total: 0,
      pageNum: 1,
      pageSize: 10,
      listLoading: false,
      sels: [], //列表选中列

      FormVisible: false, //编辑界面是否显示
      dialogVisible: false,
      FormRules: {
        title: [{ required: true, message: "请输入标题", trigger: "blur" }],
        type: [{ required: true, message: "请选择文章类型", trigger: "blur" }],
        leafColumnId: [
          { required: true, message: "请选择文章父级栏目", trigger: "blur" }
        ]
        // coverImageUrl: [
        //   { required: true, message: "请上传文章封面", trigger: "blur" }
        // ]
      },
      //编辑界面数据
      Form: {},

      FormVisible: false, //添加and编辑// 界面是否显示
      addLoading: false
    };
  },
  computed: {
    ...mapGetters({ options: "cascaderColumns" }),
    ...mapGetters(["keyValueColumns"]),
    // 此计算属性是为了监听是否轮播，如果不轮播，则为cover赋值，以免被检测没有值，无法提交表单。
    carousel() {
      return this.Form.carousel;
    }
  },
  methods: {
    ...mapActions(["getAllColumns"]),
    // 获取文章列表
    getArticles() {

      let param = {
        pageSize: this.pageSize,
        pageNum: this.pageNum,
        tenantCode: "1",
        title: this.articleTitle.replace(/\s+/g,""),
        type: this.dataDictId ? this.dataDictId : ''
      };
      this.listLoading = true;
      article
        .getArticles.r(param)
        .then(res => {
          let result = res.data.data;
          this.articles = result.datas;
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
      let params = { tenantCode: "1", pageNum: 1, pageSize: 1000, typeId: 1 };
      this.listLoading = true;
      dataDict
        .getDataDictList.r(params)
        .then(res => {
          this.dataDicts = res.data.data.datas;
          for (let dataDict of this.dataDicts) {
            this.dataDictsObject[dataDict.id] = dataDict.dataValue;
          }
          // 获取文章列表
          this.getArticles();
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
            state: 1
          };
          article
            .auditArticles.r(params)
            .then(res => {
              this.dialogVisible = false;
              this.Form = {};
              this.getArticles();
            })
            .catch(res => {
            });
        })
        .catch(() => {});
    },
    // 审核通过
    permit() {
      this.$confirm("确认提交吗?", "提示", {})
        .then(() => {
          let params = {
            auditMsg: "",
            id: this.Form.id,
            resourceId: this.Form.id,
            tenantCode: "1",
            auditor: 1,
            state: 3
          };

          article
            .auditArticles.r(params)
            .then(res => {
              this.dialogVisible = false;
              this.Form = {};
              this.getArticles();
            })
            .catch(res => {
            });
        })
        .catch(() => {});
    },

    /*// 百度富文本内容*/
    returnContent() {
      this.content = this.$refs.ue.getUEContent();
    },

    handleCurrentChange(val) {
      this.pageNum = val;
      this.getArticles();
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.getArticles();
    },

    // 删除
    handleDel: function(index, row) {
      this.$confirm("确认删除该记录吗?", "提示", {
        type: "warning"
      }).then(
        () => {
          this.listLoading = true;
          let params = { id: row.id, tenantCode: "1", updId: 0 };
          article
            .deleteArticle.r(params)
            .then(res => {
              this.listLoading = false;
              this.getArticles();
            })
            .catch(res => {
              this.listLoading = false;
            });
        },
        () => {}
      );
    },
    // 显示编辑界面
    handleEdit: function(index, row) {
      console.log(row);

      column
        .getParents.r({ id: row.leafColumnId, tenantCode: 1, updId: 1 })
        .then(res => {
          let result = res.data.data;
          this.Form = Object.assign({}, row);
          this.Form.leafColumnId = result.map(item => item.id);
          row.coverImageUrl
            ? (this.ImageUrl = `${util.baseUrl}${row.coverImageUrl}`)
            : "";
          this.FormVisible = true;
        })
        .catch(res => {
        });
    },
    // 文章待发布状态
    handleWait: function(index, row) {
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

          article
            .auditArticles.r(params)
            .then(res => {
              this.dialogVisible = false;
              this.Form = {};
              this.getArticles();
            })
            .catch(res => {
            });
        })
        .catch(() => {});
    },

    // 文章提交状态
    handleSubmit: function(index, row) {
      this.$confirm("确认提交吗？", "提示", {})
        .then(() => {
          let params = {
            id: row.id,
            tenantCode: "1",
            updId: 1
          };
          article
            .submitArticles.r(params)
            .then(res => {
              this.getArticles();
            })
            .catch(res => {
            });
        })
        .catch(() => {});
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

          article
            .auditArticles.r(params)
            .then(res => {
              this.dialogVisible = false;
              this.Form = {};
              this.getArticles();
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
          article
            .auditArticles.r(params)
            .then(res => {
              this.Form = {};
              this.getArticles();
            })
            .catch(res => {
            });
        })
        .catch(() => {});
    },

    // 打开审核框
    handleAudit: function(index, row) {
      console.log(row);
      column
        .getParents.r({ id: row.leafColumnId, tenantCode: 1, updId: 1 })
        .then(res => {
          let result = res.data.data;
          this.Form = Object.assign({}, row);
          this.Form.leafColumnId = result.map(item => item.name);
          this.dialogVisible = true;
        });
    },

    // 模态框打开后的回调
    dialogOpen: function() {
      // 模态框打开后，富文本内容赋值
      this.$refs.ue.setUEContent(this.Form.content);
    },
    // 模态框关闭动画后的回调
    dialogClosed: function() {
      this.reset();
    },

    // 显示添加and编辑界面
    handleAdd: function() {
      this.Form = {
        id: "",
        leafColumnId: [],
        isTop: 0,
        carousel: 0,
        summary: "",
        sourceForm: "",
        href: ""
      };
      this.FormVisible = true;
    },

    // 添加and编辑
    Submit: function() {
      this.$refs.Form.validate(valid => {
        if (valid) {
          this.$confirm("确认提交吗？", "提示", {}).then(
            () => {
              this.addLoading = true;
              // 利用formData 完成 mult/form-data编码格式的提交
              this.formData.append("creatorId", 1);
              this.formData.append("tenantCode", "1");
              this.formData.append("carousel", this.Form.carousel);
              this.formData.append("id", this.Form.id);
              this.formData.append("title", this.Form.title);
              this.formData.append("type", this.Form.type);
              this.formData.append(
                "leafColumnId",
                this.Form.leafColumnId[this.Form.leafColumnId.length - 1]
              );
              this.formData.append("content", this.$refs.ue.getUEContent());
              this.formData.append("isTop", this.Form.isTop);
              this.formData.append("summary", this.Form.summary);
              this.formData.append("sourceFrom", this.Form.sourceFrom);
              this.formData.append("href", this.Form.href);
              this.Form.carousel ? "" : this.formData.delete("cover"); // 不轮播就不传递cover
              let headers = { "Content-Type": "multipart/form-data" };
              if (!this.Form.id) {
                article
                  .addArticle.r(this.formData, headers)
                  .then(res => {
                    this.addLoading = false;
                    this.reset();
                    this.getArticles();
                  })
                  .catch(res => {
                    this.addLoading = false;
                    this.formData.delete("creatorId");
                    this.formData.delete("tenantCode");
                    this.formData.delete("carousel");
                    this.formData.delete("id");
                    this.formData.delete("title");
                    this.formData.delete("type");
                    this.formData.delete("leafColumnId");
                    this.formData.delete("content");
                    this.formData.delete("isTop");
                    this.formData.delete("summary");
                    this.formData.delete("sourceFrom");
                    this.formData.delete("href");
                  });
              } else {
                // 编辑
                this.formData.append("updId", 1);
                article
                  .updateArticle.r(this.formData, headers)
                  .then(res => {
                    this.addLoading = false;
                    this.reset();
                    this.getArticles();
                  })
                  .catch(res => {
                    this.addLoading = false;
                    this.formData.delete("creatorId");
                    this.formData.delete("tenantCode");
                    this.formData.delete("carousel");
                    this.formData.delete("id");
                    this.formData.delete("title");
                    this.formData.delete("type");
                    this.formData.delete("leafColumnId");
                    this.formData.delete("content");
                    this.formData.delete("isTop");
                    this.formData.delete("summary");
                    this.formData.delete("sourceFrom");
                    this.formData.delete("href");
                  });
              }
            },
            () => {}
          );
        }
      });
    },

    // 模态框取消事件
    FormCancel: function() {
      this.$refs.ue.setUEContent("");
      this.FormVisible = false;
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
          article
            .batchDelete.r(params)
            .then(res => {
              this.listLoading = false;
              this.getArticles();
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
      this.getArticles();
    },

    //阻止upload的自己上传，进行再操作
    beforeupload(file) {
      //创建临时的路径来展示图片
      var windowURL = window.URL || window.webkitURL;
      this.ImageUrl = windowURL.createObjectURL(file);
      this.formData = new FormData();
      this.formData.append("cover", file);
      return false;
    },

    // 上传表单change事件
    changpic() {
      let file = this.$refs.file.files[0];
      this.ImageUrl = window[window.URL ? 'URL' : 'webkitURL']['createObjectURL'](file);
      this.formData = new FormData(); // 这句话适用在提交失败，再次提交，更新cover
      this.formData.append("cover", file);  
    },

    formatIsTop(row, column, cellValue, index) {
      return cellValue ? "置顶" : "不置顶";
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
    formatLeafColumn(row, column, cellValue, index) {
      return this.keyValueColumns[cellValue];
    },
    // 刷新
    renovate() {
      // 1、重新调用 create 函数里面的方法
      this.getDataDictList();
    },
    // 重置
    reset() {
      this.FormVisible = false;
      this.Form = {};
      this.formData = new FormData();
      this.ImageUrl = "";
      this.$refs.ue.setUEContent("");
      // 移除表单项的检测结果
      this.$refs.Form.clearValidate();
    }
  },
  watch: {
    ImageUrl: function(val) {
      //this.Form.coverImageUrl = val; // 为coverImageUrl 赋值仅仅是为了用于上传图片必传功能的表单检测
      this.$set(this.Form, "coverImageUrl", val);
    },
    carousel(newValue, oldValue) {
      if (!newValue) {
        delete this.FormRules.coverImageUrl;
      } else {
        this.FormRules.coverImageUrl = [
          { required: true, message: "请上传文章封面", trigger: "blur" }
        ];
      }
    }
  },
  created() {
    // 1、获取文章列表
    //this.getArticles();
    // 2. 获取所有栏目
    //this.getAllColumns();
    // 3. 获取文章的数据字典
    this.getDataDictList();
  }
};
</script>

<style lang="scss" scoped>
.el-dialog__body {
  .el-breadcrumb {
    font-family: none;
    font-size: 12px;
    color: #333;
  }
  h1 {
    font-size: 26px;
    font-weight: 600;
    color: black;
    margin: 10px 0;
  }
  .message {
    font-size: 12px;
    color: #666;
  }
  .anthor {
    margin-left: 10px;
  }
  p {
    color: #333;
  }
}

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
  width: 148px;
  height: 148px;
  line-height: 148px;
  text-align: center;
}
.avatar {
  width: 148px;
  height: 148px;
  display: block;
}
</style>