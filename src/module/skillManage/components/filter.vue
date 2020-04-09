<template>
	<div class="l_filter_box" v-if="isShow">
		<div class="clearfix">
			<p class="pull_left f28 wid98">品类</p>
			<ul class="pull_left">
				<li v-for="item in list" :class="{'active':skillSubCategory==item.skillSubCategory}" @click="clickSkill(item.skillSubCategory)">{{item.skillName}}</li>
			</ul>
		</div>
		<div class="clearfix">
			<p class="pull_left f28 wid98">性别</p>
			<ul class="pull_left">
				<li :class="{'active':gender==''}" @click="gender=''">不限</li>
				<li :class="{'active':gender=='male'}" @click="gender='male'">男</li>
				<li :class="{'active':gender=='Female'}" @click="gender='Female'">女</li>
			</ul>
		</div>
		<div class="clearfix">
			<p class="pull_left f28 wid98">距离</p>
			<ul class="pull_left">
				<li :class="{'active':distance==''}" @click="distance=''">不限</li>
				<li :class="{'active':distance=='5'}" @click="distance='5'">5公里内</li>
				<li :class="{'active':distance=='10'}" @click="distance='10'">10公里内</li>
			</ul>
		</div>
		<div class="l_filter_btn flex justify_center">
			<a class="btn_border gray_border mlr10" href="javascript:void(0);" @click="resetBtn">重置</a>
			<a class="btn mlr10" href="javascript:void(0);" @click="affirmBtn">确认</a>
		</div>
	</div>
</template>

<script>
	export default{
		data(){
			return{
				isShow:false,//是否显示弹窗
				skillSubCategory:0,   //品类
				gender:'',   //性别
				distance:'', //距离
			}
		},
		props:{
			top:{
				default:0
			},
			list:{
				default:Array
			}
		},
		methods:{
			show(){//该组件显示
				this.isShow = true;
			},
			hide(){//该组件隐藏
				this.isShow = false;
			},
			clickSkill(id){//点击品类
				if(this.skillSubCategory == id){
					this.skillSubCategory = 0;
				}else{
					this.skillSubCategory = id;
				}
			},
			resetBtn(){//重置
				this.skillSubCategory = 0;//品类
				this.gender  = ''; //性别
				this.distance = '';//距离
			},
			affirmBtn(){//确认
				this.$emit('skillAffirm');
			}
		}
	}
</script>

<style lang="less" scoped>
@import (reference) '~src/style/all.less';
.wid98{
	width: 0.98rem;
}
.l_filter_box{
	position: absolute;
	left: 0;
	right: 0;
	top:0.81rem;
	background: #fff;
	padding: 0.4rem 0.3rem;
	line-height: 0.66rem;
	ul{
		width: 5.8rem;
	}
	li{
		display: block;
		float: left;
		width: 1.62rem;
		margin-right: 0.3rem;
		margin-bottom: 0.3rem;
		background: #f3f3f3;
		.border(#f3f3f3);
		.border-radius(0.04rem);
		line-height: 0.64rem;
		text-align: center;
		.c_666;
		&.active{
			border-color: #ff8280;
			background-color: #ffefef;
			.c_main;
		}
	}
}
.l_filter_btn{
	.btn_border{
		.c_999;
	}
	.btn,.btn_border{
		padding: 0.1rem 0.7rem;
	}
}
</style>