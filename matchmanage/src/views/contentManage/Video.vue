<template>
  <section>
    <!-- 顶部工具栏 -->
    <el-col :span="24" class="toolbar toptoolbar" style="padding-bottom: 0px;">
      <el-form :inline="true">
        <div class="left">
          <Button v-has="[video.addVideo]" style="marginRight: 15px" url="./static/images/add.png" @click.native="handleAdd">添加视频</Button>
          <Button
            v-has="[video.batchDelete]"
            url="./static/images/remove.png"
            @click.native="batchRemove"
            type="danger"
            :disabled="this.sels.length===0"
          >批量删除</Button>
        </div>

        <div class="right" v-has="[video.getVideos]">
          <span class="label">视频类型</span>
          <el-select v-model="dataDictId" placeholder="请选择视频类型">
            <el-option label="不限" :value="0"></el-option>
            <el-option
              v-for="(value, key) in dataDictsObject"
              :key="key"
              :label="value"
              :value="key">
            </el-option>
          </el-select>
          <Button
            url="./static/images/search.png"
            @click.native="handleSearch"
          >查询</Button>
        </div>
        </el-form>
      </el-col>

    <!-- 列表-->
    <el-table
      :data="videos"
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
      <el-table-column
        prop="leafColumnId"
        label="父级栏目"
        align="center"
        :formatter="formatLeafColumn"
      ></el-table-column>
      <el-table-column prop="type" label="类型" align="center" :formatter="formatType"></el-table-column>
      <el-table-column prop="sortOrder" label="排序" align="center"></el-table-column>
      <el-table-column prop="size" label="大小" align="center"></el-table-column>
      <el-table-column prop="sourceFrom" label="来源" align="center"></el-table-column>
      <el-table-column prop="state" label="状态" align="center" :formatter="formatState"></el-table-column>

      <el-table-column label="操作" width="240" align="right">
        <template scope="scope">
          <Handle
            v-has="[video.submitVideo]"
            url="./static/images/submit.png"
            v-if="scope.row.state == 0 || scope.row.state == 1"
            @click.native="handleSubmit(scope.$index, scope.row)"
          >提交</Handle>
          <Handle
            v-has="[video.auditVideo]"
            url="./static/images/shenhe.png"
            v-else-if="scope.row.state == 2"
            @click.native="handleAudit(scope.$index, scope.row)"
          >审核</Handle>
          <Handle
            v-has="[video.auditVideo]"
            url="./static/images/plush.png"
            v-else-if="scope.row.state == 3"
            @click.native="handlePublish(scope.$index, scope.row)"
          >发布</Handle>
          <Handle
            v-has="[video.auditVideo]"
            url="./static/images/cancle.png"
            v-else-if="scope.row.state == 4"
            type="danger"
            @click.native="handleCancel(scope.$index, scope.row)"
          >撤销发布</Handle>
          <Handle
            v-has="[video.updateVideo]"
            url="./static/images/edit.png"
            @click.native="handleEdit(scope.$index, scope.row)"
          >编辑</Handle>
          <Handle
            v-has="[video.deleteVideo]"
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
      :title="Form.id?'编辑视频':'添加视频'"
      :visible.sync="FormVisible"
      :close-on-click-modal="false"
      @closed="dialogClosed"
    >
      <el-form class="dialogform" :model="Form" label-width="80px" :rules="FormRules" ref="Form">
        <el-form-item label="父级栏目" prop="leafColumnId" placeholder="请选择视频父级栏目">
          <el-cascader
            :options="options.filter((item, index) => {return index < options.length-1 })"
            v-model="Form.leafColumnId"
            change-on-select
          ></el-cascader>
        </el-form-item>
        <el-form-item label="类型" prop="type">
          <el-select v-model="Form.type" placeholder="请选择视频类型">
            <el-option
              v-for="(dataDict, index) in dataDicts"
              :label="dataDict.dataValue"
              :value="dataDict.id"
              :key="index"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="排序" prop="sortOrder">
          <el-input v-model.number="Form.sortOrder" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="来源" prop="summary">
          <el-input v-model="Form.sourceFrom" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="摘要" prop="summary">
          <el-input v-model="Form.summary" auto-complete="off"></el-input>
        </el-form-item>

        <el-form-item label="视频上传" prop="Video" class="file-item">
          <!-- action必选参数, 上传的地址 -->
          <!-- <el-upload
            class="avatar-uploader el-upload--text"
            action="xsxx"
            :before-upload="beforeUploadVideo"
            :show-file-list="false"
          >
            <video
              v-if="VideoUrl != ''"
              :src="VideoUrl"
              class="avatar"
              controls="controls"
            >您的浏览器不支持视频播放</video>
            <i v-else-if="VideoUrl == ''" class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
          <P class="text">请保证视频格式正确，且不超过100M</P> -->
          <input style="width:100%" type="file" ref="file" @change="changpic()" accept="video/mp4, video/avi, video/flv, video/wmv, video/rmvb">
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="FormCancel">取消</el-button>
        <el-button type="primary" @click.native="Submit" :loading="addLoading">提交</el-button>
      </div>
    </el-dialog>

    <el-dialog title="审核" :visible.sync="dialogVisible" width="50%">
      <p class="publisher">发布人：</p>
      <video
        v-if="VideoUrl != ''"
        :src="VideoUrl"
        controls="controls"
        class="permitvideo"
      >您的浏览器不支持视频播放</video>
      <div slot="footer" class="dialog-footer">
        <el-button type="danger" @click.native="rebut">驳 回</el-button>
        <el-button type="primary" @click.native="permit">审核通过</el-button>
      </div>
    </el-dialog>
  </section>
</template>

<script>
import util from "../../common/util";
import { mapGetters, mapActions } from "vuex";
import Handle from "@/components/Handle";
import Button from "@/components/Button";
import { video, column, dataDict } from "../../api/api";

export default {
  components: {
    Handle,
    Button
  },
  data() {
    return {
      video,
      dataDictId: '', // 查询条件，视频类型
      emptyContent: "暂无数据",
      videos: [], // 视频列表
      dataDicts: [],
      dataDictsObject: {},
      total: 0,
      pageNum: 1,
      pageSize: 10,
      listLoading: false,
      sels: [], //列表选中列

      formData: new FormData(), // 上传数据的载体

      VideoUrl: "", // 视频路径
      // 上传视频需要的属性
      // videoFlag: false, // 控制 video 标签是否显示
      videoUploadPercent: "", // 文件上传的进度
      // 表单验证规则
      FormRules: {
        type: [{ required: true, message: "请选择视频类型", trigger: "blur" }],
        leafColumnId: [
          { required: true, message: "请选择视频父级栏目", trigger: "blur" }
        ],
        sortOrder: [
          { required: true, message: "请输入排序", trigger: "blur" },
          { type: "number", message: "排序必须为数字值" }
        ],
        Video: [{ required: true, message: "请上传视频", trigger: "blur" }]
      },
      //编辑界面数据
      Form: {},
      FormVisible: false, //添加and编辑// 界面是否显示
      dialogVisible: false,
      addLoading: false
    };
  },
  computed: {
    ...mapGetters({ options: "cascaderColumns" }),
    ...mapGetters(["keyValueColumns"])
  },
  methods: {
    // 获取视频列表
    getVideos() {
      let param = {
        pageSize: this.pageSize,
        pageNum: this.pageNum,
        tenantCode: "1",
        type: this.dataDictId ? this.dataDictId : ''
      };
      this.listLoading = true;
      video
        .getVideos.r(param)
        .then(res => {
          let result = res.data.data;
          this.videos = result.datas;
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
      let params = { tenantCode: "1", pageNum: 1, pageSize: 1000, typeId: 2 };
      this.listLoading = true;
      dataDict
        .getDataDictList.r(params)
        .then(res => {
          this.dataDicts = res.data.data.datas;
          for (let dataDict of this.dataDicts) {
            this.dataDictsObject[dataDict.id] = dataDict.dataValue;
          }
          // 获取视频列表
          this.getVideos();
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
      this.getVideos();
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.getVideos();
    },

    // 删除
    handleDel: function(index, row) {
      this.$confirm("确认删除该记录吗?", "提示", {
        type: "warning"
      })
        .then(() => {
          this.listLoading = true;
          let params = { id: row.id };
          video
            .deleteVideo.r(params)
            .then(res => {
              this.listLoading = false;
              this.getVideos();
            })
            .catch(res => {
              this.listLoading = false;
            });
        })
        .catch(() => {});
    },
    // 视频待发布状态
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

          video
            .auditVideo.r(params)
            .then(res => {
              this.dialogVisible = false;
              this.Form = {};
              this.getVideos();
            })
            .catch(res => {
            });
        })
        .catch(() => {});
    },

    // 视频提交状态
    handleSubmit: function(index, row) {
      this.$confirm("确认提交吗？", "提示", {})
        .then(() => {
          let params = {
            id: row.id,
            tenantCode: "1",
            updId: 1
          };
          video.submitVideo.r(params).then(res => {
            this.getVideos();
          }).catch(()=>{});
        })
        .catch(() => {});
    },
    // 视频发布
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

          video
            .auditVideo.r(params)
            .then(res => {
              this.dialogVisible = false;
              this.Form = {};
              this.getVideos();
            })
            .catch(res => {
            });
        })
        .catch(() => {});
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
          video
            .auditVideo.r(params)
            .then(res => {
              this.dialogVisible = false;
              this.Form = {};
              this.getVideos();
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

          video
            .auditVideo.r(params)
            .then(res => {
              this.dialogVisible = false;
              this.Form = {};
              this.getVideos();
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

          video
            .auditVideo.r(params)
            .then(res => {
              this.getVideos();
            })
            .catch(res => {
            });
        })
        .catch(() => {});
    },

    // 打开审核框
    handleAudit: function(index, row) {
      console.log(row);
      this.Form = Object.assign({}, row, {leafColumnId: []});
      this.VideoUrl = this.Form.path;
      this.dialogVisible = true;
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
          //this.VideoUrl = `${util.baseUrl}${this.Form.path}`;
          this.FormVisible = true;
        });
    },
    // 显示添加and编辑界面
    handleAdd: function() {
      this.Form = {
        id: "",
        sourceFrom: "",
        summary: "",
        Video: ""
      };
      this.FormVisible = true;
    },

    // 模态框取消事件
    FormCancel: function() {
      this.VideoUrl = "";
      this.FormVisible = false;
    },
    // 模态框关闭后的回调
    dialogClosed: function(params) {
      this.VideoUrl = "";
      this.$refs.file.value = '';
      this.$refs.Form.clearValidate();
    },

    // 添加and编辑
    Submit: function() {
      this.$refs.Form.validate(valid => {
        console.log(this.Form.sortOrder);
        if (valid) {
          this.$confirm("确认提交吗？", "提示", {})
            .then(() => {
              this.addLoading = true;

              this.formData.append("creatorId", 1);
              this.formData.append("tenantCode", "1");
              this.formData.append("id", this.Form.id);
              this.formData.append(
                "leafColumnId",
                this.Form.leafColumnId[this.Form.leafColumnId.length - 1]
              );
              this.formData.append("type", this.Form.type);
              this.formData.append("sourceFrom", this.Form.sourceFrom);
              this.formData.append("sortOrder", this.Form.sortOrder);
              this.formData.append("summary", this.Form.summary);

              let headers = { "Content-Type": "multipart/form-data" };
              if (!this.Form.id) {
                video
                  .addVideo.r(this.formData, headers)
                  .then(res => {
                    this.addLoading = false;
                    // 重置
                    this.Form = {};
                    this.formData = new FormData();
                    this.VideoUrl = "";
                    this.FormVisible = false;
                    this.getVideos();
                  })
                  .catch(res => {
                    this.addLoading = false;
                    this.formData = new FormData();
                  });
              } else {
                // 编辑
                video
                  .updateVideo.r(this.formData, headers)
                  .then(res => {
                    this.addLoading = false;
                    // 重置
                    this.Form = {};
                    this.formData = new FormData();
                    this.VideoUrl = "";
                    this.FormVisible = false;
                    this.getVideos();
                  })
                  .catch(res => {
                    this.addLoading = false;
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
          video
            .batchDelete.r(params)
            .then(res => {
              this.listLoading = false;
              this.getVideos();
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
      this.getVideos();
    },

    // 上传表单change事件
    changpic() {
      let file = this.$refs.file.files[0];
      this.VideoUrl = window[window.URL ? 'URL' : 'webkitURL']['createObjectURL'](file);
      this.formData = new FormData(); // 这句话适用在提交失败，再次提交，更新icon
      this.formData.append("cover", file);   
    },

    //阻止upload的自己上传，进行再操作
    beforeUploadVideo(file) {
      const isLt10M = file.size / 1024 / 1024 < 100;
      if (
        [
          "video/mp4",
          "video/ogg",
          "video/flv",
          "video/avi",
          "video/wmv",
          "video/rmvb"
        ].indexOf(file.type) == -1
      ) {
        this.$message.error("请上传正确的视频格式");
        return false;
      }
      if (!isLt10M) {
        this.$message.error("上传视频大小不能超过100MB哦!");
        return false;
      }
      var windowURL = window.URL || window.webkitURL;
      this.VideoUrl = windowURL.createObjectURL(file);
      this.formData.append("cover", file);
      return false;
    },
    formatType(row, column, cellValue, index) {
      return this.dataDictsObject[cellValue];
    },
    formatLeafColumn(row, column, cellValue, index) {
      return this.keyValueColumns[cellValue];
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
    // 刷新
    renovate() {
      this.getDataDictList();
    }
  },
  watch: {
    VideoUrl: function(val) {
      this.Form.Video = val;
    }
  },
  created() {
    // 1、获取视频列表
    //this.getVideos();
    // 2、获取数据字典
    this.getDataDictList();
  }
};
</script>

<style lang="scss" scoped>
.el-dialog__body {
  .permitvideo {
    width: 100%;
  }
  .publisher {
    color: black;
    margin-top: 0;
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
</style>