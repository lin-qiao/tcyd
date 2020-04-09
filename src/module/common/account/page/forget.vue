<template lang="html">
  <div class="forget login pb300">
    <top title="找回密码" :isReturn="false"></top>
    <div class="yl_mode_list">
    	<!--S 手机号-->
      <div class="yl_mode_item">
        <div class="yl_icon">
          <i class="iconfont icon-shouji"></i>
        </div>
        <input type="text"  v-model.trim="mobile" maxlength="11" placeholder="请输入手机号">
      </div>
      <!--E 手机号-->
      <!--S 图形验证码-->
      <img-valid-code v-model.trim="imgCode" ref="imgValidCode"></img-valid-code>
      <!--E 图形验证码-->
      <!--S 短信验证码-->
      <get-code v-model.trim = 'validCode' @getCode="getCode" :ableGeetest="ableGeetest"></get-code>
      <!--E 短信验证码-->
      <!--S 密码-->
      <div class="yl_mode_item">
        <div class="yl_icon">
          <i class="iconfont icon-suo"></i>
        </div>
        <input :type="showPassword?'text':'password'"  v-model="pswd" placeholder="请输入新的登录密码">
        <div class="yl_show">
          <i v-if="showPassword" class="iconfont icon-artboard79" @click="showPassword = !showPassword"></i>
          <i v-if="!showPassword" class="iconfont icon-jiemao" @click="showPassword = !showPassword"></i>
        </div>
      </div>
      <!--E 密码-->
    </div>
    <div class="yl_btn" v-bind:class="{ disabled:!mobile||!pswd||!validCode }" @click="forgotPswdFn">
      <div class="btn_block">确定</div>
    </div>
    <!--找回方式-->
    <!--<way-back way="phone"></way-back>-->
  </div>
</template>

<script>
	import {REGEX} from 'src/config/env'//正则
	//import wayBack from '../components/wayBack'//切换找回方式组件
	import getCode from '../components/getCode'//获取验证码
	import imgValidCode from '../components/imgValidCode'//图片验证码
	import {
		fetchFindValidCode,//找回密码获取验证码
		fetchCheckFindValidCode,//验证找回密码短信验证码
		fetchResetPswd//重置登录密码
	} from '../service/getData';
	export default {
		data() {
			return {
				showPassword: false,//验证密码是否显示
				imgCode:'',//图形验证码
				mobile: "", //手机号
				pswd: '', //密码
				validCode: '' //短信验证码
			}
		},
		components:{
			//wayBack,
			getCode,
			imgValidCode
		},
		activated(){
			this.imgCode = '';//图片验证码
			this.mobile = "", //手机号
			this.pswd = '';//密码
			this.validCode = '';//短信验证码
		},
		computed:{
			ableGeetest(){//校验通过显示极验
				return this.mobile&&REGEX.mobile.regex.test(this.mobile)&&this.imgCode;
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
			//获取短信验证码
			getCode(callback) {
				//校验手机号
				if(!this.verifyMobile()){
					return;
				}
				if(!this.imgCode){
					window.alertTip('请输入图片验证码');
					return
				}
				fetchFindValidCode(this.mobile,this.imgCode).then(res => {
					//错误时,重新获取图片验证码
					if(!res.status){
						this.$refs.imgValidCode.getImgCaptcha()
					}
					//触发获取验证码组件的方法
					callback(res);
				})
			},
			//充值密码
			forgotPswdFn() {
				//校验手机号
				if(!this.verifyMobile()){
					return;
				}
				if(!this.pswd) {
					window.alertTip("请输入密码");
					return
				}
				if(!REGEX.loginPwd.regex.test(this.pswd)) {
					window.alertTip(REGEX.loginPwd.msg);
					return;
				}
				if(!this.validCode) {
					window.alertTip("请输入验证码");
					return
				}
				//验证验证码
				fetchCheckFindValidCode(this.mobile,this.validCode).then(res=>{
					if(res.status){
						//设置密码
						fetchResetPswd(this.pswd).then(res=>{
							if(res.status){
								this.$router.push('/login');
							}
						})
					}
				})
			}
		}
	}
</script>
