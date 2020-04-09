import {fetchP,fetchN,fetchWechatG} from 'src/config/fetch'
/**
* @author zhanghao@ddtkj.com
* @since 2018-10-19
* @description 查询我邀请的站长列表（一级）
* @param {String} page 页码
* @param {String} size 每页条数
*/
export const fetchStationInviteList = (page,size) => fetchP('DDT_TC_PARTNRE_INVITE_LIST_PAGE', {page,size}, true);

/**
* @author zhanghao@ddtkj.com
* @since 2018-10-19
* @description 查询我邀请的站长列表（下一级）
* @param {String} mid 服务商mid
* @param {String} page 页码
* @param {String} size 每页条数
*/
export const fetchStationInviteTwice = (mid,page,size) => fetchP('DDT_TC_PARTNER_INVITE_LIST_BY_MID_PAGE', {mid,page,size}, true);

/**
* @author zhanghao@ddtkj.com
* @since 2018-10-19
* @description 查询我邀请的注册人列表（一级）
* @param {String} page 页码
* @param {String} size 每页条数
*/
export const fetchInviteList = (page,size) => fetchP('DDT_TC_INVITE_LIST_PAGE', {page,size}, true);

/**
* @author zhanghao@ddtkj.com
* @since 2018-10-19
* @description 查询我邀请的注册人列表（下一级）
* @param {String} mid 服务商mid
* @param {String} page 页码
* @param {String} size 每页条数
*/
export const fetchInviteTwice = (mid,page,size) => fetchP('DDT_TC_INVITE_LIST_BY_MID_PAGE', {mid,page,size}, true);

/**
* @author zhanghao@ddtkj.com
* @since 2018-10-19
* @description 站长消费明细列表
* @param {String} orderStatus  wait 待付款 success 已付款  目前设计只有success
* @param {String} page 页数
* @param {String} size 条数
*/
export const fetchStationConsumeList = (orderStatus,page,size) => fetchP('DDT_TC_PARTNER_ORDER_LIST',{orderStatus,page,size}, true);

/**
* @author zhanghao@ddtkj.com
* @since 2018-10-19
* @description 站长消费明细详情
* @param {String} orderNo
*/
export const fetchStationConsumeDetail = (orderNo) => fetchP('DDT_TC_PARTNER_ORDER_DETAIL',{orderNo}, true);

/**
* @author songlingfang@ddtkj.com
* @since 2018-10-20
* @description 查询掌柜等级配置列表
*/
export const fetchPartnerconfList = () => fetchP('DDT_TC_PARTNER_CONF_LIST',{}, true);


/**
 * @author zhanghao@ddtkj.com
 * @since 2018-8-25
 * @description 获取分享系统参数
 */
export const fetchGetCommonDetail = (bizType,codes) =>  fetchP('DDT_TC_COMMON_PROFILE_MULTIPLE_DETAIL', {bizType,codes}, true)

/**
 * @author songlingfang@ddtkj.com
 * @since 2018-10-20
 * @description 单点登录
 */

export const fetchAppLogin = (unLoginUrl,loginUrl) =>{

	let baseUrl="https://cas-tcyd.dadetong.com"
	if(window.location.href.indexOf("ddtkj.cn")>-1){
		baseUrl="http://api-cas.tcyd.ddtkj.cn"
	}
   return fetchWechatG(baseUrl+'/isExistSession?unLoginUrl='+unLoginUrl+"&loginUrl="+loginUrl)
}


/**
* @author wangxinhui@ddtkj.com
* @since 2018-10-20
* @description 站长支付详情
* @param {String} orderNo 订单号
*/
export const fetchPartnerOrderPaydetail = (orderNo) => fetchP('DDT_TC_PARTNER_ORDER_PAYDETAIL',{orderNo}, true);

/**
* @author wangxinhui@ddtkj.com
* @since 2018-10-20
* @description 同城站长支付
* @param {String} orderNo 订单号
* @param {String} inviteCode 邀请码
*/
export const fetchPartnerOrderPay = (orderNo,inviteCode,submitToken) => fetchP('DDT_TC_PARTNER_ORDER_PAY',{orderNo,inviteCode,submitToken});

/**
* @author wangxinhui@ddtkj.com
* @since 2018-10-20
* @description 晋商贷站长支付
* @param {String} orderNo 订单号
* @param {String} inviteCode 邀请码
*/
export const fetchJsdPartnerOrderPay = (orderNo,inviteCode,submitToken) => fetchP('DDT_TC_JSD_PARTNER_ORDER_PAY',{orderNo,inviteCode,submitToken});

/**
* @author wangxinhui@ddtkj.com
* @since 2018-10-20
* @description 查询晋商贷余额
*/
export const fetchJsdBalance = () => fetchP('DDT_TC_JSD_BALANCE',{}, true);

/**
* @author houlijun@ddtkj.com
* @since 2018-10-20
* @description 同城站长下单
* @param {String} partnerLevel 站长code编码
* @param {String} submitToken 重复提交token
*/
export const fetchPartnerOrderCreate = (partnerLevel,submitToken) => fetchP('DDT_TC_PARTNER_ORDER_SAVEORDER',{partnerLevel,submitToken});

/**
* @author zhanghao@ddtkj.com
* @since 2018-10-30
* @description 赠送站长
* @param {String} submitToken 重复提交token
*/
export const freeStation = (submitToken) => fetchP('DDT_TC_JSD_PARTNER_SEND',{submitToken},true);
