<template>
  <section>
    <!-- 顶部工具栏 -->
    <el-col :span="24" class="toolbar toptoolbar" style="padding-bottom: 0px;">
      <el-form :inline="true" @submit.native.prevent>
        <div class="left">
          <Button v-has="[user.addUser]" style="marginRight: 15px" url="./static/images/add.png" @click.native="handleAdd">添加用户</Button>
          <Button
            v-has="[user.batchDelete]"
            url="./static/images/remove.png"
            @click.native="batchRemove"
            type="danger"
            :disabled="this.sels.length===0"
          >批量删除</Button>
        </div>

        <div class="right" v-has="[user.getUsers]">
          <el-input class="top" @keyup.enter.native="handleSearch" style="width: 200px;marginRight: 17px;" v-model="realName" placeholder="请输入用户名"></el-input>
          <Button
            url="./static/images/search.png"
            @click.native="handleSearch"
          >查询</Button>
        </div>
        
      </el-form>
    </el-col>

    <!-- 列表-->
    <el-table
      class="usermanage"
      :data="users"
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
            <el-form-item label="用户名">
              <span>{{ props.row.account }}</span>
            </el-form-item>
            <el-form-item label="手机号">
              <span>{{ props.row.mobileTel }}</span>
            </el-form-item>
            <el-form-item label="昵称">
              <span>{{ props.row.nickname }}</span>
            </el-form-item>
            <el-form-item label="证件类型">
              <span>{{ props.row.certificateType == 1 ? '身份证' : '其他' }}</span>
            </el-form-item>
            <el-form-item label="真实姓名">
              <span>{{ props.row.realName }}</span>
            </el-form-item>
            <el-form-item label="证件号码">
              <span>{{ props.row.certificateNo }}</span>
            </el-form-item>
            <el-form-item label="性别">
              <span>{{ props.row.gender ? "男" : "女" }}</span>
            </el-form-item>
            <el-form-item label="地址">
              <span>{{ props.row.address }}</span>
            </el-form-item>
            <el-form-item label="出生日期">
              <span>{{ props.row.birthday }}</span>
            </el-form-item>
            <el-form-item label="备注">
              <span>{{ props.row.remark }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column prop="realName" label="真实姓名" align="center"></el-table-column>
      <el-table-column prop="gender" label="性别" align="center" :formatter="formatGender"></el-table-column>
      <el-table-column prop="mobileTel" label="手机号" align="center"></el-table-column>
      <el-table-column prop="certificateType" label="证件类型" align="center" :formatter="formatCertificateType"></el-table-column>
      <el-table-column prop="certificateNo" label="证件号码" align="center"></el-table-column>
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
      <el-table-column label="操作" width="230" align="right">
        <template scope="scope">
          <Handle
            v-has="[userrole.insertRole]"
            url="./static/images/edit.png"
            @click.native="handleAuthorization(scope.$index, scope.row)"
          >选择角色</Handle>
          <Handle
            v-has="[user.updateUser]"
            url="./static/images/edit.png"
            @click.native="handleEdit(scope.$index, scope.row)"
          >编辑</Handle>
          <Handle
            v-has="[user.deleteUser]"
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
        <el-form-item label="用户名:" prop="account">
          <el-input v-model="Form.account" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="昵称:" prop="nickname">
          <el-input v-model="Form.nickname" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="真实姓名:" prop="realName">
          <el-input v-model="Form.realName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="性别:" prop="gender" class="gender">
          <el-radio-group v-model="Form.gender">
            <el-radio :label="1">男</el-radio>
            <el-radio :label="0">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="出生日期:" prop="birthday">
          <el-date-picker
            v-model="Form.birthday"
            type="date"
            placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="密码:" prop="pwd" v-if="!Form.id">
          <el-input type="password" v-model="Form.pwd" auto-complete="off"></el-input>
        </el-form-item>
        
        <el-form-item label="手机号:" prop="mobileTel">
          <el-input v-model="Form.mobileTel" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="证件类型:" prop="certificateType">
          <el-select v-model="Form.certificateType" placeholder="请选择证件类型" >
            <el-option :value="1" label="身份证"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="证件号码:" prop="certificateNo">
          <el-input v-model="Form.certificateNo" auto-complete="off"></el-input>
        </el-form-item>
        
        <el-form-item label="地址:" prop="address">
          <el-input v-model="Form.address" auto-complete="off"></el-input>
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

    <!-- 用户角色授权页面-->
    <el-dialog
      title="用户授权"
      :visible.sync="authorizationVisible"
      :close-on-click-modal="false"
    >
      <el-transfer 
        filterable 
        filter-placeholder="请输入角色名"
        :titles="['未有角色', '已有角色']"
        :button-texts="['移除角色', '添加角色']"
        @change="handleChange"
        v-model="haveRole" 
        :data="allRole">
      </el-transfer>

      <div slot="footer" class="dialog-footer">
        <el-button @click.native="authorizationVisible = false">取消</el-button>
        <el-button type="primary" @click.native="Authorization" :loading="addLoading">提交</el-button>
      </div>
    </el-dialog>
  </section>
</template>

<script>
import { user, role, userrole } from "@/api/api";
import Handle from "@/components/Handle";
import Button from "@/components/Button";
export default {
  components: {
    Handle,
    Button,
  },
  data() {
    var aCity={11:"北京",12:"天津",13:"河北",14:"山西",15:"内蒙古",21:"辽宁",22:"吉林",23:"黑龙江",31:"上海",32:"江苏",33:"浙江",34:"安徽",35:"福建",36:"江西",37:"山东",41:"河南",42:"湖北",43:"湖南",44:"广东",45:"广西",46:"海南",50:"重庆",51:"四川",52:"贵州",53:"云南",54:"西藏",61:"陕西",62:"甘肃",63:"青海",64:"宁夏",65:"新疆",71:"台湾",81:"香港",82:"澳门",91:"国外"} 
    // 身份证号码验证规则
    var certificateNoRule = (rule, value, callback) => {
      var iSum=0 ;
      var info="" ;
      if(!/^\d{17}(\d|x)$/i.test(value)) return callback(new Error("你输入的身份证长度或格式错误")); 
      console.log('xxx')
      value=value.replace(/x$/i,"a");
      if(aCity[parseInt(value.substr(0,2))]==null) return callback(new Error("你的身份证地区非法"));
      var sBirthday=value.substr(6,4)+"-"+Number(value.substr(10,2))+"-"+Number(value.substr(12,2));
      var d=new Date(sBirthday.replace(/-/g,"/")) ;
      if(sBirthday!=(d.getFullYear()+"-"+ (d.getMonth()+1) + "-" + d.getDate())) callback(new Error("身份证上的出生日期非法")); 
      for(var i = 17;i>=0;i --) iSum += (Math.pow(2,i) % 11) * parseInt(value.charAt(17 - i),11) ;
      if(iSum%11!=1) return callback(new Error("你输入的身份证号非法"))
      return callback();
    }
    // 手机号码验证规则
    var mobileTelRule = (rule, value, callback) => {
      if(!(/^1[34578]\d{9}$/.test(value))) {
        callback(new Error('手机号码格式不正确'));
      } else {
        callback();
      }
    }
    // 真实姓名验证规则
    var realNameRule = (rule, value, callback) => {
      if(!(/^[\u4e00-\u9fa5]{2,4}$/.test(value))) {
        callback(new Error('姓名格式不正确'));
      } else {
        callback();
      }
    }
    return {
      userrole, // api对象
      currentUser: {},
      allRole: [],
      haveRole: [],
      authorizationVisible: false,
      user, // api 对象
      FormRules: {
        account: [{ required: true, message: "请输入用户名", trigger: "blur" }],
        nickname: [{ required: true, message: "请输入昵称", trigger: "blur" }],
        pwd: [{ required: true, message: "请输入密码", trigger: "blur" }],
        mobileTel: [{ validator: mobileTelRule, trigger: "blur" }],
        certificateNo: [{ validator: certificateNoRule, trigger: "blur" }],
        realName: [{ validator: realNameRule, trigger: "blur" }],
        birthday: [{ required: true, message: "请选择出生日期", trigger: "blur" }],
        address: [{ required: true, message: "请输入地址", trigger: "blur" }],
        remark: [{ required: true, message: "请输入备注", trigger: "blur" }],
      },
      Form: {},
      FormVisible: false, // 界面是否显示
      addLoading: false,

      realName: '', // 查询条件，用户真实名
      emptyContent: "暂无数据",
      users: [],
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
    // 获取所有用户
    getUsers() {
      this.listLoading = true;
      let params = {
        pageSize: this.pageSize,
        pageNum: this.pageNum,
        tenantCode: "1",
        realName: this.realName.replace(/\s+/g,""),
      };
      user
        .getUsers.r(params)
        .then(res => {
          let result = res.data.data;
          this.users = result.datas;
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
      // 1. 拿到haveRole 和当前角色currentRole 调用接口授权
      this.addLoading = true;
      let params = {
        userId: this.currentUser.id,
        roleIds: this.haveRole,
      }
      userrole.insertRole.r(params).then(res => {
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
                user
                  .addUser.r(this.Form)
                  .then(res => {
                    this.addLoading = false;
                    this.Form = {};
                    this.FormVisible = false;
                    this.getUsers();
                  })
                  .catch(res => {
                    this.addLoading = false;
                  });
              } else {
                // 编辑
                this.Form.updId = 0;
                user
                  .updateUser.r(this.Form)
                  .then(res => {
                    this.addLoading = false;
                    this.getUsers();
                    this.FormVisible = false;
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
      this.getUsers();
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.getUsers();
    },
    // 添加
    handleAdd: function() {
      this.Form = {
        gender: 1,
        certificateType: 1,
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
          article
            .batchDelete(params)
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
      this. pageNum = 1;
      this.getUsers();
    },
    // 授权
    handleAuthorization(index, row) {
      this.currentUser = row;
      // 1. 获取当前用户已拥有的角色列表 复制给allRole
      let params = {
        id: row.id,
      }
      userrole.getUserRole.r(params).then(res => {
        this.haveRole = res.data.map(role => {
          return role.roleId;
        })
        let params = {
          pageSize: 1000,
          pageNum: 1,
          tenantCode: "1",
        };
        // 2. 获取所有角色列表 复制给haveRole
        return role.getRoles.r(params);
      }).then(res => {
        this.allRole = res.data.data.datas.map(role => {
          return {key: role.id, label: role.roleName,}
        })
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
          user
            .deleteUser.r(params)
            .then(res => {
              this.listLoading = false;
              this.getUsers();
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
      this.Form.certificateType = parseInt(this.Form.certificateType);
      this.Form.gender = parseInt(this.Form.gender);
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
        realName: row.realName,
      }
      user
        .updateUser.r(params)
        .then(res => {    
          this.getUsers();
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
      this.getUsers();
    },
    formatGender(row, column, cellValue, index) {
      return cellValue == 1 ? '男' : '女'
    },
    formatCertificateType(row, column, cellValue, index) {
      return cellValue == 1 ? '身份证' : '其他'
    },

  },
  created() {
    this.getUsers()
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
