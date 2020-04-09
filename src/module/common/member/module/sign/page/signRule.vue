<template>
	<div class="router_page bg_gray">
		<!--S 头部-->
		<top title="" :isReturn="false"></top><!--rightIcon="icon-liebiao"-->
		<!--E 头部-->
		<div class="plr30 pt30">
			<img class="l_sign_rule_img mb50" src="../images/rule.jpg" alt="" />
			<!--S 活动规则-->
			<h6 class="f38 mb60 font_weight">活动规则</h6>
			<div class="l_sign_con">
				<p>每日支付1元参与早起打卡，放入早起打卡鼓励金奖池。</p>
				<p>次日早晨5: 00-8: 00成为早起打卡时间，用户在期间进行打卡，成功打卡，可随机分当日奖池内全部鼓励金，奖金设置下限最低0.01元；不设上限。</p>
				<p>未在次日早晨5 : 00-8: 00内进行打卡  (例如:已过打卡时间)，视为打卡失败，打卡失败不可参与当日鼓励金的分配。</p>
				<p>每日瓜分金额于早8点后开始结算，当日</p>
			</div>
			<!--E 活动规则-->
		</div>
	</div>
</template>

<script>
</script>
<style lang="less" scoped>
.l_sign_rule_img{
	width: 100%;
}
.font_weight{
	font-weight: bold;
}
</style>
<style lang="less">
@import (reference) '~src/style/all.less';
.l_sign_con{
	p{
		position:relative;
		margin-bottom:0.56rem;
		padding-left:0.3rem;
		line-height:0.56rem;
		.f36;
		&:after{
			position:absolute;
			content: '●';
			left: 0;
			top: 0;
			font-size: 0.16rem;
		}
	}
}
</style>