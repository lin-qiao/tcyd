<template lang="html">
    <div>
        <div class="fixed">
			<a href="javascript:void(0);" @click="downLoadApp"></a>
		</div>
        <div class="bg bg_1">
            <div class="avatar">
                <img :src="requireDetail.headPhoto | imgUrl" alt="">
                <p class="c_fff text_center mt25">
                    <span class="f32">{{requireDetail.nickName}}</span>
                    <span class="f28 ml30"><i class="iconfont f26" :class="[requireDetail.gender=='female'?'icon-nv':'icon-nan']"></i>{{requireDetail.age}}</span>
                </p>
            </div>
        </div>
        <div class="bg bg_2">
            <div class="table">
                <div class="table_item" v-for="(v,k) in requireDetail.map">
                    <span class="tit">{{k}}</span>
                    <span class="con">{{v}}</span>
                </div>
                <div class="table_item">
                    <span class="tit">发布时间</span>
                    <span class="con">{{requireDetail.publishTime | date}}</span>
                </div>
                <div class="table_item">
                    <span class="tit">结束时间</span>
                    <span class="con">{{requireDetail.endTime | date}}</span>
                </div>
                <div class="table_item">
                    <span class="tit">服务方式</span>
                    <span class="con">{{requireDetail.serviceMethod}}</span>
                </div>
            </div>
        </div>
        <div class="bg bg_3">
            <div class="form">
                <!--<div class="form_tit">输入手机号并应邀订单即可获得<em class="c_yellow">50元红包</em></div>-->
                <div class="form_item">
                    <input type="text" placeholder="请输入您的手机号" v-model="mobile">
                </div>
                <div class="form_item">
                    <input type="text" placeholder="请输入验证码" v-model="code" maxlength="6" autocomplete="off">
                    <div class="form_btn">{{codeText}}</div>
                </div>
                <!--S 极验-->
				<div id="float-captcha" v-show="isShowJiYan"></div>
				<!--E 极验-->
                <div class="btn_block" @click="checkMobileCode">立即体验</div>
            </div>
        </div>
        <div class="bg bg_4">
            <p class="pt50 c_fff f30 text_center">还有更多订单等你来接哦</p>
        </div>
        <!--S loading效果-->
		<alert-loading ref="alertLoading" loading="正在登录..."></alert-loading>
		<!--E loading效果-->
    </div>
</template>

<script>
import {
    fetchRequireShare   //订单详情
} from '../service/getData';
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
import {appDownLoad} from 'src/config/mUtils'; //app下载方法
import alertLoading from 'src/module/common/account/components/alertLoading'//正在登录的loading
import gtInit from 'src/plugins/geetest'//极验
export default {
    data(){
        return{
            requireId:'',      //需求id
            requireDetail:{},  //需求详情
            mobile:'', //手机号
            code:'',   //验证码
            codeText:'获取验证码', //验证码文字
            codeFlag:true,  //验证码点击
            reference:'',  //推荐人手机号
            t:null,//计时器
			geetestFlag:false,//后台配置极验开关
			geetest_challenge:'',//极验用于向客户服务器提交之后的SDK二次验证信息
			geetest_validate :'',//极验用于向客户服务器提交之后的SDK二次验证信息
			geetest_seccode :''//极验用于向客户服务器提交之后的SDK二次验证信息
        }
    },
    activated(){
        if(this.$route.query.requireId){
            this.requireId = this.$route.query.requireId;
        }
        if(this.$route.query.reference){
            this.reference = this.$route.query.reference;
        }
//      if(this.requireId){
//      	this.getRequireDetail()
//      }
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
    	//下载
		downLoadApp () {
			appDownLoad();
		},
        //获取需求详情
        getRequireDetail(){
            fetchRequireShare(this.requireId).then(res => {
                if(res && res.status){
                    this.requireDetail = res.data;
                }
            })
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
			fetchThirdBindAndRegist(this.mobile, this.mobile, this.code,this.reference, this.$store.state.openid).then( res => {
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
@import (reference) '~src/style/all.less';
#float-captcha{
	position: absolute;
    top: 1.26rem;
    right: 1.4rem;
    width: 1.1rem;
    height: 100%;
    opacity: 0;
}
.fixed{
	width: 7.5rem;
	height: .97rem;
	background: url(../images/top_fixed.jpg) no-repeat;
	background-size: cover;
	position: fixed;
	top:0;
	left: 50%;
	margin-left: -3.75rem;
	z-index: 1;
	a{
		display: block;
		width: 1.95rem;
		height: .63rem;
		position: absolute;
		top:0;
		bottom: 0;
		right: .35rem;
		margin: auto;
	}
}
.bg{
    background-repeat: no-repeat;
    background-size: cover;
    position: relative;
    margin-top:-1px;
}
.bg_1{
    height: 5.29rem;
    background-image: url(../images/bg_1_1.jpg);
}
.bg_2{
    min-height: 4rem;
    padding-bottom:0.5rem;
    background-image: url(../images/bg_1_2.jpg);
    background-repeat: repeat-y;
    background-size: 100% 100%;
}
.bg_3{
    height: 4.72rem;
    background-image: url(../images/bg_1_3.jpg);
}
.bg_4{
    height: 4.26rem;
    background-image: url(../images/bg_1_4.jpg);
}
.avatar{
    position: absolute;
    top: 2.58rem;
    left: 0;
    right: 0;
    margin: auto;
    img{
        display: block;
        width: 1.65rem;
        height: 1.65rem;
        border-radius: 50%;
        margin: 0 auto;
    }
}
.table{
    padding: 0 .3rem;
    .table_item{
        display: flex;
        justify-content: space-between;
        background: #fff;
        height: .94rem;
        line-height: .94rem;
        color: #666;
        font-size: .28rem;
        padding: 0 .3rem;
        border-radius: .05rem;
        &:nth-child(2n){
            background: #ffc9c0;
        }
    }
}
.form{
    padding: 0 .5rem;
    text-align: center;
    .form_tit{
        .f34;
        .c_fff;
        padding: .5rem 0 .35rem;
    }
    .form_item{
        display: flex;
        height: 1rem;
        line-height: 1rem;
        border-radius: 1rem;
        background: #fff;
        padding: 0 .45rem;
        margin-bottom: .2rem;
        font-size: .3rem;
        input{
            display: block;
            width: 100%;
            flex:1;
            height: 100%;
            font-size: .3rem;
        }
        .form_btn{
            .c_main;
            text-decoration: underline;
        }
    }
    .btn_block{
        width: 6.5rem;
        height: 1rem;
        line-height: 1rem;
        border-radius: 1rem;
        background: yellow;
        .c_main;
        font-size: .4rem;
    }
}
</style>
