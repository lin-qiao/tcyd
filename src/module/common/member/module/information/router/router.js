//个人资料
const information = r => require.ensure([], () => r(require('../page/information')), 'information')
//修改昵称
const editNickname = r => require.ensure([], () => r(require('../page/editNickname')), 'editNickname')
//修改头像
const editAvatar = r => require.ensure([], () => r(require('../page/editAvatar')), 'editAvatar')
//我的简介
const editIntroduce = r => require.ensure([], () => r(require('../page/editIntroduce')), 'editIntroduce')
//我的收货地址
const addressList = r => require.ensure([], () => r(require('../page/addressList')), 'addressList')
//添加收货地址
const addAddress = r => require.ensure([], () => r(require('../page/addAddress')), 'addAddress')

export default [
	//个人资料
	{
		path:'information',
		component:information,
		name:'information'
	},
	//修改昵称
	{
		path:'editNickname',
		component:editNickname,
		name:'editNickname'
	},
	//修改头像
	{
		path:'editAvatar',
		component:editAvatar,
		name:'editAvatar'
	},
	//我的简介
	{
		path:'editIntroduce',
		component:editIntroduce,
		name:'editIntroduce'
	},
	//我的收货地址
	{
		path:'addressList',
		component:addressList,
		name:'addressList'
	},
	//添加收货地址
	{
		path:'addAddress',
		component:addAddress,
		name:'addAddress'
	}
]
