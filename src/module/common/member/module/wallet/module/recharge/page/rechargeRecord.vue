<template>
	<div class='pb98 router_page'>
		<top title="现金充值明细" :isReturn="false"></top>
		<div class="hei20 bg_gray"></div>
		<!--S 现金充值明细-->
		<div v-for="el in rechargeList" v-if="rechargeList.length">
		    <div class="c_fund_info">
		    	<span class="mr10">{{el.time}}</span>  
		    	成功充值(元)<span class="mlr10">{{el.rechargeSum|number}}</span>
		    </div>
		    <cell 
				:title="item.payApiStr" 
				:label="item.addTime" 
				:money="item.amount"
				:value="item.orderStatusStr"
				:isLink="true"
				@detailUrl="showDetail(item.orderNo)"
				v-for="item in el.moneyDetailList">
	            <img :src="item.payApi|payType" slot="img"/>
			</cell>
		</div>
		<!--E 现金充值明细-->
		<!--S 无数据-->
		<nodata v-if="!rechargeList.length"></nodata>
		<!--E 无数据-->
		<!--S 详情弹窗-->
		<detail-popup ref="detailPopup" @closePopup="colseDetail" type="recharge"></detail-popup>
		<!--E 详情弹窗-->
	</div>
</template>

<script>
	import cell from '../../../components/cell'//列表
	import detailPopup from '../../../components/detailPopup' //详情
	import {fetchRechargeList} from '../../my/service/getData'//充值列表
export default {
	data() {
		return {
			rechargeList:{},//充值列表
		}
	},
	components: {
		cell,
		detailPopup
	},
	activated() {
		this.getRechargeList();//充值记录
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
		getRechargeList(){//充值列表
			fetchRechargeList().then(res=>{
				if(res.status){
					this.rechargeList=res.data.list||[];
				}
			});
		}
	}
}
</script>

<style lang="less">
</style>
