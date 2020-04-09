<template>
    <div class="router_page bg_gray pb110">
        <top title="同城  <span	 class='title_circle'>●</span> 订单支付" :isReturn="false"></top>
        <div class="bg_fff pt10">
	        <div class="oil_pay_money">
	        	<span>支付金额</span>
	        	<span><em class="c_main f34">288</em>元</span>
	        </div>
	        <p class="f24 c_999 bg_gray plr30 ptb20">每月返现100元，连续返现6个月</p>
	        <div class="oil_pay_money navigate_right" @click="recordFn">
	        	充值明细
	        </div>
	        <div class="hei20 bg_gray"></div>
	    </div>
        <!--S 充值与账户支付-->
		<com-pay-recharge ref="comPayRecharge"></com-pay-recharge>
		<!--E 充值与账户支付-->
		<!--S 温馨提示-->
		<com-warm-prompt :code="code" :innerHtml="prompt" class="mt60"></com-warm-prompt>
		<!--E 温馨提示-->
		<div class="c_fixed_bottom">
		    <a href="javascript:void(0);" class="btn_block">确定支付￥188</a>
		</div>
		<!--S充值明细-->
		<call-oil ref="callOil"></call-oil>
		<!--E充值明细-->
    </div>
</template>
<script>
import comPayRecharge from "src/components/com-pay-recharge"//输入框
import comWarmPrompt from 'src/components/com-warm-prompt'; //温馨提示
import callOil from "../../../components/callOil"//温馨提示
export default {
    data() {
    	return {
    	    code:"",//温馨提示code 码
    	    prompt:"<p>充值后用于加油服务，仅支持加油卡服务或提现至加油卡；</p>" //温馨提示 文本内容  （兼容当前版本）后期将去掉
    	}
	},
	components: {
		comPayRecharge,
		comWarmPrompt,
		callOil
	},
	methods: {
		recordFn(){
			this.$refs.callOil.show();
		}
	}
}
</script>
<style lang="less" scoped>
@import (reference) "~src/style/all.less";
.c_ccc{
	color:#ccc;
}
.oil_pay_money{
	height:0.9rem;
	padding:0 0.3rem;
	display: flex;
	justify-content: space-between;
	align-items: center;
	.f28;
	.c_666;
}
</style>
