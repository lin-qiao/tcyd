//手机卡充值
const callRecharge = r => require.ensure([], () => r(require('../page/callRecharge')), 'callRecharge')
//手机卡消费明细
const callRecord = r => require.ensure([], () => r(require('../page/callRecord')), 'callRecord')
//手机卡消费详情
const callRecordDetail = r => require.ensure([], () => r(require('../page/callRecordDetail')), 'callRecordDetail')
//手机卡充值规则
const callRule = r => require.ensure([], () => r(require('../page/callRule')), 'callRule')
//手机卡订单支付
const callOrder = r => require.ensure([], () => r(require('../page/callOrder')), 'callOrder')

export default [
	//手机卡充值
	{
		path:'callRecharge',
		component:callRecharge,
		name:'callRecharge'
    },
    //手机卡消费明细
	{
		path:'callRecord',
		component:callRecord,
		name:'callRecord'
    },
    //手机卡消费详情
	{
		path:'callRecordDetail',
		component:callRecordDetail,
		name:'callRecordDetail'
    },
    //手机卡充值规则
	{
		path:'callRule',
		component:callRule,
		name:'callRule'
    },
    //手机卡订单支付
	{
		path:'callOrder',
		component:callOrder,
		name:'callOrder'
    }
]