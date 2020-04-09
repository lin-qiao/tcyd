//交易提示
const tradingTips = r => require.ensure([], () => r(require('../page/tradingTips')), 'tradingTips')
//精选活动
const activity = r => require.ensure([], () => r(require('../page/activity')), 'activity')
//物流消息
const logistics = r => require.ensure([], () => r(require('../page/logistics')), 'logistics')
//消息中心
const news = r => require.ensure([], () => r(require('../page/news')), 'news')
//佣金消息
const hireMsg = r => require.ensure([], () => r(require('../page/hireMsg')), 'hireMsg')
//系统公告
const inform = r => require.ensure([], () => r(require('../page/inform')), 'inform')
//平台通知
const platform = r => require.ensure([], () => r(require('../page/platform')), 'platform')
//即时通信
const instantMessage = r => require.ensure([], () => r(require('../page/instantMessage')), 'instantMessage')

export default [
	{//交易提示
		path:'tradingTips',
		component:tradingTips,
	},
	{//精选活动
		path:'activity',
		component:activity,
	},
	{//物流消息
		path:'logistics',
		component:logistics,
	},
	{//消息中心
		path:'news',
		component:news,
	},
	{//佣金消息
		path:'hireMsg',
		component:hireMsg
	},
	{//系统公告
		path:'inform',
		component:inform
	},
	{//平台通知
		path:'platform',
		component:platform
	},
	{//即时通信
		path:'instantMessage',
		component:instantMessage
	}
]
