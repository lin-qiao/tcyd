import shareImg from '../../static/img/logo_share.png'
import {fetchWXShareSign} from '../service/getDataWechat' //微信分享sdk
import {getShareImg,getDesc} from './mUtils' //微信分享sdk

/**
 * @description 微信jssdk 初始化
 */

export const wechatJSSDKInit = (pageUrl) =>{
	let url = pageUrl||location.href;
	url=url.split("#")[0];//分享地址 不能包含hash 值
	fetchWXShareSign(url).then(res => {
		if(!res){
			return;
		}
		wx.config({
		    //debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
		    appId: res.appId, // 必填，企业号的唯一标识，此处填写企业号corpid
		    timestamp: res.timestamp, // 必填，生成签名的时间戳
		    nonceStr: res.nonceStr, // 必填，生成签名的随机串
		    signature: res.signature,// 必填，签名，见附录1
		    jsApiList: res.jsApiList
		});
	});
}

/**
 * @description 微信分享
 */

export const wechatShare = (shareLink,shareTitle,shareDesc,shareImgUrl,pageUrl) =>{
		wx.ready(function(){
			 // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，
		     //config是一个客户端的异步操作，
		     //所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。
		     //对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
		     //微信分享公共函数
		    let title = shareTitle||document.title,
		   	desc=getDesc(shareDesc),
		   	link=shareLink||window.location.href,
		   	imgUrl = getShareImg(shareImgUrl);// 分享 标题  链接，图标
				
				//自定义“分享给朋友”及“分享到QQ”按钮的分享内容（1.4.0）
				wx.updateAppMessageShareData({ 
						title: title, // 分享标题
						desc:desc, // 分享描述
						link:link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
						imgUrl:imgUrl, // 分享图标
						success: function () {
							// 设置成功
						}
				});
				
				
				//自定义“分享到朋友圈”及“分享到QQ空间”按钮的分享内容（1.4.0）
				wx.updateTimelineShareData({ 
						title: title, // 分享标题
						link: link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
						imgUrl: imgUrl, // 分享图标
						success: function () {
							// 设置成功
						}
				});
		});
}

/**
 * @description 微信定位
 * @param{Function} 定位成功回调函数
 */
export const wechatGetLocation = (callbackFn) =>{
	wx.ready(function(){
		wx.getLocation({
			type: 'gcj02', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02(高德)'
			success: callbackFn
		});
	})
}
