import {fetchP} from 'src/config/fetch'


/**
 * @author wangxinhui@ddtkj.com
 * @since 2018-08-02
 * @description 银行卡列表
 */
let fetchBankList = ()=>fetchP("DDT_TC_MEMBER_BANK_CARDLIST",{},true);


/**
 * @author wangxinhui@ddtkj.com
 * @since 2018-08-02
 * @param id 银行卡id
 * @description 删除卡列表
 */
let fetchDeleteBank= (id)=>fetchP("DDT_TC_MEMBER_BANK_DELETECARD",{id});



/**
 * @author wangxinhui@ddtkj.com
 * @since 2018-08-02
 * @param realName 持卡人
 * @param bankName 开户行
 * @param bankSubName 开户支行
 * @param cardNo 卡号
 * @param province 省
 * @param city 市
 * @param area 县
 * @param submitToken
 * @description 添加银行卡列表
 */
let fetchAddBank= (data)=>fetchP("DDT_TC_MEMBER_BANK_ADDCARD",data);


/**
 * @author wangxinhui@ddtkj.com
 * @since 2018-08-03
 * @param id       银行卡id
 * @param realName 持卡人
 * @param bankName 开户行
 * @param bankSubName 开户支行
 * @param cardNo 卡号
 * @param province 省
 * @param city 市
 * @param area 县
 * @param submitToken
 * @description 编辑银行卡列表
 */
let fetchEditBank= (data)=>fetchP("DDT_TC_MEMBER_BANK_CARDUPDATE",data);





export {
    fetchBankList,
    fetchDeleteBank,
    fetchAddBank,
    fetchEditBank
}