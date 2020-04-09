<template>
	<div class='router_page'>
		<top :title="title" :isReturn="false"></top>
		<!--S 提现列表-->
		<div v-for="el in recordList" v-if="recordList.length">
			<div class="hei20 bg_gray"></div>
			<div class="c_fund_info">
				<span class="mr10">{{el.time}}</span>  
				成功提现(元) <span class="mlr10">{{el.moneySum}}</span>
			</div>
			<cell 
				:title="item.bankName+'('+item.cardNo+')'" 
				:label="item.orderDate" 
				:money="'-'+item.amount+'元'"
				:value="item.status"
				:isLink="true"
				@detailUrl="showDetail(item.id)" v-for="item in el.secondList">
			</cell>
		</div>
		<!--E 提现列表-->
		<!--S 无数据-->
		<nodata v-if="!recordList.length"></nodata>
		<!--E 无数据-->
		<!--S 详情弹窗-->
		<detail-popup ref="detailPopup" @closePopup="colseDetail" type="withdraw"></detail-popup>
		<!--E 详情弹窗-->
	</div>
</template>

<script>
	import cell from '../../../components/cell'//列表
	import detailPopup from '../../../components/detailPopup' //详情
	import {fetchRwithdrawRecord,fetchEwithdrawRecord,fetchHwithdrawRecord} from '../service/getData'//提现明细
export default {
	data() {
		return {
			title:"可用充值提现明细",//页面title
			type:1,//页面类型 1充值提现明细   2收入提现明细   3佣金提现明细
			recordList:[]//充值提现列表
		}
	},
	components: {
		cell,
		detailPopup
	},
	activated() {
		this.type=this.$route.query.type;//获取地址栏参数
		this.pageType(this.type);//获取列表数据
	},
	mounted(){
	},
	watch:{
	},
	methods: {
		showDetail(id){//打开详情弹窗
			this.$refs.detailPopup.popupVisible=true;
			this.$refs.detailPopup.detailFn(id);
		},
		colseDetail(){//关闭详情弹窗
			this.$refs.detailPopup.popupVisible=false;
		},
		pageType(type){//区分页面类型函数
			this.recordList=[];
			if(type==1){//1充值提现明细 
				this.title="可用充值提现明细"
				this.getRwithdrawList();
			}else if(type==2){//2收入提现明细
				this.title="可用收入提现明细"
				this.getEwithdrawList();
			}else if(type==3){//3佣金提现明细
				this.title="可用佣金提现明细"
				this.getHwithdrawList();
			}
		},
		getRwithdrawList(){//获取充值提现列表
			fetchRwithdrawRecord().then(res=>{
				if(res.status){
		        	this.recordList=res.data.list;//充值提现列表
		        }
			})
		},
		getEwithdrawList(){//获取收入提现列表
			fetchEwithdrawRecord().then(res=>{
				if(res.status){
		        	this.recordList=res.data.list;//收入提现列表
		        }
			})
		},
		getHwithdrawList(){//获取佣金提现列表
			fetchHwithdrawRecord().then(res=>{
				if(res.status){
		        	this.recordList=res.data.list;//佣金提现列表
		        }
			})
		}
	}
}
</script>

<style lang="less">
</style>
