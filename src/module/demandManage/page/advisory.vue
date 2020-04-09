<template>
	<div class="router_page bg_gray">
		<top :title="title" :isReturn="false"></top>
		<itemHead :userInfo="userInfo" :isShowDistance="false" class="bg_fff c_add_shadow"></itemHead>
		<div class="c_demandDetail_li border-n">
			<span><i class="c_left_line"></i>技能品类：工商注册</span>
			<span>视频咨询：1.00元/分钟</span>
		</div>
		<div class="hei20 bg_gray"></div>
		<div class="c_back_gauge">
			<div class="c_demandDetail_li">
				<span>咨询时间</span>
				<span>
					<input type="text" placeholder="请输入咨询时间" autocomplete="off"/> 分钟
				</span>
			</div>
			<div class="c_demandDetail_li">
				<span>所需金额</span>
				<span>
					<em class="c_main">50.00</em>元
				</span>
			</div>
			<div class="c_demandDetail_li">
				<span>账户余额</span>
				<span>
					<em class="c_main">5.00</em>元
				</span>
			</div>
			<div class="c_demandDetail_li rel">
				<span>使用红包</span>
				<span class="navigate_right pr30">
					<em class="c_main">10.00</em>元
				</span>
			</div>
		</div>
		<p class="c_main mt20 pl30">预计扣款:35.00元</p>
		<a href="javascript:void(0);" class='btn_block mtb40'>开始咨询</a>
		<com-warm-prompt :code="code" :innerHtml="prompt" class="mt70"></com-warm-prompt>
	</div>
</template>

<script>
	import comWarmPrompt from 'src/components/com-warm-prompt'; //温馨提示
	import itemHead from "src/components/item/itemHead"//用户信息
export default {
	data() {
		return {
			title:'同城  <span class="title_circle">●</span> 视频资讯',
		    code:"",//温馨提示code 码
		    prompt:"<p>视频接通开始计费，并按照实际视频时长结算，咨询结束费用立即支付给服务者</p>",//温馨提示 文本内容  （兼容当前版本）后期将去掉
		    userInfo:{name:"快乐的猫",age:"26",imgIcon:''}//用户信息
		}
	},
	components:{
		comWarmPrompt,
		itemHead
	},
	methods:{
		
	},
	mounted(){
					
	}

}
</script>
<style lang="less" scoped>
@import '../style/demand.less';
.c_add_shadow{
	.box_shadow(@shadow:0 0.02rem 0.2rem 0.02rem #eee);
}
.navigate_right::after{
	right:0;
}
</style>
