<template>
	<div class="packet_item bg_fff mb30" :class="{isUsed:status==2,isPasted:status==3}"><!--isUsed:已使用 isPasted：已过期 -->
		<div class="price_box text_center">
			<p class="f40 font_weight mb10">￥10</p>
			<p class="f20">满199减10元</p>
		</div>
		<div class="packet_mess">
			<p class="f28 mb15">满199减10元</p>
			<p class="f22 c_666 mb10">适用范围：<span class="c_main">全场通用</span></p>
			<p class="f22 c_666">有效期至：2018-03-08</p>
		</div>
		<div class="packet_handler" v-if="status==1">立即使用</div>
		<div class="packet_handler" v-if="status==2">已使用</div>
		<div class="packet_handler" v-if="status==3">已过期</div>
	</div>
</template>

<script>
	export default{
		props:{
			status:{
				default:1
			}
		}
	}
</script>

<style scoped lang="less">
@import (reference) '~src/style/all.less';
.packet_item{
	position:relative;
	height: 1.8rem;
	.flex;
	.flex_center;
	.box_shadow(0px 0px 0.2rem #f1f1f1);
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
	.price_box{
		flex-shrink:0;
		width: 1.8rem;
		height: 1.8rem;
		margin-right: 0.3rem;
		padding-top: 0.44rem;
		.gradient_v(#fe9772,#fb7d68);
		background-size: 100% 100%;
		color: #fff;
		.font_weight{
			font-weight: bold;
		}
	}
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
	&.isPasted,&.isUsed{
		.packet_mess p,.packet_mess .c_main{
			.c_999;
		}
	}
	&.isPasted .packet_handler{
		color: #cbcbcb!important;
	}
	&.isUsed .packet_handler{
		.c_999;
	}
	&.isPasted{
		.price_box{
			background: #cfcfcf;
		}
	}
	&.isUsed{
		.price_box{
			.gradient_v(#ffcdba,#fdbdb4);
		}
	}
}
</style>