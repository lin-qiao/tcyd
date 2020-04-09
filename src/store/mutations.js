import {
    SET_iDCARD, //设置身份证号
    CLEAR_IDCARD, //清除身份证信息
    CHANGE_NEED_PSWD,//修改是否需要交易密码
    CITY,//修改推荐位选择的城市
    CHANGE_REMIND_PRICE,//获取上线提醒金额
    CHANGE_IMG_VERIFY//获取图形验证码开关
} from './mutation-types'
let mutations = {
    //设置身份证信息
    [SET_iDCARD](state, list) {
        list.forEach(obj => {
            state.idcard[obj.key] = obj.value;
        })
    },
    //初始化身份证信息
    [CLEAR_IDCARD](state){
        Object.assign(state.idcard,{
            name:'',
            idcard_number:'',
            issued_by:'',
            valid_date_start:'',
            valid_date_end:'',
            front_img:'',
            rear_img:'',
        })
    },
    [CHANGE_NEED_PSWD](state,val){
    	state.isNeedPswd = val;
    },
    [CITY](state,obj){
    	state.city = obj;
    },
    [CHANGE_REMIND_PRICE](state,price){
    	state.onlineRemindPrice = price;
    },
    [CHANGE_IMG_VERIFY](state,flag){
    	state.imgVerifyFlag = flag;
    }
}
export default mutations
