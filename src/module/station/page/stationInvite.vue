<template>
	<div class="oil_invite">
		<!--S banner-->
		<div class="oil_invite_banner">
			<a class="tit_icon left" @click="handleClickLeft">
				<i class="iconfont icon-arrow-left c_fff"></i>
			</a>
			<img src="../images/invite1.png" />
			<img src="../images/invite2.png" />
			<img src="../images/invite3.png" />
			<img src="../images/invite4.png" />
			<img src="../images/invite5.png" />
		</div>
		<div class="swiper-container service_img" id="J_service_img">
			<ul class="swiper-wrapper">
				<li class="swiper-slide">
					<img src="../images/service_img_01.png" alt="">
				</li>
				<li class="swiper-slide">
					<img src="../images/service_img_02.png" alt="">
				</li>
				<li class="swiper-slide">
					<img src="../images/service_img_03.png" alt="">
				</li>
				<li class="swiper-slide">
					<img src="../images/service_img_04.png" alt="">
				</li>
				<li class="swiper-slide">
					<img src="../images/service_img_05.png" alt="">
				</li>
			</ul>
			<div class="swiper-pagination"></div>
		</div>
		<div class="oil_invite_banner">
			<img src="../images/invite6.png" />
			<img src="../images/invite7.png" />
			<img src="../images/invite8.png" />
		</div>
		<div class="honor swiper-container" id="J_honor">
			<ul class="swiper-wrapper">
				<li class="swiper-slide">
					<img src="../images/01.png" alt="">
				</li>
				<li class="swiper-slide">
					<img src="../images/02.png" alt="">
				</li>
				<li class="swiper-slide">
					<img src="../images/03.png" alt="">
				</li>
				<li class="swiper-slide">
					<img src="../images/04.png" alt="">
				</li>
				<li class="swiper-slide">
					<img src="../images/05.png" alt="">
				</li>
				<li class="swiper-slide">
					<img src="../images/06.png" alt="">
				</li>
				<li class="swiper-slide">
					<img src="../images/07.png" alt="">
				</li>
				<li class="swiper-slide">
					<img src="../images/08.png" alt="">
				</li>
				<li class="swiper-slide">
					<img src="../images/09.png" alt="">
				</li>
				<li class="swiper-slide">
					<img src="../images/10.png" alt="">
				</li>
				<li class="swiper-slide">
					<img src="../images/11.png" alt="">
				</li>
				<li class="swiper-slide">
					<img src="../images/12.png" alt="">
				</li>
				<li class="swiper-slide">
					<img src="../images/13.png" alt="">
				</li>
				<li class="swiper-slide">
					<img src="../images/14.png" alt="">
				</li>
				<li class="swiper-slide">
					<img src="../images/15.png" alt="">
				</li>
				<li class="swiper-slide">
					<img src="../images/16.png" alt="">
				</li>
				<li class="swiper-slide">
					<img src="../images/17.png" alt="">
				</li>
				<li class="swiper-slide">
					<img src="../images/18.png" alt="">
				</li>
				<li class="swiper-slide">
					<img src="../images/19.png" alt="">
				</li>
				<li class="swiper-slide">
					<img src="../images/20.png" alt="">
				</li>
				<li class="swiper-slide">
					<img src="../images/21.png" alt="">
				</li>
			</ul>
			<div class="swiper-button-prev swiper-button-white"></div>
    		<div class="swiper-button-next swiper-button-white"></div>
		</div>
		<div class="oil_invite_banner">
			<img src="../images/invite9.png" />
		</div>
		<div class="building swiper-container" id="J_building">
			<ul class="swiper-wrapper">
				<li class="swiper-slide">
					<img src="../images/building/01.jpg" alt="">
				</li>
				<li class="swiper-slide">
					<img src="../images/building/02.jpg" alt="">
				</li>
				<li class="swiper-slide">
					<img src="../images/building/03.jpg" alt="">
				</li>
				<li class="swiper-slide">
					<img src="../images/building/04.jpg" alt="">
				</li>
				<li class="swiper-slide">
					<img src="../images/building/05.jpg" alt="">
				</li>
				<li class="swiper-slide">
					<img src="../images/building/06.jpg" alt="">
				</li>
				<li class="swiper-slide">
					<img src="../images/building/07.jpg" alt="">
				</li>
				<li class="swiper-slide">
					<img src="../images/building/08.jpg" alt="">
				</li>
				<li class="swiper-slide">
					<img src="../images/building/09.jpg" alt="">
				</li>
				<li class="swiper-slide">
					<img src="../images/building/10.jpg" alt="">
				</li>
				<li class="swiper-slide">
					<img src="../images/building/11.jpg" alt="">
				</li>
				<li class="swiper-slide">
					<img src="../images/building/12.jpg" alt="">
				</li>
				<li class="swiper-slide">
					<img src="../images/building/13.jpg" alt="">
				</li>
				<li class="swiper-slide">
					<img src="../images/building/14.jpg" alt="">
				</li>
				<li class="swiper-slide">
					<img src="../images/building/15.jpg" alt="">
				</li>
			</ul>
			<div class="swiper-button-prev swiper-button-white"></div>
    		<div class="swiper-button-next swiper-button-white"></div>
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
							<p class="price">￥{{parseInt(level1Rate*100)*topPrice/100}}</p>
						</li>
						<li class="flex flex_center justify_between">
							<div>
								<p class="c_7c5622 f32">二级邀请现金奖励<span>{{level2Rate*100}}%</span></p>
								<p class="f24 c_888 mt15">二级邀请1名好友成为{{topStationName}}</p>
							</div>
							<p class="price">￥{{parseInt(level2Rate*100)*topPrice/100}}</p>
						</li>
						<li class="flex flex_center justify_between">
							<div>
								<p class="c_7c5622 f32">直邀用户消费返佣<span>{{level1bro*100}}%</span></p>
								<p class="f24 c_888 mt15">站长直接用户全年在平台任意消费9800元</p>
							</div>
							<p class="price">￥{{9800*level1bro}}</p>
						</li>
						<li class="flex flex_center justify_between border-n">
							<div>
								<p class="c_7c5622 f32">二级邀请消费返佣<span>{{level2bro*100}}%</span></p>
								<p class="f24 c_888 mt15">二级邀请用户全年在平台任意消费9800元</p>
							</div>
							<p class="price">￥{{9800*level2bro}}</p>
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
		<!--S 登录框-->
		<div class="form layer_shadow" v-show="formVisible">
            <div class="form_box layer_box">
                <div class="form_item">
                    <input type="text" placeholder="请填写手机号码" v-model.trim="mobile" maxlength="11">
                </div>
                <div class="form_item">
                    <input type="text" placeholder="请输入验证码" v-model.trim="code" maxlength="6" autocomplete="off">
                    <input type="button" :value="codeText" @click="sendCode">
                    <!--S 极验-->
    				<div id="float-captcha" v-show="getIsAbleJiYan()"></div>
    				<!--E 极验-->
                </div>
                <div class="form_btn" @click="handleLogin"></div>
				<div class="btn_line">
					<img src="../images/close_btn.png" alt="" @click="formVisible = false">
				</div>
            </div>
        </div>
		<!--E 登录框-->
		<div class="btn_wrap ptb40">
			<a href="javascript:void(0);" @click="goStation" class="station_btn">{{btnWord}}</a>
		</div>
		<!--
        	作者：gaoxiaopeng@ddtkj.com
        	时间：2018-10-12
        	描述：引导用户关注公众号组件
        -->
        <!-- <com-qrcode ref="qrcode" :query="'t=7@mid='+reference" @nextFn="routerOilInvitePartner" ></com-qrcode> -->
	</div>
</template>
<script>
import comQrcode from 'src/components/com-qrcode'; // 关注二维码 弹窗组件

import {
    fetchLoginValidCode,//发送验证码
	fetchValidCodeLogin,//验证码登录
	fetchGeetestRegister, //获取极验
	fetchLoginOrRegisterValidCode, //微信绑定/注册获取验证码
	fetchThirdBindAndLogin, //绑定第三方并登录
	fetchThirdBindAndRegist, //绑定第三方并注册
} from 'src/module/common/account/service/getData';
import {REGEX} from 'src/config/env';
import {wxShare,appDownLoad} from 'src/config/mUtils';
import gtInit from 'src/plugins/geetest'//极验
import {
	fetchProfileDetail,//获取极验开关
	fetchIslogin,//判断是否登录
	fetchUserType, //获取当前用户掌柜等级
	fetchGetCommonShotUrl,  //生成短链
} from 'src/service/getData'
import {
	fetchGetCommonDetail,
	fetchPartnerconfList, //等级配置列表
	fetchPartnerOrderCreate, //下单
} from '../service/getData';
export default {
	data() {
		return {
			formVisible: false, //登录弹窗显示隐藏
			codeText:'发送验证码',  //获取验证码文字
			codeFlag:true,  //验证码点击
			time:120,    //验证码时间
			mobile:'',//手机号
			code:'',//验证码
			isLogin:false,//判断是否登录
			reference:'', //邀请人
			geetestFlag:false,//极验开关
            geetest_challenge:'',//极验
            geetest_validate :'',//极验
			geetest_seccode :'',//极验
			shareData:{},//分享内容
			isNewUser:false, //是否是新用户
			tab: 0, //站长tab
			partnerInfoList: [],//配置列表
			userInfo: {},//用户信息
			userLevelCode: '', //当前用户等级code
			userLevel: 0, //当前用户等级
			partnerLevelCode: '', //当前选择的等级code
			partnerLevel: 0, //当前选择的等级
			inviteCode: '', //邀请码
			stationIndex: 0, //轮播下标
			stationName: '', //当前站长名称
			topStationName: '', //最高等级站长名称
			topPrice: 0, //最高级等级金额
		}
	},
	components: {comQrcode},
	mounted () {
		this.$nextTick(function(){
			var mySwiper = new Swiper('#J_service_img',{
				pagination : '.swiper-pagination'
			});
			this.swiper1 = new Swiper('#J_honor', {
				effect: 'coverflow',
				autoplay: 3000,
				autoplayDisableOnInteraction: false,
				grabCursor: true,
				centeredSlides: true,
				slidesPerView: 'auto',
				loop: true,
				loopAdditionalSlides :0,
				prevButton:'.swiper-button-prev',
				nextButton:'.swiper-button-next',
				coverflow: {
					rotate: 0,
					stretch: 30,
					depth: 300,
					modifier: 1,
					slideShadows: false
				}
			});
			this.swiper2 = new Swiper('#J_building', {
				effect: 'coverflow',
				autoplay: 3000,
				autoplayDisableOnInteraction: false,
				grabCursor: true,
				centeredSlides: true,
				slidesPerView: 'auto',
				loop: true,
				loopAdditionalSlides :0,
				prevButton:'.swiper-button-prev',
				nextButton:'.swiper-button-next',
				coverflow: {
					rotate: 0,
					stretch: 30,
					depth: 300,
					modifier: 1,
					slideShadows: false
				}
			});
		})
	},
	activated() {
		if(this.$route.query.mid){
            this.reference = this.$route.query.mid;
		}
		//获取极验开关
        this.getJiYanFlag();
		this.getIsLogin(); //获取是否登录
		this.getPartnerInfo(); //等级配置列表
	},
	computed: {
		//按钮名称
		btnWord () {
			if (!this.isLogin) {
				return '立即成为' + this.stationName
			} else if (this.isLogin&&!this.userLevelCode) {
				return '立即成为' + this.stationName
			} else {
				if (this.partnerLevel<=this.userLevel) {
					return '立即下载同城约单APP'
				} else {
					return '立即购买' + this.stationName
				}
			}
		},
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
	methods: {
		//跳转
		handleClickLeft () {
			this.$router.push('/stationIndex');
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
			//未登录跳转jsd登录
			if (!this.isLogin) {
				this.formVisible = true;
			} else if (this.isLogin&&!this.userLevelCode) { //登录且不是站长
				fetchPartnerOrderCreate(this.partnerLevelCode,true).then(res => {
					if(res.data.orderNo){
						this.$router.push('/stationPay?orderNo='+res.data.orderNo+'&inviteCode='+this.reference)
					}
				})
			} else { //登录且是站长
				if (this.partnerLevel<=this.userLevel) { //当前等级及其下等级
					appDownLoad();
				} else { //其上等级
					fetchPartnerOrderCreate(this.partnerLevelCode,true).then(res => {
						if(res.data.orderNo){
							this.$router.push('/stationPay?orderNo='+res.data.orderNo+'&inviteCode='+this.reference)
						}
					})
				}
			}
		},
		//查询当前用户等级
		getUserType () {
			fetchUserType().then(res => {
				if (res.status) {
					this.userInfo = res.data;
					this.userLevelCode = res.data.partnerLevelCode;
					this.userLevel = res.data.level;
					this.inviteCode = res.data.mobile;
					this.shareTit();//获取掌柜分享标题和内容
				}
			})
		},
		shareTit(){//获取掌柜分享标题和内容
			fetchGetCommonDetail('tc','TC_PARTNER_SHARE_INFO').then(res=>{
				if(res.status){
					this.shareData= JSON.parse(res.data.list.TC_PARTNER_SHARE_INFO.value);
					wxShare(this.shareData.url+'?mid='+this.userInfo.mobile,this.shareData.title,this.shareData.content,window.location.origin + '/static/img/logo.png');
				}
			})
		},
		//获取极验开关
		getJiYanFlag(){
			fetchProfileDetail('geetest_flag','tc').then(res=>{
				if(res.data&&res.data.sysProfileVo&&res.data.sysProfileVo.value=='Y'){
					this.geetestFlag = true;
					//获取极验--初始化极验
					this.getCodeJiYan();
				}
			})
		},
        //极验是否显示
		getIsAbleJiYan(){
			//校验手机号
			if(!this.mobile) {
				return false;
			}
			if(!REGEX.mobile.regex.test(this.mobile)) {
				return false;
			}
			//极验开关是否开启
			if(!this.geetestFlag){
				return false;
			}
			return true;
		},
        //获取极验
		getCodeJiYan() {
			fetchGeetestRegister().then(res => {
				// 使用initGeetest接口
				// 参数1：配置参数
				// 参数2：回调，回调的第一个参数验证码对象，之后可以使用它做appendTo之类的事件
				initGeetest({
					gt: res.data.gt,
					challenge: res.data.challenge,
					product: "float",
					offline: !res.data.success,
					width:'100%'
				}, this.handlerEmbed);
			})
		},
        //极验成功
		handlerEmbed(captchaObj) {
			// 成功的回调
			captchaObj.onSuccess(() => {
				var validate = captchaObj.getValidate();
				this.geetest_challenge = validate.geetest_challenge;
				this.geetest_validate = validate.geetest_validate;
				this.geetest_seccode = validate.geetest_seccode;
				this.sendCode();
				document.querySelector("#float-captcha").innerHTML="";
				this.getCodeJiYan();
			});
			captchaObj.onClose(function () {

			});
			// 将验证码加到id为captcha的元素里
			captchaObj.appendTo("#float-captcha");
			captchaObj.onReady(function() {
			});
		},
		//判断是否登录
		getIsLogin(){
			//DDT_TC_MEMBER_UN_ISLOGIN
			fetchIslogin().then(res => {
				if(res.status){
					this.isLogin=res.data.login;
					if (this.isLogin) {
						this.getUserType();
					}
				}else{
					alertTip(res.msg);
				}
			});
		},
		sendCode(){
			if(!this.mobile){
				alertTip('请输入手机号');
				return
			}
			if(!REGEX.mobile.regex.test(this.mobile)) {
                alertTip(REGEX.mobile.msg);
                return;
			}
			
			
			if(this.$store.state.wechatSystem)//微信环境
			{
				//获取绑定或注册的短信验证码
				fetchLoginOrRegisterValidCode(this.mobile).then(res => {
					
					this.codeFlag = false;//禁止重复点击
					if(res.status){
						if(res.data && res.data.newUser){
							// 是新用户
							this.isNewUser = true;
						}else{
							// 不是新用户
							this.isNewUser = false;
						}
					}
					
					
					
					if(res.status){
						this.time = 120;
						alertTip('发送成功');
						this.t = setInterval(() => {
							this.time--;
							this.codeText = '已发送（'+this.time + 's）';
							if(this.time <= 0) {
								clearInterval(this.t);
								this.codeText = '发送验证码';
								this.codeFlag = true;
							}
						}, 1000)
					}
				})
			
			
			}else{
				//DDT_TC_MEMBER_LOGINMOBILEVERIFYCODE
				fetchLoginValidCode(this.mobile).then(res => {
					this.codeFlag = false;
					if(res.status){
						this.time = 120;
						alertTip('发送成功');
						this.t = setInterval(() => {
							this.time--;
							this.codeText = '已发送（'+this.time + 's）';
							if(this.time <= 0) {
								clearInterval(this.t);
								this.codeText = '发送验证码';
								this.codeFlag = true;
							}
						}, 1000)
					}
				})
			}
			
			
		},
		//去登录
        handleLogin(){
            if(!this.mobile){
                alertTip('请输入手机号');
                return
            }
            if(!REGEX.mobile.regex.test(this.mobile)) {
                alertTip(REGEX.mobile.msg);
                return;
            }
            if(!this.code){
                alertTip('请输入验证码');
                return
            }
             if(this.$store.state.wechatSystem)//微信环境
			{
				if(this.isNewUser){
					//没注册过
					this.bindAndRegist()
				}else{
					//注册过
					this.bindAndLogin()
				}
				
			}else{
				//DDT_TC_MEMBER_VERIFYCODELOGIN
				fetchValidCodeLogin(this.mobile,this.code,window.location.href,'','',this.reference).then(res => {
					if(res.status){
						this.comQrCodeShow()
					}
				})
			}
        },
        comQrCodeShow(){
        	this.formVisible=false;//隐藏登陆弹窗
			// this.$refs.qrcode.createWechatCode();
			this.routerOilInvitePartner();
		},
        routerOilInvitePartner(){
			this.formVisible = false;
			this.getIsLogin();
			fetchPartnerOrderCreate(this.partnerLevelCode,true).then(res => {
				if(res.data.orderNo){
					this.$router.push('/stationPay?orderNo='+res.data.orderNo+'&inviteCode='+this.reference)
				}
			})
        },
         // 微信绑定并注册
		bindAndRegist(){
			fetchThirdBindAndRegist(this.mobile, this.mobile, this.code, this.reference, this.$store.state.openid).then( res => {
				 if(res.status){
                   this.comQrCodeShow()
                }
			})
		},
        // 微信绑定并登录
		bindAndLogin(){
			fetchThirdBindAndLogin(this.mobile, this.code, this.code, 1, this.$store.state.openid).then( res => {
				 if(res.status){
                   this.comQrCodeShow()
                }
			})
		},
	}
}
</script>
<style lang="less">
@import (reference) '~src/style/all.less';
.service_img{
	.swiper-pagination-bullet{
		width: 0.18rem;
		height: 0.18rem;
		border-radius: 50%;
		border: 1px solid #cfa762;
		background: transparent;
	}
	.swiper-pagination-bullet-active{
		background: #cfa762;
	}
}
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
	background: #f5f0ea;
}
.oil_invite_banner {
	img {
		display: block;
		width: 100%;
	}
}
.service_img{
	height: 8.54rem;
	margin-bottom: 0.36rem;
	ul{
		padding-left: 0.5rem;
	}
	img{
		width: 6.21rem;
	}
}
/*E banner*/

.oil_invite_btn {
	position: fixed;
	bottom: 0;
	left: 0;
	width: 100%;
	height: 1.2rem;
	display: block;
	z-index: 10;
	background: #fff;
	a{
		display: block;
		width: 6.5rem;
		height: 1.08rem;
		background: #fe4f4a;
	}
}
/*S 登陆框*/
.form_box{
    width: 6.44rem;
    height: 6.72rem;
    margin-left: -3.21rem;
    background: url(../images/form_bg.png) no-repeat;
    background-size: cover;
	padding: 3.2rem .35rem 0;
	z-index: 20;
    .close{
        width: .47rem;
        height: .47rem;
        position: absolute;
        right: .68rem;
        top: .65rem;
    }
    .iconfont{
        color: #b9b9b9;
        font-size: .44rem;
        position: absolute;
        top:0;
        left: .18rem;
        bottom: 0;
        margin:auto;
    }
    input{
        height: 0.82rem;
        line-height: 0.82rem;
        border-radius: .1rem;
        font-size: .28rem;
        &[type=text]{
            flex:1;
            width: 100%;
            background: #f1f1f1;
			padding-left: .35rem;
			border: 1px solid #ebebeb;
        }
        &[type=button]{
            width: 2.05rem;
            text-align: center;
            background: #f1f1f1;
			color: #ff4451;
			border: 1px solid #ebebeb;
            margin-left: .12rem;
        }
    }
    .form_item{
        display: flex;
        width: 100%;
        height: 0.82rem;
        line-height: 0.82rem;
        margin-bottom: .2rem;
        position: relative;
    }
    .form_btn{
        width: 100%;
        height: 0.82rem;
        text-align: center;
        border-radius: .2rem;
        font-size: .4rem;
        margin-bottom: .4rem;
    }
}
.btn_line{
	position: absolute;
	bottom: -1.07rem;
	left: 0;
	right: 0;
	margin: 0 auto;
	text-align: center;
	img{
		width: 0.56rem;
		height: 1.07rem;
	}
}
/*E 登陆框*/
/*S banner*/
.oil_invite {
	min-height: 100%;
	background: #fff;
}
.oil_invite_banner {
	img {
		display: block;
		width: 100%;
	}
}
.service_img{
	height: 8.54rem;
	margin-bottom: 0.36rem;
	ul{
		padding-left: 0.5rem;
	}
	img{
		width: 6.21rem;
	}
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