<template>
	<div class="yl_mode_item">
		<div class="yl_icon">
			<i class="iconfont icon-yanzhengma2"></i>
		</div>
		<input type="text" autocomplete="off" maxlength="6" :value="value"  @input="$emit('input', $event.target.value)" placeholder="请输入短信验证码">
		<div class="yl_code" @click="getCode"><span :class="{get_time:!codeFlag}">{{codeText}}</span></div>
		<!--S 极验-->
		<div id="float-captcha" v-show="isShowJiYan"></div>
		<!--E 极验-->
	</div>
</template>

<script>
	import gtInit from 'src/plugins/geetest'//极验
	import {fetchProfileDetail} from 'src/service/getData'//获取极验开关
	import {
		fetchGeetestRegister//获取极验
	} from '../service/getData';
	import {REGEX} from 'src/config/env';
	export default {
		data() {
			return {
				codeFlag: true,//是否能获取短信验证码
				time: 120,//验证码时长
				t:null,//计时器
				geetestFlag:false,//后台配置极验开关
				geetest_challenge:'',//极验用于向客户服务器提交之后的SDK二次验证信息
				geetest_validate :'',//极验用于向客户服务器提交之后的SDK二次验证信息
				geetest_seccode :''//极验用于向客户服务器提交之后的SDK二次验证信息
			}
		},
		props:{
			value:{//验证码输入框
				default:''
			},
			ableGeetest:{//是否校验通过显示极验
				default:false
			}
		},
		mounted(){
			//获取极验开关
			this.getJiYanFlag()
		},
		beforeRouteLeave(to,from,next){
			if(this.t){//清除验证码计时器
				clearInterval(this.t);
			}
			next();
		},
		activated(){
			//初始化数据
			if(this.t){//清除验证码计时器
				clearInterval(this.t);
			}
			this.codeFlag = true;
			this.time = 120;
		},
		methods: {
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
					this.getCode();
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
			//获取验证码
			getCode() {
				//判断是否在120s内
				if(!this.codeFlag){
					window.alertTip('距上次获取验证码不足120s,请稍后再试！');
					return
				}
				//触发父组件的获取验证码方法
				this.$emit('getCode',this.callBack,this.geetest_challenge,this.geetest_validate,this.geetest_seccode)
			},
			//调取接口后的回调
			callBack(res){
				window.alertTip(res.msg);
				if(res.status){
					this.codeFlag = false;
					this.time = 120;
					this.t = setInterval(() => {
						this.time--;
						if(this.time <= 0) {
							clearInterval(this.t);
							this.codeFlag = true;
						}
					}, 1000)
				}
			}
		},
		computed:{
			isShowJiYan(){//极验是否显示
				return this.geetestFlag&&this.ableGeetest&&this.codeFlag;
			},
			//获取验证码区域文字显示
			codeText(){
				if(this.codeFlag){
					return '获取验证码';
				}else{
					return '已发送（'+this.time + 's）';
				}
			}
		}
	}
</script>
<style lang="less" scoped>
	.yl_mode_item{
		position: relative;
		overflow: hidden;
	}
	#float-captcha{
		position: absolute;
		top: 0;
		right: 0;
		width: 1.7rem;
		height: 100%;
		opacity: 0;
	}
</style>
