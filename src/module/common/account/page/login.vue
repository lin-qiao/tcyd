<template lang="html">
	<div class="login pos_rel pb300">
		<!--S 头部-->
		<top title="" :isReturn="false"></top>
		<div class="yl_img">
			<div class="yl_img_bg">
				<img src="../images/login_img.png" alt="">
			</div>
			<p>请登录您的账户</p>
		</div>
		<!--E 头部-->
		<!--S tab-->
		<ul class="yl_mode_nav">
			<li :class="{'current':!type}" @click="type = 0">密码登录</li>
			<li :class="{'current': type}" @click="type = 1">验证码登录</li>
		</ul>
		<!--E tab-->
		<ul class="yl_mode_list">
			<!--S 密码登录-->
			<li v-if="!type">
				<!--S 手机号-->
				<div>
					<label class="yl_account yl_mode_item">
						<div class="yl_icon">
							<i class="iconfont icon-shouji"></i>
						</div>
						<input type="text" v-model.trim="mobile" maxlength="11" placeholder="请输入手机号" @focus="showAllow=true" @blur="showAllow=false" ref="mobile">
						<i class="iconfont icon-close" @click="close"></i>
						<i class="iconfont icon-arrow-down" @click="showIphone = !showIphone" v-if="(iphoneArr.length)&&(showAllow||showIphone)"></i>
						<ul v-if="showIphone&&iphoneArr.length" class="iphone_list">
							<li v-for="el in iphoneArr" @click="mobile=el;showIphone=false;">{{el}}</li>
						</ul>
					</label>
				</div>
				<!--E 手机号-->
				<!--S 密码-->
				<div class="yl_password yl_mode_item">
					<div class="yl_icon">
						<i class="iconfont icon-suo"></i>
					</div>

					<input :type="showPassword?'text':'password'" v-model.trim="pswd" placeholder="请输入登录密码">
					<div class="yl_show">
						<i v-if="showPassword" class="iconfont icon-artboard79" @click="showPassword = false"></i>
						<i v-if="!showPassword" class="iconfont icon-jiemao" @click="showPassword = true"></i>
					</div>
				</div>
				<!--E 密码-->
			</li>
			<!--E 密码登录-->
			<!--S 验证码登录-->
			<li v-if="type">
				<!--S 手机号-->
				<div class="yl_account yl_mode_item">
					<div class="yl_icon">
						<i class="iconfont icon-shouji"></i>
					</div>
					<input type="text" v-model.trim="mobile" maxlength="11" placeholder="请输入手机号">
				</div>
				<!--E 手机号-->
				<!--S 短信验证码-->
				<get-code v-model.trim = 'validCode' @getCode="getCode" :ableGeetest="ableGeetest"></get-code>
				<!--E 短信验证码-->
			</li>
			<!--E 验证码登录-->
		</ul>
		<!--S 密码登录-->
		<div v-if="!type" class="yl_btn"  v-bind:class="{disabled:!mobile||!pswd}">
			<div class="btn_block" @click="loginFn">登录</div>
		</div>
		<!--E 密码登录-->
		<!--S 验证码登录-->
		<div v-if="type" class="yl_btn"  v-bind:class="{disabled:!mobile||!validCode}">
			<div class="btn_block" @click="loginFn">登录</div>
		</div>
		<!--E 验证码登录-->
		<div class="yl_oper" v-if="!type">
			<router-link class="forget c_666" to="forget">忘记密码？</router-link>
			<router-link class="register" to="register">立即注册</router-link>
		</div>
		<!--S loading效果-->
		<alert-loading ref="alertLoading" loading="正在登录..."></alert-loading>
		<!--E loading效果-->
		<!--
        	作者：gaoxiaopeng@ddtkj.com
        	时间：2018-08-28
        	描述：微信授权登陆
        -->
		<threeLogin :url="redirect_uri"></threeLogin>

		<!--
        	作者：gaoxiaopeng@ddtkj.com
        	时间：2018-09-21
        	描述：微信绑定旧账号和 新账号注册
        -->
		<com-wechat-authorize  v-show="isBindWechat" class="router_page"></com-wechat-authorize>

	</div>
</template>

<script>
	import alertLoading from '../components/alertLoading'//正在登录的loading
	import {REGEX} from 'src/config/env'//正则
	import getCode from '../components/getCode'//获取验证码
	import threeLogin from '../components/threeLogin'//三方登录
	import comWechatAuthorize from '../components/com-wechat-authorize'//三方登录
	import {
		setStore,//设置本地存储
		getStore//获取本地存储
	} from 'src/config/mUtils';
	import {
		fetchPswdLogin,//密码登录
		fetchValidCodeLogin,//验证码登录
		fetchLoginValidCode,//获取登录验证码
	} from '../service/getData';

	export default{
		data() {
			return {
				type: 0,//0代码密码登录1代码验证码登录
				showPassword: false,//密码是否显示
				showIphone:false,//是否显示账户下拉框
				iphoneArr:[],//登录过的账户数组
				showAllow:false,//是否显示下拉图标
				backUrl:sessionStorage.backUrl||'/account',//获取回调地址，如果没有，同意回调 个人中心主页
				mobile:'',//手机号
				pswd:'',//密码
				validCode:'',//短信验证码
				redirect_uri:encodeURIComponent(window.location.href),//微信授权登陆回调地址
				isBindWechat:false, //是否执行绑定微信
			}
		},
		mounted() {
			//获取已登录手机号列表
			if(localStorage.getItem('accoutList')){
				this.iphoneArr = JSON.parse(getStore('accoutList'));
			}
		},
		computed:{
			ableGeetest(){//校验通过显示极验
				return this.type==1&&this.mobile&&REGEX.mobile.regex.test(this.mobile);
			}
		},
		activated(){
			//初始化数据
			this.pswd = '';
			this.validCode = '';
			this.type = 0;
			sessionStorage.backUrl = this.$route.query.url||sessionStorage.backUrl||'/account';
			if(localStorage.loginAccount){
				//假如存储的有账户密码则自动登录
				let obj = JSON.parse(getStore('loginAccount'));
				this.mobile = obj.mobile;//手机号
				this.pswd = obj.pswd;//密码
				//this.loginFn();
			}
		},
		components: {
			alertLoading,
			getCode,
			threeLogin,
			comWechatAuthorize
		},
		methods: {
			//删除按钮点击
			close(){
				this.mobile = '';
				this.$refs.mobile.focus();
			},
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
				fetchLoginValidCode(this.mobile).then(res => {
					callback(res);
				})
			},
			//登录方法
			loginFn() {
				//校验手机号
				if(!this.verifyMobile()){
					return;
				}
				if(!this.type) {
					//密码登录
					if(!this.pswd) {
						window.alertTip("请输入密码");
						return
					}
				} else {
					//验证码登录
					if(!this.validCode) {
						window.alertTip("请输入验证码");
						return
					}
				}
				this.$refs.alertLoading.alertLoadingFn();//开启loading
				if(!this.type){
					//密码登录
					fetchPswdLogin(this.mobile,this.pswd,'http://'+location.host+'/member').then(res=>{
						//回调
						this.loginCallBack(res);
					})
				}else{
					//验证码登录
					fetchValidCodeLogin(this.mobile,this.validCode,'http://'+location.host+'/member','','').then(res=>{
						//回调
						this.loginCallBack(res);
					})
				}
			},
			//登录后的回调  res接口返回的数据
			loginCallBack(res){
				this.$refs.alertLoading.closeLoadingFn();//关闭loading
				if(!res.status){
					localStorage.removeItem('loginAccount');
					this.pswd = "";
					alertTip(res.msg);
					return;
				}
				if(!this.type){
					//密码登录 改变本地存储--账号密码
					setStore('loginAccount',{mobile:this.mobile,pswd:this.pswd});
				}
				//改变本地存储 -已登录的手机号
				this.iphoneArr = this.iphoneArr.filter(v=>v!=this.mobile);
				this.iphoneArr.unshift(this.mobile);
				setStore('accoutList',this.iphoneArr);
				//假如验证码登录 并且未设置登录密码
				if(this.type&&!res.data.password){
					sessionStorage.isNoPwd = true;
				}
				//跳转回调地址
				if(res.data.center){//开授权
					location.replace(res.data.data);
				}else{
					sessionStorage.setItem('isLogin', 1) //缓存登录状态
					this.$router.replace(this.$route.query.url||sessionStorage.backUrl||'/account');// 未开授权，直接
				}
			}
		}
	}
</script>
