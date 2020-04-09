<template>
	<div class="l_list_item">
		<!--S 个人信息-->
		<router-link :to="mid!=userInfo.mid?'/otherHome?mid='+userInfo.mid:'/myHome'">
			<item-head 
				:userInfo="userInfo" 
				:isShowIndustry="isNotice" 
				:isShowApprove="!isNotice" 
				:isShowAdd="isNotice"
				:isShowAttention="isNotice&&mid!=userInfo.mid"
				@changeAttention="changeAttention">
			</item-head>
		</router-link>
		<!--E 个人信息-->
		<!--S 技能、动态信息-->
		<div class="plr30" @click="goNext">
			<div class="f26 l_item_skill mb20" v-if="isNotice">{{userInfo.title}}</div>
			<div style="max-height:2.36rem;overflow:hidden;">	
				<!--S 首页展示图片-->
				<img-show v-if="!isNotice" :isClick="!isIndex" :videoList="userInfo.video?[{prePhoto:userInfo.prePhoto,video:userInfo.video}]:[]" :imgSrc="userInfo.skillImg"></img-show>
				<!--E 首页展示图片-->
				<!--S 身边动态展示图片-->
				<img-show v-if="isNotice" :videoList="userInfo.fileType==2?[{prePhoto:userInfo.prePhoto,video:userInfo.filePuth}]:[]" :imgSrc="userInfo.fileType==1?userInfo.filePuth:''"></img-show>
				<!--E 身边动态展示图片-->
			</div>
			<div v-if="!isNotice">
				<p class="flex flex_center justify_between mt5">
					<span class="pull_left c_main f28">{{userInfo.skillSubCategoryStr}}</span>
					<span class="pull_right f24 c_999">{{userInfo.serviceTypeStr}}</span>
				</p>
				<p class="f26 l_des mt10 mb24 break">{{userInfo.serviceIntroduced}}</p>
				<item-audio class="mb30" :src="userInfo.voiceIntroduced" :time="userInfo.voiceLength" v-if="userInfo.voiceIntroduced&&userInfo.voiceIntroduced!='null'"></item-audio>
				<ul class="l_item_tabs clearfix f22" v-if="userInfo.skillAttrValue">
					<li v-for="el in userInfo.skillAttrValue.split(',')">{{el}}</li>
				</ul>
			</div>
		</div>
		<!--E 技能、动态信息-->
		<!--S 按钮-->
		<handler
			v-if="mid!=userInfo.mid"
			:skillId="userInfo.skillSubCategory"
			:dId="userInfo.id" 
			:isNotice="isNotice" 
			:isSkill="isNotice&&userInfo.skillName" 
			:isPraise="userInfo.isPraise=='Y'" 
			:mid="userInfo.mid" 
			:praiseNum="userInfo.praiseNum"
			:isRemind="userInfo.onlineNotice=='Y'"
			:isRequest="userInfo.isRequest=='Y'"
			@addPaise="changePaise"
			@changeNotice="userInfo.onlineNotice='Y'"
			@inviteSendSkill="inviteSendSkill"></handler>
		<!--E 按钮-->
		<div class="line_box"></div>
	</div>
</template>

<script>
	import itemHead from 'src/components/item/itemHead'//用户头部信息
	import itemAudio from 'src/components/item/itemAudio'//语音
	import imgShow from 'src/components/alert/imgShow'//图片
	import handler from './handler'//操作
	import {
		setAttention,//关注
		deleteAttention//取消关注
	} from 'src/module/member/service/getData'
	import {fetchNoticeSendLatter} from 'src/service/getData'//邀请发技能
	import {
		getInfo//获取用户信息
	} from 'src/config/mUtils';
	export default{
		data(){
			return{
				mid:getInfo('id'),//用户id
				showSXTX:false,//上线提醒弹窗
				check:true//上线提醒是否勾选不再提示
			}
		},
		components:{
			itemHead,
			itemAudio,
			imgShow,
			handler
		},
		props: {
			userInfo: {//用户信息
		       type: Object
		    },
		    isNotice:{//是否身边动态页面
		   		default:false
		    },
		    isIndex:{//是否是首页
		    	default:false
		    }
		},
		methods:{
			//首页点击去他人主页
			goNext(){
				if(!this.isIndex){
					return;
				}
				this.$router.push('/otherHome?mid='+this.userInfo.mid);
			},
			//修改点赞数和点赞状态
			changePaise(type,num){
				this.userInfo.praiseNum = num;
				if(type=='add'){
					//点赞
					this.userInfo.isPraise = 'Y'
				}else{
					//取消点赞
					this.userInfo.isPraise = 'N'
				}
			},
			//关注和取消关注
			changeAttention(){
				//已关注,取消关注
				if(this.userInfo.isNotice=='Y'){
					deleteAttention(this.userInfo.mid).then(res=>{
						if(res.status){
							alertTip("取消关注成功",()=>{
								this.$emit('getList');
							})
						}
					})
				}else{
					//未关注-去关注
					setAttention(this.userInfo.mid).then(res=>{
						if(res.status){
							alertTip("关注成功",()=>{
								this.$emit('getList');
							})
						}
					})
				}
			},
			//邀请发技能
			inviteSendSkill(){
				fetchNoticeSendLatter('tcInvitationalSkill',this.userInfo.mid).then(res=>{
					if(res.status){
						alertTip("已邀请发技能",()=>{
							this.$emit('getList');
						})
					}
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	@import (reference) "~src/style/all.less";
	.break{
		word-break: break-all;
	}
	.l_list_item{
		.l_item_skill{
			line-height:0.4rem;
		}
		.l_item_tabs{
			li{
				float:left;
				height: 0.36rem;
				padding: 0 0.1rem;
				margin-right:0.14rem;
				.border(#409ffe);
				.border-radius(0.02rem);
				line-height: 0.34rem;
				color: #3f9efd;
			}
		}
		.l_item_handler{
			.flex;
			.justify_between;
			.border-t(#e8e8e8);
			& .l_item_handler_left{
				a i{
					margin-right: 0.1rem;
				}
			}
			a{
				.flex;
				.flex_center;
				.justify_center;
				height: 0.64rem;
				color: #666;
				&.item_btn{
					width: 1.65rem;
					.border(@color);
					.border-radius(0.32rem);
					color: @color;
				}
				&.btn_solid{
					background: @color;
					color: #fff;
				}
				&.btn{
					min-width: 1.46rem;
				}
				i{
					margin-right: 0.04rem;
					font-size: 0.34rem;
					&.l_gray{
						color: #bbbcc3;
					}
					&.l_red{
						color: #f34e4b;
					}
					&.l_yellow{
						color: #feb100;
					}
				}
			}
		}
		.l_des{
			line-height: 1.8em;
		}
	}
</style>