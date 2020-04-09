
//登录，注册
import accountRouter from '../account/router/router'
//个人中心
import memberRouter from '../member/router/router'
//消息中心
import messageRouter from '../message/router/router'
export default [
].concat(memberRouter).concat(accountRouter).concat(messageRouter)


