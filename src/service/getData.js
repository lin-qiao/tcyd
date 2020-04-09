import {fetchP,fetchN,fetchU} from '../config/fetch'

/*公共部分*/
/**
* @author songlingfang@ddtkj.com
* @since 2017-6-2
* @description 获取token
* @example
* await getToken();
*/
let getToken = () => fetchP('DDT_TC_COMMON_GENERIC_TOKEN',{}, true);
/**
* @author songlingfang@ddtkj.com
* @since 2018-09-12
* @description 查询用户发布过的技能列表
*/
let getSkillCount = () => fetchP('DDT_TC_SKILL_COUNT',{}, true);
/**
* @author songlingfang@ddtkj.com
* @since 2018-08-14
* @description 技能类目推荐列表接口
* @param {string} hotType 推荐位置//index首页  list技能类目页面 other 其他
*/
let fetchHotSkillList = (hotType='other') => fetchP('DDT_TC_SKILL_HOT_LIST',{hotType}, true);
/**
* @author songlingfang@ddtkj.com
* @since 2018-07-31
* @description 通用广告配置
* @param {string} code 通用图片配置编码   轮播图
* @param {string} terminal 客户端
*/
let fetchGeneralImage = (code,terminal="WX") => fetchP('DDT_TC_AD_GENERALIMAGE',{code,terminal}, true);


/**
* @author wangxinhui@ddtkj.com
* @since 2018-08-03
* @description 银行卡列表
* @param {string} code code编码  //银行卡:YHMC
*/
let fetchDictionapyList = (code) => fetchP('DDT_TC_COMMON_DICTIONARY_LIST',{code}, true);

/**
* @author songlingfang@ddtkj.com
* @since 2018-07-31
* @description 首页轮播头条
* @param {int} size 条数
* @param {string} typeCode 头条类型  //state_publish 动态发布  require_publish需求发布    require_invite需求应邀   skill_publish技能发布   skill_identify技能认证   get_up_early早起打卡  invite_friend邀请好友   recharge充值  vip_buy购买VIP
*/
let fetchIndexHeadline = (size,typeCode) => fetchP('DDT_TC_HEADLINE_INDEX',{size,typeCode}, true);

/**
* @author wangxinhui@ddtkj.com
* @since 2018-08-03
* @description 文件上传
* @param {string} formData
*/
let fetchUploadFile = (formData) => fetchU('/tc/file/uploadFile',formData);

/**
* @author songlingfang@ddtkj.com
* @since 2018-08-08
* @description 邀请通知接口
* @param {string} code  tcInvitationalSkill：邀请发技能  tcInvitationalPayDeposit：邀请支付保证金   tcInvitationalAuth：邀请认证
* @param {int} receiver  受邀人mid
*/
let fetchNoticeSendLatter = (code,receiver) => fetchP('DDT_TC_CMS_NOTICE_SENDLATTER',{code,receiver});

/**
* @author songlingfang@ddtkj.com
* @since 2018-08-08
* @description 检查是否有站内信  例如（已经已经被邀请）
* @param {string} code  tcInvitationalSkill：邀请发技能  tcInvitationalPayDeposit：邀请支付保证金   tcInvitationalAuth：邀请认证
* @param {int} receiver  受邀人mid
*/
let fetchNoticeCheckSendLatter = (code,receiver) => fetchP('DDT_TC_CMS_NOTICE_CHECK',{code,receiver}, true);


/**
* @author houlijun@ddtkj.com
* @since 2018-07-31
* @description 获取个人信息
*/
let fetchInformation = () => fetchP('DDT_TC_MEMBER_UN_GETBASEMEMBE',{}, true);
/**
* @author wangxinhui@ddtkj.com
* @since 2018-08-09
* @description 判断是否登录
*/
let fetchIslogin = () => fetchP('DDT_TC_MEMBER_UN_ISLOGIN',{}, true);

/**
* @author wangxinhui@ddtkj.com
* @since 2018-08-10
* @description 温馨提示  大德通同城用户协议 DDTTCYHXY
*/
let fetchTextDetail = (code) => fetchP('DDT_TC_CMS_GENERAL_RICH_TEXT_DETAIL',{code}, true);

/**
* @author songlingfang@ddtkj.com
* @since 2018-08-11
* @description 从缓存中加载返回系统参数配置接口
* @param {String} bizType 业务类别
* @param {String} key 系统参数编码  geetestFlag//极验
*/
let fetchProfileDetail = (key,bizType='tc') => fetchP('DDT_TC_COMMON_PROFILE_DETAIL',{bizType,key}, true);

/**
* @author shangliqun@ddtkj.com
* @since 2018-08-16
* @description 获取充值渠道
*/
let fetchEnableChannel = () => fetchP('DDT_TC_ACCOUNT_RECHARGE_ENABLECHANNEL',{}, true);


/**
* @author shangliqun@ddtkj.com
* @since 2018-08-3
* @description 充值按钮提交
* @param {int} payApi 充值方式 zfb("支付宝"), weixin("微信"), bank("银行卡支付")
* @param {int} orderAmount 每页条数
*/
let fetchRechargePay = (payApi,orderAmount,cbUrl=window.location.href) => fetchP('DDT_TC_ACCOUNT_RECHARGE_PAY',{payApi,orderAmount,cbUrl,submitToken:true});
/**
* @author gaoxiaopeng@ddtkj.com
* @since 2018-09-14
* @description 根据充值订单号查询充值状态
* @param {string} orderNo
*/
let fetchGetRechargeStatus = (orderNo) => fetchP('DDT_TC_ACCOUNT_RECHARGE_ONE',{orderNo}, true);




/**
* @author shangliqun@ddtkj.com
* @since 2018-07-31
* @description 个人主页用户信息
*/
let fetchAccountInformation = () => fetchP('DDT_TC_ACCOUNT_MEMBER_STATICACCOUNTMONEY',{}, true);

/**
* @author shangliqun@ddtkj.com
* @since 2018-08-2
* @param adCode
* @description 获取公告内容列表接口
*/
let fetchNoticeList = (code,type) => fetchP('DDT_TC_CMS_NOTICE_LIST',{code,type}, true);

/**
* @author shangliqun@ddtkj.com
* @since 2018-08-08
* @param position 账户主页页数（目前传1）
* @description 获取公告内容列表接口
*/
let fetchGeneralcomPosition = (position) => fetchP('DDT_TC_AD_GENERALCOMPOSITION',{position}, true);

/**
* @author songlingfang@ddtkj.com
* @since 2018-10-20
* @description 查询当前用户站长等级
*/
let fetchUserType = () => fetchP('DDT_TC_PARTNER_MEMBERINFO',{}, true);

/**
 * @author machao@ddtkj.com
 * @description 查询常见问题列表接口
 * @param {int} data
 */
let fetchProblemList = code => fetchP('DDT_TC_CMS_PROBLEM_LIST', { code }, true)

/**
 * @author wangyalin@ddtkj.com
 * @description 生成短链
 * @param {string} url
 */
let fetchGetCommonShotUrl = url => fetchP('DDT_TC_COMMON_SHOTURL', { url })

/**
 * @author wangxinhui@ddtkj.com
 * @description 类目服务方式列表接口
 * @param {string} id  二级类目id
 */
let fetchSkillServiceList = id => fetchP('DDT_TC_SKILL_CATEGORY_SERVICE_LIST', { id }, true)


/**
 * @author wangxinhui@ddtkj.com
 * @since 2018-08-13
 * @description 据编码查询多个数据字典列表
 */
let fetchDictionaryMultipleList = keys =>
  fetchP('DDT_TC_COMMON_DICTIONARY_MULTIPLE_LIST', { keys }, true)

/**
 * @author zhanghao@ddtkj.com
 * @description  顶部项目菜单
 * @param {String} code 微信WXPTLB
 */
let fetchProjectMenu = (code='WXPTLB') => fetchP('DDT_TC_COMMON_DICTIONARY_LIST',{code}, true)

/**
* @author songlingfang@ddtkj.com
* @since 2017-12-7
* @description 定位接口
* @example
* await getWXShareSign(url);
*/
let fetchLocation = (data) => fetchP('DDT_TC_MEMBER_SAVELOCATIONINFO', data);


/**
* @author wangxinhui@ddtkj.com
* @since 2017-12-7
* @description 平台通知
* @example
* await getWXShareSign(url);
*/
let fetchCmsMailList = (page,size,readFlag,bizType) => fetchP('DDT_TC_CMS_MAIL_LIST', {page,size,readFlag,bizType}, true);


/**
* @author wangxinhui@ddtkj.com
* @since 2018-10-15
* @description 获取分享内容
*/
let fetchRegisterForredEnvelopes = (type) => fetchP('DDT_TC_AD_REGISTERFORREDENVELOPES',{type}, true);

export{
	getToken,
	getSkillCount,
	fetchGeneralImage,
	fetchDictionapyList,
	fetchIndexHeadline,
	fetchUploadFile,
	fetchNoticeSendLatter,
	fetchNoticeCheckSendLatter,
	fetchInformation,
	fetchIslogin,
	fetchTextDetail,
	fetchProfileDetail,
	fetchHotSkillList,
	fetchEnableChannel,
	fetchRechargePay,
	fetchGetRechargeStatus,
	fetchAccountInformation,
	fetchNoticeList,
	fetchGeneralcomPosition,
	fetchUserType,
	fetchProblemList,
	fetchGetCommonShotUrl,
	fetchSkillServiceList,
	fetchDictionaryMultipleList,
	fetchProjectMenu,
	fetchLocation,
	fetchCmsMailList,
	fetchRegisterForredEnvelopes

}
