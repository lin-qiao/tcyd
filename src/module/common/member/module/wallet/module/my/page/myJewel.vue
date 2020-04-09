<template>
	<div class="router_page pb110">
		<div class="c_have_shade">
		    <top title="我的钻石" :isReturn="false" right="兑换"></top>
		    <kind-info title="今日获得 (个)" :money="masonryToday" usableTitle="可用钻石 (个)" :usable="masonryAmount"></kind-info>
		    <element-box title="如何获得钻石" class="border-n" :noContent="true" :noBorder="true"></element-box>
		    <make></make>
		    <div class="hei20 bg_gray"></div>
		    <element-box title="钻石消费" class="border-n" :noContent="true" :noBorder="true"></element-box>
		    <swiper-list></swiper-list>
		    <div class="hei20 bg_gray"></div>
		    <element-box title="钻石明细" class="border-n navigate_right" :noContent="true"></element-box>
	    </div>
	    <div v-for="el in jewelList">
	    	<div class="c_fund_info"><span class="mr10">{{el.time}}</span>  获得钻石 (个)<span class="mlr10">{{el.inSum}}</span></div>
		    <cell 
				:title="s_type[item.type]" 
				:label="item.rechargeTime" 
				:money="item.amount"
				:value="item.status"
				:isLink="true"
	            @detailUrl="openWin=true"
	            v-for="item in el.secondList">
	            <img :src="item.type|payType" slot="img">
			</cell>
	    </div>
		<div class="c_fixed_bottom">
		    <a href="javascript:void(0);" class="btn_block">钻石充值</a>
		</div>
		<!--S 详情弹窗-->
		<detail-popup ref="detailPopup" @closePopup="openWin=false"></detail-popup>
		<!--E 详情弹窗-->
		<!--S 兑换弹窗-->
		<div v-if="showAlertInquiry" class="layer_shadow">
		    <section class="layer_box">
		    	<div class="layer_tit text_center bg_fff">
		    		<img src="../../../images/zs.png"/>钻石兑换
		    	</div>
		    	<i class="iconfont icon-close1" @click="showAlertInquiry=false"></i>
		        <div class="c_exchange_box">
		        	<div class='c_exchange_msg justify_between'>
		        		<span>可用钻石：1106个</span>
		        		<span>可兑换金额：10元</span>
		        	</div>
		        	<div class='c_exchange_msg justify_between'>
		        		<span>兑换数量：<input type="text" placeholder="请输入兑换数量  "/></span>
		        		<span class="c_999">0元</span>
		        	</div>
		        	<p class="c_blue text_right">全部兑换</p>
		        	<div class='c_exchange_msg justify_center text_center'>
		        		<a href="javascript:void(0);" class="btn_border mlr10">取消兑换</a>
		        		<a href="javascript:void(0);" class="btn mlr10">确定兑换</a>
		        	</div>
		        	<p class="c_999 f24 mt30">提示：X个钻石可兑换X元,钻石兑换成功可在您的收入进行查看</p>
		        </div>
		    </section>
		  </div>
		<!--E 兑换弹窗-->
	</div>
</template>

<script>
import kindInfo from '../../../components/kindInfo'					//头部统计
import swiperList from '../../../components/swiperList'				//轮转图
import cell from '../../../components/cell' 						//记录列表
import make from '../../../components/make' 						//赚取佣金
import elementBox from 'src/components/item/itemElementBox' 
import detailPopup from '../../../components/detailPopup' 			//详情
import {
		fetchStaticdeail, 			//钻石明细
		fetchBalance  				//钻石可用+今日获得
	} from '../service/getData' 

export default {
	data() {
		return {
			openWin:false,				//详情弹窗
			showAlertInquiry:false,		//兑换弹窗
			jewelList:[], 				//钻石明细
			masonryToday:0, 			//今日获得
			masonryAmount:0, 			//可用钻石
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
		kindInfo,
		swiperList,
		cell,
		elementBox,
		make,
		detailPopup
	},
	activated() {
	},
	mounted(){
		fetchStaticdeail().then(res=>{ 							//钻石明细
			if (res.status) {
				this.jewelList = res.data.list 					//明细列表
			} 
		})
		fetchBalance().then(res=>{ 								//获取今日获得+可用钻石
			if (res.status) {
				let data = res.data;
				this.masonryAmount = data.masonryAmount; 		//可用钻石
				this.masonryToday = data.masonryToday; 			//今日获得
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

<style lang="less" scoped>
@import (reference) '~src/style/all.less';
.c_exchange_box{
	padding:0.3rem 0.3rem 0.5rem;
	.c_exchange_msg{
		display:flex;
		.f28;
		.c_333;
		margin:0.34rem 0 0.14rem;
		input{
			width:2.1rem;
			height:0.4rem;
			.border-b();
		}
	}
}
.layer_tit{
	height:1.02rem;
	line-height:1.02rem;
	img{
		width:0.56rem;
		margin-right:0.1rem;
		vertical-align: middle;
	}
} 
</style>
