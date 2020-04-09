<!--中奖了-->
<template lang="html">
	<div class="shade">
		<div class="panel">
			<img src="../../../images/lottery_bg_02.png" class="img_bg"/>
			<img src="../../../images/lottery_tit_success.png" alt="" class="head" />
			<div class="desc">
				<div class="thumb">
					<img :src="prizeInfo.prizeUrL" alt="" />
				</div>
				<p>恭喜您获得<span class="name">{{prizeInfo.prizeName}}</span>！</p>
			</div>
			<div class="btn_again" @click="lotteryAgain">再来一次</div>
		</div>
		<div class="btn_close" @click="closeLotterySuccess">
			<i class="iconfont icon-close2"></i>
		</div>
	</div>
</template>

<script>
export default {
	data(){
		return {
		}
	},
    props:{
    	prizeInfo:{
    		type:Object,
    		default:{}
    	}
    },
    methods:{
    	//关闭中奖了弹窗
    	closeLotterySuccess(){
    		this.$emit("closeLotterySuccess");
    	},
    	//再抽一次
    	lotteryAgain(){
    		this.$emit("lotteryAgain");
    	}
    }
}
</script>

<style lang="less" scoped>
@import (reference) '~src/style/all.less';
.shade{
	position: fixed;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	z-index: 20;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	background-color: rgba(0,0,0,0.6);
}
.panel{
	position: relative;
	width: 100%;
	.img_bg{
		width:100%; 
	}
	.head{
		position: absolute;
		left: 50%;
		right: 0;
		top: 0.24rem;
		margin-left: -1.21rem;
		height: 0.46rem;
	}
}
.desc{
	position: absolute;
	left: 0;
	right: 0;
	top: 1.18rem;
	display: flex;
	flex-direction: column;
	align-items: center;
	.thumb{
		display: flex;
		justify-content: center;
		align-items: center;
		width:1.7rem;
		height:1.7rem;
		border-radius: 0.1rem;
		border:0.04rem solid #ffb292;
		background-color:#fff;		
		img{
			width:1.3rem ;
			height: 1.3rem;
		}
	}
	p{
		margin-top: 0.1rem;
		line-height: 0.68rem;
		font-size: 0.34rem;
		color: #fff;
		.name{
			font-weight: bold;
			margin: 0 0.04rem;
		}
	}
}
.btn_again{
	position: absolute;
	left: 0;
	right: 0;
	top: 3.9rem;
	margin: 0 auto;
	width: 4.24rem;
	height: 0.72rem;
	background-color: #fff;
	border-radius:0.36rem;
	line-height: 0.72rem;
	text-align: center;
	font-size: 0.36rem;
	color: #ed3400;
}
.btn_close{
	.iconfont{
		font-size: 0.5rem;
		color: #fff;
	}
}
</style>
