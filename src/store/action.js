import {
		fetchProfileDetail//获取公共配置--上线提醒金额
	} from 'src/service/getData'
let actions = {
	async getOnlineRemindPrice({commit}) {
		let res = await fetchProfileDetail('buy_notice_onilne_money');
		if(res.status&&res.data.sysProfileVo){
			commit('CHANGE_REMIND_PRICE', res.data.sysProfileVo.value);
		}
	},
	async getImgVerifyFlag({commit}) {
		let res = await fetchProfileDetail('pic_validcode_switch','ddt');
		if(res.status&&res.data.sysProfileVo){
			commit('CHANGE_IMG_VERIFY', res.data.sysProfileVo.value);
		}
	}
}
export default actions