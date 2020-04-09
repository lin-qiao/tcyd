import {wechatConfig} from 'src/config/env.js'
import {fetchWechatG,fetchWechatP} from '../config/fetch'

/**
* @author songlingfang@ddtkj.com
* @since 2018-7-7
* @description 微信分享 签名信息
* @example
* await getWXShareSign(url);
*/
let fetchWXShareSign = (url) =>{
	let apiUrl='https://www.dadetong.com/api/wechat/'+wechatConfig.path+'/sdkConfig?url='+encodeURIComponent(url) 
	return fetchWechatG(apiUrl);
}

/**
* @author gaoxiaopeng@ddtkj.com
* @since 2018-10-9
* @description 微信获取用户信息
* @example
* await fetchWXUserInfo(url);
*/
let fetchWXUserInfo = (openid) =>{
	let apiUrl='https://www.dadetong.com/api/wechat/'+wechatConfig.path+'/getUser?openid='+openid 
	return fetchWechatG(apiUrl);
}
/**
* @author gaoxiaopeng@ddtkj.com
* @since 2018-10-9
* @description 生成动态二维码 ticket
* @param {String} info= 'o=PTDD18101013510583725447&m=13734000562&t=1'
* @example
* await fetchNodeCreateTmpQRTicket(url);
*/
let fetchNodeCreateTmpQRTicket = (info) =>{
	let apiUrl='https://www.dadetong.com/api/wechat/'+wechatConfig.path+'/createTmpQRCode?info='+info
	return fetchWechatG(apiUrl);
}

/**
 * @author gaoxiaopeng@ddtkj.com
 * @description  微信授权登陆
 * @param {String} code

 */
let fetchWechatNodeLogin = (code) => {
	let apiUrl='https://www.dadetong.com/api/wechat/'+wechatConfig.path+'/newWxLogin?code='+code;
 	return fetchWechatG(apiUrl)

}


/**
 * @author gaoxiaopeng@ddtkj.com
 * @description  微信授权登陆
 * @param {String} code

 */
let fetchShareImg = (mobile,id) => {
	let apiUrl='https://www.dadetong.com/api/wechat/'+wechatConfig.path+'/inviteImgs?mobile='+mobile+'&id='+id;
 	return fetchWechatP(apiUrl)

}




export{
	fetchWXShareSign,
	fetchWXUserInfo,
	fetchNodeCreateTmpQRTicket,
	fetchWechatNodeLogin,
	fetchShareImg
}
