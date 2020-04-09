import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './router/router' //路由
import store from './store/' ;// vuex 全局变量

import { routerMode,contactKF} from './config/env' //系统配置
//公用函数
import {getInfo } from './config/mUtils' //本地缓存 读取用户信息 
import {appLogin} from './config/appUtils' ;//app 登陆兼容代码
import {wechatJSSDKInit,wechatShare} from './config/wechatUtils' ;// 微信分享 jssdk
import { setSessionStorageToken } from './config/reqestCommon' ;// token 初始化

import './config/rem' ;//rem 单位计算
import FastClick from 'fastclick' 
import VueLazyload from 'vue-lazyload' //懒加载组件 
import messageBox from 'src/components/alert/messageBox/main.js'// 全局默认弹窗组件
import share from 'src/components/share/main.js'; //默认分享组件
import { Indicator } from 'mint-ui' //加载中ui
import 'mint-ui/lib/style.css' //全局公用样式
import cookie from './plugins/cookie'; //cookie 操作
import expectImg from "src/images/tips.png";//敬请期待图片
import {wechat_Or_geoLocation} from './config/mapApi'; //导入地址定位（高德&微信）
//导入 公用接口
import { 
	fetchInformation,//获取用户信息
	fetchIslogin,//获取是否登录
	fetchGetCommonShotUrl,// 生成短链
	getSkillCount,//获取用户已发布技能数量
	fetchRegisterForredEnvelopes//获取分享内容
} from 'src/service/getData'
import { fetchGetMess } from 'src/module/common/account/service/getData'//查询用户是否完善资料
import {fetchRequireList} from 'src/module/demandManage/service/getData';//获取用户发布的需要信息
//用户登陆后 获取 是否设置交易密码
import { fetchGetMemberInfo } from 'src/module/common/member/module/save/service/getData'

//在线客服
Vue.prototype.contactKF = contactKF;
//全局方法
import MyPlugin from './config/methods.js'
Vue.use(MyPlugin)

//过滤器
import Filter from './config/filter.js'
Vue.use(Filter)

//组件
import Components from './config/components.js'
Vue.use(Components)

//图片懒加载配置
var lazyload = require('src/images/loading.png')
//配置图片懒加载组件
Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: lazyload,
  loading: lazyload,
  attempt: 1,
  // the default is ['scroll', 'wheel', 'mousewheel', 'resize', 'animationend', 'transitionend']
  listenEvents: ['scroll']
})



// token初始化
sessionStorage.removeItem('token') ;//一次之前的缓存，防止过期token 被二次调用
setSessionStorageToken() ;//重新设置token


//vue router 注册
Vue.use(VueRouter)
const router = new VueRouter({
  routes,
  mode: routerMode,
  strict: process.env.NODE_ENV !== 'production'
})

//定位信息，全局变量
window.LON = "112.56566" //太原经度,
window.LAT = "37.73605" //太原纬度
window.PROVINCE = "山西" //省
window.CITY = "太原" //市
window.COUNTY = "小店" //区
window.STREET="" //街道
window.TOWNSHIP="";// 例如 "太原高新技术产业开发区"
window.PROVINCECODE ="140000"
window.CITYCODE = "140100"
window.COUNTYCODE = "140105"
window.ADDRESS =""; //详细地址
window.ACCURACY="";//精度  N  米
wechat_Or_geoLocation();//定位

//路由拦截
router.beforeEach((to, from, next) => {
  window.scroll(0, 0)
  let url = to.fullPath
  if (to.meta.noLogin) {
  	if(sessionStorage.getItem('isLogin')&&!sessionStorage.userInfo){
  		//假如已经登录就去 缓存用户信息
  		getUserInfo();
  	}
  	pageShare(to);//分享
    next()
  } else {
  	
  	//已经登录
    if (sessionStorage.getItem('isLogin')) {
    	//假如已缓存用户信息
    	if(sessionStorage.userInfo){
    		//路由跳转
    		toRouterNext(to,next);
    	}else{
    		//获取用户信息 并且跳转
    		getUserInfo(toRouterNext,to,next);
    	}
    } else {
      fetchIslogin().then(mres => {
        //判断用户是否登录
        if (mres.status&&mres.data.login) {
          //已登录
          sessionStorage.setItem('isLogin', 1) //缓存登录状态
          getUserInfo(toRouterNext,to,next);//获取用户信息 并且跳转
        } else {
        	if(store.state.wechatSystem){//微信环境，跳转到绑定微信
        		next({ path: '/bindPhone', query: { url: url } });
        	}else{
        		next({ path: '/login', query: { url: url } });
        	}
          
          localStorage.removeItem('isShowPageOne');//账户主页是否展示第一屏
        }
      })
    }
  }
})

//初始化分享
function pageShare(to){
	
	//过滤已经做过分享的页面
	if(['/otherHome','/myHome','/inviteRecommend','/skillManage','/stationIndex','/invite','/inviteOrder','/inviteService'].indexOf(to.path)!=-1){
		return;
	}
	wechatJSSDKInit();//微信jssdk 初始化
	//用户头像
	let headPhoto = getInfo('headPhoto');
	//邀请码
	let reference= getInfo('mobile');
	//当前页面地址
	let fullUrl = location.origin + to.fullPath;
	//分享链接
	let shareLink;
	//分享标题
	let shareTitle;
	//分享描述
	let shareContent;
	//分享图片
	let shareImg;
	fetchRegisterForredEnvelopes().then(res=>{
		if(res.status){
			shareTitle=res.data.title;//分享标题
			shareContent=res.data.content;//分享内容
			shareLink=res.data.url+'?headPhoto='+headPhoto+"&reference="+reference;//分享链接
			if(res.data.img){
				shareImg=res.data.img;//分享图片
			}else{
				shareImg=''
			}
			//生成短链后 去分享
			wechatShare(shareLink,shareTitle,shareContent,shareImg,fullUrl);
		}
	})
}

//获取用户信息
function getUserInfo(callBack,to,next){
	//获取token
	sessionStorage.removeItem('token')
	setSessionStorageToken()
	wechat_Or_geoLocation();//调用定位函数
	//缓存用户是否设置交易密码
	fetchGetMemberInfo().then(res => {
    if (res.status) {
      sessionStorage.setItem(
        'is_tradePswd',
        res.data.is_tradePswd
      )
    }
  })
	//获取用户信息
	fetchInformation().then(ires => {
		//缓存用户信息
	  if (ires.status) {
	    sessionStorage.setItem('userInfo', JSON.stringify(ires.data))
	    //登陆成功直接 获取uid  sdktoken
			cookie.setCookie('uid',ires.data.uid);
			cookie.setCookie('sdktoken',ires.data.sdktoken);
	  }
		if(callBack){
			//需要路由跳转 走路由跳转
			callBack(to,next)
		}else{
			//不需要登录的页面缓存是否完善资料
			getComplete()
		}
	})
}

//获取用户是否完善资料
function getComplete(callBack,next,to){
	fetchGetMess().then(res => {
	  //缓存用户是否完善信息
	  if (res&&res.status) {
	    sessionStorage.isComplete = res.data.isComplete;
	  }
	  //假如已完善资料--需要判断是否发布技能
	  if(sessionStorage.isComplete=='N'){
	  	getSkill(callBack,next,to);
	  }else{
	  	if(callBack){
		  	callBack(next,to);
		  }
	  }
	})
}
//获取用户是否一键发布技能
function getSkill(callBack,next,to){
	getSkillCount().then(res=>{
		//缓存用户是否已发布技能
		if(res&&res.status&&!res.data.count){//未发布技能--需要去发布
			sessionStorage.experienceSkill = '1';
		}
		//假如已发布技能--需要判断是否发布服务
	  if(!sessionStorage.experienceSkill){
	  	getService(callBack,next,to);
	  }else{
	  	if(callBack){
		  	callBack(next,to);
		  }
	  }
	})
}
//获取用户是否一键发布服务
function getService(callBack,next,to){
	fetchRequireList().then(res=>{
		if(res&&res.status&&!res.data.list.length){//发布需求数量为0--即未发布过需求
			sessionStorage.experienceService = '1';
		}
		if(callBack){
	  	callBack(next,to);
	  }
	})
}
//同城路由跳转
function tcRouterNext(next,to){
	if(sessionStorage.isNoPwd&&to.path!='/setPwd'){
		next({path:'/setPwd'})
	}else if(sessionStorage.isComplete=='Y'){
		if(to.path=='/completeInformation'){
			next();
		}else{
			next({path:'/completeInformation'})
		}
	}else if(sessionStorage.experienceSkill){
		if(to.path=='/experienceSkill'){
			next();
		}else{
			next({path:'/experienceSkill'})
		}
	}else if(sessionStorage.experienceService){
		if(to.path=='/experienceService'){
			next();
		}else{
			next({path:'/experienceService'})
		}
	}else{
		pageShare(to);
		next();
	}
}
//登录后的路由跳转判断
function toRouterNext(to,next){
	if(to.path=='/stationPay'||to.path=='/jsdOrderConfirm'||to.path=='/stationPaySuccess'||to.path=='/jsdPaySuccess'){
		next();
		return;
	}
	//同城模块的页面需要判断   是否设置交易密码     是否完善资料
	if(sessionStorage.isComplete){//已经缓存是否完善信息
		tcRouterNext(next,to);
	}else{
		getComplete(tcRouterNext,next,to);
	}
}
window.getIosUserInfo=function(data){
		if(data){
			let dataVal;
			if(typeof data=='object'){
				dataVal = data;
			}else{
				dataVal=JSON.parse(data);
			}
			sessionStorage.phone=dataVal.phone;
			sessionStorage.headPhoto=dataVal.headPhoto;
			window.location.reload();
		}
}

let vm = new Vue({
  router,
  store
}).$mount('#app')
//初始化数据
window.$router = vm.$router //路由对象赋值给全局window 对象


//window上面添加alertTip方法
window.alertTip = function(msg, callback) {
  let div = document.createElement('div')
  div.className = 'layer_shadow layer_shadow_tip'
  div.innerHTML = '<span class="dialogCont">' + msg + '</span>'
  document.body.appendChild(div)
  let t = setTimeout(function() {
    document.body.removeChild(div)
    if (callback) {
      callback()
      clearTimeout(t)
    }
  }, 1500)
}

//window上面添加expectTips方法
var Profile = Vue.extend({
  template: "<div class='layer_shadow layer_shadow_tip'><div class='expectBox' @click='close'><img :src='expectImg'></div></div>",
  methods: {
    close: function () {
      this.callback()
    }
  }
})
window.expectTips = function(){
	let div=document.createElement("div");
	div.innerHTML = '<div id="expectTips"></div>'
	document.body.appendChild(div);
	var profile = new Profile({
		data:{
			expectImg
		},
	  methods:{
	  	callback:function(){
	  		document.body.removeChild(div);
	  	}
	  }
	})
	profile.$mount('#expectTips');
}

//消息弹窗
Vue.prototype.$alert = messageBox.alert
Vue.prototype.$confirm = messageBox.confirm

//分享组件
Vue.prototype.$share = share;

//加载中动画
var loading = function() {
  this.open = function( text = '加载中...') {
    Indicator.open({
      text: text,
      spinnerType: 'fading-circle'
    })
  }
  this.close = function() {
    Indicator.close()
  }
}
window.loading = new loading()
