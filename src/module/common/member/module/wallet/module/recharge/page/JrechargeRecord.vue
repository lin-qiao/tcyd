<template>
	<div class='pb98 router_page'>
		<top title="钻石充值明细" :isReturn="false"></top>
		<div class="hei20 bg_gray"></div>
		<!--S 现金充值明细-->
		<div v-for="el in JrechargeList" v-if="JrechargeList.length">
		    <div class="c_fund_info">
		    	<span class="mr10">{{el.time}}</span>  
		    	成功充值(元)<span class="mlr10">{{el.inSum|number}}</span>
		    </div>
		    <cell 
				:title="typeList[item.type]" 
				:label="item.rechargeTime" 
				:money="item.amount"
				:value="status[item.status]"
				:isLink="true"
				@detailUrl="showDetail(item.id)"
				v-for="item in el.secondList">
	            <img :src="item.type|payType" slot="img"/>
			</cell>
		</div>
		<!--E 现金充值明细-->
		<!--S 无数据-->
		<nodata v-if="!JrechargeList.length"></nodata>
		<!--E 无数据-->
		<!--S 详情弹窗-->
		<detail-popup ref="detailPopup" @closePopup="colseDetail" type="jewelRecharge"></detail-popup>
		<!--E 详情弹窗-->
	</div>
</template>

<script>
	import cell from '../../../components/cell'//列表
	import detailPopup from '../../../components/detailPopup' //详情
	import {fetchStaticRecharge} from '../service/getData'//充值列表
export default {
	data() {
		return {
			JrechargeList:{},//充值列表
			status:{
				"success":"充值成功",
				"fail":"充值失败"
			},
			typeList:{
				"balance":"充值余额",
				"brokerage":"佣金余额",
				"income":"收入余额"
			}
		}
	},
	components: {
		cell,
		detailPopup
	},
	activated() {
		this.getJrechargeList();//钻石充值记录
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
		getJrechargeList(){//充值列表
			fetchStaticRecharge().then(res=>{
				if(res.status){
					this.JrechargeList=res.data.list||[];
				}
			});
		}
	}
}
</script>

<style lang="less">
</style>
