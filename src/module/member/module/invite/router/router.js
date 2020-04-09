//邀请好友
const invite = r => require.ensure([], () => r(require('../page/invite')), 'invite')
// 推荐服务商，推荐消费者
const inviteRecommend = r => require.ensure([], () => r(require('../page/inviteRecommend')), 'inviteRecommend')
//邀请好友-订单
const inviteOrder = r => require.ensure([], () => r(require('../page/inviteOrder')), 'inviteOrder')
//邀请好友-服务
const inviteService = r => require.ensure([], () => r(require('../page/inviteService')), 'inviteService')
//邀请好友-app
const appInvite = r => require.ensure([], () => r(require('../page/appInvite')), 'appInvite')

export default [
	//邀请好友
	{
		path:'invite',
		component:invite,
		name:'invite',
		meta:{noLogin:true}
	},
	{
		path:'inviteRecommend',
		component:inviteRecommend,
		name:'inviteRecommend'
	},
	{
		path:'inviteOrder',
		component:inviteOrder,
		name:'inviteOrder',
		meta:{noLogin:true}
	},
	{
		path:'inviteService',
		component:inviteService,
		name:'inviteService',
		meta:{noLogin:true}
	},
	{
		path:'appInvite',
		component:appInvite,
		name:'appInvite',
		meta:{noLogin:true}
	}
]
