<!--记录-->
<template lang="html">
    <div class="h_address_wrap" v-show="showChose">
    	<div class="h_box">
    		<div class="h_title">选择收货地址<i class="iconfont icon-close2" @click="showChose = false"></i></div>
    		<ul class="h_list">
    			<li class="h_item">
    				<div class="h_info">
    					<div>张雨，13659684511</div>
    					<p>山西省太原市小店区晋阳街体育路口北美金拇指广场13层</p>
    				</div>
    				<i class="iconfont icon-arrow-right"></i>
    			</li>
    			<li class="h_item">
    				<div class="h_info">添加新收货地址</div>
    				<i class="iconfont icon-arrow-right"></i>
    			</li>
    		</ul>
    	</div>
    </div>
</template>

<script>
export default {
    props:{
        showCitySelect:{  //是否显示弹窗
            type: Boolean,
            default: false
        }
    },
    data() {
		return {
			showChose: this.showCitySelect, //插件是否显示
		}
	},
	methods: {

	},
	watch:{
	    showCitySelect(val){
	      	this.showChose = val;
	    }
  	}
}</script>
<style lang="less" scoped>
@import (reference) '~src/style/all.less';
.h_address_wrap{
	position: absolute;
    left: 0;
    top: 0;
    z-index: 121;
    bottom: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.4);
} 
.h_box{
	position: absolute;
    bottom: 0;
    left: 0;
    z-index: 130;
    background: #fff;
    width: 100%;
    min-height: 7.6rem;
}
.h_title{
	position: relative;
	padding:0 0.3rem;
	text-align: center;
	line-height: 0.9rem;
	font-size: 0.34rem;
	border-bottom: 1px solid @border_color;
	.iconfont{
		position: absolute;
		right: 0.3rem;
		top: 0;
		bottom: 0;
		font-size: 0.54rem;
		color: #a7a7a7;
	}
}
.h_list{
	.h_item{
		display: flex;
		justify-content: space-between;
		align-items: center;
		min-height: 1.5rem;
		padding: 0.25rem 0.3rem;
		border-bottom: 1px solid @border_color;
		line-height: 0.46rem;
		font-size: 0.28rem;
		color: #666666;
	}
	.h_info{
		width: 5.95rem;
	}
}
</style>
