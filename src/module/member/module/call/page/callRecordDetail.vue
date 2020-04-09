<template>
    <div>
        <top title="手机消费详情" :isReturn="false"></top>
        <div class="oil_change_list">
        	<div>
        		<span>购买套餐：3个月</span>
        		<span>每月充值(元)：100元</span>
        		<span>加油卡：中石化-ZSH03554675467</span>
        	</div>
        	<a href="javascript:void(0);" class='btn plr24 ptb5'>更换油卡</a>
        </div>
        <div class="oil_refund_list">
        	<h3>
        		<span>2018-07-02  09:20</span>
        		<span>已返还</span>
        	</h3>
        	<div class="oil_refund_msg">
        		<div>
        			<span>1</span>
        			返还期数
        		</div>
        		<div>
        			<span>100</span>
        			返还金额(元)
        		</div>
        		<div>
        			<span>中石化-ZSH03554675467</span>
        			返还卡号
        		</div>
        	</div>
        </div>
        <div class="hei20 bg_gray"></div>
        <div class="oil_refund_list">
        	<h3>
        		<span>2018-07-02  09:20</span>
        		<span class="oil_btn">待返还</span>
        	</h3>
        	<div class="oil_refund_msg">
        		<div>
        			<span>1</span>
        			返还期数
        		</div>
        		<div>
        			<span>100</span>
        			返还金额(元)
        		</div>
        		<div>
        			<span>--</span>
        			返还卡号
        		</div>
        	</div>
        </div>
        <div class="hei20 bg_gray"></div>
    </div>
</template>
<script>
export default {
    
}
</script>
<style lang="less" scoped>
@import (reference) "~src/style/all.less";
.oil_change_list{
	background: #fcf1f1;
	height:1.3rem;
	padding:0 0.3rem;
	display: flex;
	align-items: center;
	span{
		font-size:0.26rem;
		color:@color;
		margin-right:0.3rem;
		line-height:0.5rem;
	}
}
.oil_refund_list{
	h3{
		display:flex;
		align-items: center;
		height:0.84rem;
		border-bottom:1px solid #e8e8e8;
		padding:0 0.3rem;
		justify-content: space-between;
		.f24;
		color:#666;
		.oil_btn{
			padding:0.1rem 0.3rem;
			background: #fcf1f1;
			.c_main;
			.f26;
			border-radius:0.6rem;
		}
	}
	.oil_refund_msg{
		display:flex;
		padding:0 0.3rem;
		justify-content: space-between;
		align-items: center;
		height:1.4rem;
		color:#888888;
		.f24;
		.text_center;
		span{
			display:block;
			margin-bottom:0.12rem;
			.c_333;
		}
	}
}
</style>
