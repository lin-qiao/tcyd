import { fetchP, fetchN } from 'src/config/fetch'
/**
 * @author shangliqun@ddtkj.com
 * @since 2018-8-1
 * @description 用户技能列表接口
 */
export const fetchSkillList = () =>
  fetchP('DDT_TC_SKILL_MEMBER_SIMPLE_LIST', {}, true)

/**
 * @author shangliqun@ddtkj.com
 * @since 2018-8-1
 * @description 待应邀列表查询接口
 */
export const fetchInviteWait = data =>
  fetchP('DDT_TC_REQUIRE_INVITE_WAIT', data, true)

/**
 * @author shangliqun@ddtkj.com
 * @since 2018-8-1
 * @description 已应邀列表查询接口
 */
export const fetchInviteHave = (page, size, status) =>
  fetchP('DDT_TC_REQUIRE_REQUIRE_HAVE', { page, size, status }, true)

/**
 * @author shangliqun@ddtkj.com
 * @since 2018-8-1
 * @description 已成交列表查询接口
 */
export const fetchInviteDone = (page, size) =>
  fetchP('DDT_TC_REQUIRE_REQUIRE_DONE', { page, size }, true)

/**
 * @author shangliqun@ddtkj.com
 * @since 2018-8-1
 * @description 已过期列表查询接口
 */
export const fetchInviteOverdue = (page, size) =>
  fetchP('DDT_TC_REQUIRE_INVITE_OVERDUE', { page, size }, true)

/**
 * @author shangliqun@ddtkj.com
 * @since 2018-8-1
 * @description 立即应邀接口
 */
export const fetchImmediately = (id, unit, unitPrice, introduce) =>
  fetchP('DDT_TC_REQUIRE_REQUIRE_IMMEDIATELY', {
    id,
    unit,
    unitPrice,
    introduce,
    submitToken: true
  })

/**
 * @author shangliqun@ddtkj.com
 * @since 2018-8-1
 * @description 立即应邀详情接口
 */
export const fetchRequireDetail = requireId =>
  fetchP('DDT_TC_REQUIRE_REQUIRE_DETAIL', { requireId }, true)

/**
 * @author huoxiangying@ddtkj.com
 * @since 2018-07-31
 * @description  获取问题列表
 * @param {int} skillId 技能id
 */
export const fetchGetQuestionList = skillId =>
  fetchP('DDT_TC_SKILL_PROFILE_QUESTIONLIST', { skillId }, true)

/**
 * @author huoxiangying@ddtkj.com
 * @since 2018-07-31
 * @description  获取视频列表
 */
export const fetchGetVideoList = skillId =>
  fetchP('DDT_TC_SKILL_PROFILE_VIDEOLIST', { skillId }, true)

/**
 * @author huoxiangying@ddtkj.com
 * @since 2018-07-31
 * @description  获取技能问答列表
 * @param {int} skillId 技能id
 */
export const fetchGetAnswerList = skillId =>
  fetchP('DDT_TC_SKILL_PROFILE_ANSWERLIST', { skillId }, true)

/**
 * @author huoxiangying@ddtkj.com
 * @since 2018-07-31
 * @description  获取问答详情
 * @param {int} id 问答id
 */
export const fetchGetAskDetail = id =>
  fetchP('DDT_TC_SKILL_PROFILE_ANSWERDETAIL', { id }, true)

/**
 * @author huoxiangying@ddtkj.com
 * @since 2018-07-31
 * @description  问题回答添加
 * @param {int} skillId 技能id
 * @param {string} question 问题
 * @param {string} answer 回答
 */
export const fetchAnswerAdd = (skillId, question, answer) =>
  fetchP('DDT_TC_SKILL_PROFILE_ANSWERADD', { skillId, question, answer,submitToken:true })

/**
 * @author huoxiangying@ddtkj.com
 * @since 2018-07-31
 * @description  问题回答修改
 * @param {int}    id 问答id
 * @param {string} question 问题
 * @param {string} answer 回答
 */
export const fetchAnswerUpdate = (id, question, answer) =>
  fetchP('DDT_TC_SKILL_PROFILE_ANSWERUPDATE', { id, question, answer })

/**
 * @author huoxiangying@ddtkj.com
 * @since 2018-07-31
 * @description  问题回答删除
 * @param {int} id 问答id
 */
export const fetchAnswerDelete = id =>
  fetchP('DDT_TC_SKILL_PROFILE_ANSWERDELETE', { id })

/**
 * @author huoxiangying@ddtkj.com
 * @since 2018-07-31
 * @description  获取工作经历列表
 * @param {int} skillId 技能id
 */
export const fetchGetWorkList = skillId =>
  fetchP('DDT_TC_SKILL_PROFILE_WORKLIST', { skillId }, true)

/**
 * @author huoxiangying@ddtkj.com
 * @since 2018-07-31
 * @description  获取教育经历列表
 * @param {int} skillId 技能id
 */
export const fetchGetEducationList = skillId =>
  fetchP('DDT_TC_SKILL_PROFILE_EDUCATIONLIST', { skillId }, true)

/**
* @author huoxiangying@ddtkj.com
* @since 2018-07-31
* @description  获取工作经历详情
* @param {int} id 工作经历id

*/
export const fetchGetWorkDetail = id =>
  fetchP('DDT_TC_SKILL_PROFILE_WORKDETAIL', { id }, true)

/**
 * @author huoxiangying@ddtkj.com
 * @since 2018-07-31
 * @description  获取教育经历详情
 * @param {int} id 教育经历id
 */
export const fetchGetEducationDetail = id =>
  fetchP('DDT_TC_SKILL_PROFILE_EDUCATIONDETAIL', { id }, true)

/**
 * @author huoxiangying@ddtkj.com
 * @since 2018-07-31
 * @description  工作经历添加
 * @param {int} skillId 技能id
 * @param {string} workplace 工作单位
 * @param {string} position 职位
 * @param {string} entryDate 入职时间
 * @param {string} quitDate 离职时间
 */
export const fetchWorkAdd = (
  skillId,
  workplace,
  position,
  entryDate,
  quitDate
) =>
  fetchP('DDT_TC_SKILL_PROFILE_WORKADD', {
    skillId,
    workplace,
    position,
    entryDate,
    quitDate,
    submitToken:true
  })

/**
 * @author huoxiangying@ddtkj.com
 * @since 2018-07-31
 * @description  工作经历修改
 * @param {int} id 工作经历id
 * @param {int} skillId 技能id
 * @param {string} workplace 工作单位
 * @param {string} position 职位
 * @param {string} entryDate 入职时间
 * @param {string} quitDate 离职时间
 */
export const fetchWorkUpdate = (
  id,
  skillId,
  workplace,
  position,
  entryDate,
  quitDate
) =>
  fetchP('DDT_TC_SKILL_PROFILE_WORKUPDATE', {
    id,
    skillId,
    workplace,
    position,
    entryDate,
    quitDate
  })

/**
 * @author huoxiangying@ddtkj.com
 * @since 2018-07-31
 * @description  工作经历删除
 * @param {int} id 工作经历id
 */
export const fetchWorkDelete = id =>
  fetchP('DDT_TC_SKILL_PROFILE_WORKDELETE', { id })

/**
 * @author huoxiangying@ddtkj.com
 * @since 2018-07-31
 * @description  技能视频添加
 */
export const fetchVideoAdd = data =>
  fetchP('DDT_TC_SKILL_PROFILE_VIDEOADD', data)

/**
 * @author huoxiangying@ddtkj.com
 * @since 2018-07-31
 * @description  教育经历添加
 * @param {int} skillId 技能id
 * @param {string} schoolName 学校名称
 * @param {string} education 学历
 * @param {string} startDate 开始时间
 * @param {string} endDate 结束时间
 */
export const fetchEducationAdd = (
  skillId,
  schoolName,
  education,
  startDate,
  endDate
) =>
  fetchP('DDT_TC_SKILL_PROFILE_EDUCATIONADD', {
    skillId,
    schoolName,
    education,
    startDate,
    endDate,
    submitToken:true
  })

/**
 * @author huoxiangying@ddtkj.com
 * @since 2018-07-31
 * @description  教育经历修改
 * @param {int} id 教育经历id
 * @param {int} skillId 技能id
 * @param {string} schoolName 学校名称
 * @param {string} education 学历
 * @param {string} startDate 开始时间
 * @param {string} endDate 结束时间
 */
export const fetchEducationUpdate = (
  id,
  skillId,
  schoolName,
  education,
  startDate,
  endDate
) =>
  fetchP('DDT_TC_SKILL_PROFILE_EDUCATIONUPDATE', {
    id,
    skillId,
    schoolName,
    education,
    startDate,
    endDate
  })

/**
 * @author huoxiangying@ddtkj.com
 * @since 2018-07-31
 * @description  教育经历删除
 * @param {int} id 教育经历id
 */
export const fetchEducationDelete = id =>
  fetchP('DDT_TC_SKILL_PROFILE_EDUCATIONDELETE', { id })

/**
 * @author huoxiangying@ddtkj.com
 * @since 2018-07-31
 * @description  获取技能荣誉列表
 * @param {int} skillId 技能id
 */
export const fetchGetHonorList = skillId =>
  fetchP('DDT_TC_SKILL_PROFILE_HONORLIST', { skillId }, true)

/**
 * @author huoxiangying@ddtkj.com
 * @since 2018-07-31
 * @description  获取技能荣誉详情
 * @param {int} id 荣誉id
 */
export const fetchGetHonorDetail = id =>
  fetchP('DDT_TC_SKILL_PROFILE_HONORDETAIL', { id }, true)

/**
 * @author huoxiangying@ddtkj.com
 * @since 2018-07-31
 * @description  技能荣誉修改
 * @param {int} id 技能荣誉id
 * @param {int} skillId 技能id
 * @param {string} honorName 荣誉名称
 * @param {string} issuingAuthority 颁发机构
 * @param {string} getDate 获的时间
 */
export const fetchHonorUpdate = (
  id,
  skillId,
  honorName,
  issuingAuthority,
  getDate
) =>
  fetchP('DDT_TC_SKILL_PROFILE_HONORUPDATE', {
    id,
    skillId,
    honorName,
    issuingAuthority,
    getDate
  })

/**
 * @author huoxiangying@ddtkj.com
 * @since 2018-07-31
 * @description  技能荣誉添加
 * @param {int} skillId 技能id
 * @param {string} honorName 荣誉名称
 * @param {string} issuingAuthority 颁发机构
 * @param {string} getDate 获的时间
 */
export const fetchHonorAdd = (skillId, honorName, issuingAuthority, getDate) =>
  fetchP('DDT_TC_SKILL_PROFILE_HONORADD', {
    skillId,
    honorName,
    issuingAuthority,
    getDate,
    submitToken:true
  })

/**
 * @author huoxiangying@ddtkj.com
 * @since 2018-07-31
 * @description  技能荣誉删除
 * @param {int} id 技能荣誉id
 */
export const fetchHonorDelete = id =>
  fetchP('DDT_TC_SKILL_PROFILE_HONORDELETE', { id })

/**
 * @author huoxiangying@ddtkj.com
 * @since 2018-07-31
 * @description  获取技能详情
 * @param {int} skillId 技能id
 */
export const fetchGetSkillDetails = (skillId) =>
  fetchP('DDT_TC_SKILL_DETAILS', { skillId }, true)

/**
 * @author huoxiangying@ddtkj.com
 * @since 2018-07-31
 * @description  删除技能
 * @param {int} skillId 技能id
 */
export const fetchSkillDelete = skillId =>
  fetchP('DDT_TC_SKILL_DELETE', { skillId,submitToken:true })

/**
 * @author huoxiangying@ddtkj.com
 * @since 2018-07-31
 * @description  获取评价列表
 * @param {int} mid 用户id
 * @param {int} skillId 技能id
 */
export const fetchGetEvaluationList = (mid, skillId) =>
  fetchP('DDT_TC_ZONE_EVALUATIONLIST', { mid, skillId }, true)

/**
 * @author wangyalin@ddtkj.com
 * @since 2018-08-01
 * @description  获取需求详情
 * @param {int} requireId 需求id
 */
export const fetchGetRequireDetail = requireId =>
  fetchP('DDT_TC_REQUIRE_DETAIL', { requireId }, true)

/**
 * @author wangyalin@ddtkj.com
 * @since 2018-08-01
 * @description  获取需求应邀详情
 * @param {int} requireId 需求id
 */
export const fetchGetRequirImmediatelyDetail = requireId =>
  fetchP('DDT_TC_REQUIRE_REQUIRE_DETAIL', { requireId }, true)

/**
 * @author wangyalin@ddtkj.com
 * @since 2018-08-01
 * @description  立即应邀接口
 * @param {int} id 应邀id
 * @param {String} unit	单位
 * @param {int} unitPrice	单价
 */
export const fetchSetRequireImmediately = (id, unit, unitPrice) =>
  fetchP('DDT_TC_REQUIRE_REQUIRE_IMMEDIATELY', { id, unit, unitPrice })

/**
 * @author wangyalin@ddtkj.com
 * @since 2018-08-01
 * @description  用户技能列表接口
 */
export const fetchGetSkillList = () => fetchP('DDT_TC_SKILL_MEMBER_LIST', {}, true)

/**
 * @author wangyalin@ddtkj.com
 * @since 2018-08-01
 * @description  修改技能是否开启应邀接口
 */
export const fetchUpdateSkillOpenflag = (skillId, openFlag) =>
  fetchP('DDT_TC_SKILL_UPDATE_OPENFLAG', { skillId, openFlag,submitToken: true })

/**
 * @author wangyalin@ddtkj.com
 * @since 2018-08-01
 * @description  支付保证金
 */
export const fetchPayDeposit = (skillId, deposit, accountType) =>
  fetchP('DDT_TC_SKILL_PAYDEPOSIT', { skillId, deposit, accountType,submitToken:true })

/**
 * @author wangyalin@ddtkj.com
 * @since 2018-08-01
 * @description  需求订单详情
 */
export const fetchOrderDetail = requireId =>
  fetchP('DDT_TC_REQUIRE_ORDER_DETAIL', { requireId }, true)

/**
 * @author wangyalin@ddtkj.com
 * @since 2018-08-03
 * @description  同意退款
 */
export const fetchOrderConsentrefund = orderSn =>
  fetchP('DDT_TC_REQUIRE_ORDER_CONSENTREFUND', { orderSn })

/**
 * @author wangyalin@ddtkj.com
 * @since 2018-08-03
 * @description  驳回退款
 */
export const fetchOrderRefund = orderSn =>
  fetchP('DDT_TC_REQUIRE_ORDER_REFUND', { orderSn })

/**
 * @author wangyalin@ddtkj.com
 * @since 2018-08-06
 * @description  服务者需求订单详情
 */
export const fetchServiceOrderDetail = requireId =>
  fetchP('DDT_TC_SERVICE_REQUIRE_ORDER_DETAIL', { requireId }, true)
/**
 * @author machao@ddtkj.com
 * @description wxsdk
 * @param {int} data
 */
export const fetchWXsdk = url => fetchN('GET', '/wechat/sdkConfig', { url })

/**
 * @author wangyalin@ddtkj.com
 * @since 2018-09-07
 * @description  判断用户发布技能是否已达上限
 */
export const fetchSkillTopLimit = () =>
  fetchP('DDT_TC_SKILL_TOPLIMIT', { })
