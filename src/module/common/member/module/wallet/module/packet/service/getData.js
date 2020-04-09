import {fetchP} from 'src/config/fetch'

/**
* @author shangliqun@ddtkj.com
* @since 2018-07-31
* @description 红包明细
* @param {int} page 当前页码
* @param {int} pageSize 每页条数
*/
var fetchRedpackList = (page,size) => fetchP('DDT_TC_MEMBER_RED',{page,size},true);

/**
* @author shangliqun@ddtkj.com
* @since 2018-07-31
* @description 查询今日获得红包及可用红包个数
*/
var fetchRedpackCount = () => fetchP('DDT_TC_MEMBER_RED_COUNT',{},true);

export {
	fetchRedpackList,
	fetchRedpackCount
}