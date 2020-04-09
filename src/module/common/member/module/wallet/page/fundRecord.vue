<template>
	<div class='pb98 router_page'>
		<top title="资金明细" :isReturn="false" right="筛选" rightIcon="icon-arrow-down f28" @clickRight="isFilter=true"></top>
		<!--S 右上角筛选框-->
		<ul class="c_filter_box" v-if="isFilter">
			<span class='arrow-up'></span>
			<li :class="{'active':status==i}" v-for="(el,i) in filterList" @click="getRecord(el.type);isFilter=false;status=i;"><i></i>{{el.name}}</li>
		</ul>
		<!--E 右上角筛选框-->
		<!--S 资金明细列表-->
		<div class="bg_fff c_fun_record" v-if="recordList.length">
            <div v-for="el in recordList">
                <div class="c_fund_info">
                	<span class="mr10">{{el.time}}</span>  
                	收入(元)<span class="mlr10">{{el.inSum|number}}</span>     
                	支出(元)<span class="mlr10">{{el.outSum|number}}</span>
                </div>
				<cell 
					:title="item.smallCategory" 
					:label="item.addTime" 
					:money="item.tradeAmount"
					:value="item.operaType"
					:smallCategory="item.largeCategory"
					:isLink="true"
					:className="colorList[item.tradeDirection]"  
					v-for="item in el.secondList"
					@detailUrl="showDetail(item.id)">
					<img :src="item.largeCategory|iconType" slot="img">
				</cell>
			</div>
		</div>
		<!--E 资金明细列表-->
		<!--S 无数据-->
		<nodata v-if="!recordList.length"></nodata>
		<!--E 无数据-->
		<!--S 详情弹窗-->
		<detail-popup ref="detailPopup" @closePopup="colseDetail" type="fund"></detail-popup>
		<!--E 详情弹窗-->
	</div>
</template>

<script>
	import cell from '../components/cell'
	import {fetchFundRecord} from '../service/getData'//资金记录
	import detailPopup from '../components/detailPopup' //详情
export default {
	data() {
		return {
			isFilter:false,//是否筛选
			status:0,//选中那个
			filterList:[{name:'全部',type:""},{name:'入账',type:"in"},{name:'出账',type:"out"},{name:'冻结',type:"frozen"},{name:'解冻',type:"thaw_frozen"}],//筛选列表
			recordList:[],//记录列表
            type:"",//筛选值 ''全部   in收入    out支出
            colorList:{//颜色列表
            	"收入":"c_green",
            	"支出":"c_main"
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
		this.getRecord(this.type);//获取资金列表
	},
	watch:{
	},
	methods: {
		getRecord(type){//获取资金列表
			fetchFundRecord(type).then((res)=>{
				if(res.status){
		        	this.recordList=res.data.list||[];//资金列表
		        }
			})
		},
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
	.c_fun_record{
		.cell .cell_wrap .cell_content{
			width:1.2rem !important;
			margin-right:0.2rem !important;
		}
	}
</style>
<style lang="less" scoped>
	.c_filter_box{
		width:1.72rem;
		background: rgba(0,0,0,0.6);
		border-radius: 0.1rem;
		position: absolute;
		top:0.9rem;
		right:0.3rem;
		z-index:4;
		.arrow-up {
			position:absolute;
			top:-0.14rem;
			left:1rem;
		    width:0;
		    height:0;
		    border-right:0.14rem solid transparent;
		    border-left:0.14rem solid transparent;
		    border-bottom:0.14rem solid rgba(0,0,0,0.6);
		}
		li{
			line-height: 0.7rem;
			height:0.7rem;
			font-size: 0.26rem;
			color:#fff;
			text-align: center;
			border-bottom:1px solid #6b6a6a;
			i{
				display: inline-block;
				vertical-align: middle;
				border-radius:50%;
				width:0.1rem;
				height:0.1rem;
				background:rgba(0,0,0,0);
				margin-right:0.2rem;
			}
			&.active{
				i{
					background: #fff;
				}
			}
		}
		li:last-child{
			border:none;
		}
	}
</style>
