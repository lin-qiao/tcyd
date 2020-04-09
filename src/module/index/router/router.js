//首页
const index = r => require.ensure([], () => r(require('../page/index')), 'index')
//搜索
const search = r => require.ensure([], () => r(require('../page/search')), 'search')
//头条
const topLine = r => require.ensure([], () => r(require('../page/topLine')), 'topLine')
//身边动态
const notice = r => require.ensure([], () => r(require('../page/notice')), 'notice')
//约Ta
const aboutTa = r => require.ensure([], () => r(require('../page/aboutTa')), 'aboutTa')
//一键体验--技能赚钱
const experienceSkill = r => require.ensure([], () => r(require('../page/experienceSkill')), 'experienceSkill')
//一键体验--找人服务
const experienceService = r => require.ensure([], () => r(require('../page/experienceService')), 'experienceService')
//上线提醒详情
const remindDetail = r => require.ensure([], () => r(require('../page/remindDetail')), 'remindDetail')
//全部分类
const allType = r => require.ensure([], () => r(require('../page/allType')), 'allType')

export default [
	//首页
	{
		path:'index',
		component:index
	},
	//上线提醒详情
	{
		path:'remindDetail',
		component:remindDetail,
		meta:{noLogin:true}
	},
	//约Ta
	{
		path:'aboutTa',
		component:aboutTa
	},
	//搜索
	{
		path:'search',
		component:search
	},
	//头条
	{
		path:'topLine',
		component:topLine,
		meta:{noLogin:true}
	},
	//身边动态
	{
		path:'notice',
		component:notice
	},
	//一键体验--技能赚钱
	{
		path:'experienceSkill',
		component:experienceSkill
	},
	//一键体验--找人服务
	{
		path:'experienceService',
		component:experienceService
	},
	//全部分类
	{
		path:'allType',
		component:allType
	}
]
