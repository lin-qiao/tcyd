import {fetchP} from 'src/config/fetch'
/**
* @author houlijun@ddtkj.com
* @since 2018-07-31
* @description 修改昵称
* @param {string} nickName 昵称 
*/
var fetchEditNickname = (nickName) => fetchP('DDT_TC_MEMBER_SAVENICKNAME',{nickName});
/**
* @author houlijun@ddtkj.com
* @since 2018-08-10
* @description 修改头像
* @param {string} headPhoto 头像
*/
var fetchEditAvatar = (headPhoto) => fetchP('DDT_TC_MEMBER_SAVEICONS',{headPhoto});
/**
* @author houlijun@ddtkj.com
* @since 2018-07-31
* @description 修改个人简介
* @param {string} introduction 个人简介
*/
var fetchEditIntroduction = (introduction) => fetchP('DDT_TC_MEMBER_UPDATEINTRC',{introduction});
/**
* @author houlijun@ddtkj.com
* @since 2018-07-31
* @description 根据id获取收货地址
* @param {Int} id 收货地址id
*/
var fetchAddress = (id) => fetchP('DDT_TC_MEMBER_ADDRESS_ADDRESSUPDATEVIEW',{id},true);
/**
* @author houlijun@ddtkj.com
* @since 2018-07-31
* @description 获取收货地址列表
*/
var fetchAddressList = () => fetchP('DDT_TC_MEMBER_ADDRESS_ADDRESSLIST',{},true);
/**
* @author houlijun@ddtkj.com
* @since 2018-07-31
* @description 添加收货地址
* @param {String} name 收件人姓名
* @param {String} phone 手机号
* @param {String} province 省
* @param {String} city 市
* @param {String} county 县
* @param {String} detailAddress 详细地址
* @param {String} isDefault 是否默认Y/N
* @param {String} submitToken token
*/
var fetchAddAddress = (data) => fetchP('DDT_TC_MEMBER_ADDRESS_ADDRESSADD',data);
/**
* @author houlijun@ddtkj.com
* @since 2018-07-31
* @description 删除收货地址
* @param {Int} id 收货地址id
*/
var fetchDeleteAddress = (id) => fetchP('DDT_TC_MEMBER_ADDRESS_ADDRESSDELETE',{id});
/**
* @author houlijun@ddtkj.com
* @since 2018-07-31
* @description 修改收货地址
* @param {Int} id 收货地址id
* @param {String} name 收件人姓名
* @param {String} phone 手机号
* @param {String} province 省
* @param {String} city 市
* @param {String} county 县
* @param {String} detailAddress 详细地址
* @param {String} isDefault 是否默认Y/N
* @param {String} submitToken token
*/
var fetchUpdateAddress = (data) => fetchP('DDT_TC_MEMBER_ADDRESS_ADDRESSUPDATE',data);
/**
* @author houlijun@ddtkj.com
* @since 2018-07-31
* @description 设置默认收货地址
* @param {Int} id 收货地址id
*/
var fetchSetDefaultAddress = (id) => fetchP('DDT_TC_MEMBER_ADDRESS_ADDRESSISDEFAULT',{id});


export {
	fetchEditNickname,
	fetchEditAvatar,
	fetchEditIntroduction,
	fetchAddress,
	fetchAddressList,
	fetchAddAddress,
	fetchDeleteAddress,
	fetchUpdateAddress,
	fetchSetDefaultAddress
}