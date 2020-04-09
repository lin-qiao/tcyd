<template>
	<div class='router_page'>
		<top title="保证金退出明细" :isReturn="false" right="规则"></top>
		<div v-for="el in bondlist">
			<div class="hei20 bg_gray"></div>
			<div class="c_fund_info"><span class="mr10">{{el.date}}</span>  成功退出(元) <span class="mlr10">{{el.money}}</span></div>
			<cell 
				:title="item.bizOrder" 
				:label="item.addTime|date()" 
				:money="item.tradeAmount"
				value="退款成功"
				:isLink="true"
				@detailUrl="openWin=true"
				v-for="item in el.child">
			</cell>
		</div>
		<!--S 详情弹窗-->
		<detail-popup ref="detailPopup" @closePopup="openWin=false"></detail-popup>
		<!--E 详情弹窗-->
	</div>
</template>

<script>
	import cell from '../../../components/cell'//列表
	import detailPopup from '../../../components/detailPopup' //详情
	import {
		fetchMemberRefunddeposit 			//保证金退款记录
	} from '../service/getData' 
export default {
	data() {
		return {
			openWin:false,		//详情弹窗
			bondlist:[]			//保证金退款记录
		}
	},
	components: {
		cell,
		detailPopup
	},
	activated() {
	},
	mounted(){
		fetchMemberRefunddeposit().then(res=>{ 	//保证金退款记录
			if (res.status) {
				this.bondlist = res.data.list 	
			} 
		})
	},
	watch:{
		openWin(val){
			if(val){
				this.$refs.detailPopup.popupVisible=true;
			}else{
				this.$refs.detailPopup.popupVisible=false;
			}
		}
	},
	methods: {
		
	}
}
</script>

<style lang="less">
</style>
