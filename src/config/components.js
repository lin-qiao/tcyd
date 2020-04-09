//日历组件
import { Picker } from 'mint-ui'
//下拉/上拉刷新
import {Loadmore } from 'mint-ui'
//弹出框
import { Popup } from 'mint-ui';
//开关
import { Switch } from 'mint-ui';

//挂载全局公用组件
//头部
import top from 'src/components/top';
//无数据
import nodata from 'src/components/nodata'

exports.install = function (Vue, options) {
    //日历组件
	Vue.component(Picker.name, Picker);
	//下拉/上拉刷新
	Vue.component(Loadmore.name, Loadmore);
	//弹出框
	Vue.component(Popup.name, Popup);
	//开关
	Vue.component(Switch.name, Switch);
	//头部
	Vue.component('top', top);
	//无数据
	Vue.component('nodata', nodata);
}
