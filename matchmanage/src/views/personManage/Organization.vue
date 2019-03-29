<template>
  <section>
    <!-- 顶部工具栏 -->
    <el-col :span="24" class="toolbar toptoolbar" style="padding-bottom: 0px;">
      <el-form :inline="true" @submit.native.prevent>
        <div class="left">
          <Button style="marginRight: 15px" url="./static/images/add.png" @click.native="handleAdd">添加组织</Button>
          <Button
            url="./static/images/remove.png"
            @click.native="batchRemove"
            type="danger"
            :disabled="this.selects.length===0"
          >批量删除</Button>
        </div>

        <div class="right">
          <el-input class="top" @keyup.enter.native="handleSearch" style="width: 200px;marginRight: 17px;" v-model="organizationName" placeholder="请输入组织名"></el-input>
          <Button
            url="./static/images/search.png"
            @click.native="handleSearch"
          >查询</Button>
        </div>
        
      </el-form>
    </el-col>

    <!-- 列表-->
    <el-table
      :data="organizations"
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
      <el-table-column prop="name" label="组织名称" align="center"></el-table-column>
      <el-table-column prop="province" label="省份" align="center"></el-table-column>
      <el-table-column prop="city" label="市级" align="center"></el-table-column>
      <el-table-column prop="address" label="详细地址" align="center"></el-table-column>
      <el-table-column prop="contact" label="联系方式" align="center"></el-table-column>
      <el-table-column prop="adminName" label="管理员姓名" align="center"></el-table-column>
      <!-- <el-table-column prop="adminCredentialsType" label="管理员证件类型" align="center"></el-table-column>
      <el-table-column prop="adminCredentialsNo" label="管理员证件号码" align="center"></el-table-column>
      <el-table-column prop="adminCredentialsFrontUrl" label="管理员证件照(正面)" align="center"></el-table-column>
      <el-table-column prop="adminCredentialsBackUrl" label="管理员证件照(背面)" align="center"></el-table-column> -->
      <el-table-column prop="uscc" label="统一社会信用代码" align="center" width="145"></el-table-column>
      <el-table-column prop="competitionType" label="竞赛类型" align="center"></el-table-column>
      <el-table-column label="操作" align="center" width="200">
        <template scope="scope">
          <Handle
            url="./static/images/edit.png"
            @click.native="handleEdit(scope.$index, scope.row)"
          >编辑</Handle>
          <Handle
            url="./static/images/delete.png"
            type="danger"
            @click.native="handleDel(scope.$index, scope.row)"
          >删除</Handle>
        </template>
      </el-table-column>
    </el-table>
  </section>
</template>

<script>
import Handle from "@/components/Handle";
import Button from "@/components/Button";
export default {
  components: {
    Handle,
    Button
  },
  data() {
    return {
      emptyContent: '暂无数据',
      organizationName: '',
      selects: [],
      organizations: [],
      listLoading: false,

    }
  },
  methods: {
    handleAdd() {

    },
    batchRemove() {

    },
    handleSearch() {

    },
    // 列表项选中事件
    selectsChange: function(selects) {
      this.selects = selects;
    },
    // 刷新
    renovate() {
      
    }

  }
}
</script>

<style scoped lang="scss">
</style>
