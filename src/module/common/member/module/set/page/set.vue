<template>
	<div class="bg">
		<top title="设置" :isReturn="false"></top>
		<div class="z_set">
			<h2 class="f28 c_555">安全中心</h2>
			<div class="z_cell_box">
				<item-cell :height="90" title="登录密码" color="#5d97ff" icon="icon-mimarenzheng" :isLink="true" :handleClick="toLoginPwd"></item-cell>
				<item-cell :height="90" title="支付密码" color="#65c4ff" icon="icon-jindutiaoqiandai" isLink :handleClick="jumpPayPwd"></item-cell>
				<item-cell :height="90" title="手机认证" color="#7da7fd" icon="icon-shoujirenzheng" :isLink="true" value="修改" to="/changePhone"></item-cell>
			</div>
		</div>
		<div class="z_set">
			<h2 class="f28 c_555">服务</h2>
			<div class="z_cell_box">
				<item-cell :height="90" title="最新公告" color="#7dc8ff" icon="icon-gonggao1" :isLink="true" to="/inform"></item-cell>
				<item-cell :height="90" title="帮助中心" color="#ff7878" icon="icon-bangzhu1" :isLink="true" to="/help"></item-cell>
			</div>
		</div>
		<div class="z_set">
			<h2 class="f28 c_555">关于</h2>
			<div class="z_cell_box">
				<item-cell :height="90" title="联系客服" color="#65c4ff" icon="icon-kefu1" :isLink="true" :handleClick="contactService"></item-cell>
				<item-cell :height="90" title="关于我们" color="#ffb178" icon="icon-guanyuwomen" :isLink="true" to="aboutUs"></item-cell>
				<!--<div class="cell pl30">
					<div class="cell_wrap">
						<div class="cell_tit">
							<i class="iconfont icon-tuisongxiaoxi" style="color: #31d19f;"></i>
							<div class="cell_tit_con">
								<span class="cell_tit">推送消息</span>
							</div>
						</div>
						<div class="cell_link">
							<form-switch></form-switch>
						</div>
					</div>
				</div>-->
				<item-cell :height="90" title="意见反馈" color="#5d97ff" icon="icon-yijianfankui1" :isLink="true" to="opinion"></item-cell>
				<!--<item-cell :height="90" title="应用评分" color="#ff7878" icon="icon-shoucang" :isLink="true"></item-cell>
				<item-cell :height="90" title="检查更新" color="#ffb178" icon="icon-gengxin" :isLink="true" value="1.4.7版本"></item-cell>-->
				<item-cell :height="90" title="清理缓存" color="#4ec654" icon="icon-qingchuhuancun" :isLink="true" :handleClick="clearStorage"></item-cell>
			</div>
		</div>
		<div class="z_exit"  v-if="!$store.state.wechatSystem">
			<a href="javascript:void(0);" @click="logOut()">退出登录</a>
		</div>
	</div>
</template>

<script>
import itemCell from 'src/components/item/itemCell';
import formSwitch from 'src/components/formItem/formSwitch';
import {
	fetchGetMemberInfo,//获取用户安全中心信息
	fetchLogOut//退出登录
} from '../service/getData'
export default {
	data() {
		return {
			closePush:false,
			is_tradePswd:'',//是否设置了支付密码
			is_pwd:''//登录密码
		}
	},
	components: {
		itemCell,
		formSwitch
	},
	activated() {
		this.getMemberInfo()//获取用户安全中心信息
	},
	
	methods: {
		//获取用户安全中心信息
		getMemberInfo(){
			//服务器名称 DDT_TC_MEMBER_INFO
			fetchGetMemberInfo().then(res => {
				if(res.status){
					this.is_tradePswd=res.data.is_tradePswd//支付密码
					this.is_pwd=res.data.is_pwd//登录密码
				}else{
					alertTip(res.msg);
				}
			});
		},
		//退出登录
		logOut(){
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
		},
		//根据是否设置支付密码跳转不同的页面
		jumpPayPwd(){
			if(this.is_tradePswd=='Y'){
				this.$router.push({
					path: '/changePayPwd'
      			})//跳转到修改支付密码页面
			}
			if(this.is_tradePswd=='N'||this.is_tradePswd==null){
				this.$router.push({
					path: '/setPayPwd'
      			})
			}//跳转到设置支付密码页面	
		},
		//跳转登录密码页面
		toLoginPwd(){
			if(this.is_pwd== 'N'){
				this.$router.push({
					path: '/setLoginPwd'
      			})
			}else{
				this.$router.push({
					path: '/changePwd'
      			})
			}
		},
		//清除缓存
		clearStorage() {
			sessionStorage.clear(); //清除 当前所有会话缓存
			localStorage.clear(); //清除 当前所有本地缓存
			alertTip('清除成功!');
		},
		//联系客服
		contactService(){
			this.$confirm({
				content:"<span class='pt50'>"+this.$store.state.telephone+"</span>",
				confirmBtn:"<a href='tel:400-113-6999' class='c_main'>呼叫</a>",
				layerImg:""
			})
		}
	}
}
</script>

<style lang="less" scoped>
@import (reference) "~src/style/all.less";
.bg{
	background: @bg_color;
}
.z_set{
	h2{
		height: 0.8rem;
		padding: 0 0.3rem;
		line-height: 0.8rem;
	}
	.z_cell_box{
		background: #fff;
		.z_cell{
			position: relative;
			display: -webkit-box;
			display: -webkit-flex;
			display: flex;
			-webkit-box-align: center;
			-webkit-align-items: center;
			align-items: center;
			height: 0.9rem;
			border-bottom: 1px solid #e4e4e4;
			.z_cell_bd{
				flex: 1;
			}
			.z_cell_ft{
				padding-right: 0.3rem;
			}
		}
	}
}
.z_exit{
	padding: 0.6rem 0.7rem;
	a{
		width: 100%;
		height: 100%;
		display: inline-block;
		height: 0.8rem;
		color: #fff;
		text-align: center;
		line-height: 0.8rem;
		font-size: 0.3rem;
		.gradient_v(#ffb7ad,#ffcb99);
		.border-radius(0.4rem);
	}
}
.cell{
	padding-left: .3rem;
	.cell_wrap{
		display: flex;
		align-items: center;
		justify-content: space-between;
		border-bottom: 1px solid #e8e8e8;
		padding-right: .68rem;
		position: relative;
		height: 0.9rem;
	}
	.cell_tit{
		display: flex;
		flex:1;
		align-items: center;
		.iconfont{
			font-size: .56rem;
		}
		.icon-mimarenzheng{
			color: #5d97ff;
		}
		img{
			width: .54rem;
			height: .54rem;
		}
		.cell_tit_con{
			margin-left: .2rem;
		}
		.cell_tit{
			font-size: .28rem;
			line-height: 1;
		}
		.cell_label{
			display: block;
			color: #666;
			font-size: .26rem;
			line-height: 1;
			margin-top: .15rem;
		}
	}
	.cell_value{
		font-size: .28rem;
		color: #999;
	}
	.cell_link{
		display: flex;
		align-items: center;
		justify-content: flex-end;
		width: .38rem;
		height: 100%;
		position: absolute;
		right:.3rem;
		top:0;
		.iconfont{
			font-size: .3rem;
			color: #bbb;
		}
		.control_icon{
			font-size: 0.96rem;
			color: #42c060;
		}
		
	}
}
</style>
