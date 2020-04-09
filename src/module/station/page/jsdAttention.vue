<template>
	<div class="oil_invite">
		<!--S banner-->
		<div class="oil_invite_banner">
			<div v-if="$store.state.platform!='wx'">
				<div style="height: 0.89rem" v-show="isFixed" ></div>
				<div class="title" :class="{'fixd':isFixed}">
					<a class="tit_icon left" @click="$router.go(-1)">
						<i class="iconfont icon-arrow-left" ></i>
						<span>返回</span>
					</a>
					<div class="top_close" @click="handleClickLeft">关闭</div>
				</div>
			</div>
			<a class="tit_icon left mt20" v-else>
				<i class="iconfont icon-arrow-left c_fff" @click="handleClickLeft"></i>
			</a>
		</div>
		<div class="oil_invite_banner">
		<!-- 	<a href="http://zmt.fncbcn.com/special/v20189291/index.html" class="fncb"></a> -->
			<img src="../images/tc_img_01.png" />
			<img src="../images/tc_img_03.png" />
			<img src="../images/tc_img_04.png" />
			<img src="../images/tc_img_05.png" />
		</div>
		<div class="service_img">
			<p class="f32 c_fff text_center pt30">视频资讯</p>
			<img-show v-if="!isIos" :videoList="videoList" class="mt30" :height="3.8" :width="6.3"></img-show>
			<img-show-ios v-if="isIos" :videoList="videoList" class="mt30" :height="3.8" :width="6.3"></img-show-ios>
		</div>
		<div class="audio_box">
			<p class="f32 c_7c5622 text_center pb30">语音资讯</p>
			<div class="audio">
				<i class="iconfont icon-icon_bofang" @click="audioPlay"></i>
				<div class="audio_content">
					<p class="f30 c_333">带你一起了解同城约单</p>
					<!-- <p class="c_999 mt10">来自逻辑思维</p> -->
					<div class="audio_line mt20">
						<span class="audio_circle" :style="{'left': (5.15/292*currentTime) + 'rem'}"></span>
					</div>
					<div class="audio_time mt20 c_999">
						<span>{{currentTime|secondTime}}</span>
						<span>4:52</span>
					</div>
				</div>
			</div>
			<audio preload="auto" src="https://zc-static.dadetong.com/common/audio/recording-20181025-223834.mp3" @canplay="playAudio" id="audio"></audio>
		</div>
		<div class="oil_invite_banner">
			<img src="../images/tc_img_07.png" />
			<img src="../images/tc_img_08.png" />
			<img src="../images/tc_img_09.png" />
			<img src="../images/tc_img_10.png" />
			<img src="../images/tc_img_11.png" />
		</div>
		<div class="oil_invite_banner">
			<img src="../images/invite11.png" />
			<img src="../images/invite_last.png" />
		</div>
		<!--E banner-->
		<div class="hei20 bg_gray"></div>
		<!-- S 选项卡 -->
		<div class="tab_detail">
			<div class="station_bg_con swiper-container" id="J_normalBg">
				<div class="swiper-wrapper">
					<div class="station_bg_img swiper-slide" v-for="(el,i) in partnerInfoList" :style="{order:-i}">
						<strong class="f40 station_tit c_fff">{{el.name}}</strong>
						<p v-if="el.introduce">
							<img src="../images/qiquan_icon.png" alt="">
							<span class="c_fff ellipsis">{{el.introduce}}</span>
						</p>
						<img :src="el.background|imgUrl" alt="" class="par_img">
						<span class="f42 price">{{el.price}}</span>
					</div>
				</div>
			</div>
			<div class="partner_nav_tit">
				<div class="text_center">
					<p class="f42 c_7c5622">站长预计收益</p>
					<img src="../images/line.png" alt="">
					<p class="c_7c5622 f30">根据您所购买的站长版本计算一年收益</p>
				</div>
				<div class="earning">
					<ul>
						<li class="flex flex_center justify_between">
							<div>
								<p class="c_7c5622 f32">直邀站长现金奖励<span>{{level1Rate*100}}%</span></p>
								<p class="f24 c_888 mt15">站长直接邀请1名好友成为{{topStationName}}</p>
							</div>
							<p class="price">赚取：￥{{parseInt(level1Rate*100)*topPrice/100}}元</p>
						</li>
						<li class="flex flex_center justify_between">
							<div>
								<p class="c_7c5622 f32">二级邀请现金奖励<span>{{level2Rate*100}}%</span></p>
								<p class="f24 c_888 mt15">二级邀请1名好友成为{{topStationName}}</p>
							</div>
							<p class="price">赚取：￥{{parseInt(level2Rate*100)*topPrice/100}}元</p>
						</li>
						<li class="flex flex_center justify_between">
							<div>
								<p class="c_7c5622 f32">直邀用户消费返佣<span>{{level1bro*100}}%</span></p>
								<p class="f24 c_888 mt10">站长直接用户全年在平台任意消费9800元</p>
							</div>
							<p class="price">赚取：￥{{9800*level1bro}}元</p>
						</li>
						<li class="flex flex_center justify_between border-n">
							<div>
								<p class="c_7c5622 f32">二级邀请消费返佣<span>{{level2bro*100}}%</span></p>
								<p class="f24 c_888 mt10">二级邀请用户全年在平台任意消费9800元</p>
							</div>
							<p class="price">赚取：￥{{9800*level2bro}}元</p>
						</li>
					</ul>
				</div>
				<div class="text_center pb50">
					<p class="c_7c5622 f30">每人邀请99个{{topStationName}}</p>
					<p class="c_7c5622 f30">您一年将收益: <strong class="f36 c_f1302f">￥{{(level1Rate*topPrice+level2Rate*topPrice+9800*(level1bro+level2bro*99))*99|number(0)}}元</strong></p>
				</div>
			</div>
		</div>
		<!-- E 选项卡 -->
		<div class="btn_wrap ptb40">
			<a href="javascript:void(0);" @click="goStation" class="station_btn">立即体验</a>
		</div>
	</div>
</template>
<script>
import {
	fetchPartnerconfList, //等级配置列表
	fetchAppLogin,
	fetchPartnerOrderCreate, //下单
} from '../service/getData';
import {
	fetchUserType, //获取当前用户掌柜等级
	fetchIslogin, //判断用户是否登录
} from 'src/service/getData'
import {appLogin,getAppFlag,appDownLoad} from 'src/config/mUtils'; //分享
import {isAndroid} from 'src/config/env'; //分享
import imgShow from '../components/imgShow';
import imgShowIos from '../components/imgShowIos';
import zz01 from '../images/zz01.jpg';
import zz02 from '../images/zz02.jpg';
import zz03 from '../images/zz03.jpg';
import zz04 from '../images/zz04.jpg';
import zz05 from '../images/zz05.jpg';
import zz06 from '../images/zz06.jpg';
import { setInterval } from 'timers';
export default {
	data() {
		return {
			tab: 0, //站长tab
			partnerInfoList: [],//配置列表
			userInfo: {},//用户信息
			userIsLogin: false, //用户是否登录
			userLevelCode: '', //当前用户等级code
			userLevel: 0, //当前用户等级
			partnerLevelCode: '', //当前选择的等级code
			partnerLevel: 0, //当前选择的等级
			stationIndex: 0, //轮播下标
			stationName: '', //当前站长名称
			topStationName: '', //最高等级站长名称
			isFixed: false, //顶部是否悬浮
			videoList: [
				{prePhoto: zz01,video: 'https://zc-static.dadetong.com/common/video/zz01.mp4'},
				{prePhoto: zz02,video: 'https://zc-static.dadetong.com/common/video/zz02.mp4'},
				{prePhoto: zz03,video: 'https://zc-static.dadetong.com/common/video/zz03.mp4'},
				{prePhoto: zz04,video: 'https://zc-static.dadetong.com/common/video/zz04.mp4'},
				{prePhoto: zz05,video: 'https://zc-static.dadetong.com/common/video/zz05.mp4'},
				{prePhoto: zz06,video: 'https://zc-static.dadetong.com/common/video/zz06.mp4'},
			],
			audio: null, //音频对象
			allTime: 0, //音频总时长
			currentTime: 0, //当前时长
			topPrice: 0, //最高级等级金额
			isIos: false
		}
	},
	components: {
		imgShow,
		imgShowIos
	},
	computed: {
		//站长金额
		stationPrice () {
			return this.partnerInfoList.length&&this.partnerInfoList[this.tab-1-this.stationIndex].price;
		},
		//一级邀请奖励金比率
		level1Rate () {
			return this.partnerInfoList.length&&this.partnerInfoList[this.tab-1-this.stationIndex].invitePartnerBrokerageList[0].value;
		},
		//二级邀请奖励金比率
		level2Rate () {
			if (this.partnerInfoList.length&&this.partnerInfoList[this.tab-1-this.stationIndex].invitePartnerBrokerageList.length>=2) {
				return this.partnerInfoList.length&&this.partnerInfoList[this.tab-1-this.stationIndex].invitePartnerBrokerageList[1].value;
			} else {
				return 0;
			}
		},
		//一级佣金比率
		level1bro () {
			return this.partnerInfoList.length&&this.partnerInfoList[this.tab-1-this.stationIndex].tradeBrokerageRateList[0].value;
		},
		//二级佣金比率
		level2bro () {
			if (this.partnerInfoList.length&&this.partnerInfoList[this.tab-1-this.stationIndex].tradeBrokerageRateList.length>=2) {
				return this.partnerInfoList.length&&this.partnerInfoList[this.tab-1-this.stationIndex].tradeBrokerageRateList[1].value;
			} else {
				return 0;
			}
		}
	},
	mounted () {
		if (isAndroid) {
			this.isIos = false;
		} else {
			this.isIos = true;
		}
		window.addEventListener('scroll',this.fixedTab) //开启滚动悬浮
		this.playAudio();
	},
	activated() {
		if (this.$store.state.platform != 'wx') {
			if (isAndroid) {
				window.android.hideNativeTitlebar();//隐藏标题栏
			}
		}
		this.getPartnerInfo(); //等级配置列表
	},
	beforeRouteLeave(to,from,next){
        window.removeEventListener('scroll',this.fixedTab) //关闭滚动悬浮
        next();
    },
	methods: {
		//音频播放
		playAudio () {
			this.audio = document.querySelector("audio");
			this.allTime = this.audio.duration.toFixed(0);
			setInterval(()=>{
				this.currentTime = this.audio.currentTime.toFixed(0);
			},1000)
		},
		audioPlay () {
			if (this.audio.paused) {
				this.audio.play()
			}else{
				this.audio.pause()
			}
		},
		//选项卡悬浮
        fixedTab(){
            if (window.scrollY >= 0) {
                this.isFixed = true;
            } else {
                this.isFixed = false;
            }
		},
		//跳转
		handleClickLeft () {
			if (this.$store.state.platform == 'wx') {
				this.$router.go(-1);
			} else {
				if (isAndroid) {
					window.android.exitWebAct();//关闭界面
				} else {
					window.location.href = 'jsd://JSDLCHome/dimssToHomeVC';
				}
			}
		},
		//获取用户等级配置列表
		getPartnerInfo () {
			fetchPartnerconfList().then(res => {
				if (res.status) {
					this.partnerInfoList = res.data.list||[];
					this.tab = res.data.list.length;
					if (res.data.list.length) {
						this.$nextTick(function(){
							this.swiper3 = new Swiper('#J_normalBg', {
								spaceBetween: 20,
								centeredSlides: true,
								slidesPerView: 1.25,
								onSlideChangeEnd:(swiper)=>{
									this.stationIndex = swiper.activeIndex //切换结束时，告诉我现在是第几个slide
									this.partnerLevelCode = this.partnerInfoList[this.tab-1-this.stationIndex].code;
									this.partnerLevel = this.partnerInfoList[this.tab-1-this.stationIndex].level;
									this.stationName = this.partnerInfoList[this.tab-1-this.stationIndex].name;
								}
							});
						})
						this.partnerLevelCode = res.data.list[res.data.list.length-1].code;
						this.partnerLevel = res.data.list[res.data.list.length-1].level;
						this.stationName = res.data.list[res.data.list.length-1].name;
						this.topStationName = res.data.list[res.data.list.length-1].name;
						this.topPrice = res.data.list[res.data.list.length-1].price;
					}
				}
			})
		},
		//立即成为站长
		goStation () {
			this.$router.push('/index');
		},
		//查询当前用户等级
		getUserType () {
			fetchUserType().then(res => {
				if (res.status) {
					this.userInfo = res.data;
					this.userLevelCode = res.data.partnerLevelCode;
					this.userLevel = res.data.level;
				}
			})
		}
	}
}
</script>
<style lang="less">
@import (reference) '~src/style/all.less';
.honor{
    width: 6.26rem;
	height: 4.03*1.2rem;
    .swiper-slide{
		vertical-align: middle;
        width: 2.9*1.2rem;
        text-align: center;
    }
}
.building{
	width: 7rem;
	height: 7.2rem;
    .swiper-slide{
		text-align: center;
		width: 5.15rem;
	}
}
.tit_icon{
	z-index: 10;
	span {
		line-height: 0.88rem;
	}
}
</style>

<style lang="less" scoped>
@import (reference) '~src/style/all.less';
.c_7c5622{
	color: #7c5622 !important;
}
.c_f1302f{
	color: #f1302f !important;
}
.fixd{
    position: fixed;
    width: 7.5rem;
	top: 0;
    z-index: 5;
}
.audio_box{
	width: 100%;
	background: #f6ebd7;
	padding: 0.3rem;
	padding-top: 1.2rem;
	.audio{
		width: 100%;
		height: 1.75rem;
		background: #fff;
		.flex;
		.flex_center;
		i{
			display: inline-block;
			width: 1.4rem;
			height: 100%;
			font-size: 0.8rem;
			line-height: 1.75rem;
			text-align: center;
			color: #11a910;
		}
		.audio_line{
			width: 5.15rem;
			height: 0.04rem;
			background: #e9e9e9;
			position: relative;
			.audio_circle{
				position: absolute;
				display: inline-block;
				width: 0.2rem;
				height: 0.2rem;
				border-radius: 50%;
				background: #333;
				left: 0;
				bottom: -0.07rem;
			}
		}
		.audio_time{
			.flex;
			.justify_between;
		}
	}
}
.top_close{
	position: absolute;
	left: 2rem;
	font-size: 0.28rem;
}
#float-captcha{
    position: absolute;
    top: 0;
    right: 0;
    width: 2.05rem;
    height: 100%;
    opacity: 0;
}
/*S banner*/
.oil_invite {
	min-height: 100%;
	background: #fff;
}
.oil_invite_banner {
	position: relative;
	.fncb{
		position: absolute;
		display: inline-block;
		width: 2.7rem;
		height: 0.8rem;
		right: 0.85rem;
		top: 0.35rem;
		z-index: 10;
	}
	img {
		display: block;
		width: 100%;
	}
}
.service_img{
	width: 100%;
	height: 4.05rem;
	background: #e2b974;
}
/*E banner*/
.tab_detail{
	padding-bottom: 2rem;
	background: #fff;
}
.station_bg_con{
	width: 7.5rem;
	overflow: hidden;
	margin: 0 auto;
	margin-top: 0.5rem;
	.station_bg_img{
		width: 5.93rem;
		height: 3.2rem;
		background-image: url('../images/extreme_bg.png');
		background-size: cover;
		background-position: center center;
		position: relative;
		.station_tit{
			position: absolute;
			left: 0.3rem;
			top: 0.5rem;
		}
		.par_img{
			width: 1.6rem;
			position: absolute;
			right: 0.4rem;
			top: 0.5rem;
		}
		p{
			.flex;
			.flex_center;
			margin-top: 1.3rem;
			margin-left: 0.3rem;
			padding: 0.06rem 0.1rem;
			.gradient_v(#cb9642,#dfc595);
			width: 3.5rem;
			.border-radius(0.2rem);
			img{
				width: 0.32rem;
				margin-right: 0.1rem;
			}
		}
		.price{
			position: absolute;
			bottom: 0.55rem;
			left: 1.25rem;
			color: #7c5718;
		}
	}
}
.partner_nav_tit{
	margin: 0.3rem;
	margin-top: 0.5rem;
	padding-top: 0.5rem;
	.box_shadow(0 0 0.46rem rgba(202,206,221,0.5));
	img{
		display: block;
		width: 2.8rem;
		margin: 0.15rem auto;
	}
}
.earning{
	width: 6.5rem;
	margin: 0.4rem auto;
	border: 1px solid #f9e6cf;
	background: #fff;
	ul{
		li{
			border-bottom: 1px solid #f9e6cf;
			height: 1.4rem;
			padding-left: 0.15rem;
			padding-right: 0.35rem;
			div{
				max-width: 3.6rem;
			}
			.price{
				color: #f1302f;
				font-size: 0.3rem;
			}
		}
	}
}
.station_btn{
	display: block;
    width: 6.14rem;
    margin: 0 auto;
    text-align: center !important;
    color: #fff;
	.gradient_v(#fd6954,#ff4b48);
    height: 1.06rem;
    border-radius: 0.53rem;
    line-height: 1.06rem;
	font-size: 0.42rem;
	font-weight: bold;
}
</style>