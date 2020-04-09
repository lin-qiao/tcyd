<template>
	<div class="router_page">
		<top class="l_packet_title" title="红包" :isReturn="false"></top>
		<div class="l_get_box">
			<div class="l_get_packet">
				<div class="l_get_packet_main c_fff text_center" :class="{l_get_cash_main:type=='cash'}">
					<img class="store_img mb10" src="http://img01.dadetong.com/recommend/recommend_1510711749740.jpg" alt="" />
					<p class="f34 mb20">景茗科技</p>
					<p class="f34"><span class="price">100</span>元</p>
					<div class="mess f26">
						<p>红包类型：店铺红包</p>
						<p>2018.06.15-2018.12.12</p>
						<p>使用条件：满2000减100</p>
					</div>
					<a class="packet_btn f36" href="">立即使用</a><!--进店看看-->
					<div class="l_packet_bg text_center">
						<img src="../images/sx.png" alt="" />
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default{
		data(){
			return{
				type:'packet'
			}
		},
		activated(){
			if(this.$route.path.indexOf('getCash')!=-1){
				this.type = 'cash';
			}else{
				this.type = 'packet'
			}
		}
	}
</script>

<style scoped lang="less">
@import (reference) '~src/style/all.less';
	.l_packet_title{
		position: relative;
		z-index: 10;
	}
	.l_packet_bg{
		position: absolute;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		background: rgba(0,0,0,0.5);
		z-index: 1;
		img{
			position: absolute;
			top: 50%;
			left: 50%;
			margin-left: -1.47rem;
			margin-top: -0.5rem;
			width: 2.94rem;
		}
	}
	.l_get_box{
		position: fixed;
		left: 50%;
		bottom: 0;
		top: 0.89rem;
		width: 7.5rem;
		margin-left: -3.75rem;
		.overflow_auto;
	}
	.l_get_packet{
		position: relative;
		.flex;
		.flex_center;
		.justify_center;
		min-height: 100%;
		padding-bottom: 0.35rem;
		background: url(../images/get_packet_bg.jpg) no-repeat center top;
		background-size: cover;
	}
	.l_get_packet_main{
		padding-top: 2.96rem;
		margin-top: -0.35rem;
		width: 100%;
		height: 12.06rem;
		background: url(../images/get_packet.png) no-repeat center bottom;
		background-size: cover;
		&.l_get_cash_main{
			background-image: url(../images/get_cash.png);
		}
	}
	.store_img{
		width: 1.85rem;
		height: 1.85rem;
		border-radius: 50%;
		border: 0.08rem solid #fe8a19;
		.box_shadow(0px 0.1rem 0.3rem rgba(203,14,0,0.3));
	}
	.price{
		font-size: 1.04rem;
		font-weight: bold;
	}
	.mess{
		line-height: 0.54rem;
		color: #761718;
	}
	.packet_btn{
		display: block;
		position: relative;
		z-index: 10;
		width: 3.82rem;
		height: 0.9rem;
		margin: 1.8rem auto 0;
		border-radius: 0.08rem;
		background: #ffcb24;
		text-align: center;
		line-height: 0.9rem;
		color: #cf3839;
	}
</style>