import {fetchP} from 'src/config/fetch'

/**
* @author songlingfang@ddtkj.com
* @since 2018-08-01
* @description 获取可用钻石+今日获得
*/
var fetchUsableJewel = () => fetchP('DDT_TC_ACCOUNT_MASONRY_BALANCE',{},true);
/**
 * @author wangxinhui@ddtkj.com
 * @since 2018-08-01
 * @description 今日获得佣金 + 可用佣金
 */
let fetchHire = ()=>fetchP("DDT_TC_ACCOUNT_MEMBER_BROKERAGETODAY",{},true);

/**
 * @author wangxinhui@ddtkj.com
 * @since 2018-08-01
 * @description 佣金明细
 */
let fetchHireList = (bizType)=>fetchP("DDT_TC_ACCOUNT_MEMBER_BROKERAGEDETAIL",{bizType},true);

/**
 * @author wangxinhui@ddtkj.com
 * @since 2018-08-01
 * @description 收入明细
 */
let fetchEarningList = (bizType)=>fetchP("DDT_TC_ACCOUNT_MEMBER_INCOMEDETAIL",{bizType},true);

/**
 * @author wangxinhui@ddtkj.com
 * @since 2018-08-01
 * @description 今日获得收入 + 可用收入
 */
let fetchEarning = ()=>fetchP("DDT_TC_ACCOUNT_INCOMETODAY",{},true);

/**
 * @author wangxinhui@ddtkj.com
 * @since 2018-08-01
 * @description 可用充值金额+今日充值
 */
let fetchRechargeData = ()=>fetchP("DDT_TC_ACCOUNT_RECHARGETODAY",{},true);

/**
 * @author wangxinhui@ddtkj.com
 * @since 2018-08-01
 * @description 充值记录列表
 */
let fetchRechargeList = ()=>fetchP("DDT_TC_ACCOUNT_RECHARGEORDERLIST",{},true);

/**
 * @author jianghao@ddtkj.com
 * @since 2018-08-13
 * @description 钻石明细
 */
let fetchStaticdeail = ()=>fetchP("DDT_TC_ACCOUNT_MASONRY_STATICDETAIL",{},true);

/**
 * @author jianghao@ddtkj.com
 * @since 2018-08-13
 * @description 可用收入+今日收入
 */
let fetchBalance = ()=>fetchP("DDT_TC_ACCOUNT_MASONRY_BALANCE",{},true);

/**
 * @author wangxinhui@ddtkj.com
 * @since 2018-10-20
 * @description 我的消费金列表
 */
let fetchAccountEncourageDetaul = ()=>fetchP("DDT_TC_ACCOUNT_ENCOURAGEDETAUL",{},true);

export {
	fetchUsableJewel,
    fetchHire,
    fetchHireList,
    fetchEarningList,
    fetchEarning,
    fetchRechargeData,
    fetchRechargeList,
    fetchStaticdeail,
    fetchBalance,
    fetchAccountEncourageDetaul
}



