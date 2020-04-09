import {fetchP} from 'src/config/fetch'

/**
* @author zhanghao@ddtkj.com
* @since 2018-08-02
* @description 我的关注列表
* @param page
* @param size
*/
var fetchAttentionList = (data) => fetchP('DDT_TC_MEMBER_ATTENTIONLIST',data,true);

/**
* @author zhanghao@ddtkj.com
* @since 2018-08-02
* @description 关注
* @param {String} attentionMid 被关注用户id 多个用,隔开
*/
var setAttention = (attentionMid) => fetchP('DDT_TC_MEMBER_SETATTENTION',{attentionMid});

/**
* @author zhanghao@ddtkj.com
* @since 2018-08-02
* @description 取消关注
* @param {String} attentionMids 被取消关注用户id 多个用,隔开
*/
var deleteAttention = (attentionMids) => fetchP('DDT_TC_MEMBER_DELETEATTENTION',{attentionMids});

/**
* @author zhanghao@ddtkj.com
* @since 2018-08-02
* @description 身边动态
* @param {string} position 推荐类型 
* @param {string} cityCode 城市编码
* @param {string} longitude 经度
* @param {string} latitude 纬度
*/
var fetchIndexBeside = (position,cityCode,longitude,latitude) => fetchP('DDT_TC_INDEX_RECOMMENDMEMBERSKILL',{position,cityCode,longitude,latitude},true);

/**
* @author shangliqun@ddtkj.com
* @since 2018-08-14
* @description 控制中心查询
*/
var fetchControlOne = () => fetchP('DDT_TC_MEMBER_CONTROL_ONE',{},true);

/**
* @author shangliqun@ddtkj.com
* @since 2018-08-14
* @description 添加控制中心
*/
var fetchControlAdd = (data) => fetchP('DDT_TC_MEMBER_CONTROL_ADD',data);

export {
	fetchAttentionList,
	setAttention,
	deleteAttention,
	fetchIndexBeside,
	fetchControlOne,
	fetchControlAdd
}