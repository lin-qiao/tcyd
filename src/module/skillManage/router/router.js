//技能管理
const skillManage = r => require.ensure([], () => r(require('../page/skillManage')), 'skillManage')
//订单详情
const orderDetail = r => require.ensure([], () => r(require('../page/orderDetail')), 'orderDetail')
//我的技能
const mySkill = r => require.ensure([], () => r(require('../page/mySkill')), 'mySkill')
//技能详情
const skillDetail = r => require.ensure([], () => r(require('../page/skillDetail')), 'skillDetail')
//编辑视频介绍
const videoIntroduce = r => require.ensure([], () => r(require('../page/videoIntroduce')), 'videoIntroduce')
//荣誉资质
const honor = r => require.ensure([], () => r(require('../page/honor')), 'honor')
//专业问答
const ask = r => require.ensure([], () => r(require('../page/ask')), 'ask')
//工作、教育经历
const work = r => require.ensure([], () => r(require('../page/work')), 'work')

export default [
	//技能管理
	{
		path:'skillManage',
		component:skillManage,
	},
	//订单详情
	{
		path:'orderDetail',
		component:orderDetail,
	},
	//我的技能
	{
		path:'mySkill',
		component:mySkill,
	},
	//技能详情
	{
		path:'skillDetail',
		component:skillDetail,
	},
	//编辑视频介绍
	{
		path:'videoIntroduce',
		component:videoIntroduce,
	},
	//荣誉资质
	{
		path:'honor',
		component:honor,
	},
	//专业问答
	{
		path:'ask',
		component:ask,
	},
	//工作经历
	{
		path:'work',
		component:work,
	},
	//工作经历
	{
		path:'education',
		component:work,
	}
]
