<!-- 安全中心 -->
<template>
	<div>
		<top title="安全中心" :isReturn="false"></top>
		<dl>
			<dt>实名认证</dt>
			<dd>
				<cell
					title="实名认证"
					:value="checkStatus == 'live_pass'? '已认证' : '未认证'"
					icon="icon-shimingrenzheng1"
					color="#7dc8ff"
					isLink
					:handleClick="toApprove">
				</cell>
				<!--<cell
					title="技能认证"
					:value="info.skillCount+'个技能认证'"
					icon="icon-jineng"
					color="#ffb178"
					isLink
					:handleClick="toSkill">
				</cell>-->
				<cell
					title="手机认证"
					value="修改"
					icon="icon-shoujirenzheng"
					color="#7da7fd"
					isLink
					to="/changePhone">
				</cell>
			</dd>
			<dt>安全中心</dt>
			<dd>
				<cell
					title="登录密码"
					icon="icon-mimarenzheng"
					color="#5d97ff"
					isLink
					:handleClick="toLoginPwd">
				</cell>
				<cell
					title="支付密码"
					icon="icon-shoujirenzheng"
					color="#65c4ff"
					isLink
					:handleClick="toPayPwd">
				</cell>
			</dd>
			 <dt>认证中心</dt>
			<dd>
				<!-- <cell
					title="电子邮箱认证"
					icon="icon-youxiang2"
					color="#ffb178"
					value="未认证"
					isLink>
				</cell> -->
				<cell
					title="微信认证"
					icon="icon-weixin-copy"
					color="#7cbc29"
					:value="status[info.wx_bind]"
					:handleClick="bindWx"
					isLink>
				</cell>
				<!-- <cell
					title="QQ认证"
					icon="icon-qq"
					color="#7dc8ff"
					:value="status[info.qq_bind]"
					isLink>
				</cell> -->
				<!--<cell
					title="微博认证"
					icon="icon-weibo"
					color="#fc807a"
					:value="status[info.wb_bind]"
					:handleClick="bindWb"
					isLink>
				</cell>-->
				<!-- <cell
					title="支付宝认证"
					icon="icon-zhifubao1"
					color="#809afd"
					value="未认证"
					isLink>
				</cell>
				<cell
					title="芝麻信用认证"
					icon="icon-zhimaxinyong"
					color="#65c4ff"
					value="此功能开发中">
				</cell> -->
			</dd>
		</dl>
	</div>
</template>

<script>
import cell from 'src/components/item/itemCell'; //单元格
import {
	fetchGetMemberInfo,  //获取安全中心信息
	fetchbindWx,  //绑定微信
	fetchbindSina, //绑定微博
	fetchRemoveWx, //解绑微信
	fetchRemoveSina, //解绑微博
	fetchUnBindThirdPlatform, //解绑第三方平台
	fetchGetmemberbyucid, //查询认证信息
} from '../service/getData'


import {fetchLogOut} from '../../set/service/getData'
export default {
	data() {
		return {
			info:{ //安全中心信息
				skillCount:0, //技能认证数量
				isReal:'N',  //真实姓名
				is_tradePswd:'N',   //交易密码
				is_pwd:'N',   //登录密码
				qq_bind:'N',  //qq绑定
				wx_bind:'N',  //微信绑定
				wb_bind:'N',  //微博绑定
			},
			checkStatus:'', //认证状态
			status:{
				Y:'已认证',
				N:'未认证'
			},
		}
	},
	components: {
		cell
	},
	activated(){
		fetchGetMemberInfo().then(res => {
			if(res && res.status){
				this.info = res.data;
			}
		})
		fetchGetmemberbyucid().then( res => {
			if(res && res.status && res.data.memberRealName){
				this.checkStatus = res.data.memberRealName.checkStatus;
			}
		})
	},
	mounted(){

	},
	methods: {
		//绑定微信
		bindWx(){
			//解绑
			if(this.info.wx_bind == 'Y'){
				this.$confirm({
					content:"确定解绑吗？",
					confirm:()=>{
						this.unbindWx();
					}
				})
				
			}
			//绑定
			// else{
			// 	var open_window=window.open('_blank');
			// 	fetchbindWx().then(res => {
			// 		if(res.status){
			// 		  open_window.location.href='';
			// 		  open_window.focus();
			// 		  var html=res.data;
			// 		  open_window.document.write(html);
			// 		}
			// 	})
			// }
		},
		unbindWx(){
			fetchUnBindThirdPlatform('wx').then(res => {
				if(res.status){
					alertTip('解绑成功');
					this.info.wx_bind = 'N';
					if(this.$store.state.wechatSystem){
						//服务器名称 DDT_TC_MEMBER_LOGOUT
						fetchLogOut().then(res => {
							if(res.status){
								alertTip(res.msg,()=>{
									let openid=sessionStorage.openid;
									sessionStorage.clear(); //清除 当前所有会话缓存
									localStorage.clear(); //清除 当前所有本地缓存
									sessionStorage.openid=openid;
									this.$router.replace('/login');
								});
							}else{
								alertTip(res.msg);
							}
						});
					}
				}
			})
		},
		//绑定微博
		bindWb(){
			//解绑
			if(this.info.wx_bind == 'Y'){
				fetchRemoveSina().then(res => {
					if(res.status){
						alertTip('解绑成功');
						this.info.wb_bind = 'N';
					}
				})
			}
			//绑定
			else{
				var open_window=window.open('_blank');
				fetchbindSina().then(res => {
					if(res.status){
					  open_window.location.href='';
					  open_window.focus();
					  var html=res.data;
					  open_window.document.write(html);
					}
				})
			}
		},
		//跳转认证
		toApprove(){
			if(this.checkStatus == 'live_pass'){
				return;
			}else if(this.checkStatus == 'auth_pass'){
				this.$router.push('/faceApprove');
			}else{
				this.$router.push('/personApprove')
			}
		},
		// 跳转技能认证
		toSkill(){
			if(this.info.isReal == 'N'){
				this.$alert({
					content:'实名认证通过审核后，才能技能认证哦',
					confirmBtn:'立即实名认证',
					confirm:()=>{
						this.toApprove()
					}
				})
				return;
			}
			this.$router.push('/skillApprove')
		},
		//跳转支付页面
		toPayPwd(){
			if(this.info.is_tradePswd== 'N'){
				this.$router.push({
					path: '/setPayPwd'
      			})
			}else{
				this.$router.push({
					path: '/changePayPwd'
      			})
			}
		},
		//跳转登录密码页面
		toLoginPwd(){
			if(this.info.is_pwd== 'N'){
				this.$router.push({
					path: '/setLoginPwd'
      			})
			}else{
				this.$router.push({
					path: '/changePwd'
      			})
			}
		}
	}
}
</script>

<style lang="less" scoped>
@import (reference) "~src/style/all.less";
dl{
	// border-bottom:1.1rem solid @bg_color;
	dt{
		height: .8rem;
		line-height: .8rem;
		font-size: .28rem;
		color: #555;
		.bg_gray;
		.plr30;
	}
}
</style>
