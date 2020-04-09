<template>
	<div class="router_page pb110">
	    <top title="我的可用充值" :isReturn="false" :right="name" @clickRight="rightUrl"></top>
	    <!--S 今日充值-->
	    <kind-info usableTitle="可用充值金额 (元)" :usable="rechargeData.moneyAll||0"></kind-info>
	    <!--E 今日充值-->
	    <!--S 充值消费轮转图-->
	    <!-- <element-box title="充值消费" class="border-n" :noContent="true" :noBorder="true"></element-box>
	    <swiper-list :code="'MY_RECHARGE_PROJECT'"></swiper-list> -->
	    <!--E 充值消费轮转图-->
	    <div class="hei20 bg_gray"></div>
	    <element-box title="充值明细" class="border-n navigate_right" :noContent="true" @click="goRecord"></element-box>
	    <!--S 充值明细列表-->
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
		<!--E 充值明细列表-->
		<nodata v-else></nodata>
		<!--S 底部按钮-我要充值-->
		<div class="c_fixed_bottom">
		    <router-link to="/wallet/recharge" class="btn_block">我要充值</router-link>
		</div>
		<!--E 底部按钮-我要充值-->
		<!--S 详情弹窗-->
		<detail-popup ref="detailPopup" @closePopup="colseDetail" type="recharge"></detail-popup>
		<!--E 详情弹窗-->
	</div>
</template>

<script>
import kindInfo from '../../../components/kindInfo'//头部统计
import swiperList from '../../../components/swiperList'//轮转图
import cell from '../../../components/cell' //记录列表
import elementBox from 'src/components/item/itemElementBox' 
import detailPopup from '../../../components/detailPopup' //详情
import {fetchRechargeData,fetchRechargeList} from '../service/getData'
import {fetchProfileDetail} from 'src/service/getData'//获取提现开关状态
export default {
	data() {
		return {
			rechargeData:{},//充值信息
			rechargeList:{},//充值列表
			name:"",//提现开关
		}
	},
	components: {
		kindInfo,
		swiperList,
		cell,
		elementBox,
		detailPopup
	},
	activated() {
		this.getCommonProfileDetail();//获取提现开关状态
	},
	mounted(){
		this.getRechargeFn();//充值信息
		this.getRechargeList();//充值记录
	},
	watch:{
	},
	methods: {
		goRecord(){//充值记录页面
			this.$router.push({ path: '/wallet/rechargeRecord'});
		},
		rightUrl(){//右上角跳转链接
			this.$router.push({ path: '/wallet/withdraw', query: { type: 1 }});
		},
		showDetail(id){//打开详情弹窗
			this.$refs.detailPopup.popupVisible=true;
			this.$refs.detailPopup.detailFn(id);
		},
		colseDetail(){//关闭详情弹窗
			this.$refs.detailPopup.popupVisible=false;
		},
		getRechargeFn(){//充值信息
			fetchRechargeData().then(res=>{
				if(res.status){
					this.rechargeData=res.data;
				}
			});
		},
		getRechargeList(){//充值列表
			fetchRechargeList().then(res=>{
				if(res.status){
					this.rechargeList=res.data.list||[];
				}
			});
		},
		getCommonProfileDetail(){//获取提现开关状态
			fetchProfileDetail('tc_balance_withdrawal_switch').then(res=>{
				if(res.status){
					if(res.data.sysProfileVo.value=='Y'){
						this.name='提现'
					}
				}
			})
		}
		
	}
}
</script>

<style lang="less">
</style>
