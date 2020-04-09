<template>
		<transition name="router-fade" mode="out-in">
	     <keep-alive>
				<router-view></router-view>
	     </keep-alive>
		</transition>
</template>
<script>
import {fetchWechatNodeLogin,fetchWXUserInfo} from 'src/service/getDataWechat'
import {fetchWechatLogin} from 'src/module/common/account/service/getData'  //微信登陆，openid 去登陆
import {wechatJSSDKInit} from 'src/config/wechatUtils' //微信初始化
export default {
	
	//避免同城路由地址缓存  出现的路由跳转  但页面还保留上次 的情况出现
	deactivated(){
        this.$destroy();	
    },
    mounted(){
    	//微信授权 关注公众号及自动登陆
    	//获取url 中  code 参数 没有则说明 未进行授权
    	let wechat_code=this.$route.query.code;//微信授权后带回来的code
        if (this.$store.state.wechatSystem) { //微信环境且 code 
        	    //本地缓存了openid
        	    if(sessionStorage.openid){ //openid
        	    	this.$store.state.openid=sessionStorage.openid ;//缓存中读取openid
        	    	this.$store.state.subscribe=sessionStorage.subscribe||1 //本地存储中读取 关注公众号标识 默认读取已防止程序出错 导致用户陷入循环关注公众号操作中
					
        	    }else if(wechat_code){//进行了授权已经获取到  微信code 
        	    	//微信code 换取 openid
        	    	 fetchWechatNodeLogin(wechat_code).then(res=>{
                        if(res.msg=="成功"){
                            //执行 大德通 微信授权登陆接口
                            this.$store.state.openid=sessionStorage.openid=res.data.openid //赋值给vuex 全局并缓存到本地
				            this.wechatLoginAndGetUserInfo();//获取微信
                        }
                    })
        	    }else{ //执行授权 获取  微信 code
        	    	window.location.href="https://open.weixin.qq.com/connect/oauth2/authorize?appid="+this.$store.state.wechat_appid+"&redirect_uri="+encodeURIComponent(window.location.href) +"&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect";
        	    }
        	    
        }
    	
    	//获取上线提醒
    	this.$store.dispatch('getOnlineRemindPrice');
    	//获取图形验证码开关
    	this.$store.dispatch('getImgVerifyFlag');
    },
    methods: {
    	wechatLoginAndGetUserInfo(){
    		 let data = {
                loginType: "wx",
                country: window.COUNTY,
                province: window.PROVINCE,
                city: window.CITY,
                openId: this.$store.state.openid
            }
            //java  登陆
            fetchWechatLogin(data).then(res => {
                if (res.status) {//登陆成功
                 	sessionStorage.setItem('isLogin', 1) //缓存登录状态
                }
            })
            //获取用户信息，判断是否关注了公众号
            fetchWXUserInfo(this.$store.state.openid).then(res=>{
            	if(res.msg=="成功"){
            	 	//判断是否订阅了 公众号
                    this.$store.state.subscribe=sessionStorage.subscribe=res.data.subscribe;//存储到全局
                }
     		})
    	}
    }
   
}

</script>
<style lang="less">
@import './style/swiper.min.css';
@import './style/all';
@import './style/layer';
@import '~src/module/common/account/style/all';/*引入账户相关less*/
@import '~src/components/css/item.less';/*引入item样式*/
@import './style/iconfont.css';

#app{
	position: absolute;
	left: 0;
	bottom: 0;
	top: 0;
    width: 7.5rem;
  	overflow-x: hidden;
}
.router-fade-enter-active, .router-fade-leave-active {
	transition: opacity .3s;
}
.router-fade-enter, .router-fade-leave-active {
	opacity: 0;
}
.page-slide-bottom-enter-active{
	transition: all .3s ease;
}
.page-slide-bottom-leave-active{
	transition: all .3s ease-out;
}
.page-slide-bottom-enter,.page-slide-bottom-leave-active{
	transform: translateY(100%);
}
.page-slide-top-enter-active{
	transition: all .3s ease;
}
.page-slide-top-leave-active{
	transition: all .3s ease-out;
}
.page-slide-top-enter,.page-slide-top-leave-active{
	transform: translateY(-100%);
}
.page-slide-enter-active {
	transition: all .3s ease;
}

.page-slide-leave-active {
	transition: all .3s ease-out;
}

.page-slide-enter, .page-slide-leave-active {
	transform: translateX(100%);
}

.fade-enter-active {
	transition: all .3s ease;
}

.fade-leave-active {
	transition: all .3s ease-out;
}

.fade-enter, .fade-leave-active {
	opacity: 0;
}

.play-slide-enter-active {
	transition: all .3s ease;
}

.play-slide-leave-active {
	transition: all .3s ease-out;
}

.play-slide-enter, .play-slide-leave-active {
	transform: translateY(100vh);
}
.swiper-container img{
  width: 100%;
}

</style>
