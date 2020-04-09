<template>
    <div class="pb110">
        <!-- S 头部-->
		<top title='同城  <span class="title_circle">●</span> 手机充值' right="消费明细" @clickRight="rightUrl"></top>
		<!-- E 头部-->
		<!--S 输入手机号-->
		<div class="tel plr24">
			<div class="tel_img plr24"><img src="../images/china_mobile.png"/></div>
			<input type="tel" v-model="telephone" maxlength="11"/>
			<div class="tel_i tel_i1"><i class="iconfont icon-close f40"></i></div>
			<div class="tel_i tel_i2"><i class="iconfont icon-grzx f60"></i></div>
		</div>
		<!--E 输入手机号-->
		<!--S选择充值套餐-->
		<itemElementBox class="border-n" title="选择充值套餐" :noContent="true" :noBorder="true"></itemElementBox>
	    <div class="plr30 pos_rel meal meal_border mt20">
		    <div class="meal_list text_center mb26 meal_active">
				<p class="meal_zk c_main f34 mt30">99.8折</p>
		    	<p class="meal_tc c_666 f24 mt30">立即到账</p>
		    	<i class="iconfont icon-jiaobiao meal_i c_main f44"></i>
		    </div>
		    <div class="meal_list text_center mb26">
				<p class="meal_zk c_main f26 mt20">3月套餐</p>
				<p class="meal_tc c_main f26 mt20">￥600.0</p>
		    	<p class="meal_tc c_666 mt20">
		    		<span class="f22">合伙人</span>
		    		<span class="f24">:￥300.0</span>
		    	</p>
		    </div>
		    <div class="meal_list text_center mb26">
				<p class="meal_zk c_main f34 mt30">99.8折</p>
		    	<p class="meal_tc c_666 f24 mt30">立即到账</p>
		    </div>
		    <div class="meal_list text_center mb26">
				<p class="meal_zk c_main f34 mt30">99.8折</p>
		    	<p class="meal_tc c_666 f24 mt30">立即到账</p>
		    </div>
		    <div class="meal_list text_center mb26">
				<p class="meal_zk c_main f34 mt30">99.8折</p>
		    	<p class="meal_tc c_666 f24 mt30">立即到账</p>
		    </div>
		    <div class="meal_list text_center mb26">
				<p class="meal_zk c_main f34 mt30">99.8折</p>
		    	<p class="meal_tc c_666 f24 mt30">立即到账</p>
		    </div>
		</div>
		<!--E选择充值套餐-->
		<!--S每月充值金额-->
		<div class="plr30">
			<p class="f28 pt30 pb30">每月充值金额(元)</p>
			<div class="recharge">
				<i class="iconfont icon-jian recharge_i recharge_i1"></i>
				<input class="text_center f38 recharge_inp" type="text" value="100" autocomplete="off" />
				<i class="iconfont icon-jia1 recharge_i recharge_i2 recharge_i_active"></i>
			</div>
			<p class="f24 text_center pt30 pb30 c_ffa516">每月充值100元，充值当天返现第一笔</p>
			<div class="recharge_info text_center pt50">
				<p>
					<span class="c_999 f28 mr30">折扣价</span>
					<span class="f38 c_main">288.00</span>
					<span class="f26 c_main">元</span>
				</p>
				<p class="mt30">
					<span class="c_666 f26 mr26">3个月充值</span>
					<s class="c_666 f26 mr20">原价300.00元</s>
					<span class="c_f4890d f22 plr10 ptb20 bg_fff5e5">节省12元</span>
				</p>
			</div>
		</div>
		<!--E每月充值金额-->
		<!--S 合伙人-->
		<div class="bg_gray hei20"></div>
		<div class="hhr">
			<item-cell 
				:height="100" 
				title="合伙人赚钱" 
				value="邀好友省钱"
				:noBorder="true"
				:isLink="true">
			</item-cell>
		</div>
		<!--E 合伙人-->
		<!--S温馨提示-->
		<div class="bg_gray" style="height: 0.6rem;"></div>
		<div class="bg_gray" style="margin-top: -0.6rem;">
			<com-warm-prompt :code="code" :innerHtml="prompt" class="mt60"></com-warm-prompt>
		</div>
		<!--E温馨提示-->
		<!--S充值-->
		<div class="c_fixed_bottom">
			<a class="btn_block" href="javascript:void(0);">立即购买</a>
		</div>
		<!--E充值-->
    </div>
</template>
<script>
import itemCell from 'src/components/item/itemCell';       //合伙人赚钱
import itemElementBox from 'src/components/item/itemElementBox'; //标题
import comWarmPrompt from 'src/components/com-warm-prompt'; //温馨提示
export default {
    data() {
		return {
			telephone:"13888888888",//电话
			code:"",//温馨提示code 码
			prompt:'<p>充值后用于加油服务，仅支持加油卡服务或提现至加油卡；</p><p>支持的加油站包括中石油，中石化以及获得同城认证的油品质量合格的加油站。<a clsaa="c_3682e0" href="javascript:void(0);" style="color: #3682e0;">查看详情></a></p>'//温馨提示 文本内容  （兼容当前版本）后期将去掉
		}
	},
	components: {
		itemElementBox,//标题
		itemCell,      //合伙人
		comWarmPrompt     //温馨提示
	},
	
	watch:{
		telephone(newValue, oldValue) {
	        if (newValue > oldValue) {
	          if (newValue.length === 4 || newValue.length === 9) {
	            var pre = newValue.substring(0, newValue.length - 1);
	            var last = newValue.substr(newValue.length - 1, 1);
	            this.telephone = pre + ' ' + last;
	          } else {
	            this.telephone = newValue;
	          }
	        } else {
	          if (newValue.length === 9 || newValue.length === 4) {
	            this.telephone = this.telephone.trim();
	          } else {
	            this.telephone = newValue;
	          }
	        }
	    }
	},
	methods: {
		rightUrl(){
			this.$router.push({path:"/callRecord"})
		}
	}
}
</script>
<style lang="less">
/*S 合伙人*/
.hhr .cell_tit_con{
	margin-left: 0 !important;
}
/*E 合伙人*/
</style>
<style lang="less" scoped>
@import (reference) "~src/style/all.less";
/*S 输入手机号*/
.tel{
	display: flex;
	justify-content: space-between;
	margin-top: .46rem;
	margin-bottom: .4rem;
	input{
		width: 3.5rem;
		font-size:.44rem;
	}
}
.tel_img{
	width: 1.3rem;
	height: .99rem;
	img{
		width:100%;
	}
}
.tel_i{
	display: flex;
	justify-content: center;
	align-items: center;
	width: .85rem;
	height: .99rem;
}
.tel_i1{
	color: #c7c7c7;
}
.tel_i2{
	color: #3682e0;
}
/*E 输入手机号*/
/*S 充值套餐*/
.meal_border{
	border-bottom: 1px solid #f3f3f3;
}
.meal{
	display: flex;
	justify-content: space-between;
	flex-wrap: wrap;
	.meal_list{
		position: relative;
		width: 2.1rem;
		height: 1.86rem;
		border: 2px solid #FFFFFF;
		border-radius: .08rem;
		.meal_zk{
			font-weight: bold;
		}
		.meal_i{
			position: absolute;
			top: -.08rem;
			right: -.03rem;
		}
	}
}
.meal_active{
	border: 2px solid #ff8381 !important;
	color: #ff4b48 !important;
}
/*E 充值套餐*/
/*S每月充值金额*/
.c_ffa516{
	color: #ffa516;
}
.c_f4890d{
	color: #f4890d;
}
.bg_fff5e5{
	background-color: #fff5e5;
}
.recharge{
	display: flex;
	align-items: center;
	justify-content: center;
	position: relative;
}
.recharge_inp{
	width: 5rem;
	height: .74rem;
	border: 1px solid #dbdbdb;
}
.recharge_i{
	position: absolute;
	color: #cfcfcf;
	font-size: .84rem;
	z-index: 2;
}
.recharge_i1{
	left: .65rem;
}
.recharge_i2{
	right: .65rem;
}
.recharge_i_active{
	color: #ff4b48;
}
.recharge_info{
	padding-bottom: .5rem;
}
/*E每月充值金额*/
</style>
