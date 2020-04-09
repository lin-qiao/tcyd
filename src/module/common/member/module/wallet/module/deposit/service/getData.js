import {fetchP} from 'src/config/fetch'

/**
* @author jianghao@ddtkj.com
* @since 2018-08-14
* @description 保证金退款记录
*/
let fetchMemberRefunddeposit = ()=>fetchP("DDT_TC_ACCOUNT_MEMBER_REFUNDDEPOSIT",{},true);

/**
 * @author huoxiangying@ddtkj.com
 * @since 2018-08-14
 * @param  page 当前页
 * @param  size 每页条数
 * @description 保证金充值记录
 */
let fetchGetPayLog = (page,size)=>fetchP("DDT_TC_ACCOUNT_MEMBER_PAYDEPOSIT",{page,size},true);

/**
 * @author huoxiangying@ddtkj.com
 * @since 2018-08-14
 * @description 保证金余额总和
 */
let fetchGetBond = ()=>fetchP("DDT_TC_SKILL_TOTALDEPOSIT",{},true);

/**
 * @author huoxiangying@ddtkj.com
 * @since 2018-08-14
 * @description 保证金支付
 * @param  skillId 技能id
 * @param  accountType  扣款账户类型
 * @param  deposit  保证金额
 */
let fetchPayDeposit = (skillId,deposit,accountType)=>fetchP("DDT_TC_SKILL_PAYDEPOSIT",{skillId,deposit,accountType,submitToken:true});

/**
 * @author wangxinhui@ddtkj.com
 * @since 2018-08-14
 * @param  skillId 技能id
 * @param  reason  退款原因
 * @param  explain  退款说明
 * @description 保证金退款接口
 */
let fetchRefundDeposit = (skillId,reason,explain)=>fetchP("DDT_TC_SKILL_REFUNDDEPOSIT",{skillId,reason,explain,submitToken:true});

/**
 * @author huoxiangying@ddtkj.com
 * @since 2018-07-31
 * @description  获取技能详情
 * @param {int} skillId 技能id
 */
let fetchGetSkillDetails = (skillId) =>fetchP('DDT_TC_SKILL_DETAILS', { skillId },true)

export {
	fetchMemberRefunddeposit,
	fetchRefundDeposit,
	fetchGetPayLog,
	fetchGetBond,
	fetchGetSkillDetails,
	fetchPayDeposit
}
