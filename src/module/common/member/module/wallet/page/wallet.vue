<template>
	<div class='pb110'>
		<top title="我的钱包" :isReturn="false"></top>
		<div class="c_wallet_index">
			<!--S 钱包可用余额-->
			<div class="c_wallet_msg">
				<p class="f24 pl50 mb18">可用余额（元）<i class="iconfont icon-bangzhu" @click="walletExplain"></i></p>
				<em class="f56 pl50">{{usableData.usableBalance||0}}</em>
				<router-link to="/wallet/fundRecord" class="c_wallet_span f26 c_main">资金记录<i class="iconfont icon-arrow-right"></i></router-link>
				<div class="c_wallet_type">
					<router-link to="/wallet/myRecharge">
						<span class="f24">可用充值 (元) ></span>
						<em class="f36">{{usableData.usableRecharge||0}}</em>
					</router-link>
					<b class="c_midline"></b>
					<router-link to="/wallet/myEarning">
						<span class="f24">可用收入 (元) ></span>
						<em class="f36">{{usableData.usableIncome||0}}</em>
					</router-link>
					<b class="c_midline"></b>
					<router-link to="/wallet/myHire">
						<span class="f24">可用佣金 (元) ></span>
						<em class="f36">{{usableData.usableBrokerage||0}}</em>
					</router-link> 
				</div>
			</div>
			<!--E钱包可用余额-->
			<!--S 充值记录-->
			<div class="c_wallet_record">
				<span class="f28 flex flex_center justify_center" @click="routerRecharge()"><img src="../images/recharge.png"/>我要充值</span>
				<div class="swiper-container" id="J_recharge_list">
					<div class="swiper-wrapper">
						<div class="swiper-slide" v-for="el in rechargeList">{{el.json}}<em class="c_main">{{el.amount}}</em>元</div>
					</div>
				</div>
			</div>
			<!--E 充值记录-->
		</div>
		<div class="bg_gray hei20"></div>
		<!--S 银行卡，红包，现金券等数据-->
		<itemCell title="绑定银行卡" :isLink="true" :value="(walletData.bankNo||0)+'张'" to="/wallet/bankcard">
			<img slot="img" src="../images/wallet1.png" class="c_wallet_icon"/>
		</itemCell>
		<itemCell title="我的红包" :isLink="true" :value="(walletData.redBag||0)+'个'" to="/wallet/redpacketList">
			<img slot="img" src="../images/wallet4.png" class="c_wallet_icon"/>
		</itemCell>
	    <!--<itemCell title="我的钻石" :isLink="true" :value="(walletData.diamond||0)+'个'"  to="/wallet/myJewel">
			<img slot="img" src="../images/wallet2.png" class="c_wallet_icon"/>
		</itemCell>
		<itemCell title="我的金币" :isLink="true" :value="(walletData.gold||0)+'个'" to="/wallet/myGold">
			<img slot="img" src="../images/wallet3.png" class="c_wallet_icon"/>
		</itemCell>
		<itemCell title="我的红包" :isLink="true" :value="(walletData.redBag||0)+'个'" to="/wallet/redpacketList">
			<img slot="img" src="../images/wallet4.png" class="c_wallet_icon"/>
		</itemCell>
		<itemCell title="我的现金劵" :isLink="true" :value="(walletData.coupon||0)+'张'" to="/wallet/cashList">
			<img slot="img" src="../images/wallet5.png" class="c_wallet_icon"/>
		</itemCell>
		<div class="bg_gray hei20"></div>
		<itemCell title="保证金" :isLink="true" :value="(walletData.deposit||0)+'元'" to="/wallet/myDeposit">
			<img slot="img" src="../images/wallet6.png" class="c_wallet_icon"/>
		</itemCell>-->
		<itemCell title="冻结金额" :value="(walletData.freeze||0)+'元'">
			<i slot="icon" class="iconfont icon-bangzhu c_main f32 ml5" @click="explainFn"></i>
			<img slot="img" src="../images/wallet7.png" class="c_wallet_icon"/>
		</itemCell>
		<itemCell title="我的消费金" :value="(walletData.encourage||0)+'元'" :isLink="true" to="/wallet/myConsume">
			<img slot="img" src="../images/wallet8.png" class="c_wallet_icon"/>
		</itemCell>
		<!--<itemCell title="流量宝" :isLink="true">
			<img slot="img" src="../images/wallet8.png" class="c_wallet_icon"/>
		</itemCell>-->
		<!--E 银行卡，红包，现金券等数据-->
		<transition name="page-slide">
	     <keep-alive>
				<router-view></router-view>
	     </keep-alive>
		</transition>
	</div>
</template>

<script>
import itemCell from 'src/components/item/itemCell'
import {
	fetchWallet,//钱包信息
	fetchWalletData,//银行卡，红包，现金券等数据
	fetchRechargeLog//根据时间获取充值记录
} from '../service/getData'
import {fetchTextDetail} from 'src/service/getData'//冻结金额释义

export default {
	data() {
		return {
			usableData:{},//用户可用金额
			walletData:{},//银行卡，红包，现金券等数据
			typeCode:'recharge',//充值记录参数
			rechargeList:[],//充值记录列表
			swiper:null,//充值记录swiper
		}
	},
	components: {
		itemCell
	},
	deactivated(){
        this.$destroy();	
    },
	activated() {
		this.getWallet();//可用金额
		this.getWalletData();//银行卡，红包，现金券等数据
	},
	mounted(){
		fetchRechargeLog('10').then(res=>{//充值记录
			if(res.status&&res.data){
				this.rechargeList = res.data.list||[];
				this.$nextTick(()=>{
					this.swiper = new Swiper('#J_recharge_list', {
						loop: true,
						direction: 'vertical',
						grabCursor: true,
						autoplay: 3000,
						autoplayDisableOnInteraction:false
					})
				})
			}
		})
		
	},
	watch:{
	},
	methods: {
		explainFn(){//冻结金额释义
			fetchTextDetail('TCDJYJWXTS').then(res=>{
				if(res.status){
					this.$alert({
						layerImg:require('src/images/account.png'),
						content:res.data.detail,
						confirmBtn:'我知道了'
					})
				}
			})
		},
		walletExplain(){//可用余额释义
			this.$alert({
				layerImg:require('src/images/account.png'),
				content:'可用余额=可用充值+可用收入+可用佣金+消费金组成',
//				content:'可用余额=可用充值+可用收入组成',
				confirmBtn:'我知道了'
			})
		},
		getWallet(){//可用金额
 			fetchWallet().then((res)=>{
				if(res.status){
		        	this.usableData=res.data;
		        }
			})
		},
		getWalletData(){//银行卡，红包，现金券等数据
			fetchWalletData().then((res)=>{
				if(res.status){
		        	this.walletData=res.data;
		        }
			})
		},
		routerRecharge(){ //跳转去充值页面
			this.$router.push("/wallet/recharge?balance="+this.walletData.balance)
		}
	}
}
</script>

<style lang="less">
@import (reference) "~src/style/all.less";
@import "../style/wallet.less";
.f56{font-size:0.56rem;}
.c_wallet_index{
	padding:0.3rem 0.04rem 0;
	position:relative;
	.c_wallet_msg{
		background:url(../images/wallet_bg.png) no-repeat center 0;
		background-size:100%;
		.c_fff;
		padding-top:0.3rem;
	}
	.c_wallet_type{
		display: flex;
		width:6.9rem;
		margin:0.9rem auto 0;
		padding-bottom:0.4rem;
		align-items: center;
		justify-content: space-around;
		a{
			.c_fff;
			text-align: center;
			span{
				display:block;
				margin-bottom:0.06rem;
			}
		}
		.c_midline{
			width:1px;
			height:0.4rem;
			background: #ff9f96;
		}
	}
	.c_wallet_record{
		display: flex;
		padding:0.34rem 0.3rem;
		height:1rem;
		justify-content: space-between;
		span{
			width:60%;
		}
		span:first-child{
			width:40%;
			border-right:2px solid #e8e8e8;
		}
		em{
			color:#ff4b48;
		}
		img{
			width:0.6rem;
			vertical-align: -0.1rem;
			margin-right:0.2rem;
		}
	}
	.c_wallet_span{
		width:1.74rem;
		height:0.56rem;
		background: #fff5f4;
		border-top-left-radius: 0.28rem;
		border-bottom-left-radius: 0.28rem;
		display:block;
		text-align: center;
		line-height:0.56rem;
		position:absolute;
		top: 1rem;
        right: 0.28rem;
	}
}

.c_wallet_icon{
	width:0.4rem !important;
	height:0.4rem !important;
}

</style>
