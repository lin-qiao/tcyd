//我的可用充值
const myRecharge = r => require.ensure([], () => r(require('../page/myRecharge')), 'myRecharge')
//我的可用收入
const myEarning = r => require.ensure([], () => r(require('../page/myEarning')), 'myEarning')
//我的佣金
const myHire = r => require.ensure([], () => r(require('../page/myHire')), 'myHire')
//我的钻石
const myJewel = r => require.ensure([], () => r(require('../page/myJewel')), 'myJewel')
//钻石明细
const jewelRecord = r => require.ensure([], () => r(require('../page/jewelRecord')), 'jewelRecord')
//我的消费金
const myConsume = r => require.ensure([], () => r(require('../page/myConsume')), 'myConsume')

export default [
	//我的可用充值
	{
		path:'myRecharge',
		component:myRecharge
	},
	//我的可用收入
	{
		path:'myEarning',
		component:myEarning
	},
	//我的佣金
	{
		path:'myHire',
		component:myHire
	},
	//我的佣金
	{
		path:'myJewel',
		component:myJewel
	},
	//钻石明细
	{
		path:"jewelRecord",
		component:jewelRecord
	},
	//我的消费金
	{
		path:"myConsume",
		component:myConsume
	}
]
