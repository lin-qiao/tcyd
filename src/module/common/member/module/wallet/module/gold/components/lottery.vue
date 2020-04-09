<!--抽奖-->
<template>
	<div class="lottery_wrap" ref="wap">
		<div class="priceChanceBtn" style="position: absolute;top: -0.5rem;display: none;">
			您有{{remainingTimes}}次抽奖机会
		</div>
		<div class="box">
			<div v-for="(v,i) in prizeList" ref="pice" class="item" :class="{btn_lottery:i==4}">
				<div class="prize_info" v-if="i!=4">
					<div class="prize_img">
						<img :src="v.picUrlDesc" alt="" />
					</div>
					<p class="prize_name">{{v.prizeName}}({{v.level}})</p>
				</div>
				<div class="btn_inner" v-if="i==4" @click="lottery">
					<p class="status_name">开始抽奖</p>
					<div class="cost">10金币/次</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import {
	fetchLotteryCount,//判断用户第几次抽奖
	fetchLottery,//抽奖
	fetchGetPrize//领奖
}from "../service/getData"
export default {
	data() {
		return {
			prizeList:[],//奖品列表
			prizeLevel: '', // 中奖等级
			prizeId: '', // 奖品id
			prizeName: '', // 奖品名称
			prizeUrl: '', // 奖品图片
			startStatus: '', // 活动开始的状态
			remainingTimes: '', // 剩余抽奖次数
			//抽奖效果参数
			clickFlage: true, // 点击事件，防止重复点击
			timer1: '',
			timer2: '',
			timeFlag: 0, // 时间标记，抽奖请求时间过长，则返回错误
			prizeIndex: 0,//抽奖是转动奖品的索引值
			s1: '',//速度1
			s2: '',//速度2
			arrNum: [0, 1, 2, 5, 8, 7, 6, 3], // 定义转动的顺序
			//不确定
			prizeInfoShow: false, // 显示中奖信息的遮罩层
			noPrizeShow: false, // 没中奖
			havePrizeShow: false, // 中奖了
			haveLottery: false, // 已经抽过奖了
		}
	},
	beforeRouteEnter(to, from, next) {
		next()
	},
	mounted() {
		this.$nextTick(() => {
			this.getGiftList();
		})
	},
	// 销毁组件重新加载
	deactivated() {
//		this.$destroy()
	},
	methods: {
		//获取奖品列表和信息
		getGiftList(){
			var res={
				data:{
					"beginTime": 1506519900000,
				    "endTime": 1601446191000,
				    "currTime": 1506751791732,
				    "remainingTimes":45,
				    "list":[
				    	{
							"level": 1,
							"picUrlDesc": "http://qdtalk.com/wp-content/uploads/2017/09/1-2.png",
							"prizeId": "436066c40529401287658bfd67c1d346",
							"prizeName": "3福币"
						}, {
							"level": 2,
							"picUrlDesc": "http://qdtalk.com/wp-content/uploads/2017/09/2-2.png",
							"prizeId": "acdcb838bda74ec8b1fd202234f852ec",
							"prizeName": "200优惠劵"
						}, {
							"level": 3,
							"picUrlDesc": "http://qdtalk.com/wp-content/uploads/2017/09/3-2.png",
							"prizeId": "484bf4c856b94265960b3e182e9f597f",
							"prizeName": "100优惠劵"
						}, {
							"level": 4,
							"picUrlDesc": "http://qdtalk.com/wp-content/uploads/2017/09/4-2.png",
							"prizeId": "d5c7784c4c4d4a33b141fc1be3b11a71",
							"prizeName": "15福币"
						}, {
							"level": 5,
							"picUrlDesc": "http://qdtalk.com/wp-content/uploads/2017/09/5-2.png",
							"prizeId": "7221846d585a4bed80bf486f94fcabae",
							"prizeName": "10福币"
						}, {
							"level": 6,
							"picUrlDesc": "http://qdtalk.com/wp-content/uploads/2017/09/6-1.png",
							"prizeId": "33c6413801fd44c594cbf6642840a614",
							"prizeName": "8福币"
						}, {
							"level": 7,
							"picUrlDesc": "http://qdtalk.com/wp-content/uploads/2017/09/7-1.png",
							"prizeId": "e453f94905334ea083fca649e87b3308",
							"prizeName": "5福币"
						}, {
							"level": 8,
							"picUrlDesc": "http://qdtalk.com/wp-content/uploads/2017/09/8-1.png",
							"prizeId": "e8df88de1878428bb58d0cc9152d8849",
							"prizeName": "3"
						}
				    ]
				}
			}
			var data=res.data.list;
			data.splice(4, 0, ' ');
			this.prizeList[0] = data[0];
			this.prizeList[6] = data[1];
			this.prizeList[5] = data[2];
			this.prizeList[4] = data[4];
			this.prizeList[2] = data[3];
			this.prizeList[8] = data[5];
			this.prizeList[7] = data[6];
			this.prizeList[1] = data[7];
			this.prizeList[3] = data[8];
			this.remainingTimes = res.data.remainingTimes;
			this.activityStatus(res.data.currTime, res.data.beginTime, res.data.endTime) // 获取状态，开始，未开始，结束
			
		},
		//抽奖
		lottery(){
			if(this.remainingTimes > 0) { // 判断剩余抽奖次数
				if(this.clickFlage) {
					if(this.startStatus === 1) { // 活动开始
						this.clickFlage = false // 不能点击
						this.timer1 = setInterval(this.move, 100)
						//获取中奖奖品信息
						setTimeout(()=>{//模拟接口
							var res={
								msg:"成功",
								code:"000",
								data:{
									"level": 1,
									"picUrlDesc": "http://qdtalk.com/wp-content/uploads/2017/09/1-2.png",
									"prizeId": "436066c40529401287658bfd67c1d346",
									"prizeName": "3福币"
								},
								status:true
							}
							if(res.data) {
								this.prizeLevel = res.data.level;
								this.prizeName = res.data.prizeName;
								this.prizeUrl = res.data.picUrlDesc;
								this.prizeId=res.data.prizeId;
								setTimeout(() => {
									clearInterval(this.timer1)
									this.lowSpeed();
								}, 1200)
							} else {
								alertTip(res.msg)
								this.clickFlage = false // 不能点击
								clearInterval(this.timer1)
								clearInterval(this.timer2)
								// setTimeout(() => { // 刷新后重新加载
								//   location.reload()
								// }, 1500)
							}
						},1000)
						// this.timer1 = setInterval(this.move, 100)
						// 请求，返回后给s定值
					} else if(this.startStatus === 0) { // 没开始
						alertTip('活动尚未开始');
					} else if(this.startStatus === 2) { // 已经结束
						alertTip('活动已经结束');
					}
				}
			} else { // 没有抽奖机会了
				this.prizeInfoShow = true
				this.haveLottery = true
			}
		},
		//清除数据
		initLotteryData(){
			this.prizeLevel= ''; // 中奖等级
			this.prizeId,//奖品id
			this.prizeName= ''; // 奖品名称
			this.prizeUrl= ''; // 奖品图片
			this.timer1= '';
			this.timer2= '';
			this.timeFlag= 0; // 时间标记，抽奖请求时间过长，则返回错误
			this.prizeIndex= 0;//抽奖是转动奖品的索引值
			this.s1= '';//速度1
			this.s2= '';//速度2
			this.arrNum.forEach(v=>{
				this.$refs.pice[v].style.backgroundColor = '#fff';
			})
			this.clickFlage=true;
		},
		//再抽一次
		lotteryAgain(){
			this.initLotteryData();
			this.lottery();
		},
		//判断活动状态
		activityStatus(c, s, e) {
			this.$nextTick(() => {
				if(c < s) { // 当前时间小于开始时间，未开始
					this.startStatus = 0
					this.$refs.pice[4].style.backgroundColor = '#ccc'
				} else if(c > s && c < e) { // 当前时间大于开始时间，并且小于结束时间，已经开始未结束
					this.startStatus = 1
				} else if(c > e) { // 当前时间大于结束时间，已经结束
					this.startStatus = 2
					this.$refs.pice[4].style.backgroundColor = '#dd2726';
				}
			})
		},
		//旋转状态
		move() {
			if(this.prizeIndex === 0) {
				this.$refs.pice[this.arrNum[7]].style.backgroundColor = '#fff'
				this.$refs.pice[this.arrNum[this.prizeIndex]].style.backgroundColor = '#ffe000'
				this.prizeIndex++
			} else if(this.prizeIndex === 8) {
				this.prizeIndex = 0
				this.$refs.pice[this.arrNum[7]].style.backgroundColor = '#fff'
				this.$refs.pice[this.arrNum[this.prizeIndex]].style.backgroundColor = '#ffe000'
				this.prizeIndex++
			} else {
				this.$refs.pice[this.arrNum[this.prizeIndex - 1]].style.backgroundColor = '#fff'
				this.$refs.pice[this.arrNum[this.prizeIndex]].style.backgroundColor = '#ffe000'
				this.prizeIndex++
			}
			if(this.s2 && this.prizeIndex == this.s2) {
				clearInterval(this.timer1)
				clearInterval(this.timer2)
				this.stop()
			}

			this.timeFlag += 100
			if(this.timeFlag >= 10000 && !this.prizeName) {
				clearInterval(this.timer1)
				clearInterval(this.timer2)
				alertTip("当前抽奖人数过多，稍后再来");
				this.clickFlage = true // 能点击
				setTimeout(() => { // 刷新后重新加载
					location.reload()
				}, 1500)
			}
		},
		// 停止
		stop() {
			this.clickFlage = false // 不能点击
			this.lotterySuccess();
//			this.lotteryFailure();
		},
		// 降速
		lowSpeed() {
			clearInterval(this.timer1)
			this.clickFlage = false // 不能点击
			this.timer2 = setInterval(this.move, 300)
			setTimeout(() => { // 顺序打乱
				if(this.prizeLevel == 2) {
					this.s2 = 7
				} else if(this.prizeLevel == 3) {
					this.s2 = 4
				} else if(this.prizeLevel == 4) {
					this.s2 = 3
				} else if(this.prizeLevel == 7) {
					this.s2 = 2
				} else {
					this.s2 = this.prizeLevel
				}
			}, 900)
		},
		//中奖
		lotterySuccess(){
			var data={
				prizeLevel:this.prizeLevel, // 中奖等级
				prizeId:this.prizeId,//奖品id
				prizeName:this.prizeName, // 奖品名称
				prizeUrL:this.prizeUrl // 奖品图片
			}
			this.$emit("lotterySuccess",data);
		},
		//未中奖
		lotteryFailure(){
			this.$emit("lotteryFailure");
		}
	}
}
</script>
<style lang="less" scoped>
.lottery_wrap {
	position: relative;
	width: 100%;
	height: 5.28rem;
	padding-top: 0.86rem;
	background: url(../../../images/bg_raffle.png) no-repeat center;
	background-size: cover;
	.box {
		position: relative;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		width: 6rem;
		height: 3.68rem;
		margin: 0 auto;
		.item {
			width: 1.88rem;
			height:1.12rem;
			margin: 0.05rem;
			border:0.04rem solid #ffb292;
			background-color:#fff;
			flex-shrink:0;
			border-radius:0.2rem;
		}
		.prize_info{
			display: flex;
			flex-direction: column;
			justify-content: center;
			width: 100%;
			height: 100%;
			text-align: center;
		}
		.prize_img{
			img{
				height: 0.5rem;
			}
		}
		.prize_name{
			font-size: 0.24rem;
		}
		.btn_lottery{
			border: 0.05rem solid #f93a65;
			box-shadow:0 0 0.1rem rgba(182,0,0,0.75);
			background-color: #f93a65;
			.btn_inner{
				width: 100%;
				height: 100%;
				border: 0.04rem solid #ffe000;
				border-radius: 0.15rem;
				display: flex;
				flex-direction: column;
				justify-content: center;
				text-align: center;
			}
			.status_name{
				font-size: 0.34rem;
				color: #ffe000;
			}
			.cost{
				font-size: 0.2rem;
				color: #ffe6ec;
			}
		}
	}
	
	
	
	
	.info {
		// width:6.9rem;
		// margin: 0 auto;
		.title {
			width: 2.5rem;
			height: 0.48rem;
			position: relative;
			overflow: hidden;
			margin-left: 50%;
			transform: translateX(-50%);
			vertical-align: middle;
			.squire1 {
				float: left;
			}
			.squire2 {
				float: right;
			}
			.squire {
				width: 0.37rem;
				height: 0.48rem;
				img {
					display: inline-block;
					line-height: 0.48rem;
					width: 0.37rem;
					height: 0.08rem;
					vertical-align: middle;
				}
			}
			span {
				display: blcok;
				position: absolute;
				text-align: justify; //两端对齐
				text-align-last: justify;
				width: 1.4rem;
				left: 50%;
				transform: translateX(-50%);
				font-size: 0.34rem;
				color: #fff;
				font-weight: 700;
				float: left;
				line-height: 0.48rem;
			}
		}
		.infoContent {
			width: 6.9rem;
			height: auto;
			margin: 0.3rem;
			background-color: #62abff;
			padding: 0.3rem 0.2rem;
			box-sizing: border-box;
			ul {
				margin-left: 0.3rem;
				li {
					list-style-type: disc;
					list-style-position: outside;
					font-size: 0.26rem;
					color: #fff;
					text-align: left;
					margin-bottom: 0.5rem;
					position: relative;
					img {
						position: absolute;
						top: 0.15rem;
						left: 0.1rem;
						width: 0.1rem;
						height: 0.1rem;
						float: left;
						margin-right: 0.1rem;
						vertical-align: middle;
					}
				}
			}
		}
	}
	.massage {
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.6);
		position: fixed;
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;
		.noPrize {
			width: 5.3rem;
			height: 4.4rem;
			background-color: #fff;
			position: absolute;
			top: 3.2rem;
			left: 1.1rem;
			border-radius: 0.4rem;
			.close {
				position: absolute;
				width: 0.51rem;
				height: 0.51rem;
				top: -0.8rem;
				right: 0;
				img {
					width: 100%;
					height: 100%;
				}
			}
			p {
				font-size: 0.3rem;
				color: #707070;
				margin: 0.38rem auto 0.2rem;
				text-align: center;
			}
			.xiaofu {
				width: 1.7rem;
				height: 1.7rem;
				border-radius: 100%;
				margin: 0 auto 0.3rem;
				img {
					width: 100%;
					height: 100%;
					display: block;
				}
			}
			.btn {
				width: 3.7rem;
				height: 0.9rem;
				margin: 0 auto;
				background: red;
				background-size: 100%;
				font-size: 0.36rem;
				color: #fff;
				line-height: 0.9rem;
				text-align: center;
				font-weight: 600;
			}
		}
		.haveLottery {
			width: 5.3rem;
			height: 4.4rem;
			background-color: #fff;
			position: absolute;
			top: 3.2rem;
			left: 1.1rem;
			border-radius: 0.4rem;
			.close {
				position: absolute;
				width: 0.51rem;
				height: 0.51rem;
				top: -0.8rem;
				right: 0;
				img {
					width: 100%;
					height: 100%;
				}
			}
			.xiaofu {
				width: 1.7rem;
				height: 1.7rem;
				margin: 0.3rem auto 0.2rem;
				img {
					width: 100%;
					height: 100%;
					display: block;
				}
			}
			p {
				font-size: 0.3rem;
				color: #707070;
				margin: 0.21rem auto 0.37rem;
				text-align: center;
			}
			.btn {
				width: 3.7rem;
				height: 0.9rem;
				margin: 0 auto;
				background-size: 100%;
				font-size: 0.36rem;
				color: #fff;
				line-height: 0.9rem;
				text-align: center;
				font-weight: 600;
			}
		}
		.circleLight {
			width: 9.22rem;
			height: 9.22rem;
			position: absolute;
			top: 0.8rem;
			left: 50%;
			margin-left: -4.61rem;
			-webkit-animation: rotate 20s infinite linear;
			animation: rotate 20s infinite linear;
			transform-origin: 50% 50%;
		}
		@-webkit-keyframes rotate {
			0% {
				-webkit-transform: rotate(0deg);
			}
			100% {
				-webkit-transform: rotate(360deg);
			}
		}
		@keyframes rotate {
			0% {
				transform: rotate(0deg);
			}
			100% {
				transform: rotate(360deg);
			}
		}
		.havePrize {
			width: 5.3rem; // height: 6.1rem;
			padding-bottom: 0.5rem;
			border-radius: 0.4rem;
			position: absolute;
			top: 2.42rem;
			left: 1.1rem;
			background: #fff;
			background-position: top center;
			background-size: 5.3rem 1.42rem;
			.oneBar {
				width: 1.18rem;
				height: 0.46rem;
				position: absolute;
				top: -0.1rem;
				right: 1.1rem;
				img {
					width: 100%;
					height: 100%;
				}
			}
			p {
				padding: 0 0.1rem;
				font-size: 0.3rem;
				color: #707070;
				font-weight: 600;
				margin: 1.72rem auto 0.2rem;
				text-align: center;
			}
			.proImg {
				width: 4.1rem;
				height: 2rem;
				margin: 0 auto 0.36rem;
				img {
					width: 100%;
					height: 100%;
				}
			}
			.btn {
				width: 3.7rem;
				height: 0.9rem;
				margin: 0 auto;
				
				background-size: 100%;
				text-align: center;
				a {
					font-size: 0.36rem;
					color: #fff;
					line-height: 0.9rem;
					text-align: center;
					font-weight: 600;
				}
			}
		}
	}
}
</style>