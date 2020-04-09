import App from '../App'
//公用页面
import commonRouter from '../module/common/router/router'
//tc路由
import tcRouter from '../module/router/router'


export default [{
	path: '/',
	component: App, //顶层路由，对应index.html
	children: [ //二级路由。对应App.vue
		//地址为空时跳转index页面
		{
			path: '',
			redirect: '/index'
		}
	].concat(tcRouter).concat(commonRouter)
}]
