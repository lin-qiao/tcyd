import {fetchP} from 'src/config/fetch'


/**
* @author shangliqun@ddtkj.com
* @since 2018-08-3
* @description 充值=>账户余额 + 冻结金额
*/
var fetchRechargeAmount = () => fetchP('DDT_TC_ACCOUNT_RECHARGE_AMOUNT',{},true);
/**
* @author wangxinhui@ddtkj.com
* @since 2018-08-13
* @description 钻石充值明细
*/
var fetchStaticRecharge = () => fetchP('DDT_TC_ACCOUNT_MASONRY_STATICRECHARGE',{},true);

/**
* @author shangliqun@ddtkj.com
* @since 2018-08-13
* @param masonryAmount 充值数量
* @param money 话费金额
* @param type  充值类型(余额、收入、佣金、微信、支付宝等)
* @description 钻石=>充值
*/
var fetchMasonryRecharge = (masonryAmount,money,type,platform="WX") => fetchP('DDT_TC_ACCOUNT_MASONRY_RECHARGE',{masonryAmount,money,type,platform});



export {
	fetchRechargeAmount,
	fetchMasonryRecharge,
	fetchStaticRecharge
}
