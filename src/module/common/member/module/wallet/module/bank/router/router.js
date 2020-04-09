//银行卡列表
const bankcard = r => require.ensure([], () => r(require('../page/bankcard')), 'bankcard')
//添加银行卡
const addBankcard = r => require.ensure([], () => r(require('../page/addBankcard')), 'addBankcard')
//银行列表
const bankList= r => require.ensure([], () => r(require('../page/bankList')), 'bankList')

export default [
	//个人资料
	{
		path:'bankcard',
		component:bankcard,
		name:'bankcard'
	},
	//添加银行卡
	{
		path:'addBankcard',
		component:addBankcard,
		name:'addBankcard'
	},
	//银行列表
	{
		path:'bankList',
		component:bankList,
		name:'bankList'
	}
]