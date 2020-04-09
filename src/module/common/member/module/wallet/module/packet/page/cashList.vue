<template>
	<div class="router_page bg_gray">
		<div class="bg_fff pb20">
			<!--S头部-->
		    <top title="我的现金劵" :isReturn="false" right="规则"></top>
		    <!--E头部-->
		    
		    <!--S今日或得、可用现金券-->
		    <kind-info title="今日获得 (张)" money="2" usableTitle="可用现金劵(张)" usable="6"></kind-info>
		    <!--E今日或得、可用现金券-->
		    
		    <!--S标题-->
		    <element-box title="现金劵消费" class="border-n" :noContent="true" :noBorder="true"></element-box>
		    <!--E标题-->
		    
		    <!--S轮播图=>红包消费-->
		    <swiper-list></swiper-list>
		    <!--E轮播图=>红包消费-->
		    
		    <!--S广告图-->
		    <advertising :imgList="advList"></advertising>
		    <!--E广告图-->
	    </div>
	    
	    <!--S标题-->
	    <element-box title="现金劵明细" class="border-n" :noContent="true" :noBorder="true"></element-box>
	    <!--E标题-->
	    
	    <!--S现金券明细-->
	    <div class="plr30">
	    	<cash-item :status="1"></cash-item>
	    	<cash-item :status="2"></cash-item>
	    	<cash-item :status="3"></cash-item>
	    </div>
	    <!--E现金券明细-->
	    
	</div>    
</template>

<script>
import kindInfo from '../../../components/kindInfo'         //头部统计（今日或得、可用现金券）
import swiperList from '../../../components/swiperList'     //轮转图（红包消费）
import advertising from 'src/components/advertising';       //广告位（广告图）
import elementBox from 'src/components/item/itemElementBox';//标题
import cashItem from '../components/cashItem';              //现金劵明细

export default {
	data() {
		return {
			advList:[],                  //广告展示=>列表
		    advCode:'MY_CASH_COUPON_AD', //广告展示=>类型
		    advTerminal:'wechat',        //广告展示=>客户端
		}
	},
	components: {
		kindInfo,   //头部统计（今日或得、可用现金券）
		swiperList, //轮转图（红包消费）
		elementBox, //标题
		advertising,//广告位（广告图）
		cashItem    //现金劵明细
	},
	activated() {
	},
	mounted(){

	},
	watch:{
	},
	methods: {
		
	}
}
</script>

