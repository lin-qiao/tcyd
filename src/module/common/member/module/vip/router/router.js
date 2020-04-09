//付费vip
const vipPay = r => require.ensure([], () => r(require('../page/vipPay')), 'vipPay')
//商品详情
const vipGoodDetail = r => require.ensure([], () => r(require('../page/vipGoodDetail')), 'vipGoodDetail')
//免费开通vip
const vipFree = r => require.ensure([], () => r(require('../page/vipFree')), 'vipFree')
//免费开通分享页面
const vipShare = r => require.ensure([], () => r(require('../page/vipShare')), 'vipShare')

export default [
	//付费vip
	{
		path:'vipPay',
		component:vipPay,
		name:'vipPay',
	},
	//商品详情
	{
		path:'vipGoodDetail',
		component:vipGoodDetail,
		name:'vipGoodDetail',
	},
	//免费开通vip
	{
		path:'vipFree',
		component:vipFree,
		name:'vipFree',
	},
	//免费开通分享页面
	{
		path:'vipShare',
		component:vipShare,
		name:'vipShare',
	}
]

