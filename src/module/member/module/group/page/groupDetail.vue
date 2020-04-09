<template>
    <div class="bg_gray pb110">
    	<!--S 头部-->
		<top :title="'开团免费拿'" rightIcon="icon-fenxiang2 c_888" @clickRight="share"></top>
		<!--E 头部-->
		<!--S banner轮播-->
		<div class="h_banner">
			<div class="swiper-container">
			    <div class="swiper-wrapper">
			        <div class="swiper-slide">
			        	<img src="http://ygzb.oss-cn-beijing.aliyuncs.com/shopsServe/serve1530512535257.png" alt="" />
			        </div>
			        <div class="swiper-slide">
			        	<img src="http://ygzb.oss-cn-beijing.aliyuncs.com/shopsServe/serve1522743302365.jpg" alt="" />
			        </div>
			        <div class="swiper-slide">
			        	<img src="http://ygzb.oss-cn-beijing.aliyuncs.com/shopsServe/serve1524815608617.jpg" alt="" />
			        </div>
			    </div>
			    <div class="swiper-pagination"></div>
			</div>
		</div>
		<!--E banner轮播-->
		<!--S 商品简介-->
		<div class="h_description">
			<div class="h_price mb10">
				<span class="h_cost">&yen; 0</span>
				<del class="h_original_cost">&yen;399</del>
				<div class="h_sold">已售157733</div>
			</div>
			<h3 class="h_name">
				<span class="ellipsis_clip">Midea/美的10L多功能电烤箱家用烘焙小烤箱 T1-L101B </span>
			</h3>
			<div class="h_desc">Midea/美的T1-L101B/108B(外观功能都一致，随机发货)多功能电烤箱家用烘焙小烤箱，红外线速热，小功率节能精致小巧，操作简单，适合亲子互动DIY.美的承诺::7天无理由退换货，爱生活爱美的。烤盘不可以单独使用，需要搭配烤架使用哦!助力免单规则1.选择心仪商品2.分享专属二维码给好友3.好友扫码下载拼多多App并微信登录即可成功助力</div>
		    <div class="flex mt30">
		    	<span class="guard_item mr30"><i class="iconfont icon-xuanzeb c_main f26 mr10"></i>全场包邮</span>
		    	<span class="guard_item mr30"><i class="iconfont icon-xuanzeb c_main f26 mr10"></i>7天退换</span>
		    	<span class="guard_item mr30"><i class="iconfont icon-xuanzeb c_main f26 mr10"></i>假一赔十</span>
		    </div>
		</div>
		<!--E 商品简介-->
		<!--S 用户评价-->
		<div class="h_evaluate">
			<item-cell 
				:height="100" 
				title="商品评价(278)"
				:isLink="true"
				@handleClick="evaluateLink">
				<div class="h_con">查看全部</div>
			</item-cell>
			<ul class="evaluate_info clearfix">
				<li class="evaluate_item">质量好(85)</li>
				<li class="evaluate_item">快递快(85)</li>
				<li class="evaluate_item">烤箱不错(85)</li>
			</ul>
			<div class="h_item">
				<div class="flex justify_between flex_center">
					<div class="h_user">
						<div class="h_avatar">
							<img src="http://ygzb.oss-cn-beijing.aliyuncs.com/upload/avatar/80_avatar_big.jpg" alt="" />
						</div>
						<div class="h_nickname">无****</div>
					</div>
					<div class="c_999">2018.06.07</div>
				</div>
				<div class="h_appraise">非常满意，性价比超高!  面料柔软舒适，颜色很漂亮！ 会回购。</div>
				<div class="h_information">款式:T1-108B/101B(官方标配)</div>
			</div>
			<div class="h_item">
				<div class="flex justify_between flex_center">
					<div class="h_user">
						<div class="h_avatar">
							<img src="http://ygzb.oss-cn-beijing.aliyuncs.com/upload/avatar/80_avatar_big.jpg" alt="" />
						</div>
						<div class="h_nickname">无****</div>
					</div>
					<div class="c_999">2018.06.07</div>
				</div>
				<div class="h_appraise">非常满意，性价比超高!  面料柔软舒适，颜色很漂亮！ 会回购。</div>
				<div class="h_information">款式:T1-108B/101B(官方标配)</div>
			</div>
		</div>
		<!--E 用户评价-->
		<!--S 详情-->
		<div class="h_detail">
			<item-cell 
				:height="100" 
				title="商品详情"
				:isLink="false">
			</item-cell>
			<div class="h_con">
				<img src="http://ygzb.oss-cn-beijing.aliyuncs.com/shopsServe/serve1530699717718.png" alt="" />
			</div>
		</div>
		<!--E 详情-->
		<!--S 精选推荐-->
		<div class="bg_fff">
			<item-cell 
				:height="100" 
				title="精选推荐"
				:isLink="false">
			</item-cell>
			<ul class="selection_list mlr30 clearfix">
				<li class="selection_item">
					<img src="http://ygzb.oss-cn-beijing.aliyuncs.com/shopsServe/serve1530699717718.png" class="selection_img">
					<h3 class="ellipsis_clip f26 selection_title">Midea/美的10L多功能电烤箱家用烘焙小烤箱</h3>
					<p class="f26 c_666">需7人助力</p>
					<div class="flex justify_between flex_center">
						<span class="f38 c_main">￥0</span>
						<a href="javascript:void(0);" class="btn">免费领<i class="iconfont icon-arrow-right ml10"></i></a>
					</div>
				</li>
				<li class="selection_item">
					<img src="http://ygzb.oss-cn-beijing.aliyuncs.com/shopsServe/serve1530699717718.png" class="selection_img">
					<h3 class="ellipsis_clip f26 selection_title">Midea/美的10L多功能电烤箱家用烘焙小烤箱</h3>
					<p class="f26 c_666">需7人助力</p>
					<div class="flex justify_between flex_center">
						<span class="f38 c_main">￥0</span>
						<a href="javascript:void(0);" class="btn">免费领<i class="iconfont icon-arrow-right ml10"></i></a>
					</div>
				</li>
				<li class="selection_item">
					<img src="http://ygzb.oss-cn-beijing.aliyuncs.com/shopsServe/serve1530699717718.png" class="selection_img">
					<h3 class="ellipsis_clip f26 selection_title">Midea/美的10L多功能电烤箱家用烘焙小烤箱</h3>
					<p class="f26 c_666">需7人助力</p>
					<div class="flex justify_between flex_center">
						<span class="f38 c_main">￥0</span>
						<a href="javascript:void(0);" class="btn">免费领<i class="iconfont icon-arrow-right ml10"></i></a>
					</div>
				</li>
				<li class="selection_item">
					<img src="http://ygzb.oss-cn-beijing.aliyuncs.com/shopsServe/serve1530699717718.png" class="selection_img">
					<h3 class="ellipsis_clip f26 selection_title">Midea/美的10L多功能电烤箱家用烘焙小烤箱</h3>
					<p class="f26 c_666">需7人助力</p>
					<div class="flex justify_between flex_center">
						<span class="f38 c_main">￥0</span>
						<a href="javascript:void(0);" class="btn">免费领<i class="iconfont icon-arrow-right ml10"></i></a>
					</div>
				</li>
			</ul>
		</div>
		<!--E 精选推荐-->
		<!--S 底部-->
		<!--S未申请-->
		<div class="h_footer hide">
			<a href="javascript:void(0)" class="h_service flex f32 flex_center justify_center">助力详情</a>
			<a href="javascript:void(0)" class="h_btn flex flex_center flex1 justify_center">免费领</a>
		</div>
		<!--E未申请-->
		<!--S申请中-->
		<div class="h_footer hide">
			<a href="javascript:void(0)" class="h_service flex f32 flex_center justify_center">更多免单</a>
			<div href="javascript:void(0)" class="h_btn flex flex_center flex1 flex_column justify_center">
				<p class="f28">剩余<span>{{day}}</span>天<span>{{hour}}</span>时<span>{{minute}}</span>分<span>{{second}}</span>秒</p>
				<p class="f32">继续邀请</p>
			</div>
		</div>
		<!--E申请中-->
		<!--E 底部-->
    </div>
</template>
<script>
import itemCell from 'src/components/item/itemCell'
export default {
    data() {
    	return {
    		day: '00',   //底部倒计时=>天
			hour: '00',  //底部倒计时=>时
			minute: '00',//底部倒计时=>分
			second: '00',//底部倒计时=>秒
    	}
	},
	components: {
		itemCell,
	},
	activated() {
		this.day = '00';   //底部倒计时=>天
		this.hour = '00';  //底部倒计时=>时
		this.minute = '00';//底部倒计时=>分
		this.second = '00';//底部倒计时=>秒
		this.time = '1001865600';
		if(this.time > 0){
			this.countDown();
			this.t = setInterval(this.countDown, 1000);
		}
	},
	mounted(){
		this.$nextTick(()=>{    //详情轮播
			this.bannerSwiper();
		})
	},
	watch:{
	},
	methods: {
		share(){//头部分享
			
		},
		bannerSwiper(){//banner轮播
		    var swiper = new Swiper('.swiper-container', {
		        pagination: '.swiper-pagination',
		        paginationType: 'fraction'
		    });
		},
		evaluateLink(){//商品评价点击跳转
			this.$router.push({path:"/groupEvaluate"});
		},
		countDown() {//底部倒计时
			/*获取时间*/
			this.day = this.formate(Math.floor(this.time / (24 * 60 * 60 * 1000)));
			this.hour = this.formate(Math.floor(this.time % (24 * 60 * 60 * 1000) / (60 * 60 * 1000)));
			this.minute = this.formate(Math.floor(this.time % (60 * 60 * 1000) / (60 * 1000)));
			this.second = this.formate(Math.floor(this.time % (60 * 1000) / 1000));
			/*时间减1s*/
			this.time -= 1000;
		},
		formate(i) {//时间格式化：两位返回两位 一位返回0+这位
			if(i < 10) {
				return '0' + i;
			} else {
				return i;
			}
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
@import (reference) "~src/style/all.less";
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
		line-height: 0.42rem;
		font-size: 0.26rem;
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
			color: #666;
		}
	}
	.h_sold{
		float: right;
		margin-top: 0.1rem;
		line-height: 0.4rem;
		font-size: 0.24rem;
	}
}
/*E 商品简介*/
/*S 用户评价*/
.evaluate_info{
	margin-top:0.3rem;
	padding:0 0.3rem;
	& .evaluate_item{
		float: left;
		color:#444;
		.border-radius(0.04rem);
		padding:0.1rem 0.2rem;
		margin-right: 0.18rem;
        background:#fceae9;
	}
}
.h_evaluate{
	padding-bottom:0.44rem;
	margin-bottom:0.2rem;
	background-color:#fff;
	.h_item{
		.border_b();
		padding: 0 0.3rem 0.2rem;
		&:last-child{
			border:none;
		}
	}
	.h_user{
		display: flex;
		align-items: center;
		margin-top: 0.3rem;
		margin-bottom: 0.2rem;
	}
	.h_avatar{
		width: 0.67rem;
		height: 0.67rem;
		margin-right: 0.2rem;
		border-radius:50%;
		border: 1px solid #e2e2e1;
		overflow: hidden;
		img{
			display: block;
			width: 100%;
			height: 100%;
		}
	}
	.h_nickname{
		font-size: 0.3rem;
		color: #000;
	}
	.h_information{
		margin-bottom: 0.12rem;
		line-height: 0.36rem;
		font-size: 0.24rem;
		color: #999;
	}
	.h_appraise{
		line-height: 0.42rem;
		font-size: 0.28rem;
		color: #000;
		margin-bottom: 0.1rem;
	}
}
/*E 用户评价*/
/*S 详情*/
.h_detail{
	background-color: #fff;
	.h_con{
		margin-top:0.2rem;
	}
	& img{
		width: 100%;
	}
}
/*E 详情*/
/*S 精选推荐*/
.selection_item{
	float: left;
    width: 3.33rem;
    margin:0.3rem 0.24rem 0.3rem 0;
    &:nth-child(2n){
    	margin-right:0;
    }
    & .selection_img{
    	width:3.33rem;
    	height:3.33rem;
    }
    & .selection_title{
    	line-height:0.35rem;
    	margin:0.1rem 0;
    }
}
/*E 精选推荐*/
/*S 底部*/
.h_footer{
	display: flex;
	position: fixed;
	bottom: 0;
	left: 0;
	right: 0;
	height: 1.07rem;
	background:#dd2726;
	border-top: 1px solid #dbdbdb;
	.h_service{
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		width: 2.78rem;
		height: 1.07rem;
		background-color: #f9f9f9;
		font-size:0.2rem;
		color:#666666;
		.iconfont{
			font-size: 0.48rem;
			color: #818181;
		}
	}
	.h_btn{
		font-size: 0.36rem;
		color: #fff;
		text-align: center;
	}
}
/*E 底部*/
</style>
