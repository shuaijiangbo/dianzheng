<template>
	<section>
		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true" :model="filters">
				<el-form-item>
					<el-input v-model="filters.name" placeholder="姓名"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" icon="el-icon-search" v-on:click="getUserstext">查询</el-button>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="handleAdd" icon="el-icon-circle-plus-outline">新增</el-button>
				</el-form-item>
			</el-form>
		</el-col>

		<!--列表-->
		<el-table :data="users" highlight-current-row v-loading="listLoading" @selection-change="selsChange" border style="width: 100%;">
			<el-table-column type="selection" width="55">
			</el-table-column>
			<el-table-column prop="name" label="姓名" width="260">
			</el-table-column>
			<el-table-column prop="id" label="Code" width="280" sortable>
			</el-table-column>
			<el-table-column prop="serviceName" label="性别" width="100" :formatter="formatSex" sortable>
			</el-table-column>
			<el-table-column prop="projectCode" label="年龄" width="180" sortable>
			</el-table-column>
			<el-table-column prop="state" label="生日" width="120" sortable>
			</el-table-column>
			<el-table-column prop="id" label="地址" min-width="180" sortable>
			</el-table-column>
			<el-table-column label="操作" width="200">
				<template scope="scope">
					<el-button size="small" @click="handleEdit(scope.$index, scope.row)" icon="el-icon-edit">编辑</el-button>
					<el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)" icon="el-icon-delete">删除</el-button>
				</template>
			</el-table-column>
		</el-table>

		<!--工具条-->
		<el-col :span="24" class="toolbar">
			<el-button type="danger" @click="batchRemove" :disabled="this.sels.length===0">批量删除</el-button>
			<el-pagination
					layout="total, sizes, prev, pager, next, jumper"
					@size-change="handleSizeChange"
					@current-change="handleCurrentChange"
					background
					:page-sizes="[10,20,30,40]"
					:page-size="pageSize"
					:total="total"
					style="float:right;">
			</el-pagination>
		</el-col>

		<!--编辑界面-->
		<el-dialog title="编辑"  :visible.sync="editFormVisible" :close-on-click-modal="false">
			<el-form :model="editForm" label-width="80px" :rules="editFormRules" ref="editForm">
				<el-form-item label="姓名" prop="name">
					<el-input v-model="editForm.name" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="状态">
					<el-radio-group v-model="editForm.state">
						<el-radio class="radio" :label="1">激活</el-radio>
						<el-radio class="radio" :label="0">挂起</el-radio>
					</el-radio-group>
				</el-form-item>

				<el-form-item label="是否总决赛">
					<el-radio-group v-model="editForm.isFinal">
						<el-radio class="radio" :label="1">是</el-radio>
						<el-radio class="radio" :label="0">否</el-radio>
					</el-radio-group>
				</el-form-item>

				<el-form-item label="开始时间">
					<el-date-picker type="date" placeholder="选择日期" v-model="editForm.startTime"></el-date-picker>
				</el-form-item>
				<el-form-item label="结束时间">
					<el-date-picker type="date" placeholder="选择日期" v-model="editForm.endTime"></el-date-picker>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="editFormVisible = false">取消</el-button>
				<el-button type="primary" @click.native="editSubmit" :loading="editLoading">提交</el-button>
			</div>
		</el-dialog>

		<!--新增界面-->
		<el-dialog title="新增"  :visible.sync="addFormVisible" :close-on-click-modal="false" >
			<el-form :model="addForm" label-width="80px" :rules="addFormRules" ref="addForm">
				<el-form-item label="姓名" prop="name">
					<el-input v-model="addForm.name" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="状态">
					<el-radio-group v-model="addForm.state">
						<el-radio class="radio" :label="1">激活</el-radio>
						<el-radio class="radio" :label="0">挂起</el-radio>
					</el-radio-group>
				</el-form-item>

				<el-form-item label="是否总决赛">
					<el-radio-group v-model="addForm.isFinal">
						<el-radio class="radio" :label="1">是</el-radio>
						<el-radio class="radio" :label="0">否</el-radio>
					</el-radio-group>
				</el-form-item>
				<!--<el-form-item label="年龄">
					<el-input-number v-model="addForm.age" :min="0" :max="200"></el-input-number>
				</el-form-item>-->

				<el-form-item label="开始时间">
					<el-date-picker type="date" placeholder="选择日期" v-model="addForm.startTime"></el-date-picker>
				</el-form-item>
				<el-form-item label="结束时间">
					<el-date-picker type="date" placeholder="选择日期" v-model="addForm.endTime"></el-date-picker>
				</el-form-item>
				<!--<el-form-item label="地址">
					<el-input type="textarea" v-model="addForm.addr"></el-input>
				</el-form-item>-->
				<!--<editors></editors>-->

					<Uediter :value="ueditor.value" :config="ueditor.config" ref="ue"></Uediter>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="addFormVisible = false">取消</el-button>
				<el-button type="primary" @click.native="addSubmit" :loading="addLoading">提交</el-button>
			</div>
		</el-dialog>
	</section>
</template>

<script>
	//vue富文本
	import editors from '../../components/ue';
    import { quillEditor } from 'vue-quill-editor'
	//百度富文本
    import Uediter from '../../components/ueditor';

	import util from '../../common/js/util';
    var qs = require('qs');

/*	import {  dataText,addtest,deletetest,updatetest} from '../../api/api';*/
	import { user} from '../../api/api';


	export default {
        components:{
            editors,
			Uediter
		},
		data() {
			return {
                content:null,
                editorOption:{},
				/*百度富文本*/
                ueditor: {
                    value: 'hello',
                },
				filters: {
					name: ''
				},
				users: [],
				total: 0,
                pageNum: 1,
                pageSize:10,
				listLoading: false,
				sels: [],//列表选中列

				editFormVisible: false,//编辑界面是否显示
				editLoading: false,
				editFormRules: {
					name: [
						{ required: true, message: '请输入姓名', trigger: 'blur' }
					]
				},
				//编辑界面数据
				editForm: {
					id: 0,
					name: '',
					sex: -1,
					age: 0,
					birth: '',
					addr: ''
				},

				addFormVisible: false,//新增界面是否显示
				addLoading: false,
				addFormRules: {
					name: [
						{ required: true, message: '请输入姓名', trigger: 'blur' }
					]
				},
				//新增界面数据
				addForm: {
					name: '',
					/*sex: -1,
					age: 0,*/
					birth: '',
					addr: ''
				}
			}
		},
		methods: {
            onEditorBlur(){//失去焦点事件
            },
            onEditorFocus(){//获得焦点事件
            },
            onEditorChange(){//内容改变事件
            },
			/*// 百度富文本*/
            returnContent () {
                this.dat.content = this.$refs.ue.getUEContent()
            },
			//性别显示转换
			formatSex: function (row, column) {
				return row.sex == 1 ? '男' : row.sex == 0 ? '女' : '未知';
			},
			handleCurrentChange(val) {
				this.pageNum = val;
				this.getUserstext();
			},
            handleSizeChange(val) {
                this.pageSize = val;
                this.getUserstext();
            },
			//获取用户列表
			getUsers() {
				let para = {
					page: this.page,
					name: this.filters.name
				};
				this.listLoading = true;
			/*	NProgress.start();*/
				getUserListPage(para).then((res) => {
					this.total = res.data.total;
					this.users = res.data.users;
					this.listLoading = false;
					/*NProgress.done();*/
				});
			},
            getUserstext(){
                let para = {
                    pageSize: this.pageSize,
                    pageNum: this.pageNum-1,
                    name: this.filters.name
                };
                this.listLoading = true;
                user.dataText(para).then((res)=>{
                    this.total = res.obj.totalElements;
                    this.users = res.obj.content;
				/*	this.users = res.data;*/
					this.listLoading = false;
				});
            },
			//删除
			handleDel: function (index, row) {
				this.$confirm('确认删除该记录吗?', '提示', {
					type: 'warning'
				}).then(() => {
					this.listLoading = true;
					let para = { userId: row.id };
                    /*para = new URLSearchParams(para);*/
             /*       para=qs.stringify(para);*/
                    user.deletetest(para).then((res) => {
						this.listLoading = false;

						this.$message({
							message: '删除成功',
							type: 'success'
						});
						this.getUserstext();
					});
				}).catch(() => {

				});
			},
			//显示编辑界面
			handleEdit: function (index, row) {
			    console.log(row);
				this.editFormVisible = true;
				this.editForm = Object.assign({},row);
			},
			//显示新增界面
			handleAdd: function () {
				this.addFormVisible = true;
				this.addForm = {
					name: '',
					/*sex: -1,*/
                    /*age: 0,*/
					/*birth: '',*/
					/*addr: ''*/
				};
			},
			//编辑
			editSubmit: function () {
				this.$refs.editForm.validate((valid) => {
					if (valid) {
						this.$confirm('确认提交吗？', '提示', {}).then(() => {
							this.editLoading = true;

							let para = Object.assign({}, this.editForm);

                            /*para.startTime = (!para.startTime || para.startTime == '') ? '' : util.formatDate.format(new Date(para.startTime), 'yyyy-MM-dd');
                            para.endTime = (!para.endTime || para.endTime == '') ? '' : util.formatDate.format(new Date(para.endTime), 'yyyy-MM-dd');*/
                            /*para = new URLSearchParams(para);*/
                            para=qs.stringify(para);
                            updatetest(para).then((res) => {
								this.editLoading = false;

								this.$message({
									message: '提交成功',
									type: 'success'
								});
								this.$refs['editForm'].resetFields();
								this.editFormVisible = false;
								this.getUserstext();
							});
						});
					}
				});
			},
			//新增
			addSubmit: function () {
				this.$refs.addForm.validate((valid) => {
					if (valid) {
						this.$confirm('确认提交吗？', '提示', {}).then(() => {
							this.addLoading = true;

							let para = Object.assign({}, this.addForm);
							/*para.startTime = (!para.startTime || para.startTime == '') ? '' : util.formatDate.format(new Date(para.startTime), 'yyyy-MM-dd');
                            para.endTime = (!para.endTime || para.endTime == '') ? '' : util.formatDate.format(new Date(para.endTime), 'yyyy-MM-dd');
                            para.matchId= 19976;*/
							/*para = new URLSearchParams(para);*/
                            user.addtest(para).then((res) => {
								this.addLoading = false;

								this.$message({
									message: '提交成功',
									type: 'success'
								});
								this.$refs['addForm'].resetFields();
								this.addFormVisible = false;
								this.getUserstext();
							});
						});
					}
				});
			},
			selsChange: function (sels) {
				this.sels = sels;
			},
			//批量删除
			batchRemove: function () {
				var ids = this.sels.map(item => item.id).toString();
				this.$confirm('确认删除选中记录吗？', '提示', {
					type: 'warning'
				}).then(() => {
					this.listLoading = true;
					let para = { ids: ids };
					batchRemoveUser(para).then((res) => {
						this.listLoading = false;

						this.$message({
							message: '删除成功',
							type: 'success'
						});
						this.getUsers();
					});
				}).catch(() => {

				});
			}
		},
	created() {
			/*this.getUsers();*/
			this.getUserstext();
		}
	}

</script>

<style lang="scss" type="text/scss">

</style>