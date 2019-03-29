<template>
  <section>
    <!-- 顶部工具栏 -->
    <el-col :span="24" class="toolbar toptoolbar" style="padding-bottom: 0px;">
      <el-form :inline="true" @submit.native.prevent>
        <div class="left">
          <Button v-has="[resource.addResource]" style="marginRight: 15px" url="./static/images/add.png" @click.native="handleAdd">添加资源</Button>
          <Button 
            v-has="[resource.batchDelete]"
            url="./static/images/remove.png"
            @click.native="batchRemove"
            type="danger"
            :disabled="this.sels.length===0"
          >批量删除</Button>
        </div>

        <div class="right" v-has="[resource.getResources]">
          <span class="label">权限类型</span>
          <el-select v-model="type" placeholder="请选择权限类型">
            <el-option label="不限" :value="null"></el-option>
            <el-option label="路由权限" :value="1"></el-option>
            <el-option label="资源权限" :value="2"></el-option>
          </el-select>
          <el-input class="top" @keyup.enter.native="handleSearch" style="width: 200px;marginRight: 17px;" v-model="resourceName" placeholder="请输入资源名"></el-input>
          <Button
            url="./static/images/search.png"
            @click.native="handleSearch"
          >查询</Button>
        </div>
        
      </el-form>
    </el-col>

    <!-- 列表-->
    <el-table
      class="resourcemanage"
      :data="resources" 
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
      <!-- 可展开 -->
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="权限资源名">
              <span>{{ props.row.resourceName }}</span>
            </el-form-item>
            <el-form-item label="权限类型">
              <span>{{ props.row.type === 1 ? '路由权限' : '资源权限' }}</span>
            </el-form-item>
            <el-form-item label="父级菜单" v-if="!props.row.method">
              <span>{{ props.row.parentName || '空' }}</span>
            </el-form-item>
            <el-form-item label="请求类型" v-else>
              <span>{{ props.row.method }}</span>
            </el-form-item>
            <el-form-item label="状态">
              <span>{{ props.row.status === '1' ? '可用' : '禁用'}}</span>
            </el-form-item>
            <el-form-item label="路由地址" v-if="!props.row.method">
              <span>{{ props.row.route }}</span>
            </el-form-item>
            <el-form-item label="请求地址" v-else>
              <span>{{ props.row.url }}</span>
            </el-form-item>
            <el-form-item label="备注">
              <span>{{ props.row.remark }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column prop="type" label="权限类型" align="center" sortable>
        <template slot-scope="scope">
          <el-tag
            :type="scope.row.type === 1 ? '' : 'warning'"
            disable-transitions>
            {{ scope.row.type === 1 ? '路由权限' : '资源权限'}}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="resourceName" label="权限资源名" align="center"></el-table-column>
      <el-table-column prop="status" label="状态" align="center">
        <template slot-scope="scope">
          <el-tag
            closable
            @close="handleClose(scope.row)"
            :type="scope.row.status === '1' ? 'success' : 'danger'"
            disable-transitions>
            {{scope.row.status === '1' ? '可用' : '禁用'}}
          </el-tag>
        </template>
      </el-table-column>
      <!-- <el-table-column prop="resourceName" label="权限资源名" align="center"></el-table-column>
      <el-table-column prop="url" label="地址" align="center"></el-table-column>
      <el-table-column prop="type" label="权限类型" align="center"></el-table-column>
      <el-table-column prop="remark" label="备注" align="center"></el-table-column>
      <el-table-column prop="status" label="状态" align="center"></el-table-column> -->
      
      <el-table-column label="操作" >
        <template scope="scope">
          <Handle
            v-has="[resource.insertResource]"
            url="./static/images/edit.png"
            @click.native="handleEdit(scope.$index, scope.row)"
          >编辑</Handle>
          <Handle
            v-has="[resource.deleteResource]"
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
      :title="Form.id?'编辑用户':'添加用户'"
      :visible.sync="FormVisible"
      :close-on-click-modal="false"
      @closed="dialogClosed"
      
    >
      <el-form class="dialogform" :model="Form" label-width="80px" :rules="FormRules" ref="Form">
        <el-form-item label="权限类型:" prop="type" class="gender">
          <el-radio-group v-model="Form.type" :disabled="Form.id?true:false">
            <el-radio :label="1">路由</el-radio>
            <el-radio :label="2">资源</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="权限名:" prop="resourceName">
          <el-input v-model="Form.resourceName" auto-complete="off"></el-input>
        </el-form-item>
  
        <el-form-item label="父级路由:" prop="parentId" v-if="Form.type === 1">
          <el-select v-model="Form.parentId" placeholder="请选择父级路由">
            <el-option :value="null" label="一级路由"></el-option>
            <el-option
              v-for="(item, index) in routeAuth"
              :label="item.resourceName"
              :value="item.id"
              :key="index"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="路由地址:" prop="route" v-if="Form.type === 1">
          <el-input v-model="Form.route" auto-complete="off"></el-input>
        </el-form-item>

        <el-form-item label="请求方式:" prop="method" v-if="Form.type === 2">
          <el-select v-model="Form.method" placeholder="请选择请求方式">
            <el-option label="POST" value="POST"></el-option>
            <el-option label="GET" value="GET"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="请求地址:" prop="url" v-if="Form.type === 2">
          <el-input v-model="Form.url" auto-complete="off"></el-input>
        </el-form-item>
        

        <el-form-item label="备注:" prop="remark">
          <el-input v-model="Form.remark" auto-complete="off"></el-input>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="FormCancel">取消</el-button>
        <el-button type="primary" @click.native="Submit" :loading="addLoading">提交</el-button>
      </div>
    </el-dialog>

  </section>
</template>

<script>
import { resource } from "@/api/api";
import Handle from "@/components/Handle";
import Button from "@/components/Button";
export default {
  components: {
    Handle,
    Button,
  },
  data() {
    return {
      type: null, // 权限类型，用于查询
      routeAuth: [], // 路由权限数据
      resource, // 资源api
      FormRules: {
        route: [{ required: true, message: "请输入路由地址", trigger: "blur" }],
        url: [{ required: true, message: "请输入请求地址", trigger: "blur" }],
      },
      Form: {},
      FormVisible: false, // 界面是否显示
      addLoading: false,

      resourceName: '', // 查询条件，资源名
      emptyContent: "暂无数据",
      resources: [],
      sels: [],
      total: 0,
      pageNum: 1,
      pageSize: 10,
      listLoading: false,
    }
  },
  methods: {
    // 获取所有资源
    getResources() {
      let params = {
        pageSize: this.pageSize,
        pageNum: this.pageNum,
        tenantCode: "1",
        resourceName: this.resourceName.replace(/\s+/g,""),
        type: this.type,
      };
      this.listLoading = true;
      resource
        .getResources.r(params)
        .then(res => {
          let result = res.data.data;
          this.resources = result.datas;
          this.total = result.totalNum;
          this.listLoading = false;
        })
        .catch(res => {
          this.listLoading = false;
          this.emptyContent = "刷新";
        });
    },

    // 添加and编辑
    Submit: function() {
      this.$refs.Form.validate(valid => {
        if (valid) {
          this.$confirm("确认提交吗？", "提示", {}).then(
            () => {
              this.addLoading = true;
              this.Form.tenantCode = "1";
              if (!this.Form.id) {
                this.Form.creatorId = 1;
                resource
                  .addResource.r(Object.assign(this.Form, this.Form.type === 1 ? {method: '', url: '',} : {parentId: null, route: ''}))
                  .then(res => {
                    this.addLoading = false;
                    this.Form = {};
                    this.FormVisible = false;
                    this.getResources();
                  })
                  .catch(res => {
                    this.addLoading = false;
                  });
              } else {
                // 编辑
                this.Form.updId = 0;
                resource
                  .updateResource.r(this.Form)
                  .then(res => {
                    this.addLoading = false;
                    this.FormVisible = false;
                    this.getResources();
                  })
                  .catch(res => {
                    this.addLoading = false;
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
      this.Form = {};
      this.FormVisible = false;
    },

    selsChange: function(sels) {
      this.sels = sels;
    },
    handleCurrentChange(val) {
      this.pageNum = val;
      this.getResources();
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.getResources();
    },
    // 添加
    handleAdd: function() {
      let params = {
        pageSize: 1000,
        pageNum: 1,
        tenantCode: "1",
      };
      resource
        .getResources.r(params)
        .then(res => {
          let result = res.data.data;
          this.routeAuth = result.datas.filter(resource => resource.type === 1); 
          this.FormVisible = true;
          // 直接初始化数据，便于切换添加类型的时候的重置
          this.Form = { 
            type: 1, 
            resourceName: '',
            parentId: null,
            method: "POST",
            url: '',
            route: '',
            remark: '',
          }
        })
        .catch(res => {
        });
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
          resource
            .batchDelete.r(params)
            .then(res => {
              this.listLoading = false;
              this.getResources();
            })
            .catch(res => {
              this.listLoading = false;
            });
        })
        .catch(() => {});
    },
    // 搜索
    handleSearch: function () {
      this. pageNum = 1;
      this.getResources(); 
    },
    // 删除
    handleDel: function(index, row) {
      this.$confirm("确认删除该记录吗?", "提示", {
        type: "warning"
      }).then(
        () => {
          this.listLoading = true;
          let params = { id: row.id, tenantCode: "1", updId: 0 };
          resource
            .deleteResource.r(params)
            .then(res => {
              this.listLoading = false;
              this.getResources();
            })
            .catch(res => {
              this.listLoading = false;
            });
        },
        () => {}
      );
    },
    // 编辑
    handleEdit: function(index, row) {
      let params = {
        pageSize: 1000,
        pageNum: 1,
        tenantCode: "1",
      };
      resource
        .getResources.r(params)
        .then(res => {
          let result = res.data.data;
          this.routeAuth = result.datas.filter(resource => resource.type === 1); 
          this.Form = Object.assign({}, row);
          this.FormVisible = true;
        })
        .catch(res => {
        });
    },

    handleClose(row) {
      console.log(row);
      let params = {
        tenantCode: '1',
        creatorId: '1',
        updId: 0,
        status: row.status === '1' ? '2' : '1',
        id: row.id,
        resourceName: row.resourceName,
      }
      resource
        .updateResource.r(params)
        .then(res => {    
          this.getResources();
        })
        .catch(res => {
        });
    },

    // 模态框关闭动画后的回调
    dialogClosed: function() {
      this.Form = {};
      this.$refs.Form.clearValidate();
    },
    // 刷新
    renovate() {
      // 1、重新调用 create 函数里面的方法
      this.getResources();
    },

  },
  watch: {
    'Form.type'(newValue, oldValue) {  
      // 权限类型来回切换，直接清空错误再初始化表单数据，
      if(oldValue) {
        this.$refs.Form.clearValidate();
        Object.assign(this.Form, {
          resourceName: '',
          parentId: null,
          method: "POST",
          url: '',
          route: '',
          remark: '',
        })
      }
    }
  },
  created() {
    this.getResources()
  }
}
</script>

<style scoped lang="scss">
  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 68px !important;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }

  
</style>
