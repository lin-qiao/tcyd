<template>
	<div class="pb80">
		<!--S 头部-->
		<top class="l_sign_title border-n" title="早起打卡赢现金" :isReturn="false" right="<span class='c_fff'>我的战绩</span>" @clickRight="$router.push('/signRecord')"></top>
		<div class="l_sign_banner c_fff text_center pt46">
			<p class="f28">明早打卡可随机瓜分金额(元)</p>
			<p class="f110 mt8">{{formateNum(totalMoney)}}</p>
			<p class="f26 mt8">目前有 {{formateNum(totalPeople)}} 人参与打卡挑战</p>
			<div class="l_sign_avatar flex flex_center justify_center mt30" v-if="iconList.length">
				<img v-for="el in iconList" :src="el|imgUrl"/>
				<i class="iconfont icon-msnui-more ml10 f30"></i>
			</div>
			<p class="f26 mt60"><router-link class="c_fff" to="/signRule">挑战规则<i class="iconfont icon-arrow-right f22 ml6"></i></router-link></p>
			<!--S 邀请好友-->
			<router-link class="l_invite_btn" to="/inviteRecommend">
				<img src="../images/invite.png" alt="" />
			</router-link>
			<!--E 邀请好友-->
		</div>
		<!--E 头部-->
		<!--S 按钮-->
		<div class="l_sign_btn mt60 mb84">
			<router-link class="btn_block" v-if="joinStatus==1||joinStatus==4" :to="'/signPay?money='+money">支付{{money}}元参与挑战</router-link>
			<a class="btn_block" href="javascript:void(0);" v-if="joinStatus==2">打卡倒计时 {{expireTimeStr}}</a>
			<a class="btn_block" href="javascript:void(0);" v-if="joinStatus==3" @click="clockIn">打卡</a>
			<router-link class="btn_border mt30 flex_center justify_center" to="/inviteRecommend" v-if="joinStatus==2">邀请好友加入挑战</router-link>
		</div>
		<!--E 按钮-->
		<!--S 未公布打卡-->
		<p class="f28 c_666 text_center" v-if="!stateList.length">－每日{{bonusTime}}公布当日战况 敬请期待－</p>
		<!--E 未公布打卡-->
		<!--S 打卡状况-->
		<div v-if="stateList.length">
			<p class="f36 c_444 text_center">今日打卡战况</p>
			<p class="c_999 l_sign_state text_center mt6"><span class="c_orange f24 mr10">{{formateNum(succNum)}}</span>成功<span class="c_green ml30 mr10 f24">{{formateNum(failNum)}}</span>失败</p>
			<ul class="l_sign_list flex mt50">
				<li v-for="el in stateList">
					<img class="l_sign_user" :src="el.icon|imgUrl" />
					<p class="tap" v-if="el.type==1"> <!--1.早起之星 2 手气之星 3 毅力之星-->
						<span>早起之星</span>
						<img src="../images/zqzx.png" alt="" />
					</p>
					<p class="tap" v-else-if="el.type==2">
						<span>手气之星</span>
						<img src="../images/sqzx.png" alt="" />
					</p>
					<p class="tap" v-else-if="el.type==3">
						<span>毅力之星</span>
						<img src="../images/ylzx.png" alt="" />
					</p>
					<p class="f24 c_666 mt4">{{el.nickname}}</p>
					<p class="f28 c_z_main mt4">{{el.signedTime}}打卡</p>
				</li>
			</ul>
		</div>
		<!--E 打卡状况-->
		<!--S 打卡成功 弹窗-->
		<div class="layer_shadow" v-if="showSuccess">
	        <section class="layer_box l_sign_layer_box">
	            <div class="con">
	            	<div class="l_sign_layer_top text_center">
	            		<img src="../images/success.png" alt="" />
	            		<p class="f28 c_fff plr30 mt30">每日打卡时间 {{clockTime}}</p>
	            	</div>
	                <div class="layer_con l_sign_layer_con flex_column f26 c_666 mt20">
						<p>今日可随机瓜分金额：<span class="c_z_main">{{totalMoney}}元</span></p>
						<p>{{endTime}}点打卡结束后，可在<a class="c_z_main" href="javascript:void(0);">我的战绩页</a>查看瓜分金额，<span class="c_z_main">{{bonusTime}}点前</span>到账</p>
					</div>
					<div class="l_sign_btn l_sign_layer_btn pb96 mt20">
						<a class="btn_block" href="javascript:void(0);" @click="showSuccess=false">继续坚持一天</a>
					</div>
	            </div>
	            <i class="iconfont icon-close f70 c_fff l_sign_layer_close" @click="showSuccess=false"></i>
	        </section>
	    </div>
		<!--E 打卡成功 弹窗-->
		<!--S 你来晚了 弹窗-->
		<div class="layer_shadow" v-if="joinStatus==4&&showFlag">
	        <section class="layer_box l_sign_layer_box">
	            <div class="con">
	            	<div class="l_sign_layer_top text_center">
	            		<img src="../images/later.png" alt="" />
	            		<p class="f28 c_fff plr30 mt30">每日打卡时间 {{clockTime}}</p>
	            	</div>
	                <div class="layer_con l_sign_layer_con flex_column f26 c_666 mt20">
						<p>懒虫，你起晚了</p>
						<p>起得早的人一共瓜分了<span class="c_z_main">{{totalMoneyYesterday}}元</span><br>不要放弃再挑战一次！</p>
					</div>
					<div class="l_sign_btn l_sign_layer_btn pb96 mt20">
						<a class="btn_block" href="javascript:void(0);" @click="showFlag=false">不甘心 我要早起</a>
					</div>
	            </div>
	            <i class="iconfont icon-close f70 c_fff l_sign_layer_close" @click="showFlag=false"></i>
	        </section>
	    </div>
		<!--E 你来晚了 弹窗-->
	</div>
</template>

<script>
	import {
		fetchClockGetJoin,//查询打卡参与情况
		fetchClockGetClock,//查询今日打卡战况
		fetchClockIn//早起打卡
	} from '../service/getData'
	export default{
		data(){
			return{
				totalMoney:0,//瓜分金额
				totalPeople:0,//参与人数
				iconList:[],//已参与的人的icon
				endTime:'',//结束时间
				money:0,//支付金额
				joinStatus:1,//参与状态  1 参与打卡  2 倒计时  3 打卡  4超时
				succNum:0,//成功人数
				failNum:0,//失败人数
				stateList:[],//打卡状况
				showSuccess:false,//成功弹窗是否显示
				expireTime:0,//当前时间到打卡开始时间的时间戳
				expireTimeStr:'',//当前时间到打卡开始时间的时间格式化'10时45分05秒'
				bonusTime:'',//每日公布战况时间
				t:null,//倒计时的计时器
				totalMoneyYesterday:0,//今日瓜分总金额
				clockTime:'',//打卡时间
				showFlag:false//是否显示迟到弹窗
			}
		},
		activated(){
			this.showFlag = false;
			//判断今天是否已经提醒过你来晚了
			let today = new Date().getMonth()+1+'-'+new Date().getDate();
			if(localStorage.signLateDate&&localStorage.signLateDate==today){
				this.showFlag = false;
			}else{
				this.showFlag = true;
				localStorage.signLateDate = today;
			}
			//初始化
			this.showSuccess = false;
			//查询打卡参与情况
			fetchClockGetJoin().then(res=>{
				if(res.data){
					this.totalMoney = res.data.totalMoney;//瓜分金额
					this.totalPeople = res.data.totalPeople;//参与人数
					this.iconList = res.data.list;//已参与的人的icon
					this.joinStatus = res.data.joinStatus;//参与状态
					this.money = res.data.money;//支付金额
					this.expireTime = res.data.expireTime;//当前时间到打卡开始时间的时间戳
					this.bonusTime = res.data.bonusTime;//每日公布战况时间
					this.totalMoneyYesterday = res.data.totalMoneyYesterday;//今日瓜分总金额
					this.clockTime = res.data.clockTime;//打卡时间
					if(this.clockTime){
						this.endTime = this.clockTime.slice(this.clockTime.indexOf('-')+1);//结束时间
					}
					if(this.joinStatus == 2 && this.expireTime > 0){
						this.Countdown();
						this.t = setInterval(this.Countdown, 1000);
					}
				}
			})
			//查询今日打卡战况
			fetchClockGetClock().then(res=>{
				if(res.data){
					this.succNum = res.data.succNum;
					this.failNum = res.data.failNum;
					this.stateList = res.data.list;
				}
			})
		},
		beforeRouteLeave(to, from, next) {
			/*清除计时器*/
			if(this.t){
				clearInterval(this.t);
			}
			next();
		},
		methods:{
			//倒计时
			Countdown() {
				/*获取时间*/
				let hour = this.formate(Math.floor(this.expireTime % (24 * 60 * 60 * 1000) / (60 * 60 * 1000)));
				let minute = this.formate(Math.floor(this.expireTime % (60 * 60 * 1000) / (60 * 1000)));
				let second = this.formate(Math.floor(this.expireTime % (60 * 1000) / 1000));
				this.expireTimeStr = hour+'时'+minute+'分'+second+'秒';
				/*时间减1s*/
				this.expireTime -= 1000;
				if(this.expireTime<=0){
					this.joinStatus = 3;
					clearInterval(this.t);
				}
			},
			//时间格式化：两位返回两位 一位返回0+这位
			formate(i) {
				if(i < 10) {
					return '0' + i;
				} else {
					return i;
				}
			},
			//数字格式化  每隔三位添加逗号
			formateNum(n){
				let b=parseInt(n).toString();
				let len=b.length;
				if(len<=3){return b;}
				let r=len%3;
				return r>0?b.slice(0,r)+","+b.slice(r,len).match(/\d{3}/g).join(","):b.slice(r,len).match(/\d{3}/g).join(",");
			},
			//打卡
			clockIn(){
				fetchClockIn().then(res=>{
					if(res.status){
						this.totalMoney = res.data.totalMoney;//瓜分总钱数
						this.endTime = res.data.endTime;//结束时间
						this.joinStatus = 1;//当天已打卡  显示参与按钮  参与第二天的打卡
						this.showSuccess = true;
					}
				})
			}
		}
	}
</script>

<style lang="less">
.l_sign_title{
	.tit_icon i,.tit_font{
		color: #fff!important;	
	}
}
</style>
<style lang="less" scoped>
@import (reference) '~src/style/all.less';
.c_444{
	color: #444;
}
.c_orange{
	color: #fe801b!important;
}
.c_green{
	color: #529b04!important;
}
.l_sign_title{
	background: #f4564b;
}
.l_sign_banner{
	position: relative;
	height: 6.74rem;
	background: url(../images/banner.jpg) no-repeat center;
	background-size: 100%;
	.l_sign_avatar{
		img{
			width: 0.48rem;
			height: 0.48rem;
			.border-radius(50%);
			border: 0.03rem solid #fff;
			margin-left: -0.12rem;
		}
	}
	.l_invite_btn{
		display: block;
		width: 1.16rem;
		position: absolute;
		right: 0.34rem;
		bottom: 0.42rem;
		img{
			width:100%;
		}
	}
}
.l_sign_btn{
	width: 6.86rem;
	margin: 0 auto;
	.btn_block,.btn_border{
		width: 100%;
		height: 1rem;
		padding: 0;
		.border-radius(0.1rem);
		.f32;
	}
	.btn_block{
		line-height: 1rem;
	}
	.btn_border{
		.flex;
	}
	.btn_packet{
		width: 0.38rem;
	}
}
.l_sign_layer_btn{
	width: 4.88rem;
}
.l_sign_state{
	font-size: 0.25rem;
}
.l_sign_list{
	li{
		width: 33.33%;
		text-align: center;
		p{
			text-align: center;
		}
		.l_sign_user{
			display: block;
			width: 1.1rem;
			height: 1.1rem;
			margin: 0 auto;
			margin-bottom: -0.4rem;
			.border-radius(50%);
		}
		.tap{
			display: inline-block;
			position: relative;
			min-width: 1.7rem;
			height: 0.65rem;
			margin-left: -0.4rem;
			padding-top: 0.16rem;
			padding-left: 0.6rem;
			padding-right: 0.1rem;
			line-height: 0.4rem;
			text-align: center;
			color: #fff;
			.f22;
			img{
				width: 1.7rem;
				position: absolute;
				top: 0;
				left: 0;
			}
			span{
				position: relative;
				z-index: 1;
			}
		}
	}
}
.l_sign_layer_box{
	width: 5.6rem;
	margin-left: -2.8rem;
}
.l_sign_layer_con{
	line-height: 0.38rem;
}
.l_sign_layer_top{
	height: 2.9rem;
	background: url(../images/layer_top.jpg) no-repeat center top;
	background-size: 100%;
	padding-top: 0.62rem;
	.border-radius(0.1rem);
	img{
		height: 0.58rem;
	}
	p{
		display: inline-block;
		background: #f56150;
		.border-radius(0.28rem);
		line-height: 0.56rem;
	}
}
.l_sign_layer_close{
	position: absolute;
	left: 50%;
	margin-left: -0.35rem;
	bottom: -1.2rem;
}
</style>