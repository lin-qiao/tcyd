<template lang="html">
    <div class="form">
        <div class="form_item">
            <input type="text" placeholder="请输入手机号码" v-model="mobile" maxlength="11">
        </div>
        <div class="form_item">
            <input type="text" placeholder="请输入验证码" v-model="code" maxlength="6" autocomplete="off">
            <input type="button" :value="codeText">
        </div>
        <!--S 极验-->
		<div id="float-captcha" v-show="isShowJiYan"></div>
		<!--E 极验-->
        <div class="form_btn"  @click="checkMobileCode">立即体验</div>
        <!--S loading效果-->
		<alert-loading ref="alertLoading" loading="正在登录..."></alert-loading>
		<!--E loading效果-->
    </div>
</template>

<script>
import {
	fetchCheckMobile,  //校验手机号
    fetchValidCodeLogin,//验证码登录
    fetchLoginValidCode,//获取登录验证码
    fetchLoginOrRegisterValidCode, //获取验证码
	fetchThirdBindAndLogin, //绑定第三方并登录
	fetchThirdBindAndRegist, //绑定第三方并注册
	fetchGeetestRegister //获取极验
} from 'src/module/common/account/service/getData';
import {fetchProfileDetail} from 'src/service/getData'//获取极验开关
import {REGEX} from 'src/config/env';
import gtInit from 'src/plugins/geetest'//极验
import alertLoading from 'src/module/common/account/components/alertLoading'//正在登录的loading
export default {
	data() {
		return {
			mobile:'', //手机号
            code:'',   //验证码
            codeText:'获取验证码', //验证码文字
            codeFlag:true,  //验证码点击
            reference:'',  //推荐人手机号
            isNewUser:'',//是否为新用户
            t:null,//计时器
			geetestFlag:false,//后台配置极验开关
			geetest_challenge:'',//极验用于向客户服务器提交之后的SDK二次验证信息
			geetest_validate :'',//极验用于向客户服务器提交之后的SDK二次验证信息
			geetest_seccode :''//极验用于向客户服务器提交之后的SDK二次验证信息
		}
	},
	activated(){
        if(this.GetQueryString("reference")){
            this.reference = this.$route.query.reference;
        }else{
        	this.reference = window.location.href.substring(window.location.href.indexOf("#")+11,window.location.href.indexOf("&"));
        }
        if(sessionStorage.isLogin){
        	this.$alert({
        		layerImg:"",
        		content:'<div class="pt40">您已注册过，确认体验更多精彩！</div>',
        		confirm:()=>{
        			this.$router.replace('/account');
        		},
        		close:()=>{
        			this.$router.replace('/account');
        		}
        	})
        }
        
        //初始化数据
		if(this.t){//清除验证码计时器
			clearInterval(this.t);
		}
    },
    beforeRouteLeave(to,from,next){
		if(this.t){//清除验证码计时器
			clearInterval(this.t);
		}
		next();
	},
    mounted(){
		//获取极验开关
		this.getJiYanFlag()
	},
    computed:{
		isShowJiYan(){//极验是否显示
			return this.geetestFlag&&this.ableGeetest&&this.codeFlag;
		},
		ableGeetest(){//校验通过显示极验
			return this.mobile&&REGEX.mobile.regex.test(this.mobile);
		}
	},
    methods:{
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
				this.getMobileCode();
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
    	GetQueryString(name){//获取地址栏参数
			var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
			var r = window.location.search.substr(1).match(reg);
			if(r != null) return unescape(r[2]);
			return null;
		},
        //获取手机验证码
        getMobileCode(){
        	if(!this.codeFlag){
                return;
            }
            if(!this.mobile){
                alertTip('请输入您的手机号');
                return;
            }
            if(!REGEX.mobile.regex.test(this.mobile)){
                alertTip('请输入正确的手机号');
                return;
            }
            if(this.$store.state.wechatSystem){
            	//接口获取
				fetchLoginOrRegisterValidCode(this.mobile).then(res => {
					this.codeFlag = false;
					if(res.status){
						if(res.data && res.data.newUser){
							// 是新用户
							this.isNewUser = true;
						}else{
							// 不是新用户
							this.isNewUser = false;
						}
						this.time = 120;
	                    alertTip(res.msg);
	                    this.t = setInterval(() => {
	                        this.time--;
	                        this.codeText = this.time + 's后重新发送';
	                        if(this.time <= 0) {
	                            clearInterval(this.t);
	                            this.codeText = '获取验证码';
	                            this.codeFlag = true;
	                        }
	                    }, 1000)
					}
				})
            }else{
            	fetchLoginValidCode(this.mobile).then(res => {
	                this.codeFlag = false;
	                if(res.status) {
	                    this.time = 120;
	                    alertTip(res.msg);
	                    this.t = setInterval(() => {
	                        this.time--;
	                        this.codeText = this.time + 's后重新发送';
	                        if(this.time <= 0) {
	                            clearInterval(this.t);
	                            this.codeText = '获取验证码';
	                            this.codeFlag = true;
	                        }
	                    }, 1000)
	                }
	            })	
            }
        },
        //验证手机验证码并注册
        checkMobileCode(){
            if(!this.mobile){
                alertTip('请输入您的手机号');
                return;
            }
            if(!REGEX.mobile.regex.test(this.mobile)){
                alertTip('请输入正确的手机号');
                return;
            }
            if(!this.code){
                alertTip('请输入验证码');
                return;
            }
            if(this.$store.state.wechatSystem){//微信环境
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
            }else{
            	// 验证手机号是否已经注册
	            fetchCheckMobile(this.mobile).then(res => {
	                if(res.status){  //未注册
	                    this.loginValidCode();
	                }else{
	                    this.$alert({
			        		layerImg:"",
			        		content:'<div class="pt40">您已注册过，绑定微信体验更多精彩！</div>',
			        		confirm:()=>{
			        			this.loginValidCode();//验证码登录
			        		}
			        	})
	                }
	            })
            }
        },
        //验证码登录
        loginValidCode(){
            fetchValidCodeLogin(this.mobile,this.code,'http://'+location.host+'/member','','',this.reference).then(res=>{
                if(res.status){
			        //假如验证码登录 并且未设置登录密码
					if(!res.data.password){
						sessionStorage.isNoPwd = true;
					}
					//跳转回调地址
					if(res.data.center){//开授权
						location.replace(res.data.data);
					}else{
						sessionStorage.setItem('isLogin', 1) //缓存登录状态
						this.$router.replace(this.$route.query.url||sessionStorage.backUrl||'/account');// 未开授权，直接
					}
                }else{
                	alertTip(res.msg);
                }
            })
        },
        // 绑定并登录
		bindAndLogin(){
			fetchThirdBindAndLogin(this.mobile, this.code, this.code, 1, this.$store.state.openid).then( res => {
				this.$alert({
	        		layerImg:"",
	        		content:'<div class="pt40">您已注册过，绑定微信体验更多精彩！</div>',
	        		confirm:()=>{
	        			this.loginCallBack(res, false)
	        		}
	        	})
			})
		},
		// 绑定并注册
		bindAndRegist(){
			fetchThirdBindAndRegist(this.mobile, this.mobile, this.code, this.reference, this.$store.state.openid).then( res => {
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
		}
    },
    watch:{
        code(val){
            this.code = val.replace(/\D+/g,"");
        }
    },
	components:{
		alertLoading
	}
}
</script>

<style lang="less" scoped>
.form{
	padding-top: .05rem;
	position:relative;
	.form_item{
		display: flex;
		margin-bottom: .2rem;
		input{
			height: .9rem;
			background: #fff;
			font-size: .3rem;
			border-radius: .1rem;
		}
		input[type="text"]{
			padding-left: .4rem;
			width: 100%;
			flex:1;
		}
		input[type="button"]{
			width: 2.4rem;
			color: #f32b39;
			margin-left: .15rem;
		}
	}
	.form_btn{
		height: .9rem;
		line-height: .9rem;
		text-align: center;
		background: #ffde46;
		border-radius: .1rem;
		font-size: .36rem;
		font-weight: bold;
		color: #f32b39;
	}
}
#float-captcha{
	position: absolute;
    top: 1.14rem;
    right: 1.38rem;
    width: 1.1rem;
    height: 100%;
    opacity: 0;
}
</style>
