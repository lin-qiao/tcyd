<template>
	<div class='router_page pb110'>
		<top title="我的保证金" :isReturn="false" right="申请退款" @clickRight="$router.push('/wallet/refundDeposit?skillId='+skillId)"></top>
		<kind-info title="当前保证金 (元) >" :money="bond.alreadyDeposit" usableTitle="需补缴保证金 (元) >" :usable="bond.residueDeposit"></kind-info>
		<p class="c_deposit_p"><i class="iconfont icon-warn"></i>因保证金缴纳标准变更，您的保证金总额度不足，您需在<span class="c_main">6天23小时22分内</span>补缴！若保证金不足会影响经营，难以获取雇主信任。</p>
	    <div class="hei20 bg_gray"></div>
	    <ul class="filtrate_list_tab">
	    	<li :class="{'on':status==1}" @click="status=1">充值记录</li>
	    	<li :class="{'on':status==2}" @click="status=2">违约记录</li>
	    </ul>
	    <div v-if="status==1">
			<mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" :autoFill="false" ref="loadmore">
	    	<item-cell 
	    		:title="item.bizOrder" 
	    		:label="item.addTime|date" 
	    		:value="+item.tradeAmount元"
	    		:isDark="true"
	    		:height="160"
				v-for="item in payLogList">
	    	</item-cell>
			</mt-loadmore>
	    </div>
	    <div v-if="status==2">
	    	<record-cell 
	    		title="众包-软件开发" 
	    		label="结束时间：2018-05-19  00:14:13" 
	    		value="+200元"
	    		subtit="订单号：FM200354120125412333"
	    		tips="备注：因为您未按时完成雇主需求，造成雇主不便，经平台仲裁扣除保证金100元。">
	    		<img slot="img" src="../../../images/icon_zb.png"  />
	    	</record-cell>
	    	<div class="hei20 bg_gray"></div>
	    	<record-cell 
	    		title="众包-软件开发" 
	    		label="结束时间：2018-05-19  00:14:13" 
	    		value="+200元"
	    		subtit="订单号：FM200354120125412333"
	    		tips="备注：因为您未按时完成雇主需求，造成雇主不便，经平台仲裁扣除保证金100元。">
	    		<img slot="img" src="../../../images/icon_zb.png"  />
	    	</record-cell>
	    </div>
	    <div class="c_fixed_bottom">
		    <a href="javascript:void(0);" class="btn_block" @click="payDeposit">缴纳保证金</a>
		</div>
		<pay ref="pay" moneyName="保证金" :money="bondMoney"></pay>
	</div>
</template>

<script>
import kindInfo from '../../../components/kindInfo'//头部统计
import itemCell from 'src/components/item/itemCell'//充值记录
import recordCell from '../components/recordCell'//违约记录
import pay from 'src/components/pay'
import {
	fetchGetPayLog,//获取充值记录
	fetchGetBond,//获取保证金总额
	fetchPayDeposit//保证金支付
} from '../service/getData'
export default {
	data() {
		return {
			allLoaded:false, //是否全部加载
			status:1,//tab选中
			page: 1,
			size: 5,
			total:0,
			payLogList:'',//充值记录列表
			bond:'',//保证金总额
			bondMoney:''
		}
	},
	components: {
		kindInfo,
		itemCell,
		recordCell,
		pay
	},
	activated() {
		this.skillId=this.$route.query.skillId//技能ID
		this.getPayLog()//获取充值记录
		this.getBond()//获取保证金总额
	},
	mounted(){
		
	},
	watch:{
		payLogList:{
			handler(newValue){
				if(newValue.length >= this.total){
					this.allLoaded = true;
				}
			},
			deep:true,
		}
	},
	methods: {
		//获取充值记录
		getPayLog(){
			fetchGetPayLog(this.page,this.size).then(res=>{
				if(res.status){
					this.total = res.data.total;
					if(this.page==1){
						this.payLogList=res.data.list
					}else{
						this.payLogList=this.payLogList.concat(res.data.list);
					}
				}
				if(this.page==1){
					this.$refs.loadmore.onTopLoaded();
				}else{
					this.$refs.loadmore.onBottomLoaded();
				}
			})
		},
		//获取保证金总额
		getBond(){
			fetchGetBond().then(res=>{
				if(res.status){
					this.bond=res.data
					this.bondMoney=this.bond.residueDeposit
				}
			})
		},
		//缴纳保证金
		payDeposit(){
			this.$refs.pay.show() //支付弹窗
		},
		requirePublish(withhold,pwd){
			fetchPayDeposit(this.skillId,this.bond.residueDeposit,this.accountType).then(res=>{
				if(res.status){
					alertTip(res.msg);
				}
			})
		},
		loadTop(){//下拉刷新
			this.page = 1;
			this.getPayLog()//获取充值记录
		},
		loadBottom(){//上拉加载
			this.page += 1;
			this.getPayLog()//获取充值记录
		}
	}
}
</script>

<style lang="less">
@import (reference) '~src/style/all.less';
	.c_deposit_p{
		padding:0.4rem 0.3rem 0.2rem;
		font-size:0.26rem;
		color:#666666;
		line-height:0.4rem;
		i{
			color:#ffa92f;
		}
	}
</style>
