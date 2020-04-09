<template>
	<div class="pb121">
		<!--S 头部-->
		<top title="支付完成"></top>
		<!--E 头部-->
		<div class="detail_wrap">
			<img :src="stationInfo.partnerLevelIcon|imgUrl" alt="" class="medal" />
			<div class="info">恭喜您，成为{{stationInfo.partnerLevelName}}</div>
			<!--S 自己的成功页面-->
			<div class="reminder" v-if="!invite&&checkStatus">电子合同生成中，请您稍后前往购买记录查看电子合同</div>
			<div class="reminder" v-if="!invite&&!checkStatus">为保证您的权益，请您尽快完成实名认证</br>认证通过后可前往购买记录查看电子合同</div>
			<router-link to="/personApprove" class="btn_auth" v-if="!invite&&!checkStatus">立即实名认证</router-link>
			<!--E 自己的成功页面-->
			<!--S 邀请好友成功页面-->
			<div class="reminder" v-if="invite">快去关注公众号或下载APP体验更多精彩吧</div>
			<a href="javascript:void(0);" class="btn_auth" v-if="invite" @click="comQrCodeShow">关注公众号</a>
			<a href="javascript:void(0);" class="btn_auth" v-if="invite" @click="downLoadApp">下载APP</a>
			<!--E 邀请好友成功页面-->
		</div>
		<com-qrcode ref="qrcode" :query="'t=7'" @nextFn="routerIndex"></com-qrcode>
	</div>
</template>

<script>
import {fetchUserType} from 'src/service/getData';//查询当前用户的站长等级
import comQrcode from 'src/components/com-qrcode';//查询当前用户的站长等级
import {appDownLoad} from 'src/config/mUtils'; //app下载方法
import {
	fetchMemberGetMemberInfo//个人认证信息
} from 'src/module/common/member/module/save/service/getData'
export default{
	data(){
		return{
			checkStatus:false,//是否实名认证
			stationInfo:{},//用户信息
			invite:0,//是否从分享页面进入支付
		}
	},
	activated(){
		this.userTypeFn();//查询当前用户的站长等级
		this.getQualifyResult();//获取用户是否实名认证
		if(parseFloat(this.$route.query.invite)){
			this.invite=1;
		}else{
			this.invite=0;
		}
	},
    mounted() {
    },
    components: {
		comQrcode
	},
	methods: {
		downLoadApp () {//app下载
			appDownLoad();
		},
		comQrCodeShow(){//关注公众号
			this.$refs.qrcode.createWechatCode();
		},
		routerIndex(){//跳转首页
			this.$router.push('/index');
		},
		userTypeFn(){
			fetchUserType().then(res=>{//查询当前用户的站长等级
				if(res.status){
					this.stationInfo=res.data;//用户的站长信息
				}
			});
		},
		getQualifyResult() {//获取个人认证状态
	        fetchMemberGetMemberInfo().then(res => {
	            if (res.status) {
	                let data = res.data.memberRealName;
			        if(data&&data.checkStatus=="live_pass"){
	                	this.checkStatus=true;//已实名认证
	                }else{
	                	this.checkStatus=false;//未实名认证
	                }
	            }
	        })
	    }
	}
}
</script>
<style lang="less">
</style>
<style lang="less" scoped>
@import (reference) "~src/style/all.less";
.detail_wrap{
	margin: 0.87rem 0.3rem 0;
	text-align: center;
	.medal{
		width:1.52rem;
		margin-bottom:0.4rem;
	}
}
.info{
	font-size: 0.34rem;
}
.reminder{
	margin: 0.1rem 0 0.4rem; 
	line-height: 0.4rem;
	font-size: 0.28rem;
	color: #666666;
}
.btn_auth{
	display: block;
	width: 3rem;
	height: 0.76rem;
	border-radius: 0.38rem;
	.gradient_v(#fd6a55,#ff4a48);
	line-height: 0.76rem;
	font-size: 0.3rem;
	text-align: center;
	color: #fff;
	float: left;
    margin: 0 0.22rem;
}
</style>