//钱包首页
const wallet = r => require.ensure([], () => r(require('../page/wallet')), 'wallet')
//钱包首页
const fundRecord = r => require.ensure([], () => r(require('../page/fundRecord')), 'fundRecord')
//红包使用规则
const userRule = r => require.ensure([], () => r(require('../module/packet/page/userRule')), 'userRule')

//充值路由
import rechargeRouter from '../module/recharge/router/router'
//我的可用充值路由
import myRouter from '../module/my/router/router'
//红包路由
import packetRouter from '../module/packet/router/router'
//银行卡路由
import bankRouter from '../module/bank/router/router'
//金币路由
import goldRouter from '../module/gold/router/router'
//提现路由
import withdrawRouter from '../module/withdraw/router/router'
//保证金路由
import depositRouter from '../module/deposit/router/router'

export default [
    //使用规则
	{
		path:'userRule',
		component:userRule,
		meta:{noLogin:true}
	},
	{
		path:'wallet',
		component:wallet,
		children: [ 
			{
				path:'fundRecord',
				component:fundRecord
			}
		].concat(rechargeRouter).concat(myRouter).concat(packetRouter).concat(bankRouter).concat(goldRouter).concat(withdrawRouter).concat(depositRouter)
	}
	
]
