<template>
    <div class="bg_gray">
    	<!--S 头部-->
		<top :title="'评价'"></top>
		<!--E 头部-->
		<!--S 用户评价-->
		<div class="h_evaluate">
			<div class="evaluate_box">
				<ul class="evaluate_info clearfix" :class="{'evaluate_all':isEvaluateAll}">
					<li class="evaluate_item active">全部(279)</li>
					<li class="evaluate_item">有图(42)</li>
					<li class="evaluate_item">追评(10)</li>
					<li class="evaluate_item">质量上乘(10)</li>
					<li class="evaluate_item">漂亮精致(10)</li>
					<li class="evaluate_item">很舒服(10)</li>
					<li class="evaluate_item">质量上乘(10)</li>
					<li class="evaluate_item">漂亮精致(10)</li>
					<li class="evaluate_item">很舒服(10)</li>
					<li class="evaluate_item">质量上乘(10)</li>
					<li class="evaluate_item">漂亮精致(10)</li>
					<li class="evaluate_item">很舒服(10)</li>
				</ul>
				<div class="f26 c_999 text_center" @click="isEvaluateAll=!isEvaluateAll">
					{{isEvaluateAll?'收起':'更多'}}<i class="iconfont f22 ml10" :class="isEvaluateAll?'icon-arrow-up':'icon-arrow-down'"></i>
				</div>
			</div>
			<div class="h_item">
				<div class="h_user">
					<div class="h_avatar">
						<img src="http://ygzb.oss-cn-beijing.aliyuncs.com/upload/avatar/80_avatar_big.jpg" alt="" />
					</div>
					<div class="h_nickname">无****</div>
				</div>
				<div class="h_information">2018.02.09 19:11 1.8m; 橙色</div>
				<div class="h_appraise">非常满意，性价比超高!  面料柔软舒适，颜色很漂亮！ 会回购。</div>
				<ul class="h_thumb_list">
					<li class="h_thumb">
						<img src="http://ygzb.oss-cn-beijing.aliyuncs.com/upload/avatar/100_avatar_big.jpg" alt="" />
					</li>
					<li class="h_thumb">
						<img src="http://ygzb.oss-cn-beijing.aliyuncs.com/upload/avatar/100_avatar_big.jpg" alt="" />
					</li>
					<li class="h_thumb">
						<img src="http://ygzb.oss-cn-beijing.aliyuncs.com/upload/avatar/100_avatar_big.jpg" alt="" />
					</li>
				</ul>
			</div>
			<div class="h_item">
				<div class="h_user">
					<div class="h_avatar">
						<img src="http://ygzb.oss-cn-beijing.aliyuncs.com/upload/avatar/80_avatar_big.jpg" alt="" />
					</div>
					<div class="h_nickname">无****</div>
				</div>
				<div class="h_information">2018.02.09 19:11 1.8m; 橙色</div>
				<div class="h_appraise">非常满意，性价比超高!  面料柔软舒适，颜色很漂亮！ 会回购。</div>
				<ul class="h_thumb_list">
					<li class="h_thumb">
						<img src="http://ygzb.oss-cn-beijing.aliyuncs.com/upload/avatar/100_avatar_big.jpg" alt="" />
					</li>
					<li class="h_thumb">
						<img src="http://ygzb.oss-cn-beijing.aliyuncs.com/upload/avatar/100_avatar_big.jpg" alt="" />
					</li>
					<li class="h_thumb">
						<img src="http://ygzb.oss-cn-beijing.aliyuncs.com/upload/avatar/100_avatar_big.jpg" alt="" />
					</li>
				</ul>
			</div>
		</div>
		<!--E 用户评价-->
    </div>
</template>
<script>
import itemCell from 'src/components/item/itemCell'
export default {
    data() {
    	return {
    		isEvaluateAll:false,//评价是否全展示
    	}
	},
	components: {
		itemCell,
	},
	mounted(){
		this.$nextTick(()=>{
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
			this.$router.push({path:"/news"});
		}
	}
}
</script>
<style lang="less" scoped>
@import (reference) "~src/style/all.less";
/*S 用户评价*/
.evaluate_box{
	padding:0.5rem 0 0.4rem;
	.border_b();
}
.evaluate_info{
	max-height:1.6rem;
	padding:0 0.3rem;
	overflow:hidden;
	&.evaluate_all{
		max-height: inherit;
	}
	& .evaluate_item{
		float: left;
		color:#444;
		height:0.5rem;
		line-height:0.5rem;
		.border-radius(0.04rem);
		padding:0 0.2rem;
		margin:0 0.18rem 0.3rem 0;
		.border();
		&.active{
			.border(#dd2726);
			color:#dd2726;
		}
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
	.h_thumb_list{
		display: flex;
		flex-wrap: wrap;
		padding-top: 0.06rem;
	}
	.h_thumb{
		margin-top:0.16rem ;
		margin-right: 0.16rem;
		width: 1.6rem;
		height: 1.6rem;
		flex-shrink: 0;
		img{
			display: block;
			width: 100%;
			height: 100%;
		}
	}
}
/*E 用户评价*/
</style>
