<template>
  <section>
    <!-- 顶部工具栏 -->
    <el-col :span="24" class="toolbar toptoolbar" style="padding-bottom: 0px;">
      <el-form :inline="true" @submit.native.prevent>
        <div class="left">
          <Button v-has="[role.addRole]" style="marginRight: 15px" url="./static/images/add.png" @click.native="handleAdd">添加角色</Button>
          <Button
            v-has="[role.batchDelete]"
            url="./static/images/remove.png"
            @click.native="batchRemove"
            type="danger"
            :disabled="this.sels.length===0"
          >批量删除</Button>
        </div>

        <div class="right" v-has="[role.getRoles]">
          <el-input class="top" @keyup.enter.native="handleSearch" style="width: 200px;marginRight: 17px;" v-model="roleName" placeholder="请输入角色名"></el-input>
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
      :data="roles"
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
      <el-table-column prop="roleName" label="角色名" align="center"></el-table-column>
      <el-table-column prop="remark" label="备注" align="center"></el-table-column>
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
      
      <el-table-column label="操作">
        <template scope="scope">
          <Handle
            v-has="[roleresource.insertResource]"
            url="./static/images/edit.png"
            @click.native="handleAuthorization(scope.$index, scope.row)"
          >授权</Handle>
          <Handle
            v-has="[role.updateRole]"
            url="./static/images/edit.png"
            @click.native="handleEdit(scope.$index, scope.row)"
          >编辑</Handle>
          <Handle
            v-has="[role.deleteRole]"
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
      :title="Form.id?'编辑角色':'添加角色'"
      :visible.sync="FormVisible"
      @closed="dialogClosed"
    >
      <el-form class="dialogform" :model="Form" label-width="140px" :rules="FormRules" ref="Form">
        <el-form-item label="角色名：" prop="roleName">
          <el-input v-model="Form.roleName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="状态:" prop="status" class="gender">
          <el-radio-group v-model="Form.status">
            <el-radio :label="'1'">可用</el-radio>
            <el-radio :label="'0'">不可用</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="备注：" prop="remark">
          <el-input v-model="Form.remark" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="FormCancel">取消</el-button>
        <el-button type="primary" @click.native="Submit" :loading="addLoading">提交</el-button>
      </div>
    </el-dialog>

    <!-- 角色授权页面-->
    <el-dialog
      title="角色授权"
      :visible.sync="authorizationVisible"
      :close-on-click-modal="false"
      @closed="auth_dialogClosed"
    >
      <!-- <el-transfer 
        filterable 
        filter-placeholder="请输入权限名"
        :titles="['未有权限', '已有权限']"
        :button-texts="['移除权限', '添加权限']"
        @change="handleChange"
        v-model="haveAuth_route" 
        :data="allAuth_route">
      </el-transfer> -->
      <div class="wrapper">
        <el-tag
          disable-transitions>
          路由权限
        </el-tag>
        <el-tree 
          ref="routeTree"
          :data="allAuth_route"
          show-checkbox
          node-key="id"
          :default-checked-keys="haveAuth_route"
          :props="defaultProps">
        </el-tree>
      </div>
      
      <div class="wrapper">
        <el-tag
          type="warning"
          disable-transitions>
          资源权限
        </el-tag>
        <el-tree
          ref="resourceTree"
          :data="allAuth_resource"
          show-checkbox
          node-key="id"
          :default-checked-keys="haveAuth_resource"
          :props="defaultProps">
        </el-tree>
      </div>
      


      <div slot="footer" class="dialog-footer">
        <el-button @click.native="authorizationVisible = false">取消</el-button>
        <el-button type="primary" @click.native="Authorization" :loading="addLoading">提交</el-button>
      </div>
    </el-dialog>

  </section>
</template>

<script>
import { role, roleresource, resource } from "@/api/api";
import util from "@/common/util.js"
import Handle from "@/components/Handle";
import Button from "@/components/Button";
export default {
  components: {
    Handle,
    Button,
  },
  data() {
    return {
      defaultProps: {
        children: 'children',
        label: 'resourceName'
      },
      currentRole: {},
      allAuth_route: [],
      haveAuth_route: [],
      allAuth_resource: [],
      haveAuth_resource: [],
      authorizationVisible: false,
      roleresource,
      role, 
      FormRules: {
        roleName: [{ required: true, message: "请输入角色名", trigger: "blur" }],
        remark: [{ required: true, message: "请输入备注", trigger: "blur" }],
      },
      Form: {},
      FormVisible: false, // 界面是否显示
      addLoading: false,

      roleName: '', // 查询条件，角色名
      emptyContent: "暂无数据",
      roles: [],
      sels: [],
      total: 0,
      pageNum: 1,
      pageSize: 10,
      listLoading: false,
    }
  },
  methods: {
    handleChange(value, direction, movedKeys) {
      console.log(value, direction, movedKeys);
    },
    // 获取所有角色
    getRoles() {
      let params = {
        pageSize: this.pageSize,
        pageNum: this.pageNum,
        tenantCode: "1",
        roleName: this.roleName.replace(/\s+/g,""),
      };
      this.listLoading = true;
      role
        .getRoles.r(params)
        .then(res => {
          let result = res.data.data;
          this.roles = result.datas;
          this.total = result.totalNum;
          this.listLoading = false;
        })
        .catch(res => {
          this.listLoading = false;
          this.emptyContent = "刷新";
        });
    },
    // 授权
    Authorization() {
      console.log(this.$refs.routeTree.getCheckedNodes(false, true))
      console.log(this.$refs.resourceTree.getCheckedKeys(true))
      // 1. 拿到haveAuth_route 和当前角色currentRole 调用接口授权
      this.addLoading = true;
      let params = {
        roleId: this.currentRole.id,
        resourceIds: this.$refs.routeTree.getCheckedNodes(false, true).map(item => item.id).concat(this.$refs.resourceTree.getCheckedKeys(true)),
      }
      roleresource.insertResource.r(params).then(res => {
        this.addLoading = false;
        this.authorizationVisible = false;
      }).catch(res => {
        this.addLoading = false;
      })
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
                role
                  .addRole.r(this.Form)
                  .then(res => {
                    this.addLoading = false;
                    this.Form = {};
                    this.FormVisible = false;
                    this.getRoles();
                  })
                  .catch(res => {
                    this.addLoading = false;
                  });
              } else {
                // 编辑
                this.Form.updId = 0;
                role
                  .updateRole.r(this.Form)
                  .then(res => {
                    this.addLoading = false;
                    this.FormVisible = false;
                    this.getRoles();
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
      this.getroles();
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.getroles();
    },
    // 添加
    handleAdd: function() {
      this.Form = {
        status: '1',
      }
      this.FormVisible = true;
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
          role
            .batchDelete.r(params)
            .then(res => {
              this.listLoading = false;
              this.getRoles();
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
      this.getRoles(); 
    },
    // 授权
    handleAuthorization(index, row) {
      this.currentRole = row;
      
      let params = {
        id: row.id,
      }
      // 1. 获取当前角色已有权限列表 复制给haveAuth_route
      roleresource.getRoleResource.r(params).then(res => {
        // this.haveAuth_route = res.data.map(resource => {
        //   return resource.resourceId;
        // })
        res.data.forEach(resource => {
          resource.type == 1 ? this.haveAuth_route.push(resource.resourceId) : this.haveAuth_resource.push(resource.resourceId);
        })
        let params = {
          pageSize: 1000,
          pageNum: 1,
          tenantCode: "1",
        };
        // 2. 获取所有权限列表 复制给allAuth_route
        return resource.getResources.r(params);
      }).then(res => {
        // this.allAuth_route = res.data.data.datas.map(resource => {
        //    return {key: resource.id, label: resource.resourceName,}
        // })
        // 1. 将权限分为路由权限和资源权限
        res.data.data.datas.forEach(item => {
          item.type == 1 ? this.allAuth_route.push(item) : this.allAuth_resource.push(item);
        });
        // 2. 将路由权限转为嵌套的父子结构
        this.allAuth_route = util.buildMenu(this.allAuth_route, 'parentId');
        // 3. 将资源权限转为嵌套的父子结构
        let allAuth_resource = this.allAuth_resource;

        let parentArr = this.allAuth_resource.map(resource => {
          return resource.resourceName.split('-')[0];
        })
        parentArr = [...new Set(parentArr)].map(resourceName => {
          return {resourceName}
        });  // [{resourceName: '内容管理'}, {resourceName: '权限管理'}]

        let findChildren = function (parentArray, index) {   
          parentArray.forEach(function(parent) {
            allAuth_resource.forEach(resource => {
              if(parent.resourceName == resource.resourceName.split('-')[index]) {
                if (parent.children) {
                  let isIndex = parent.children.findIndex(function (res) {
                    return res.resourceName == resource.resourceName.split('-')[index+1]
                  })
                  if(isIndex == -1) {
                    parent.children.push({id: resource.id, resourceName: resource.resourceName.split('-')[index+1]});
                  }
                } else {
                  parent.children = [{id: resource.id, resourceName: resource.resourceName.split('-')[index+1]}];
                }
              }
              if(parent.children && index+1 < 2) {
                findChildren(parent.children, index+1)
              }
            })
          })
          return parentArray;
        };
        parentArr = findChildren(parentArr, 0);
        this.allAuth_resource = parentArr;
        console.log(parentArr) // [{resourceName: 'xxx', children: [{resourceName: 'jj'}]}]
        this.authorizationVisible = true;
      })
      .catch(res => {
      })
    },
    // 删除
    handleDel: function(index, row) {
      this.$confirm("确认删除该记录吗?", "提示", {
        type: "warning"
      }).then(
        () => {
          this.listLoading = true;
          let params = { id: row.id, tenantCode: "1", updId: 0 };
          role
            .deleteRole.r(params)
            .then(res => {
              this.listLoading = false;
              this.getRoles();
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
      console.log(row)
      this.Form = Object.assign({}, row);
      this.FormVisible = true;
    },

    handleClose(row) {
      console.log(row);
      let params = {
        tenantCode: '1',
        creatorId: '1',
        updId: 0,
        status: row.status === '1' ? '0' : '1',
        id: row.id,
        roleName: row.roleName,
      }
      role
        .updateRole.r(params)
        .then(res => {    
          this.getRoles();
        })
        .catch(res => {
        });
    },

    // 模态框关闭动画后的回调
    dialogClosed: function() {
      this.Form = {};
      this.$refs.Form.clearValidate();
    },
    auth_dialogClosed() {
      this.haveAuth_route = [];
      this.allAuth_route = [];
      this.haveAuth_resource = [];
      this.allAuth_resource = [];
    },
    // 刷新
    renovate() {
      // 1、重新调用 create 函数里面的方法
      this.getRoles();
    },

  },
  created() {
    this.getRoles()
  }
}
</script>

<style scoped lang="scss">
  .wrapper {
    width: 50%;
    display: inline-block;
    float: left;
  }
  .el-tag {
    margin-bottom: 10px;
  }
</style>
