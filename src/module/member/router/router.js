
//个人中心首页
const account = r => require.ensure([], () => r(require('../page/account')), 'account')
//我的关注
const myAttention = r => require.ensure([], () => r(require('../page/myAttention')), 'myAttention')
//申请服务达人
const applyEredar = r => require.ensure([], () => r(require('../page/applyEredar')), 'applyEredar')
//控制中心
const control = r => require.ensure([], () => r(require('../page/control')), 'control')


//我的主页路由
import myHomeRouter from '../module/myHome/router/router'

//购买推荐位
import recommendRouter from '../module/recommend/router/router'

//邀请好友
import inviteRouter from '../module/invite/router/router'

//手机卡
import callRouter from '../module/call/router/router'


//开团免费拿
import groupRouter from '../module/group/router/router'

export default [
	{
		path: '',
		redirect: '/index'
	},
	{//个人中心首页
		path:'account',
		component:account,
	},
	{//我的关注
		path:'myAttention',
		component:myAttention,
	},
	{//申请服务达人
		path:'applyEredar',
		component:applyEredar,
	},
	{//控制中心
		path:'control',
		component:control,
	}
].concat(myHomeRouter).concat(recommendRouter).concat(inviteRouter).concat(callRouter).concat(groupRouter)
