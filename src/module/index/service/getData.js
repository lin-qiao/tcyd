import {fetchP} from 'src/config/fetch'
/*S index首页*/

/**
* @author songlingfang@ddtkj.com
* @since 2018-07-31
* @description 获取推荐的技能类目
* @param {string} code 技能推荐类型   index
*/
var fetchIndexRecommendSkill = (code) => fetchP('DDT_TC_INDEX_RECOMMENDSKILL',{code},true);

/**
* @author songlingfang@ddtkj.com
* @since 2018-07-31
* @description 同城热约
* @param {string} position 推荐类型
*/
var fetchIndexHot = (position,cityCode=CITYCODE,longitude=LON,latitude=LAT) => fetchP('DDT_TC_INDEX_RECOMMENDMEMBERSKILL',{position,cityCode,longitude,latitude},true);


/**
* @author songlingfang@ddtkj.com
* @since 2018-07-31
* @description 身边动态
* @param {string} position 推荐类型
* @param {string} cityCode 城市编码
* @param {string} longitude 经度
* @param {string} latitude 纬度
*/
var fetchIndexBeside = (position,cityCode=CITYCODE,longitude=LON,latitude=LAT) => fetchP('DDT_TC_INDEX_RECOMMENDMEMBER',{position,cityCode,longitude,latitude},true);

/**
* @author songlingfang@ddtkj.com
* @since 2018-07-31
* @description 技能列表查询功能
* @param {int} curPage 当前页码  缺省值1
* @param {int} pageSize 每页条数  缺省值10
* @param {String} position 页面位置 index
* @param {int} sort 排序 0智能排序 1最新发布  2人气最高  3距离最近 4评论最多
* @param {String} keyWords 关键词
* @param {String} longitude 经度
* @param {String} latitude 纬度
* @param {String} cityCode 城市code
* @param {double} dist 距离
* @param {int} skillSubCategory 二级技能
* @param {String} 性别  male 男  female女
* @param {int} minAge 年龄开始 年龄开始(以下传0)
* @param {String} maxAge 年龄开始 年龄结束(以上传*)
* @param {String} serviceType 服务方式 线上online 线下offline
* @param {String} media 媒体 语音voice 视频video
* @param {String} authType 认证   身份认证isVerify 技能认证isSkillCertification
*/
var fetchSkillList = (data) => fetchP('DDT_TC_SEARCH_SKILL',data,true);

/**
* @author songlingfang@ddtkj.com
* @since 2018-07-31
* @description 首页悬浮窗单条头条
* @param {int} size 条数
*/
var fetchIndexHeadlineOne = () => fetchP('DDT_TC_HEADLINE_ONE',{},true,true);

/**
* @author songlingfang@ddtkj.com
* @since 2018-08-06
* @description 上线提醒
* @param {int} noticeId 订阅人id
*/
var fetchOnlineNotice = (noticeId) => fetchP('DDT_TC_ZONE_ONLINENOTICE',{noticeId},true);
/*E index首页*/

/*S 一键体验*/
/**
* @author songlingfang@ddtkj.com
* @since 2018-08-06
* @description 一键发布多个技能
* @param {String} ids 二级技能id,多个用逗号分隔
*/
var fetchPublishSkillMutiple = (ids) => fetchP('DDT_TC_SKILL_SAVE_MULTIPLE',{ids,submitToken:true});
/**
* @author songlingfang@ddtkj.com
* @since 2018-08-09
* @description 一键发布多个需求
* @param {String} skillSubCategory 二级技能id,多个用逗号分隔
* @param {String} province 省
* @param {String} city 市
* @param {String} coordinateX 经度
* @param {String} coordinateY 纬度
*/
var fetchPublishDemandMutiple = (skillSubCategory,province=PROVINCE,city=CITY,coordinateX=LON,coordinateY=LAT) => fetchP('DDT_TC_REQUIRE_REQUIRE_MESS',{skillSubCategory,province,city,coordinateX,coordinateY});
/*E 一键体验*/

/*S topLine头条页面*/
/**
* @author songlingfang@ddtkj.com
* @since 2018-07-31
* @description 头条页面
* @param {int} page 当前页
* @param {int} size 每页大小
*/
var fetchHeadlineList = (page,size) => fetchP('DDT_TC_HEADLINE_LIST',{page,size},true);
/*E topLine头条页面*/
/*S notice身边动态*/
/**
* @author songlingfang@ddtkj.com
* @since 2018-08-01
* @description 获取身边动态
* @param {int} page 当前页
* @param {int} size 每页大小
* @param {string} longitude 经度
* @param {string} latitude 纬度
* @param {string} cityCode 城市code
* @param {double} dist 距离
*/
var fetchBesideList = (data) => fetchP('DDT_TC_SEARCH_USERSTATE',data,true);
/**
* @author songlingfang@ddtkj.com
* @since 2018-08-06
* @description 动态点赞
* @param {int} objId 动态id
*/
var fetchDynamicsAddPaise = (objId) => fetchP('DDT_TC_DYNAMICS_ADDPRAISE',{objId});
/**
* @author songlingfang@ddtkj.com
* @since 2018-08-06
* @description 动态取消点赞
* @param {int} objId 动态id
*/
var fetchDynamicsDeletePaise = (objId) => fetchP('DDT_TC_DYNAMICS_DELETEPRAISE',{objId});
/*E notice身边动态*/
/*S 约Ta*/
/**
* @author songlingfang@ddtkj.com
* @since 2018-08-03
* @description  获取技能详情
* @param {int} skillId 技能id
*/
var fetchGetSkillDetails = (id) => fetchP('DDT_TC_SKILL_CATEGORY_DETAIL',{id},true);
/**
* @author songlingfang@ddtkj.com
* @since 2018-08-07
* @description  获取诚意金列表
*/
var fetchGetEarnestList = () => fetchP('DDT_TC_REQUIRE_REQUIRE_EARNESTMONEYLIST',{},true);
/**
* @author songlingfang@ddtkj.com
* @since 2018-08-06
* @description  约Ta
* @param {double} earnestMoney 诚意金
* @param {int} 二级技能id
* @param {String} province 发布省
* @param {String} city 发布市
* @param {String} coordinateX 位置经度
* @param {String} coordinateY 位置纬度
* @param {withhold} withhold 款方式 （可多选 逗号隔开）	非空	（充值，收入，佣金 balance,income,brokerage）
* @param {int} serviceMid 服务者id
* @param {double} kilometer 千米
*/
var fetchPublishDemandAboutTa = (data) => fetchP('DDT_TC_REQUIRE_REQUIRE_BATCHES',data);
/*E 约Ta*/
export {
	fetchIndexRecommendSkill,
	fetchSkillList,
	fetchIndexHot,
	fetchIndexHeadlineOne,
	fetchHeadlineList,
	fetchIndexBeside,
	fetchBesideList,
	fetchGetSkillDetails,
	fetchPublishDemandAboutTa,
	fetchOnlineNotice,
	fetchPublishSkillMutiple,
	fetchDynamicsAddPaise,
	fetchDynamicsDeletePaise,
	fetchGetEarnestList,
	fetchPublishDemandMutiple
}
