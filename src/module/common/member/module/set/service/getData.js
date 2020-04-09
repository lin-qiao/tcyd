import {fetchP} from 'src/config/fetch'
/**
* @author huoxiangying@ddtkj.com
* @since 2018-07-31
* @description  获取用户安全中心信息
*/
export const fetchGetMemberInfo = (data) => fetchP('DDT_TC_MEMBER_INFO',data,true);

/**
* @author huoxiangying@ddtkj.com
* @since 2018-07-31
* @description  退出登录
*/
export const fetchLogOut = (data) => fetchP('DDT_TC_MEMBER_LOGOUT',data);

/**
* @author zhanghao@ddtkj.com
* @since 2018-08-07
* @description  根据code获取文章类型一级分类列表
* @param {String} code
*/
export const fetchArticelType = (code) => fetchP('DDT_TC_CMS_ARTICLE_TYPE_FIRST_LIST',{code},true);


/**
* @author zhanghao@ddtkj.com
* @since 2018-08-07
* @description  获取文章内容详情
* @param {String} id 文章id
*/
export const fetchProblemDetail = (id) => fetchP('DDT_TC_CMS_ARTICLE_CONTENT_DETAIL',{id},true);

/**
* @author zhanghao@ddtkj.com
* @since 2018-08-07
* @description  提交意见反馈
* @param {String} bizType 平台类型
* @param {String} fbType 反馈类型
* @param {String} content 反馈内容
* @param {String} imgUrl 反馈图片路径
* @param {String} mobileOrQQ 联系方式
*/
export const submitFeedback = (data) => fetchP('DDT_TC_MEMBER_FEEDBACK_ADDFEEDBACK',data);

/**
* @author shangliqun@ddtkj.com
* @since 2018-08-08
* @description  根据id获取公告信息接口
* @param {String} id 公告
*/
export const fetchNoticeDetail = (id) => fetchP('DDT_TC_CMS_NOTICE_DETAIL',{id},true);
