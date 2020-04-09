import {imgBaseUrl} from 'src/config/env'//图片基本路径
exports.install = function(Vue, options) {
    Vue.prototype.isImg = function(v) {
        if (!v) {
            return;
        }
        let flag = false;
        let extStart = v.lastIndexOf(".");
        let ext = v.slice(extStart).toUpperCase();
        if (ext == ".BMP" || ext == ".PNG" || ext == ".GIF" || ext == ".JPG" || ext == ".JPEG") {
            flag = true;
        }
        return flag;
    };
    Vue.prototype.isCardID = function(sId) {
        let aCity = {
            11: "北京",
            12: "天津",
            13: "河北",
            14: "山西",
            15: "内蒙古",
            21: "辽宁",
            22: "吉林",
            23: "黑龙江",
            31: "上海",
            32: "江苏",
            33: "浙江",
            34: "安徽",
            35: "福建",
            36: "江西",
            37: "山东",
            41: "河南",
            42: "湖北",
            43: "湖南",
            44: "广东",
            45: "广西",
            46: "海南",
            50: "重庆",
            51: "四川",
            52: "贵州",
            53: "云南",
            54: "西藏",
            61: "陕西",
            62: "甘肃",
            63: "青海",
            64: "宁夏",
            65: "新疆",
            71: "台湾",
            81: "香港",
            82: "澳门",
            91: "国外"
        };
        let iSum = 0;
        let info = "";
        if (!/^\d{17}(\d|X)$/.test(sId)) return "你输入的身份证长度或格式错误";
        sId = sId.replace(/x$/i, "a");
        if (aCity[parseInt(sId.substr(0, 2))] == null) return "你的身份证地区非法";
        let sBirthday = sId.substr(6, 4) + "-" + Number(sId.substr(10, 2)) + "-" + Number(sId.substr(12, 2));
        let d = new Date(sBirthday.replace(/-/g, "/"));
        if (sBirthday != (d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate())) return "身份证上的出生日期非法";
        for (var i = 17; i >= 0; i--) iSum += (Math.pow(2, i) % 11) * parseInt(sId.charAt(17 - i), 11);
        if (iSum % 11 != 1) return "你输入的身份证号非法";
        return true;
    };
    /*
	 * 对头条的处理
	 * &${mid}&^${headPhoto}^${nickname}在@${time}@发布了身边动态
	 * ^^括住的是头像
	 * &&括住的是mid--mid是用来点击头像跳转地址用的
	 * @@括住的是需要变色处理的
	 * content 需要处理的内容
	 * onlyTxt 是否只要文字
	 * isLink  点击头像是否跳转
	 */
	Vue.prototype.formateHeadLine = function(content,onlyTxt,isLink){
		if(!content){
			return '';
		}
		if(onlyTxt){
			content = content.replace(/\^([^\^]*)\^/g,'').replace(/\&[^\&]*\&/g,'').replace(/\@([^\@]*)\@/g,'<em>$1</em>');
		}else{
			if(isLink){
				let mid = content.match(/\&[^\&]*\&/g)?content.match(/\&[^\&]*\&/g):[];
				for(let i=0;i<mid.length;i++){
					content=content.replace(/\^([^\^]*)\^/,`<img src="${imgBaseUrl}$1" onclick="toOtherHome(${mid[i].slice(1,-1)})"/>`)
				}
				content = content.replace(/\&[^\&]*\&/g,'').replace(/\@([^\@]*)\@/g,'<em>$1</em>');
			}else{
				content = content.replace(/\^([^\^]*)\^/g,`<img src="${imgBaseUrl}$1"/>`).replace(/\&[^\&]*\&/g,'').replace(/\@([^\@]*)\@/g,'<em>$1</em>');
			}
		}
		return content;
	};
}
//去个人主页
window.toOtherHome = function(mid){
	window.$router.push("/otherHome?mid="+mid);
}