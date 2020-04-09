import { fetchP } from 'src/config/fetch'

/**
 * @description 需求一级类目列表
 */
let fetchRequireFirstList = () => fetchP('DDT_TC_SKILL_FIRST_CATEGORY', {},true)

/**
 * @description 需求二级类目列表接口
 * @param {String} fid 一级类目Id (父级)
 */
let fetchRequireSecondList = fid => fetchP('DDT_TC_SKILL_TWO_CATEGORY', { fid },true)

/**
 * @description 需求发布
 * @param {Object} data {
 * @param {String} earnestMoney 诚意金
 * @param {String} serviceMethod	服务方式
 * @param {String} skillCategory	一级技能
 * @param {String} skillSubCategory	二级技能
 * @param {String} province	发布省
 * @param {String} city	发布市
 * @param {String} coordinateX	位置经度
 * @param {String} coordinateY	位置纬度
 * @param {String} skillIdsList	技能idlist
 * @param {String} withhold	扣款方式
 *
 */
let fetchRequirePublish = data => fetchP('DDT_TC_REQUIRE_REQUIRE_ADD', data)

/**
 * @author machao@ddtkj.com
 * @description 查询技能下属性属性值列表
 * @param {int} skillId
 */
let fetchskillAttrList = skillId =>
  fetchP('DDT_TC_SKILL_ATTR_LIST', { skillId },true)

/**
 * @author machao@ddtkj.com
 * @description 可用余额
 * @param {int} skillId
 */
let fetchsBursetotalMoney = () =>
  fetchP('DDT_TC_ACCOUNT_MEMBER_BURSETOTALMONEY', {},true)

/**
 * @author machao@ddtkj.com
 * @description 根据id查询类目信息接口
 * @param {int} id
 */
let fetchsCategoryDetail = id => fetchP('DDT_TC_SKILL_CATEGORY_DETAIL', { id },true)

/**
 * @author wangyalin@ddtkj.com
 * @description 查询附近人列表接口
 * @param {int} requireId
 */
let fetchGetinvitemember = requireId => fetchP('DDT_TC_REQUIRE_INVITE_GETINVITEMEMBER', { requireId },true)



export {
  fetchRequireFirstList,
  fetchRequireSecondList,
  fetchRequirePublish,
  fetchskillAttrList,
  fetchsBursetotalMoney,
  fetchsCategoryDetail,
  fetchGetinvitemember
}
