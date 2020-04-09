import {fetchP} from 'src/config/fetch'


/**
 * @author houlijun@ddtkj.com
 * @since 2018-08-14
 * @description 获取用户头像等信息
 */
let fetchVipUserInfo = ()=>fetchP("DDT_TC_MEMBER_MEMBERINFO",{},true);
/**
 * @author houlijun@ddtkj.com
 * @since 2018-08-14
 * @description 获取VIP购买列表
 * @param {Array} vipLevel  Vip等级(可空)
 */
let fetchVipList = (vipLevel)=>fetchP("DDT_TC_MEMBER_VIPLIST",{vipLevel},true);
/**
 * @author houlijun@ddtkj.com
 * @since 2018-08-14
 * @description 获取VIP购买对应商品列表
 * @param {Int} page  页码
 * @param {Int} size  一页展示条数
 * @param {Int} priceId  VIP价格id
 */
let fetchVipGoodsList = (page,size,priceId)=>fetchP("DDT_TC_MEMBER_GOODSLIST",{page,size,priceId},true);
/**
 * @author houlijun@ddtkj.com
 * @since 2018-08-14
 * @description 购买vip并赠送商品
 * @param {Int} vipPriceId  vip价格id
 * @param {Int} gid 赠送商品id（为0不送商品）
 * @param {String} accountTypes  支付类型（balance（充值），income（收入），brokerage（佣金）），多个用逗号分割
 * @param {Int} addressId 收货地址id
 */
let fetchBuyVip = (data)=>fetchP("DDT_TC_MEMBER_BUY_VIP",data);
/**
 * @author houlijun@ddtkj.com
 * @since 2018-08-13
 * @param {Int} gid 商品id
 * @param {Int} priceId  Vip价格id
 * @description 获取VIP商品详情
 */
let fetchVipGoodDetail = (gid,priceId)=>fetchP("DDT_TC_MEMBER_GOODSDETAIL",{gid,priceId},true);
/**
 * @author houlijun@ddtkj.com
 * @since 2018-08-14
 * @description 获取邀请好友情况
 */
let fetchInviteDetail = ()=>fetchP("DDT_TC_MEMBER_INVITEFRIENDS",{},true);
/**
 * @author houlijun@ddtkj.com
 * @since 2018-08-14
 * @description 获取邀请好友红包
 * @param {String} activityCode 活动code
 */
let fetchInviteRedpacket = (activityCode)=>fetchP("DDT_TC_MEMBER_REDPACKET",{activityCode},true);




export {
	fetchVipUserInfo,
	fetchVipList,
	fetchVipGoodsList,
	fetchBuyVip,
	fetchVipGoodDetail,
	fetchInviteDetail,
	fetchInviteRedpacket
}