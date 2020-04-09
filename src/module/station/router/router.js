//站长首页
const stationIndex = r => require.ensure([], () => r(require('../page/stationIndex')), 'stationIndex')
//站长详情
const stationDetail = r => require.ensure([], () => r(require('../page/stationDetail')), 'stationDetail')
//邀请站长列表
const stationInviteList = r => require.ensure([], () => r(require('../page/stationInviteList')), 'stationInviteList')
//邀请站长列表--包括直邀-二级等等
const stationInviteTwice = r => require.ensure([], () => r(require('../page/stationInviteTwice')), 'stationInviteTwice')
//邀请站长列表--包括直邀-二级等等
const stationTwice = r => require.ensure([], () => r(require('../page/stationTwice')), 'stationTwice')
//站长邀请专题
const stationInvite = r => require.ensure([], () => r(require('../page/stationInvite')), 'stationInvite')
//站长支付
const stationPay = r => require.ensure([], () => r(require('../page/stationPay')), 'stationPay')
//规则
const stationInviteRule = r => require.ensure([], () => r(require('../page/stationInviteRule')), 'stationInviteRule')
//站长消费明细
const stationConsumeList = r => require.ensure([], () => r(require('../page/stationConsumeList')), 'stationConsumeList')
//站长支付成功页
const stationPaySuccess = r => require.ensure([], () => r(require('../page/stationPaySuccess')), 'stationPaySuccess')

//晋商贷订单确认页
const jsdOrderConfirm = r => require.ensure([], () => r(require('../page/jsdOrderConfirm')), 'jsdOrderConfirm')
//晋商贷支付成功页
const jsdPaySuccess = r => require.ensure([], () => r(require('../page/jsdPaySuccess')), 'jsdPaySuccess')
//晋商贷首页
const jsdIndex = r => require.ensure([], () => r(require('../page/jsdIndex')), 'jsdIndex')
//晋商贷专题页下载
const jsdSpecial = r => require.ensure([], () => r(require('../page/jsdSpecial')), 'jsdSpecial')
//晋商贷专题页关注公众号
const jsdAttention = r => require.ensure([], () => r(require('../page/jsdAttention')), 'jsdAttention')
export default [
	//站长首页
	{
		path:'stationIndex',
		component:stationIndex,
		name:'stationIndex'
	},
	//站长详情
	{
		path:'stationDetail',
		component:stationDetail,
		name:'stationDetail'
	},
	//邀请站长列表
	{
		path:'stationInviteList',
		component:stationInviteList
	},
	//邀请列表--包括直邀-二级等等
	{
		path:'stationInviteTwice',
		component:stationInviteTwice
	},
	//邀请站长列表--包括直邀-二级等等
	{
		path:'stationTwice',
		component:stationTwice
	},
	//分享页面
	{
		path:'stationInvite',
		component:stationInvite,
		meta:{noLogin:true}
	},
	//站长支付
	{
		path:'stationPay',
		component:stationPay
	},
	//邀请站长规则
	{
		path:'stationInviteRule',
		component:stationInviteRule
	},
	//站长消费明细
	{
		path:'stationConsumeList',
		component:stationConsumeList
	},
	//站长支付成功页
	{
		path:'stationPaySuccess',
		component:stationPaySuccess
	},
	//晋商贷确认订单页
	{
		path:'jsdOrderConfirm',
		component:jsdOrderConfirm
	},
	//晋商贷支付成功页
	{
		path:'jsdPaySuccess',
		component:jsdPaySuccess
	},
	//晋商贷首页
	{
		path: 'jsdIndex',
		component: jsdIndex,
		meta:{noLogin:true}
	},
	//晋商贷专题页
	{
		path: 'jsdSpecial',
		component: jsdSpecial,
		meta:{noLogin:true}
	},
	//晋商贷专题页关注
	{
		path: 'jsdAttention',
		component: jsdAttention,
		meta:{noLogin:true}
	}
]