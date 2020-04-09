<template>
	<div class='router_page bg_gray'>
		<top title="当前保证金" :isReturn="false"></top>
		<message text="保证金不足会影响经营，难以获取雇主信任"></message>
		<div class="bg_fff">
			<div class="c_deposit_money"><span>现金充值保证金</span><span>{{bond.alreadyDeposit}}元</span></div>
			<!-- <div class="c_deposit_money border-n"><span>平台赠送保证金</span><span class="c_main">1000元</span></div> -->
		</div>
		<!-- <p class="c_deposit_tips">平台赠送保证金不可退出</p> -->
		<com-warm-prompt :code="code"></com-warm-prompt>
	</div>
</template>

<script>
import comWarmPrompt from 'src/components/com-warm-prompt'; //温馨提示
import message from 'src/components/notice/message';//提示
import {
	fetchGetBond,//获取保证金总额
} from '../service/getData'
export default {
	data() {
		return {
			bond:'',//保证金信息
			code:"TCBZJWXTS",//温馨提示code 码
		}
	},
	components: {
		comWarmPrompt,
		message
	},
	activated() {
		this.getBond()//获取保证金总额
	},
	methods:{
		//获取保证金总额
		getBond(){
			fetchGetBond().then(res=>{
				if(res.status){
					this.bond=res.data
				}
			})
		},
	}

}
</script>

<style lang="less" scoped>
	.c_deposit_money{
		display:flex;
		justify-content: space-between;
		align-items: center;
		padding:0 0.3rem;
		border-bottom:1px solid #e8e8e8;
		height:0.92rem;
		font-size:0.26rem;
		color:#666666;
	}
	.c_deposit_tips{
		padding:0.3rem;
		font-size:0.24rem;
		color:#999;
		margin-bottom:3rem;
	}
</style>
