<template>
	<div >
		<ul class="yl_mode_list">
			<!--S 验证码登录-->
			<li v-if="type">
				<!--S 手机号-->
				<div class="yl_account yl_mode_item">
					<div class="yl_icon">
						<i class="iconfont icon-shouji"></i>
					</div>
					<input type="text" v-model.trim="mobile" placeholder="请输入手机号">
				</div>
				<!--E 手机号-->
				<!--S 短信验证码-->
				<get-code v-model.trim = 'validCode' @getCode="getCode"></get-code>
				<!--E 短信验证码-->
			</li>
			<!--E 验证码登录-->
		</ul>
		<!--S 验证码登录-->
		<div class="yl_btn"  v-bind:class="{disabled:!mobile||!validCode}">
			<div class="btn_block" @click="loginFn">登录</div>
		</div>
	</div>
</template>

<script>
	import {wechatSystem} from 'src/config/env';//是否是微信环境
	import {REGEX} from 'src/config/env'//正则
	import getCode from 'src/module/common/account/components/getCode.vue'//获取验证码组件
	
	import {
		fetchValidCodeLogin,//验证码登录
		fetchLoginValidCode,//获取登录验证码
	} from '../service/getData';
	export default{
		data() {
			return {
				backUrl:sessionStorage.backUrl||'/account',//获取回调地址，如果没有，同意回调 个人中心主页
				mobile:'',//手机号
				validCode:''//短信验证码
			}
		},
		
		activated(){
			//初始化数据
			this.validCode = '';
			sessionStorage.backUrl = this.$route.query.url||'account';
			if(localStorage.loginAccount){
				//假如存储的有账户密码则自动登录
				this.type = 0;
				let obj = JSON.parse(getStore('loginAccount'));
				this.mobile = obj.mobile;//手机号
				
				//this.loginFn();
			}else{
				
			}
		},
		components: {
			alertLoading,
			getCode
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
				
				//验证码登录
				if(!this.validCode) {
					window.alertTip("请输入验证码");
					return
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
				this.$refs.alertLoading.closeLoadingFn();//开启loading
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
				sessionStorage.backUrl = this.$route.query.url||'/account';
				//跳转回调地址
				if(res.data){
					location.href = res.data.data;
				}
			}
		}
	}	
</script>