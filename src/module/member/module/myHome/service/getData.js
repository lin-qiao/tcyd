import {fetchP} from 'src/config/fetch'
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
* @description 发布动态
* @param {String} title 标题
* @param {String} filePath 文件路径
* @param {String} fileType 内容类别
* @param {String} skillId 技能id
*/
var dynamicAdd = (data) => fetchP('DDT_TC_DYNAMICS_ADD',data);
/**
* @author zhanghao@ddtkj.com
* @since 2018-07-31
* @description 技能列表(添加动态使用)
*/
var dynamicSkill = () => fetchP('DDT_TC_DYNAMICS_SKILL',{},true);
/**
* @author zhanghao@ddtkj.com
* @since 2018-07-31
* @description 删除动态
* @param {String} id 动态id
*/
var dynamicDelete = (id) => fetchP('DDT_TC_DYNAMICS_DELETE',{id});
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
* @description 用户技能统计柱状图
* @param {String} mid 用户id
*/
var fetchSkillChart = (mid) => fetchP('DDT_TC_ZONE_INTEGRAL',{mid},true);
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


export {
    memberInfo,
    memberDynamic,
    fetchDynamicList,
    dynamicAdd,
    dynamicSkill,
    dynamicDelete,
    visitMemberList,
    evaluationList,
    fetchSkillList,
    fetchSkillChart,
    integralRule,
    integralLevel,
    integralInfo
}
