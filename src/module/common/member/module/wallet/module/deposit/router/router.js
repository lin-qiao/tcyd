//我的保证金
const myDeposit = r => require.ensure([], () => r(require('../page/myDeposit')), 'myDeposit')
//保证金退出明细
const depositRecord = r => require.ensure([], () => r(require('../page/depositRecord')), 'depositRecord')
//当前保证金
const nowDeposit = r => require.ensure([], () => r(require('../page/nowDeposit')), 'nowDeposit')
//退出保证金
const refundDeposit = r => require.ensure([], () => r(require('../page/refundDeposit')), 'refundDeposit')

export default [
	//我的保证金
	{
		path:'myDeposit',
		component:myDeposit
	},
	//保证金退出明细
	{
		path:'depositRecord',
		component:depositRecord
	},
	//当前保证金
	{
		path:'nowDeposit',
		component:nowDeposit
	},
	//退出保证金
	{
		path:'refundDeposit',
		component:refundDeposit
	}
]
