<template>
	<div class="partner_index" :class="{partner_index_bot:partnerTab==2}">
		<div v-if="showApp">
			<div style="height: 1.1rem;"></div>
			<div class="l_app_down flex flex_center plr30 justify_between">
				<div class="flex flex_center">
					<i class="iconfont icon-close2 c_fff f38 mr26" @click="showApp=false"></i>
					<img src="/static/img/logo.png" class="mr15"/>
					<p class="f26 down_des">时间技能变现<br>共享同城服务</p>
				</div>
				<a class="f24 c_fff down_btn" href="javascript:void(0);" @click="downApp">同城约单APP下载</a>
			</div>
		</div>
		<div class="station_account">
			<!-- S 头部-->
			<top
			    title="站长"
				:isReturn="false"
				right="<span class='c_999'>入驻记录</span>"
				@clickRight="$router.push('/stationConsumeList')">
			</top>
			<!-- E 头部-->
			<!-- S 掌柜信息-->
			<div class="partner_info partner_info_vip" :class="{partner_info_jazz:userInfo.partnerLevelCode}">
				<!-- 头像 -->
				<img class="partner_avatar" :src="userInfo.headPhoto | imgUrl">
				<div class="partner_tit">
					<div>
						<!-- 用户名称+等级 -->
						<p class="f36 mb5 name flex flex_center justify_center">
							<em>{{userInfo.nickname}}</em>
							<!-- 站长-->
							<span class="station_level ml10" v-if="userInfo.partnerLevelCode"><i class="iconfont icon-v f24 mr10"></i>{{userInfo.partnerLevelName}}</span>
						</p>
						<!-- 普通用户 -->
						<p class="station_nolevel mt5" v-if="!userInfo.partnerLevelCode">普通用户</p>
						<!-- 有效期 -->
						<p class="f24 mt15 ellipsis station_date mb5" v-if="userInfo.endTime">有效期至{{userInfo.endTime | date('yyyy年MM月dd日')}}</p>
					</div>
				</div>
				<div class="partner_income_list">
					<router-link to="/wallet/myHire" class="partner_income_item">
						<p class="f26">佣金收入(元)<i class="iconfont icon-arrow-right f26 ml5"></i></p>
						<p class="f40 mt12">{{userInfo.brokerageTotal|number(2)}}</p>
					</router-link>
					<router-link to="/stationInviteList" class="partner_income_item">
						<p class="f26">邀请好友(个)<i class="iconfont icon-arrow-right f26 ml5"></i></p>
						<p class="f40 mt12">{{userInfo.inviteCount||0}}</p>
					</router-link>
					<!--<router-link to="/stationConsumeList" class="partner_income_item">
						<p class="f26">期权(赠)<i class="iconfont icon-arrow-right f26 ml5"></i></p>
						<p class="f40 mt12">{{userInfo.inviteCount||0}}</p>
					</router-link>-->
				</div>
			</div>
			<!--分割图-->
			<img class="station_curve" src="../images/bg_curve.png"/>
			<!--S 按钮-->
			<router-link :to="'/stationDetail?tab=' + userInfo.partnerLevelCode" class="partner_btn">{{userInfo.partnerLevelCode?'我的':'站长'}}特权</router-link>
			<!--E 按钮-->
		</div>
		<!-- E 掌柜信息-->
		<!-- S 掌柜特权-->
		<div class="partner_privilege mt10">
			<div class="tit">同城约单站长特权</div>
			<p class="mt10 f28 text_center sub_tit">升级成为站长，享受专属特权</p>
			<div class="swiper-container partner_privilege_list" id="J_privilege">
				<ul class="swiper-wrapper">
					<li v-for="el in privilegeList" class="swiper-slide">
						<a :href="el.url||'javascript:void(0);'">
							<img :src="el.image | imgUrl" alt="">
							<div class="info">
								<p class="f30 c_48433d">{{el.title}}</p>
								<p class="f24 c_888 mt10">{{el.subtitle}}</p>
							</div>
						</a>
					</li>
				</ul>
			</div>
		</div>
		<!-- E 掌柜特权-->
		<div class="partner_con" id="J_partnerNav">
			<div style="height:1.06rem" v-show="isFixed"></div>
			<div class="partner_nav" :class="{'fixd':isFixed}" v-show="userInfo.partnerLevelCode">
				<div class="partner_nav_item f36" :class="{'on' : partnerTab == 1}" @click="partnerTab = 1">站长特权介绍</div>
				<div class="partner_nav_item f36" :class="{'on' : partnerTab == 2}" @click="partnerTab = 2;">站长赚钱攻略</div>
			</div>
			<div v-show="partnerTab == 1">
				<div class="partner_nav_tit">
					<img src="../images/partner_nav_tit.png" alt="">
					<p class="des">同城约单，打造互联网+服务独角兽</p>
				</div>
				<!-- S 掌柜省钱 -->
				<div class="partner_item">
					<ul class="partner_list">
						<li v-for="(el,i) in partnerInfoList" :key="el.id" :style="{order:-i}">
							<img :src="el.icon | imgUrl" alt="">
							<div class="info">
								<h4 class="f28">{{el.name}}</h4>
								<div class="c_999 f24" v-html="el.introduce"></div>
							</div>
							<router-link :to="'/stationDetail?tab='+el.code" class="btn" :class="{btn_detail:userInfo.level >= el.level}">立即{{userInfo.partnerLevelCode?'升级':'购买'}}</router-link>
						</li>
					</ul>
					<div class="btn_wrap" v-if="partnerInfoList.length&&userInfo.level != partnerInfoList[partnerInfoList.length-1].level">
						<router-link class="btn_block" to="/stationDetail" v-if="!userInfo.partnerLevelCode">立即成为站长</router-link>
						<router-link class="btn_block" :to="'stationDetail?tab='+partnerInfoList[userInfo.level].code" v-else>立即升级</router-link>
					</div>
				</div>
				<!-- E 掌柜省钱 -->
				<!--S 站长教程图-->
				<div v-show="inviteRebateImg.length">
					<div class="partner_invite_rebate partner_con mt20">
						<img :src="el.image | imgUrl" v-for="el in inviteRebateImg">
					</div>
				</div>
				<!--E 站长教程图-->
				<!--S 温馨提示-->
				<com-warm-prompt code="ZZSYWXTS"></com-warm-prompt>
				<!--E 温馨提示-->
			</div>
			<div v-show="partnerTab == 2">
				<div class="partner_nav_tit">
					<img src="../images/partner_nav_tit_02.png" alt="">
					<p class="des">成为同城约单站长，共享财富新商机</p>
				</div>
				<!-- S 邀好友赚钱 -->
				<div class="partner_item">
					<div class="partner_share pb20">
						<div class="partner_share_step">
							<img :src="'/api/tc/common/img/getShareQrcode?url=/stationInvite?mid='+userInfo.mobile+'&terminal=WX'" alt="" class="ewm">
							<p class="c_main f28 mt10">邀请码：{{userInfo.mobile}}</p>
							<div class="invite_btn" @click="shareShow = true">立即邀请</div>
							<p class="c_999 f24 mt10">面对面扫一扫，快速邀请好友</p>
							<ul class="steps">
								<li>
									<img src="../images/icon5.png">
									<div class="info">
										<p class="f28 mb10">1、点击立即邀请按钮，分享链接</p>
										<p class="f24 c_888">将链接分享到微信朋友圈效果更好哦</p>
									</div>
								</li>
								<li>
									<img src="../images/icon6.png">
									<div class="info">
										<p class="f28 mb10">2、好友点分享链接与您建立邀请关系</p>
										<p class="f24 c_888">好友通过链接注册成功或升级站长</p>
									</div>
								</li>
								<li>
									<img src="../images/icon7.png">
									<div class="info">
										<p class="f28 mb10">3、好友下载同城约单APP</p>
										<p class="f24 c_888">你可通过邀请好友消费或升级站长赚取高额佣金</p>
									</div>
								</li>
							</ul>
						</div>
					</div>
					<div class="btn_wrap">
						<div class="btn_block" @click="shareShow = true">立即邀请</div>
					</div>
				</div>
				<!-- E 邀好友赚钱 -->
			</div>
		</div>
		
		<!-- S 二维码分享 -->
		<div class="recruit_pop" v-show="showInvite">
			<div class="recruit_box">
				<div class="swiper-container swiper" id="J_shareImgSwiper">
					<div class="swiper-wrapper">
						<div class="swiper-slide" v-for="el in inviteImgList">
							<img :src="el" alt="">
						</div>
					</div>
				</div>
				<div class="swiper-button-prev" id="J_shareImgSwiperPrev"></div>
				<div class="swiper-button-next" id="J_shareImgSwiperNext"></div>
				<div class="close" @click="showInvite = false"></div>
				<div class="flex flex_center justify_center mt30">
					<img style="height: 0.8rem;width: 0.8rem;" src="../images/icon8.png" alt="">
					<p class="text_center c_fff f30 ml30">长按图片保存</p>
				</div>
			</div>
		</div>
		<!-- E 二维码分享 -->
		<!-- S 立即分享弹窗 -->
		<div class="layer_shadow" v-show="shareShow">
			<div class="shareType">
				<div class="shareIcon">
					<div class="share_item" v-for="el in shareList" @click="showShareImg(el);shareShow=false">
						<i class="iconfont" :class="el.icon" :style="{'color':el.color}"></i>
						<p>{{el.text}}</p>
					</div>
				</div>
				<div class="f32 text_center cancel" @click="shareShow = false">取消</div>
			</div>
		</div>
		<!-- E 立即分享弹窗 -->
	</div>
</template>

<script>
import comWarmPrompt from 'src/components/com-warm-prompt'; //温馨提示
import {
	imgBaseUrl//图片地址
} from 'src/config/env'
import {
	fetchPartnerconfList, //查看掌柜等级配置
	fetchGetCommonDetail //获取掌柜分享标题和内容
} from '../service/getData'
import {
	fetchUserType, //获取当前用户掌柜等级
	fetchGeneralImage //通用图片接口
} from 'src/service/getData'
import {
	fetchShareImg  //分享图片
} from 'src/service/getDataWeChat'
import {wxShare,appDownLoad} from 'src/config/mUtils'; //分享
export default {
	data() {
		return {
			mobile:'',//用户手机号
			imgBaseUrl:imgBaseUrl,//图片地址
			showInvite: false, //邀请弹窗
			partnerTab:1,  //掌柜选项卡
			userInfo: {}, //用户等级code
			partnerInfoList: [], //用户等级配置列表
			privilegeList: [], //掌柜特权列表
			inviteImgList: [], //邀请好友图片
			shareShow: false, //分享显示隐藏
			isFixed: false, //选项卡是否悬浮
			inviteRebateImg: [], //邀请返佣图片列表
			shareData:'',//后台配置的页面分享信息
			shareList:[
                {
                    icon:'icon-weixin-copy',
                    color:'#7ed321',
                    text:'微信好友'
                },
                {
                    icon:'icon-pengyouquan',
                    color:'#54cb00',
                    text:'朋友圈'
                },
                {
                    icon:'icon-erweima',
                    color:'#ffc02b',
                    text:'二维码'
                }
            ],
            showApp:false//是否显示APP下载
		}
	},
	components: {
		comWarmPrompt
	},
	activated() {
		this.partnerTab = 1;
		this.getUserType(); //获取用户等级
		this.isFixed = false;
		if(this.$route.query.invite){
			//邀请好友进来页面后  悬浮下载APP
			this.showApp = true;
			this.partnerTab = 2;
		}else{
			this.showApp = false;
			window.addEventListener('scroll',this.fixedTab) //开启滚动悬浮
		}
	},
	mounted(){
		this.getPrivilege ();//站长特权列表
		this.getInviteRebate(); //邀请返佣大图
		this.getPartnerInfo(); //站长等级配置
	},
	beforeRouteLeave(to,from,next){
        window.removeEventListener('scroll',this.fixedTab) //关闭滚动悬浮
        next();
    },
	methods: {
		//下载APP
		downApp(){
			appDownLoad();
		},
		//选项卡悬浮
        fixedTab(){
			let navTab = document.querySelector('#J_partnerNav').offsetTop;
            if (window.scrollY >= navTab) {
                this.isFixed = true;
            } else {
                this.isFixed = false;
            }
		},
		//获取邀请返佣大图
		getInviteRebate () {
			fetchGeneralImage('TC_PARTNER_INDEX_INTRODUCE').then(res => {
				if (res.status) {
					this.inviteRebateImg = res.data.list || [];
				}
			})
		},
		//分享图片
		getShareImg () {
			fetchShareImg(this.mobile).then(res => {
				if (res.status) {
					this.inviteImgList = res.data||[];
				}
			})
		},
		//二维码分享图片的分享
		shareImgSwiper(){
			this.$nextTick(function(){
				var mySwiper = new Swiper('#J_shareImgSwiper',{
					prevButton:'#J_shareImgSwiperPrev',
					nextButton:'#J_shareImgSwiperNext',
					loop: true,
					grabCursor: true,
					paginationClickable: true,
					autoplayDisableOnInteraction: false
				});
			})
		},
		//底部分享按钮
		showShareImg (el) {
			if (el.text == '二维码') {
				//二维码弹窗显示
				this.showInvite = true;
				this.shareImgSwiper();
			} else {
				//分享弹窗显示
				this.$share.show();
			}
		},
		//获取掌柜分享标题和内容
		shareTit(){
			if(this.shareData){
				this.shareFn();
			}else{
				fetchGetCommonDetail('tc','TC_PARTNER_SHARE_INFO').then(res=>{
					if(res.status){
						this.shareData = JSON.parse(res.data.list.TC_PARTNER_SHARE_INFO.value);
						this.shareFn();
					}
				})
			}
		},
		//调用微信分享
		shareFn(){
			wxShare(this.shareData.url+'?mid='+this.userInfo.mobile,this.shareData.title,this.shareData.content,this.shareData.image);
		},
		//查询当前用户等级
		getUserType () {
			fetchUserType().then(res => {
				if (res.status) {
					this.userInfo = res.data||{};
					this.shareTit();//获取掌柜分享标题和内容
					if(this.mobile!=this.userInfo.mobile){
						this.mobile = this.userInfo.mobile;
						this.getShareImg();
					}
				}
			})
		},
		//查看掌柜等级配置
		getPartnerInfo () {
			fetchPartnerconfList().then(res => {
				if (res.status) {
					this.partnerInfoList = res.data.list;
				}
			})
		},
		//获取掌柜特权图片
		getPrivilege () {
			fetchGeneralImage('TC_PARTNER_PRIVILEGE').then(res => {
				if (res.status) {
					this.privilegeList = res.data.list;
					let width = document.body.offsetWidth;
					let stretch = 26;
					stretch = width*26/750;
					this.$nextTick(function(){
						var mySwiper = new Swiper('#J_privilege', {
							slidesPerView: 'auto',
							spaceBetween: stretch
						});
					})
				}
			})
		}
	}
}
</script>
<style lang="less">
@import (reference) "~src/style/all.less";
.partner_index{
	.title{
		height:1.08rem;
		line-height:1.08rem;
		background: none;
		border-bottom: none;
		.tit_font{
			color: #fff;
			line-height:1.08rem;
		}
		.tit_icon{
			color: #fff !important;
			height:1.08rem;
			i{
				line-height: 1.08rem;
			}
		}
	}
}
</style>
</style>
<style lang="less" scoped>
@import (reference) "~src/style/all.less";
@color:#c69860;
/*下载APP*/
.l_app_down{
	position: fixed;
	width: 7.5rem;
	height: 1.1rem;
	margin-left: -3.75rem;
	left: 50%;
	top: 0;
	background: #0c111a;
	z-index: 5;
	img{
		width: 0.68rem;
		height: 0.68rem;
	}
	.down_btn{
		width: 2.4rem;
		height: 0.64rem;
		line-height: 0.64rem;
		text-align: center;
		background: #ff4b48;
		.border-radius(0.05rem);
	}
	.down_des{
		color: #f3f4f5;
	}
}
/*在浏览器打开*/
.open_in_browswer{
	position: absolute;
	right: 0.4rem;
	top: 0;
	width: 3.65rem;
}
/*下载APP*/
.partner_index{
	&.partner_index_bot{
		padding-bottom: 1.5rem;
	}
}
.fixd{
    position: fixed;
    width: 6.9rem;
	top: 0;
    z-index: 5;
}
.c_main{
	color: @color !important;
}
.c_48433d{
	color: #48433d;
}
/*S 顶部*/
.station_account{
	position: relative;
	height: 6.1rem;
	overflow: hidden;
	background: url(../images/index_bg.png) no-repeat center bottom;
	background-size: 100% auto;
	.station_curve{
		position: absolute;
		display: block;
		width: 100%;
		left: 0;
		bottom: 0;
	}
	/*头部按钮*/
	.partner_btn{
		position: absolute;
		bottom: 0.4rem;
		left: 50%;
		display: block;
		width: 2.6rem;
		margin-left: -1.3rem;
		line-height: 0.7rem;
		.gradient_v(#f5d09c,#e1a946);
		.box_shadow(0 0.06rem .24rem rgba(174,128,46,.35));
		.text_center;
		.border-radius(0.35rem);
		.f32;
		color: #84632b;
	}
}
/*E 顶部*/
/*用户信息*/
.partner_info{
	position: relative;
	width: 6.4rem;
	height: 4.35rem;
	background: url(../images/box_bg1.png);
	background-size: cover;
	background-position: center;
	.border-radius(5px);
	background-repeat: no-repeat;
	margin:0.8rem auto 0;
	/*头像*/
	.partner_avatar{
		position: absolute;
		top: -0.72rem;
		left: 50%;
		margin-left: -0.61rem;
		display: block;
		width: 1.22rem;
		height: 1.22rem;
		border: .03rem solid #aab3c2;
		.box_shadow(0 0.2rem 0.24rem rgba(0, 0, 0, 0.04));
		.border-radius(50%);
		.bg_gray;
		&::before{
			display: none;
		}
	}
	/*等级*/
	.station_level,.station_nolevel{
		display: inline-block;
		font-size: .22rem;
		color: #fff;
		padding: .08rem .15rem;
		.gradient_v(#737f8f,#a1a8b6);
		line-height: 1em;
		border-radius: 1rem;
		text-align: center;
	}
	/*金、银、铜*/
	&.partner_info_vip{
		background-image: url(../images/box_bg2.png);
		.partner_avatar{
			border-color: #7e8ab3;
		}
		.name{
			color: #263152;
		}
		.station_level,.station_nolevel{
			.gradient_v(#596796,#7e8bb5);
		}
		.station_date{
			color: #e2e6ed;
		}
		.partner_income_list .partner_income_item:after{
			background: #7e8ab3;
		}
	}
	/*爵位*/
	&.partner_info_jazz{
		background-image: url(../images/box_bg3.png);
		.partner_avatar{
			border-color: #e5c798;
		}
		.name{
			color: #7c5718;
		}
		.station_level{
			.gradient_v(#ca9542,#e2c797);
		}
		.station_date{
			color: #d1a55d;
		}
		.partner_income_list .partner_income_item:after{
			background: #edd2a7;
		}
	}
}
/*头部信息*/
.partner_tit{
	.text_center;
	padding: .64rem .3rem .26rem;
	.name{
		color: #4b5260;
	}
}
/*佣金*/
.partner_income_list{
	display: flex;
	padding-top: .1rem;
	text-align: center;
	color: #fff;
	.partner_income_item{
		flex-grow:1;
		color: #fff;
		position:relative;
		&:after{
			position: absolute;
			top: 0.2rem;
			right: 0;
			content: '';
			width: 1px;
			height: 0.4rem;
			background: #b9bcc9;
		}
		&:last-child{
			&:after{
				display: none;
			}
		}
	}
}
/*同城约单站长特权*/
.partner_privilege{
	border-bottom: .2rem solid @bg_color;
	position: relative;
	.tit{
		width: 4.5rem;
		margin: 0 auto;
		font-size: .32rem;
		line-height: 1;
		color: #6c5234;
		background: url(../images/tit_bg.png) no-repeat;
		background-position: center;
		background-size: 100% auto;
		text-align: center;
	}
	.sub_tit{
		color: #6c5234;
	}
	.partner_privilege_list{
		margin: 0 0.3rem;
		padding: 0.3rem 0;
		li{
			width: 3.86rem;
			height: 1.68rem;
			margin-right: .26rem;
			background: #fff;
			.box_shadow(0 0.02rem 0.26rem rgba(74, 85, 121, 0.08));
			.border-radius(0.08rem);
		}
		a{
			width: 100%;
			height: 100%;
			.plr30;
			.flex;
			.flex_center;
			.justify_between;
		}
		img{
			width: 1rem;
			height: 1rem;
			margin-top: .34rem;
		}
		.info{
			flex:1;
			order: -1;
		}
	}

}
/*tab 站长轻松赚钱*/
.partner_con{
	width: 6.9rem;
	margin: .3rem auto 0;
	.box_shadow(0 0 .46rem rgba(202,206,221,.2));
	padding-top: 1px;
	.partner_nav{
		display: flex;
		justify-content: space-between;
	}
	.partner_nav_item{
		width: 50%;
		height: 1.06rem;
		line-height: 1.06rem;
		text-align: center;
		.gradient(#fe603a , #ef2b2e);
		border-top-left-radius: .1rem;
		border-top-right-radius: .1rem;
		color: #fee1c4;
		position: relative;
		&.on{
			.gradient(#f8e8ca, #f6daa5);
			color: #d94831;
			&::after {
		        content: '';
		        display: block;
		        border-width: .15rem;
		        position: absolute;
		        bottom: 0;
		        left: 50%;
		        margin-left: -.15rem;
		        border-style: dashed dashed solid dashed;
		        border-color: transparent transparent #fff transparent;
		        font-size: 0;
		        line-height: 0;
		    }
		}
	}
	.partner_nav_tit{
		margin-top: 0.5rem;
		text-align: center;
		img{
			display: block;
			height: 0.8rem;
			margin: auto;
		}
		.des{
			color: @color;
			line-height: .5rem;
		}

	}
	.partner_list{
		padding: .2rem .2rem 1px;
		.flex;
		.flex_wrap;
		li{
			width: 100%;
			display: flex;
			align-items: center;
			.border-b(#f0f0f0);
			padding:  .3rem 0 .3rem 0.04rem;
			&:first-child{
				border: none;
			}
			img{
				width: 0.8rem;
				height: 0.8rem;
			}
		}
		.info{
			flex:1;
			margin-left: .18rem;
			margin-right: .15rem;
			h4{
				line-height: 1.8em;
			}
		}
		.btn{
			width: 1.4rem;
			height: .56rem;
			line-height: .56rem;
			.border-radius(0.3rem);
			padding: 0;
			font-size: .24rem;
			color: #fff;
			.gradient_v(#ffb30c,#ff8d01);
			.box_shadow(0 0.05rem .1rem rgba(255,143,1,.3));
			&.btn_detail{
				position: relative;
				box-shadow: none; 
				&:after{
					position: absolute;
					left: 1px;
					top: 1px;
					bottom: 1px;
					right: 1px;
					content: '详情';
					background: #fff;
					.border-radius(0.3rem);
					line-height: .54rem;
					color: #ff9101;
					.f24;
				}
			}
		}
	}
}
/*tab--邀请好友*/
.partner_share_step{
	width: 6.5rem;
	height: 9.3rem;
	margin: auto;
	background: url(../images/share_bg_img.png) no-repeat;
	background-size: 100% 100%;
	text-align: center;
	margin-top: .5rem;
	padding-top: 0.1rem;
	margin-top: 0.8rem;
	.tit{
		height: .74rem;
		line-height: .74rem;
		font-size: .3rem !important;
		color:@color;
	}
	.ewm{
		width: 3rem;
		height: 3rem;
		display: block;
		margin: 0 auto;
		margin-top: -0.8rem;
		border: 1px solid #fbefe0;
	}
	.steps{
		padding: .3rem;
		li{
			display: flex;
			align-items: center;
			margin-bottom: .6rem;
			position: relative;
			&::after{
				content: '';
				display: block;
				width: 0;
				height: .8rem;
				border-left: 1px dashed @line_color;
				position: absolute;
				bottom: -.8rem;
				left:.47rem;
			}
			&:last-child{
				margin-bottom: 0;
				&::after{
					display: none;
				}
			}
		}
		img{
			width: .94rem;
			height: .94rem;
			margin-right: .4rem;
		}
		.info{
			flex: 1;
			text-align: left;
		}
	}
	.invite_btn{
		width: 3.4rem;
		.border-radius(0.4rem);
		.gradient_v(#fe603a,#ef2b2e);
		margin: 0.15rem auto 0.25rem;
		font-size: 0.3rem;
		color: #fff;
		text-align: center;
		line-height: 0.75rem;
		.box_shadow(0 3px 0.24rem rgba(224, 50, 43, 0.35));
	}
}
/*底部按钮*/
.btn_wrap{
	z-index: 10;
}
.btn_block{
	.gradient_v(#fe603a,#ef2b2e);
	box-shadow: none;
}
/*二维码分享*/
.recruit_pop{
	position: fixed;
	top:0;
	left: 0;
	right: 0;
	bottom: 0;
	background: rgba(0,0,0,.4);
	z-index: 10;
	.recruit_box{
		width: 5.6rem;
		position: absolute;
		top:0.5rem;
		left: 0;
		right: 0;
		margin: auto;
		.swiper{
			width: 100%;
			height: 100%;
			border-radius: .2rem;
			overflow: hidden;
		}
		img{
			width: 100%;
			height: 100%;
			display: block;
		}
		.swiper-button-prev,.swiper-button-next{
			width: .38rem;
			height: .91rem;
			background-repeat: no-repeat;
			background-size: cover;
			position: absolute;
			top:50%;
			margin-top: -.19rem;
		}
		.swiper-button-prev{
			left: -.69rem;
			background-image: url(../images/left.png);
		}
		.swiper-button-next{
			background-image: url(../images/right.png);
			right:-.69rem;
		}
		.close{
			width: .61rem;
			height: .61rem;
			background: url(../images/close.png) no-repeat;
			background-size: cover;
			position: absolute;
			top:-.3rem;
			right: -.3rem;
			z-index: 1;
		}
	}
}
/*分享弹窗*/
.shareType{
	width:100%;
	background: #fff;
	position: fixed;
	bottom:0;
	left: 0;
	z-index: 50;
	.shareIcon{
		display: flex;
		.justify_center();
		padding: 0.3rem;
		.share_item{
			width:33.33%;
			text-align:center;
		}
	}
	.iconfont{
		font-size: .8rem;
	}
	p{
		font-size: .24rem;
		margin-top: .1rem;
		text-align:center;
	}
	.cancel{
		height: 1rem;
		line-height:1rem;
		border-top: 1px solid #e5e5e5;
	}
}
/*站长举例*/
.partner_invite_rebate{
	padding: 0.2rem;
	img{
		display: block;
		width: 100%;
	}
}
</style>