<!--未中奖-->
<template lang="html">
	<div class="shade">
		<div class="panel">
			<img src="../../../images/lottery_bg_01.png" class="img_bg"/>
			<img src="../../../images/lottery_tit_failure.png" alt="" class="head" />
			<div class="desc">
				<img src="../../../images/icon_smile.png" alt="" />
				<p>很遗憾，您未中奖</p>
			</div>
			<div class="btn_again" @click="lotteryAgain">再来一次</div>
		</div>
		<div class="btn_close" @click="closeLotteryFailure">
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
    	rules:{
    		type:String,
    		default:""
    	}
    },
    methods:{
    	//关闭未中奖弹窗
    	closeLotteryFailure(){
    		this.$emit("closeLotteryFailure");
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
		margin-left: -1.25rem;
		height: 0.46rem;
	}
}
.desc{
	position: absolute;
	left: 0;
	right: 0;
	top: 1.18rem;
	text-align: center;
	img{
		width:1.16rem ;
		height: 1.16rem;
	}
	p{
		line-height: 0.68rem;
		font-size: 0.34rem;
		color: #fff;
	}
}
.btn_again{
	position: absolute;
	left: 0;
	right: 0;
	top: 3.38rem;
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
