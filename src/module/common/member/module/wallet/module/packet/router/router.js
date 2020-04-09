/*红包*/
//我的红包
const redpacketList = r => require.ensure([], () => r(require('../page/redpacketList')), 'redpacketList')
//使用规则
const userRule = r => require.ensure([], () => r(require('../page/userRule')), 'userRule')
//领取红包大厅
const redpacketHome = r => require.ensure([], () => r(require('../page/redpacketHome')), 'redpacketHome')
//红包领取
const getRedPacket = r => require.ensure([], () => r(require('../page/getRedPacket')), 'getRedPacket')


/*领劵中心*/
//我的现金券
const cashList = r => require.ensure([], () => r(require('../page/cashList')), 'cashList')
//领取现金大厅
const cashHome = r => require.ensure([], () => r(require('../page/cashHome')), 'cashHome')


export default [
	//使用规则
	{
		path:'userRule',
		component:userRule,
		meta:{noLogin:true}
	},
	//我的红包
	{
		path:'redpacketList',
		component:redpacketList,
		children:[
			{
				path:'userRule',
				component:userRule,
				meta:{noLogin:true}
			}
		]
	},
	//领取红包大厅
	{
		path:'redpacketHome',
		component:redpacketHome
	},
	//领取红包
	{
		path:'getRedPacket',
		component:getRedPacket
	},
	//我的现金券
	{
		path:'cashList',
		component:cashList
	},
	//领取现金大厅
	{
		path:'cashHome',
		component:cashHome
	},
	//现金券领取
	{
		path:'getCash',
		component:getRedPacket
	}
]
