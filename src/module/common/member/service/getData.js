import {fetchP} from 'src/config/fetch'
/**
* @author shangliqun@ddtkj.com
* @since 2018-08-3
* @param type 1今日任务2常规任务 
* @description 任务接口
*/
var fetchtaskList = (type) => fetchP('DDT_TC_ACTIVITY_MISSIONLIST',{type},true);

export {
	fetchtaskList
}