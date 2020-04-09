<template>
	<div>
		<!--S 非身边动态页面按钮-->
		<div class="l_item_handler plr25 mt30 ptb22 f26 justify_end" v-if="!isNotice && !isDynamic">
			<a class="item_btn" href="javascript:void(0);" @click="onlineRemind" v-if="!isRemind"><i class="iconfont icon-xiaoxi"></i><span>上线提醒</span></a>
			<a class="item_btn btn_gray" href="javascript:void(0);" v-if="isRemind"><i class="iconfont icon-xiaoxi"></i>已提醒</a>
			<!--这期不做-->
			<!--<a class="item_btn" href="javascript:void(0);" @click="playTour"><i class="iconfont icon-zuanshi1"></i>99</a>-->
			<router-link class="item_btn" to="/wallet/recharge"><i class="iconfont icon-renminbi1688"></i>充值</router-link>
			<a class="item_btn btn_solid" href="javascript:void(0);" @click="toAboutTa(mid,skillId)"><i class="iconfont icon-yueta"></i>约Ta</a>
		</div>
		<!--E 非身边动态页面按钮-->
		<!-- S 动态页面按钮 -->
		<div class="z_handler_btn" v-if="isDynamic && !isNotice">
			<div class="z_btn" @click="onlineRemind" v-if="!isRemind"><i class="iconfont icon-group45 f38"></i>上线提醒</div>
			<div class="z_btn c_666" v-if="isRemind"><i class="iconfont icon-group45 f38 c_666"></i>已提醒</div>
			<!-- <div class="z_btn"><i class="iconfont icon-qiandai f38"></i>打赏</div> -->
			<router-link to="/wallet/recharge" class="z_btn"><i class="iconfont icon-qian1 f38"></i>充值</router-link>
			<a @click="toAboutTa(mid,skillId)" href="javascript:void(0);" class="z_btn"><i class="iconfont icon-yueta f38"></i>约TA</a>
		</div>
		<!-- E 动态页面按钮 -->
		<!--S 身边动态页面按钮-->
		<div class="l_item_handler plr30 mt30 ptb22 f26 justify_between" v-if="isNotice">
			<div class="flex flex_center l_item_handler_left f28">
				<a class="mr20" href="javascript:void(0);" @click="changePraise"><i class="iconfont icon-dianzan" :class="{l_red:isPraise,l_gray:!isPraise}"></i>{{praiseNum}}</a>
				<!--这期不做-->
				<!--<a class="mr20" href="javascript:void(0);"><i class="iconfont icon-qiandai l_yellow"></i>打赏</a>-->
				<!--<a class="mr20" href="javascript:void(0);"><i class="iconfont icon-hongbao l_red"></i>邀请赚佣金</a>-->
			</div>
			<a class="btn c_fff" href="javascript:void(0);" @click="toAboutTa(mid,skillId)" v-if="isSkill">约Ta</a>
			<a class="btn c_fff" href="javascript:void(0);" v-if="!isSkill&&!isRequest" @click="$emit('inviteSendSkill')">邀请发技能</a>
			<a class="btn c_fff gray_btn" href="javascript:void(0);" v-if="!isSkill&&isRequest">已邀请发技能</a>
		</div>
		<!--E 身边动态页面按钮-->
		<!--S 上线提醒弹窗-->
		<div v-show="showSXTX" class="layer_shadow">
	        <section class="layer_box">
	            <i class="iconfont icon-close1" @click="showSXTX=false"></i>
	            <img class="layer_img mt40" src="~src/images/lay_bell.png"/>
	            <div class="layer_con plr50" style="display: block;">
	            	开启TA的上线提醒，随时掌握TA的最新动态（{{$store.state.onlineRemindPrice}}元/月）
	            	<router-link class="c_main" to="/remindDetail">查看详情</router-link>
	            	<p class="flex flex_center plr30 pt10 justify_center" @click="check = !check">
			            <i class="iconfont icon-unselected c_999 mr10 f30" v-if="!check"></i>
			            <i class="iconfont icon-xuanzhong3 c_main mr10 f30" v-if="check"></i>
			            <a class="c_main f28" href="javascript:void(0)">不再提醒</a>
			        </p>
	            </div>
	            <div class="layer_btn inquiry_btn">
	                <span class="close_btn" @click="showSXTX=false">取消</span>
	                <span class="confirm_btn" @click="onlineNotice">开启</span>
	            </div>
	        </section>
	    </div>
		<!--E 上线提醒弹窗-->
		<!--S 打赏-->
		<reward-popup ref="rewardPopup"></reward-popup>
		<!--E 打赏-->
	</div>
</template>

<script>
	import rewardPopup from 'src/components/alert/rewardPopup'//打赏
	import {
		fetchOnlineNotice,//上线提醒
		fetchDynamicsAddPaise,//动态点赞
		fetchDynamicsDeletePaise//取消点赞
	} from '../service/getData'
	import {
		setStore,//设置本地存储
		getStore//获取本地存储
	} from 'src/config/mUtils';
	export default{
		data(){
			return{
				showSXTX:false,//上线提醒弹窗
				check:true//上线提醒是否勾选不再提示
			}
		},
		components:{
			rewardPopup
		},
		props: {
			skillId: {//技能id
			},
			mid:{//用户id
			},
			dId:{//动态id
			},
			isRemind:{//是否已上线提醒
				default:false
			},
			isPraise:{//是否已经点赞
				default:false
			},
			praiseNum:{//点赞数
				default:0,
			},
			isNotice:{//是否身边动态页面
		   		default:false
		   	},
			isSkill:{//是否发技能
			   	default:false
			},
			isRequest:{//是否已经邀请发技能
				default:false
			},
			isDynamic:{//是否动态页面
				default:false
			}
		},
		methods:{
			//约他
			toAboutTa(mid,skillId){
				this.$router.push({path:'/aboutTa',query:{skillId:skillId,mid:mid}});
			},
			//打赏
			playTour(){
				this.$refs.rewardPopup.open();
			},
			//点击在线提醒
			onlineRemind(){
				//已开启不再提醒
				if(getStore('onlineRemaind')){
					this.onlineNotice();
				}else{
					this.showSXTX = true;
				}
			},
			//开启在线提醒
			onlineNotice(){
				if(this.check){
					//设置开启不再提醒
					setStore('onlineRemaind','closed')
				}
				fetchOnlineNotice(this.mid).then(res=>{
					if(res.status){
						this.showSXTX = false;
						//余额不足
						if(res.data&&res.data.code=='009-003'){
							this.$confirm({
								cancelBtn:'取消',
								confirmBtn:'充值',
								layerImg:require('src/images/account.png'),
								content:`
									<div class="flex flex_column">
									    <p class="f28">亲，您的账户余额不足~</p>						    
									</div>
									`,
								confirm:() => {
									this.$router.push('/wallet/recharge')
								}
							})	
						}else{
							alertTip('上线提醒成功',()=>{
								this.$emit('changeNotice');
							});
						}
					}else{
						alertTip(res.msg);
					}
				})
			},
			//点击点赞
			changePraise(){
				//已点赞取消点赞
				if(this.isPraise){
					fetchDynamicsDeletePaise(this.dId).then(res=>{
						if(res.status){
							alertTip('取消点赞成功',()=>{
								this.$emit('addPaise','delete',res.data.praiseNum)
							})
						}
					})
				}else{
					//未点赞-去点赞
					fetchDynamicsAddPaise(this.dId).then(res=>{
						if(res.status){
							alertTip('点赞成功',()=>{
								this.$emit('addPaise','add',res.data.praiseNum)
							})
						}
					})
				}
			}
		}
	}
</script>

<style scoped lang="less">
@import (reference) "~src/style/all.less";
	.l_item_handler{
		.flex;
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
				width: 1.64rem;
			    margin: 0 0.1rem;
				.border(@color);
				.border-radius(0.32rem);
				color: @color;
				line-height: 0.64rem;
				&.btn_gray{
					border-color: #dbdbdb;
					color: #999;
				}
			}
			&.btn_solid{
				.gradient_v(#fd6954,@color);
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
	.z_handler_btn{
        padding: 0.1rem;
        padding-top: 0;
        background: #fff;
        position: absolute;
        right: 0;
        top: 0;
        z-index: 20;
        border-top-left-radius: 0.05rem;
        border-bottom-left-radius: 0.05rem;
        .z_btn{
            width: 100%;
            height: 25%;
            text-align: center;
            font-size: 0.16rem;
            color: @color;
            display: flex;
            flex-direction: column;
            padding-top: 0.1rem;
        }
    }
</style>