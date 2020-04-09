//购买推荐位
const recommendShop = r => require.ensure([], () => r(require('../page/recommendShop')), 'recommendShop')
//选择城市
const city = r => require.ensure([], () => r(require('../page/city')), 'city')
//支付
const recommendPay = r => require.ensure([], () => r(require('../page/recommendPay')), 'recommendPay')
//推荐位列表
const recommendList = r => require.ensure([], () => r(require('../page/recommendList')), 'recommendList')
//推荐位详情
const recommendDetail = r => require.ensure([], () => r(require('../page/recommendDetail')), 'recommendDetail')


export default [
    //购买推荐位
    {
        path: '/recommendShop',
        component:recommendShop,
        name: 'recommendShop'
    },
    //选择城市
    {
        path: '/city',
        component:city
    },
    //支付
    {
        path: '/recommendPay',
        component:recommendPay
    },
    //推荐位列表
    {
        path:'/recommendList',
        component:recommendList
    },
    //推荐位详情
    {
        path:'/recommendDetail',
        component:recommendDetail
    }
]
