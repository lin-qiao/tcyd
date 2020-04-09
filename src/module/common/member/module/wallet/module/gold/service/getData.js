import {fetchP} from 'src/config/fetch'
/**
* @author houlijun@ddtkj.com
* @since 2018-08-06
* @description 获取今日获得金币和可用金币个数
*/
var fetchGoldNum = () => fetchP('DDT_TC_ACCOUNT_GOLD_BALANCE',{},true);
/**
* @author houlijun@ddtkj.com
* @since 2018-08-06
* @param type 任务类型  1今日任务 2常规任务 
* @param rewardType 奖励类型  1.金币2.钻石
* @param size  查询多少条
* @description 获取任务列表
*/
var fetchTaskList = (data) => fetchP('DDT_TC_ACTIVITY_MISSIONLIST',data,true);
/**
* @author houlijun@ddtkj.com
* @since 2018-08-06
* @description 获取奖品列表
*/
var fetchLotteryPrizeList = () => fetchP('DDT_TC_ACTIVITY_LOTTERY_LOTTERYPRIZELIST',{},true);
/**
* @author houlijun@ddtkj.com
* @since 2018-08-06
* @description 判断用户第几次抽奖
*/
var fetchLotteryCount = () => fetchP('DDT_TC_ACTIVITY_LOTTERY_LOTTERYWINCOUNT',{},true);
/**
* @author houlijun@ddtkj.com
* @since 2018-08-06
* @description 抽奖
*/
var fetchLottery = () => fetchP('DDT_TC_ACTIVITY_LOTTERY_LOTTERYSERVLET',{});
/**
* @author houlijun@ddtkj.com
* @since 2018-08-06
* @description 领奖
* @param {String} winMobile 获奖手机号
*/
var fetchGetPrize = (winMobile) => fetchP('DDT_TC_ACTIVITY_LOTTERY_GETLOTTERYWIN',{winMobile},true);
/**
* @author houlijun@ddtkj.com
* @since 2018-08-06
* @description 获取我的中奖信息列表
* @param {Int} page 页码
* @param {Int} size 每页展示条数
*/
var fetchMyLotterySuccessList = (page,size) => fetchP('DDT_TC_ACTIVITY_LOTTERY_LOTTERYWINMYLIST',{page,size},true);
/**
* @author houlijun@ddtkj.com
* @since 2018-08-06
* @description 获取中奖信息列表
*/
var fetchLotterySuccessList = () => fetchP('DDT_TC_ACTIVITY_LOTTERY_LOTTERYWINLIST',{},true);
/**
* @author houlijun@ddtkj.com
* @since 2018-08-06
* @description 获取金币收支列表
* @param {String} changeType 收入支出 income、consume
* @param {Int} page 页码
* @param {Int} size 每页展示条数
*/
var fetchGoldRecord = (changeType,page,size) => fetchP('DDT_TC_ACCOUNT_GOLD_DETAIL',{changeType,page,size},true);
/**
* @author houlijun@ddtkj.com
* @since 2018-08-06
* @description 修改收货地址
* @param {Int} id 收货地址id
* @param {String} city 市
*/
var fetchUpdateAddress = (data) => fetchP('DDT_TC_MEMBER_ADDRESS_ADDRESSUPDATE',data);


export {
	fetchGoldNum,
	fetchTaskList,
	fetchLotteryPrizeList,
	fetchLotteryCount,
	fetchLottery,
	fetchMyLotterySuccessList,
	fetchLotterySuccessList,
	fetchGoldRecord
}