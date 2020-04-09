<template>
	<div class="router_page">
		<div class="l_red_packet pb30">
			<top class="border-n" title="" :isReturn="false"></top>
			<img class="l_red_packet_banner" src="../images/packet_banner.png" alt="" />
			<p class="l_red_packet_title">红包领取大厅</p>
			<ul class="l_red_packet_list">
				<li>
					<p class="store_name f26">微米品牌策划</p>
					<p class="price f38">￥<span>200</span></p>
					<p class="des f24">满1000减200</p>
				</li>
				<li>
					<p class="store_name f26">微米品牌策划</p>
					<p class="price f38">￥<span>200</span></p>
					<p class="des f24">满1000减200</p>
				</li>
				<li>
					<p class="store_name f26">微米品牌策划</p>
					<p class="price f38">￥<span>200</span></p>
					<p class="des f24">满1000减200</p>
				</li>
				<li>
					<p class="store_name f26">微米品牌策划</p>
					<p class="price f38">￥<span>200</span></p>
					<p class="des f24">满1000减200</p>
				</li>
				<li>
					<p class="store_name f26">微米品牌策划</p>
					<p class="price f38">￥<span>200</span></p>
					<p class="des f24">满1000减200</p>
				</li>
				<li>
					<p class="store_name f26">微米品牌策划</p>
					<p class="price f38">￥<span>200</span></p>
					<p class="des f24">满1000减200</p>
				</li>
			</ul>
			<p class="l_red_packet_title mt50">活动规则</p>
			<div class="l_rule_box">
				<div class="l_rule_con f26">
					<p class="clearfix"><span>1</span><em>活动中邀请20位好友下载并登录同城APP即可升级为VIP；</em></p>
					<p class="clearfix"><span>2</span><em>每成功邀请一位好友，你与被邀请人各获得一张50元红包；</em></p>
					<p class="clearfix"><span>3</span><em>VIP分享佣金可用于服务消费和提现；</em></p>
					<p class="clearfix"><span>4</span><em>免费开通VIP将不发放会员礼包商品；</em></p>
					<p class="clearfix"><span>5</span><em>在法律允许范围内，该活动最终解释权归同城VIP所有。</em></p>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
</script>
<style lang="less">
	.l_red_packet{
		.title{
			background: transparent;
			.tit_icon i{
				color: #fff;
			}
		}
	}
</style>
<style scoped lang="less">
@import (reference) '~src/style/all.less';
.l_red_packet{
	background: #ff4946 url(../images/redpacket_home_bg.png) no-repeat center top;
	background-size: 100%;
}
.l_red_packet_banner{
	display: block;
	width: 6rem;
	margin: 0.2rem auto;
}
.l_red_packet_title{
	width: 4.52rem;
	height: 1.2rem;
	margin: 0 auto;
	background: url(../images/title_bg.png) no-repeat center;
	background-size: 100%;
	padding-top: 0.18rem;
	text-align: center;
	line-height: 0.68rem;
	.f32;
	color: #fee79d;
	font-weight: bold;
}
.l_red_packet_list{
	.flex;
	.justify_between;
	flex-wrap: wrap;
	width: 7.32rem;
	margin: 0 auto;
	padding: 0.12rem;
	padding-bottom: 0;
	background: #cb0e00;
	.border-radius(0.14rem);
	.box_shadow(0px 0px 0.3rem rgba(203,14,0,0.7));
	li{
		flex-shrink:0;
		width: 2.32rem;
		height: 2.9rem;
		padding-top: 1.16rem;
		margin-bottom: 0.18rem;
		background: url(../images/red_packet_bg.png) no-repeat center;
		background-size: 100%;
		.border-radius(0.08rem);
		.box_shadow(0px 0px 0.3rem rgba(203,14,0,0.3));
		text-align:center;
		.store_name{
			color: #fde350;
		}
		.price{
			margin-top: 0.02rem;
			padding-right: 0.3rem;
			font-weight: bold;
			color: #cc0400;
			span{
				font-size: 0.74rem;
				color: #fde350;
				-moz-text-shadow:0px 0.02rem 0.3rem rgba(249,41,37,0.3);
				-webkit-text-shadow:0px 0.02rem 0.3rem rgba(249,41,37,0.3);
				text-shadow:0px 0.02rem 0.3rem rgba(249,41,37,0.3);
			}
		}
		.des{
			color: #a10300;
		}
	}
}
.l_rule_box{
	width: 7.32rem;
	margin: 0 auto;
	padding: 0.12rem;
	background: #cb0e00;
	.border-radius(0.14rem);
	.box_shadow(0px 0px 0.3rem rgba(203,14,0,0.7));
	.l_rule_con{
		.border-radius(0.08rem);
		padding: 0.4rem;
		padding-bottom: 0.3rem;
		background: #d32f2d;
		line-height: 0.44rem;
		color: #fcd74c;
		p{
			margin-bottom: 0.1rem;
		}
		span{
			display: block;
			float: left;
			width: 0.3rem;
			height: 0.3rem;
			margin-right: 0.22rem;
			margin-top: 0.08rem;
			.border-radius(50%);
			background: #fcd74c;
			line-height: 0.3rem;
			text-align: center;
			color: #b43a27;
			font-size: 0.22rem;
		}
		em{
			width: 5.76rem;
			display: block;
			float: left;
		}
	}
}
</style>