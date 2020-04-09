import {fetchP} from 'src/config/fetch'


/**
 * @description 需求管理列表
 * @param {String} status  0 全部 processing 进行中  complete 已完成  expired 已过期
 */
let fetchRequireList = (status,page,size)=>fetchP("DDT_TC_REQUIRE_LIST",{status,page,size},true);

/**
 * @description 需求详情
 * @param {Int} requireId 需求id = 1
 */
let fetchRequireDetail = (requireId)=>fetchP("DDT_TC_REQUIRE_DETAIL",{requireId},true);


/**
 * @description 应邀者信息列表接口
 * @param {Int} requireId 需求id =1
 */
let fetchRequireInviterList = (requireId)=>fetchP("DDT_TC_REQUIRE_INVITE_GETINVITEADNMEMBERINFO",{requireId},true);


/**
 * @description 立即应邀接口
 * @param {Int} id 应邀id
 * @param {String} unit 单位
 * @param {String} unitPrice 单价
 */
let fetchRequireToInvite = (id,unit,unitPrice)=>fetchP("DDT_TC_REQUIRE_REQUIRE_IMMEDIATELY",{id,unit,unitPrice,submitToken:true});

/**
 * @description 需求付款下单接口
 * @param {Int} requireId 需求Id
 * @param {String} paymentMethod 付款方式
 * @param {String} payBalance 支付金额
 * @param {String} payEarnestMoney 支付金额
 * @param {String} accountType 支付类型=[Balance|income|brokerage]
 * @param {String} serviceMid 服务者Id
 */
let fetchRequireToOrder = (requireId,paymentMethod,unitPrice)=>fetchP("DDT_TC_REQUIRE_ORDER_SAVE",{id,unit,unitPrice,submitToken:true});

/**
 * @description 确认付款
 * @param {String} orderSn 订单号
 */
let fetchRequireToPay = (orderSn)=>fetchP("DDT_TC_REQUIRE_ORDER_CONFIRMPAYMENT",{orderSn,submitToken:true});

/**
 * @description 需求付款下单(项服务者 付订单或者全款)
 * @param {Object} data 订单号
 * {
 * 	requireId {String}	需求id
 * 	paymentMethod  {String} 付款方式
 * 	payBalance  {String}	支付金额
 * 	payEarnestMoney  {String}	是否支付诚意金
 * 	accountType  {String}	支付类型
 * 	serviceMid  {String}	服务者Id
 * }
 */
let fetchRequireToPayInviter = (data)=>{
	data.submitToken=true;
	return fetchP("DDT_TC_REQUIRE_ORDER_SAVE",data);
}

/**
 * @description 支付尾款
 * @param {Object} data 订单号
 * {
 * 	orderSn {String}	订单流水号
 * 	spareMoney  {String} 尾款
 * 	payEarnestMoney  {String}	是否支付诚意金    Y/N
 * 	accountType  {String}	支付类型   'balance,income,brokerage'
 * }
 */
let fetchRequireLastPay = (data)=>{
	data.submitToken=true;
	return fetchP("DDT_TC_REQUIRE_ORDER_PAYSURPLUS",data);
}


/**
 * @description 查询可退金额
 * @param {string} orderSn 订单号
 */
let fetchRequireDrawBackMoney = (orderSn)=>fetchP("DDT_TC_REQUIRE_ORDER_REFUNDABLEAMOUNT",{orderSn},true);


/**
 * @description 申请退款
 * @param {string} reason 退款原因
 * @param {string} money 退款金额
 * @param {string} orderSn 订单流水号
 */
let fetchRequireDrawBack = (orderSn,money,reason)=>fetchP("DDT_TC_ORDER_DRAWBACK",{orderSn,money,reason,submitToken:true});

/**
 * @description 需求评价
 * @param {Object} data 订单号
 * {
 * 	orderSn {String}	订单流水号
 * 	workAccuracy  {String} 工作准确度
 * 	workAbility  {String}	工作技能
 * 	workingAttitude  {String}	工作态度
 * 	accounimpression  {String}	印象
 * 	evaluationComment  {String}	评价内容
 *  isAnonymous  {String}	是否匿名评价
 * }
 */
let fetchRequireFeedback = (data)=>{
	data.submitToken=true;
	return fetchP("DDT_TC_ORDER_EVALUATIONSAVE",data);
}


/**
 * @description 确认付款 ，订单完成
 * @param {String} orderSn  订单号
 * @param {String} tradePassword 交易密码
 */
let fetchRequireComplete = (orderSn,tradePassword)=>fetchP("DDT_TC_REQUIRE_ORDER_CONFIRMPAYMENT",{orderSn,tradePassword,submitToken:true});

/**
 * @description 查询诚意金
 * @param {string} requireId 需求Id
 */
let fetchRequireEarnestMoney = (requireId)=>fetchP("DDT_TC_REQUIRE_GETEARNESTMONEY",{requireId},true);

/**
 * @description 申请仲裁
 * @param {String} orderSn	订单编号
 * @param {String} arbitReason	仲裁原因
 * @param {String} arbitImg	仲裁图片
 */
let fetchRequireArbitration  = (orderSn,arbitReason,arbitImg)=>fetchP("DDT_TC_ORDER_ARBITRATION",{orderSn,arbitReason,arbitImg,submitToken:true});

/**
 * @description 获取订单可用红包
 * @param {String} orderMoney 订单金额
 */
let fetchRequireRedPay  = (orderMoney)=>fetchP("DDT_TC_MEMBER_RED_PAY",{orderMoney});



export {
    fetchRequireList,
    fetchRequireDetail,
    fetchRequireInviterList,
    fetchRequireToInvite,
    fetchRequireToPayInviter,
    fetchRequireDrawBack,
    fetchRequireDrawBackMoney,
    fetchRequireFeedback,
    fetchRequireLastPay,
    fetchRequireComplete,
    fetchRequireEarnestMoney,
    fetchRequireArbitration,
	fetchRequireRedPay
}
