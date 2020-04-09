//设置
const set = r => require.ensure([], () => r(require('../page/set')), 'set')
//帮助中心
const help = r => require.ensure([], () => r(require('../page/help')), 'help')
//帮助详情
const helpDetail = r => require.ensure([], () => r(require('../page/helpDetail')), 'helpDetail')
//联系客服
const contact = r => require.ensure([], () => r(require('../page/contact')), 'contact')
//关于我们
const aboutUs = r => require.ensure([], () => r(require('../page/aboutUs')), 'aboutUs')
//意见反馈
const opinion = r => require.ensure([], () => r(require('../page/opinion')), 'opinion')
//公告列表
const noticeList = r => require.ensure([], () => r(require('../page/noticeList')), 'noticeList')
//公告详情
const noticeDetail = r => require.ensure([], () => r(require('../page/noticeDetail')), 'noticeDetail')

//在线客服
const service = r => require.ensure([], () => r(require('../page/service')), 'service')


export default [
	//设置
	{
		path:'set',
		component:set,
		name:'set'
	},
	//帮助中心
	{
		path:'help',
		component:help,
		name:'help',
		meta:{noLogin:true}
	},
	//帮助详情
	{
		path:'helpDetail',
		component:helpDetail,
		name:'helpDetail',
		meta:{noLogin:true}
	},
	//联系客服
	{
		path:'contact',
		component:contact,
		name:'contact',
		meta:{noLogin:true}
	},
	//关于我们
	{
		path:'aboutUs',
		component:aboutUs,
		name:'aboutUs',
		meta:{noLogin:true}
	},
	//意见反馈
	{
		path:'opinion',
		component:opinion,
		name:'opinion'
	},
	//公告列表
	{
		path:'noticeList',
		component:noticeList,
		name:'noticeList',
		meta:{noLogin:true}
	},
	//公告详情
	{
		path:'noticeDetail',
		component:noticeDetail,
		name:'noticeDetail',
		meta:{noLogin:true}
	},
	//在线客服
	{
		path:'service',
		component:service,
		name:'service',
		meta:{noLogin:true}
	}
]
