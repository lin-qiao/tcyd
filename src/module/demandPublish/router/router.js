//发布需求
const demandPublish = r => require.ensure([], () => r(require('../page/demandPublish')), 'demandPublish')
//全部分类
const demandType = r => require.ensure([], () => r(require('../page/demandType')), 'demandType')
//定制首页
const custom = r => require.ensure([], () => r(require('../page/custom')), 'custom')
//需求处理成功页面
const demandSuccess = r => require.ensure([], () => r(require('../page/demandSuccess')), 'demandSuccess')


export default [
	{//发布需求
		path:'demandPublish',
		component:demandPublish,
	},
	{//全部分类
		path:'demandType',
		component:demandType,
	},
	{//定制首页
		path:'custom',
		component:custom,
	},
	{//定制首页
		path:'demandSuccess',
		component:demandSuccess,
	}
]
