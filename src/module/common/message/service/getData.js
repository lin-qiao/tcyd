import {fetchP} from 'src/config/fetch'

/**
* @author shangliqun@ddtkj.com
* @since 2018-08-07
* @param code accountIncomeOut：交易提醒     brokerageIncomeLetter：佣金收入       goodsSend：商品发货给买家发送站内信
* @description 获取消息中心模块数据
*/
var fetchMessageList = (code,page,size) => fetchP('DDT_TC_CMS_NOTICE_MESSAGECODE',{code,page,size});

/**
* @author shangliqun@ddtkj.com
* @since 2018-08-07
* @param code messageIds：id     flag：是否已读  
* @description 批量标记站内信接口
*/
var fetchBatchSignMail = (messageIds,flag) => fetchP('DDT_TC_CMS_BATCH_SIGN_MAIL',{messageIds,flag});

export {
    fetchMessageList,
    fetchBatchSignMail
}
