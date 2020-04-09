import {fetchP} from 'src/config/fetch'

/**
* @author songlingfang@ddtkj.com
* @since 2018-08-13
* @description 查询打卡参与情况
*/
var fetchClockGetJoin = () => fetchP('DDT_TC_ACTIVITY_GETUPEARLY_GETJOIN',{},true);
/**
* @author songlingfang@ddtkj.com
* @since 2018-08-13
* @description 查询今日打卡战况
*/
var fetchClockGetClock= () => fetchP('DDT_TC_ACTIVITY_GETUPEARLY_GETCLOCK',{},true);
/**
* @author songlingfang@ddtkj.com
* @since 2018-08-14
* @description 参与早起打卡付款
* @param {int} money 金额
* @param {int} payType 支付方式
*/
var fetchClockPay = (money,payType,payPassword) => fetchP('DDT_TC_ACTIVITY_GETUPEARLY_PAYORDER',{money,payType,payPassword});
/**
* @author songlingfang@ddtkj.com
* @since 2018-08-14
* @description 早起打卡
*/
var fetchClockIn = () => fetchP('DDT_TC_ACTIVITY_CLOCKIN',{});
/**
* @author songlingfang@ddtkj.com
* @since 2018-08-13
* @description 查询打卡记录、资金累计
* @param {int} page 页码
* @param {int} pageSize 条数
*/
var fetchClockInList = (page,pageSize) => fetchP('DDT_TC_ACTIVITY_CLOCKINLIST',{page,pageSize},true);
export {
	fetchClockGetJoin,
	fetchClockGetClock,
	fetchClockInList,
	fetchClockPay,
	fetchClockIn
}
