<template>
    <div class="bg_gray pb100">
    	<!--S 头部-->
		<top :title="'商品详情'" rightIcon="icon-fenxiang2 c_bbb" @clickRight="share"></top>
		<!--E 头部-->
		<!--S banner轮播-->
		<div class="h_banner">
			<div class="swiper-container">
			    <div class="swiper-wrapper">
			        <div class="swiper-slide" v-for="v in goodInfo.imgs">
			        	<img :src="v | imgUrl" alt="" />
			        </div>
			    </div>
			    <div class="swiper-pagination"></div>
			</div>
		</div>
		<!--E banner轮播-->
		<!--S 商品简介-->
		<div class="h_description">
			<h3 class="h_name">
				<div class="h_tag">自营</div>
				<span>{{goodInfo.title}}</span>
			</h3>
			<div class="h_desc">{{goodInfo.subTitle}}</div>
			<div class="h_price">
				<span class="h_cost">&yen; 0</span>
				<del class="h_original_cost">&yen;{{goodInfo.money}}</del>
				<div class="h_sold">已售{{goodInfo.soldCount}}</div>
			</div>
		</div>
		<!--E 商品简介-->
		<!--S 规格&服务-->
		<div class="h_info">
			<div class="h_spec">
				<div class="flex">
					<div class="h_label">规格</div>
					<div class="h_con">{{goodInfo.attribute}}</div>
				</div>
			</div>
		</div>
		<!--E 规格&服务-->
		<!--S 详情-->
		<div class="h_detail">
			<item-cell 
				:height="100" 
				title="商品详情"
				:isLink="false">
			</item-cell>
			<div class="h_con" v-html="goodInfo.details"></div>
		</div>
		<!--E 详情-->
		<!--S 购买须知-->
		<div class="h_remind">
			<div class="h_title">
				<span>购买须知</span>
			</div>
			<div class="h_question">
				<div class="h_tit">购买运费如何收取？</div>
				<div class="h_con">
					单笔订单金额(不含运费)满88元免邮费;不满88元，每单收取10元运费。</br>(港澳台地区需满500元免邮费;不满500元，每单收取30元运费)
				</div>
			</div>
			<div class="h_question">
				<div class="h_tit">优选的订单如何配送？</div>
				<div class="h_con">
					优选会根据商品所在地、顾客所在地和商品的尺寸重量优选物流配送商，确保优质用户体验。目前暂不支持自选快递具体物流信息可在下单成功后‘’我的订单一追踪物流”中查看。
				</div>
			</div>
			<div class="h_question">
				<div class="h_tit">如何申请退换货？</div>
				<div class="h_con">
					1、自收到商品之日起30日内，顾客可申请无忧退货;如果是退货，退款将原路返还，不同的银行处理时间不同，预计1-5个工作日到账;</br>2、内裤和食品等特殊商品无质量问题不支持退换货;</br>3、退货流程:</br>确认收货一申请退货一客服审核通过一用户寄回商品一仓库签收验货一退款审核一退款完成;</br>4、换货流程:</br>确认收货一申请换货一客服审核通过一用户寄回商品一仓库签收验货一客服确认一换货完成;</br>5、退换货运费由网易严选承担(大件商品除外)。上门取件费用由网易严选统一与快递服务商结算，顾客只需将退换货商品交给上门取件快递员寄回。如顾客选择自行寄回商品，请先垫付运费，到货验证商品后，严选将以现金券形式为用户报销运费，不接受单方面到付件。
				</div>
			</div>
			<div class="h_question">
				<div class="h_tit">如何开具发票？</div>
				<div class="h_con">
					1、请在下单时选择“我要开发票”并填写相关信息(APP仅限2.4.0及以上版本)。开具增值税专用发票需在单时填写增票资质信息。温馨提示:请确保增票资质信息与贵司税务登记证信息一致，避免因开票信息错误给贵司带来损失。</br>2、可选开票内容二</br>订单中含有办公用品(箱包、文具、口罩)一办公用品、耗材、日用品、家居用品、食品、酒/饮料、服饰、化妆品;不含有办公用品一日用品、家居用品、食品、酒/饮料、服饰、化妆品;订单商品为礼品卡一预付卡</br>3、增值税专用发票开具内容为明细。
				</div>
			</div>
		</div>
		<!--E 购买须知-->
		<!--S 底部-->
		<div class="h_footer">
			<div class="h_service">
				<i class="iconfont icon-service"></i>
				<span>客服</span>
			</div>
			<a href="javascript:void(0)" class="h_btn">立即购买VIP领取</a>
		</div>
		<!--E 底部-->
    </div>
</template>
<script>
import itemCell from 'src/components/item/itemCell'
import {
	fetchVipGoodDetail //获取商品详情
} from '../service/getData'
export default {
    data() {
    	return {
    		goodId:"",//商品ID
    		priceId:"",//Vip价格id
    		goodInfo:{},//商品详情
    	}
	},
	components: {
		itemCell
	},
	activated(){
		this.goodId=this.$route.query.id||"";
		this.priceId=this.$route.query.priceId||"";
		this.getVipGoodDetail();
	},
	mounted(){
	},
	watch:{
	},
	methods: {
		//获取商品详情
		getVipGoodDetail(){
			fetchVipGoodDetail(this.goodId,this.priceId).then(res=>{
				this.goodInfo=res.data;
				this.$nextTick(()=>{
					this.bannerSwiper();
				})
			})
		},
		//banner轮播
		bannerSwiper(){
		    var swiper = new Swiper('.swiper-container', {
		        pagination: '.swiper-pagination',
		        paginationType: 'fraction'
		    });
		},
		//分享
		share(){
			
		}
	}
}
</script>
<style lang="less" >
.h_evaluate,.h_detail{
	.cell .cell_tit .cell_tit_con{
		margin-left: 0 !important;
		color: #000;
	}
}
</style>
<style lang="less" scoped>
/*S 购买须知*/
.h_remind{
	padding-bottom: 0.5rem;
	background-color: #fff;
	.h_title{
		margin-bottom: 0.36rem;
		text-align: center;
		line-height: 0.36rem;
		font-size: 0.32rem;
		color: #000;
		span{
			position: relative;
			&:before,&:after{
				content: "";
				position: absolute;
				top: 0;
				bottom: 0;
				margin: auto 0;
				width: 0.72rem;
				height: 1px;
				background-color: #dadada;
			}
			&:before{
				left: -0.88rem;
			}
			&:after{
				right: -0.88rem;
			}
		}
	}
	.h_question{
		margin-bottom: 0.1rem;
		padding-left: 0.5rem;
		padding-right: 0.3rem;
		.h_tit{
			position: relative;
			line-height: 0.5rem;
			font-size: 0.26rem;
			color: #000;
			&:before{
				content: "";
				position: absolute;
				top: 0;
				bottom: 0;
				left: -0.22rem;
				margin: auto 0;
				width: 0.1rem;
				height: 0.1rem;
				border-radius: 50%;
				background-color: #dd2726;
			}
		}
		.h_con{
			line-height: 0.4rem;
			font-size: 0.25rem;
			color: #666666;
		}
	}
}
/*E 购买须知*/
@import (reference) "~src/style/all.less";
.pb100{
	padding-bottom: 1rem;
}
.c_bbb{
	color:#bbb;	
}
/*S banner*/
.h_banner{
	width: 100%;
	height: 7.5rem;
	.swiper-pagination{
		left: auto;
		right: 0.32rem;
		bottom: 0.32rem;
		width: 0.55rem;
		height: 0.3rem;
		background-color: #fff;
		border: 1px solid #dadada;
		font-size: 0.2rem;
		color: #000;
	}
}
/*E banner*/
/*S 商品简介*/
.h_description{
	padding: 0.3rem;
	margin-bottom: 0.2rem;
	background-color: #fff;
	.h_name{
		margin-bottom: 0.16rem;
		line-height:0.46rem;
		font-size:0.34rem;
		color:#000;
		.h_tag{
			float: left;
			padding: 0 0.08rem;
			margin-top: 0.06rem;
			margin-right: 0.06rem;
			border-radius: 0.02rem;
			background-color: #dd2726;
			line-height: 0.32rem;
			font-size: 0.28rem;
			color: #fff;
		}
	}
	.h_desc{
		margin-bottom: 0.22rem;
		line-height: 0.4rem;
		font-size: 0.3rem;
		color: #999;
	}
	.h_price{
		.h_cost{
			line-height: 0.5rem;
			font-weight: bold;
			font-size: 0.4rem;
			color: #dd2726;
		}
		.h_original_cost{
			margin-left: 0.15rem;
			font-size: 0.3rem;
			color: #999;
		}
	}
	.h_sold{
		float: right;
		margin-top: 0.1rem;
		line-height: 0.4rem;
		font-size: 0.24rem;
		color: #999;
	}
}
/*E 商品简介*/
/*S 规格&服务*/
.h_info{
	margin-bottom: 0.2rem;
	background-color: #fff;
	.h_spec{
		display:flex;
		justify-content: space-between;
		padding:0.3rem;
		height:1rem;
		/*border-bottom:1px solid #e1e1e1;*/	
		font-size:0.28rem;
		.h_con{
			color:#666666;		
		}
		.iconfont{
			align-self: flex-end;
		}
	}
	.h_label{
		flex-shrink:0;
		width: 0.88rem;
		font-size: 0.28rem;
		color: #000;
	}
}
/*E 规格&服务*/
/*S 详情*/
.h_detail{
	background-color: #fff;
	.h_con{
		padding-bottom:0.6rem;
		img{
			max-width: 100%;
		}
	}
}
/*E 详情*/
/*S 底部*/
.h_footer{
	position: fixed;
	bottom: 0;
	left: 0;
	right: 0;
	height: 0.98rem;
	display: flex;
	.h_service{
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		width: 1.1rem;
		height: 0.98rem;
		background-color: #f9f9f9;
		border-top: 1px solid #dbdbdb;
		font-size:0.2rem;
		color:#666666;
		.iconfont{
			font-size: 0.48rem;
			color: #818181;
		}
	}
	.h_btn{
		flex-grow:1;
		line-height: 0.98rem;
		text-align: center;
		background-color: #dd2726;
		font-size: 0.36rem;
		color: #fff;
	}
}
/*E 底部*/
</style>
