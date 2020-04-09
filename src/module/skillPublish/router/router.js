//技能类目
const skillType = r => require.ensure([], () => r(require('../page/skillType')), 'skillType')

//编辑技能
const perfectMsg = r => require.ensure([], () => r(require('../page/perfectMsg')), 'perfectMsg')
//发布技能
const skillPublish = r => require.ensure([], () => r(require('../page/skillPublish')), 'skillPublish')
//编辑服务方式
const serviceType = r => require.ensure([], () => r(require('../page/serviceType')), 'serviceType')
//技能审核
const skillAudit = r => require.ensure([], () => r(require('../page/skillAudit')), 'skillAudit')
//范例
const example = r => require.ensure([], () => r(require('../page/example')), 'example')
//使用帮助
const useHelp = r => require.ensure([], () => r(require('../page/useHelp')), 'useHelp')
//技能图片
const skillImg = r => require.ensure([], () => r(require('../page/skillImg')), 'skillImg')

export default [
	{//技能类目
		path:'skillType',
		component:skillType,
	},
	{
		path:'perfectMsg',
		component:perfectMsg,
	},
	{
		path:'skillPublish',
		component:skillPublish,
		children:[
			{
				path:'skillImg',
				component:skillImg
			}
		]
	},
	{
		path:'serviceType',
		component:serviceType,
	},
	{
		path:'skillAudit',
		component:skillAudit,
	},
	{
		path:'example',
		component:example,
	},
	{
		path:'useHelp',
		component:useHelp,
	},
	{
		path:'skillImg',
		component:skillImg
	}
]
