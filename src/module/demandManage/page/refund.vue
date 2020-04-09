<template>
	<div class="router_page bg_gray">
		<top title='同城  <span class="title_circle">●</span> 申请退款' :isReturn="false"></top>
		<form-textarea input_placeholder="请输入您的退款原因"  maxlength="100" class="border-n pt20 plr30" v-model.trim="reason"></form-textarea>
	    <div class="bg_gray hei20"></div>
	    <dl class="c_refund_money">
	    	<dd class="pl30">可退款金额  <em class="c_666">最多{{refundableAmount|number}}元</em></dd>
	    	<dd class="flex">
	    		<form-input title="" align="true" placeholder="请输入您的退款金额" class="border-n" :unit="true" :isFloat="true" v-model="realyMoney"></form-input>元
	    		<!--<input type="text" v-model.trim="realyMoney" placeholder="请输入您的金额"/>元-->
	    	</dd>
	    </dl>
	    <p class="mt20 pl30 c_main f24">您所退款的剩余款项将划分给服务者，不可再退回</p>
	    <a href="javascript:void(0)" class="btn_block mt60"  @click="toDrawBack" >提交申请</a>
	</div>
</template>

<script>
	import formTextarea from 'src/components/formItem/formTextarea'
	import formInput from "src/components/formItem/formInput"//输入框
	//查询可退款金额，退款
	import {fetchRequireDrawBack,fetchRequireDrawBackMoney} from '../service/getData'//需求详情
export default {
	data() {
		return {
			orderSn:"",//订单号
		    reason:"",//退款原因
		    refundableAmount:0,//可退金额
		    realyMoney:0//真实退款金额
		}
	},
	components:{
		formTextarea,
		formInput
	},
	methods:{
		toDrawBack:function(){//退款操作
			//校验
			if(!this.reason){
				alertTip("请输入退款原因");	
				return;
			}
			if(!this.realyMoney){
				alertTip("请输入退款金额");
				return;
			}
			if(this.realyMoney>this.refundableAmount){
				alertTip("您最多可申请退款"+this.refundableAmount+"元");	
				return;
			}
			fetchRequireDrawBack(this.orderSn,this.realyMoney,this.reason).then(res=>{
				if(res.status){
					alertTip("退款申请提交成功。",()=>{
						this.$router.go(-1);
					});
				}
			})
		}
	},
	activated(){
		this.reason = "";
		this.realyMoney = "";
		this.orderSn=this.$route.query.orderSn;
		if(!this.orderSn){
			alertTip("订单号异常，请点击返回按钮重新操作！")
			return;
		}
		//根据订单号查询可退金额 （用户可以有多个订单可以切换查看）
		fetchRequireDrawBackMoney(this.orderSn).then(res=>{
			this.refundableAmount=res.data.refundableAmount||0;//可退金额
		})
	}

}
</script>
<style lang="less" scoped>
@import '../style/demand.less';
.c_refund_money{
	background: #fff;
	dd{
		padding-right:0.3rem;
		height:0.8rem;
		line-height: 0.8rem;
		font-size:0.28rem;
		input{
			width:6.5rem;
			height:0.8rem;
			font-size:0.26rem;
			color:#666;
		}
	}
	dd:first-child{
		border-bottom:1px solid #eee;
	}
}
</style>
