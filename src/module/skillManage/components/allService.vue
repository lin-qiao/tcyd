<template>
	<div class="l_filter_list" v-if="isShow">
		<ul>
			<li :class="{'active':serviceMethod==''}" @click="serviceMethod='';server()">全部服务</li>
			<!--<li :class="{'active':serviceMethod=='phone'}" @click="serviceMethod='phone';server()">电话咨询</li>-->
			<li :class="{'active':serviceMethod=='offline'}" @click="serviceMethod='offline';server()">线下咨询</li>
			<!--<li :class="{'active':serviceMethod=='video'}" @click="serviceMethod='video';server()">视频咨询</li>-->
			<li :class="{'active':serviceMethod=='online'}" @click="serviceMethod='online';server()">线上咨询</li>
		</ul>
	</div>
</template>

<script>
	export default{
		data(){
			return{
				isShow:false,
				serviceMethod:'',
			}
		},
		props:{
			top:{
				default:0
			}
		},
		methods:{
			server(){//服务点击方法
				this.$emit('skillServer');
			},
			show(){
				this.isShow = true;
			},
			hide(){
				this.isShow = false;
			}
		}
	}
</script>

<style lang="less" scoped>
@import (reference) '~src/style/all.less';
.l_filter_list{
	position: absolute;
	left: 0;
	right: 0;
	top:0.81rem;
	background: #fff;
	li{
		padding: 0 0.56rem;
		height: 0.8rem;
		.border-b(#e8e8e8);
		line-height: 0.79rem;
		font-size:0.26rem;
		&.active{
			.c_main;
		}
	}
}
</style>