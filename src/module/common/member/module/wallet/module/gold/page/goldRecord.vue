<template>
	<div class="router_page bg_gray">
		<!-- S 头部-->
		<top :title="'金币明细'"></top>
		<!-- E 头部-->
		<ul class="h_tab_list">
			<li class="h_tab_item" :class="{active:status=='income'}" @click="changeStatus('income')">金币来源</li>
			<li class="h_tab_item" :class="{active:status=='consume'}" @click="changeStatus('consume')">金币消费</li>
		</ul>
		<!--S 记录-->
		<div class="h_record_list" v-show="recordList.length">
			<mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore" :autoFill="false" :bottom-pull-text="allLoaded?'':'上拉查看更多'">
				<div>
					<div class="h_item" v-for="(v,i) in recordList">
						<div>
							<div class="h_name">{{v.smallCategory}}</div>
							<div class="h_time">{{v.time}}</div>
						</div>
						<div>{{status=='income'?'+':'-'}}{{v.amount}}金币</div>
					</div>
				</div>
			</mt-loadmore>
		</div>
		<nodata v-show="!recordList.length"></nodata>
		<!--E 记录-->
	</div>
</template>

<script>
import {
	fetchGoldRecord,//获取金币交易记录
} from '../service/getData'
export default {
	data() {
		return {
			status:"income",//tab状态：收入income、支出consume
			allLoaded:false,//是否全部加载
			page:1,//当前页码
			size:10,//一页展示条数
			total:0,//总共条数
			recordList:[],//记录列表
		}
	},
	components: {
		
	},
	activated() {
	},
	mounted(){
		this.getRecord();
	},
	watch:{
		
	},
	methods: {
		//收入支出切换
		changeStatus(status){
			this.status=status;
			this.page=1;
			this.getRecord();
		},
		//打开金币兑换页面
		toGoldExchange(){
			this.$router.push("/wallet/goldExchange");
		},
		//获取金币交易记录
		getRecord(){
			fetchGoldRecord(this.status,this.page,this.size).then(res=>{
				if(res.data) {
					if(this.page==1){
						this.recordList = res.data.list||[];
					}else{
						this.recordList = this.recordList.concat(res.data.list||[]);
					}
					if(res.list&&res.list.length==this.size){
						this.allLoaded = false;
					}else{
						this.allLoaded = true;
					}
				}else{
					this.allLoaded = true;
				}
			})
//			var res = {
//				code: "000",
//				status: true,
//				msg: "查询成功",
//				data: {
//					page:1,
//					size:10,
//					total: 2,
//					totalPage:2,
//					list: [
//						{
//							time: "2018年6月",
//							amount: "11261.0",
//							smallCategory: "每日获得"
//						}
//					]
//				}
//			}
//			if(res.data) {
//				if(this.page==1){
//					this.recordList = res.data.list||[];
//				}else{
//					this.recordList = this.recordList.concat(res.data.list||[]);
//				}
//				if(res.data.list&&res.data.list.length==this.size){
//					this.allLoaded = false;
//				}else{
//					this.allLoaded = true;
//				}
//			}else{
//				this.allLoaded = true;
//			}
		},
		//上拉加载
		loadBottom(){
			this.page += 1;
			this.getRecord();
		},
		//下拉刷新
		loadTop(){
			this.page = 1;
			this.getRecord();
		}
	}
}
</script>
<style lang="less" scoped>
@import (reference) "~src/style/all";
.h_tab_list{
	.flex();
	background: #fff;
	justify-content:space-between;
	align-items:center;
	border-bottom:1px solid #e8e8e8;
	.h_tab_item{
		position:relative;
		width: 50%;
		line-height: 0.9rem;
		text-align: center;
		font-size: 0.28rem;
		&.active{
			color: @color;
			&:after{
				content: "";
				position: absolute;
				left: 0;
				right: 0;
				bottom: 0;
				margin:0 auto;
				width: 1.5rem;
				height: 0.03rem;
				background-color: @color;
			}
		}
	}
}
.h_record_list{
	position:fixed;
	top:1.82rem;
	bottom:0;	
	left:0;
	right:0;
	.mint-loadmore{
		min-height:100%;
	}
	.h_item{
		position:relative;
		.flex();
		justify-content:space-between;
		align-items:center;
		background-color:#fff;
		padding:0.28rem 0.25rem 0.28rem 0.3rem;
		font-size:0.28rem;
		&:after{
			content: "";
			position: absolute;
			left: 0.3rem;
			right: 0;
			bottom: 0;
			height: 1px;
			background-color: #e8e8e8;
		}
		&:last-child{
			&:after{
				display: none;
			}
		}
	}
	.h_name{
		margin-bottom: 0.08rem;
	}
	.h_time{
		font-size: 0.24rem;
		color: #999;
	}
}
</style>


