import {fetchP} from 'src/config/fetch';
/**
* @author zhanghao@ddtkj.com
* @since 2018-08-13
* @description 获取技能推荐位列表
*/
export const fetchPayList = () => fetchP('DDT_TC_MEMBER_PAYLIST',{},true);
/**
* @author zhanghao@ddtkj.com
* @since 2018-08-13
* @description 获取技能推荐位详情
* @param {Int} id 购买主键id
*/
export const fetchPayDetail = (id) => fetchP('DDT_TC_MEMBER_SINGLEINFO',{id},true);
/**
* @author zhanghao@ddtkj.com
* @since 2018-08-13
* @description 付费技能购买默认展示信息
*/
export const fetchDefaultList = () => fetchP('DDT_TC_MEMBER_DEFAULTLIST',{},true);
/**
* @author zhanghao@ddtkj.com
* @since 2018-08-13
* @description 根据上述类目、城市编码查询价格信息
* @param {int} skillSubCategory 二级类目id
* @param {String} cityCode 城市编码
* @param {String} position 位置
*/
export const fetchPriceInfo = (skillSubCategory,cityCode,position) => fetchP('DDT_TC_MEMBER_SEARCHPRICE',{skillSubCategory,cityCode,position},true);
/**
* @author zhanghao@ddtkj.com
* @since 2018-08-14
* @description 付费技能购买下单支付生成购买记录
* @param {int} id 价格id
* @param {String} submitToken token避免重复提交
* @param {String} startDate 开始时间
* @param {String} endDate 结束时间
*/
export const fetchCreateInfo = (data) => fetchP('DDT_TC_MEMBER_CREATEINFO',data);
/**
* @author zhanghao@ddtkj.com
* @since 2018-08-14
* @description 选择支付方式对应展示信息查询
* @param {int} id 购买主键id
*/
export const fetchPayInfo = (id) => fetchP('DDT_TC_MEMBER_PAYINFO',{id},true);
/**
* @author zhanghao@ddtkj.com
* @since 2018-08-14
* @description 付费技能购买支付接口
* @param {int} id 购买主键id
* @param {String} submitToken token避免重复提交
* @param {String} accountTypeEnums balance,income,brokerage
*/
export const paySuccess = (id,submitToken,accountTypeEnums) => fetchP('DDT_TC_MEMBER_SUCCESS',{id,submitToken,accountTypeEnums});
/**
* @author songlingfang@ddtkj.com
* @since 2018-09-13
* @description 获取城市列表
*/
export const fetchCityList = (skillSubCategory,position='index') => fetchP('DDT_TC_MEMBER_SEARCHCITY',{skillSubCategory,position},true);