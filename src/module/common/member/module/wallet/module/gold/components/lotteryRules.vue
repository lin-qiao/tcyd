<!--抽奖活动规则-->
<template lang="html">
	<div class="shade">
		<div class="panel">
			<div class="panel_head">
				<img src="../../../images/lottery_panel_tit.png" class="head_bg"/>
				<img src="../../../images/lottery_tit_rules.png" alt="" class="head" />
			</div>
			<div class="panel_body" v-html="rules"></div>
		</div>
		<div class="btn_close" @click="closeLotteryRules">
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
    		default:"1、活动时间：2018年4月20日至2018年8月3日；</br>2、活动规则：大德通用户每日签到获得5次抽奖机会，抽奖所获得的商品包括会员、优惠卷、云食堂商品等，领取商品需自行填写下单地址，虚拟物品抽取后自动存入用户个人中心-优惠卷内请自行查看，此活动仅针对大德通平台用户如出现通过不正当手段获得礼品，一经发现，撤销机会。</br>3、活动最终解释权归大德通所有。"
    	}
    },
    methods:{
    	//关闭活动规则弹窗
    	closeLotteryRules(){
    		this.$emit("closeLotteryRules");
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
	width: 5.95rem;
}
.panel_head{
	position: relative;
	width: 100%;
	height: 1rem;
	display: flex;
	justify-content: center;
	align-items: center;
	.head_bg{
		position: absolute;
		left: 0;
		bottom: 0;
		height: 1.27rem;
	}
	.head{
		height: 0.36rem;
	}
}
.panel_body{
	padding: 0.43rem 0.36rem 0.66rem;
	background-color: #fff;
	font-size: 0.26rem;
	line-height: 0.44rem;
	border-radius:0 0 0.2rem 0.2rem;
}
.btn_close{
	margin-top: 0.4rem;
	.iconfont{
		font-size: 0.5rem;
		color: #fff;
	}
}
</style>
