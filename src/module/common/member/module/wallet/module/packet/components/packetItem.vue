<template>
	<div >
		<div class="packet_item bg_fff mb30" :class="{isUsed:item.usageState=='Y',isPasted:item.usageState=='G'}" v-for="item in list"><!--isUsed:已使用 isPasted：已过期 -->
			<div class="price_box f40 text_center">{{item.redMoney}}</div>
			<div class="packet_mess">
				<p class="f28 mb15">{{item.rname}}</p>
				<p class="f22 c_666 mb10">适用范围：<span class="c_main">{{item.usingRangeStr}}</span></p>
				<p class="f22 c_666">有效期至：{{item.endTime|date('yyyy-MM-dd')}}</p>
			</div>
			<router-link to="/demandManage" class="packet_handler" v-if="item.usageState=='K'">立即使用</router-link>
			<div class="packet_handler" v-else-if="item.usageState=='Y'">已使用</div>
			<div class="packet_handler" v-else>已过期</div>
		</div>
	</div>
</template>

<script>
	export default{
		props:{
			list:{
				default:Array
			}
		}
	}
</script>

<style scoped lang="less">
@import (reference) '~src/style/all.less';
.packet_item{
	height: 1.8rem;
	padding-left:0.38rem;
	.flex;
	.flex_center;
	.box_shadow(0px 0px 0.2rem #f1f1f1);
	.price_box{
		flex-shrink:0;
		width: 1.04rem;
		height: 1.3rem;
		margin-right: 0.68rem;
		padding-top: 0.72rem;
		background: url(../images/packet_bg.png) center;
		background-size: 100% 100%;
		font-weight: bold;
		color: #f7f7f7;
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
		color: #fa7847;
		.f24;
	}
	&.isPasted,&.isUsed{
		.packet_mess p,.packet_mess .c_main,.packet_handler{
			.c_999;
		}
	}
	&.isPasted{
		.price_box{
			background-image: url(../images/packet_bg_gray.png);
		}
	}
	&.isUsed{
		.price_box{
			background-image: url(../images/packet_bg_pink.png);
		}
	}
}
</style>