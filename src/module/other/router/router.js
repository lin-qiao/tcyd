//他人主页
const otherHome = r => require.ensure([], () => r(require('../page/otherHome')), 'otherHome')
//个人动态列表
const otherDynamicList = r => require.ensure([], () => r(require('../page/otherDynamicList')), 'otherDynamicList')

export default [
	{//他人主页
		path:'/otherHome',
		component:otherHome,
	},
	{//个人动态列表
		path:'/otherDynamicList',
		component:otherDynamicList
	}
]
