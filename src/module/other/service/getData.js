import {fetchP} from 'src/config/fetch'
/**
* @author zhanghao@ddtkj.com
* @since 2018-07-31
* @description 上线提醒
* @param {String} noticeId 订阅人id
*/
var fetchOnlineNotice = (noticeId) => fetchP('DDT_TC_ZONE_ONLINENOTICE',{noticeId});
/**
* @author zhanghao@ddtkj.com
* @since 2018-07-31
* @description 拉黑
* @param {String} blackMid 被拉黑用户id
*/
var setBlack = (blackMid) => fetchP('DDT_TC_ZONE_SETBLACK',{blackMid});
/**
* @author zhanghao@ddtkj.com
* @since 2018-07-31
* @description 取消拉黑
* @param {String} blackMid 被拉黑用户id
*/
var deleteBlack = (blackMid) => fetchP('DDT_TC_ZONE_DELETEBLACK',{blackMid});
/**
* @author zhanghao@ddtkj.com
* @since 2018-07-31
* @description 获取个人主页用户信息
* @param {String} mid 用户id
*/
var memberInfo = (mid) => fetchP('DDT_TC_ZONE_MEMBERINFO',{mid},true);
/**
* @author zhanghao@ddtkj.com
* @since 2018-07-31
* @description 访问个人空间
* @param {String} serverMid 服务商mid
*/
var visitMemberHome = (serverMid) => fetchP('DDT_TC_ZONE_VISITMEMBERHOME',{serverMid});
/**
* @author zhanghao@ddtkj.com
* @since 2018-07-31
* @description 获取个人动态前三张
* @param {String} mid 用户id
*/
var memberDynamic = (mid) => fetchP('DDT_TC_ZONE_DYNAMICTOP3',{mid},true);
/**
* @author zhanghao@ddtkj.com
* @since 2018-07-31
* @description 获取个人动态列表
* @param {String} mid 用户id
* @param {String} page 当前页
* @param {String} size 每页大小
*/
var fetchDynamicList = (data) => fetchP('DDT_TC_DYNAMICS_LIST',data,true);
/**
* @author zhanghao@ddtkj.com
* @since 2018-07-31
* @description 最近访客列表
* @param {String} serverMid 服务商id
*/
var visitMemberList = (serverMid) => fetchP('DDT_TC_ZONE_VISITMEMBERLIST',{serverMid},true);
/**
* @author zhanghao@ddtkj.com
* @since 2018-07-31
* @description 评价列表
* @param {String} mid 服务商id
* @param {String} skillId 技能id
*/
var evaluationList = (mid,skillId) => fetchP('DDT_TC_ZONE_EVALUATIONLIST',{mid,skillId},true);
/**
* @author zhanghao@ddtkj.com
* @since 2018-07-31
* @description 个人主页技能列表
* @param {String} id 用户id
*/
var fetchSkillList = (id) => fetchP('DDT_TC_SKILL_PERSONALHOME_LIST',{id},true);
/**
* @author zhanghao@ddtkj.com
* @since 2018-07-31
* @description 积分规则列表展示
*/
var integralRule = () => fetchP('DDT_TC_MEMBER_INTEGRAL_RULE',{},true);
/**
* @author zhanghao@ddtkj.com
* @since 2018-07-31
* @description 等级规则列表展示
*/
var integralLevel = () => fetchP('DDT_TC_MEMBER_INTEGRAL_LEVEL',{},true);
/**
* @author zhanghao@ddtkj.com
* @since 2018-07-31
* @description 用户等级积分构成
* @param {Int} mid 用户id
*/
var integralInfo = (mid) => fetchP('DDT_TC_MEMBER_INTEGRAL_INFO',{mid},true);
/**
* @author zhanghao@ddtkj.com
* @since 2018-08-02
* @description 关注
* @param {String} attentionMid 被关注用户id 多个用,隔开
*/
var setAttention = (attentionMid) => fetchP('DDT_TC_MEMBER_SETATTENTION',{attentionMid});

/**
* @author zhanghao@ddtkj.com
* @since 2018-08-02
* @description 取消关注
* @param {String} attentionMids 被取消关注用户id 多个用,隔开
*/
var deleteAttention = (attentionMids) => fetchP('DDT_TC_MEMBER_DELETEATTENTION',{attentionMids});


export {
    fetchOnlineNotice,
    setBlack,
    deleteBlack,
    memberInfo,
    visitMemberHome,
    memberDynamic,
    fetchDynamicList,
    visitMemberList,
    evaluationList,
    fetchSkillList,
    integralRule,
    integralLevel,
    integralInfo,
    setAttention,
    deleteAttention
}
