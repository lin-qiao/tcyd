<template>
	<div class="router_page bg_gray pb98">
		<top :title='title' :isReturn="false"></top>
		<div class="bg_fff" v-if="paymentMethod=='Deposit'">
			<form-input title="支付金额" placeholder="请输入支付金额" class="border-n" :unit="true" :isFloat="true" v-model="depositMoney"><span class="ml20">元</span></form-input>
		</div>
		<div class="bg_fff" v-else>
			<form-input title="支付金额" placeholder="请输入支付金额" :disabled="true" class="border-n" :unit="true" v-model="payBalance"><span class="ml20">元</span></form-input>
		</div>
		<div class="hei20 bg_gray"></div>
		<div class="c_demandDetail_li" @click="payEarnestMoney=='Y'?payEarnestMoney='N':payEarnestMoney='Y'">
			<span>诚意金（ {{earnestMoney}}元 ）
				<!--<i class="iconfont icon-bangzhu" @click="earnestExplain"></i>-->
			</span>
			<i class="iconfont icon-xzdg c_ccc f40" :class="{c_main:payEarnestMoney=='Y'}"></i>
		</div>
		<div class="c_demandDetail_li border-n" v-if="paymentMethod != 'Deposit'">
			<span>使用红包</span>
			<div class="redPacket_con">
				<router-link v-if="redPacketNum" :to="{path:'/redPacket',query:{orderMoney:payBalance}}">
					<span v-if="!rid">{{redPacketNum}}个红包可用</span>
					<span v-else>优惠{{redMoney}}元</span>
				</router-link>
				<span class="c_999" v-else>暂无可用</span>
				<i class="iconfont icon-arrow-right c_ccc"></i>
			</div>
		</div>
		<div class="hei20 bg_gray"></div>
		<!--S 充值与账户支付-->
		<com-pay-recharge ref="comPayRecharge" :payType="paymentText" @toPay="toPay" :payMoney="payMoney" :showPayMoney="showPayMoney"></com-pay-recharge>
		<!--E 充值与账户支付-->
		<!--S 温馨提示-->
		<com-warm-prompt code="TCFKWXTS" class="mt60"></com-warm-prompt>
		<!--E 温馨提示-->
		<div class="c_fixed_bottom">
			<a href="javascript:void(0);" class="btn_block" @click="toChildCheckPayMoneyAndType()">支付{{paymentText}}</a>
		</div>
	</div>
</template>

<script>
import { mapState } from 'vuex';
import comWarmPrompt from 'src/components/com-warm-prompt'; //温馨提示
import formInput from "src/components/formItem/formInput" //输入框
import comPayRecharge from "src/components/com-pay-recharge" //输入框
//需求 下单 付款 （需求人向服务者付款）
import {
	fetchRequireRedPay, //获取可用红包
	fetchRequireToPayInviter,
	fetchRequireEarnestMoney,
	fetchRequireLastPay
} from '../service/getData' //需求详情
export default {
	data() {
		return {
			requireId: "", //需求Id
			payBalance: "0", //支付金额
			earnestMoney: 0, //诚意金
			serviceMid: 0, //服务者Id
			paymentMethod: "deposit", //支付类型， deposit（定金），full(全款)
			paymentText: "定金", //支付按钮的文本内容
			payEarnestMoney: "Y", //是否支付诚意金  （Y/N）
			depositMoney: "", //定金支付金额
			orderSn: "", //尾款支付时 需求详情页面传来的 订单号
			redPacketNum:0, //可用红包数量
		}
	},
	components: {
		comWarmPrompt,
		formInput,
		comPayRecharge
	},
	computed: {
		...mapState([
			'rid','redMoney'
		]),
		title() {
			return '同城  <span class="title_circle">●</span> 付' + this.paymentText;
		},
		showPayMoney() { //给支付组件传的显示的支付金额，需要弹窗支付
			if (this.paymentMethod == "Deposit") {
				return this.depositMoney;
			} else {
				return this.payBalance;
			}
		},
		payMoney() { //给支付组件传的用做运算的支付金额
			if (this.payEarnestMoney == 'Y') {
				return this.showPayMoney - this.earnestMoney <= 0 ? 0 : this.showPayMoney - this.earnestMoney;
			} else {
				return this.showPayMoney;
			}
		}
	},
	methods: {
		//获取可用红包数
        getRedPacketList(){
            fetchRequireRedPay(this.payBalance).then(res => {
                if(res.data && res.data.list && res.data.list.length){
                    this.redPacketNum = res.data.list.length;
                }
            })
        },
		earnestExplain() {
			this.$alert({
				layerImg: require('src/images/account.png'),
				content: '预付诚意金，同城约单会将您的需求推送给优质的服务者，诚意金金额越高，推送的服务者越优质，且诚意金可用于支付，如交易未完成，诚意金将退回您的账户。',
				confirmBtn: '我知道了'
			})
		},
		toChildCheckPayMoneyAndType() { //调用子组件的 校验金额与类型函数
			if (this.paymentMethod == "Deposit") {
				if (!this.depositMoney) {
					alertTip('请输入支付金额');
					return;
				}
				if (parseFloat(this.depositMoney) >= parseFloat(this.payBalance)) {
					alertTip('定金支付金额必须小于全款金额');
					return;
				}
			}
			this.$refs.comPayRecharge.checkPayMoneyAndType()
		},
		toPay: async function(accountType, payPwd) {
			//如果尾款支付
			if (this.paymentMethod == "last") {
				let data = {
					orderSn: this.orderSn, //订单流水号
					spareMoney: this.payBalance, //尾款
					payEarnestMoney: this.payEarnestMoney, //是否支付诚意金
					accountType: accountType, //支付类型 ，字符串
					tradePassword: payPwd //交易密码
				}
				if(this.rid){
					data.redId = this.rid //红包id
				}
				//支付尾款
				let res = await fetchRequireLastPay(data);
				if (res.status) {
					alertTip("支付成功", () => {
						this.$router.replace('/demandDetail?requireId=' + this.requireId);
					})
				} else {
					alertTip("支付失败！")
				}

			} else {
				let data = {
					requireId: this.requireId, //需求id
					paymentMethod: this.paymentMethod, //付款方式（定金  or 全款）
					payBalance: this.payBalance, //支付金额
					payEarnestMoney: this.payEarnestMoney, //是否支付诚意金
					accountType: this.$refs.comPayRecharge.accountType.toString(), //支付类型 数组转字符串
					serviceMid: this.serviceMid, //服务者Id
					tradePassword: payPwd //交易密码
				}
				if (this.paymentMethod == "Deposit") {
					data.payBalance = this.depositMoney;
				}
				if(this.rid){
					data.redId = this.rid //红包id
				}
				//需求下单
				let res = await fetchRequireToPayInviter(data);
				if (res.status) {
					alertTip("支付成功", () => {
						this.$router.replace('/demandDetail?requireId=' + this.requireId);
					})
				} else {
					alertTip("支付失败！")
				}

			}
		}
	},
	activated() {
		this.requireId = this.$route.query.requireId || 1; //需求ID
		this.payBalance = this.$route.query.payBalance || 0; //支付金额
		this.serviceMid = this.$route.query.serviceMid || 1; //服务者ID
		this.paymentMethod = this.$route.query.paymentMethod; //Deposit（定金），Full(全款)
		this.orderSn = this.$route.query.orderSn; //订单号  尾款支付 时用到
		if (this.paymentMethod == 'Deposit') { //定金支付
			this.paymentText = "定金";
		} else if (this.paymentMethod == 'Full') { //尾款全款支付
			this.paymentText = "全款";
			this.getRedPacketList();
		} else if (this.paymentMethod == "last") { //尾款支付
			this.paymentText = "余款";
			this.getRedPacketList();
		}
		this.depositMoney = "";
		//查询诚意金
		fetchRequireEarnestMoney(this.requireId).then(res => {
			if (res.status) {
				this.earnestMoney = res.data.earnestMoney;
			}
		})
	}


}
</script>
<style lang="less" scoped>
@import '../style/demand.less';
.c_ccc {
	color: #ccc;
}
.c_pay_list {
	position: relative;
	img {
		position: absolute;
		left: 0;
		top: 50%;
		margin-top: -0.3rem;
		width: 0.6rem;
		height: 0.6rem;
	}
	i {
		color: #cccccc;
		font-size: 0.4rem;
	}
}
.c_pay_list span:first-child {
	padding-left: 0.9rem;

}
</style>
