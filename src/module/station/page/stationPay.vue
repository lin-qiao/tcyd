<template>
    <div class="pb110 router_page bg_gray">
        <top :title="title" :isReturn="false"></top>
        <div class="bg_fff">
	        <div class="oil_pay_money ml30 pr30">
	        	<span>支付金额</span>
	        	<span><em class="f34">{{orderAmount|number}}</em>元</span>
	        </div>
			<form-input title="邀请码" placeholder="请输入邀请码" :noBorder="true" v-model='inviteCode' maxlength="11" :disabled="disabled"></form-input>
		</div>
		<div class="plr30 ptb20 c_orange" v-html="inviteTips">
		</div>
        <div class="oil_partner">
        	<com-pay-recharge ref="comPayRecharge" :isShow="true" @toPay="stationPayFn" :payMoney='orderAmount'></com-pay-recharge>
        </div>
		<!--S 温馨提示-->
		<com-warm-prompt code="ZZDDZFWXTS" ></com-warm-prompt>
		<!--E 温馨提示-->
		<div class="c_fixed_bottom">
		    <a href="javascript:void(0);" class="btn_block" @click="toChildCheckPayMoneyAndType">完成支付</a>
		</div>
    </div>
</template>
<script>
import comPayRecharge from 'src/components/com-pay-recharge'
import layerImg from 'src/images/lay_bell.png'//图片
import comWarmPrompt from 'src/components/com-warm-prompt'; //温馨提示
import formInput from 'src/components/formItem/formInput'; //input框
import {fetchTextDetail} from 'src/service/getData';
import {REGEX} from 'src/config/env'//正则
import {
	fetchPartnerOrderPaydetail, //站长支付详情
	fetchPartnerOrderPay//同城站长支付
} from '../service/getData'
export default {
    data() {
    	return {
    	   orderNo:"",//订单号
    	   orderAmount:0,//支付金额
    	   inviteCode:"",//邀请码
		   title:'站长支付',//标题
		   disabled:false,//邀请码是否能否编辑
		   inviteTips:"",//邀请提示
		   invite:0,//是否从分享页面进入支付
    	}
	},
	components: {
		comPayRecharge,
		comWarmPrompt,
		formInput
	},
	activated(){
		this.title = '站长支付';
		this.orderNo=this.$route.query.orderNo||'';//订单号
		this.inviteCode=this.$route.query.inviteCode||'';//邀请码
		if(this.$route.query.inviteCode){
			this.disabled = true;
			this.invite=1;
		}else{
			this.disabled = false;
			this.invite=0;
		}
		this.orderPaydetailFn(this.orderNo);
	},
	mounted(){
		//获取邀请提示
		fetchTextDetail('TCZZZFTXYQM').then(res=>{
			if(res.status){
	    		this.inviteTips=res.data.detail;
	    	}
    	})
	},
	methods: {
		
		orderPaydetailFn(orderNo){//获取订单详情
			fetchPartnerOrderPaydetail(orderNo).then(res=>{
				if(res.status){
					this.title = res.data&&res.data.partnerName +'支付'
					this.orderAmount=res.data&&res.data.orderAmount||0;//订单金额
					if(res.data&&res.data.isChangePrice=="Y"){//Y是N否 是否发生改价
						alertTip("您的订单金额发生了变化");
					}
				}
			});
		},
		toChildCheckPayMoneyAndType(){//调用子组件的 校验金额与类型函数
			if(this.inviteCode){
				if(!REGEX.mobile.regex.test(this.inviteCode)){
					window.alertTip('请输入正确的邀请码');
					return false;
				}
			}
			this.$refs.comPayRecharge.checkPayMoneyAndType();
		},
		stationPayFn(){//同城支付
			fetchPartnerOrderPay(this.orderNo,this.inviteCode,true).then(res=>{
				if(res.status){
	    			alertTip("支付成功",()=>{
		    			this.$router.replace('/stationPaySuccess?invite='+this.invite);
	    			})
	    		}else{
	    			alertTip(res.msg)
	    		}
			});
		}
	}
}
</script>
<style lang="less" scoped>
@import (reference) "~src/style/all.less";
.oil_pay_money{
	height:0.9rem;
	display: flex;
	justify-content: space-between;
	align-items: center;
	background: #fff;
	.f28;
	.c_666;
	.border-b;
}

.oil_share{
	img{
		width:1.82rem;
		.mt30;
	}
	a{
		margin:0.34rem 0.14rem 0;
		padding:0.1rem 0.4rem;
	}
	.c_oil_interest{
		.c_blue;
		border-bottom:1px solid #12ADFF;
		margin:0;
		padding:0;
	}
}
</style>
