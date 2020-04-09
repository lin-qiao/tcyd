<template lang="html">
	<div class="login pos_rel pb300">
		<!--S 头部-->
		<top title="" :isReturn="false"></top>
		<div class="yl_img">
			<div class="yl_img_bg">
				<img src="../images/login_img.png" alt="">
			</div>
			<p>请绑定手机号</p>
		</div>
		<!--E 头部-->
		
		<ul class="yl_mode_list">
			<!--S 验证码登录-->
			<li>
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
		<div  class="yl_btn"  v-bind:class="{disabled:!mobile||!validCode}">
			<div class="btn_block" @click="loginFn">登录</div>
		</div>
		
		<!--S loading效果-->
		<alert-loading ref="alertLoading" loading="正在登录..."></alert-loading>
		<!--E loading效果-->
		
	</div>
</template>

<script>
	import alertLoading from '../components/alertLoading'//正在登录的loading
	import {REGEX} from 'src/config/env'//正则
	import getCode from '../components/getCode'//获取验证码
	
	import {
		fetchThirdBindAndRegist,//绑定并注册
		fetchThirdBindAndLogin,//绑定并登陆
		fetchLoginValidCode,//获取登录验证码
		fetchCheckMobile//校验手机号
	} from '../service/getData';

	export default{
		data() {
			return {
				backUrl:sessionStorage.backUrl||'/account',//获取回调地址，如果没有，同意回调 个人中心主页
				mobile:'',//手机号
				validCode:'',//短信验证码
			}  
		},
		props:{
			reference:{
				default:""
			},
			openId:{
				default:""
			}
		},
		mounted() {
			
		},
		activated(){
			//初始化数据
			this.validCode = '';
			sessionStorage.backUrl = this.$route.query.url||sessionStorage.backUrl||'/account';
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
				//判断手机号是否被注册
				fetchCheckMobile(this.mobile).then(res=>{
					if(res.status){//未注册过
						//验证码登录
						fetchThirdBindAndRegist(this.mobile,"",this.validCode,this.reference,this.openId).then(res=>{
							//回调
							if(res.status){ //绑定并注册成功
								this.loginCallBack(res);
							}
						})
					}else{//注册过
						//三方绑定并登陆
						fetchThirdBindAndLogin(this.mobile,this.validCode,1,this.openId).then(res=>{
							if(res.status){ //绑定并登录
								this.loginCallBack(res);
							}
						})
					}
				})
			},
			//登录后的回调  res接口返回的数据
			loginCallBack(res){
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
					this.$router.replace(this.$route.query.url||sessionStorage.backUrl||'/account');// 未开授权，直接
				}
			},
			wechatLogin(){//微信授权登陆
				//1、读取公众号node 服务器接口  返回 用户信息
			
				//login?url=/member&code=""
				
				//query.code
				//api/wechat/newWxLogin   code 
				let wechat_code=this.$route.query.code;//微信授权后带回来的code 
				if(!wechat_code){return}; //如果 微信 授权code 没有，则直接返回
				fetchWechatNodeLogin(wechat_code).then(res=>{
					if(res.msg=="成功"){
						//执行 大德通 微信授权登陆接口
						let data={
							loginType:"wx",
							country:res.data.country,
							province:res.data.province,
							city:res.data.city,
							openId:res.data.openid
						}
						fetchWechatLogin(data).then(res=>{
							if(res.status){
								this.$router.replace(this.$route.query.url||sessionStorage.backUrl||'/account');
							}
						})
					}
				})
			}
		}
	}	
</script>
