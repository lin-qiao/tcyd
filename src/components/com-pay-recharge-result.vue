<template lang="html">
	<div>
		<div class="router_page" v-show="time>0">
			<top title="订单支付中" :isReturn="false" left='<i class="iconfont icon-arrow-left"></i>' @clickLeft="routerOrderDetail"></top>
			<img class="pay_img" src="~src/images/loading_.gif" alt="" />
			<p class="text_center f30">订单支付中 ({{time}}s)...</p>
		</div>
		<div class="router_page" v-show="time<=0">
			<top title="订单支付失败" :isReturn="false"></top>
			<img class="fail_img" src="~src/images/ico_2.png" alt="" />
			<p class="text_center f30">订单支付失败！</p>
			<div class="text_center mt40">
				<a class="btn_border pay_btn" @click="routerOrderDetail()" href="javascript:void(0);">查看订单</a>
				<a class="btn pay_btn" :href="contactKF">联系客服</a>
			</div>
		</div>

	</div>
</template>

<script>
import { fetchWallet } from 'src/module/common/member/module/wallet/service/getData' //获取账户余额
//充值渠道、充值
import {fetchGetRechargeStatus} from 'src/service/getData' //获取账户余额,用户协议
	export default {
		data() {
			return {
				bursetotalMoney: {}, //账户信息
				time:20,
				payNo:"",//充值订单号
				orderStatus:"N",
				timeFlag:"" //定时器开关标识
			}
		},
		activated() {
			
		    this.payNo=localStorage.payNo;//获取订单号
		    if(this.payNo){ //需要启动定时查询用户金额
		       localStorage.removeItem("payNo");
		       this.timeFlag= setTimeout(this.getBalance,1000)	
		    }
		},
		methods: {
			getBalance(){
				fetchGetRechargeStatus(this.payNo).then(res=>{
					if(res.status&&res.data.orderRecharge&&res.data.orderRecharge.orderStatus=="Y"){ //充值到账
						//执行父级页面  支付
						 this.orderStatus=res.data.orderRecharge.orderStatus;
						 clearTimeout(this.timeFlag);//移除 定时器
						 this.$emit("confirmPayPwd");
					}
				})
				this.time--;
				if(this.time>0&&this.orderStatus!="Y"){ //倒计时未结束
					this.timeFlag=setTimeout(this.getBalance,1000)
				}
				
			},
			routerOrderDetail(){
				
				let fullPath=this.$route.fullPath;
				this.$router.replace("/index")//站点主页
				
			}
		}
	}
</script>

<style lang="less" scoped>
@import (reference) '~src/style/all.less';
.pay_img{
display: block;
width: 2.5rem;
margin: 1rem auto 0.6rem;
}
.fail_img{
	display: block;
	width: 1.5rem;
	margin: 1rem auto 0.5rem;
}
.pay_btn{
	width: 2.6rem;
	margin: 0 0.1rem;
}
</style>