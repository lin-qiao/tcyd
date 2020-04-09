<template>
	<div class="router_page bg_gray pb98">
		<top title='同城  <span class="title_circle">●</span> 支付' :isReturn="false"></top>
		<div class="bg_fff">
			<form-input title="支付金额" placeholder="请输入支付金额" class="border-n"  disabled="disabled" :value="payBalance+' 元'"></form-input>
		</div>
		<div class="hei20 bg_gray"></div>
		<!--S 充值与账户支付-->
		<com-pay-recharge ref="comPayRecharge" @toPay="toPay" :payMoney="payBalance"></com-pay-recharge>
		<!--E 充值与账户支付-->
		<div class="c_fixed_bottom">
		    <a href="javascript:void(0);" class="btn_block" @click="pay">支付</a>
		</div>
	</div>
</template>

<script>
import formInput from "src/components/formItem/formInput"//输入框
import comPayRecharge from "src/components/com-pay-recharge"//充值与账户支付
//需求 下单 付款 （需求人向服务者付款）
import {fetchClockPay} from '../service/getData'//参与早起打卡付款
export default {
	data() {
		return {
		    payBalance:"0"//支付金额
		}
	},
	components:{
		formInput,
		comPayRecharge
	},
	activated(){
		//获取支付金额
		this.payBalance = this.$route.query.money||'1';
	},
	methods:{
		pay(){
			//panduan
			this.$refs.comPayRecharge.checkPayMoneyAndType();
		},
		toPay(payWay,pwd){
			//如果定金支付，支付金额变更为 用户输入的金额
			fetchClockPay(this.payBalance,this.$refs.comPayRecharge.accountType.toString(),pwd).then(res=>{
				if(res.status){
					this.$router.replace('/signSuccess?time='+res.data.clockTime);
				}
			})
		}
	}
}
</script>
<style lang="less" scoped>
.c_ccc{color:#ccc;}
.c_pay_list{
	position:relative;
	img{
		position:absolute;
		left:0rem;
		top:50%;
		margin-top:-0.3rem;
		width:0.6rem;
		height:0.6rem;
	}
	i{
		color:#cccccc;
		font-size:0.4rem;
	}
}
.c_pay_list span:first-child{
	padding-left:0.9rem;
	
}
</style>
