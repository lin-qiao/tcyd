<template>
	<div class='pb98 router_page'>
		<top title="钻石明细" :isReturn="false"></top>
		<div v-for="el in jewelList">
			<div class="c_fund_info"><span class="mr10">{{el.time}}</span>  充值钻石(个) <span class="mlr10">{{el.inSum}}</span></div>
			<cell 
				:title="s_type[item.type]" 
				:label="item.rechargeTime" 
				:money="item.amount"
				:value="item.status"
				:isLink="true"  
				@detailUrl="showDetail(item.id)"
				v-for="item in el.secondList">
				<img :src="item.type|payType" slot="img">
			</cell>
			<div class="hei20 bg_gray"></div>
		</div>
		<!--S 详情弹窗-->
		<detail-popup ref="detailPopup" @closePopup="colseDetail" type="jewel"></detail-popup>
		<!--E 详情弹窗-->
	</div>
</template>

<script>
	import cell from '../../../components/cell'						//列表
	import detailPopup from '../../../components/detailPopup' 		//详情
	import {
		fetchStaticdeail 			//钻石明细
	} from '../service/getData' 
	
export default {
	data() {
		return {
			openWin:false,		//详情弹窗
			jewelList:[],		//钻石明细
			s_type:{
				income:'收入 ',
				zfb:'支付宝',
				weixin:'微信',
				bank:'银行卡支付',
				exchange:'兑换',
				consume:'打赏',
				balance:'可用余额'
			}
		}
	},
	components: {
		cell,
		detailPopup
	},
	activated() {
	},
	mounted(){
		fetchStaticdeail().then(res=>{
			if (res.status) {
				this.jewelList = res.data.list;
			} 
		})
	},
	methods: {
		showDetail(id){//打开详情弹窗
			this.$refs.detailPopup.popupVisible=true;
			this.$refs.detailPopup.detailFn(id);
		},
		colseDetail(){//关闭详情弹窗
			this.$refs.detailPopup.popupVisible=false;
		}
	}
}
</script>

<style lang="less">
</style>
