import {fetchP} from 'src/config/fetch'


/**
 * @author wangxinhui@ddtkj.com
 * @since 2018-08-01
 * @description 钱包-可用余额
 */
let fetchWallet = ()=>fetchP("DDT_TC_ACCOUNT_MEMBER_BURSETOTALMONEY",{},true);

/**
 * @author wangxinhui@ddtkj.com
 * @since 2018-08-01
 * @description （银行卡，钻石，金币，红包，现金券）数量
 */
let fetchWalletData = ()=>fetchP("DDT_TC_ACCOUNT_SELECTACCOUNT",{},true);

/**
 * @author wangxinhui@ddtkj.com
 * @since 2018-08-01
 * @description 资金记录
 */
let fetchFundRecord = (type)=>fetchP("DDT_TC_ACCOUNT_MEMBER_INEXPDETAIL",{type},true);


/**
 * @author wangxinhui@ddtkj.com
 * @since 2018-08-01
 * @description 收入、充值、佣金提现详情
 */
let fetchWithdrawDetail = (id)=>fetchP("DDT_TC_ACCOUNT_CASH_ONEWITHDRAWALSDETAIL",{id},true);

/**
 * @author wangxinhui@ddtkj.com
 * @since 2018-08-01
 * @description 我的收入详情
 */
let fetchEarningDetail = (id)=>fetchP("DDT_TC_ACCOUNT_MEMBER_ONEINCOME",{id},true);

/**
 * @author wangxinhui@ddtkj.com
 * @since 2018-08-01
 * @description 我的充值详情
 */
let fetchRechargeDetail = (orderNo)=>fetchP("DDT_TC_ACCOUNT_RECHARGEDETAIL",{orderNo},true);

/**
 * @author wangxinhui@ddtkj.com
 * @since 2018-08-14
 * @param id 记录id
 * @description 钻石充值详情
 */
let fetchOneRecharge = (id)=>fetchP("DDT_TC_ACCOUNT_MASONRY_ONERECHARGE",{id},true);

/**
 * @author wangxinhui@ddtkj.com
 * @since 2018-08-14
 * @param id 记录id
 * @description 钻石详情
 */
let fetchMasonryOne = (id)=>fetchP("DDT_TC_ACCOUNT_MASONRY_ONE",{id},true);


/**
 * @author wangxinhui@ddtkj.com
 * @since 2018-08-14
 * @param num 条数
 * @description 根据时间获取充值记录
 */
let fetchRechargeLog = (num)=>fetchP("DDT_TC_ACCOUNT_RECHARGE_LOG",{num},true);

export {
    fetchWallet,
    fetchWalletData,
    fetchFundRecord,
    fetchWithdrawDetail,
    fetchEarningDetail,
    fetchRechargeDetail,
    fetchOneRecharge,
    fetchMasonryOne,
    fetchRechargeLog
}