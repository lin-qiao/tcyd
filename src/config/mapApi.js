/**	
 * @description wap 站点定位 集合 微信定位及 高德定位 根据运行环境 判断
 * @author gaoxiaopeng@ddtkj.com
 * @time   2018-11-2
 */


import {wechatSystem} from 'src/config/env'
import {fetchLocation} from 'src/service/getData'
import {wechatGetLocation} from 'src/config/wechatUtils'


import state from 'src/store/state' //全局变量 定位状态
/**
 * @description 定位 根据 运行环境 判断 使用微信定位还是高德定位
 * @author gaoxiaopeng@ddtkj.com
 */
export const wechat_Or_geoLocation = () => {
	state.locationStatus=false;//重置定位状态 ，定位成功后会自动 被监听到
    if (wechatSystem) { //微信环境 优先使用微信定位
        wechatGetLocation(function(res) {
			console.log("微信定位---解析定位结果")
            var latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
            var longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
			window.LON = sessionStorage.LON =longitude //经度
			window.LAT = sessionStorage.LAT = latitude //纬度
            var speed = res.speed; // 速度，以米/每秒计
            var accuracy = res.accuracy; // 位置精度 */
            //高德 逆向地理编码 解析
            if (latitude && longitude) { //微信定位成功，根据经纬度 调用 高德 api  解析成详细地址信息
                gdApiToAddress(latitude, longitude);
            } else { //微信定位失败 ，开启高德定位
                gdApiGetLocation();
            }
        })
    } else { //非微信环境  调用 高德定位
        gdApiGetLocation();
    }
}
/**
 * @description 高德接口 逆向地理编码方法
 * @param {Array} lnglat = [116.396574, 39.992706]
 */
export const gdApiToAddress = (latitude, longitude) => {
    AMap.plugin('AMap.Geocoder', function() {
        var geocoder = new AMap.Geocoder({
            // city 指定进行编码查询的城市，支持传入城市名、adcode 和 citycode
            city: '010'
        })
        var lnglat = [longitude, latitude]
        geocoder.getAddress(lnglat, function(status, result) {
            if (status === 'complete' && result.info === 'OK') {
                // result为对应的地理位置详细信息
                onComplete(result.regeocode)
            } else {
                onError(result)
            }
        })
    })
}
/**
 * @description 高德 定位
 * @param {Boolen} lng
 * @param {Boolen} lat
 */
export const gdApiGetLocation = () => {
    AMap.plugin('AMap.Geolocation', function() {
        var geolocation = new AMap.Geolocation({
            enableHighAccuracy: true, //是否使用高精度定位，默认:true
            timeout: 10000, //超过10秒后停止定位，默认：5s
            buttonPosition: 'RB', //定位按钮的停靠位置
            buttonOffset: new AMap.Pixel(10, 20), //定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
            zoomToAccuracy: true, //定位成功后是否自动调整地图视野到定位点
        });
        geolocation.getCurrentPosition(function(status, result) {
            if (status == 'complete') {
				console.log("高德定位")
                onComplete(result)
            } else {
                onError(result)
            }
        });
    });
}
/**
 * @descrtion 解析定位结果,赋值到 window 对象，并缓存到
 * @param {JSON} 高德api 返回的 地址结果
 */
export const onComplete = (data) => {
    console.log("定位成功---解析定位结果")
    let _data = data.addressComponent
	if(data.position){
		window.LON = sessionStorage.LON = data.position.getLng() //经度
		window.LAT = sessionStorage.LAT = data.position.getLat() //纬度
	}
    window.PROVINCE = sessionStorage.PROVINCE = _data.province //省
    window.CITY = sessionStorage.CITY = _data.city //市
    window.COUNTY = sessionStorage.COUNTY = _data.district //区
    window.STREET = sessionStorage.STREET = _data.street //街道
    window.TOWNSHIP = sessionStorage.TOWNSHIP = _data.township; // 例如 "太原高新技术产业开发区"
    window.PROVINCECODE = sessionStorage.PROVINCECODE = _data.adcode.substring(0, 2) + "0000"
    window.CITYCODE = sessionStorage.CITYCODE = _data.adcode.substring(0, 4) + "00"
    window.COUNTYCODE = sessionStorage.COUNTYCODE = _data.adcode //区code
    window.ADDRESS = sessionStorage.ADDRESS = data.formattedAddress; //详细地址
    window.ACCURACY = sessionStorage.ACCURACY = data.accuracy || 0; //是否具有偏移
    
    state.locationStatus=true;//定位成功，修改定位状态
    
    //定位成功，把客户端 地址信息 传递到服务器
    let params = {
        latitude: LAT, //纬度
        longitude: LON, //经度
        accuracy: ACCURACY, //精度信息
        address: ADDRESS, //地址
        country: "中国", //国家信息
        province: PROVINCE, //省信息
        city: CITY, //地市信息
        district: COUNTY, //地区信息
        street: STREET, //街道信息
        adCode: COUNTYCODE, //地区编码
        cityCode: CITYCODE //城市编码
    }
    //调用 后端接口 传递信息
    fetchLocation(params).then(res => {
        if (res.status) {
            console.log("定位信息成功传递到服务端--定位结束")
        } else {
            console.log("定位信息未成功传递到服务端--定位结束")
        }
    })
}
/**
 * @descrtion 解析定位错误信息
 * @param {JSON} 高德api 返回的错误信息
 */
export const onError = (data) => {
	 state.locationStatus=true;//定位成功，修改定位状态
    console.log(data.message)
}