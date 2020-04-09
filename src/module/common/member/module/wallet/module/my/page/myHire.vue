<template>
	<div class="router_page">
		<div class="c_have_shade">
		    <top title="我的可用佣金" :isReturn="false" :right="name" @clickRight="rightUrl"></top>
		    <!--S 佣金统计-->
		    <div class="kindInfo_box">
		   	    <div class="text_center">
		   	   	    <span class="f22">累计获得佣金(元)</span>
		   	   	    <em class="f40">{{hire.brokerageSum||0}}</em>
		   	    </div>
		   	    <div class="text_center">
		   	   	    <span class="f22">可用佣金(元)</span>
		   	   	    <em class="f40">{{hire.brokerage||0}}</em>
		   	    </div>
		   	    <div class="text_center">
		   	   	    <span class="f22">冻结佣金(元)</span>
		   	   	    <em class="f40">{{hire.freeze||0}}</em>
		   	    </div>
		    </div>
		    <!--E 佣金统计-->
		    <!--S 广告图 -如何赚取佣金--> 
		    <!--<element-box title="如何赚取佣金" class="border-n" :noContent="true" :noBorder="true"></element-box>
		    <make></make>-->
		    <!--E 广告图-如何赚取佣金--> 
		    <!--<div class="hei20 bg_gray"></div>-->
		    <!--S 轮转图-->
		    <!--<element-box title="佣金消费" class="border-n" :noContent="true" :noBorder="true"></element-box>
		    <swiper-list :code="'MY_BROKERAGE_PROJECT'"></swiper-list>-->
		    <!--E 轮转图-->
		    <div class="hei20 bg_gray"></div>
		    <!--S 佣金明细筛选-->
		    <element-box title="佣金明细" class="border-n" :isPos="true">
		    	<!--<p slot="title" class="f26 flex flex_center c_999" @click="filtrBox=!filtrBox,isBgShow=!isBgShow">
	                                筛选 <i class="iconfont icon-arrow-down f26 mr10"></i> 
	            </p>
	        	<ul slot="content" class="c_filtrate" v-show="filtrBox">
					<li :class="{'active':filtrNum==i}" v-for="(el,i) in filtr" @click="filtrNum=i,filtrBox=false,isBgShow=false,getHireList(el.type)">{{el.name}}</li>
				</ul>-->
		    </element-box>
		    <!--E 佣金明细筛选-->
	    </div>
	    <!--S 佣金明细列表-->
	    <div v-for="el in hireList" v-if='hireList.length'>
	    	<div class="c_fund_info"><span class="mr10">{{el.time}}</span>  赚取佣金(元)<span class="mlr10">{{el.inSum|number}}</span></div>
		    <item-cell 
				:title="item.smallCategory" 
				:label="item.addTime" 
				:value="item.tradeAmount"
				:height="202"
				:isDark="true"
	            v-for="item in el.secondList">
	            <img src="../../../images/icon_tc.png" slot="img" class="c_record_imgSize"/>
			</item-cell >
	    </div>
	    <!--E 佣金明细列表-->
	    <!--S 无数据-->
	    <nodata v-if='!hireList.length'></nodata>
	    <!--E 无数据-->
		<!--S背景阴影-->
		<div class="l_bg" v-if="isBgShow"></div>
		<!--E背景阴影-->
	</div>
</template>

<script>
//统计佣金  佣金列表
import {fetchHire,fetchHireList} from '../service/getData'
import kindInfo from '../../../components/kindInfo'//头部统计
import swiperList from '../../../components/swiperList'//轮转图
import itemCell from 'src/components/item/itemCell' //记录
import make from '../../../components/make' //赚取佣金
import elementBox from 'src/components/item/itemElementBox' //筛选条件
import {fetchProfileDetail} from 'src/service/getData'//获取提现开关状态
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
			    {name:'同城',type:'tc'},
			    {name:'众包',type:'zb'},
			    {name:'媒介',type:'mj'},
			    {name:'无形资产',type:'xn'},
			    {name:'知识产权',type:'zs'},
			    {name:'拼团',type:'group'},
			    {name:'油惠',type:'fuel'}
			],//筛选条件数组
			hire:{},//佣金信息
			hireList:[],//佣金列表
		}
	},
	components: {
		kindInfo,
		swiperList,
		itemCell,
		elementBox,
		make
	},
	activated() {
		this.getCommonProfileDetail();//获取提现开关状态
	},
	mounted(){
		this.getHire();//获取佣金信息
		this.getHireList(this.bizType);//佣金列表
	},
	watch:{
	},
	methods: {
		rightUrl(){//右上角跳转链接
			this.$router.push({ path: '/wallet/withdraw', query: { type:3}});
		},
		getHire(){//佣金信息
			fetchHire().then(res=>{
				if(res.status){
					this.hire=res.data;
				}
			})
		},
		getHireList(type){//佣金列表
			fetchHireList(type).then(res=>{
				if(res.status){
					this.hireList=res.data.list||[];
				}
			})
		},
		getCommonProfileDetail(){//获取提现开关状态
			fetchProfileDetail('tc_brokerage_withdrawal_switch').then(res=>{
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
	/*S 佣金统计*/
	.kindInfo_box{
    	width:6.9rem;
    	height:1.96rem;
    	padding:0 0.2rem;
    	margin:0.3rem auto 0.1rem; 
    	background:url(../../../images/my_bg.png) no-repeat center 0;
    	background-size:100%;
    	color:#fff;
    	display:flex;
    	flex-wrap: wrap;
    	align-content:center;
    	align-items: center;
    	justify-content: space-around;
    	.text_center{
    		span{
    			display:block;
    			margin-bottom:0.2rem;
    		}
    	}
    }
</style>
