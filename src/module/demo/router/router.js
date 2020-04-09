//formItem
const formDemo = r => require.ensure([], () => r(require('../page/formDemo')), 'formDemo')
//item
const itemDemo = r => require.ensure([], () => r(require('../page/itemDemo')), 'itemDemo')
//item
const uploadDemo = r => require.ensure([], () => r(require('../page/uploadDemo')), 'uploadDemo')


export default [
	//layer
	{
		path: 'formDemo',
		component: formDemo
	},
	//item
	{
		path: 'itemDemo',
		component: itemDemo
	},
	//item
	{
		path: 'uploadDemo',
		component: uploadDemo
	}
]
