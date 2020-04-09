<template lang="html">
	<div class="forget router_page login">
		<!--S 头部-->
		<!--<div class="title border-n">
			<a class="tit_icon left" @click="$router.replace('/login')">
				<i class="iconfont icon-arrow-left"></i>
			</a>
		</div>-->
		<div class="yl_img">
			<div class="yl_img_bg">
				<img src="../images/login_img.png" alt="">
			</div>
			<p>请绑定您的账户手机号</p>
		</div>
		<!--E 头部-->
		<div class="yl_mode_list">
			<div class="yl_mode_item">
				<div class="yl_icon">
					<i class="iconfont icon-shouji"></i>
				</div>
				<input type="text" v-model.trim="mobile" placeholder="请输入手机号" maxlength="11">
			</div>
			<!--S 短信验证码-->
			<div class="l_get_code_box">
				<!--S 短信验证码组件-->
				<get-code v-model.trim = 'validCode' ref="getCode" @getCode="getCode" :ableGeetest="ableGeetest"></get-code>
				<!--E 短信验证码组件-->
			</div>
			<!--E 短信验证码-->
		</div>
		<div class="yl_btn"  v-bind:class="{disabled:!mobile||!validCode}">
			<div class="btn_block" @click="submit">绑定</div>
		</div>
		<!--S loading效果-->
		<alert-loading ref="alertLoading" loading="正在登录..."></alert-loading>
		<!--E loading效果-->
	</div>

</template>

<script>
import alertLoading from '../components/alertLoading'//正在登录的loading
import getCode from '../components/getCode'//获取验证码
import {REGEX} from 'src/config/env'
import {getInfo} from 'src/config/mUtils'
import {
	fetchLoginOrRegisterValidCode, //获取验证码
	fetchThirdBindAndLogin, //绑定第三方并登录
	fetchThirdBindAndRegist, //绑定第三方并注册
} from '../service/getData';
export default {
	data() {
		return {
			mobile: '', //手机号
			validCode: '', //验证码
			
			isNewUser:false, //是不是新用户
		}
	},
	computed:{
		ableGeetest(){//校验通过显示极验
			return this.mobile&&REGEX.mobile.regex.test(this.mobile);
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
		//获取验证码
		getCode(callback) {
			//校验手机号
			if(!this.verifyMobile()){
				return;
			}
			//接口获取
			fetchLoginOrRegisterValidCode(this.mobile).then(res => {
				if(res.status){
					if(res.data && res.data.newUser){
						// 是新用户
						this.isNewUser = true;
					}else{
						// 不是新用户
						this.isNewUser = false;
					}
				}
				callback(res);
			})
		},
		// 提交绑定手机号操作
		submit(){
			//校验手机号
			if(!this.verifyMobile()){
				return;
			}
			if(!this.validCode){
				alertTip('请输入短信验证码');
				return;
			}
			if(!this.$store.state.openid){
				alertTip('微信授权过期，关闭站点重新打开');
				return;
			}
			this.$refs.alertLoading.alertLoadingFn();//开启loading
			// 校验手机号是否注册，走不同的接口
			if(this.isNewUser){
				//没注册过
				this.bindAndRegist()
			}else{
				//注册过
				this.bindAndLogin()
			}
		},
		// 绑定并登录
		bindAndLogin(){
			fetchThirdBindAndLogin(this.mobile, this.validCode, this.validCode, 1, this.$store.state.openid).then( res => {
				this.loginCallBack(res, false)
			})
		},
		// 绑定并注册
		bindAndRegist(){
			fetchThirdBindAndRegist(this.mobile, this.mobile, this.validCode, '', this.$store.state.openid).then( res => {
				this.loginCallBack(res, true)
			})
		},
		//登录后的回调  res接口返回的数据
		loginCallBack(res,isSetPwd){
			this.$refs.alertLoading.closeLoadingFn();//关闭loading
			if(!res.status){
				alertTip(res.msg);
				return;
			}
			//跳转回调地址
			if(res.data.center){//开授权
				location.replace(res.data.data);
			}else{
				sessionStorage.setItem('isLogin', 1) //缓存登录状态
				if(isSetPwd){// 未开授权，直接
					this.$router.replace('/setPwd?isThree=true&mobile='+this.mobile);
				}else{
					this.$router.replace(this.$route.query.url||sessionStorage.backUrl||'/account');
				}
			}
		},
	},
	components:{
		alertLoading,
		getCode
	}
}
</script>

<style lang="less">
.forget .title{
	border: none;
}
</style>
