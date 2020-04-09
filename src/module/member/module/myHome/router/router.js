//我的主页
const myHome = r => require.ensure([], () => r(require('../page/myHome')), 'myHome')
//个人动态列表
const dynamicList = r => require.ensure([], () => r(require('../page/dynamicList')), 'dynamicList')
//金币等级
const goldGrade = r => require.ensure([], () => r(require('../page/goldGrade')), 'goldGrade')
//发布动态
const dynamic = r => require.ensure([], () => r(require('../page/dynamic')), 'dynamic')


export default [
	//我的主页
	{
		path:'/myHome',
		component:myHome,
		name:'myHome'
	},
	//个人动态列表
	{
		path:'/dynamicList',
		component:dynamicList,
		name:'dynamicList'
	},
	//金币等级
	{
		path:'/goldGrade',
		component:goldGrade,
		name:'goldGrade'
	},
	//发布动态
	{
		path:'/dynamic',
		component:dynamic,
		name:'dynamic'
	}
]
