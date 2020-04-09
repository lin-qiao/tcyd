<template>
	<div>
		<top title='同城  <span class="title_circle">●</span> 付款' :isReturn="false"></top>
        <div class="c_pay_type">
        	<a href="javascript:void(0);" class="c_pay_circle" @click="toPay('Deposit')">
        		付定金
        	</a>
        	<p>约定线下见面后支付见面定金，定金付到平台<br>线下见面后再确认定金给服务者，保证您的权益</p>
        	<em class="f26 c_999">适合当面交易</em>
        </div>
        <div class="bg_gray hei20"></div>
        <div class="c_pay_type" @click="toPay('Full')">
        	<a href="javascript:void(0);" class="c_pay_circle">
        		付全款
        	</a>
        	<p>担保支付，服务全款支付到平台<br>服务完成后再确认给服务者</p>
        	<em class="f26 c_999">适合线上交易，例如翻译、程序编写等</em>
        </div>
         <div class="bg_gray hei20"></div>
	</div>
</template>

<script>
	
	
	
export default {
	data() {
		return {
		     requireId:"",//需求Id
		     payBalance:0,//支付金额
		     serviceMid:1, //服务者Id
		}
	},
	activated(){
		this.requireId=this.$route.query.requireId||1;//需求ID
		this.payBalance=this.$route.query.payBalance||100;//支付金额
		this.serviceMid=this.$route.query.serviceMid||1;//服务者ID
	},
	components:{
		
	},
	methods:{
		toPay:function(paymentMethod){
			//跳转到支付页面    带需求 id, 支付金额（服务者 每小时的价格），服务者Id,支付类型（ 定金 or 全款）
			this.$router.replace('/pay?requireId='+this.requireId+"&payBalance="+this.payBalance+"&serviceMid="+this.serviceMid+"&paymentMethod="+paymentMethod);
		}
	},
	mounted(){
					
	}

}
</script>
<style lang="less" scoped>
@import '../style/demand.less';
</style>
