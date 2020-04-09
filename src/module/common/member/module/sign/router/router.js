//早起打卡
const sign = r => require.ensure([], () => r(require('../page/sign')), 'sign')
//早起打卡-支付完成
const signSuccess = r => require.ensure([], () => r(require('../page/signSuccess')), 'signSuccess')
//我的战绩
const signRecord = r => require.ensure([], () => r(require('../page/signRecord')), 'signRecord')
//活动规则
const signRule = r => require.ensure([], () => r(require('../page/signRule')), 'signRule')
//支付
const signPay = r => require.ensure([], () => r(require('../page/signPay')), 'signPay')

export default [
    //早起打卡
    {
        path: 'sign',
        component:sign
    },
    //早起打卡-支付完成
    {
        path: 'signSuccess',
        component:signSuccess
    },
    //我的战绩
    {
        path: 'signRecord',
        component:signRecord
    },
    //活动规则
    {
        path: 'signRule',
        component:signRule
    },
    //支付
    {
        path: 'signPay',
        component:signPay
    }
]
