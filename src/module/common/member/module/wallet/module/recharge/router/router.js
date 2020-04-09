//充值
const recharge = r => require.ensure([], () => r(require('../page/recharge')), 'recharge')
//充值记录
const rechargeRecord = r => require.ensure([], () => r(require('../page/rechargeRecord')), 'rechargeRecord')
//钻石充值记录
const JrechargeRecord = r => require.ensure([], () => r(require('../page/JrechargeRecord')), 'JrechargeRecord')
export default [
	//充值
	{
		path:'recharge',
		component:recharge
	},
	//充值记录
	{
		path:'rechargeRecord',
		component:rechargeRecord
	},
	//钻石充值记录
	{
		path:'JrechargeRecord',
		component:JrechargeRecord
	}
]
