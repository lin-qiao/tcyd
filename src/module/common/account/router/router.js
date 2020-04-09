//登录
const login = r => require.ensure([], () => r(require('../page/login')), 'login')
//中间转换页
const member = r => require.ensure([], () => r(require('../page/member')), 'member')
//绑定手机号
const bindPhone = r => require.ensure([], () => r(require('../page/bindPhone')), 'bindPhone')
//设置登录密码
const setPwd = r => require.ensure([], () => r(require('../page/setPwd')), 'setPwd')
//注册
const register = r => require.ensure([], () => r(require('../page/register')), 'register')
//忘记密码
const forget = r => require.ensure([], () => r(require('../page/forget')), 'forget')
//通过邮箱找回
const findByEmail = r => require.ensure([], () => r(require('../page/findByEmail')), 'findByEmail')
//通过密保问题找回
const findByQuestion = r => require.ensure([], () => r(require('../page/findByQuestion')), 'findByQuestion')
//完善资料
const completeInformation = r => require.ensure([], () => r(require('../page/completeInformation')), 'completeInformation')
//协议
const agreement = r => require.ensure([], () => r(require('../page/agreement')), 'agreement')

export default [
	//登录
	{
		path:'login',
		component:login,
		meta:{noLogin:true}
	},

	//中间转换页
	{
		path:'member',
		component:member,
		meta:{noLogin:true}
	},
	{
		path:'setPwd',
		component:setPwd,
		meta:{noLogin:true}
	},
	//绑定手机号
	{
		path:'bindPhone',
		component:bindPhone,
		meta:{noLogin:true}
	},
	//注册
	{
		path:'register',
		component:register,
		meta:{noLogin:true}
	},
	//忘记密码
	{
		path:'forget',
		component:forget,
		meta:{noLogin:true}
	},
	//通过邮箱找回
	{
		path:'findByEmail',
		component:findByEmail,
		meta:{noLogin:true}
	},
	//通过密保问题找回
	{
		path:'findByQuestion',
		component:findByQuestion,
		meta:{noLogin:true}
	},
	//完善资料
	{
		path:'completeInformation',
		component:completeInformation
	},
	//用户协议
	{
		path:'agreement',
		component:agreement,
		meta:{noLogin:true}
	}
]
