import {fetchP,fetchN,fetchWechatG} from 'src/config/fetch'
/*S 登录*/
/**
* @author songlingfang@ddtkj.com
* @since 2018-08-02
* @description 密码登录
* @param {String} mobile 手机号
* @param {String} pswd 密码
* @param {String} backUrl 回调地址
* @param {String} latitude 纬度
* @param {String} longitude 经度
*/
var fetchPswdLogin = (mobile,pswd,backUrl,latitude=LAT,longitude=LON) => {
	if(window.LAT&&window.LON){
		return fetchP('DDT_TC_MEMBER_LOGIN',{mobile,pswd,backUrl,latitude,longitude})
	}else{
		return fetchP('DDT_TC_MEMBER_LOGIN',{mobile,pswd,backUrl})
	}
}
;

/**
* @author songlingfang@ddtkj.com
* @since 2018-08-02
* @description 验证码登录
* @param {String} mobile 手机号
* @param {String} verifyCode 验证码
* @param {String} backUrl 回调地址
* @param {String} regSoure 注册来源关键词
* @param {String} regAddress 注册来源地址
* @param {String} reference  推荐人手机号
* @param {String} latitude 纬度
* @param {String} longitude 经度
*/
var fetchValidCodeLogin = (mobile,verifyCode,backUrl,regSoure,regAddress,reference) => {
	let data={
		mobile:mobile,
		verifyCode:verifyCode,
		backUrl:backUrl,
		regSoure:regSoure,
		regAddress:regAddress,
		reference:reference,
		latitude:LAT,
		longitude:LON,
		accuracy:ACCURACY,
		province:PROVINCE,
		city:CITY,
		district:COUNTY,//地区信息
		street:STREET//街道信息

	}
	return fetchP('DDT_TC_MEMBER_VERIFYCODELOGIN',data);
}

/**
* @author songlingfang@ddtkj.com
* @since 2018-08-02
* @description 获取登录验证码
* @param {String} mobile 手机号
*/
var fetchLoginValidCode = (mobile) => fetchP('DDT_TC_MEMBER_LOGINMOBILEVERIFYCODE',{mobile});
/*E 登录*/
/*S 注册*/
/**
* @author songlingfang@ddtkj.com
* @since 2018-08-02
* @description 检验手机号
* @param {String} mobile 手机号
*/
var fetchCheckMobile = (mobile) => fetchP('DDT_TC_MEMBER_CHECKMOBILEEXIST',{mobile});
/**
* @author songlingfang@ddtkj.com
* @since 2018-08-09
* @description 获取极验
*/
var fetchGeetestRegister = () => fetchP('DDT_TC_MEMBER_UN_STARTCAPTCHA',{},true);
/**
* @author songlingfang@ddtkj.com
* @since 2018-08-02
* @description 注册获取验证码
* @param {String} mobile 手机号
* @param {String} picValidCode 图形验证
* @param {String} geetest_challenge 极验二次验证
* @param {String} geetest_validate  极验二次验证
* @param {String} geetest_seccode   极验二次验证
*/
var fetchRegisterValidCode = (mobile,picValidCode,geetest_challenge,geetest_validate,geetest_seccode) => fetchP('DDT_TC_MEMBER__REGISTERMOBILEVERIFYCODE',{mobile,picValidCode,geetest_challenge,geetest_validate,geetest_seccode});
/**
* @author songlingfang@ddtkj.com
* @since 2018-08-02
* @description 注册
* @param {String} mobile 手机号
* @param {String} password 密码
* @param {String} verifyCode 短信验证码
* @param {String} reference  邀请人
* @param {String} backUrl 回调地址
* @param {String} regSoure  注册来源关键词
* @param {String} regAddress  注册来源地址
*/
var fetchRegister = (mobile,password,verifyCode,reference,backUrl,regSoure,regAddress) => fetchP('DDT_TC_MEMBER_REGISTER',{mobile,password,verifyCode,reference,backUrl,regSoure,regAddress});

/*E 注册*/
/*S 设置密码*/
/**
* @author songlingfang@ddtkj.com
* @since 2018-08-02
* @description 初始化密码
* @param {String} pswd 密码
*/
var fetchInitPswd = (pswd) => fetchP('DDT_TC_MEMBER_INITPASSWORD',{pswd});
/*E 设置密码*/
/*S 找回密码*/
/**
* @author songlingfang@ddtkj.com
* @since 2018-08-02
* @description 找回密码获取验证码
* @param {String} mobile 手机号
* @param {String} picValidCode 图形验证码
*/
var fetchFindValidCode = (mobile,picValidCode) => fetchP('DDT_TC_MEMBER__FORGETPSWDMOBILESEND',{mobile,picValidCode});
/**
* @author songlingfang@ddtkj.com
* @since 2018-08-02
* @description 找回密码验证短信验证码
* @param {String} mobile 手机号
* @param {String} mobileCode 短信验证码
*/
var fetchCheckFindValidCode = (mobile,mobileCode) => fetchP('DDT_TC_MEMBER__FORGETPSWDMOBILECHECK',{mobile,mobileCode});
/**
* @author songlingfang@ddtkj.com
* @since 2018-08-02
* @description 重置登录密码
* @param {String} newPswd 新密码
*/
var fetchResetPswd = (newPswd) => fetchP('DDT_TC_MEMBER__FORGETPSWDRESET',{newPswd});
/*E 找回密码*/
/*S 完善资料*/
/**
* @author songlingfang@ddtkj.com
* @since 2018-08-02
* @description 获取用户资料
*/
var fetchGetMess = () => fetchP('DDT_TC_MEMBER_GETMEMBERATTRINFO',{},true);
/**
* @author songlingfang@ddtkj.com
* @since 2018-08-02
* @description 完善资料
* @param {String} age 年龄
* @param {String} nickname 昵称
* @param {String} headPhoto 头像
* @param {String} gender 性别   male 男  female女
*/
var fetchSetMess = (age,nickname,headPhoto,gender) => fetchP('DDT_TC_MEMBER_SAVEMEMBERATTRINFO',{age,nickname,headPhoto,gender});

/**
 * @author gaoxiaopeng@ddtkj.com
 * @description  微信授权登陆
 * @param {String} loginType
 * @param {String} latitude
 * @param {String} longitude
 * @param {String} accuracy
 * @param {String} address
 * @param {String} country
 * @param {String} province
 * @param {String} city
 * @param {String} district
 * @param {String} street
 * @param {String} openId
 */
let fetchWechatLogin = (data) => fetchP('DDT_TC_MEMBER_OTHERLOGIN',data,true,true)

/**
 * @author gaoxiaopeng@ddtkj.com
 * @description  第三方微信授权登陆  返回重定向地址， 直接跳转即可
 * @param {String} code
 */
let fetchThirdWechatLogin = (regAddress,regSoure) => fetchP('DDT_TC_MEMBER_THIRDLOGININWX',{regAddress,regSoure})


/**
 * @author gaoxiaopeng@ddtkj.com
 * @description  绑定第三方并注册
 * @param {String} code
 */
let fetchThirdBindAndRegist = (mobile,password,code,invitePhone,loginOpenId,loginType="wx") => fetchP('DDT_TC_MEMBER_BINDTHIRDANDREGIST',{mobile,password,code,invitePhone,loginOpenId,loginType})


/**
 * @author gaoxiaopeng@ddtkj.com
 * @description 绑定第三方并登录
 * @param {String} code
 */
let fetchThirdBindAndLogin = (userPhone,password,code,loginType,openId,thirdType="wx") => fetchP('DDT_TC_MEMBER_BINDTHIRDANDLOGIN',{userPhone,password,code,loginType,openId,thirdType})


/**
* @author wangyalin@ddtkj.com
* @since 2018-10-10
* @description 注册或者登录获取手机验证码
* @param {String} mobile 手机号
* @param {String} geetest_challenge 手机号
* @param {String} geetest_validate 手机号
* @param {String} geetest_seccode 手机号
*/
var fetchLoginOrRegisterValidCode = (mobile,geetest_challenge,geetest_validate,geetest_seccode) => fetchP('DDT_TC_MEMBER_NEWMOBILEVERIFYCODE',{mobile,geetest_challenge,geetest_validate,geetest_seccode});

/**
* @author wangyalin@ddtkj.com
* @since 2018-10-10
* @description 单独重置登录密码
* @param {String} newPswd  新密码
* @param {String} userInfo 手机号
*/
var fetchPswdReset = (newPswd,userInfo) => fetchP('DDT_TC_MEMBER__PSWDRESET',{newPswd,userInfo});




/*E 完善资料*/
export {
	fetchPswdLogin,
	fetchCheckMobile,
	fetchValidCodeLogin,
	fetchLoginValidCode,
	fetchInitPswd,
	fetchRegisterValidCode,
	fetchRegister,
	fetchFindValidCode,
	fetchCheckFindValidCode,
	fetchResetPswd,
	fetchGetMess,
	fetchSetMess,
	fetchGeetestRegister,
	fetchWechatLogin,
	fetchThirdWechatLogin,
	fetchThirdBindAndLogin,
	fetchThirdBindAndRegist,
	fetchLoginOrRegisterValidCode,
	fetchPswdReset
}
