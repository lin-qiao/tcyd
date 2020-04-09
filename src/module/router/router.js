import App from 'src/App'
//首页
import indexRouter from '../index/router/router'
//个人中心
import memberRouter from '../member/router/router'
//技能发布
import skillPublishRouter from '../skillPublish/router/router'
//需求发布
import demandPublishRouter from '../demandPublish/router/router'
//技能管理
import skillManageRouter from '../skillManage/router/router'
//需求管理
import demandManageRouter from '../demandManage/router/router'
//他人主页
import otherRouter from '../other/router/router'
//站长
import stationRouter from '../station/router/router'

//demo
//import demoRouter from '../demo/router/router'
export default [
	{
		path: '/',
		component: App, //顶层路由，对应index.html
		children: [ //二级路由。对应App.vue
			//地址为空时跳转index页面
			{
				path: '',
				redirect: '/index'
			},
		].concat(otherRouter).concat(indexRouter).concat(memberRouter).concat(skillPublishRouter).concat(skillManageRouter).concat(demandManageRouter).concat(demandPublishRouter).concat(stationRouter)
	}
]


