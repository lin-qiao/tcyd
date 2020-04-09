import {fetchP} from 'src/config/fetch'


/**
 * @author wangxinhui@ddtkj.com
 * @since 2018-08-01
 * @description 可用充值提现明细
 */
let fetchRwithdrawRecord = ()=>fetchP("DDT_TC_ACCOUNT_CASH_USABLERECHARGE",{},true);

/**
 * @author wangxinhui@ddtkj.com
 * @since 2018-08-01
 * @description 可用收入提现明细
 */
let fetchEwithdrawRecord = ()=>fetchP("DDT_TC_ACCOUNT_CASH_USABLEINCOME",{},true);

/**
 * @author wangxinhui@ddtkj.com
 * @since 2018-08-01
 * @description 可用佣金提现明细
 */
let fetchHwithdrawRecord = ()=>fetchP("DDT_TC_ACCOUNT_CASH_USABLEBROKERAGE",{},true);



/**
 * @author wangxinhui@ddtkj.com
 * @since 2018-08-01
 * @description 可用充值提现金额
 */
let fetchRwithdrawMoney = ()=>fetchP("DDT_TC_ACCOUNT_CASH_BALANCEAMOUNT",{},true);

/**
 * @author wangxinhui@ddtkj.com
 * @since 2018-08-01
 * @description 可用收入提现金额
 */
let fetchEwithdrawMoney = ()=>fetchP("DDT_TC_ACCOUNT_CASH_INCOMEAMOUNT",{},true);

/**
 * @author wangxinhui@ddtkj.com
 * @since 2018-08-01
 * @description 可用佣金提现金额
 */
let fetchHwithdrawMoney = ()=>fetchP("DDT_TC_ACCOUNT_CASH_BROKERAGEAMOUNT",{},true);



/**
 * @author wangxinhui@ddtkj.com
 * @since 2018-08-02
 * @param bizType     平台类型   //ddt(“大德通”)/tc(“同城”)
 * @param ValidCode   验证码
 * @param tradePswd   校验密码
 * @param submitToken     
 * @param cardId      银行卡ID
 * @param orderAmount 金额
 * @param client      操作端
 * @description 充值提现操作
 */
let fetchWithdrawRecharge = (data)=>fetchP("DDT_TC_ACCOUNT_CASH_RECHARGEWITHDRAWALS",data);

/**
 * @author wangxinhui@ddtkj.com
 * @since 2018-08-02
 * @param bizType     平台类型   //ddt(“大德通”)/tc(“同城”)
 * @param ValidCode   验证码
 * @param tradePswd   校验密码
 * @param submitToken     
 * @param cardId      银行卡ID
 * @param orderAmount 金额
 * @param client      操作端
 * @description 收入提现操作
 */
let fetchWithdrawEarning = (data)=>fetchP("DDT_TC_ACCOUNT_CASH_INCOMEWITHDRAWALS",data);


/**
 * @author wangxinhui@ddtkj.com
 * @since 2018-08-02
 * @param bizType     平台类型   //ddt(“大德通”)/tc(“同城”)
 * @param ValidCode   验证码
 * @param tradePswd   校验密码
 * @param submitToken     
 * @param cardId      银行卡ID
 * @param orderAmount 金额
 * @param client      操作端
 * @description 佣金提现操作
 */
let fetchWithdrawHire = (data)=>fetchP("DDT_TC_ACCOUNT_CASH_BROKERARGEWITHDRAWALS",data);



export {
    fetchRwithdrawRecord,
    fetchEwithdrawRecord,
    fetchHwithdrawRecord,
    fetchRwithdrawMoney,
    fetchEwithdrawMoney,
    fetchHwithdrawMoney,
    fetchWithdrawRecharge,
    fetchWithdrawEarning,
    fetchWithdrawHire
}