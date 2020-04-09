/**
 * 配置编译环境和线上环境之间的切换
 *
 * BASEURL: 域名地址
 * routerMode: 路由模式
 * imgBaseUrl: 图片所在域名地址
 *
 */
const BASEURL='/api';
const routerMode='history';
let wechatConfig = {
	path:'tcyd',
	appid:'wx37af0f748447f2cc'
};

console.log(process.env.NODE_ENV )

let imgBaseUrl = 'https://tcimg.dadetong.com';

let contactKF = 'https://tcyd-wx.dadetong.com/service';

if(window.location.host.indexOf("ddtkj.cn")>-1){
	imgBaseUrl = 'http://c6c5-car.oss-cn-beijing.aliyuncs.com';
	contactKF = 'http://test.tcyd-wx.ddtkj.cn/service'
	wechatConfig = {
		path:'mmc',
		appid:'wxe0df54c841430b93'
	};
}


let wechatSystem = false; //微信环境变量，用于判断当前环境是否为微信环境
/*判断是否是微信*/
var u = navigator.userAgent||"";
var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端

if((u.match(/MicroMessenger/i)||"").toString().toLocaleLowerCase() == "micromessenger") {
	wechatSystem = true;
}


const REGEX={  //系统所有正则表达式
	loginPwd:{
		regex:/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,20}$/,
		msg:'请输入8-20位字母+数字组合密码'
	},
	payPwd:{
		regex:/^\d{6}$/,
		msg:'请输入6位纯数字支付密码'
	},
	mobile:{
		regex:/^((1[3-9][0-9]))\d{8}$/,
		msg:'请输入正确的手机号'
	},
	nickname:{
		regex:function(){
			return new RegExp()//返回空正则可以匹配所有
		},
		msg:'请输入正确的昵称'
	},//连续四个数字
	email:{
		regex:/^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
		msg:'请输入正确的邮箱地址'
	},
	noHtml:{
		regex:new RegExp(/[(\@)(\#)(\$)(\^)(\&)(\*)(\[)(\])(\{)(\})(\|)(\\)(\')(\/)(\<)(\>)(\)]+/),
		msg:'不能输入特殊字符！'
	},
	fixedPhone:{
		regex:/0\d{2,3}-\d{5,9}|0\d{2,3}-\d{5,9}/,
		msg:'请输入正确格式的固定电话。如：021-2356984'
	},
	chinese:{
		regex:/^[\u4e00-\u9fa5]{0,}$/,
		msg:'只能是汉字'
	},
	positiveInteger:{
		regex:/^[1-9]\d*$/,
		msg:'只能是正整数'
	},
	patrn:{
		regex:/^[0-9]*$/,
		msg:'纯数字'
	},
	special:{
		regex:new RegExp("[`~!#$^&*()=|{}''\\[\\].<>/?~#……&*|{}‘']") ,
   		msg:'不能输入特殊字符'
	},
	qq:{
		regex:/^[1-9][0-9]{4,14}$/,
		msg:'请输入正确的QQ号码'
	}
}

export {
	BASEURL,
	routerMode,
	imgBaseUrl,
	REGEX,
	wechatSystem,
	isAndroid,
	isiOS,
	wechatConfig,
	contactKF
}
