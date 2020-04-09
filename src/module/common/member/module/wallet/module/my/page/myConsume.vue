<template>
	<div class="router_page">
		<div class="c_have_shade">
		    <top title="我的消费金" :isReturn="false" rightIcon="icon-wenhao" @clickRight="explainFn"></top>
		    <!--S 可用消费金-->
		    <kind-info usableTitle="可用消费金 (元)" :usable="usaEncourage||0"></kind-info>
		    <!--E 可用消费金-->
		    <div class="hei20"></div>
		    <!--S 消费金明细-->
		    <element-box title="消费金明细" class="border-n" :isPos="true">
		    </element-box>
		    <!--E 消费金明细-->
	    </div>
	    <!--S 消费金明细列表-->
	    <div v-for="el in consumeList" v-if="consumeList.length">
		    <div class="c_fund_info">
		    	<span class="mr10">{{el.time}}</span>  
		    	赚取消费金(元)<span class="mlr10">{{el.inSum|number}}</span>
		    </div>
		    <item-cell 
				:title="item.smallCategory" 
				:label="item.addTime" 
				:value="item.tradeAmount"
				:height="142"
				:isDark="true"
				v-for="item in el.secondList"
	            >
	            <img src="../../../images/icon_tc.png" slot="img" class="c_record_imgSize"/>
			</item-cell >
		</div>
		<!--E 消费金明细列表-->
		<!--S 无数据-->
		<nodata v-if="!consumeList.length"></nodata>
		<!--E 无数据-->
	</div>
</template>

<script>
import {fetchAccountEncourageDetaul} from '../service/getData'//消费金列表
import {fetchWallet} from '../../../service/getData'//可用消费金
import kindInfo from '../../../components/kindInfo'//头部统计
import itemCell from 'src/components/item/itemCell' //记录
import elementBox from 'src/components/item/itemElementBox' //筛选条件
import {fetchTextDetail} from 'src/service/getData';//消费金解释
export default {
	data() {
		return {
			consumeList:[],//消费金列表
			usaEncourage:0,//可用消费金
		}
	},
	components: {
		kindInfo,
		itemCell,
		elementBox
	},
	activated() {
	},
	mounted(){
		this.getEarningList();//收入记录
		this.getEncourage();//获取可用消费金
	},
	methods: {
		explainFn(){//消费金说明
			fetchTextDetail('XFJSM').then(res=>{
				if(res.status){
					this.$alert({
						layerImg:"",
						content:'<div class="pt50">'+res.data.detail+'</div>'
					})
				}
			})
		},
		getEncourage(){//可用消费金
 			fetchWallet().then((res)=>{
				if(res.status){
		        	this.usaEncourage=res.data&&res.data.usaEncourage;
		        }
			})
		},
		getEarningList(){//消费金列表
		    fetchAccountEncourageDetaul().then(res=>{
				if(res.status){
					this.consumeList=res.data.list||[];
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
