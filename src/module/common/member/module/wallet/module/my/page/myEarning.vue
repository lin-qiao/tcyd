<template>
	<div class="router_page">
		<div class="c_have_shade">
		    <top title="我的可用收入" :isReturn="false" :right="name" @clickRight="rightUrl"></top>
		    <!--S 今日收入-->
		    <kind-info usableTitle="可用收入 (元)" :usable="earning.income||0"></kind-info>
		    <!--E 今日收入-->
		    <!--S 轮转图-->
		    <!-- <element-box title="收入消费" class="border-n" :noContent="true" :noBorder="true"></element-box>
		    <swiper-list :code="'MY_INCOME_PROJECT'"></swiper-list> -->
		    <!--E 轮转图-->
		    <div class="hei20 bg_gray"></div>
		    <!--S 收入明细筛选条件-->
		    <element-box title="收入明细" class="border-n" :isPos="true">
		    	<p slot="title" class="f26 flex flex_center c_999" @click="filtrBox=!filtrBox,isBgShow=!isBgShow">
	                            
	            </p>
	        
		    </element-box>
		    <!--E 收入明细筛选条件-->
	    </div>
	    <!--S 收入明细列表-->
	    <div v-for="el in earningList" v-if="earningList.length">
		    <div class="c_fund_info">
		    	<span class="mr10">{{el.time}}</span>  
		    	收入(元)<span class="mlr10">{{el.inSum|number}}</span>
		    </div>
		    <item-cell 
				:title="item.smallCategory" 
				:label="item.addTime" 
				:value="item.tradeAmount"
				:isLink="true"
				:height="142"
				:isDark="true"
				@handleClick="showDetail(item.id)"
				v-for="item in el.secondList"
	            >
	            <img src="../../../images/icon_tc.png" slot="img" class="c_record_imgSize"/>
			</item-cell >
		</div>
		<!--E 收入明细列表-->
		<!--S 无数据-->
		<nodata v-if="!earningList.length"></nodata>
		<!--E 无数据-->
		<!--S背景阴影-->
		<div class="l_bg" v-if="isBgShow"></div>
		<!--E背景阴影-->
		<!--S 详情弹窗-->
		<detail-popup ref="detailPopup" @closePopup="colseDetail" type="earning"></detail-popup>
		<!--E 详情弹窗-->
	</div>
</template>

<script>
import {fetchEarningList,fetchEarning} from '../service/getData'
import {fetchProfileDetail} from 'src/service/getData'//获取提现开关状态
import kindInfo from '../../../components/kindInfo'//头部统计
import swiperList from '../../../components/swiperList'//轮转图
import itemCell from 'src/components/item/itemCell' //记录
import elementBox from 'src/components/item/itemElementBox' //筛选条件
import detailPopup from '../../../components/detailPopup' //详情
export default {
	data() {
		return {
			isBgShow:false,//背景阴影
			filtrBox:false,//筛选框
			filtrNum:0,//选中位置
			bizType:"",//筛选条件
			name:'',//提现开关
			filtr:[
			    {name:'全部',type:''},
			    {name:'拼团',type:'group'},
			    {name:'油惠',type:'fuel'},
			    {name:'同城',type:'tc'}
			],//筛选条件数组
			earningList:[],//收入列表
			earning:{}//收入信息
		}
	},
	components: {
		kindInfo,
		swiperList,
		itemCell,
		elementBox,
		detailPopup
	},
	activated() {
		this.getCommonProfileDetail();//获取提现开关状态
	},
	mounted(){
		this.getEarningList(this.bizType);//收入记录
		this.getEarning();//收入信息
	},
	watch:{
	},
	methods: {
		rightUrl(){//右上角跳转链接
			this.$router.push({ path: '/wallet/withdraw', query: { type:2}});
		},
		showDetail(id){//打开详情弹窗
			this.$refs.detailPopup.popupVisible=true;
			this.$refs.detailPopup.detailFn(id);
		},
		colseDetail(){//关闭详情弹窗
			this.$refs.detailPopup.popupVisible=false;
		},
		getEarningList(type){//收入列表
		    fetchEarningList(type).then(res=>{
				if(res.status){
					this.earningList=res.data.list||[];
				}
			})
		},
		getEarning(){//收入信息
			fetchEarning().then(res=>{
				if(res.status){
					this.earning=res.data;
				}
			})
		},
		getCommonProfileDetail(){//获取提现开关状态
			fetchProfileDetail('tc_income_withdrawal_switch').then(res=>{
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

<style lang="less" scoped>
@import (reference) '~src/style/all.less';
	.l_bg{
		position: fixed;
		width: 7.5rem;
		top: 0;
		left: 50%;
		margin-left: -3.75rem;
		bottom: 0;
		background: rgba(0,0,0,0.5);
		z-index: 22;
	}
	.c_filtrate{
		width: 7.1rem;
		margin:0 0.2rem;
		.flex;
		flex-wrap: wrap;
		li{
			width: 1.62rem;
			margin:0 0.07rem 0.3rem;
			background: #f3f3f3;
			.border(#f3f3f3);
			.border-radius(0.04rem);
			line-height: 0.64rem;
			text-align: center;
			.c_666;
			&.active{
				border-color: #ff8280;
				background-color: #ffefef;
				.c_main;
			}
		}
	}
	.c_record_imgSize{
		width:0.92rem !important;
		height:0.92rem !important;
	}
</style>
