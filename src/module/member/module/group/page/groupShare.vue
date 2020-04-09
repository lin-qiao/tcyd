<template>
	<div>
		<!--S 头部-->
		<top title="开团免费拿" :isReturn="false" rightIcon="icon-fenxiang2" class="border-n"></top>
		<!--E 头部-->
		<!--S 商品展示-->
		<div class="s_data_bg">
			<div class="plr44 pt30">
				<div class="s_data plr30 bg_fff">
					<div class="s_data_img"><img src="../images/s_data.png"/></div>
					<p class="f32 c_333 ellipsis">美的电烤箱</p>
					<div class="s_data_info mt20 pb30 f26 c_999">
						<span class="pull_left">原价<s>￥1299</s></span>
						<span class="pull_right">已有4001人免费领取</span>
						<p class="clearfix"></p>
					</div>
				</div>
			</div>
		</div>
		<!--E 商品展示-->
		<!--S 好友助力-->
		<div class="h_data_bg pos_rel">
			<!--<p class="f36 c_fff text_center ptb30">已帮好友助力成功</p>-->
			<!--S 倒计时-->
			<div class="text_center c_fff ptb30 f24">
				<span class="djs">00</span>
				<span>:</span>
				<span class="djs">00</span>
				<span>:</span>
				<span class="djs">00</span>
				<span class="f28 ml16">后将失效</span>
			</div>
			<!--E 倒计时-->
			<div class="plr44">
				<button class="btn h_data_btn f36">我也要免费拿</button>
			</div>
			<!--<p class="text_center f28 c_fff ptb22">需 <span class="h_data_num">7</span>人助力，即可免费拿商品</p>-->
			<p class="text_center f24 ptb22 c_ffc8c5">前往APP帮好友助力，自己也可以免费领哦~</p>
		</div>
		<div class="plr44 bg_fc4d43 pb30 pos_rel">
			<div class="h_data_list">
				<div class="h_data_lists filtrate_list_tab border-n plr20 c_fff">
					<div class="h_data_lists_img"><img src="../images/touxiang.png"/></div>
					<div class="h_data_lists_tit ellipsis">徐青免费拿了20寸拉杆箱</div>
					<div class="h_data_lists_time text_right">18分钟前助力成功</div>
				</div>
				<div class="h_data_lists filtrate_list_tab border-n plr20 c_fff">
					<div class="h_data_lists_img"><img src="../images/touxiang.png"/></div>
					<div class="h_data_lists_tit ellipsis">徐青免费拿了20寸拉杆箱</div>
					<div class="h_data_lists_time text_right">1小时前助力成功</div>
				</div>
				<div class="h_data_lists filtrate_list_tab border-n plr20 c_fff">
					<div class="h_data_lists_img"><img src="../images/s_datas.png"/></div>
					<div class="h_data_lists_tit ellipsis">徐青免费拿了20寸拉杆箱</div>
					<div class="h_data_lists_time text_right">1分钟前</div>
				</div>
			</div>
		</div>
		<!--E 好友助力-->
		<!--S 商品列表-->
		<div class="plr10 bg_fc4d43 pb30 pos_rel">
			<div class="ptb34 plr20 bg_fff s_list flex justify_between">
				<div class="s_lists mb40">
					<div class="s_lists_img"><img src="../images/s_datas.png"/></div>
					<p class="f26 c_333 ellipsis_clip mtb30">Midea/美的10L多功能电烤箱家用烘焙小烤箱</p>
					<p class="f26 c_666 mb5">需7人助力</p>
					<div>
						<span class="f38 c_dd2726 pull_left pt10">￥0</span>
						<button class="btn s_lists_btn pull_right">免费领<i class="iconfont icon-arrow-right pl10 f24"></i></button>
						<div class="clearfix"></div>
					</div>
				</div>
				<div class="s_lists mb40">
					<div class="s_lists_img"><img src="../images/s_datas.png"/></div>
					<p class="f26 c_333 ellipsis_clip mtb30">Midea/美的10L多功能电烤箱家用烘焙小烤箱</p>
					<p class="f26 c_666 mb5">需7人助力</p>
					<div>
						<span class="f38 c_dd2726 pull_left pt10">￥0</span>
						<button class="btn s_lists_btn pull_right">免费领<i class="iconfont icon-arrow-right pl10 f24"></i></button>
					</div>
				</div>
				<div class="s_lists mb40">
					<div class="s_lists_img"><img src="../images/s_datas.png"/></div>
					<p class="f26 c_333 ellipsis_clip mtb30">Midea/美的10L多功能电烤箱家用烘焙小烤箱</p>
					<p class="f26 c_666 mb5">需7人助力</p>
					<div>
						<span class="f38 c_dd2726 pull_left pt10">￥0</span>
						<button class="btn s_lists_btn pull_right">免费领<i class="iconfont icon-arrow-right pl10 f24"></i></button>
					</div>
				</div>
			</div>
		</div>
		<!--E 商品列表-->
	</div>
</template>

<script>
</script>

<style lang="less" scoped>
@import (reference) '~src/style/all.less';
/*S 商品展示*/
.s_data_bg{
	background-image: url(../images/bg1.jpg);
	background-repeat: no-repeat;
	background-position: center;
	background-size: 100%;
}
.s_data{
	border-radius: .08rem;
	img{
		width: 100%;
	}
}
.h_data_bg{
	top: -2px;
	background-image: url(../images/bg2.jpg);
	background-repeat: no-repeat;
	background-position: center;
	background-size: 100%;
}
/*E 商品展示*/
/*S 好友助力*/
.h_data_btn{
	width: 100%;
	height: .9rem;
	.gradient(#ffe86a,#fec331);
	color: #ff4035;
}
.h_data_num{
	padding: .12rem .10rem;
	background-color: #e32e2e;
}
.djs{
	padding: .12rem .14rem;
	background-color: #e32e2e;
}
.c_ffc8c5{
	color: #ffc8c5;
}
.h_data_list{
	background-color: #ff897c;	
	border-radius: .08rem;	
	.h_data_lists{
		.h_data_lists_tit{
			width: 3rem;
		}
		.h_data_lists_img{
			width: .64rem;
			height: .64rem;
			img{
				width: 100%;
				border-radius: 50%;
			}
		}
		.h_data_lists_time{
			width: 2.3rem;
		}
	}
}
.bg_fc4d43{
	background-color: #fc4d43;
	top: -2px;
}
/*E 好友助力*/
/*S 商品列表*/
.c_dd2726{
	color: #dd2726;
}
.s_list{
	flex-wrap: wrap;
	border-radius: .08rem;	
	.s_lists{
		width: 3.34rem;
		.s_lists_img{
			width: 3.32rem;
			height: 3.32rem;
		}
		img{
			width: 100%;
		}
		.s_lists_btn{
			.gradient_v(#fd6a55,#ff4a48);
		}
	}
}

/*E 商品列表*/
</style>