<!--记录-->
<template lang="html">
	<ul class="h_cash_list">
		<li class="h_item">
			<div class="tag">同城</div>
			<div class="price_box text_center">
				<p class="f40 font_weight mb10">￥10</p>
				<p class="f20">满199减10元</p>
			</div>
			<div class="packet_mess">
				<p class="f28 mb15">满199减10元</p>
				<p class="f22 c_666 mb10">有效期至2018-03-08</p>
				<p class="f22 c_666 mb10">剩余可抢：69%</p>
				<div class="progress">
					<div class="bar" style="width:69%"></div>
				</div>
			</div>
			<div class="btn btn_exchange">400金币兑换</div>
		</li>
		<li class="h_item">
			<div class="tag">众包</div>
			<div class="price_box text_center">
				<p class="f40 font_weight mb10">￥10</p>
				<p class="f20">满199减10元</p>
			</div>
			<div class="packet_mess">
				<p class="f28 mb15">满199减10元</p>
				<p class="f22 c_666 mb10">有效期至2018-03-08</p>
				<p class="f22 c_666 mb10">剩余可抢：69%</p>
				<div class="progress">
					<div class="bar" style="width:69%"></div>
				</div>
			</div>
			<div class="btn btn_use">立即使用</div>
		</li>
	</ul>
</template>

<script>
export default {
    props:{
    	
    },
    methods:{
        goDetail(){
            this.$emit("detailUrl")
        }
    }
}
</script>

<style lang="less" scoped>
@import (reference) '~src/style/all.less';
.h_cash_list{
	.price_box{
		flex-shrink:0;
		width: 1.8rem;
		height: 2.1rem;
		margin-right: 0.3rem;
		padding-top: 0.6rem;
		.gradient_v(#fe9772,#fb7d68);
		background-size: 100% 100%;
		color: #fff;
		.font_weight{
			font-weight: bold;
		}
	}
	.h_item{
		&:before,&:after{
			position: absolute;
			left:1.65rem;
			bottom:-0.15rem;
			content: '';
			width: 0.3rem;
			height: 0.3rem;
			background: #f5f5f5;
			.border-radius(50%);
		}
		&:before{
			top: -0.15rem;
		}
	}
}
.h_item{
	position:relative;
	height: 2.1rem;
	.flex;
	.flex_center;
	.box_shadow(0px 0px 0.2rem #f1f1f1);
	background-color:#fff;
	margin:0.3rem;
	.packet_mess{
		width: 2rem;
		flex-grow:1;
	}
	.packet_handler{
		flex-shrink:0;
		width: 0.87rem;
		height: 100%;
		.flex;
		.flex_center;
		.justify_center;
		border-left: 1px dashed #f2f2f2;
		letter-spacing:0.06rem;
		writing-mode:tb-rl;
		color: #ff633f;
		.f24;
	}
	.btn{
		min-width: 1.8rem;
		height: 0.6rem;
		padding: 0 0.1rem;
		line-height: 0.6rem;
		text-align: center;
		font-size: 0.26rem;
		margin-right: 0.1rem;
	}
	.btn_use{
		.gradient_v(#ffb848,#fda455);
	}
}
.tag{
	position: absolute;
	left: 0;
	top: 0;
	z-index: 1;
	width: 0.74rem;
	height: 0.42rem;
	border-radius:0 0.04rem 0.04rem 0;
	background-color: rgba(255,255,255,0.5);
	text-align: center;
	line-height: 0.42rem;
	font-size: 0.22rem;
	color: #fb7b67;
}
.progress{
	position: relative;
	width: 2.37rem;
	height: 0.07rem;
	background-color: #e8e8e8;
	border-radius:0.04rem;
	.bar{
		position: absolute;
		left: 0;
		top: 0;
		bottom: 0;
		border-radius:0.04rem;
		.gradient_v(#fd6a55,#ff4a48);
	}
}
</style>
