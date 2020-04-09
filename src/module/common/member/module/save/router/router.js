//安全中心
const save = r => require.ensure([], () => r(require('../page/save')), 'save')
//认证中心
const approve = r => require.ensure([], () => r(require('../page/approve/approve')), 'approve')
//认证中心
const companyApprove = r => require.ensure([], () => r(require('../page/approve/companyApprove')), 'companyApprove')
//认证结果
const companyResult = r => require.ensure([], () => r(require('../page/approve/companyResult')), 'companyResult')
//个人认证
const personApprove = r => require.ensure([], () => r(require('../page/approve/personApprove')), 'personApprove')
//认证结果
const personResult = r => require.ensure([], () => r(require('../page/approve/personResult')), 'personResult')
//人脸识别
const faceApprove = r => require.ensure([], () => r(require('../page/approve/faceApprove')), 'faceApprove')
//人脸识别认证结果
const faceResult = r => require.ensure([], () => r(require('../page/approve/faceResult')), 'faceResult')
//身份认证失败说明
const authenticationFail = r => require.ensure([], () => r(require('../page/approve/authenticationFail')), 'authenticationFail')
//身份信息（上传后）
const authentication = r => require.ensure([], () => r(require('../page/approve/authentication')), 'authentication')
//大学生认证
const studentApprove = r => require.ensure([], () => r(require('../page/approve/studentApprove')), 'studentApprove')
//大学生认证结果
const studentResult = r => require.ensure([], () => r(require('../page/approve/studentResult')), 'studentResult')
//技能认证
const skillApprove = r => require.ensure([], () => r(require('../page/skill/skillApprove')), 'skillApprove')
//添加技能认证
const addSkillApprove = r => require.ensure([], () => r(require('../page/skill/addSkillApprove')), 'addSkillApprove')
//修改手机号
const changePhone = r => require.ensure([], () => r(require('../page/phone/changePhone')), 'changePhone')
//修改登录密码
const changePwd = r => require.ensure([], () => r(require('../page/loginPwd/changePwd')), 'changePwd')
//设置登录密码
const setLoginPwd = r => require.ensure([], () => r(require('../page/loginPwd/setLoginPwd')), 'setLoginPwd')
//设置支付密码
const setPayPwd = r => require.ensure([], () => r(require('../page/payPwd/setPayPwd')), 'setPayPwd')
//修改支付密码
const changePayPwd = r => require.ensure([], () => r(require('../page/payPwd/changePayPwd')), 'changePayPwd')
//找回支付密码
const findPayPwd = r => require.ensure([], () => r(require('../page/payPwd/findPayPwd')), 'findPayPwd')

export default [
	//安全中心
	{
		path:'save',
		component:save,
		name:'save',
	},
	//认证中心
	{
		path:'approve',
		component:approve,
		name:'approve',
	},
	//认证中心
	{
		path:'companyApprove',
		component:companyApprove,
		name:'companyApprove',
	},
	//普通认证结果
	{
		path:'companyResult',
		component:companyResult,
		name:'companyResult',
	},
	{
		path:'personResult',
		component:personResult,
		name:'personResult',
	},
	//普通认证结果
	{
		path:'personApprove',
		component:personApprove,
		name:'personApprove',
	},
	{
		path:'faceApprove',
		component:faceApprove,
		name:'faceApprove',
	},
	{
		path:'faceResult',
		component:faceResult,
		name:'faceResult',
	},
	{
		path:'authenticationFail',
		component:authenticationFail,
		name:'authenticationFail',
		meta:{noLogin:true}
	},
	{
		path:'authentication',
		component:authentication,
		name:'authentication',
	},
	{
		path:'studentApprove',
		component:studentApprove,
		name:'studentApprove',
	},
	{
		path:'studentResult',
		component:studentResult,
		name:'studentResult',
	},
	{
		path:'skillApprove',
		component:skillApprove,
		name:'skillApprove',
	},
	{
		path:'addSkillApprove',
		component:addSkillApprove,
		name:'addSkillApprove',
	},
	{
		path:'changePhone',
		component:changePhone,
		name:'changePhone',
	},
	{
		path:'changePwd',
		component:changePwd,
		name:'changePwd',
	},
	{
		path:'setLoginPwd',
		component:setLoginPwd,
		name:'setLoginPwd',
	},
	{
		path:'setPayPwd',
		component:setPayPwd,
		name:'setPayPwd',
	},
	{
		path:'changePayPwd',
		component:changePayPwd,
		name:'changePayPwd',
	},
	{
		path:'findPayPwd',
		component:findPayPwd,
		name:'findPayPwd',
	},
]
