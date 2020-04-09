
import {
	imgBaseUrl,
} from 'src/config/env'

//资金记录图标
import wxIcon from 'src/module/common/member/module/wallet/images/icon_wx.png'
import zfbIcon from 'src/module/common/member/module/wallet/images/icon_zfb.png'
import yhkIcon from 'src/module/common/member/module/wallet/images/icon_yhk.png'
import dsfIcon from 'src/module/common/member/module/wallet/images/icon_dsf.png'
import tcIcon from 'src/module/common/member/module/wallet/images/icon_tc.png'
import zbIcon from 'src/module/common/member/module/wallet/images/icon_zb.png'
import xxIcon from 'src/module/common/member/module/wallet/images/icon_xx.png'
import dsIcon from 'src/module/common/member/module/wallet/images/icon_ds.png'

import ptIcon from 'src/module/common/member/module/wallet/images/icon_pt.png'
import yhIcon from 'src/module/common/member/module/wallet/images/icon_yh.png'
import xnIcon from 'src/module/common/member/module/wallet/images/icon_wxzc.png'

import defaultImg from 'src/images/loading.png'

exports.install = function(Vue, options) {
	/**
	* 图片服务器地址
	*/
	Vue.filter('imgUrl', (url) => {
		if (url) {
			if (url.indexOf('http://') == -1 && url.indexOf('https://') == -1 && url.indexOf(';base64,') == -1) {
				return imgBaseUrl + url;
			} else {
				return url;
			}
		} else {
			return defaultImg;
		}
	})


	/**
	* @author wangyalin@ddtkj.com
	* @since 2017-5-23
	* @description  佣金-时间过滤器
	*/
	Vue.filter('date', (time, format,isNullFormat) => {
		if (time) {
			if (typeof(time) == "string" && time.indexOf('-') > -1 && time.indexOf(':') > -1) { //为字符串时间格式
				return time;
			}else{
				time = parseInt(time);
			}
			let d = new Date(time);
			if (!d) {
				return time;
			}
			let Y = d.getFullYear();
			let Mo = d.getMonth() + 1 < 10 ? '0' + (d.getMonth() + 1) : d.getMonth() + 1;
			let D = d.getDate() < 10 ? '0' + d.getDate() : d.getDate();
			let H = d.getHours() < 10 ? '0' + d.getHours() : d.getHours();
			let Mi = d.getMinutes() < 10 ? '0' + d.getMinutes() : d.getMinutes();
			let S = d.getSeconds() < 10 ? '0' + d.getSeconds() : d.getSeconds();
			let SS = '';
			if (d.getMilliseconds() < 10) {
				SS = '00' + d.getMilliseconds();
			} else if (d.getMilliseconds() < 100) {
				SS = '0' + d.getMilliseconds();
			} else {
				SS = d.getMilliseconds();
			}
			if(format){
				return format.replace("yyyy",Y)
				.replace("MM",Mo)
				.replace("dd",D)
				.replace("HH",H)
				.replace("mm",Mi)
				.replace("ss",S)
				.replace("SSS",SS)
			}else { //default format   'yyyy-MM-dd HH:mm:ss'
				return Y + '-' + Mo + '-' + D + ' ' + H + ':' + Mi + ':' + S;
			}
		} else {
			if(isNullFormat){
				return isNullFormat
			}
			return "";
		}
	});
	/**
	*
	*/
	Vue.filter('site', (site, num) => {
		return site.substring(site.length - num);
	});
	/**
	* @author songlingfang@ddtkj.com
	* @since 2017-8-14
	* @description  数字过滤器
	* 根据传入字符串,获取到固定位数的小数
	*/
	Vue.filter('number', (figure, num = 2) => {
		if (typeof figure == "undefined") {
			return;
		}
		var n = parseFloat(figure)||0;
		return n.toFixed(num);

	});

	/**
	* @author wangyalin@ddtkj.com
	* @since 2017-12-5
	* @description  格式化  cardbank 银行卡 idNumber 身份证 realName真实姓名 qyName企业名称 qyCode 注册号/统一社会信用代码
	*/
	Vue.filter('format', (str, type) => {
		if (!str) {
			return "";
		}
		if (type == 'bankCard') {
			str = str.replace(/^(\d{4})\d+(\d{4})$/, "$1**** ****$2");
		} else if (type == 'bankCard2') {
			str = str.replace(/\s/g, '').replace(/[^\d]/g, '').replace(/(\d{4})(?=\d)/g, '$1-');
			if (str.length <= 4) {
				str = '尾号' + str;
			}
		} else if (type == 'idNumber') {
			str = str.substr(0, 4) + new Array(str.length - 7).join('*') + str.substr(str.length - 4);
		} else if (type == 'realName') {
			str = str.substr(0, 1) + new Array(str.length).join('*');
		} else if (type == 'qyName') {
			if (str.length > 5) {
				str = str.substr(0, 2) + new Array(str.length - 5).join('*') + str.substr(str.length - 4);
			}
		} else if (type == 'qyCode') {
			str = str.substr(0, 3) + new Array(str.length - 3).join('*');
		} else if (type == 'qyLicense') { //只显示后四位的 注册号/统一社会信用代码
			str = new Array(str.length - 3).join('*') + str.substr(str.length - 4);
		}
		return str;
	})


	/**
	* @author wangyalin@ddtkj.com
	* @since 2018-4-24
	* @description  手机号加密展示
	*/
	Vue.filter('formatMoblie', (mobile) => {
		mobile = mobile.substr(0, 3) + '****' + mobile.substr(7);
		return mobile;
	})




	/**
	* @author wangxinhui@ddtkj.com
	* @since 2018-7-31
	* @description  资金记录-icon
	*/
	Vue.filter('iconType', (type) => {
		if (!type) {
			return "";
		}
		let typeImg = "";
		//withdrawals 提现 
		type = type.toLowerCase();
		switch (type) {
			case "withdrawals":
			typeImg = yhkIcon;
			break;
			default:
			typeImg = tcIcon;
			break;
		}
		return typeImg;
	})
	/**
	* @author wangxinhui@ddtkj.com
	* @since 2018-7-31
	* @description  资金记录-交易类型
	*/
	Vue.filter('categoryType', (type) => {
		if (!type) {
			return "";
		}
		let typeName = "";
		switch (type) {
			case "recharge":
			typeName = '充值';
			break;
			case "purchase_service":
			typeName = '服务支付';
			break;
			case "withdrawals":
			typeName = "提现";
			break;
			case "transaction_success":
			typeName = '交易成功';
			break;
			case "transaction_fail":
			typeName = "交易失败";
			break;
			case "online_notice_buy":
			typeName = "订阅上线提醒";
			break;
			case 'earnestMoney':
			typeName = "诚意金";
			break;
			case 'get_up_early_buy'://余额
			typeName = "早起打卡";
			break;
			case 'sales_of_service'://兑换
			typeName = "服务收入";
			break;
			case "exchange_of_diamonds":
			typeName = "钻石兑换";
			break;
			case "exchange_of_service":
			typeName = "钻石支付";
			break;
			case "vip_buy":
			typeName = "vip购买";
			break;
			case "vip_buy_send_brokerage":
			typeName = "购买VIP赠送邀请人佣金";
			break;
			case "deposit_pay":
			typeName = "保证金支付";
			break;
			case "deposit_fine":
			typeName = "保证金罚款";
			break;
			case "deposit_refund":
			typeName = "保证金退出";
			break;
			case "platform_order":
			typeName = "订单";
			break;
			case "skill_recommend":
			typeName = "技能推荐位购买";
			break;
			case "early_bonus":
			typeName = "打卡分红";
			break;
		}
		return typeName;
	})
	
	/**
	* @author wangxinhui@ddtkj.com
	* @since 2018-7-31
	* @description  资金记录-入账、出账、冻结、解冻类型
	*/
	Vue.filter('flowType', (type) => {
		if (!type) {
			return "";
		}
		let flowType = "";
		switch (type) {
			case "recharge":
			flowType = '入账';
			break;
			case "balance_income":
			flowType = '入账';
			break;
			case "balance_income_sina_cgq":
			flowType = '入账';
			break;
			case "brokerage_income":
			flowType = '入账';
			break;
			case "brokerage_refund":
			flowType = '入账';
			break;
			case "balance_refund":
			flowType = '入账';
			break;
			case "income_refund":
			flowType = '入账';
			break;
			case "balance_expend":
			flowType = '出账';
			break;
			case "brokerage_expend":
			flowType = '出账';
			break;
			case "income_expend":
			flowType = '出账';
			break;
			case "consume":
			flowType = '出账';
			break;
			case "withdrawals":
			flowType = '出账';
			break;
			case "balance_frozen":
			flowType = '冻结';
			break;
			case "brokerage_frozen":
			flowType = '冻结';
			break;
			case "income_frozen":
			flowType = '冻结';
			break;
			case "thaw_back_balance":
			flowType = '解冻';
			break;
			case "thaw_back_brokerage":
			flowType = '解冻';
			break;
			case "thaw_back_income":
			flowType = '解冻';
			break;
		}
		return flowType;
	})
	/**
	* @author wangxinhui@ddtkj.com
	* @since 2018-7-31
	* @description  充值记录-图标
	*/
	Vue.filter('payType', (type) => {
		if (!type) {
			return "";
		}
		let typeImg = "";
		//微信weixin    支付宝  zfb   银行卡 bank  线下xianxia  第三方dsf 同城 tc  众包zb  打赏ds
		type = type.toLowerCase();
		switch (type) {
			case "weixin":
			typeImg = wxIcon;
			break;
			case "zfb":
			typeImg = zfbIcon;
			break;
			case "bank":
			typeImg = yhkIcon;
			break;
			case "xianxia":
			typeImg = xxIcon;
			break;
			case "dsf":
			typeImg = dsfIcon;
			break;
			case "tc":
			typeImg = tcIcon;
			break;
			case 'income'://收入
			typeImg = tcIcon;
			break;
			case 'balance'://余额
			typeImg = tcIcon;
			break;
			case 'exchange'://兑换
			typeImg = tcIcon;
			break;
			case "zb":
			typeImg = zbIcon;
			break;
			case "consume":
			typeImg = dsIcon;
			break;
			case "group":
			typeImg = ptIcon;
			break;
			case "fuel":
			typeImg = yhIcon;
			break;
			case "ddt":
			typeImg = yhIcon;
			break;
			case "xn":
			typeImg = xnIcon;
			break;
		}
		return typeImg;
	})
	/**
	* @author wangyalin@ddtkj.com
	* @since 2018-7-31
	* @description  性别
	*/
	Vue.filter('gender',(val) => {
		if (!val) {
			return '不限';
		}
		if(val == 'male'){
			return '男'
		}else{
			return '女'
		}
	})
	/**
	* @author wangyalin@ddtkj.com
	* @since 2018-7-31
	* @description  服务方式
	*/
    Vue.filter('serviceType',(val) => {

		if (!val) {
			return '';
		}
		let type = '';
		switch (val) {
			case 'online':
		    type = '线上技能'
			break;
			case 'offline':
			type = '线下技能'
			break;
			case 'phone':
		    type = '电话咨询'
			break;
			default:
			type = '视频咨询'
		}
		return type;
	})
    //需求状态 过滤器
    Vue.filter('inviteStatus',(val) => {

		if (!val) {
			return '';
		}
		let type = '';
		switch (val) {
			case 'processing':
		    type = '进行中'
			break;
			case 'complete':
		    type = '已完成'
			break;
			case 'expired':
		    type = '已过期'
			break;
			default:
			type = '其他'
		}
		return type;
	})
	
	//分秒转换
	Vue.filter('secondTime',(val) => {
		if (val) {
			let t;
			if (val > -1) {
				var min = Math.floor(val/60) % 60;
				var sec = val % 60;
	
				if(min < 10){t += "0";}
				t = min + ":";
				if(sec < 10){t += "0";}
				t += sec;
			}
			return t;
		}
	})

}
