<template>
	<div class="flex flex_center justify_between">
		<span>认证
			<img src="./images/iconA1.jpg" v-if="attestation.mobile=='Y'"/><!--绑定手机-->
			<img src="./images/iconA2.jpg" v-if="attestation.memberVerity=='Y'"/><!--实名认证-->
			<img src="./images/iconA3.jpg" v-if="attestation.isSkillCertification=='Y'"/><!--技能认证-->
			<img src="./images/iconA4.jpg" v-if="attestation.wxBind=='Y'"/><!--微信-->
			<img src="./images/iconA5.jpg" v-if="attestation.wbBind=='Y'"/><!--新浪微博-->
			<img src="./images/iconA6.jpg" v-if="attestation.emailBind=='Y'"/><!--邮箱-->
			<img src="./images/iconA7.jpg" v-if="attestation.qqBind=='Y'"/><!--qq-->
			<img src="./images/iconA8.jpg" v-if="attestation.isZfbIdentify=='Y'"/><!--支付宝-->
		</span>
		<a href="javascript:void(0);" v-show="showInviteBtn" :disabled="disableInviteBtn" @click="toParentInvite" class="btn c_invite_btn" v-bind:class="{'gray_btn':disableInviteBtn}">{{disableInviteBtn?"已邀请认证":"邀请认证"}}</a>
	</div>
</template>

<script>
	export default{
		data(){
			return{
				
			}
		},
		props:{
			attestation:{
				type:Object,
				default:function(){
					return {
						mobileBind:'N',//<!--绑定手机-->
						isVerify:'N',//<!--实名认证-->
						isSkillCertification:'N',//<!--技能认证-->
						wxBind:'N',//<!--微信-->
						wbBind:'N',//<!--新浪微博-->
						emailBind:'N',//<!--邮箱-->
						qqBind:'N',//<!--qq-->
						isZfbIdentify:'N'//<!--支付宝-->
					}
				}
			},
			showInviteBtn:{
				default:true
			},
			disableInviteBtn:{
				default:true
			}
		},
		watch:{
			attestation:function () {
				if(!this.showInviteBtn||this.attestation==null){//如果部需要显示按钮则直接反应
					return;
				}
				//需要显示  按钮 ，但是如果所有值均为Y 则 隐藏 按钮（认证完成）
				for(let el in this.attestation){
					if(el.value=="N"){
						this.showInviteBtn=true
						return;
					}
				}
			}
		},
		methods:{
			toParentInvite:function(){ //调用父窗体 立即邀请事件
				this.$emit("toInvite");
			}
		}
	}
</script>

<style scoped>
	.justify_between{
		width: 100%;
	}
</style>