import {fetchP} from 'src/config/fetch'

/**
* @author wangyalin@ddtkj.com
* @since 2018-8-13
* @description 个人主页技能列表接口
*/
export const fetchGetSkillList = (id) => fetchP('DDT_TC_SKILL_PERSONALHOME_LIST',{id},true);



/**
* @author wangxinhui@ddtkj.com
* @since 2018-10-22
* @description 需求分享
*/
export const fetchRequireShare = (requireId) => fetchP('DDT_TC_REQUIRE_SHARE',{requireId});
