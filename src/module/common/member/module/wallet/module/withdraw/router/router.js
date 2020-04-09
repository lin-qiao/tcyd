//充值提现记录
const withdrawRecord = r => require.ensure([], () => r(require('../page/withdrawRecord')), 'withdrawRecord')
//提现
const withdraw = r => require.ensure([], () => r(require('../page/withdraw')), 'withdraw')

export default [
	//充值提现记录
	{
		path:'withdrawRecord',
		component:withdrawRecord
	},
	//提现
	{
		path:'withdraw',
		component:withdraw
	}
]
