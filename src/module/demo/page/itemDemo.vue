<template>
	<div>
		<div @click="status=true" class="btn">打赏</div>
		<itemHead  :userInfo='userInfo'></itemHead>
		<itemSkill :skillInfo="skillInfo"></itemSkill>
		<rewardPopup :rewardList="rewardList"  ref="rewardPopup" @rewardState="status=false"></rewardPopup>
		<com-warm-prompt :code="TCJNRZWXTS" class="fail_con"></com-warm-prompt>
		<alertTip ref="alertTip"></alertTip>
		<alertInquiry ref="alertInquiry" :bigImg="true" hint="约到Ta只差一步了" colorText="<i class='iconfont icon-user c_orange'></i>同城联合保险公司，为您的资金保驾护航"></alertInquiry>
	</div>
</template>

<script>
//用户信息
import itemHead from 'src/components/item/itemHead'
//用户技能
import itemSkill from 'src/components/item/itemSkill'
//打赏
import rewardPopup from 'src/components/alert/rewardPopup'
//温馨提示
import comWarmPrompt from 'src/components/com-warm-prompt'; //温馨提示


import reward from "src/components/images/reward.png";
export default {
	data(){
		return{
			status:false,//展示打赏弹窗
			userInfo:{name:"快乐的猫",vip:false,sex:"W",age:"26",imgIcon:''},//用户信息
			skillInfo:{name:"模特",grade:"初级",time:'1531474495000',imgIcon:''},//技能信息
			//打赏列表
			rewardList:[{img:reward,name:"钻石99"},{img:reward,name:"钻石99"},{img:reward,name:"钻石99"},{img:reward,name:"钻石99"},{img:reward,name:"钻石99"},{img:reward,name:"钻石99"}]
		}
	},

	mounted(){
	    //this.$refs.alertTip.alertTipFn("提示信息");
	    this.$refs.alertInquiry.alertInquiryFn(
			"支付诚意金后系统将通知到技能提供者。诚意金可作为最终交易进行抵扣，如订单未成交，将退回您的同城账户",
			() => {}
		);
	},
	components:{
		itemHead,
		itemSkill,
		rewardPopup,
		comWarmPrompt
	},
	methods: {
	},
	watch:{
		status(val){
			if(val){
				this.$refs.rewardPopup.popupVisible=true;
			}else{
				this.$refs.rewardPopup.popupVisible=false;
			}
		}
	}
}
</script>

<style>
</style>
