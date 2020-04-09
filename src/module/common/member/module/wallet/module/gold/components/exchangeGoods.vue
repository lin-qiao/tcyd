<!--记录-->
<template lang="html">
	<ul class="h_goods_list">
		<li class="h_goods" v-for="v in [1,1,1,1,1]">
			<a href="javascript:void(0)" class="h_thumb">
				<img src="../../../images/data_goods.jpg"/>
			</a>
			<div class="h_info">
				<a href="javascript:void(0)" class="btn" @click="showCitySelectFn">5000金币兑换</a>
				<div class="h_name ellipsis">精选加厚磨毛四件套</div>
				<div class="h_price">专柜价299元</div>
			</div>
		</li>
	</ul>
</template>

<script>
export default {
    props:{
    	showCitySelect:{
    		type:Boolean,
    		default:false
    	}
    },
    methods:{
    	showCitySelectFn($event){
    		this.$emit('showCitySelectFn', true);
	  	}
    }
}
</script>

<style lang="less" scoped>
@import (reference) '~src/style/all.less';
/*S 商品*/
.h_goods_list{
	margin: 0.3rem 0.3rem 0;
	.flex();
	flex-wrap:wrap;	
	justify-content:space-between;
	.h_goods{
		width: 3.3rem;
		margin-bottom: 0.3rem;
		border: 0.04rem solid #fbf3e9;
		background-color: #fff;
	}
	.h_thumb{
		display: flex;
		justify-content: center;
		align-items: center;
		height: 3.2rem;
		img{
			display: block;
			max-width: 2.5rem;
			max-height: 2.5rem;
		}
	}
	.h_info{
		position: relative;
		height: 1.28rem;
		background-color: #f9eee0;
		text-align: center;
		.btn{
			display: inline-block;
			position: relative;
			top: -0.24rem;
			min-width: 1.96rem;
			height: 0.48rem;
			padding: 0 0.2rem;
			font-size: 0.24rem;
			line-height: 0.48rem;
		}
	}
	.h_name{
		margin-top: -0.1rem;
		margin-bottom: 0.12rem;
		font-size: 0.24rem;
		color: #72503d;
	}
	.h_price{
		font-size: 0.24rem;
		color: #ad2611;
	}
}
/*E 商品*/
</style>
