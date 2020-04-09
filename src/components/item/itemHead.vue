<template>
	<div>
		<div class="user_msg" :class="{user_msg_order:isOrder}">
			<p class="user_name">{{userInfo.nickname}}
				<em :class="[userInfo.gender=='female'?'':'bg_blue']"><i class="iconfont" :class="[userInfo.gender=='female'?'icon-nv':'icon-nan']"></i>{{userInfo.age}}</em>
				<!--行业  身边动态页面显示-->
				<span class="user_industry" v-if="isShowIndustry&&userInfo.skillName">{{userInfo.skillName}}</span>
				<span class="pull_right c_666" v-if="isShowTopAdd"><i class="iconfont icon-dizhi c_999 f26"></i>{{userInfo.dist|number(2)}}km</span>
			</p>
			<template v-if="isOrder">
				<div class="user_approve_state" v-if="userInfo.inviteStatus == 'expired'">订单已过期</div>
				<div class="user_approve_state" v-else>{{userInfo.overdueTime}}天后过期</div>
			</template>
			<div class="user_approve_state" v-if="isShowApprove&&!isOrder">
				<p>
					<span class="f28">认证：</span>
					<img src="../images/iconA1.jpg" v-if="userInfo.mobileBind=='Y'"/><!--绑定手机-->
					<img src="../images/iconA2.jpg" v-if="userInfo.isVerify=='Y'"/><!--实名认证-->
					<img src="../images/iconA3.jpg" v-if="userInfo.isSkillCertification=='Y'"/><!--技能认证-->
					<img src="../images/iconA4.jpg" v-if="userInfo.wxBind=='Y'"/><!--微信-->
					<img src="../images/iconA5.jpg" v-if="userInfo.wbBind=='Y'"/><!--新浪微博-->
					<img src="../images/iconA6.jpg" v-if="userInfo.emailBind=='Y'"/><!--邮箱-->
					<img src="../images/iconA7.jpg" v-if="userInfo.qqBind=='Y'"/><!--qq-->
					<img src="../images/iconA8.jpg" v-if="userInfo.isZfbIdentify=='Y'"/><!--支付宝-->
					<!--<img src="../images/iconA9.jpg"/>--><!--芝麻信用-->
				</p>
				<em class="pull_right c_666" v-if="isShowDistance"><i class="iconfont icon-dizhi c_999 f26"></i>{{userInfo.dist|number(2)}}km</em>
			</div>
			<div class="f24 c_666 user_add_mess" v-if="isShowAdd">
				<span>{{userInfo.releasedDate}}</span>
				<span>{{userInfo.address}}</span>
				<span><i class="iconfont icon-dizhi c_999 f26"></i>{{userInfo.dist}}km</span>
			</div>
			<a class="user_attention" href="javascript:void(0)" v-if="isShowAttention&&userInfo.isNotice!='Y'" @click.stop="$emit('changeAttention')">关注</a>
			<a class="user_attention user_attention_ed" href="javascript:void(0)" v-if="isShowAttention&&userInfo.isNotice=='Y'" @click.stop="$emit('changeAttention')">已关注</a>
			<div class="user_avatar">
				<img :src="userInfo.headPhoto|imgUrl" class="user_avatar_img"/>
				<i class="user_grade_icon" v-if="userInfo.isVip=='Y'"></i>
			</div>
		</div>
		<div class="user_approve_state ptb26 hei100" v-if="isOrder">
			<p>
				<span class="f28 mr20">认证</span>
				<img src="../images/iconA1.jpg" v-if="userInfo.mobileBind=='Y'"/><!--绑定手机-->
				<img src="../images/iconA2.jpg" v-if="userInfo.isVerify=='Y'"/><!--实名认证-->
				<img src="../images/iconA3.jpg" v-if="userInfo.isSkillCertification=='Y'"/><!--技能认证-->
				<img src="../images/iconA4.jpg" v-if="userInfo.wxBind=='Y'"/><!--微信-->
				<img src="../images/iconA5.jpg" v-if="userInfo.wbBind=='Y'"/><!--新浪微博-->
				<img src="../images/iconA6.jpg" v-if="userInfo.emailBind=='Y'"/><!--邮箱-->
				<img src="../images/iconA7.jpg" v-if="userInfo.qqBind=='Y'"/><!--qq-->
				<!--<img src="../images/iconA8.jpg"/>--><!--支付宝-->
				<!--<img src="../images/iconA9.jpg"/>--><!--芝麻信用-->
			</p>
			<em class="pull_right c_666" v-if="isShowDistance"><i class="iconfont icon-dizhi c_999 f26"></i>{{userInfo.dist}}km</em>
		</div>
		<!-- <p class="c_main pr30 ptb25 border_t" v-if="isOrder && isEarnestMoney && userInfo.inviteStatus != 'expired'">诚意金已付{{userInfo.earnestMoney | number}}元（已托管至同城平台，请放心应邀）</p> -->
	</div>
</template>

<script>
	export default {
		props: {
			userInfo: {//用户信息
		       type: Object,
			   default(){
				   return{
					   nickname:'',
					   gender:'',
					   age:'',
					   mobileBind:'',
					   isVerify:'',
					   isSkillCertification:'',
					   wxBind:'',
					   wbBind:'',
					   emailBind:'',
					   qqBind:'',
					   dist:'',
					   releasedDate:'',
					   address:'',
					   headPhoto:'',
					   isVip:'',
					   earnestMoney:'',
					   overdueTime:'',
					   inviteStatus:''
				   }
			   }
		   	},
		   	isShowDistance:{//是否距离
		   		default:true
		   	},
		   	isShowIndustry:{//是否显示行业名称
		   		default:false
		   	},
		   	isShowApprove:{//是否显示认证信息
		   		default:true
		   	},
		   	isShowAdd:{//是否显示地址信息
		   		default:false
		   	},
		   	isShowAttention:{//是否显示关注按钮
		   		default:false
		   	},
		   	isShowTopAdd:{//是否展示用户名后面的距离
		   		default:false
		   	},
		   	isOrder:{//是否是订单详情
		   		default:false
		   	},
			isEarnestMoney:{  //是否展示诚意金
				default:false,
			}
		}
	}
</script>

<style lang="less" scoped>
.hei100{
	height: 1rem;
}
</style>
