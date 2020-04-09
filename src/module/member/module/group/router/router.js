//分享专题
const groupShare = r => require.ensure([], () => r(require('../page/groupShare')), 'groupShare')
//商品详情
const groupDetail = r => require.ensure([], () => r(require('../page/groupDetail')), 'groupDetail')
//商品详情-用户评价
const groupEvaluate = r => require.ensure([], () => r(require('../page/groupEvaluate')), 'groupEvaluate')
//开团免费拿首页
const groupIndex = r => require.ensure([], () => r(require('../page/groupIndex')), 'groupIndex')


export default [
    //分享专题
    {
        path: 'groupShare',
        component:groupShare
    },
    //商品详情
    {
        path: 'groupDetail',
        component:groupDetail
    },
    //商品详情-用户评价
    {
        path: 'groupEvaluate',
        component:groupEvaluate
    },
    //首页
    {
        path: 'groupIndex',
        component:groupIndex
    }
]
