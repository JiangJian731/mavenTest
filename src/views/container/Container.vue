<template>
	<el-row class="container-out">
		<el-col :span="24" style="height:100%;overflow: auto;">
			<el-row style="height:100%;overflow: auto;">
				<el-col :span="3"  class="nav-bar" >
					<div class="sys-name" style="width: 100%;">
						{{sysName}}
					</div>
					<el-menu :default-active="$route.path" id="navBar" class="el-menu-vertical-demo"
						background-color="#EFF2F7"  default-active="/" router>
						<template v-for="(item,itemIndex) in menus">
							<el-submenu :index="itemIndex + ''" v-if="item.submenu != ''">
								<template slot="title"><span style="font-size:16px;">{{item.name}}</span></template>
								<el-menu-item v-for="subItem, subItemIndex in item.submenu"
								:index="subItem.path" :key="subItem.path" >
									{{subItem.name}}
								</el-menu-item>
							</el-submenu>
							<el-menu-item v-else :index="item.path" >{{item.name}}</el-menu-item>
						</template>
					</el-menu>
		  	</el-col>
				<el-col :span="21"  style="background-color:#FFF;min-height:100%;">
					<el-row style="background-color:#FFF;">
					<el-col class="container-bar" :span="24" >

					


					</el-col>
						<el-col :span="24"  id="narBar-col">
							<div class="view-title">
								<el-breadcrumb separator="/" class="breadcrumb-inner breadcrumb">
									<el-breadcrumb-item v-for="item in $route.matched" v-if="item.name != null" :key="item.path">
										{{ item.name }}
									</el-breadcrumb-item>
								</el-breadcrumb>

							</div>
							<div class="router-view-panel">
								<transition name="el-fade-in">
									<router-view></router-view>
								</transition>
							</div>
						</el-col>

					</el-row>
				</el-col>

			</el-row>
	</el-col>
	</el-row>
</template>

<script src="./container.js"></script>
<style scoped lang="scss">
	@import '~scss_vars';
.container-out{
		min-width: 1500px;
		width: 100%;
		height:100%;
		overflow: auto;
		}
.container{
	width: 100%;
	height:100%;
	overflow: auto;
	}
	.sys-name{
		display: inline-block;

		height: 60px;
		background-color: #324057;
		color: #F9FAFC;
		font-size: 18px;
		line-height: 60px;
		text-align: center;

	}

	.nav-bar{

		min-height:100%;
		overflow: auto;
	}
	.el-menu-item {
		font-size: 16px;
	}


	.container-bar{
		height: 60px;
		background-color: #324057;

		.logout{
			display:inline-block;
			line-height:60px;
			width:100px;
			background-color:#A94741;
			color:#FFF;
			text-align:center;
			font-weight:600;
			font-size:16px;
			cursor:pointer;
		}
		.block{
			display:inline-block;
			line-height:60px;
			width:120px;
			margin-right: 20px;
			color:#FFF;
			text-align:center;
			font-weight:600;
			font-size:22px;
			cursor:pointer;
		}
	}
	.view-title{
		width: 100%;
		height: 80px;
		font-size: 30px;
		font-weight: 600;
		color: #444;
		padding: 20px 30px 10px 30px;

		box-sizing: border-box;

		.breadcrumb{

			font-size: 30px;
		}
	}






</style>
