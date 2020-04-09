<template>
	<div class="bg_gray" style="min-height: 100%;">
		<!-- S 头部-->
		<top :title="'个人资料'"></top>
		<!-- E 头部-->
		<!--<div class="h_sync">
			<div>
				<p class="f28">同步微信头像、昵称</p>
				<p class="f24 c_999">方便好友辨认您的身份</p>
			</div>
			<a href="javascript:void(0)" class="btn_border h_btn" @click="sync">同步</a>
		</div>-->
		<div class="h_info_list">
			<item-cell 
				:height="110" 
				title="头像"
				icon="icon-user c_ccc f34" 
				:isLink="true"
				:to="'editAvatar'">
				<img :src='info.headPhoto | imgUrl' class='h_avatar'/>
			</item-cell>
			<item-cell 
				:height="88" 
				title="昵称"
				icon="icon-xiaoxi2 c_ccc f34" 
				:value="info.nickName"
				:isLink="true"
				:to="'editNickname?nickName='+info.nickName">
			</item-cell>
			<item-cell 
				:height="88" 
				title="我的年龄"
				icon="icon-shijianzhongbiao2 c_ccc f34" 
				:isLink="info.age?false:true"
				:to="info.age?'':'personApprove'">
				<span style="margin-right: -0.4rem;" v-show="info.age">{{info.age}}</span>
				<span v-show="!info.age">请实名认证</span>
			</item-cell>
			<item-cell 
				:height="88" 
				title="我的性别"
				icon="icon-sex c_ccc f34" 
				:isLink="info.sex?false:true"
				:to="info.sex?'':'personApprove'">
				<span style="margin-right: -0.4rem;" v-show="info.sex">{{info.sex|gender}}</span>
				<span v-show="!info.sex">请实名认证</span>
			</item-cell>
			<item-cell
				:height="88" 
				title="我的姓名"
				icon="icon-name c_ccc f34" 
				:isLink="memberVerifyStatus?false:true"
				:to="memberVerifyStatus?'':'personApprove'">
				<span style="margin-right: -0.3rem;" v-show="memberVerifyStatus">{{info.realName|format('realName')}}</span>
				<span v-show="!memberVerifyStatus">请实名认证</span>
			</item-cell>
			<item-cell 
				:height="88" 
				title="身份证号"
				icon="icon-mingpian c_ccc f34" 
				:isLink="memberVerifyStatus?false:true"
				:to="memberVerifyStatus?'':'personApprove'">
				<span style="margin-right: -0.3rem;" v-show="memberVerifyStatus">{{info.idCard|format('idNumber')}}</span>
				<span v-show="!memberVerifyStatus">请实名认证</span>
			</item-cell>
			<item-cell 
				:height="88" 
				title="收货地址"
				icon="icon-dizhi c_ccc f34" 
				value=""
				:isLink="true"
				to="addressList">
				<div class="wid400 ellipsis text_right">{{info.address}}</div>
			</item-cell>
			<!-- <item-cell 
				:height="88" 
				title="我的简介"
				icon="icon-wendang c_ccc f34" 
				:isLink="true"
				:to="'editIntroduce?introduction='+(info.introduction?info.introduction:'')">
				<div class="wid400 ellipsis text_right">{{info.introduction}}</div>
			</item-cell> -->
			<!--<item-cell 
				:height="88" 
				title="帮助中心"
				icon="icon-bangzhu1 c_ccc f34" 
				:isLink="true"
				to="help">
			</item-cell>
			<item-cell 
				:height="88" 
				title="建议反馈"
				icon="icon-yijianfankui c_ccc f34" 
				:isLink="true"
				to="opinion">
			</item-cell>-->
		</div>
	</div>
</template>

<script>
import itemCell from 'src/components/item/itemCell' //单元格组件
import {
	fetchInformation,//获取个人信息
} from 'src/service/getData'
import {
	fetchGetMemberInfo,//查询安全中心信息
	fetchbindWx,  //绑定微信
	fetchMemberGetMemberInfo,//个人认证信息查询
} from '../../save/service/getData'
export default {
	data() {
		return {
			info:{},//个人信息
			safeInfo:{},//安全中心信息
			memberVerifyStatus:false,//实名认证状态
		}
	},
	components: {
		itemCell
	},
	activated() {
		this.getInformation();
		this.getAuthInfo();
		this.getSafeInfo();
	},
	methods: {
		//同步微信个人信息
		sync(){
			if(this.safeInfo.wx_bind=="Y"){
				console.log("同步微信头像、昵称，点击“同步”按钮后，判断用户是否已经绑定微信，未绑定跳转绑定页面，已绑定的同步数据替换头像和昵称。");
				console.log("已同步");
			}else if(this.safeInfo.wx_bind=="N"){
				console.log("未同步");
//				var open_window=window.open('_blank');
//				fetchbindWx(window.location.href,"微信认证").then(res => {
//					if(res.status){
//						open_window.location.href='';
//						open_window.focus();
//						var html=res.data;
//						open_window.document.write(html);
//					}
//				})
			}
		},
		//获取个人信息
		getInformation(){
			fetchInformation().then(res=>{
				this.info=res.data||{};
			})
		},
		//查询安全中心信息
		getSafeInfo(){
			fetchGetMemberInfo().then(res => {
				this.safeInfo =res.data||{};
			})
		},
		//个人认证信息查询(是否实名认证)
		getAuthInfo(){
			fetchMemberGetMemberInfo().then(res=>{
				if(res.data){
					var obj=res.data.memberRealName||{};
					if(obj.checkStatus=="live_pass"){
						this.memberVerifyStatus=true;
					}else{
						this.memberVerifyStatus=false;
					}
				}
			})
		}
	}
}
</script>
<style lang="less">
.h_info_list{
	background: #fff;
	.h_avatar{
		width: 0.83rem;
		height: 0.83rem;
		border-radius: 50%;
		align-self: center;
	}
	.cell:last-child{
		.cell_wrap{
			border-bottom: none;
		}
	}
	.cell_value{
		display: flex;
	}
	.cell_tit{
		color: #555;
	}
}
.c_ccc{
	color: #ccc;
}
.wid400{
	width: 4rem;
}
</style>
<style lang="less" scoped>
.h_sync{
	display: flex;
	display: -webkit-flex;
	justify-content: space-between;
	align-items: center;
	height: 1.1rem;
	padding: 0 0.3rem;
	.h_btn{
		width: 1.1rem;
		height: 0.5rem;
		padding: 0;
		background: transparent;
		line-height: 0.48rem;
		font-size: 0.28rem;
	}
}
</style>


