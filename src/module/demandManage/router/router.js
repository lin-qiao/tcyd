//需求管理
const demandManage = r => require.ensure([], () => r(require('../page/demandManage')), 'demandManage')
//需求详情
const demandDetail = r => require.ensure([], () => r(require('../page/demandDetail')), 'demandDetail')
//支付方式
const payType = r => require.ensure([], () => r(require('../page/payType')), 'payType')
//支付
const pay = r => require.ensure([], () => r(require('../page/pay')), 'pay')
//视频资讯
const advisory = r => require.ensure([], () => r(require('../page/advisory')), 'advisory')
//申请退款
const refund = r => require.ensure([], () => r(require('../page/refund')), 'refund')
//发表评价
const evaluate = r => require.ensure([], () => r(require('../page/evaluate')), 'evaluate')
//申请仲裁
const arbitration = r => require.ensure([], () => r(require('../page/arbitration')), 'arbitration')
//我的红包
const redPacket = r => require.ensure([], () => r(require('../page/redPacket')), 'redPacket')


export default [
	{//需求管理
		path:'demandManage',
		component:demandManage,
	},
	{//需求详情
		path:'demandDetail',
		component:demandDetail,
	},
	{//支付方式
		path:'payType',
		component:payType,
	},
	{//支付
		path:'pay',
		component:pay,
	},
	{//视频资讯
		path:'advisory',
		component:advisory,
	},
	{//申请退款
		path:'refund',
		component:refund,
	},
	{//发表评价
		path:'evaluate',
		component:evaluate,
	},
	{//申请仲裁
		path:'arbitration',
		component:arbitration,
	},
	{//我的红包
		path:'redPacket',
		component:redPacket,
	}

]
