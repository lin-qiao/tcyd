//我的金币
const myGold = r => require.ensure([], () => r(require('../page/myGold')), 'myGold')
//金币明细
const goldRecord = r => require.ensure([], () => r(require('../page/goldRecord')), 'goldRecord')
//金币兑换
const goldExchange = r => require.ensure([], () => r(require('../page/goldExchange')), 'goldExchange')

export default [
	//我的金币
	{
		path:'myGold',
		component:myGold,
		name:'myGold'
	},
	//金币明细
	{
		path:'goldRecord',
		component:goldRecord,
		name:'goldRecord'
	},
	//金币兑换
	{
		path:'goldExchange',
		component:goldExchange,
		name:'goldExchange'
	},
]