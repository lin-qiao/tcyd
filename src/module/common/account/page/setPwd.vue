<template lang="html">
	<div class="forget router_page login">
		<!--S 头部-->
		<div class="title border-n">
	        <!--<a class="tit_icon left" @click="handleClickLeft">
	            <i class="iconfont icon-arrow-left"></i>
	        </a>-->
			<a class="pull_right mr30 f30 c_666" v-if="isThree" @click="toComeFrom">跳过</a>
	    </div>
		<div class="yl_img">
			<div class="yl_img_bg">
				<img src="../images/login_img.png" alt="">
			</div>
			<p>请设置您的登录密码</p>
		</div>
		<!--E 头部-->
		<div class="yl_mode_list">
			<div class="yl_mode_item">
				<div class="yl_icon">
					<i class="iconfont icon-suo"></i>
				</div>
				<input type="password" v-model.trim="pswd" placeholder="请输入您的登录密码">
			</div>
			<div class="yl_mode_item">
				<div class="yl_icon">
					<i class="iconfont icon-suo"></i>
				</div>
				<input type="password" v-model.trim="newPswd" placeholder="请确定您的登录密码">
			</div>
		</div>
		<div class="yl_btn">
			<div class="btn_block" @click="set">确定</div>
		</div>
	</div>

</template>

<script>
	/**
	 * @description 短信验证码登陆后设置密码界面
	 * @author gaoxiaopeng@dddtkj.com
	 * */
	import {REGEX} from 'src/config/env'
	import {getInfo} from 'src/config/mUtils'
	import {
		fetchInitPswd,//初始化密码
		fetchPswdReset, //三方登录单独重置密码
	} from '../service/getData';
	export default {
		data() {
			return {
				pswd: '', //密码
				newPswd: '', //密码
				isThree:false, //是否是三方登录
				mobile:'', //第三方登录绑定手机号
			}
		},
		activated(){
			this.pswd = "";
			this.newPswd = "";
			//移除未完善密码
			sessionStorage.removeItem('isNoPwd');
			//三方授权登录
			if(this.$route.query.isThree){
				this.isThree = true;
				this.mobile = this.$route.query.mobile || '';
			}else{
				this.isThree = false;
			}
		},
		methods: {
			//回退
			handleClickLeft(){
				this.$router.replace('/account');
			},
			//跳回登录之前的页面或者个人中心
			toComeFrom(){
				if(sessionStorage.isComplete=='Y'){
					this.$router.replace('/completeInformation');
					return;
				}
				this.$router.replace(this.$route.query.url||sessionStorage.backUrl||'/account');
			},
			//设置密码
			set(){
				if(!this.pswd) {
					window.alertTip("请输入密码");
					return
				}
				if(!REGEX.loginPwd.regex.test(this.pswd)) {
					window.alertTip("密码格式错误!");
					return;
				}
				if(!this.newPswd) {
					window.alertTip("请输入密码");
					return
				}
				if(!REGEX.loginPwd.regex.test(this.newPswd)) {
					window.alertTip("密码格式错误!");
					return;
				}
				if(this.newPswd!=this.pswd) {
					window.alertTip("两次输入密码不一致");
					return
				}
				if(this.isThree){
					this.threeSetPwd();
				}else{
					this.setPwd();
				}
			},
			//普通设置密码
			setPwd() {
				fetchInitPswd(this.pswd, this.newPswd).then(res => {
					if(res.status){
						//本地存储-账号密码
						localStorage.loginAccount = JSON.stringify({mobile:getInfo('mobile'),pswd:this.pswd});
						window.alertTip('登录密码设置成功',()=>{
							this.toComeFrom();
						});
					}
				})
			},
			//三方登录设置密码
			threeSetPwd(){
				fetchPswdReset(this.newPswd,this.mobile).then(res => {
					if(res.status){
						//本地存储-账号密码
						localStorage.loginAccount = JSON.stringify({mobile:getInfo('mobile'),pswd:this.pswd});
						window.alertTip('登录密码设置成功',()=>{
							this.toComeFrom();
						});
					}
				})
			}
		}
	}
</script>

<style lang="less">
.forget .title{
	border: none;
}
</style>
