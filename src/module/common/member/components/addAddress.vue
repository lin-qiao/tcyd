<!--记录-->
<template lang="html">
    <div class="h_address_wrap">
    	<div class="h_box">
    		<div class="h_title">选择收货地址<i class="iconfont icon-close2" @click="showChose = false"></i></div>
    		<div class="h_row">
    			<input type="text" placeholder="姓名" class="h_name" autocomplete="off" />
    			<input type="number" placeholder="手机号" class="h_phone"/>
    		</div>
    		<div class="h_row" @click="showCitySelectFn">
    			<div class="h_label">{{addressText==''?'选择地区':addressText}}</div>
    			<div class="h_con">
    				<div></div>
    				<i class="iconfont icon-arrow-right"></i>
    			</div>
    		</div>
    		<div class="h_row">
    			<textarea name="" placeholder="详细地址（如街道、小区、乡镇、村）" class="h_textarea"></textarea>
    		</div>
    		<div class="btn_block mt30">保存</div>
    		<!--<div class="btn_block btn_gray mt30">保存</div>-->
    	</div>
	    <transition name="page-slide-bottom">
			<addressSelect 
				v-if="showCitySelect" 
				:showCitySelect="showCitySelect" 
				@on-showCitySelect-change="ShowCitySelectChange"
				@on-city-select="citySelectChange">
			</addressSelect>
		</transition>
    </div>
</template>

<script>
import addressSelect from 'src/components/formItem/addressSelect';
export default {
    props:{
        showCitySelect:{
        	
        }
    },
    data() {
		return {
        	showCitySelect: false, //是否显示地址选择
        	address:{
        		
        	},
        	addressText:""
		}
	},
	components: {
		addressSelect
	},
	methods: {
		//展示下拉选择城市
		showCitySelectFn(){
			this.showCitySelect = true
		},
		//选择城市
		ShowCitySelectChange(val) {
			this.showCitySelect = val;
		},
		// 获取地址选择器所传省市
	    citySelectChange(p, c, a) {
//  		this.address.province = p.NAME;
//  		this.address.city = c.NAME;
//  		this.address.county = a.NAME;
    		this.addressText = `${p.NAME} - ${c.NAME} - ${a.NAME}`;
    	},
	},
	watch:{
		
  	}
}</script>
<style lang="less" scoped>
@import (reference) '~src/style/all.less';
.h_address_wrap{
	position: absolute;
    left: 0;
    top: 0;
    z-index: 20;
    bottom: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.4);
} 
.h_box{
	position: absolute;
	top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 30;
    margin: auto;
    background: #fff;
    width: 6.9rem;
    height: 5.9rem;
    border-radius:0.05rem;
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
.h_row{
	display: flex;
	justify-content: space-between;
	align-items: center;
	min-height: 1rem;
	border-bottom: 1px solid @border_color;
	font-size: 0.3rem;
	input{
		width: 50%;
		height: 1rem;
		padding-left: 0.36rem;
		font-size: 0.3rem;
	}
	.h_name{
		border-right: 1px solid @border_color;
	}
	.h_label{
		margin-left: 0.36rem;
	}
	.h_con{
		display: flex;
		margin-right: 0.36rem;
		.iconfont{
			margin-left: 0.05rem;
			font-size: 0.4rem;
			color: #999;
		}
	}
	.h_textarea{
		width: 100%;
		height: 1.4rem;
		padding: 0.25rem 0.36rem;
		font-size: 0.3rem;
		font-family: inherit;
	}
}
.btn_gray{
	background: #ccc;
	box-shadow: none;
}
</style>
