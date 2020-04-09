import {getPlatform} from 'src/config/mUtils'
import {wechatSystem,wechatConfig} from 'src/config/env'
let state = {
    api_key:'HX_bJ55aT7cxD0-evigULpFPQDakE5rR',  //活体检测
    api_secret:'_ykOYrSvdeFxhOBJkW5NF5eazRiqLdd2',  //活体检测
    wechat_appid:wechatConfig.appid,  //微信appid
    openid:sessionStorage.openid||'',//微信授权后获取的openid
    subscribe:sessionStorage.subscribe||1,//是否关注了公众号 默认已，防止程序出错使用户陷入循环关注公众号操作中
    return_url:'http://wx.tc.dadetong.com',//活体检测回调地址域名
    notify_url:'https://www.datetong.com/api/notify_url',//活体检测回调接口
    bankCardId:"",//银行卡号
    telephone:"400-113-6999",//客服电话
    platform:getPlatform(),
    wechatSystem:wechatSystem,//是否是微信环境  true 是
    idcard:{
        name:'',
        idcard_number:'',
        issued_by:'',
        valid_date_start:'',
        valid_date_end:'',
        front_img:'',
        rear_img:'',
    },   //实名认证身份证信息
    isNeedPswd:'N',//交易时是否需要交易密码
    city:{},//城市信息
    onlineRemindPrice:0,//上线提醒金额
    imgVerifyFlag:2,//图形验证码开关
    locationStatus:false, //定位状态  （是否定位成功）
    rid:0, //支付选择红包的id
    redMoney:0, //支付选择红包的金额
}

export default state
