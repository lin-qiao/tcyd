<template>
	<div class="router_page bg_gray">
		<top :title="type=='packet'?'红包使用规则':'现金券使用规则'" :isReturn="false"></top>
		<div v-if="type=='packet'">
			<div class="pad30 m30 bg_fff f28 box" v-for="el in ruleList">
				<p class="c_main f30 mb20">{{el.title}}</p>
				<div class="lin50" v-html="el.content">
				</div>
			</div>
		</div>
		<div v-if="type=='cash'">
			<div class="pad30 m30 bg_fff f28 box">
				<p class="c_main f30 mb20">什么是现金券？</p>
				<div class="lin50">
					<p>现金劵是同城福利的一种，可以用于消费。</p>
				</div>
			</div>
			<div class="pad30 m30 bg_fff f28 box">
				<p class="c_main f30 mb20">怎样才能获得现金券？</p>
				<div class="lin50">
					<p>1、支付成功有机会获得现金券返利；</p>
					<p>2、不定期给优秀服务者发现金券；</p>
					<p>3、密切关注官方活动；</p>
					<p>4、服务者也可以给您发现金券哦。</p>
				</div>
			</div>
			<div class="pad30 m30 bg_fff f28 box">
				<p class="c_main f30 mb20">现金券有什么使用限制吗？</p>
				<div class="lin50">
					<p>1、一次支付和提现最多只能用1张现金券；</p>
					<p>2、现金券不可拆分、不可找零；</p>
					<p>3、现金券已过期后将不可使用；</p>
					<p>4、服务者给您发的现金券只能对Ta消费时使用哦；</p>
					<p>5、同一订单只能使用一张现金券。</p>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	import {fetchProblemList} from 'src/service/getData'
	export default{
		data(){
			return{
				type:'packet',
				ruleList:[],//红包规则列表
			}
		},
		activated(){
			this.type = this.$route.query.type||'packet'
		},
		mounted(){
			this.fetchIntegralRule();
		},
		methods:{
			fetchIntegralRule(){
				fetchProblemList('TC_RED_PACKET').then(res=>{
					if(res.status){
						this.ruleList=res.data;
					}
				})
			}
		}
	}
</script>

<style scoped lang="less">
	@import (reference) '~src/style/all.less';
	.m30{
		margin: 0.3rem;
	}
	.box{
		.box_shadow(0px 0px 0.2rem #f1f1f1);
	}
	.lin50{
		
		line-height: 0.5rem;
	}
</style>