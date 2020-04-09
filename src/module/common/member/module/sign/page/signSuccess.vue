<template>
	<div class="pb80">
		<!--S 头部-->
		<top class="l_sign_title border-n" title="早起打卡赢现金" :isReturn="false"></top><!-- rightIcon="icon-liebiao"-->
		<!--E 头部-->
		<!--S 支付成功-->
		<div class="text_center mt82">
			<img class="l_sign_yea" src="../images/yea.png" alt="" />
			<p class="f44 c_666 mt15">支付成功 记得明早打卡哦</p>
			<p class="f26 c_666 mt15">打卡时间：<span class="c_z_main">{{time}}</span></p>
		</div>
		<!--E 支付成功-->
		<!--S 按钮-->
		<div class="l_sign_btn mt100 mb84">
			<router-link class="btn_block" to="/inviteRecommend">邀请好友加入</router-link>
			<a class="btn_border mt30 flex_center justify_center" href="javascript:void(0);" @click="$router.go(-1)">完成</a>
		</div>
		<!--E 按钮-->
	</div>
</template>

<script>
	export default{
		data(){
			return{
				time:''
			}
		},
		activated(){
			this.time = this.$route.query.time;
		}
	}
</script>

<style lang="less">
.l_sign_title{
	.tit_icon i,.tit_font{
		color: #fff!important;	
	}
}
</style>
<style lang="less" scoped>
@import (reference) '~src/style/all.less';
.l_sign_title{
	background: #f4564b;
}
.l_sign_btn{
	width: 6.86rem;
	margin: 0 auto;
	.btn_block,.btn_border{
		width: 100%;
		height: 1rem;
		padding: 0;
		.border-radius(0.1rem);
		.f32;
	}
	.btn_block{
		line-height: 1rem;
	}
	.btn_border{
		.flex;
	}
	.btn_packet{
		width: 0.38rem;
	}
}
.l_sign_yea{
	width: 1.36rem;
}
</style>