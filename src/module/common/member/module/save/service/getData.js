import {fetchP} from 'src/config/fetch'

/**
* @author wangyalin@ddtkj.com
* @since 2018-07-31
* @description 查询安全中心信息
*/
export const fetchGetMemberInfo = () => fetchP('DDT_TC_MEMBER_INFO',{},true);

/**
* @author wangyalin@ddtkj.com
* @since 2018-07-31
* @description  实名认证
*/
export const fetchGetMemberSaverealnameinfo = (data) => fetchP('DDT_TC_MEMBER_SAVEREALNAMEINFO',data);

/**
* @author wangyalin@ddtkj.com
* @since 2018-07-31
* @description  判断名称和身份证是否在平台认证
*/
export const fetchGetMemberGetmemberbyidcard = (idCard) => fetchP('DDT_TC_MEMBER_GETMEMBERBYIDCARD',{idCard},true);

/**
* @author wangyalin@ddtkj.com
* @since 2018-07-31
* @description  个人认证信息查询
*/
export const fetchMemberGetMemberInfo= () => fetchP('DDT_TC_MEMBER_REALNAME_GETMEMBERBYUCID',{},true);


/**
* @author wangyalin@ddtkj.com
* @since 2018-07-31
* @description  修改手机号 -- 获取旧手机验证码
*/
export const fetchGetOldMobileCode = () => fetchP('DDT_TC_MEMBER_SENDOLDMOBILECODE',{});

/**
* @author wangyalin@ddtkj.com
* @since 2018-07-31
* @description  修改手机号 --  校验旧手机验证码
*/
export const fetchCheckOldMobileCode = (mobileCode) => fetchP('DDT_TC_MEMBER_CHECKOLDMOBILECODE',{mobileCode});

/**
* @author wangyalin@ddtkj.com
* @since 2018-07-31
* @description  修改手机号 -- 发送新手机的验证码
*/
export const fetchGetNewMobileCode = (newMobile) => fetchP('DDT_TC_MEMBER_SENDNEWMOBILECODE',{newMobile});

/**
* @author wangyalin@ddtkj.com
* @since 2018-07-31
* @description  修改手机号 -- 校验新手机的验证码
*/
export const fetchCheckNewMobileCode = (newMobile,mobileCode) => fetchP('DDT_TC_MEMBER_CHECKNEWMOBILECODE',{newMobile,mobileCode});

/**
* @author huoxiangying@ddtkj.com
* @since 2018-07-31
* @description  修改支付密码/找回支付密码/设置支付密码
*/
export const fetchUpdatePswd = (data) => fetchP('DDT_TC_MEMBER_UPDATETRADEPSWD',data);

/**
* @author huoxiangying@ddtkj.com
* @since 2018-07-31
* @description  找回密码--发送验证码
*/
export const fetchSendCode = (bizType,type) => fetchP('DDT_TC_MEMBER_GETVALIDCODE_SESSION',{bizType,type});

/**
* @author huoxiangying@ddtkj.com
* @since 2018-07-31
* @description  修改登录密码
*/
export const fetchResetPwd = (pwd,newPwd) => fetchP('DDT_TC_MEMBER_RESETPSWD',{pwd,newPwd});


/**
* @author wangyalin@ddtkj.com
* @since 2018-07-31
* @description  获取用户技能认证列表
*/
export const fetchGetSkillList = () => fetchP('DDT_TC_SKILL_CERTIFICATION_SKILLLIST',{},true);


/**
* @author wangyalin@ddtkj.com
* @since 2018-07-31
* @description  用户技能认证信息添加
*/
export const fetchAddSkill = (skillId,name,img) => fetchP('DDT_TC_SKILL_CERTIFICATION_SKILLADD',{skillId,name,img});

/**
* @author wangyalin@ddtkj.com
* @since 2018-07-31
* @description  用户技能认证信息修改
*/
export const fetchUpdateSkill = (id,name,img,order) => fetchP('DDT_TC_SKILL_CERTIFICATION_SKILLUPDATE',{id,name,img,order});

/**
* @author wangyalin@ddtkj.com
* @since 2018-07-31
* @description  用户技能认证信息删除
*/
export const fetchDeleteSkill = (id,order) => fetchP('DDT_TC_SKILL_CERTIFICATION_SKILLDELETE',{id,order});

/**
* @author wangyalin@ddtkj.com
* @since 2018-07-31
* @description 用户技能认证信息通过审核条数
*/
export const fetchSkillNumber = (skillId) => fetchP('DDT_TC_SKILL_CERTIFICATION_NUMBERCER',{skillId},true);

/**
* @author wangyalin@ddtkj.com
* @since 2018-07-31
* @description 用户技能认证详情
*/
export const fetchSkillDetail = (id) => fetchP('DDT_TC_SKILL_CERTIFICATION_SKILLDETAIL',{id},true);

/**
* @author wangyalin@ddtkj.com
* @since 2018-07-31
* @description 微信授权
* @param {string} regAddress 来源地址
* @param {string} regSoure 关键字
*/
export const fetchbindWx = (regAddress,regSoure) => fetchP('DDT_TC_MEMBER_UN_WX',{regAddress,regSoure});

/**
* @author wangyalin@ddtkj.com
* @since 2018-07-31
* @description 微博授权
*/
export const fetchbindSina = () => fetchP('DDT_TC_MEMBER_UN_SINA',{});

/**
* @author wangyalin@ddtkj.com
* @since 2018-07-31
* @description 微信解绑
*/
export const fetchRemoveWx = () => fetchP('DDT_TC_MEMBER_WXREMOVEBIND',{});

/**
* @author wangyalin@ddtkj.com
* @since 2018-07-31
* @description 微博解绑
*/
export const fetchRemoveSina = () => fetchP('DDT_TC_MEMBER_SINAREMOVEBIND',{});

/**
* @author wangyalin@ddtkj.com
* @since 2018-07-31
* @description 合伙人根据身份证判断是否在平台认证
*/
export const fetchGetmemberbyidcard = (cardNo) => fetchP('DDT_TC_MEMBER_REALNAME_GETMEMBERBYIDCARD',{cardNo},true);

/**
* @author wangyalin@ddtkj.com
* @since 2018-07-31
* @description 合伙人身份证号实名认证
*/
export const fetchSaveidcardinfo = (data) => fetchP('DDT_TC_MEMBER_REALNAME_SAVEIDCARDINFO',data);
/**
* @author wangyalin@ddtkj.com
* @since 2018-07-31
* @description 合伙人活体实名认证
*/
export const fetchSaveLiveimgInfo = (data) => fetchP('DDT_TC_MEMBER_REALNAME_SAVELIVEIMGINFO',data);

/**
* @author wangyalin@ddtkj.com
* @since 2018-07-31
* @description 合伙人认证信息查询
*/
export const fetchGetmemberbyucid = (data) => fetchP('DDT_TC_MEMBER_REALNAME_GETMEMBERBYUCID',data,true);

/**
* @author wangyalin@ddtkj.com
* @since 2018-07-31
* @description 合伙人身份证号修改实名认证
*/
export const fetchUpdateidcardinfo = (data) => fetchP('DDT_TC_MEMBER_REALNAME_UPDATEIDCARDINFO',data);

/*S 设置密码*/
/**
* @author songlingfang@ddtkj.com
* @since 2018-08-02
* @description 初始化密码
* @param {String} pswd 密码
*/
export const fetchInitPswd = (pswd) => fetchP('DDT_TC_MEMBER_INITPASSWORD',{pswd});


/**
* @author songlingfang@ddtkj.com
* @since 2018-08-02
* @description 解绑第三方账户
* @param {String} unBindType 第三方平台
*/
export const fetchUnBindThirdPlatform = (unBindType) => fetchP('DDT_TC_MEMBER_UNBINDTHIRDPLATFORM',{unBindType});
