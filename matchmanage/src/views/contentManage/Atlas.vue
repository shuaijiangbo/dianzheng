<template>
  <section>
    <!-- 顶部工具栏 -->
    <el-col :span="24" class="toolbar toptoolbar" style="padding-bottom: 0px;">
      <el-form :inline="true" @submit.native.prevent>
        <div class="left">
          <Button v-has="[atlas.addImage]" style="marginRight: 15px" url="./static/images/add.png" @click.native="handleAdd">添加图集</Button>
          <Button
            v-has="[atlas.batchDelete]"
            url="./static/images/remove.png"
            @click.native="batchRemove"
            type="danger"
            :disabled="this.sels.length===0"
          >批量删除</Button> 
        </div>

        <div class="right" v-has="[atlas.getImages]">
          <el-input class="top" @keyup.enter.native="handleSearch" style="width: 200px;marginRight: 17px;" v-model="atlasName" placeholder="请输入图集名"></el-input>
          <Button
            url="./static/images/search.png"
            @click.native="handleSearch"
          >查询</Button>
        </div>
        
      </el-form>
    </el-col>

    <!-- 列表-->
    <el-table
      :data="atlases"
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
      <el-table-column prop="name" label="图集名" align="center"></el-table-column>
      <el-table-column prop="orderNo" label="排序" align="center"></el-table-column>
      <el-table-column prop="state" label="状态" align="center" :formatter="formatState"></el-table-column>
      <el-table-column prop="summary" label="说明" align="center"></el-table-column>

      <el-table-column label="操作" width="370" align="right">
        <template scope="scope">
          <Handle
            v-has="[image.getImages]"
            url="./static/images/images.png"
            @click.native="handleSee(scope.$index, scope.row)"
          >查看</Handle>
          <Handle
            v-has="[atlas.submitatlas]"
            url="./static/images/submit.png"
            v-if="scope.row.state == 0 || scope.row.state == 1"
            @click.native="handleSubmit(scope.$index, scope.row)"
          >提交</Handle>
          <Handle
            v-has="[atlas.auditImages]"
            url="./static/images/shenhe.png"
            v-else-if="scope.row.state == 2"
            @click.native="handleAudit(scope.$index, scope.row)"
          >审核</Handle>
          <Handle
            v-has="[atlas.auditImages]"
            url="./static/images/plush.png"
            v-else-if="scope.row.state == 3"
            @click.native="handlePublish(scope.$index, scope.row)"
          >发布</Handle>
          <Handle
            v-has="[atlas.auditImages]"
            url="./static/images/cancle.png"
            v-else-if="scope.row.state == 4"
            type="danger"
            @click.native="handleCancel(scope.$index, scope.row)"
          >撤销发布</Handle>
          <Handle
            v-has="[image.addImage]"
            url="./static/images/import.png"
            @click.native="handleImport(scope.$index, scope.row)"
          >导入</Handle>
          <Handle
            v-has="[atlas.updateImage]"
            url="./static/images/edit.png"
            @click.native="handleEdit(scope.$index, scope.row)"
          >编辑</Handle>
          <Handle
            v-has="[atlas.deleteImage]"
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
      :title="Form.id?'编辑图集':'添加图集'"
      :visible.sync="FormVisible"
      :close-on-click-modal="false"
      @closed="dialogClosed"
    >
      <el-form class="dialogform" :model="Form" label-width="80px" :rules="FormRules" ref="Form">
        <el-form-item label="图集名" prop="name">
          <el-input v-model="Form.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="排序" prop="orderNo">
          <el-input v-model.number="Form.orderNo" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="是否轮播" prop="carousel" class="gender">
          <el-radio-group v-model="Form.carousel">
            <el-radio :label="0">不轮播</el-radio>
            <el-radio :label="1">轮播</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="路径" prop="path">
          <el-input v-model="Form.path" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="说明" prop="summary">
          <el-input v-model="Form.summary" auto-complete="off"></el-input>
        </el-form-item>

        <el-form-item v-show="Form.carousel" label="封面" prop="cover" class="file-item">
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
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="FormVisible = false">取消</el-button>
        <el-button type="primary" @click.native="Submit" :loading="addLoading">提交</el-button>
      </div>
    </el-dialog>

    <!-- 导入图片模态框 -->
    <el-dialog
      title="导入图片"
      :visible.sync="importVisible"
      @closed="importDialogClosed"
      :show-close="false"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
    >
      <el-upload
        ref="upload"
        :action="baseUrl"
        :data="{tenantCode: '1', creatorId: 1, sourceFrom, title, collectionId: currentRow}"
        list-type="picture-card"
        :on-preview="handlePictureCardPreview"
        :on-success="handleSuccess"
        :before-upload="beforeAvatarUpload"
        :on-remove="handleRemove"
        :on-change="change"
      >
        <!-- 自动上传false，自定义上传函数  :action="baseUrl"
        :data="{tenantCode: '1', creatorId: 1, sourceFrom, title, collectionId: currentRow}" :on-preview="handlePictureCardPreview"
        :before-remove="beforeRemove"
        :on-remove="handleRemove" :on-change="change"-->
        <i class="el-icon-plus"></i>
        <input @click.stop v-model="title" type="text" placeholder="描述">
        <input @click.stop v-model="sourceFrom" type="text" placeholder="来源">
      </el-upload>

      <!-- 导入图片中的查看图片大图模态框 -->
      <el-dialog title="图片信息" :visible.sync="importDialogVisible" width="40%" append-to-body>
        <p>描述：{{currentFile.title}}</p>
        <p>来源：{{currentFile.sourceFrom}}</p>
        <img width="100%" :src="importImageUrl" alt>
      </el-dialog>

      <div slot="footer" class="dialog-footer">
        <el-button type="danger" @click.native="handleUploadCancel">取消</el-button>
        <el-button type="primary" @click.native="handleUploadSubmit">确定</el-button>
      </div>
    </el-dialog>

    <!-- 审核展示图集详情模态框||查看图集模态框 -->
    <el-dialog title="图集" :visible.sync="dialogVisible" ref="dialogRef">
    <!-- baseURL +  -->
      <img class="images" v-for="image in resourceId" :src="image.path" :key="image.id">

      <div slot="footer" class="dialog-footer" v-if="showHandle">
        <el-button type="danger" @click.native="rebut">驳 回</el-button>
        <el-button type="primary" @click.native="permit">审核通过</el-button>
      </div>
    </el-dialog>
  </section>
</template>

<script>
import util from "@/common/util";
var qs = require("qs");
import Handle from "@/components/Handle";
import Button from "@/components/Button";
import { atlas, image } from "../../api/api";

export default {
  components: {
    Handle,
    Button
  },
  data() {
    return {
      atlas, // 图集对象
      image, // 图片api对象
      atlasName: '', // 查询条件，图集名
      //titles: [],
      //sourceFroms: [],
      //files: [], // 多图上传文件数组
      currentFile: [], // 当前正在查看的大图
      fileList: [], // 上传图片的数组
      showHandle: "",
      resourceId: [], // 图集中的图片
      title: "", // 上传图片的描述字段
      sourceFrom: "", // 上传图片的来源字段
      importImageUrl: "",
      importDialogVisible: false, // 导入模态框是否显示
      currentRow: {}, // 当前行的数据 
      baseUrl: util.baseUrl + "/cms-api/sports-cms/image/add",
      baseURL: util.baseUrl,
      emptyContent: "暂无数据",
      atlases: [], // 图集列表
      //imageUrl: '',
      total: 0,
      pageNum: 1,
      pageSize: 10,
      listLoading: false,
      ImageUrl: "",
      ImageUrlVisible: false,
      sels: [], //列表选中列
      formData: new FormData(),
      FormVisible: false, // 编辑界面是否显示
      dialogVisible: false,
      importVisible: false, // 导入图片界面是否显示
      FormRules: {
        name: [{ required: true, message: "请输入图集名", trigger: "blur" }],
        path: [{ required: true, message: "路径名必填", trigger: "blur" }],
        orderNo: [
          { required: true, message: "排序必填", trigger: "blur" },
          { type: "number", message: "排序为数字" }
        ],
        cover: [{ required: true, message: "请上传图集封面", trigger: "blur" }]
      },
      //编辑界面数据
      Form: {},
      addLoading: false
    };
  },
  methods: {
    // 获取图集列表
    getAtlases() {
      let param = {
        pageSize: this.pageSize,
        pageNum: this.pageNum,
        tenantCode: "1",
        name: this.atlasName.replace(/\s+/g,"")
      };
      this.listLoading = true;
      atlas
        .getImages.r(param)
        .then(res => {
          let result = res.data.data;
          this.atlases = result.datas;
          this.total = result.totalNum;
          this.listLoading = false;
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
      this.getAtlases();
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.getAtlases();
    },

    // 删除
    handleDel: function(index, row) {
      this.$confirm("确认删除该记录吗?", "提示", {
        type: "warning"
      })
        .then(() => {
          this.listLoading = true;
          let params = { id: row.id, updId: 1, tenantCode: "1" };
          atlas
            .deleteImage.r(params)
            .then(res => {
              this.listLoading = false;
              this.getAtlases();
            })
            .catch(res => {
              this.listLoading = false;
              this.emptyContent = "数据获取失败啦";
            });
        })
        .catch(() => {});
    },
    // 模态框关闭动画后的回调
    dialogClosed: function() {
      // 重置
      this.Form = {};
      this.formData = new FormData();
      this.ImageUrl = "";
      this.$refs.Form.clearValidate();
    },
    importDialogClosed: function() {
      this.$refs.upload.clearFiles();
    },
    // 显示导入界面
    handleImport: function(index, row) {
      this.importVisible = true;
      this.currentRow = row.id;
    },
    // 显示编辑界面
    handleEdit: function(index, row) {
      console.log(row);
      this.Form = Object.assign({}, row);

      // 将封面图片赋值给 imageUrl
      this.Form.coverImageUrl
        ? (this.ImageUrl = util.baseUrl + this.Form.coverImageUrl)
        : "";
      this.FormVisible = true;
    },
    // 显示添加界面
    handleAdd: function() {
      this.Form = {
        id: "",
        summary: "",
        carousel: 0
      };
      this.FormVisible = true;
    },

    handleSee: function(index, row) {
      let params = {
        tenantCode: "1",
        creatorId: 1,
        collectionId: row.id,
        pageNum: 1,
        pageSize: 1000
      };
      // 获取图集中的图片
      image
        .getImages.r(params)
        .then(res => {
          this.showHandle = false;
          this.resourceId = res.data.data.datas;
          this.dialogVisible = true;
        })
        .catch(res => {
        });
    },
    // 图集提交状态
    handleSubmit: function(index, row) {
      this.$confirm("确认提交吗？", "提示", {})
        .then(() => {
          let params = {
            id: row.id,
            tenantCode: "1",
            updId: 1
          };
          atlas.submitatlas.r(params).then(res => {
            this.getAtlases();
          });
        })
        .catch(() => {});
    },
    // 图集发布
    handlePublish: function(index, row) {
      this.$confirm("确认提交吗？", "提示", {
        beforeClose: (action, instance, done) => {
          if (action === "confirm") {
            instance.confirmButtonLoading = true;
            instance.confirmButtonText = "执行中...";
            let params = {
              tenantCode: "1",
              creatorId: 1,
              collectionId: row.id,
              pageNum: 0,
              pageSize: 1000
            };
            // 获取图集中的图片
            image
              .getImages.r(params)
              .then(res => {
                let params = {
                  auditMsg: "",
                  imageCollectionId: row.id,
                  resourceId: res.data.data.datas.map((item, index) => item.id),
                  tenantCode: "1",
                  auditor: 1,
                  state: 4
                };
                return atlas.auditImages.r(params);
              })
              .then(res => {
                instance.confirmButtonLoading = false;
                done();
                this.getAtlases();
              })
              .catch(res => {
                instance.confirmButtonLoading = false;
                done();
              });
          } else {
            done();
          }
        }
      })
        .then(() => {})
        .catch(() => {});
    },
    // 撤销发布
    handleCancel: function(index, row) {
      this.$confirm("确认提交吗？", "提示", {})
        .then(() => {
          // 获取图集中的图片
          let params = {
            tenantCode: "1",
            creatorId: 1,
            collectionId: row.id,
            pageNum: 0,
            pageSize: 1000
          };
          image
            .getImages.r(params)
            .then(res => {
              let params = {
                auditMsg: "",
                imageCollectionId: row.id,
                tenantCode: "1",
                auditor: 1,
                state: 3,
                resourceId: res.data.data.datas.map((item, index) => item.id)
              };
              return atlas.auditImages.r(params);
            })
            .then(res => {
              this.Form = {};
              this.getAtlases();
            })
            .catch(res => {
            });
        })
        .catch(() => {});
    },

    // 打开审核框
    handleAudit: function(index, row) {
      let params = {
        tenantCode: "1",
        creatorId: 1,
        collectionId: row.id,
        pageNum: 1,
        pageSize: 1000
      };
      // 获取图集中的图片
      image
        .getImages.r(params)
        .then(res => {
          this.Form = Object.assign({}, row);
          this.resourceId = res.data.data.datas;
          this.showHandle = true;
          this.dialogVisible = true;
        })
        .catch(res => {
        });
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
            imageCollectionId: this.Form.id,
            resourceId: this.resourceId.map((item, index) => item.id),
            tenantCode: "1",
            auditor: 1,
            state: 1
          };
          atlas
            .auditImages.r(params)
            .then(res => {
              this.dialogVisible = false;
              this.Form = {};
              this.getAtlases();
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
            imageCollectionId: this.Form.id,
            tenantCode: "1",
            auditor: 1,
            state: 3,
            resourceId: this.resourceId.map((item, index) => item.id)
          };
          atlas
            .auditImages.r(params)
            .then(res => {
              this.dialogVisible = false;
              this.Form = {};
              this.getAtlases();
            })
            .catch(res => {
            });
        })
        .catch(() => {});
    },

    // 添加and编辑
    Submit: function() {
      console.log(this.Form.cover);
      this.$refs.Form.validate(valid => {
        if (valid) {
          this.$confirm("确认提交吗？", "提示", {})
            .then(() => {
              this.addLoading = true;

              this.formData.append("creatorId", 1);
              this.formData.append("tenantCode", "1");
              this.formData.append("id", this.Form.id);
              this.formData.append("name", this.Form.name);
              this.formData.append("orderNo", this.Form.orderNo);
              this.formData.append("summary", this.Form.summary);
              this.formData.append("path", this.Form.path);
              this.formData.append("carousel", this.Form.carousel);
              this.Form.carousel ? "" : this.formData.delete("cover"); // 不轮播就不传递cover
              let headers = { "Content-Type": "multipart/form-data" };
              if (!this.Form.id) {
                atlas
                  .addImage.r(this.formData, headers)
                  .then(res => {
                    this.addLoading = false;
                    // 重置
                    this.Form = {};
                    this.formData = new FormData();
                    this.ImageUrl = "";
                    this.FormVisible = false;
                    this.getAtlases();
                  })
                  .catch(res => {
                    this.addLoading = false;
                    this.formData.delete("creatorId");
                    this.formData.delete("tenantCode");
                    this.formData.delete("id");
                    this.formData.delete("name");
                    this.formData.delete("orderNo");
                    this.formData.delete("summary");
                    this.formData.delete("path");
                    this.formData.delete("carousel");
                  });
              } else {
                // 编辑
                this.formData.append("updId", 1);
                atlas
                  .updateImage.r(this.formData, headers)
                  .then(res => {
                    this.addLoading = false;
                    // 重置
                    this.Form = {};
                    this.FormVisible = false;
                    this.formData = new FormData();
                    this.ImageUrl = "";
                    this.getAtlases();
                  })
                  .catch(res => {
                    this.addLoading = false;
                    this.formData.delete("creatorId");
                    this.formData.delete("tenantCode");
                    this.formData.delete("id");
                    this.formData.delete("name");
                    this.formData.delete("orderNo");
                    this.formData.delete("summary");
                    this.formData.delete("path");
                    this.formData.delete("carousel");
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
          atlas
            .batchDelete.r(params)
            .then(res => {
              this.listLoading = false;
              this.getAtlases();
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
      this.getAtlases();
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
    //  图集上传图片
    beforeAvatarUpload(file) {
      if (this.title === "") {
        this.$message.error("图片描述不能为空！");
        return false;
      }
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
      return isJPG && isLt2M;
    },
    // 修改table header的背景色
    tableHeaderColor({ row, column, rowIndex, columnIndex }) {
      if (rowIndex === 0) {
        return "background-color: #f0f0f0;color: #000;font-weight: 500;";
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
    // 多图上传的删除事件
    handleRemove(file, fileList) {
      if (file.response === undefined) {
        return;
      }
      image
        .deleteImage.r({ id: file.response.data.id, tenantCode: "1", updId: 1 })
        .then(res => {

        });
    },
    change(file, fileList) {
      console.log(fileList);
      this.fileList = fileList;
    },
    handleSuccess(res, file, fileList) {
      this.title = "";
      this.sourceFrom = "";
    },
    handlePictureCardPreview(file) {
      this.importImageUrl = file.url;
      this.importDialogVisible = true;
      this.currentFile = file.response.data;
    },
    // 自定义的上传函数
    uploadFile(file) {
      this.titles.push(file.data.title);
      this.sourceFroms.push(file.data.sourceFrom);
      this.formData.append("files", file.file);
      console.log(file);
      console.log("自定一上传函数");
    },
    // 多图上传提交操作
    handleUploadSubmit() {
      this.$confirm("确认提交吗？", "提示", {})
        .then(() => {
          this.importVisible = false;
        })
        .catch(() => {});
    },
    async handleUploadCancel() {
      for (let file of this.fileList) {
        await image
          .deleteImage.r({ id: file.response.data.id, tenantCode: "1", updId: 1 })
          .then(res => {});
      }
      this.importVisible = false;
    },
    // 刷新
    renovate() {
      this.getAtlases();
    }
  },
  watch: {
    ImageUrl: function(val) {
      // icon 赋值仅仅是为了用于上传图片必传功能的表单检测
      //this.Form.cover = val; 第一种方法，解决明明上传了图片，还验证不通过，得在打开模态框前初始化cover: '',
      this.$set(this.Form, "cover", val); // 向Form对象添加一个响应式属性。 第二种方法，直接添加响应式属性。
    },
    /* 轮播切换的逻辑：
    1.不轮播，删除校验规则。
    2.轮播，添加校验规则。
    3.轮播上传图片->不轮播，cover,imageUrl都在。在提交的时候判断是否轮播删除cover属性 */
    carousel(newValue, oldValue) {
      if (!newValue) {
        delete this.FormRules.cover;
      } else {
        this.FormRules.cover = [
          { required: true, message: "请上传图集封面", trigger: "blur" }
        ];
      }
    }
  },
  computed: {
    // 此计算属性是为了监听是否轮播，如果不轮播，则为cover赋值，以免被检测没有值，无法提交表单。
    carousel() {
      return this.Form.carousel;
    }
  },
  created() {
    // 1、获取图集列表
    this.getAtlases();
  },
  updated() {
    if (
      this.$refs.dialogRef.$refs.dialog.childNodes[1].className ==
      "el-dialog__body"
    ) {
      this.$refs.dialogRef.$refs.dialog.childNodes[1].style.marginLeft =
        "-20px";
    }
  }
};
</script>

<style lang="scss" scoped>
.el-dialog__body img.images {
  float: left;
  width: 25%;
  height: 120px;
  box-sizing: border-box;
  padding-left: 20px;
  margin-bottom: 8px;
}
.el-dialog__body p {
  margin-top: 0;
  color: black;
}
.el-upload > input {
  background-color: #fff;
  background-image: none;
  border-radius: 4px;
  border: 1px solid #dcdfe6;
  box-sizing: border-box;
  color: #606266;
  display: inline-block;
  font-size: inherit;
  height: 40px;
  line-height: 40px;
  outline: none;
  padding: 0 15px;
  transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
  width: 100%;
}

/* 上传组件样式*/
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