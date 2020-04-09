<!--收入统计-->
<template lang="html">
    <div class="record_detail">
        <mt-popup v-model="popupVisible" position="bottom" popup-transition="popup-fade" :closeOnClickModal='false'>
	    	<div class="record_detail_tit">{{title}}详情<i @click="closeBtn" class="iconfont icon-close1"></i></div>
	        <div class="record_detail_bg">
	        	<span>{{titleText}}</span>
	        	<!--资金记录,收入-->
	        	<strong v-if="type=='fund'||type=='earning'">{{data.tradeAmount}}</strong>
	        	<!--充值，提现金额-->
	        	<strong v-if="type=='recharge'||type=='withdraw'">{{data.amount}}</strong>
	        	<!--钻石数-->
	        	<strong v-if="type=='jewelRecharge'||type=='jewel'">{{data.masonryAmount}}</strong>
				<!--钻石数-->
				<p class="f28">{{data.partnerName}}</p>
	        	<strong v-if="type=='consume'">-{{data.orderAmount|number(2)}}</strong>
	        </div>
	        <div class="hei20 bg_gray"></div>
	         <!--S 钻石明细详情-->
	        <ul class="record_detail_msg" v-if="type=='jewelRecharge'||type=='jewel'">
	        	<li>充值方式：账户余额</li>
	        	<li>充值金额：{{data.moneyAmount}}元</li>
	        	<li>交易时间：{{data.time}}</li>
	        	<li>订单号：{{data.busSn}}</li>
	        </ul>
	        <!--E 钻石明细详情-->
	        <!--S 充值详情-->
	        <ul class="record_detail_msg" v-else-if="type=='recharge'">
	        	<li>充值方式：{{data.payApi}}</li>
	        	<li>充值金额：{{data.amount}}元</li>
	        	<li>交易时间：{{data.addTime}}</li>
	        	<li>订单号：{{data.orderNo}}</li>
	        </ul>
	        <!--E 充值详情-->
	        <!--S 提现详情-->
	        <ul class="record_detail_msg" v-else-if="type=='withdraw'">
	        	<li>提现方式：{{data.bankName}}（{{data.cardNo}}）</li>
	        	<li>交易时间：{{data.orderDate|date}}</li>
	        	<li>流水号：{{data.orderNo}}</li>
	        </ul>
	        <!--E 提现详情-->
	        <!--S 收入详情-->
	        <ul class="record_detail_msg" v-else-if="type=='earning'">
	        	<li>收入来源：{{data.smallCategory}}</li>
	        	<li>收入时间：{{data.addTime|date}}</li>
	        	<li>订单号：{{data.bizOrder}}</li>
	        </ul>
	        <!--E 收入详情-->
	        <!--S 资金详情-->
	        <ul class="record_detail_msg" v-else-if="type=='fund'">
	        	<li>来源：{{data.smallCategory}}</li>
	        	<li>交易时间：{{data.addTime|date}}</li>
	        	<li>订单号：{{data.bizOrder}}</li>
	        </ul>
	        <!--E 资金详情-->
			<!-- S 消费明细详情 -->
			<ul class="record_detail_msg" v-else-if="type=='consume'">
	        	<li>支付方式：{{data.payTypeStr}}</li>
	        	<li>金额：{{data.orderAmount}}元</li>
				<li>订单号：{{data.orderNo}}</li>
	        	<li>交易时间：{{data.orderDate|date}}</li>
	        	<li v-if="data.isSigned=='Y'&&hostUrl=='test.tcyd-wx.ddtkj.cn'">电子合同：<a :href="'http://test.tcyd-wx.ddtkj.cn/api/tc/partner/order/showContract?orderNo='+data.orderNo" style="color: #0696da;">点击查看>></a></li> 
	            <li v-if="data.isSigned=='Y'&&hostUrl!='test.tcyd-wx.ddtkj.cn'">电子合同：<a :href="'https://tcyd-wx.dadetong.com/api/tc/partner/order/showContract?orderNo='+data.orderNo" style="color: #0696da;">点击查看>></a></li>
			</ul>
			<!-- E 消费明细详情 -->
        </mt-popup>
    </div>
</template>

<script>
import {
	fetchWithdrawDetail,//收入、充值、佣金提现详情
	fetchEarningDetail,//收入详情
	fetchRechargeDetail,//充值详情
	fetchOneRecharge,//钻石充值详情
	fetchMasonryOne//钻石详情
} from '../service/getData'
import {
	fetchStationConsumeDetail, //站长消费明细详情
} from 'src/module/station/service/getData'
export default {
	data(){
        return{
        	popupVisible:false,//弹窗显示
        	title:"",//弹窗title
        	titleText:"",
        	data:{},//详情数据
        	hostUrl:window.location.host
        }
    },
    props:{
    	type:{
    		default:""
    	}
    },
    methods:{
    	closeBtn(){
    		this.popupVisible=false;
    		this.$emit('closePopup');
    	},
    	detailFn(id){//提现详情
    		this.data={}
    		if(this.type=='withdraw'){
    			fetchWithdrawDetail(id).then(res=>{
	    			if(res.status){
	    				this.data=res.data;
	    			}
	    		})
    		}else if(this.type=='earning'||this.type=='fund'){//我的收入详情
    			fetchEarningDetail(id).then(res=>{
    				if(res.status){
	    				this.data=res.data;
	    				this.titleText=this.data.operaType+"（元）";
	    			}
    			})
    		}else if(this.type=='recharge'){//我的充值详情
    			fetchRechargeDetail(id).then(res=>{
    				if(res.status){
	    				this.data=res.data;
	    			}
    			})
    		}else if(this.type=='jewelRecharge'){//我的钻石充值详情
    			fetchOneRecharge(id).then(res=>{
    				if(res.status){
	    				this.data=res.data;
	    			}
    			})
    		}else if(this.type=='jewel'){//我的钻石充值详情
    			fetchMasonryOne(id).then(res=>{
    				if(res.status){
	    				this.data=res.data;
	    			}
    			})
    		}else if(this.type=='consume'){
				fetchStationConsumeDetail(id).then(res=>{
					if(res.status){
						this.data=res.data;
					}
				})
			}
    	}
    },
    components:{
    },
    mounted() {
    	switch(this.type){//区分recharge充值，withdraw提现，钻石详情
			case "withdraw":this.title="提现";this.titleText="提现（元）";break;
			case "recharge":this.title="充值";this.titleText="充值（元）";break;
			case "earning":this.title="收入";break;
			case "fund":this.title="资金明细";break;
			case "consume":this.title="入驻";break;
			default: this.title="钻石充值";this.titleText="充值钻石（个）";break;
		}
	}
}
</script>

<style lang="less" scoped>
    .record_detail .mint-popup{
		width:100%;
		z-index:2;
		padding-bottom:0.4rem;
	}
	.record_detail_tit{
		height:0.98rem;
		border-bottom:1px solid #ddd;
		font-size:0.32rem;
		color:#333333;
		line-height:0.98rem;
		text-align:center;
		position:relative;
		i{
			position:absolute;
			font-size:0.6rem;
			color:#aaa;
			right:0.3rem;
			top:0rem;
		}
	}
	.record_detail_bg{
		background: url(../images/detail_bg.png) no-repeat;
		width:100%;
		height:2.24rem;
		background-size:100%;
		text-align: center;
		padding-top:0.46rem;
		span{
			font-size:0.28rem;
			color:#999;
			display:block;
			margin:0 auto;
			margin-bottom:0.2rem;
		}
		strong{
			font-size:0.6rem;
			color:#333333;
		}
	}
	.record_detail_msg{
		padding-left:0.3rem;
		li{
			height:0.9rem;
			padding-right:0.3rem;
			border-bottom:1px solid #ddd;
			font-size:0.28;
			color:#333;
			line-height:0.9rem;
		}
	}
</style>
