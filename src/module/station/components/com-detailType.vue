<template>
	<div>
		<!--Sbanner-->
		<div class="detail_banner" :class="type"></div>
		<!--Ebanner-->
		<!--S金额-->
		<div class="detail_money">
			
		</div>
		<!--E金额-->
	</div>
</template>

<script>
	export default{
		props:{
			type:{//类型（金牌：gold  银牌：silver  铜牌：bronze）
				default:'gold'
			}
		}
	}
</script>

<style lang="less" scoped>
@import (reference) '~src/style/all.less';
.detail_banner{
	width:7.5rem;
	height:2.66rem;
	background-size:100% 100%; 
	background-repeat:no-repeat;
	&.gold{
		background-image:url(../images/gold_banner.jpg);
	}
	&.silver{
		background-image:url(../images/silver_banner.jpg);
	}
	&.bronze{
		background-image:url(../images/bronze_banner.jpg);
	}
}
.detail_money{
	padding:0.4rem 0.3rem;
}
</style>