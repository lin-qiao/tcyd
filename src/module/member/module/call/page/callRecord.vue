<template>
    <div>
        <top title="手机消费详情" :isReturn="false"></top>
        <div class="oil_record_tit bg_gray">
        	<span class="wid200 block">购买套餐</span>
        	<span>每月充值(元)</span>
        	<span>折扣(%)</span>
        	<span>实付款(元)</span>
        </div>
        <div class="oil_record_list navigate_right">
        	<div class="wid200">
        		3月套餐
        		<span>2018-09-12 09:20</span>
        	</div>
        	<div class="c_333 f28">
        		100
        	</div>
        	<div  class="c_333 f28">
        		9.8折
        	</div>
        	<div class="text_center">
        		<span class="c_main">98</span>
        		<span>已支付</span>
        	</div>
        </div>
        <div class="oil_record_list">
        	<div class="wid200">
        		3月套餐
        		<span>2018-09-12 09:20</span>
        	</div>
        	<div class="c_333 f28">
        		100
        	</div>
        	<div  class="c_333 f28">
        		9.8折
        	</div>
        	<div class="text_center">
        		<span class="c_main">未支付</span>
        	</div>
        </div>
    </div>
</template>
<script>
export default {
    
}
</script>
<style lang="less" scoped>
.oil_record_tit{
	height:0.9rem;
	border-bottom: 1px solid #e8e8e8;
	display: flex;
	align-items: center;
	justify-content: space-between;
	font-size:0.26rem;
	padding:0 0.3rem;
}
.oil_record_list{
	display: flex;
	align-items: center;
	height: 1.42rem;
	border-bottom: 1px solid #e8e8e8;
	width:7.2rem;
	margin-left:0.3rem;
	padding-right: 0.5rem;
	justify-content: space-between;
	font-size:0.26rem;
	color:#666;
	span{
		display:block;
	}
}
.wid200{
	width:2rem;
}
</style>
