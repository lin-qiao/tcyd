<template>
    <div class="router_page bg_drakRed">
    	<vip-head :userInfo="userInfo"></vip-head>
        <div class="vip_privilege">
        	<h3>免诚意金 赠超值大礼包</h3>
        	<p class="vip_privilege_label"><span></span>共享·赚钱·社交<span></span></p>
        	<div class="vip_invite_box">
        		<h2>邀请{{inviteTotal}}位好友助力，已邀请 <em class="c_main">{{invited}} </em>位</h2>
        		<p class="f26 c_brown mt20">好友成功下载APP并注册即助力成功</p>
        		<div class="vip_invite_wx" v-show="invitedList.length">
        			<div class="invite_wrap">
        				<div class="inner">
		        			<div class="swiper-container J_inviteList">
			        			<div class="swiper-wrapper">
				        			<div class="swiper-slide vip_privilege_msg" v-for="(v,i) in invitedList">
					        			<img :src="v.icon | imgUrl" />
					        			<div class="flex1">
					        				<p class="flex justify_between"><b class="f22">微信名：{{v.nickname}}</b><em>{{v.registerDate}}</em></p>
					        			</div>
					        		</div>
			        			</div>
		        			</div>
        				</div>
        			</div>
        		</div>
        		<div class="vip_invite_wx" v-show="!invitedList.length">
        			<div class="no_data">暂无</div>
        		</div>
        		<div class="vip_red_bag">
	        		<p class="c_drakRed f36 text_center mb30">送Ta{{redpacketMoney}}元红包</p>
	        		<div class="vip_redPack_box">
	        			<span class="f152 ml30"><i class="f48">￥</i>{{redpacketMoney}}</span>
	        			<div class="ml10">
	        				<em class="block" v-show="redpacketType=='M'">满{{redpacketLimit}}元可用</em>
	        				<em class="block" v-show="redpacketType=='Z'">直减红包</em>
	        				<b class="block f36 mt10">{{redpacketName}}</b>
	        			</div>
	        		</div>
	        		<a href="javascript:void(0);" class="btn invite_btn" @click="invite">马上邀请</a>
	        		<p class="f24 c_666">我的邀请码：{{invitedCode}}   
	        			<i class="c_blue" 
	        				v-clipboard:copy="invitedCode"
					     	v-clipboard:success="onCopySuccess"
					     	v-clipboard:error="onCopyError">
					     	复制
	        			</i>
	        		</p>
	        	</div>
        	</div>
        	<div class="mtb30 f26 c_fff text_center">已开通的VIP平均每人可赚<span class="mlr10 f28 c_yellowish">16688元/月</span></div>
            <div class="vip_invite_rule">
        		<h2>规则说明</h2>
        		<p><i>1</i>活动中邀请20位好友下载并登录同城APP，填写你的邀请码，即可免费享受价值399元的月度VIP服务；</p>
        		<p><i>2</i>免费开通VIP将不发放会员礼包商品；</p>
        		<p><i>3</i>在法律允许范围内，该活动最终解释权归同城VIP所有。</p>
        	</div>
        </div>
    </div>
</template>
<script>
import {
	imgBaseUrl
} from 'src/config/env'
import defaultImg from 'src/images/loading.png'
import vipHead from '../components/vipHead'//头部用户信息组件
import {
	fetchVipUserInfo,//获取用户信息
	fetchInviteDetail,//获取邀请好友情况
	fetchInviteRedpacket,//获取邀请好友红包
} from '../service/getData'
export default {
    data() {
    	return {
    	   userInfo:{},//用户信息
    	   invited:0,//已邀请人数
    	   inviteTotal:0,//需要邀请总人数
    	   inviteUrl:"",//邀请链接
    	   invitedList:[],//已邀请列表
    	   invitedCode:"69875620",//邀请码
    	   activityCode:"1",//活动code(未定怎么传)
    	   redpacketMoney:0,//红包金额
    	   redpacketLimit:0,//红包金额使用限制
    	   redpacketName:"APP专用红包",//红包名称
    	   redpacketType:"M",//红包类型 Z:直减 M:满减
    	}
	},
	components: {
		vipHead
	},
	activated(){
		this.getUserInfo();
		this.getInviteDetail();
		this.getInviteRedpacket();
	},
	mounted(){
		this.invitedCode=JSON.parse(sessionStorage.getItem('userInfo')).mobile||"";
	},
	watch:{
	},
	methods: {
		//获取用户信息
		getUserInfo(){
			fetchVipUserInfo().then(res=>{
				this.userInfo=res.data;
			})
		},
		//获取邀请好友情况
		getInviteDetail(){
			fetchInviteDetail().then(res=>{
				this.invited=res.data.num;
				this.inviteTotal=res.data.numTotal;
				this.inviteUrl=res.data.url;
				this.invitedList=res.data.list||[];
				this.$nextTick(()=>{
					this.inviteListSwiper();
				})
			})
		},
		//邀请好友列表轮播
		inviteListSwiper(){
			new Swiper ('.J_inviteList', {
				direction: 'vertical',
			    slidesPerView:3,
			    autoplay:3000,
			    loop:true
			})    
		},
		//获取邀请好友红包
		getInviteRedpacket(){
			fetchInviteRedpacket(this.activityCode).then(res=>{
				var list=res.data.list;
				if(list.length){
					var item=list[0];
					this.redpacketMoney=item.money;
					this.redpacketLimit=item.limitMoney;
					this.redpacketName=item.name;
					this.redpacketType=item.usageWay;
				}
			})
		},
		//邀请
		invite(){
			console.log("/vipShare?inviteCode="+this.invitedCode+"&nickname="+this.userInfo.nickname+"&avatar="+this.userInfo.icon);
//			this.$share({
//              title:"送好友10元现金券",
//              desc:"送好友10元现金券，祝你免费开通VIP",
//              img:"",
//              link:"/vipShare?inviteCode="+this.invitedCode+"&nickname="+this.userInfo.nickname+"&avatar="+this.userInfo.icon
//          })
			this.$router.push({path:"/vipShare?inviteCode="+this.invitedCode+"&nickname="+this.userInfo.nickname+"&avatar="+this.userInfo.icon})
		},
		//复制邀请码成功
		onCopySuccess(e){
			alertTip("邀请码复制成功");
		},
		//复制邀请码失败
		onCopyError(e){
			alertTip("邀请码复制失败");
		},
	}
}
</script>
<style lang="less" scoped>
@import (reference) "~src/style/all.less";
@import "../style/vip.less";
.no_data{
	width: 100%;
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	font-size: 0.28rem;
}
</style>
