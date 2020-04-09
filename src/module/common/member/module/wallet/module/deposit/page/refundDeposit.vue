<template>
	<div class='router_page bg_gray'>
		<div class="bg_fff pb50">
			<top title="保证金退出明细" :isReturn="false" right="规则"></top>
	        <message text="保证金不足会影响经营，难以获取雇主信任"></message>
	        <p class="c_deposit_tips bg_gray">可退还您剩余未使用的现金保证金，将在24小时内退至您的账户。</p>
	        <div class="c_deposit_money"><span>可退还金额</span><span class="c_main">{{Bond}}元</span></div>
	        <form-input title="退出原因" placeholder='请选择退出原因' v-model="reason"></form-input>
	        <div class="c_deposit_textarea">
	        	<span>退出说明</span>
	        	<textarea placeholder="请选择退出说明" v-model="explain"></textarea>
	        </div>
	        <a href="javascript:void(0);" class="btn_block mt60" @click="refundDeposit">确认退出</a>
        </div>
       <com-warm-prompt :code="code"></com-warm-prompt>
	</div>
</template>

<script>
import message from 'src/components/notice/message';//提示
import formInput from 'src/components/formItem/formInput';
import comWarmPrompt from 'src/components/com-warm-prompt'; //温馨提示
import {
	fetchRefundDeposit,//保证金退款
	fetchGetSkillDetails,//获取技能详情
} from '../service/getData'
export default {
	data() {
		return {
			skillId:'',//技能ID
			reason:'',//退款原因
			explain:'',//退款说明
			Bond:'',//保证金
			code:"TCBZJTCWXTS",//温馨提示code 码
		}
	},
	components: {
		message,
		formInput,
		comWarmPrompt
	},
	activated() {
		this.skillId=this.$route.query.skillId//技能ID
		this.getSkillDetails()//获取技能详情->保证金
	},
	mounted(){
		
	},
	watch:{
		
	},
	methods: {
		//获取技能详情->保证金
		getSkillDetails(){
			//服务器名称 DDT_TC_MEMBER_SKILL_DETAILS
			fetchGetSkillDetails(this.skillId).then(res => {
				if(res.status){	
					this.Bond=res.data.data.deposit//保证金
				}
			});
		},
		//保证金退款
		refundDeposit(){
			if(!this.reason){
				alertTip('请选择退出原因');
				return
			}
			if(!this.explain){
				alertTip('请选择退出说明');
				return
			}
			fetchRefundDeposit(this.skillId,this.reason,this.explain).then(res=>{
				if(res.status){
					alertTip(res.msg);
				}
			})
		}
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
		padding:0.2rem 0.3rem;
		font-size:0.24rem;
		color:#999;
	}
	
	.c_deposit_textarea{
		width:7.2rem;
		margin-left:0.3rem;
		border-bottom:1px solid #e8e8e8;
		padding:0.3rem 0.3rem 0.3rem 0;
		display: flex;
		font-size:0.28rem;
		color:#666;
		justify-content: space-between;
		textarea{
			min-height:1.4rem;
			text-align: right;
			width:5.6rem;
			font-size:0.28rem;
		    color:#666;
		}
	}
</style>
