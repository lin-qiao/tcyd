<template>
	<div class="router_page bg_gray">
		<!-- S 头部-->
		<top :title="'金币兑换'"></top>
		<!-- E 头部-->
		<ul class="h_tab_list">
			<li class="h_tab_item" :class="{active:status==1}" @click="status=1">兑换现金券</li>
			<li class="h_tab_item" :class="{active:status==2}" @click="status=2">兑换红包</li>
			<li class="h_tab_item" :class="{active:status==3}" @click="status=3">兑换商品</li>
		</ul>
		<!--S 兑换现金券-->
		<exchange-cash  v-show="status==1"></exchange-cash>
		<!--E 兑换现金券-->
		<!--S 兑换红包-->
		<exchange-redpacket v-show="status==2"></exchange-redpacket>
		<!--E 兑换红包-->
		<!--S 兑换商品-->
		<exchange-goods v-show="status==3" @showCitySelectFn="showCitySelectFn"></exchange-goods>
		<!--E 兑换商品-->
	    <transition name="page-slide-bottom">
			<addressSelect 
				v-if="showCitySelect"
				:showCitySelect="showCitySelect">
			</addressSelect>
		</transition>
		<add-address v-show="false"></add-address>
	</div>
</template>

<script>
import exchangeCash from '../components/exchangeCash';//兑换现金券组件
import exchangeRedpacket from '../components/exchangeRedpacket';//兑换红包组件
import exchangeGoods from '../components/exchangeGoods';//兑换商品组件
import addressSelect from 'src/module/member/components/addressSelect';//下拉地址选择组件
import addAddress from 'src/module/member/components/addAddress';//添加地址弹窗组件
export default {
	data() {
		return {
			status:1,//选项卡切换
			showCitySelect:false,//是否显示选择收货地址弹窗
		}
	},
	components: {
		exchangeCash,
		exchangeRedpacket,
		exchangeGoods,
		addressSelect,
		addAddress
	},
	activated() {
	},
	mounted(){
		
	},
	watch:{
	},
	methods: {
		showCitySelectFn(){
			this.showCitySelect=true;
		}
	}
}
</script>
<style lang="less" scoped>
@import (reference) '~src/style/all.less';
.h_tab_list{
	.flex();
	background: #fff;
	justify-content:space-between;
	align-items:center;
	border-bottom:1px solid #e8e8e8;
	.h_tab_item{
		position:relative;
		width: 33.33%;
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

</style>