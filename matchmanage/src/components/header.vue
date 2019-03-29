<template>
	<el-col :span="24" class="header">
		<el-col :span="10" class="logo" :class="collapsed?'logo-collapse-width':'logo-width'">
			{{collapsed?'':sysName}}
		</el-col>
		<el-col :span="10">
			<div class="tools" @click.prevent="collapse">
				<i class="fa fa-align-justify"></i>
			</div>
		</el-col>
		<el-col :span="4" class="userinfo">
			<el-dropdown trigger="hover">
				<span class="el-dropdown-link userinfo-inner"><img :src="this.sysUserAvatar" /> {{sysUserName}}</span>
				<el-dropdown-menu slot="dropdown">
					<el-dropdown-item>我的消息</el-dropdown-item>
					<el-dropdown-item>设置</el-dropdown-item>
					<el-dropdown-item divided @click.native="logout">退出登录</el-dropdown-item>
				</el-dropdown-menu>
			</el-dropdown>
		</el-col>
	</el-col>
</template>

<script>
	export default {
			name: 'headers',
			data () {
			return {

			}
		},
		mounted() {
		var user = sessionStorage.getItem('user');
		if (user) {
			user = JSON.parse(user);
			this.sysUserName = user.name || '';
			this.sysUserAvatar = user.avatar || '';
		}

	},
	}

</script>

<style lang="scss" type="text/css">
	.heade {
		position: fixed;
		display: flex;
		width: 100%;
		height: @header-height;
		background: #fff;
		text-align: center;
		line-height: @header-height;
		box-shadow: 0 2px 10px #D8D8D8;
		top:0;
		left: 0;
		z-index: 10; 
	.menu {
		flex: 0 0 @header-height;
		font-size: @icon-font-size;
	}
	.title {
		flex: 1;
		font-size: @title-font-size;
	}
	.write {
		flex: 0 0 @header-height;
		font-size: @icon-font-size;
	}
}
</style>
