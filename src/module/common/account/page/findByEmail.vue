<template lang="html">
  <div class="forget login pb300">
    <top title="找回密码" :isReturn="false"></top>
    <div class="yl_mode_list">
      <div class="yl_mode_item">
        <div class="yl_icon">
          <i class="iconfont icon-youxiang1"></i>
        </div>
        <input type="text"  v-model="allForgot.email" placeholder="请输入邮箱" autocomplete="off">
      </div>
      <div v-if="imgFlag"  class="yl_mode_item">
        <div class="yl_icon">
          <i class="iconfont icon-tupian"></i>
        </div>
        <input type="text"  v-model="imgCode" placeholder="请输入图形验证码" autocomplete="off">
        <div class="yl_imgCode">
          <img :src="'data:image/png;base64, '+captchaImg" @click="getImgCaptcha">
        </div>
      </div>
      <div class="yl_mode_item">
        <div class="yl_icon">
          <i class="iconfont icon-yanzhengma2"></i>
        </div>
        <input type="text"  v-model="allForgot.validCode" placeholder="请输入邮箱验证码" autocomplete="off">
        <div class="yl_code" @click="getCode"><span>{{codeText}}</span></div>
      </div>
      <div class="yl_mode_item">
        <div class="yl_icon">
          <i class="iconfont icon-suo"></i>
        </div>
        <input :type="showPassword?'text':'password'"  v-model="allForgot.pswd" placeholder="请输入新的登录密码" >
        <div class="yl_show">
          <i v-if="showPassword" class="iconfont icon-artboard79" @click="showPassword = !showPassword"></i>
          <i v-if="!showPassword" class="iconfont icon-jiemao" @click="showPassword = !showPassword"></i>
        </div>
      </div>
    </div>
    <div class="yl_btn" v-bind:class="{ disabled:!allForgot.email||!allForgot.pswd||!allForgot.validCode }" @click="forgotPswdFu">
      <div class="btn_block">确定</div>
    </div>
    <way-back way="email"></way-back>
  </div>
</template>

<script>
	import {
		check,
		trim
	} from 'src/config/mUtils';
	import {REGEX} from 'src/config/env'
	import wayBack from '../components/wayBack'
	import {
		getValidCode,
		registerFlag,
		forgotPswd,
		getImgCaptcha
	} from 'src/service/getData';
	export default {
		data() {
			return {
				showPassword: false,
				codeText: '获取验证码',
				codeFlog: true,
				time: 120,
				imgFlag:true,//图片验证码开关
				captchaImg:"",//图形验证码路径
				imgCode:'',//图形验证码
				allForgot: {
					email: "", //手机号
					pswd: '', //密码
					validCode: '' //短信验证码
				}
			}
		},
		components:{
			wayBack
		},
		mounted(){
			registerFlag().then(res => {
				check(this, res, () => {
					this.imgFlag = res.data.imgFlag;
					if(this.imgFlag){
						this.getImgCaptcha();
					}
				})
			})
		},
		methods: {
			getCode() {
				if(!this.allForgot.email) {
					window.alertTip('请输入邮箱号');
					return
				}
				if(!REGEX.email.regex.test(this.allForgot.email)) {
					window.alertTip("邮箱账号格式错误!");
					return;
				}
				if(this.imgFlag&&!this.imgCode){
					window.alertTip('请输入图片验证码');
					return
				}
				this.getCodeOne();
			},
			//获取图形验证码
			getImgCaptcha(){
				getImgCaptcha().then(res=>{
					check(this,res,()=>{
						if(res.data&&res.data.captchaImg){
							this.captchaImg=res.data.captchaImg;
						}
					})
				})
			},
			getCodeOne() {
				if(!this.codeFlog) {
					window.alertTip('距上次验证码不足120s,请稍后再试！');
					return
				}
				getValidCode(this.allForgot.email, 'forgot',this.imgCode, '','','').then(res => {
					check(this,res,()=>{
						this.codeFlog = false;
						window.alertTip(res.msg);
						this.time = 120;
						let t = setInterval(() => {
							this.time--;
							this.codeText = this.time + 's';
							if(this.time <= 0) {
								this.codeFlog = true;
								this.codeText = '获取验证码';
								clearInterval(t);
							}
						}, 1000)
					})
				})
			},
			forgotPswdFu() {
				this.allForgot.email = trim(this.allForgot.email);
	     		this.allForgot.pswd = trim(this.allForgot.pswd);
	     		this.allForgot.validCode = trim(this.allForgot.validCode);
				if(!this.allForgot.email) {
					window.alertTip("请输入邮箱号");
					return
				}
				if(!REGEX.email.regex.test(this.allForgot.email)) {
					window.alertTip("邮箱账号格式错误!");
					return;
				}
				if(!this.allForgot.pswd) {
					window.alertTip("请输入密码");
					return
				}
				if(!REGEX.loginPwd.regex.test(this.allForgot.pswd)) {
					window.alertTip("请输入8-20位字母+数字组合密码!");
					return;
				}
				if(!this.allForgot.validCode) {
					window.alertTip("请输入验证码");
					return
				}
				forgotPswd(this.allForgot).then(res => {
					check(this, res, () => {
						window.alertTip(res.msg,()=>{
							this.$router.push('/login');
						})
					})
				})
			}
		}
	}
</script>
