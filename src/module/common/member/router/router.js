//任务中心
const task = r => require.ensure([], () => r(require('../page/task')), 'task')

//钱包路由
import walletRouter from '../module/wallet/router/router'
//设置路由
import setRouter from '../module/set/router/router'
//安全中心路由
import saveRouter from '../module/save/router/router'

//个人资料路由
import informationRouter from '../module/information/router/router'

//早起打卡
import signRouter from '../module/sign/router/router'

//开通vip
import vipRouter from '../module/vip/router/router'


export default [
	{
		path: '',
		redirect: '/index'
	},
	{//任务中心
		path:'task',
		component:task,
	}
].concat(walletRouter).concat(setRouter).concat(saveRouter).concat(informationRouter).concat(signRouter).concat(vipRouter)
