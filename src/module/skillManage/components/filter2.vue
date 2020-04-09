<template>
	<div class="l_filter_box" v-if="isShow">
		<div class="clearfix">
			<p class="pull_left f28 wid98">状态</p>
			<ul class="pull_left">
				<li :class="{'active':status=='DownPayment'}" @click="status='DownPayment'">已付定金</li>
				<li :class="{'active':status=='PaidInFull'}" @click="status='PaidInFull'">确认付款</li>
				<li :class="{'active':status=='Refunding'}" @click="status='Refunding'">已申请退款</li>
				<li :class="{'active':status=='RejectRefund'}" @click="status='RejectRefund'">已驳回退款</li>
				
			</ul>
		</div>
		<div class="l_filter_btn flex justify_center">
			<a class="btn_border gray_border mlr10" href="javascript:void(0);" @click="status=''">重置</a>
			<a class="btn mlr10" href="javascript:void(0);" @click="affirmBtn">确认</a>
		</div>
	</div>
</template>

<script>
	export default{
		data(){
			return{
				isShow:false,
				status:'',//状态
			}
		},
		props:{
			top:{
				default:0
			}
		},
		methods:{
			show(){
				this.isShow = true;
			},
			hide(){
				this.isShow = false;
			},
			affirmBtn(){//状态确认按钮
				this.$emit('skillHaveAffirm');
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