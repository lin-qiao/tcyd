import { fetchP, fetchN } from 'src/config/fetch'
/**
 * @author machao@ddtkj.com
 * @description 一级类目列表接口
 * @param {int}
 */
let fetchGetGoodsTypeList = () => fetchP('DDT_TC_SKILL_FIRST_CATEGORY', {}, true)
/**
 * @author machao@ddtkj.com
 * @description 二级类目列表接口
 * @param {int}
 */
let fetchGetGoodsTypeListTwo = fid => fetchP('DDT_TC_SKILL_TWO_CATEGORY', { fid }, true)
/**
 * @author machao@ddtkj.com
 * @description 用户技能详情接口
 * @param {int} skillId
 */
let fetchskillDetails = skillId =>
  fetchP('DDT_TC_SKILL_DETAILS', { skillId }, true)
/**
 * @author machao@ddtkj.com
 * @description 查询技能下属性属性值列表
 * @param {int} skillId
 */
let fetchskillAttrList = skillId =>
  fetchP('DDT_TC_SKILL_ATTR_LIST', { skillId }, true)
/**
 * @author machao@ddtkj.com
 * @description 修改技能服务方式接口
 * @param {int} skillId
 */
let fetchUpdateskillService = (skillId, serviceMode, acceptFlag) =>
  fetchP('DDT_TC_SKILL_UPDATE_SERVICE', { skillId, serviceMode, acceptFlag,submitToken:true })

/**
 * @author machao@ddtkj.com
 * @description 修改技能信息接口 (前一步)
 * @param {int} data
 */
let fetchUpdateskillInfo = data => fetchP('DDT_TC_SKILL_UPDATE_INFO', data)


/**
 * @author machao@ddtkj.com
 * @description wxsdk
 * @param {int} data
 */
let fetchWXsdk = url => fetchN('GET', '/wechat/sdkConfig', { url })

/**
 * @author machao@ddtkj.com
 * @description 添加技能接口
 * @param {int} skillImg  技能图片
 * @param {int} skillCategory  一级技能id
 * @param {int} skillSubCategory 二级技能id
 * @param {int} serviceIntroduced 服务介绍
 * @param {int} voiceIntroduced  语音介绍
 * @param {int} attrId   属性值id
 * @param {int} serviceMode  服务方式
 * @param {int} acceptFlag 是否接受派单
 */
var fetchAddSkill = (data) => {data.submitToken=true;return fetchP('DDT_TC_SKILL_ADD', data,true)}
/**
 * @author machao@ddtkj.com
 * @description 根据id查询类目信息接口
 * @param {int} id
 */
let fetchsCategoryDetail = id => fetchP('DDT_TC_SKILL_CATEGORY_DETAIL', { id }, true)
export {
  fetchGetGoodsTypeList,
  fetchGetGoodsTypeListTwo,
  fetchskillDetails,
  fetchskillAttrList,
  fetchAddSkill,
  fetchUpdateskillService,
  fetchUpdateskillInfo,
  fetchWXsdk,
  fetchsCategoryDetail
}
