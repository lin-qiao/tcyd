<template>
	<div class="l_register login pb300 pos_rel">
		<!--S 头部-->
		<div class="l_register_title">
			<top title="" :isReturn="false"></top>
			<img src="../images/login_img.png" alt="">
			<p class="c_666 mt10 mb30">注册成为同城约单用户</p>
			<!--<p class="c_z_main mb10 plr30">赚取百万年薪</p>-->
		</div>
		<!--E 头部-->
		<div class="yl_mode_list">
			<!--S 手机号-->
			<div class="yl_mode_item">
				<div class="yl_icon">
					<i class="iconfont icon-shouji"></i>
				</div>
				<input type="text" v-model.trim="mobile" maxlength="11" placeholder="请输入手机号">
			</div>
			<!--E 手机号-->
			<!--S 图形验证码-->
			<!--<img-valid-code v-model.trim="imgCode" ref="imgValidCode"></img-valid-code>-->
			<!--E 图形验证码-->
			<!--S 短信验证码-->
			<get-code v-model.trim = 'validCode' ref="getCode" @getCode="getCode" :ableGeetest="ableGeetest"></get-code>
			<!--E 短信验证码-->
			<!--S 密码-->
			<div class="yl_mode_item">
				<div class="yl_icon">
					<i class="iconfont icon-suo"></i>
				</div>
				<input :type="showPassword?'text':'password'" v-model.trim="pswd" placeholder="密码8到20位，至少包含字母和数字">
				<div class="yl_icon l_register_icon">
					<i class="iconfont" :class="showPassword?'icon-artboard79':'icon-jiemao'" @click="showPassword = !showPassword"></i>
				</div>
			</div>
			<!--E 密码-->
			<!--S 邀请人手机号-->
			<div class="yl_mode_item mt20">
				<div class="yl_icon">
					<i class="iconfont icon-phone1 l_icon_phone"></i>
				</div>
				<input type="text" v-model.trim="reference" maxlength="11" placeholder="请输入邀请人手机号（选填）" :disabled="disabled" :style="{color:disabled?'#666':'auto'}">
			</div>
			<!--E 邀请人手机号-->
		</div>
		<div class="mlr30">
			<a class="btn_block" v-bind:class="{ l_disable:!mobile||!pswd||!validCode}" @click="registerFn">立即注册</a>
		</div>
		<!--S 协议-->
		<item-agreement class="l_register mt10" :isCenter="true" v-model="isProtocol" name="同城约单用户协议"></item-agreement>
		<!--E 协议-->
		<!--
        	作者：gaoxiaopeng@ddtkj.com
        	时间：2018-08-28
        	描述：微信授权登陆
        -->
		<threeLogin :url="redirect_uri" ></threeLogin>
	</div>
</template>
<script>
	import {REGEX} from 'src/config/env'//正则
	import itemAgreement from 'src/components/item/itemAgreement'//协议组件;
	import getCode from '../components/getCode'//获取验证码
	import imgValidCode from '../components/imgValidCode'//图片验证码
	import threeLogin from '../components/threeLogin'//三方登录
	import {
		fetchRegister,//注册
		fetchRegisterValidCode,//获取注册验证码
		fetchCheckMobile//验证手机号
	} from '../service/getData';
	import {fetchProfileDetail} from 'src/service/getData'//获取极验开关
	export default {
		data() {
			return {
				isProtocol:true, //是否同意协议
				showPassword: false,//是否显示密码
				disabled:false,//邀请人手机号是否能够编辑
				registerFlag:true,//是否能点击注册
				imgCode:'',//图片验证码
				mobile: "", //手机号
				pswd: '', //密码
				isNewAccount:false,//是否是新用户
				reference: '', //推荐人手机号
				validCode: '', //短信验证码
				redirect_uri:encodeURIComponent(window.location.href),//微信授权登陆回调地址
			}
		},
		components:{
			itemAgreement,
			getCode,
			imgValidCode,
			threeLogin
		},
		activated(){
			sessionStorage.backUrl = this.$route.query.url||sessionStorage.backUrl||'/account';
			this.disabled = false;
			this.imgCode = '';//图片验证码
			this.mobile = '';//手机号
			this.pswd = '';//密码
			this.reference = '';//推荐人手机号
			this.validCode = '';//短信验证码
			this.isNewAccount = false;
			if(this.$route.query.mobile){//获取推荐人手机号
				this.reference = this.$route.query.mobile;
				this.disabled = true;
			}
		},
		watch:{
			mobile(cur){
				//判断手机号正确时   是否已注册
				if(cur&&REGEX.mobile.regex.test(cur)){
					fetchCheckMobile(cur).then(res=>{
						if(res.status){
							this.isNewAccount = true;
						}
					})
				}
			}
		},
		computed:{
			ableGeetest(){//校验通过显示极验
				//校验手机号
				if(!this.mobile) {
					return false;
				}
				if(!REGEX.mobile.regex.test(this.mobile)) {
					return false;
				}
				//校验图形验证
				/*if(!this.imgCode){
					return false;
				}*/
				//手机号是否存在
				if(!this.isNewAccount){
					return false;
				}
				//校验短信验证码的时间
				if(!this.$refs.getCode.codeFlag){
					return false;
				}
				return true;
			}
		},
		methods: {
			//校验手机号
			verifyMobile(){
				if(!this.mobile) {
					window.alertTip('请输入手机号');
					return false;
				}
				if(!REGEX.mobile.regex.test(this.mobile)){
					window.alertTip('手机号码格式错误!');
					return false;
				}
				return true;
			},
			//获取验证码点击
			getCode(callBack,geetest_challenge,geetest_validate,geetest_seccode) {
				console.log('aa')
				console.log(callBack,geetest_challenge,geetest_validate,geetest_seccode)
				if(!this.verifyMobile()){
					return;
				}
				if(!this.isNewAccount){
					window.alertTip('该手机号已存在');
					return
				}
				/*if(!this.imgCode){
					window.alertTip('请输入图片验证码');
					return
				}*/
				if(!this.$refs.getCode.codeFlag) {
					return
				}
				//极验未开启 此处获取验证码  极验开启 在极验成功里获取验证码
				this.getValidCode(callBack,geetest_challenge,geetest_validate,geetest_seccode);
			},
			//接口获取验证码
			getValidCode(callBack,geetest_challenge,geetest_validate,geetest_seccode){
				fetchRegisterValidCode(this.mobile,this.imgCode,geetest_challenge, geetest_validate,geetest_seccode).then(res => {
					//错误时,重新获取图片验证码
					/*if(!res.status){
						this.$refs.imgValidCode.getImgCaptcha()
					}*/
					//触发获取验证码组件的方法
					callBack(res);
				})
			},
			//立即注册
			registerFn() {
				//是否能点击注册
				if(!this.registerFlag){
					return;
				}
				//验证手机号
				if(!this.verifyMobile()){
					return;
				}
				if(!this.validCode) {
					window.alertTip("请输入验证码");
					return
				}
				//验证密码
				if(!this.pswd) {
					window.alertTip("请输入密码");
					return
				}
				if(!REGEX.loginPwd.regex.test(this.pswd)) {
					window.alertTip(REGEX.loginPwd.msg);
					return;
				}
				if(this.reference&&!REGEX.mobile.regex.test(this.reference)) {
					window.alertTip("推荐人手机号码格式错误!");
					return;
				}
				if(!this.isProtocol){
				    window.alertTip("请勾选同城约单用户协议!");
					return;
				}

				this.registerFlag = false;
				//注册接口
				fetchRegister(this.mobile,this.pswd,this.validCode,this.reference,'http://'+location.host+'/member','','').then(res => {
					this.registerFlag = true;
					if(res.status){
						//本地存储 登录过的手机号
						let iphoneArr=[];
						if(localStorage.getItem('accoutList')){
							iphoneArr = JSON.parse(localStorage.getItem('accoutList'));
						}
						iphoneArr = iphoneArr.filter(v=>v!=this.mobile);
						iphoneArr.unshift(this.mobile);
						//本地存储 账号密码
						localStorage.setItem('accoutList',JSON.stringify(iphoneArr));
						//去完善资料
						window.alertTip('注册成功！',()=>{
							if(res.data){
								//跳转回调地址
								if(res.data.center){//开授权
									location.replace(res.data.data);
								}else{
									sessionStorage.setItem('isLogin', 1) //缓存登录状态
									this.$router.replace(sessionStorage.backUrl);// 未开授权，直接
								}
							}
							
						});
					}
				})
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
					this.getValidCode();
					document.querySelector("#float-captcha").innerHTML="";
					this.getCodeJiYan();
				});
				captchaObj.onClose(function () {

			    });
				// 将验证码加到id为captcha的元素里
				captchaObj.appendTo("#float-captcha");
				captchaObj.onReady(function() {
				});
			}
		}
	}
</script>
