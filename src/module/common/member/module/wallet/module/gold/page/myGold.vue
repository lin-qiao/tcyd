<template>
	<div class="router_page">
		<!-- S 头部-->
		<top :title="'我的金币'" right="明细" @clickRight="toGoldRecord"></top>
		<!-- E 头部-->
		<!--S 金币统计-->
		<div class="h_statistics">
			<div class="h_num">今日获得（个）<p>{{goldTodayGet}}</p></div>
			<div class="h_line"></div>
			<div class="h_num">可用金币（个）<p>{{goldUsable}}</p></div>
		</div>
		<!--E 金币统计-->
		<!--S 金币任务-->
		<div class="h_task">
			<div class="h_tit">金币任务</div>
			<div class="swiper-container J_goldTaskSwiper">
			    <div class="swiper-wrapper">
			        <div class="swiper-slide" v-for="v in goldTaskList">
			        	<div class="h_item">
				        	<div class="h_icon">
				        		<img :src="v.icon|imgUrl"/>
				        	</div>
				        	<div class="h_name">{{v.name}}</div>
				        	<div class="h_gold">+{{v.reward}} <i class="iconfont icon-gold"></i></div>
				    	</div>
			        </div>
			    </div>
			    <div class="swiper-pagination"></div>
			</div>
		</div>
		<!--E 金币任务-->
		<!--S 抽奖-->
		<!--<lottery ref="lottery" @lotterySuccess="lotterySuccessFn" @lotteryFailure="lotteryFailureFn"></lottery>-->
		<!--E 抽奖-->
		<!--S 活动规则&我的奖品-->
		<!--<div class="h_tab_list">
			<div class="h_item" @click="showLotteryRules=true">
				<img src="../../../images/icon_rules.png"/>活动规则
			</div>
			<div class="h_line"></div>
			<div class="h_item active" @click="showLotteryPrize=true">
				<img src="../../../images/icon_gift.png"/>我的奖品
			</div>
		</div>-->
		<!--E 活动规则&我的奖品-->
		<!--S 中奖名单-->
		<!--<div class="h_panel">
			<div class="h_head">今日中奖名单</div>
			<div class="h_body">
				<div class="h_list">
					<div class="swiper-container J_winListSwiper">
					    <div class="swiper-wrapper">
					        <div class="swiper-slide h_item" v-for="v in lotterySuccessList">
								恭喜 <span class="c_main h_phone">{{v.winMobile|formatMoblie}}</span> 抽中 <span class="c_main h_prize">{{v.prizeName}}</span>
								<div class="h_time">{{v.addTime}}</div>
					        </div>
					    </div>
					</div>
				</div>
			</div>
		</div>-->
		<!--E 中奖名单-->
		<!--S 活动规则-->
		<!--<lottery-rules v-show="showLotteryRules" @closeLotteryRules="showLotteryRules=false"></lottery-rules>-->
		<!--E 活动规则-->
		<!--S 我的奖品-->
		<!--<lottery-prize v-show="showLotteryPrize" @closeLotteryPrize="showLotteryPrize=false;"></lottery-prize>-->
		<!--E 我的奖品-->
		<!--S 未中奖-->
		<!--<lottery-failure v-show="showLotteryFailure" @closeLotteryFailure="showLotteryFailure=false;initLotteryData();" @lotteryAgain="lotteryAgain"></lottery-failure>-->
		<!--E 未中奖-->
		<!--S 中奖了-->
		<!--<lottery-success :prizeInfo="myPrizeInfo" v-show="showLotterySuccess" @closeLotterySuccess="showLotterySuccess=false;initLotteryData();" @lotteryAgain="lotteryAgain"></lottery-success>-->
		<!--E 中奖了-->
	</div>
</template>

<script>
import lottery from '../components/lottery';//抽奖组件
import lotteryRules from '../components/lotteryRules'//活动规则组件
import lotteryPrize from '../components/lotteryPrize'//我的奖品组件
import lotteryFailure from '../components/lotteryFailure'//未中奖组件
import lotterySuccess from '../components/lotterySuccess'//中奖了组件
import {
	fetchGoldNum,//获取今日获得金币和可用金币个数
	fetchTaskList,//获取金币任务
	fetchLotterySuccessList,//获取中奖信息列表
} from '../service/getData'
export default {
	data() {
		return {
			goldTodayGet:0,//今日获得金币数
			goldUsable:0,//可用金币数
			goldTaskList:[],//金币任务列表
			lotterySuccessList:[],//中奖信息列表
			myPrizeInfo:{},//单次中奖信息
			goldTaskSwiper:null,
			winListSwiper:null,
			showLotteryRules:false,//是否展示活动规则弹窗
			showLotteryPrize:false,//是否展示我的奖品弹窗
			showLotteryFailure:false,//是否展示未中奖弹窗
			showLotterySuccess:false,//是否展示中奖了弹窗
		}
	},
	components: {
		lottery,
		lotteryRules,
		lotteryPrize,
		lotteryFailure,
		lotterySuccess
	},
	activated() {
	},
	mounted(){
		this.getGoldNum();
		this.getGoldTask();
		this.getLotterySuccessList();
	},
	watch:{
	},
	methods: {
		//打开金币明细
		toGoldRecord(){
			this.$router.push("/wallet/goldRecord");
		},
		//获取今日获得金币和可用金币个数
		getGoldNum(){
			fetchGoldNum().then(res=>{
				if(res.data){
					this.goldTodayGet=res.data.goldToday;
					this.goldUsable=res.data.goldAmount;
				}
			})
		},
		//获取金币任务
		getGoldTask(){
			var data={
				type:2,//任务类型	1今日任务2常规任务
				rewardType:1,//奖励类型	1.金币2.钻石
				size:8//查询多少条
			}
			fetchTaskList(data).then(res=>{
				if(res.data!={}){
					this.goldTaskList=res.data.list||[];
					if(!this.goldTaskList.length){
						return;
					}
					this.$nextTick(()=>{
						this.goldTaskSwiperFn();
					})
				}
			})
		},
		//获取中奖信息列表
		getLotterySuccessList(){
			fetchLotterySuccessList().then(res=>{
				if(res.data){
					this.lotterySuccessList=res.data.list||[];
					this.$nextTick(()=>{
						this.winListSwiperFn();
					})
				}
			})
		},
		//金币任务轮播
		goldTaskSwiperFn(){
			this.goldTaskSwiper = new Swiper ('.J_goldTaskSwiper', {
			    pagination: '.swiper-pagination',
			    paginationClickable :true,
			    slidesPerView:4,
			    slidesPerGroup:4
			})
		},
		//中奖名单轮播
		winListSwiperFn(){
			this.winListSwiper = new Swiper ('.J_winListSwiper', {
				direction: 'vertical',
			    slidesPerView:3,
			    autoplay:2000
			}) 
		},
		//中奖了
		lotterySuccessFn(data){
			this.myPrizeInfo=data;
			this.showLotterySuccess=true;
		},
		//未中奖
		lotteryFailureFn(){
			this.showLotteryFailure=true;
		},
		//清除中奖数据
		initLotteryData(){
			this.$refs.lottery.initLotteryData();
		},
		//再抽一次
		lotteryAgain(){
			this.showLotteryFailure=false;
			this.showLotterySuccess=false;
			this.$refs.lottery.lotteryAgain();
		}
	}
}
</script>
<style lang="less">
@import (reference) "~src/style/all";
.icon-gold{
	color: #feca01;
}
.h_task{
	.swiper-container {
		position: relative;
	    width: 100%;
	    height: 2.15rem;
	    padding-bottom: 0.5rem;
	}  
	.swiper-pagination-bullet{
		width: 0.16rem;
		height: 0.16rem;
		background-color: #ebebeb;
	}
	.swiper-pagination-bullet-active{
		background-color: @color;
	}
}
</style>
<style lang="less" scoped>
@import (reference) "~src/style/all";
.pb120{
	padding-bottom: 1.2rem;
}
/*S 金币统计*/
.h_statistics{
	display: flex;
	justify-content: center;
	align-items: center;
	margin: 0.3rem;
	text-align: center;
	width:6.9rem;
	height:1.96rem;
	border-radius:0.1rem;
	background:url(../../../images/gold_bg.png) no-repeat center;
	font-size:0.24rem;
	color:#fff;
	.h_num{
		width:3.4rem;
		p{
			line-height: 1;
			margin-top: 0.25rem;
			font-weight: bold;
			font-size: 0.48rem;
		}
	}
	.h_line{
		width: 1px;
		height: 0.4rem;
		background-color: #fff;
		opacity: 0.3;
	}
}
/*E 金币统计*/
/*S 金币任务*/
.h_task{
	/*border-bottom:0.2rem solid @bg_color;*/
	margin-bottom: 0.2rem;
	.h_tit{
		margin: 0 0.3rem;
		position:relative;
		padding-left:0.25rem;
		line-height:0.48rem;
		font-size:0.3rem;
		&:before{
			content: "";
			position: absolute;
			left: 0;
			top: 0;
			bottom:0;
			margin:auto 0;
			width: 0.05rem;
			height: 0.3rem;
			.gradient_v(#fd6a55,#ff4a48);
		}
	}
	.h_item{
		text-align: center;
		.h_icon{
			width:0.5rem;
			height:0.5rem;
			margin:0.25rem auto 0.18rem;
			img{
				display: block;
				width: 100%;
				height: 100%;
			}
		}
		.h_name{
			margin-bottom: 0.10rem;
			font-size: 0.26rem;
		}
		.h_gold{
			font-size: 0.28rem;
			.iconfont{
				font-size:0.26rem;
			}
		}
	}
}
/*E 金币任务*/
/*S 活动规则&我的奖品*/
.h_tab_list{
	display: flex;
	justify-content: center;
	align-items: center;
	.h_item{
		display: flex;
		align-items: center;
		font-size:0.26rem;
		color:#666;
		&.active{
			color: @color;
		}
		img{
			width: 0.63rem;
			margin-right: 0.07rem;
		}
	}
	.h_line{
		width: 1px;
		height: 0.22rem;
		background-color: #dcdcdc;
		margin: 0 0.7rem;
	}
}
/*E 活动规则&我的奖品*/
/*S 中奖名单*/
.h_panel{
	position: relative;
	height: 2.8rem;
	margin: 0.3rem 0.44rem;
	background-color: #fff;
	border-radius:0.5rem;
    .gradient_v(#f78a20,#f02f6e);
    display:flex;
    align-items:center;
    .h_head{
    	position: absolute;
    	left: 0;
    	right: 0;
    	top: -0.27rem;
    	z-index: 3;
    	margin: 0 auto;
    	width: 2.08rem;
    	height: 0.55rem;
    	border-radius:0.35rem;
    	border: 0.03rem solid #ffcbba;
    	.gradient_v(#f78a20,#f02f6e);
    	box-shadow: 2px 2px 0.08rem rgba(247,138,32,0.33);
    	line-height:0.48rem ;
    	text-align: center;
    	font-size: 0.26rem;
    	color: #fff;
    }
    .h_body{
    	width:6.62rem;
    	height: 2.74rem;
    	margin: 0.03rem;
    	background-color: #fff;
		border-radius:0.47rem;
		overflow: hidden;
    }
    .h_list{
    	margin: 0.4rem 0.4rem 0;
    	width: 5.82rem;
    	height:2.04rem;
    }
	.swiper-container{
		width: 100%;
		height: 100%;
	}
	.swiper-slide{
		height: 33.33%;
	}
    .h_item{
    	position: relative;
    	display: flex;
    	justify-content: flex-start;
    	border-bottom: 1px dashed #d2d2d2;
    	height: 0.68rem;
    	line-height: 0.68rem;
    	font-size: 0.24rem;
    	color: #666;
    	.h_phone{
    		display: block;
    		width:1.32rem;
    		margin: 0 0.05rem;
    	}
    	.h_prize{
    		width: 2rem;
    		margin: 0 0.05rem;
    		.ellipsis();
    	}
    	.h_time{
    		position: absolute;
    		right: 0;
    		max-width: 1.3rem;
    		.ellipsis();
    	}
    }
}
/*E 中奖名单*/
/*S 底部*/
.h_footer{
	position: fixed;
	left: 0;
	right: 0;
	bottom: 0;
	z-index:10;
	height: 1.2rem;
	box-shadow: 0 0 0.18rem rgba(190,189,189,0.26);
	display: flex;
	align-items: center;
	background-color: #fff;
	a.btn_block{
		color: #fff;
	}
	
}
/*E 底部*/
</style>


